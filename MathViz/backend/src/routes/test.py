from flask import Blueprint, jsonify, send_file
import os
import tempfile
from manim import *
import base64

test = Blueprint('test', __name__)

@test.route('/test-manim', methods=['GET'])
def test_manim():
    try:
        # Create a temporary directory for the test
        with tempfile.TemporaryDirectory() as tmpdir:
            # Write the test scene
            scene_path = os.path.join(tmpdir, 'test_scene.py')
            with open(scene_path, 'w') as f:
                f.write('''
from manim import *

class TestScene(Scene):
    def construct(self):
        circle = Circle(radius=2, color=BLUE)
        self.play(Create(circle))
        self.wait()
''')
            
            # Run Manim
            os.system(f'cd {tmpdir} && manim -pqh test_scene.py TestScene')
            
            # Get the output video file
            video_path = os.path.join(tmpdir, 'media', 'videos', 'test_scene', '1080p60', 'TestScene.mp4')
            
            if not os.path.exists(video_path):
                return jsonify({
                    'error': 'Video generation failed',
                    'details': 'Output file not found'
                }), 500
            
            # Read and encode the video file
            with open(video_path, 'rb') as f:
                video_data = base64.b64encode(f.read()).decode('utf-8')
            
            return jsonify({
                'message': 'Test successful',
                'video': video_data
            }), 200
            
    except Exception as e:
        return jsonify({
            'error': 'Test failed',
            'details': str(e)
        }), 500
