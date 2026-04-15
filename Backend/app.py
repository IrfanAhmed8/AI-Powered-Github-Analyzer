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
app = FastAPI()

class RepoRequest(BaseModel):
    repo_url: HttpUrl

class ChatRequest(BaseModel):
    repo_name: str
    user_query: str
    selected_files:list[str] = None
REPO_PATH=""
@app.post("/analyze")
async def analyze_github_repo(data: RepoRequest):
    try:
        repo_url = str(data.repo_url)

        if not repo_url.startswith("https://github.com/"):
            raise HTTPException(status_code=400, detail="Invalid GitHub URL")

        repo_name, REPO_PATH = clone_repo(repo_url)

        analysis = directory_traverse(REPO_PATH)

        return {
            "message": "Repo analyzed successfully",
            "repo_name": repo_name,
            "analysis": analysis
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
        prompt = build_chat_prompt(context, user_query)
        response = generate_ai_insights(prompt)
        store_chat_history(repo_name, user_query, response)
        return {
            "repo_name": repo_name,
            "answer": response
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))