from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from collections import Counter

from ..db import get_db, SessionLocal
from ..models import Participant
from ..schemas import MetricsSummary
from ..deps import get_current_user

router = APIRouter(prefix="/metrics", tags=["metrics"])

@router.get("/summary", response_model=MetricsSummary)
def metrics_summary(
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    participants = db.query(Participant).all()
    total = len(participants)
    by_status = Counter(p.status.value for p in participants)
    by_group = Counter(p.study_group.value for p in participants)
    return MetricsSummary(
        total=total,
        by_status=dict(by_status),
        by_study_group=dict(by_group),
    )
