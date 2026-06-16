import json
import os

def save_repo_index(repo_name, embedded_chunks):

    os.makedirs("repo_indexes", exist_ok=True)

    path = f"repo_indexes/{repo_name}.json"

    with open(path, "w", encoding="utf-8") as f:
        json.dump(embedded_chunks, f)

def load_repo_index(repo_name):
    path = f"repo_indexes/{repo_name}.json"
    if not os.path.exists(path):
        raise FileNotFoundError(f"Index for repo {repo_name} not found.")
    with open(path, "r", encoding="utf-8") as f:
        embedded_chunks = json.load(f)
    return embedded_chunks