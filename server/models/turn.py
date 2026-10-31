from typing import Any, Dict, Optional
import uuid
from sqlalchemy import ForeignKey, Integer, JSON, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models.base import Base, TimestampMixin


class Turn(Base, TimestampMixin):
    """One row per utterance in a pitch session (rep, buyer, or coach tip)."""

    __tablename__ = "turns"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    session_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("sessions.id", ondelete="CASCADE"),
        index=True,
        nullable=False,
    )
    turn_index: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
    )
    speaker: Mapped[str] = mapped_column(
        String(50),
        nullable=False,  # "user" | "buyer" | "coach"
    )
    content: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )
    audio_url: Mapped[Optional[str]] = mapped_column(
        String(1024),
        nullable=True,
    )
    duration_ms: Mapped[Optional[int]] = mapped_column(
        Integer,
        nullable=True,
    )
    metadata_json: Mapped[Dict[str, Any]] = mapped_column(
        JSON,
        default=dict,
        nullable=False,
    )

    # Relationships
    session: Mapped["Session"] = relationship(
        "Session",
        back_populates="turns",
    )
