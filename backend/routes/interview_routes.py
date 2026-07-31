from flask import Blueprint, request, jsonify
from services.interview_service import get_next_question, compile_final_interview_report
from services.db_service import db_instance, db_type

interview_bp = Blueprint('interview', __name__)

@interview_bp.route('/next-question', methods=['POST'])
def next_question():
    data = request.get_json() or {}
    role = data.get('role', 'Software Engineer')
    difficulty = data.get('difficulty', 'Intermediate')
    type_name = data.get('type', 'Technical')
    question_index = data.get('question_index', 0)
    previous_qa = data.get('previous_qa', [])

    q_data = get_next_question(role, difficulty, type_name, question_index, previous_qa)
    return jsonify(q_data), 200

@interview_bp.route('/finish', methods=['POST'])
def finish_interview():
    data = request.get_json() or {}
    role = data.get('role', 'Software Engineer')
    difficulty = data.get('difficulty', 'Intermediate')
    type_name = data.get('type', 'Technical')
    qa_list = data.get('qa_list', [])
    speech_metrics = data.get('speech_metrics', {})
    face_metrics = data.get('face_metrics', {})

    report = compile_final_interview_report(
        role, difficulty, type_name, qa_list, speech_metrics, face_metrics
    )

    record = {
        'role': role,
        'difficulty': difficulty,
        'type': type_name,
        'overall_score': report.get('overall_score'),
        'report': report
    }

    if db_type == "mongodb":
        db_instance.interviews.insert_one(record)
    else:
        db_instance.insert('interviews', record)

    return jsonify({
        'message': 'Interview completed successfully',
        'report': report
    }), 200
