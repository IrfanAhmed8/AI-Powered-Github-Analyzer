def get_repo_full_name(repo_url: str):
    parts = repo_url.rstrip("/").split("/")
    
    owner = parts[-2]
    repo = parts[-1]

    return f"{owner}/{repo}"