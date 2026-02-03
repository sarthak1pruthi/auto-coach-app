from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from .database import Base
import uuid

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    
    logs = relationship("Log", back_populates="user")

class Exercise(Base):
    __tablename__ = "exercises"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String)
    muscle_group = Column(String)
    type = Column(String)      # 'compound' or 'isolation'
    category = Column(String)  # 'free_weight', 'machine', 'cable', 'bodyweight'
    fatigue_score = Column(Integer)

class Log(Base):
    __tablename__ = "logs"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=True) # nullable for backward compat
    date = Column(DateTime(timezone=True), server_default=func.now())
    exercise_name = Column(String)
    weight = Column(Float)
    reps = Column(Integer)
    rpe = Column(Float)
    is_warmup = Column(Boolean, default=False)
    
    user = relationship("User", back_populates="logs")