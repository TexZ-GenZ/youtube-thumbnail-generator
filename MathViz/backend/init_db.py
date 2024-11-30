from src.app import create_app
from src.models import db
import os

def init_db():
    # Create app instance
    app = create_app()
    
    # Push an application context
    with app.app_context():
        # Remove existing database file if it exists
        db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'instance', 'mathviz.db')
        if os.path.exists(db_path):
            os.remove(db_path)
            print(f"Removed existing database: {db_path}")
        
        # Create all tables
        db.create_all()
        print("Created new database with all tables")

if __name__ == "__main__":
    init_db()
