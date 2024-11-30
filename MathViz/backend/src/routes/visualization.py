from flask import Blueprint, request, jsonify, make_response
from flask_jwt_extended import jwt_required, get_jwt_identity
import logging
import traceback
from ..services import visualization_service

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

visualization_bp = Blueprint('visualization', __name__)

@visualization_bp.route('/generate', methods=['POST'])
@jwt_required()
def generate():
    try:
        data = request.get_json()
        prompt = data.get('prompt')
        target_duration = data.get('target_duration')
        
        if not prompt:
            return jsonify({'error': 'No prompt provided'}), 400
            
        try:
            # Generate the Manim code
            code = visualization_service.generate_visualization(prompt)
        except Exception as e:
            logger.error(f"Code generation error: {str(e)}")
            return jsonify({'error': 'Failed to generate visualization code'}), 500
            
        try:
            # Execute the code
            result = visualization_service.execute_manim_code(code)
        except Exception as e:
            logger.error(f"Code execution error: {str(e)}")
            return jsonify({'error': 'Failed to execute visualization code'}), 500
        
        return jsonify({
            'code': code,
            'message': 'Visualization generated successfully',
            'video': result['video'],
            'format': 'mp4'
        })
        
    except Exception as e:
        logger.error(f"Unexpected error in generate route: {str(e)}")
        return jsonify({'error': 'An unexpected error occurred'}), 500

@visualization_bp.route('/test', methods=['GET', 'OPTIONS'])
def test_visualization():
    """Test endpoint for visualization generation"""
    try:
        # Simple circle animation code
        test_code = '''
from manim import *

class MathVisualization(Scene):
    def construct(self):
        circle = Circle()
        self.play(Create(circle))
        self.wait()
'''
        
        result = visualization_service.execute_manim_code(test_code)
        return jsonify({
            "status": "success",
            "data": result
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
