from sqlalchemy import Column, Integer, String, Date, Enum
from sqlalchemy.sql import func
from sqlalchemy.types import DateTime
import enum
from .db import Base

class StudyGroup(str, enum.Enum):
    treatment = "treatment"
    control = "control"

class Status(str, enum.Enum):
    active = "active"
    completed = "completed"
    withdrawn = "withdrawn"

class Participant(Base):
    __tablename__ = "participants"

    id = Column(Integer, primary_key=True, index=True)
    participant_id = Column(String, unique=True, index=True)
    subject_id = Column(String, unique=True, index=True)
    study_group = Column(Enum(StudyGroup), nullable=False)
    enrollment_date = Column(Date, nullable=False)
    status = Column(Enum(Status), nullable=False, default=Status.active)
    age = Column(Integer, nullable=False)
    gender = Column(String, nullable=False)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
