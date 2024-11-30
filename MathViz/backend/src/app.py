from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from datetime import timedelta
import os
from dotenv import load_dotenv
import logging

from .models import db
from .routes.auth import auth
from .routes.visualization import visualization_bp
from .routes.test import test

load_dotenv()
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

def create_app():
    app = Flask(__name__)
    
    # Enable CORS for all routes
    CORS(app)
    app.after_request(after_request)
    
    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///mathviz.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'dev-secret-key')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)
    app.config['JWT_TOKEN_LOCATION'] = ['headers']
    app.config['JWT_HEADER_NAME'] = 'Authorization'
    app.config['JWT_HEADER_TYPE'] = 'Bearer'
    app.config['PROPAGATE_EXCEPTIONS'] = True
    
    # Initialize extensions
    db.init_app(app)
    jwt = JWTManager(app)
    
    # JWT error handlers
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        logger.error(f"Token expired. Payload: {jwt_payload}")
        return jsonify({
            'error': 'Token has expired',
            'description': 'The token has expired. Please log in again.'
        }), 401

    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        logger.error(f"Invalid token error: {error}")
        return jsonify({
            'error': 'Invalid token',
            'description': str(error)
        }), 401  

    @jwt.unauthorized_loader
    def missing_token_callback(error):
        logger.error(f"Missing token error: {error}")
        return jsonify({
            'error': 'Authorization required',
            'description': str(error)
        }), 401

    @jwt.token_verification_failed_loader
    def verification_failed_callback():
        logger.error("Token verification failed")
        return jsonify({
            'error': 'Token verification failed',
            'description': 'The token signature verification failed'
        }), 401
        
    @jwt.needs_fresh_token_loader
    def fresh_token_callback():
        logger.error("Fresh token required")
        return jsonify({
            'error': 'Fresh token required',
            'description': 'The token is valid but not fresh'
        }), 401
    
    # Register blueprints
    app.register_blueprint(auth, url_prefix='/api/auth')
    app.register_blueprint(visualization_bp, url_prefix='/api/viz')
    app.register_blueprint(test, url_prefix='/api/test')
    
    # Create database tables
    with app.app_context():
        db.create_all()
    
    @app.route('/api/health')
    def health_check():
        return {'status': 'healthy'}
    
    return app

if __name__ == '__main__':
    app = create_app()
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
