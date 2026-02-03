from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

print(f"Testing connection to: {DATABASE_URL.split('@')[1]}") # Hide password

try:
    engine = create_engine(DATABASE_URL, connect_args={"connect_timeout": 5})
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        print("✅ Connection Successful!")
except Exception as e:
    print(f"❌ Connection Failed: {e}")
