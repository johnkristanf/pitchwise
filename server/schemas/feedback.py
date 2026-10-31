from datetime import datetime
from typing import Any, Dict, List, Optional
import uuid
from pydantic import BaseModel, Field


class RubricCriterion(BaseModel):
    category: str = Field(..., description="e.g., Discovery, Value Proposition, Objection Handling")
    score: float = Field(..., ge=0.0, le=100.0, description="Score from 0 to 100")
    weight: float = Field(default=1.0, description="Weighting in overall score")
    summary: str = Field(..., description="Specific feedback on this rubric category")
    strengths: List[str] = Field(default_factory=list)
    improvements: List[str] = Field(default_factory=list)
    key_quotes: List[str] = Field(default_factory=list, description="Relevant quotes from rep or buyer")


class Scorecard(BaseModel):
    overall_score: float = Field(..., ge=0.0, le=100.0)
    criteria: Dict[str, RubricCriterion]
    coach_summary: str
    top_strengths: List[str]
    top_areas_for_improvement: List[str]
    recommended_action_items: List[str]


class FeedbackResponse(BaseModel):
    id: uuid.UUID
    session_id: uuid.UUID
    overall_score: float
    rubric_scores: Dict[str, Any]
    strengths: List[str]
    areas_for_improvement: List[str]
    action_items: List[str]
    coach_summary: str
    created_at: datetime

    model_config = {"from_attributes": True}
