import os

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, HttpUrl
from service.repo_service import clone_repo
from service.analyzer import directory_traverse
from utils.content_utils import get_imp_file_content
from utils.build_prompt import build_prompt
from service.gemini_service import generate_ai_insights
from utils.polish_response import polish_response
from utils.content_utils import get_imp_file_content
from utils.build_chat_prompt import build_chat_prompt
from utils.selected_file_content import selected_file_content
from utils.store_chat_history import store_chat_history
from service.create_chunk import create_chunk
from dotenv import load_dotenv
from fastapi.responses import RedirectResponse
from utils.embed_chunks import embed_chunks
from utils.search_chunk import search_chunks
from utils.clean_search_response import clean_chunks
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # your Vite frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class RepoRequest(BaseModel):
    repo_url: HttpUrl

class ChatRequest(BaseModel):
    repo_name: str
    user_query: str
    selected_files:list[str] = None

load_dotenv()
CLIENT_ID = os.getenv("CLIENT_ID")
REPO_PATH=""
FRONTEND_URL="http://localhost:5173/getRepo"
@app.post("/analyze")
async def analyze_github_repo(data: RepoRequest):
    try:
        repo_url = str(data.repo_url)

        if not repo_url.startswith("https://github.com/"):
            raise HTTPException(status_code=400, detail="Invalid GitHub URL")

        repo_name, REPO_PATH = clone_repo(repo_url)

        analysis = directory_traverse(REPO_PATH)
        chunks=create_chunk(REPO_PATH)
        embedded_chunks=embed_chunks(chunks)
        searched_chunks=search_chunks("Where is socket connection handled?", embedded_chunks, top_k=5)
        clean_response_for_searched_chunks=clean_chunks(searched_chunks)
        return {
            "message": "Repo analyzed successfully",
            "repo_name": repo_name,
            "analysis": analysis,
            "chunks": chunks,
            "search_results": clean_response_for_searched_chunks
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/ai-insights")
async def ai_insights(repo_name: str):
    try:
        repo_path = f"repos/{repo_name}"
        content = get_imp_file_content(repo_path)
        prompt=build_prompt(content)
        reponse=generate_ai_insights(prompt)
        ai_insights=polish_response(reponse)
        return {
            "repo_name": repo_name,
            "ai_insights": ai_insights
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/chat")
async def chat_with_repo(data: ChatRequest):
    try:
        repo_name = data.repo_name
        user_query = data.user_query
        if data.selected_files:
            context = selected_file_content(f"repos/{repo_name}", data.selected_files)
        else:
            context = get_imp_file_content(f"repos/{repo_name}")
        # context=search_chunks(user_query,)
        prompt = build_chat_prompt(context, user_query)
        response = generate_ai_insights(prompt)
        store_chat_history(repo_name, user_query, response)
        return {
            "repo_name": repo_name,
            "answer": response
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@app.get("/auth/github/login")
async def github_login():
    github_url=(
    f"https://github.com/login/oauth/authorize"
    f"?client_id={CLIENT_ID}&scope=repo"
    )
    return RedirectResponse(github_url)

import requests

CLIENT_SECRET = "09d1fd8afff00e9d24ebec5043a895cc48fae3ad"

@app.get("/auth/github/callback")
def github_callback(code: str):
    token_url = "https://github.com/login/oauth/access_token"

    response = requests.post(
        token_url,
        headers={"Accept": "application/json"},
        data={
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "code": code,
        },
    )

    token_data = response.json()
    access_token = token_data.get("access_token")  # 👈 ADD THIS

    return   RedirectResponse(f"{FRONTEND_URL}?token={access_token}")

@app.get("/repos")
def get_all_repos(token: str):
    all_repos = []
    
    page = 1

    while True:
        response = requests.get(
            "https://api.github.com/user/repos",
            headers={"Authorization": f"Bearer {token}"},
            params={"per_page": 100, "page": page}
        )

        data = response.json()

        if not data:
            break

        all_repos.extend(data)
        page += 1

    only_repo_names=[repo["name"] for repo in all_repos]

    return only_repo_names