from datetime import datetime, timedelta
from typing import List, Optional
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import desc, func
from sqlalchemy.orm import Session
from . import models, database, logic, schemas, auth  # Added auth
from .seed_data import EXERCISE_DATA

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    # Allow all origins in dev, or specific ones in prod via env
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- AUTH ENDPOINTS ---
@app.post("/register", response_model=schemas.Token)
def register(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    # Password Complexity Check
    import re
    # Allow @$!%*?&#_.-
    if not re.match(r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_.-])[A-Za-z\d@$!%*?&#_.-]{8,}$", user.password):
        raise HTTPException(
            status_code=400, 
            detail="Password must be 8+ chars and include 1 Upper, 1 Lower, 1 Number, 1 Special (@$!%*?&#_.-)"
        )

    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    try:
        hashed_password = auth.get_password_hash(user.password)
        new_user = models.User(email=user.email, hashed_password=hashed_password)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        access_token = auth.create_access_token(data={"sub": new_user.email})
        return {"access_token": access_token, "token_type": "bearer"}
    except Exception as e:
        print(f"❌ REGISTRATION ERROR: {e}")
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/me")
def read_users_me(current_user: models.User = Depends(auth.get_current_user)):
    return {"email": current_user.email, "id": current_user.id}

# --- ENDPOINTS ---

@app.get("/")
def health_check():
    return {"status": "ok", "message": "AutoCoach API Active"}

@app.get("/seed_db")
def seed_database(db: Session = Depends(database.get_db)):
    """Populates DB with 100+ Exercises"""
    
    count = 0
    for ex in EXERCISE_DATA:
        exists = db.query(models.Exercise).filter(models.Exercise.name == ex["name"]).first()

        if not exists:
            new_ex = models.Exercise(
                name=ex["name"], 
                muscle_group=ex["muscle"], 
                type=ex["type"], 
                category=ex["cat"], 
                fatigue_score=ex["fatigue"]
            )
            db.add(new_ex)
            count += 1
    
    db.commit()
    return {"status": "success", "message": f"Seeded {count} exercises."}

@app.get("/exercises/{muscle}")
def get_exercises(
    muscle: str, 
    preference: str = "all", 
    db: Session = Depends(database.get_db)
):
    query = db.query(models.Exercise).filter(models.Exercise.muscle_group == muscle)
    
    if preference == "machine_focus":
        query = query.filter(models.Exercise.category.in_(["machine", "cable"]))
    elif preference == "compound_focus":
        query = query.filter(models.Exercise.category.in_(["free_weight", "bodyweight"]))
        
    exercises = query.all()
    # Fallback to all if filter returns nothing
    if not exercises: 
        exercises = db.query(models.Exercise).filter(models.Exercise.muscle_group == muscle).all()

    return [{"name": e.name, "type": e.type} for e in exercises]

@app.get("/history/{exercise_name}")
def get_history(exercise_name: str, db: Session = Depends(database.get_db)):
    logs = db.query(models.Log)\
             .filter(models.Log.exercise_name == exercise_name)\
             .order_by(models.Log.date)\
             .limit(20).all()
    return [{"date": log.date.strftime("%Y-%m-%d"), "weight": log.weight} for log in logs]

@app.get("/generate/{muscle}", response_model=schemas.PlanResponse)
def generate_workout(
    muscle: str, 
    exercise_name: Optional[str] = None, 
    db: Session = Depends(database.get_db)
):
    # --- VOLUME GOVERNOR LOGIC ---
    # 1. Get all exercises for this muscle
    muscle_exercises = db.query(models.Exercise.name).filter(models.Exercise.muscle_group == muscle).subquery()
    
    # 2. Count sets (logs) for these exercises in the last 7 days
    one_week_ago = datetime.now() - timedelta(days=7)
    weekly_sets = db.query(func.count(models.Log.id))\
        .filter(models.Log.exercise_name.in_(muscle_exercises))\
        .filter(models.Log.date >= one_week_ago)\
        .filter(models.Log.is_warmup == False)\
        .scalar() or 0

    vol = logic.CoachBrain.check_volume_governor(weekly_sets, muscle)
    
    if vol == "LOCKED":
        return {
            "exercise": "Rest", 
            "target_weight": 0, 
            "target_reps": "0", 
            "strategy": "Recovery", 
            "note": f"Volume Limit Reached ({weekly_sets} sets/week). Take a rest day.", 
            "warmups": [], 
            "volume_status": "LOCKED"
        }

    # --- EXERCISE SELECTION ---
    query = db.query(models.Exercise).filter(models.Exercise.muscle_group == muscle)
    exercise = query.filter(models.Exercise.name == exercise_name).first() if exercise_name else query.first()

    if not exercise:
        return {
            "exercise": "Error", 
            "target_weight": 0, 
            "target_reps": "0", 
            "strategy": "None", 
            "note": "Exercise not found", 
            "warmups": [], 
            "volume_status": "GO"
        }

    # --- PROGRESSION LOGIC ---
    logs = db.query(models.Log)\
             .filter(models.Log.exercise_name == exercise.name)\
             .order_by(desc(models.Log.date))\
             .limit(5).all() # Fetch more for better context
    
    status = logic.CoachBrain.detect_plateau(logs)
    suggestion = logic.CoachBrain.suggest_progression(logs)
    
    current_weight = logs[0].weight if logs else 45
    estimated_1rm = logic.CoachBrain.calculate_1rm(logs[0].weight, logs[0].reps) if logs else 0
    
    if status == "stalled":
        new_weight = current_weight * 0.9 # Deload
        strategy = "Deload"
        note = "Plateau detected. Dropping weight to reset fatigue."
    elif status == "new":
        new_weight = current_weight # Default
        strategy = "Find Baseline"
        note = "New exercise. Focus on finding a challenging weight."
    else:
        new_weight = current_weight
        if logs and logs[0].reps >= 10: new_weight += 5
        strategy = "Progressive Overload"
        note = "Push for more reps or weight today!"

    # Smart Warmups
    warmups = logic.CoachBrain.get_warmups(new_weight)

    return {
        "exercise": exercise.name, 
        "target_weight": round(new_weight, 1), 
        "target_reps": "8-12", 
        "strategy": strategy, 
        "note": note,
        "warmups": warmups,
        "volume_status": vol,
        "suggestion": suggestion,
        "estimated_1rm": estimated_1rm
    }

@app.post("/log")
def log_workout(
    log_data: schemas.LogRequest, 
    db: Session = Depends(database.get_db), 
    current_user: models.User = Depends(auth.get_current_user)
):
    log_date = datetime.strptime(log_data.date, "%Y-%m-%d") if log_data.date else datetime.now()
    
    new_log = models.Log(
        exercise_name=log_data.exercise_name,
        weight=log_data.weight,
        reps=log_data.reps,
        rpe=log_data.rpe,
        date=log_date,
        is_warmup=False,
        user_id=current_user.id # Bind to User
    )
    db.add(new_log)
    db.commit()
    return {"message": "Workout logged"}

@app.get("/stats/volume")
def get_volume_stats(db: Session = Depends(database.get_db)):
    """Returns weekly sets per muscle group"""
    seven_days_ago = datetime.now() - timedelta(days=7)
    
    # query logs from last 7 days
    logs = db.query(models.Log).filter(models.Log.date >= seven_days_ago).all()
    
    # manual aggregation (simpler for SQLite)
    volume = {"chest": 0, "back": 0, "legs": 0, "shoulders": 0, "arms": 0}
    
    # Cache exercise muscle groups to avoid N+1 queries
    exercises = {ex.name: ex.muscle_group for ex in db.query(models.Exercise).all()}
    
    for log in logs:
        muscle = exercises.get(log.exercise_name)
        if muscle in volume:
            volume[muscle] += 1
            
    return {
        "labels": [k.capitalize() for k in volume.keys()],
        "data": list(volume.values())
    }

@app.get("/stats/user")
def get_user_stats(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Calculates streaks and level"""
    # Get all distinct workout dates for THIS USER
    dates = db.query(models.Log.date)\
              .filter(models.Log.user_id == current_user.id)\
              .distinct().all()
    dates = sorted([d[0].date() for d in dates], reverse=True)
    
    if not dates:
        return {"streak": 0, "level": 1, "xp": 0, "next_level": 5}

    # Streak Logic
    streak = 0
    today = datetime.now().date()
    
    # Check if we worked out today or yesterday to keep streak alive
    if dates[0] == today:
        streak = 1
        check_date = today - timedelta(days=1)
    elif dates[0] == today - timedelta(days=1):
        streak = 0 # Will verify loop below
        check_date = today - timedelta(days=1)
    else:
        check_date = None # Streak broken

    if check_date:
        # iterate backwards
        for d in dates:
            if d == today: continue
            if d == check_date:
                streak += 1
                check_date -= timedelta(days=1)
            else:
                break
    
    total_workouts = len(dates)
    level = (total_workouts // 5) + 1
    xp_in_level = total_workouts % 5
    
    return {
        "streak": streak,
        "level": level,
        "xp": xp_in_level,
        "next_level": 5
    }
    return {"status": "success", "message": "Workout logged!"}
