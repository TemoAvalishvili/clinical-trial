# Clinical Trial Dashboard

A full‑stack demo application for managing clinical trial participants and visualizing study metrics.  
Built with **FastAPI**, **React + TypeScript**, **TailwindCSS**, **JWT auth**, and fully containerized with **Docker**.

---

## 🚀 Features

### **Backend (FastAPI)**
- JWT authentication (`/auth/token`)
- CRUD for Participants
- Aggregated analytics (total, by status, by study group)
- SQLAlchemy ORM + SQLite
- Fully tested with Pytest

### **Frontend (React + Vite + TS)**
- Login with token-based auth
- Dashboard with live metrics
- Participants table with create / update / delete
- TailwindCSS UI components
- Axios API client + React Context auth
- Vitest + Testing Library tests

---

## 🖥️ Running Locally (without Docker)

### **Backend**

```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend runs at:  
👉 http://localhost:8000  
Swagger docs: http://localhost:8000/docs

### **Frontend**

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:  
👉 http://localhost:5173

**Test credentials:**

```
username: admin
password: admin
```

---

## 🐳 Running with Docker

```bash
docker compose build
docker compose up
```

- Frontend → http://localhost:3000  
- Backend → http://localhost:8000

---

## 🧪 Tests

### **Backend tests**

```bash
cd backend
pytest
```

### **Frontend tests**

```bash
cd frontend
npm test
```

---

## 📁 Tech Stack

### **Backend**
- FastAPI
- SQLAlchemy
- SQLite
- JWT Auth (PyJWT)
- Pydantic v2
- Uvicorn

### **Frontend**
- React 18
- TypeScript
- React Router
- TailwindCSS
- Axios
- Vitest + Testing Library

### **DevOps**
- Docker
- docker-compose

---

## 📦 Project Structure

```
clinical-trial/
│── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── auth.py
│   │   ├── schemas.py
│   │   ├── database.py
│   │   └── routes/
│   └── tests/
│── frontend/
│   ├── src/
│   ├── tests/
│   └── vite.config.ts
│── docker-compose.yml
│── README.md
```

---

## 📌 Notes for Interviewers

This project demonstrates:

- Clean architecture separation  
- Secure authentication flow  
- SQLAlchemy ORM usage  
- React component structure & state management  
- Tailwind styling  
- Vitest testing strategy  
- Dockerized full-stack workflow  

---

## 🔗 Repository

https://github.com/TemoAvalishvili/clinical-trial
