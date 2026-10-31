from datetime import datetime
from typing import Any, Dict, List, Optional
import uuid
from pydantic import BaseModel, Field

from schemas.buyer import BuyerCreateRequest, BuyerProfile


class TurnBase(BaseModel):
    speaker: str = Field(..., description="'user', 'buyer', or 'coach'")
    content: str
    audio_url: Optional[str] = None
    duration_ms: Optional[int] = None
    metadata_json: Dict[str, Any] = Field(default_factory=dict)


class TurnCreate(TurnBase):
    pass


class TurnResponse(TurnBase):
    id: uuid.UUID
    session_id: uuid.UUID
    turn_index: int
    created_at: datetime

    model_config = {"from_attributes": True}


class SessionCreate(BaseModel):
    buyer_archetype: str = Field(default="skeptical_cfo", description="Archetype identifier")
    title: Optional[str] = Field(default=None, description="Optional custom title for the session")
    custom_buyer: Optional[BuyerCreateRequest] = Field(
        default=None, description="Custom buyer payload if archetype is custom"
    )


class SessionEndRequest(BaseModel):
    reason: Optional[str] = Field(default="user_completed", description="Reason for ending session")
    generate_feedback: bool = Field(default=True, description="Whether to trigger coach rubric evaluation automatically")


class SessionResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    title: str
    buyer_archetype: str
    status: str
    started_at: Optional[datetime] = None
    ended_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    buyer_profile_state: Dict[str, Any] = Field(default_factory=dict)

    model_config = {"from_attributes": True}


class SessionTranscriptResponse(BaseModel):
    session_id: uuid.UUID
    title: str
    status: str
    total_turns: int
    turns: List[TurnResponse]


class SessionDetailResponse(SessionResponse):
    turns: List[TurnResponse] = Field(default_factory=list)
    feedback: Optional[Dict[str, Any]] = None
