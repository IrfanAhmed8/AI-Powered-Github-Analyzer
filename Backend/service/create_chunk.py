import os
from utils.chunk_file import chunk_file
def create_chunk(repo_path):
    chunks = []
    VALID_EXTENSIONS = {".py", ".js", ".java", ".jsx", ".cpp", ".c", ".rb", ".go", ".ts",".md",".css",".html"}
    IGNORE_PATTERNS = [
    ".test.js",
    ".css",
    ".html",
    "package-lock.json"
]
    for root, dirs, files in os.walk(repo_path):
        dirs[:] = [d for d in dirs if d not in {".git", "node_modules", "venv"}]
        for file in files:
            if any(pattern in file for pattern in IGNORE_PATTERNS):
                continue
            ext = os.path.splitext(file)[1]
            if ext not in VALID_EXTENSIONS:
                continue
            
            file_path = os.path.join(root, file)
            try:
                with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                    content= f.read()
            except Exception as e:
                continue
            file_chunks=chunk_file(content)
            for i, chunk in enumerate(file_chunks):
                chunks.append({
                    "content": chunk,
                    "file_path": os.path.relpath(file_path, repo_path),
                    "file_name": os.path.basename(file_path),
                    "chunk_id": f"{os.path.basename(file_path)}_{i}",
                    "language": ext
                })

    return chunks
                