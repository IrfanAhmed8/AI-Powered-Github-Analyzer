import numpy as np
from sentence_transformers import SentenceTransformer

# ✅ Load once globally
model = SentenceTransformer("all-MiniLM-L6-v2")


def cosine_similarity(a, b):
    a = np.array(a)
    b = np.array(b)
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))


def get_embedding(text):
    return model.encode(text).tolist()


def embed_chunks(chunks):
    embedded_chunks = []

    for chunk in chunks:
        embedding = get_embedding(chunk["content"])

        chunk_with_embedding = {
            **chunk,
            "embedding": embedding
        }

        embedded_chunks.append(chunk_with_embedding)

    return embedded_chunks