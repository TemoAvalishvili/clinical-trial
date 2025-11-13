from fastapi.testclient import TestClient
from app.main import app
from app.db import Base, engine, SessionLocal
from app.auth import get_password_hash
from app.models import User

client = TestClient(app)

def setup_module():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    user = User(username="test", hashed_password=get_password_hash("password"))
    db.add(user)
    db.commit()
    db.close()

def get_token():
    res = client.post("/auth/token", data={"username": "test", "password": "password"})
    assert res.status_code == 200
    return res.json()["access_token"]

def test_create_participant():
    token = get_token()
    payload = {
        "subject_id": "P001",
        "study_group": "treatment",
        "enrollment_date": "2025-01-01",
        "status": "active",
        "age": 45,
        "gender": "F",
    }
    res = client.post("/participants/", json=payload, headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 201
    data = res.json()
    assert data["subject_id"] == "P001"
    assert "participant_id" in data
