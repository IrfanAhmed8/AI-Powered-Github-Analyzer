from utils.embed_chunks import cosine_similarity, get_embedding, embed_chunks   
def search_chunks(query, embedded_chunks, top_k=5):
    query_embedding = get_embedding(query)

    results = []

    for chunk in embedded_chunks:
        score = cosine_similarity(query_embedding, chunk["embedding"])
        results.append((score, chunk))

    results.sort(key=lambda x: x[0], reverse=True)

    return [chunk for _, chunk in results[:top_k]]