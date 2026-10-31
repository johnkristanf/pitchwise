from typing import Any, Dict, List
import uuid
from sqlalchemy import Float, ForeignKey, JSON, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models.base import Base, TimestampMixin


class Feedback(Base, TimestampMixin):
    """Coach evaluation and scoring for a completed session."""

    __tablename__ = "feedbacks"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    session_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("sessions.id", ondelete="CASCADE"),
        unique=True,
        index=True,
        nullable=False,
    )
    overall_score: Mapped[float] = mapped_column(
        Float,
        default=0.0,
        nullable=False,
    )
    rubric_scores: Mapped[Dict[str, Any]] = mapped_column(
        JSON,
        default=dict,
        nullable=False,
    )
    strengths: Mapped[List[str]] = mapped_column(
        JSON,
        default=list,
        nullable=False,
    )
    areas_for_improvement: Mapped[List[str]] = mapped_column(
        JSON,
        default=list,
        nullable=False,
    )
    action_items: Mapped[List[str]] = mapped_column(
        JSON,
        default=list,
        nullable=False,
    )
    coach_summary: Mapped[str] = mapped_column(
        Text,
        default="",
        nullable=False,
    )

    # Relationships
    session: Mapped["Session"] = relationship(
        "Session",
        back_populates="feedback",
    )
