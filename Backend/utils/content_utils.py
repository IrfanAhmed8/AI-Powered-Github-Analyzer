#traverse through folder and get the content of important files like readme, index.js,app.js,package.json,requirements.txt etc and return as a dictionary with file name as key and content as value
import os
def get_imp_file_content(repo_path):
    important_files=["README.md","readme.md","index.js","app.js","package.json","requirements.txt"]
    file_content={}
    if not os.path.exists(repo_path):
        raise FileNotFoundError(f"Repo path {repo_path} does not exist.")
    for root, dirs, files in os.walk(repo_path):
        for file in files:
            if file in important_files:
                with open(os.path.join(root, file), "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()
                    relative_path = os.path.relpath(os.path.join(root, file), repo_path)
                    file_content[relative_path] = content
    return file_content