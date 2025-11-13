from uuid import uuid4
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..db import get_db
from ..models import Participant
from ..schemas import ParticipantCreate, ParticipantList, Participant as ParticipantSchema
from ..deps import get_current_user

router = APIRouter(prefix="/participants", tags=["participants"])

@router.post("/", response_model=ParticipantSchema, status_code=status.HTTP_201_CREATED)
def create_participant(
    payload: ParticipantCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    exists = db.query(Participant).filter(Participant.subject_id == payload.subject_id).first()
    if exists:
        raise HTTPException(status_code=400, detail="subject_id already exists")

    participant = Participant(
        participant_id=str(uuid4()),
        subject_id=payload.subject_id,
        study_group=payload.study_group,
        enrollment_date=payload.enrollment_date,
        status=payload.status,
        age=payload.age,
        gender=payload.gender,
    )
    db.add(participant)
    db.commit()
    db.refresh(participant)
    return participant

@router.get("/", response_model=List[ParticipantList])
def list_participants(
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return db.query(Participant).all()

@router.get("/{participant_id}", response_model=ParticipantSchema)
def get_participant(
    participant_id: str,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    p = db.query(Participant).filter(Participant.participant_id == participant_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Participant not found")
    return p

@router.put("/{participant_id}", response_model=ParticipantSchema)
def update_participant(
    participant_id: str,
    payload: ParticipantCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    p = db.query(Participant).filter(Participant.participant_id == participant_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Participant not found")

    exists = (
        db.query(Participant)
        .filter(Participant.subject_id == payload.subject_id, Participant.id != p.id)
        .first()
    )
    if exists:
        raise HTTPException(status_code=400, detail="subject_id already exists")

    p.subject_id = payload.subject_id
    p.study_group = payload.study_group
    p.enrollment_date = payload.enrollment_date
    p.status = payload.status
    p.age = payload.age
    p.gender = payload.gender

    db.commit()
    db.refresh(p)
    return p

@router.delete("/{participant_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_participant(
    participant_id: str,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    p = db.query(Participant).filter(Participant.participant_id == participant_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Participant not found")

    db.delete(p)
    db.commit()
    return
