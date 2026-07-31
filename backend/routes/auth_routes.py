import datetime
import jwt
from flask import Blueprint, request, jsonify
from config import Config
from services.db_service import db_instance, db_type

auth_bp = Blueprint('auth', __name__)

def generate_token(user_id, email, name):
    payload = {
        'user_id': str(user_id),
        'email': email,
        'name': name,
        'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=7)
    }
    return jwt.encode(payload, Config.SECRET_KEY, algorithm='HS256')

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    email = data.get('email', '').strip().lower()
    password = data.get('password', '').strip()
    name = data.get('name', '').strip()

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    # Check if user exists
    if db_type == "mongodb":
        existing = db_instance.users.find_one({'email': email})
    else:
        existing = db_instance.find_one('users', {'email': email})

    if existing:
        return jsonify({'error': 'User already exists with this email'}), 400

    new_user = {
        'name': name or email.split('@')[0].capitalize(),
        'email': email,
        'password': password, # Note: in production, hash with bcrypt
        'target_role': 'Software Engineer',
        'xp': 120,
        'level': 2,
        'streak': 3,
        'badges': ['First Step', 'Resume Uploaded', 'Interview Novice'],
        'created_at': datetime.datetime.now(datetime.timezone.utc).isoformat()
    }

    if db_type == "mongodb":
        res = db_instance.users.insert_one(new_user)
        user_id = str(res.inserted_id)
    else:
        user_id = db_instance.insert('users', new_user)

    token = generate_token(user_id, email, new_user['name'])
    return jsonify({
        'message': 'Registration successful',
        'token': token,
        'user': {
            'id': user_id,
            'name': new_user['name'],
            'email': email,
            'xp': new_user['xp'],
            'level': new_user['level'],
            'streak': new_user['streak'],
            'badges': new_user['badges']
        }
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = data.get('email', '').strip().lower()
    password = data.get('password', '').strip()

    if db_type == "mongodb":
        user = db_instance.users.find_one({'email': email})
    else:
        user = db_instance.find_one('users', {'email': email})

    if not user or user.get('password') != password:
        return jsonify({'error': 'Invalid credentials'}), 401

    user_id = str(user.get('_id'))
    token = generate_token(user_id, user['email'], user['name'])

    return jsonify({
        'message': 'Login successful',
        'token': token,
        'user': {
            'id': user_id,
            'name': user['name'],
            'email': user['email'],
            'xp': user.get('xp', 150),
            'level': user.get('level', 2),
            'streak': user.get('streak', 3),
            'badges': user.get('badges', ['First Step', 'Resume Uploaded'])
        }
    }), 200

@auth_bp.route('/me', methods=['GET'])
def get_current_user():
    auth_header = request.headers.get('Authorization', '')
    if not auth_header.startswith('Bearer '):
        return jsonify({
            'user': {
                'id': 'demo_user_123',
                'name': 'Alex Johnson',
                'email': 'alex@example.com',
                'target_role': 'Software Engineer',
                'xp': 350,
                'level': 3,
                'streak': 5,
                'badges': ['First Step', 'Resume Uploaded', 'Code Ninja', 'Streak Master']
            }
        }), 200

    token = auth_header.split(' ')[1]
    try:
        payload = jwt.decode(token, Config.SECRET_KEY, algorithms=['HS256'])
        return jsonify({'user': payload}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401
