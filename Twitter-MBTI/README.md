# Twitter-MBTI Analyzer

A full-stack application that analyzes Twitter profiles to predict MBTI personality types using AI.

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- Axios for API calls

### Backend
- FastAPI
- Groq AI for personality analysis
- Selenium for web scraping
- Redis for caching
- Docker for containerization

## Project Structure

```
├── frontend/           # React frontend application
├── backend/           # FastAPI backend server
├── docker-compose.yml # Docker configuration
└── railway.toml       # Railway deployment config
```

## Prerequisites

- Node.js 18+
- Python 3.9+
- Docker and Docker Compose
- Redis

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/TexZ-GenZ/Twitter-MBTI.git
   cd Twitter-MBTI
   ```

2. Backend Setup:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. Frontend Setup:
   ```bash
   cd frontend
   npm install
   ```

4. Environment Variables:
   Create `.env` files in both frontend and backend directories with necessary configurations.

5. Run with Docker:
   ```bash
   docker-compose up --build
   ```

   Or run separately:
   - Backend: `cd backend && uvicorn main:app --reload --port 8001`
   - Frontend: `cd frontend && npm run dev`

## Features

- Twitter profile analysis
- MBTI personality prediction
- Cached results for faster responses
- Responsive UI design
- Docker containerization for easy deployment

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
