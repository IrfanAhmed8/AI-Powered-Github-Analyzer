def clean_chunks(chunks):
    return [
        {
            "content": c["content"],
            "file_path": c["file_path"],
            "file_name": c["file_name"],
            "chunk_id": c["chunk_id"],
            "language": c["language"]
        }
        for c in chunks
    ]