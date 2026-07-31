import random
from services.gemini_service import generate_ai_json, generate_ai_text

DEFAULT_QUESTION_BANK = {
    "Software Engineer": {
        "Technical": [
            "What is the difference between process and thread in operating systems, and how do you handle concurrency?",
            "Explain how REST APIs work and contrast them with GraphQL or gRPC.",
            "How does database indexing improve query performance, and what are its trade-offs?",
            "Describe the Model-View-Controller (MVC) architectural pattern and its advantages.",
            "What is garbage collection in memory management and how does it prevent memory leaks?"
        ],
        "HR": [
            "Tell me about yourself and why you chose a career in software engineering.",
            "Where do you see yourself professionally in 3 to 5 years?",
            "Why are you interested in joining our company specifically?"
        ],
        "Behavioral": [
            "Describe a situation where you had a disagreement with a team member on technical design. How did you resolve it?",
            "Tell me about a project that failed or missed a deadline. What went wrong and what did you learn?",
            "How do you prioritize competing tasks under tight project deadlines?"
        ]
    },
    "Data Analyst": {
        "Technical": [
            "How do INNER JOIN, LEFT JOIN, and FULL OUTER JOIN differ in SQL?",
            "What is data normalization and why is it important in database design?",
            "Explain the difference between mean, median, and mode, and when to use each for skewed data.",
            "How do you clean and handle missing values in a large dataset using Pandas?",
            "What metrics would you use to measure user retention for a subscription app?"
        ],
        "HR": [
            "What inspired you to pursue data analytics?",
            "How do you communicate complex statistical insights to non-technical stakeholders?"
        ],
        "Behavioral": [
            "Describe a time when your analysis uncovered an unexpected trend. How did you present your findings?",
            "How do you ensure accuracy and eliminate bias in your data reporting?"
        ]
    },
    "AI Engineer": {
        "Technical": [
            "Explain the difference between supervised, unsupervised, and reinforcement learning.",
            "What is overfitting in machine learning models and what techniques prevent it?",
            "How do Transformer architectures and attention mechanisms work in modern LLMs?",
            "Describe precision, recall, and F1-score. When would you optimize for precision over recall?",
            "How do you evaluate and fine-tune a pre-trained model for a specialized domain task?"
        ],
        "HR": [
            "Why do you want to specialize in Artificial Intelligence?",
            "How do you stay updated with rapidly evolving AI research and tools?"
        ],
        "Behavioral": [
            "Give an example of an AI model that didn't perform well in production. How did you diagnose and fix it?",
            "How do you handle ethical considerations and data privacy in AI development?"
        ]
    },
    "Web Developer": {
        "Technical": [
            "Explain the Event Loop in JavaScript and how asynchronous operations are processed.",
            "What is the difference between Virtual DOM and Real DOM in React?",
            "How do CSS Flexbox and Grid layouts differ, and when should you use each?",
            "What techniques do you use to optimize website load time and Core Web Vitals (LCP, INP, CLS)?",
            "How do Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF) work, and how do you prevent them?"
        ],
        "HR": [
            "What sparked your passion for web development?",
            "How do you balance rapid feature delivery with clean code standards?"
        ],
        "Behavioral": [
            "Tell me about a complex UI component you built. What challenges did you face?",
            "How do you handle feedback from UI/UX designers when technical constraints arise?"
        ]
    },
    "Product Manager": {
        "Technical": [
            "How do you define and prioritize product features using frameworks like RICE or Kano?",
            "How do you run effective A/B tests and determine statistical significance?",
            "What metrics do you track for measuring product-market fit?"
        ],
        "HR": [
            "Why product management, and what makes a great Product Manager?",
            "How do you align cross-functional engineering, design, and business teams?"
        ],
        "Behavioral": [
            "Describe a time when you had to say 'no' to a major feature request from executive leadership.",
            "Tell me about a product release that launched with bugs. How did you lead the post-mortem?"
        ]
    },
    "HR Interview": {
        "HR": [
            "Tell me about yourself, your background, and your key career accomplishments.",
            "What are your greatest professional strengths and your biggest area for growth?",
            "Describe your ideal work environment and team culture.",
            "What is your salary expectations and what factors guide your decision?",
            "Why should we hire you over other qualified candidates?"
        ],
        "Behavioral": [
            "Describe a conflict you experienced with a manager and how you handled it.",
            "How do you maintain motivation and productivity when handling repetitive tasks?"
        ]
    }
}

