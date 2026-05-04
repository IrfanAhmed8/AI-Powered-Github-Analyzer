def chunk_file(content, chunk_size=80, overlap=20):
    lines = content.split("\n")
    chunks = []

    for i in range(0, len(lines), chunk_size - overlap):
        chunk = "\n".join(lines[i:i + chunk_size])
        if chunk.strip():
            chunks.append(chunk)

    return chunks