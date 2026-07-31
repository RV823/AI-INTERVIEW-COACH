from flask import Blueprint, jsonify

gamification_bp = Blueprint('gamification', __name__)

@gamification_bp.route('/stats', methods=['GET'])
def get_stats():
    return jsonify({
        'user': {
            'name': 'Alex Johnson',
            'xp': 450,
            'level': 3,
            'streak': 5,
            'next_level_xp': 600
        },
        'daily_challenges': [
            {'id': 'c1', 'title': 'Complete 1 Technical Mock Interview', 'xp_reward': 50, 'completed': True},
            {'id': 'c2', 'title': 'Score > 85% on ATS Resume Scanner', 'xp_reward': 40, 'completed': True},
            {'id': 'c3', 'title': 'Solve 1 Coding Interview Challenge', 'xp_reward': 60, 'completed': False}
        ],
        'badges': [
            {'id': 'b1', 'title': 'First Step', 'description': 'Completed initial profile setup', 'unlocked': True, 'icon': 'Target'},
            {'id': 'b2', 'title': 'Resume Master', 'description': 'Achieved an ATS score above 85%', 'unlocked': True, 'icon': 'FileText'},
            {'id': 'b3', 'title': 'Code Ninja', 'description': 'Solved a hard coding challenge', 'unlocked': True, 'icon': 'Code'},
            {'id': 'b4', 'title': 'Streak Master', 'description': 'Maintained a 5-day practice streak', 'unlocked': True, 'icon': 'Flame'},
            {'id': 'b5', 'title': 'Speech Guru', 'description': 'Fluency score above 90%', 'unlocked': False, 'icon': 'Mic'}
        ],
        'leaderboard': [
            {'rank': 1, 'name': 'Sarah Chen', 'xp': 1420, 'streak': 14, 'level': 8, 'avatar': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'},
            {'rank': 2, 'name': 'Marcus Vance', 'xp': 1180, 'streak': 9, 'level': 7, 'avatar': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'},
            {'rank': 3, 'name': 'Alex Johnson (You)', 'xp': 450, 'streak': 5, 'level': 3, 'avatar': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'},
            {'rank': 4, 'name': 'Elena Rostova', 'xp': 390, 'streak': 4, 'level': 3, 'avatar': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100'},
            {'rank': 5, 'name': 'David Kim', 'xp': 310, 'streak': 2, 'level': 2, 'avatar': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'}
        ]
    }), 200
