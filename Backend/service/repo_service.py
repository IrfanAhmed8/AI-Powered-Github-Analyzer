from git import Repo
import os

BASE_DIR = "repos"

def clone_repo(repo_url: str):
    os.makedirs(BASE_DIR, exist_ok=True)

    repo_name = repo_url.split("/")[-1].replace(".git", "")
    repo_path = os.path.join(BASE_DIR, repo_name)

    if not os.path.exists(repo_path):
        Repo.clone_from(repo_url, repo_path)

    return repo_name, repo_path