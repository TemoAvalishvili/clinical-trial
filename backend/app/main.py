from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .db import Base, engine, get_db, SessionLocal
from .models import User
from .auth import create_access_token, get_password_hash, verify_password
from .schemas import Token, UserCreate, User as UserSchema
from .routers import participants, metrics

app = FastAPI(title="Clinical Trial API")

# --- CORS ---
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- DB & bootstrap admin ---

Base.metadata.create_all(bind=engine)


def bootstrap_admin():
    db = SessionLocal()
    try:
        if not db.query(User).filter(User.username == "admin").first():
            user = User(username="admin", hashed_password=get_password_hash("admin"))
            db.add(user)
            db.commit()
    finally:
        db.close()


bootstrap_admin()

# --- Auth endpoints ---


@app.post("/auth/token", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )

    access_token = create_access_token({"sub": user.username})
    return Token(access_token=access_token)


@app.post("/auth/register", response_model=UserSchema)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.username == user_in.username).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username already registered")

    user = User(
        username=user_in.username,
        hashed_password=get_password_hash(user_in.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


# --- Routers ---

app.include_router(participants.router)
app.include_router(metrics.router)
