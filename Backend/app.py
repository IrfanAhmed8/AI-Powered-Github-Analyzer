from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, HttpUrl
from service.repo_service import clone_repo
from utils.analyzer import directory_traverse

app = FastAPI()

class RepoRequest(BaseModel):
    repo_url: HttpUrl

@app.post("/analyze")
async def analyze_github_repo(data: RepoRequest):
    try:
        repo_url = str(data.repo_url)

        if not repo_url.startswith("https://github.com/"):
            raise HTTPException(status_code=400, detail="Invalid GitHub URL")

        repo_name, repo_path = clone_repo(repo_url)

        analysis = directory_traverse(repo_path)

        return {
            "message": "Repo analyzed successfully",
            "repo_name": repo_name,
            "analysis": analysis
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))