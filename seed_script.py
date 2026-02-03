import urllib.request
import json

def seed():
    url = "http://127.0.0.1:8000/seed_db"
    try:
        print("Seeding database...")
        with urllib.request.urlopen(url) as response:
            print(f"Status: {response.getcode()}")
            data = json.loads(response.read().decode('utf-8'))
            print(f"Response: {data}")
    except Exception as e:
        print(f"Seeding failed: {e}")

if __name__ == "__main__":
    seed()
