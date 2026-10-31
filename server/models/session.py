from datetime import datetime
from typing import Any, Dict, List, Optional
import uuid
from sqlalchemy import DateTime, ForeignKey, JSON, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models.base import Base, TimestampMixin


class Session(Base, TimestampMixin):
    """Training session database model tracking a sales pitch practice run."""

    __tablename__ = "sessions"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        index=True,
        nullable=False,
    )
    title: Mapped[str] = mapped_column(
        String(255),
        default="Untitled Pitch Session",
        nullable=False,
    )
    buyer_archetype: Mapped[str] = mapped_column(
        String(100),
        default="skeptical_cfo",
        nullable=False,
    )
    status: Mapped[str] = mapped_column(
        String(50),
        default="created",  # created, in_progress, completed, abandoned
        nullable=False,
        index=True,
    )
    buyer_profile_state: Mapped[Dict[str, Any]] = mapped_column(
        JSON,
        default=dict,
        nullable=False,
    )
    started_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )
    ended_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    # Relationships
    user: Mapped["User"] = relationship(
        "User",
        back_populates="sessions",
    )
    turns: Mapped[List["Turn"]] = relationship(
        "Turn",
        back_populates="session",
        cascade="all, delete-orphan",
        order_by="Turn.turn_index",
    )
    feedback: Mapped[Optional["Feedback"]] = relationship(
        "Feedback",
        back_populates="session",
        uselist=False,
        cascade="all, delete-orphan",
    )