def get_next_question(role="Software Engineer", difficulty="Intermediate", interview_type="Technical", question_index=0, previous_qa=None):
    """Fetches or generates the next interview question with dynamic follow-up logic."""
    
    role_dict = DEFAULT_QUESTION_BANK.get(role, DEFAULT_QUESTION_BANK["Software Engineer"])
    type_questions = role_dict.get(interview_type, role_dict.get("Technical", []))
    
    # Check if we should ask a follow-up question based on the candidate's previous response
    if previous_qa and len(previous_qa) > 0 and question_index > 0:
        last_item = previous_qa[-1]
        last_answer = last_item.get("answer", "").strip()
        last_question = last_item.get("question", "")
        
        if len(last_answer) > 25 and len(previous_qa) % 2 == 1:
            # Generate adaptive follow-up
            prompt = f"As an expert {role} interviewer, the candidate was asked '{last_question}' and answered: '{last_answer}'. Ask ONE concise, sharp follow-up question probing deeper into their answer."
            fallback_followup = f"You mentioned {last_answer[:30]}... Could you elaborate on how you evaluated trade-offs during that process?"
            followup_text = generate_ai_text(prompt, fallback_followup)
            return {
                "question_id": f"q_{question_index}_followup",
                "question": followup_text,
                "is_followup": True,
                "interviewer_note": "Probing answer depth & technical trade-offs"
            }

    # Standard question selection
    idx = min(question_index, len(type_questions) - 1)
    base_q = type_questions[idx] if type_questions else "Tell me about a technical project you are proud of."
    
    return {
        "question_id": f"q_{question_index}",
        "question": base_q,
        "is_followup": False,
        "interviewer_note": f"{difficulty} level {interview_type} question"
    }

def compile_final_interview_report(role, difficulty, type_name, qa_list, speech_metrics=None, face_metrics=None):
    """Compiles post-interview evaluation report cards with scores and actionable feedback."""
    
    answers_count = len(qa_list)
    avg_answer_len = sum([len(item.get("answer", "").split()) for item in qa_list]) / max(1, answers_count)
    
    # Base heuristic scoring
    technical_score = min(96, max(60, int(avg_answer_len * 1.5 + 40)))
    communication_score = min(98, max(65, int(speech_metrics.get("fluency_score", 82) if speech_metrics else 84)))
    confidence_score = min(95, max(60, int(face_metrics.get("confidence_score", 85) if face_metrics else 85)))
    grammar_score = min(98, max(70, int(speech_metrics.get("grammar_score", 88) if speech_metrics else 88)))
    eye_contact_score = min(96, max(60, int(face_metrics.get("eye_contact_ratio", 80) * 100 if face_metrics else 82)))
    speech_rate_score = min(95, max(65, int(speech_metrics.get("wpm_score", 85) if speech_metrics else 85)))
    vocab_score = min(94, max(68, int(speech_metrics.get("vocab_score", 80) if speech_metrics else 83)))
    professionalism_score = min(98, max(75, int((confidence_score + communication_score) / 2)))

    overall_score = int(
        technical_score * 0.25 +
        communication_score * 0.20 +
        confidence_score * 0.15 +
        grammar_score * 0.10 +
        eye_contact_score * 0.10 +
        speech_rate_score * 0.10 +
        professionalism_score * 0.10
    )

    fallback_report = {
        "overall_score": overall_score,
        "scores": {
            "technical_knowledge": technical_score,
            "communication": communication_score,
            "confidence": confidence_score,
            "grammar": grammar_score,
            "eye_contact": eye_contact_score,
            "speech_rate": speech_rate_score,
            "vocabulary": vocab_score,
            "professionalism": professionalism_score
        },
        "strengths": [
            f"Strong domain understanding suitable for a {difficulty} {role}",
            "Structured response delivery with clear problem articulation",
            "Maintained steady eye contact and positive posture during responses"
        ],
        "weaknesses": [
            "Could provide more quantitative metrics to back up achievement claims",
            "Slight reliance on filler words during complex technical explanations",
            "Opportunity to explain system architecture trade-offs more explicitly"
        ],
        "improvement_plan": [
            "Practice the STAR method (Situation, Task, Action, Result) for behavioral questions",
            "Record 2-minute mock answers to refine speaking pace to ~130-150 words per minute",
            "Review edge cases and system design trade-offs before technical rounds"
        ],
        "suggested_courses": [
            f"Advanced {role} Interview Masterclass",
            "System Design & Scalable Architecture Fundamentals",
            "Executive Communication & Public Speaking for Tech Leaders"
        ],
        "recommended_projects": [
            "Build a Distributed Microservices Application with Redis caching",
            "Implement a Real-time Data Pipeline with WebSocket streaming"
        ]
    }

    # Refine with Gemini API if key is set
    prompt = f"""Evaluate this candidate's mock interview performance:
Role: {role} ({difficulty}) - Type: {type_name}
Q&A History: {str(qa_list)[:2000]}
Speech Metrics: {speech_metrics}
Face Metrics: {face_metrics}

Return an evaluation object containing overall_score (0-100), scores breakdown dict, strengths list, weaknesses list, improvement_plan list, suggested_courses list, recommended_projects list.
"""

    report = generate_ai_json(prompt, fallback_report)
    return report
