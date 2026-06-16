from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct
import uuid
from qdrant_client.models import Filter, FieldCondition, MatchValue
from utils.embed_chunks import get_embedding
from qdrant_client.models import (
    VectorParams,
    Distance
)

client = QdrantClient(
    host="localhost",
    port=6333
)


def create_collection():

    collections = client.get_collections()

    existing = [
        c.name
        for c in collections.collections
    ]

    if "repo_chunks" not in existing:

        client.create_collection(
            collection_name="repo_chunks",
            vectors_config=VectorParams(
                size=384,
                distance=Distance.COSINE
            )
        )

        print("Collection created")

    else:
        print("Collection already exists")

def upsert_chunks(repo_name, embedded_chunks):

    points = []

    for chunk in embedded_chunks:

        point = PointStruct(
            id=str(uuid.uuid4()),
            vector=chunk["embedding"],
            payload={
                "repo_name": repo_name,
                "file_path": chunk["file_path"],
                "file_name": chunk["file_name"],
                "language": chunk["language"],
                "chunk_id": chunk["chunk_id"],
                "content": chunk["content"]
            }
        )

        points.append(point)

    client.upsert(
        collection_name="repo_chunks",
        points=points
    )

    print(f"Inserted {len(points)} chunks")

def search_chunks_qdrant(
    repo_name,
    query,
    top_k=5
):

    query_vector = get_embedding(query)

    results = client.query_points(
        collection_name="repo_chunks",
        query=query_vector,
        limit=top_k,
        query_filter=Filter(
            must=[
                FieldCondition(
                    key="repo_name",
                    match=MatchValue(value=repo_name)
                )
            ]
        )
    )

    chunks = []

    for result in results.points:

        payload = result.payload

        chunks.append({
            "content": payload["content"],
            "file_path": payload["file_path"],
            "file_name": payload["file_name"],
            "language": payload["language"],
            "chunk_id": payload["chunk_id"]
        })

        print(
            f"Score: {result.score:.4f}, "
            f"File: {payload['file_name']}"
        )

    return chunks