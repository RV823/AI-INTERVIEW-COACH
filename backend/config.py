import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'ai-interview-coach-super-secret-key-2026')
    MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/ai_interview_coach')
    GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', '')
    PORT = int(os.getenv('PORT', 5000))
    DEBUG = os.getenv('DEBUG', 'True').lower() == 'true'
