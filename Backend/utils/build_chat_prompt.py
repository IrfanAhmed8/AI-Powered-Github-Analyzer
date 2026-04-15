
def build_chat_prompt(context, question):
    formatted_context = ""

    for file, content in context.items():
        formatted_context += f"\n\n--- {file} ---\n{content[:1000]}"

    return f"""
You are a senior software engineer.

Answer the question based ONLY on the given repository context.

Rules:
- Be concise (max 5 lines)
- Do not hallucinate
- If not found, say "Not found in the codebase"

Context:
{formatted_context[:4000]}

Question:
{question}
"""