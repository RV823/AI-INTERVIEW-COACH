from flask import Blueprint, request, jsonify
from services.gemini_service import generate_ai_json

career_bp = Blueprint('career', __name__)

@career_bp.route('/roadmap', methods=['POST'])
def generate_career_roadmap():
    data = request.get_json() or {}
    target_role = data.get('target_role', 'Software Engineer')
    experience_level = data.get('experience_level', 'Intermediate')

    fallback_roadmap = {
        "target_role": target_role,
        "summary": f"Personalized 6-month career acceleration roadmap for an aspiring {experience_level} {target_role}.",
        "phases": [
            {
                "month": "Month 1-2",
                "title": "Core Fundamentals & System Design",
                "milestones": [
                    "Master Data Structures & Algorithms (Trees, Graphs, Dynamic Programming)",
                    "Learn RESTful API & Microservice architecture design",
                    "Understand database optimization & indexing strategies"
                ],
                "recommended_certifications": ["AWS Certified Solutions Architect"]
            },
            {
                "month": "Month 3-4",
                "title": "Production Engineering & DevOps",
                "milestones": [
                    "Containerize applications with Docker & Kubernetes",
                    "Configure GitHub Actions for automated CI/CD pipelines",
                    "Implement observability with Prometheus & Grafana"
                ],
                "recommended_certifications": ["Docker Certified Associate"]
            },
            {
                "month": "Month 5-6",
                "title": "Portfolio & Mock Interview Mastery",
                "milestones": [
                    "Build a scalable full-stack web application with AI capabilities",
                    "Complete 25+ AI Mock Interviews focusing on system design & behavioral rounds",
                    "Polish resume and LinkedIn profile for target hiring managers"
                ],
                "recommended_certifications": ["Google Cloud Professional Engineer"]
            }
        ],
        "key_skills_to_learn": ["Docker", "Kubernetes", "System Design", "GraphQL", "CI/CD", "TypeScript"],
        "internship_or_job_portals": ["LinkedIn Jobs", "Wellfound (AngelList)", "Y Combinator Workatastartup", "Levels.fyi"]
    }

    prompt = f"Generate a detailed 6-month career development plan and skill roadmap for a {experience_level} candidate wanting to become a {target_role}. Return JSON with target_role, summary, phases list, key_skills_to_learn list, internship_or_job_portals list."
    roadmap = generate_ai_json(prompt, fallback_roadmap)
    return jsonify(roadmap), 200
