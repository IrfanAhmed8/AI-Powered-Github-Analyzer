from utils.embed_chunks import (
    cosine_similarity,
    get_embedding
)
from utils.keyword_score import keyword_score

def search_chunks(query, embedded_chunks, top_k=5):

    query_embedding = get_embedding(query)

    results = []

    for chunk in embedded_chunks:

        vector_score = cosine_similarity(
            query_embedding,
            chunk["embedding"]
        )

        searchable_text = f"""
{chunk['file_name']}
{chunk['file_path']}
{chunk['content']}
"""

        lexical_score = keyword_score(
            query,
            searchable_text
        )

        final_score = (
            0.8 * vector_score +
            0.2 * lexical_score
        )

        results.append((final_score, chunk))

    results.sort(
        key=lambda x: x[0],
        reverse=True
    )

    for score, chunk in results[:top_k]:
        print(
            f"Score: {score:.4f}, "
            f"File: {chunk['file_name']}, "
            f"Path: {chunk['file_path']}"
        )

    return [chunk for _, chunk in results[:top_k]]