# Clinical Trial Dashboard

## Run locally (no Docker)

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # or .venv\\Scripts\\activate on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend will be at http://localhost:8000 (docs at /docs).

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will be at the Vite dev URL (usually http://localhost:5173).

Login with:

- **username**: `admin`
- **password**: `admin`

## Run with Docker

```bash
docker compose build
docker compose up
```

- Frontend: http://localhost:3000  
- Backend: http://localhost:8000

## Tests

### Backend tests

```bash
cd backend
pytest
```

### Frontend tests

```bash
cd frontend
npm test
```

## Stack

- FastAPI, SQLAlchemy, SQLite, JWT auth
- React, TypeScript, React Router, Axios
- TailwindCSS for styling
- Vitest + Testing Library for basic frontend tests
- Docker & docker-compose for containerization
