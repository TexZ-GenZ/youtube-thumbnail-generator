from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
from src.scene_generator import generate_scene
from src.utils import sanitize_prompt, validate_prompt
from werkzeug.utils import secure_filename
import logging

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Configure upload folder
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'media')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Configure Manim media directory
os.environ['MEDIA_DIR'] = UPLOAD_FOLDER

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"}), 200

@app.route('/api/generate', methods=['POST'])
def generate_animation():
    try:
        data = request.get_json()
        if not data or 'prompt' not in data:
            return jsonify({"error": "No prompt provided"}), 400

        prompt = data['prompt']
        logger.info(f"Received animation request with prompt: {prompt}")
        
        # Validate and sanitize the prompt
        if not validate_prompt(prompt):
            return jsonify({"error": "Invalid prompt"}), 400
        
        sanitized_prompt = sanitize_prompt(prompt)
        
        # Generate unique filename
        filename = secure_filename(f"{sanitized_prompt[:30]}_{os.urandom(4).hex()}.mp4")
        output_path = os.path.join(UPLOAD_FOLDER, filename)
        
        # Generate the animation
        logger.info(f"Generating animation: {output_path}")
        success = generate_scene(sanitized_prompt, output_path)
        
        if not success:
            logger.error("Failed to generate animation")
            return jsonify({"error": "Failed to generate animation"}), 500
        
        # Return the URL to access the generated animation
        logger.info(f"Animation generated successfully: {filename}")
        return jsonify({
            "animation_url": f"/media/{filename}",
            "message": "Animation generated successfully"
        }), 200
        
    except Exception as e:
        logger.error(f"Error generating animation: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/media/<path:filename>')
def serve_media(filename):
    try:
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        if not os.path.exists(file_path):
            logger.error(f"Media file not found: {file_path}")
            return jsonify({"error": "File not found"}), 404
            
        return send_file(
            file_path,
            mimetype='video/mp4',
            as_attachment=False
        )
    except Exception as e:
        logger.error(f"Error serving media file: {str(e)}")
        return jsonify({"error": "File not found"}), 404

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
