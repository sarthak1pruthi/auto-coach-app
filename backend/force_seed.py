from app import database, models
from app.seed_data import EXERCISE_DATA
from sqlalchemy.orm import Session

db = database.SessionLocal()

try:
    print("Starting Seed...")
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
    print(f"✅ Successfully seeded {count} exercises.")
except Exception as e:
    print(f"❌ Error: {e}")
finally:
    db.close()
