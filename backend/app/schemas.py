from pydantic import BaseModel
from typing import List, Optional

class PlanResponse(BaseModel):
    exercise: str
    target_weight: float
    target_reps: str
    strategy: str
    note: str
    warmups: List[dict]
    volume_status: str
    suggestion: Optional[str] = None
    estimated_1rm: Optional[float] = None

class LogRequest(BaseModel):
    exercise_name: str
    weight: float
    reps: int
    rpe: float
    date: Optional[str] = None

class UserCreate(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
