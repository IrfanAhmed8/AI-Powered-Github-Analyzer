import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def generate_ai_insights(prompt):
    model = genai.GenerativeModel("gemini-flash-latest")

    response = model.generate_content(prompt)

    return response.text