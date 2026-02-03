from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    DATABASE_URL = "sqlite:///./sql_app.db"

print(f"Checking DB: {DATABASE_URL}")

try:
    engine = create_engine(DATABASE_URL)
    with engine.connect() as connection:
        result = connection.execute(text("SELECT count(*) FROM exercises"))
        count = result.scalar()
        print(f"Exercise Count: {count}")
except Exception as e:
    print(f"Error: {e}")
