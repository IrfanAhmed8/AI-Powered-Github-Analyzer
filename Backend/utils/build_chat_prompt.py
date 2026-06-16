def build_chat_prompt(context, question):

    formatted_context = ""

    for i, chunk in enumerate(context):
        formatted_context += (
            f"File: {chunk['file_path']}\n"
            f"{chunk['content']}\n\n"
        )

    prompt = f"""
You are a senior software engineer.

Answer the question based ONLY on the repository context.

Rules:
- Be concise
- Mention file paths
- Do not hallucinate
- If not found, say "Not found in the codebase"

Context:
{formatted_context[:4000]}

Question:
{question}
"""

    return prompt