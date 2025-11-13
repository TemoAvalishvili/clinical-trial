from datetime import date, datetime
from typing import Optional, List
from pydantic import BaseModel, Field, constr
from .models import StudyGroup, Status

class ParticipantBase(BaseModel):
    subject_id: constr(min_length=1)
    study_group: StudyGroup
    enrollment_date: date
    status: Status
    age: int = Field(..., ge=0, le=120)
    gender: constr(min_length=1)

class ParticipantCreate(ParticipantBase):
    pass

class Participant(ParticipantBase):
    participant_id: str

    class Config:
        orm_mode = True

class ParticipantList(Participant):
    id: int

class MetricsSummary(BaseModel):
    total: int
    by_status: dict
    by_study_group: dict

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    username: Optional[str] = None

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
