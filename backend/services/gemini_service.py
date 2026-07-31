import os
import json
from config import Config

try:
    import google.generativeai as genai
    if Config.GEMINI_API_KEY:
        genai.configure(api_key=Config.GEMINI_API_KEY)
        gemini_model = genai.GenerativeModel('gemini-1.5-flash')
    else:
        gemini_model = None
except Exception as e:
    gemini_model = None

def generate_ai_text(prompt, fallback_text=""):
    """Calls Gemini API if configured, else returns rule-based smart fallback."""
    if gemini_model:
        try:
            response = gemini_model.generate_content(prompt)
            if response and response.text:
                return response.text.strip()
        except Exception as err:
            print(f"[Gemini API Error]: {err}")
    return fallback_text

def generate_ai_json(prompt, fallback_json):
    """Generates structured JSON response via Gemini API or returns fallback JSON."""
    if gemini_model:
        try:
            full_prompt = prompt + "\nRespond strictly in valid JSON format without markdown code blocks."
            response = gemini_model.generate_content(full_prompt)
            if response and response.text:
                cleaned = response.text.replace("```json", "").replace("```", "").strip()
                return json.loads(cleaned)
        except Exception as err:
            print(f"[Gemini JSON Error]: {err}")
    return fallback_json
