from flask import Blueprint, request, jsonify
from services.resume_service import extract_text_from_file, analyze_resume_content
from services.db_service import db_instance, db_type

resume_bp = Blueprint('resume', __name__)

@resume_bp.route('/analyze', methods=['POST'])
def analyze_resume():
    target_role = request.form.get('target_role', 'Software Engineer')
    resume_text = ""

    if 'file' in request.files:
        file = request.files['file']
        if file.filename != '':
            resume_text = extract_text_from_file(file, file.filename)

    if not resume_text:
        data = request.get_json(silent=True) or {}
        resume_text = data.get('resume_text', '')
        target_role = data.get('target_role', target_role)

    if not resume_text or len(resume_text.strip()) < 20:
        return jsonify({'error': 'Please provide valid resume text or upload a PDF/DOCX file'}), 400

    analysis = analyze_resume_content(resume_text, target_role)

    # Store analysis record
    record = {
        'target_role': target_role,
        'ats_score': analysis.get('ats_score'),
        'analysis': analysis
    }
    
    if db_type == "mongodb":
        db_instance.resumes.insert_one(record)
    else:
        db_instance.insert('resumes', record)

    return jsonify({
        'message': 'Resume analysis complete',
        'data': analysis
    }), 200
