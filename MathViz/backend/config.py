import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-key-please-change')
    DEBUG = os.environ.get('FLASK_DEBUG', True)
    
class DevelopmentConfig(Config):
    FLASK_ENV = 'development'
    
class ProductionConfig(Config):
    FLASK_ENV = 'production'
    DEBUG = False

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
