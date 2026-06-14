from pydantic import BaseModel
from typing import List, Optional

class ExperienceItem(BaseModel):
    company: str
    role: str
    duration: str
    bullets: List[str]

class ResumeOutput(BaseModel):
    summary: str
    skills: List[str]
    experience: List[ExperienceItem]
    missing_keywords: List[str]

class CustomizationResponse(BaseModel):
    match_score: int
    ats_score: int
    conservative_version: ResumeOutput
    aggressive_version: ResumeOutput
    cover_letter: str