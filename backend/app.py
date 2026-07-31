from flask import Flask, jsonify
from flask_cors import CORS
from config import Config

from routes.auth_routes import auth_bp
from routes.resume_routes import resume_bp
from routes.interview_routes import interview_bp
from routes.coding_routes import coding_bp
from routes.career_routes import career_bp
from routes.gamification_routes import gamification_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable CORS for all routes
    CORS(app, resources={r"/*": {"origins": "*"}})

    # Register Blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(resume_bp, url_prefix='/api/resume')
    app.register_blueprint(interview_bp, url_prefix='/api/interview')
    app.register_blueprint(coding_bp, url_prefix='/api/coding')
    app.register_blueprint(career_bp, url_prefix='/api/career')
    app.register_blueprint(gamification_bp, url_prefix='/api/gamification')

    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({
            'status': 'healthy',
            'app': 'AI Interview Coach Backend API',
            'version': '1.0.0'
        }), 200

    return app

app = create_app()

if __name__ == '__main__':
    print(f"🚀 AI Interview Coach Backend running on port {Config.PORT}")
    app.run(host='0.0.0.0', port=Config.PORT, debug=Config.DEBUG)
