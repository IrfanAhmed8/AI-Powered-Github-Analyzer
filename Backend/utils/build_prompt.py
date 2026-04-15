def build_prompt(content):
    return f"""
You are a senior software engineer.

Return ONLY valid JSON in this format:
Only use information present in the provided code.
If something is not explicitly found, say "Not specified".
Return maximum 5 key features only
{{
  "summary": "",
  "architecture": "",
  "features": []
}}

Analyze this repository:


Code:
{content}
"""