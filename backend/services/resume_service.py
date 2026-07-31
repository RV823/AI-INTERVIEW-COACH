import re
from services.gemini_service import generate_ai_json

def extract_text_from_file(file_obj, filename):
    """Extracts text from PDF, DOCX or plain text files."""
    text = ""
    ext = filename.split('.')[-1].lower() if '.' in filename else ''
    
    try:
        if ext == 'pdf':
            import pypdf
            reader = pypdf.PdfReader(file_obj)
            for page in reader.pages:
                t = page.extract_text()
                if t:
                    text += t + "\n"
        elif ext in ['docx', 'doc']:
            import docx
            doc = docx.Document(file_obj)
            for p in doc.paragraphs:
                text += p.text + "\n"
        else:
            text = file_obj.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"Error parsing resume file: {e}")
        text = str(file_obj.read(), errors='ignore')
        
    return text.strip()

def analyze_resume_content(resume_text, target_role="Software Engineer"):
    """Evaluates ATS score, missing skills, wording, projects, grammar, and interview questions."""
    
    # Required core skill keywords by role
    role_keywords = {
        "Software Engineer": ["python", "javascript", "data structures", "algorithms", "git", "rest api", "sql", "docker", "unit testing", "ci/cd"],
        "Data Analyst": ["python", "sql", "pandas", "tableau", "power bi", "excel", "statistics", "data visualization", "etl", "r"],
        "AI Engineer": ["python", "pytorch", "tensorflow", "machine learning", "deep learning", "nlp", "llm", "transformers", "scikit-learn", "opencv"],
        "Web Developer": ["javascript", "react", "html5", "css3", "node.js", "typescript", "tailwind", "responsive design", "web accessibility", "graphql"],
        "Product Manager": ["roadmap", "agile", "scrum", "user research", "kpi", "metrics", "stakeholder management", "wireframing", "product strategy", "jira"]
    }

    target_keywords = role_keywords.get(target_role, role_keywords["Software Engineer"])
    
    # Calculate keyword match
    found_skills = []
    missing_skills = []
    text_lower = resume_text.lower()
    
    for kw in target_keywords:
        if kw in text_lower:
            found_skills.append(kw.title())
        else:
            missing_skills.append(kw.title())

    # Basic ATS calculation algorithm
    length_score = min(100, max(40, len(resume_text.split()) // 3))
    skills_score = int((len(found_skills) / max(1, len(target_keywords))) * 100)
    
    # Check action verbs
    action_verbs = ["developed", "engineered", "implemented", "managed", "led", "architected", "increased", "reduced", "optimized", "built", "designed", "created", "spearheaded"]
    verbs_found = [v for v in action_verbs if v in text_lower]
    action_verb_score = min(100, len(verbs_found) * 15)

    ats_score = int((skills_score * 0.5) + (action_verb_score * 0.3) + (length_score * 0.2))
    ats_score = min(98, max(52, ats_score))

    # Construct Fallback JSON
    fallback_analysis = {
        "ats_score": ats_score,
        "formatting_score": 88,
        "keyword_match_score": skills_score,
        "impact_score": action_verb_score,
        "detected_role": target_role,
        "found_skills": found_skills if found_skills else ["Communication", "Problem Solving", "Teamwork"],
        "missing_skills": missing_skills if missing_skills else ["Docker", "CI/CD Pipeline", "Kubernetes"],
        "wording_suggestions": [
            "Use strong metric-driven action verbs (e.g., 'Increased throughput by 40%')",
            "Ensure technical skills section lists proficiency levels for key frameworks",
            "Quantify results in project descriptions with concrete figures"
        ],
        "improved_bullets": [
            "Original: 'Worked on React frontend application.' -> Improved: 'Engineered responsive React SPA boosting user engagement by 35% across mobile devices.'",
            "Original: 'Created backend APIs in Python.' -> Improved: 'Architected scalable REST APIs using Python Flask, handling over 10k daily requests with sub-100ms latency.'"
        ],
        "recommended_projects": [
            f"Build a Full-Stack {target_role} Dashboard with authentication and real-time metrics",
            "Implement a Cloud-native microservices backend deployed on Docker & AWS"
        ],
        "recommended_certifications": [
            "AWS Certified Developer / Cloud Practitioner",
            "Meta Professional Frontend / Backend Certification",
            "HashiCorp Terraform or Docker Certified Associate"
        ],
        "grammar_issues": [
            "Ensure consistent tense usage in experience bullet points (past tense for previous roles)",
            "Check spacing after punctuation in project summaries"
        ],
        "generated_interview_questions": [
            f"Based on your resume, describe a complex challenge you faced while implementing a {target_role} project.",
            "How did you optimize performance or reduce latency in your recent applications?",
            "Can you explain your design choices for the database schema in your listed portfolio project?"
        ]
    }

    # Attempt AI refinement via Gemini API if available
    prompt = f"""Analyze this candidate's resume for the target role of '{target_role}':

RESUME TEXT:
{resume_text[:2500]}

Provide ATS scoring, missing skills, bullet improvements, recommended projects, certifications, grammar issues, and 3 personalized technical interview questions based on their projects.
"""

    analysis = generate_ai_json(prompt, fallback_analysis)
    return analysis
