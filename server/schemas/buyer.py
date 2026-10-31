from enum import Enum
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


class BuyerArchetypeEnum(str, Enum):
    SKEPTICAL_CFO = "skeptical_cfo"
    HURRIED_VP = "hurried_vp"
    TECH_GATEKEEPER = "tech_gatekeeper"
    ENTHUSIASTIC_DIRECTOR = "enthusiastic_director"
    RISK_AVERSE_PROCUREMENT = "risk_averse_procurement"
    CUSTOM = "custom"


class BuyerSliders(BaseModel):
    objection_frequency: int = Field(default=3, ge=1, le=5, description="1 (Easy) to 5 (Constant Pushback)")
    price_sensitivity: int = Field(default=3, ge=1, le=5, description="1 (Generous) to 5 (Extremely Penny-pinching)")
    technical_depth: int = Field(default=3, ge=1, le=5, description="1 (High-level vision) to 5 (In-the-weeds architecture)")
    friendliness: int = Field(default=3, ge=1, le=5, description="1 (Cold/Hostile) to 5 (Warm/Welcoming)")


class HiddenState(BaseModel):
    initial_mood: str = Field(default="neutral", description="neutral, impatient, cautious, intrigued")
    hidden_constraints: List[str] = Field(default_factory=list)
    decision_criteria: List[str] = Field(default_factory=list)
    deal_breakers: List[str] = Field(default_factory=list)


class BuyerProfile(BaseModel):
    persona_name: str
    role: str
    company_name: str = "Acme Corp"
    company_type: str = "Mid-market Enterprise (B2B SaaS)"
    company_size: str = "250-500 employees"
    industry: str = "Technology / Financial Services"
    goals: List[str] = Field(default_factory=list)
    pain_points: List[str] = Field(default_factory=list)
    objections: List[str] = Field(default_factory=list)
    budget: str = "$50k - $100k annual contract value"
    sliders: BuyerSliders = Field(default_factory=BuyerSliders)
    hidden_state: HiddenState = Field(default_factory=HiddenState)
    system_prompt_addon: Optional[str] = None


class BuyerCreateRequest(BaseModel):
    archetype: BuyerArchetypeEnum = BuyerArchetypeEnum.CUSTOM
    persona_name: str
    role: str
    company_name: str
    company_type: Optional[str] = "B2B SaaS"
    industry: Optional[str] = "Technology"
    goals: List[str] = Field(default_factory=list)
    pain_points: List[str] = Field(default_factory=list)
    objections: List[str] = Field(default_factory=list)
    budget: Optional[str] = "$50,000"
    sliders: BuyerSliders = Field(default_factory=BuyerSliders)
    custom_instructions: Optional[str] = None


class BuyerArchetypeListItem(BaseModel):
    archetype_id: str
    name: str
    role: str
    short_description: str
    difficulty: str  # Beginner, Intermediate, Hard, Expert
    default_sliders: BuyerSliders
    common_objections: List[str]
