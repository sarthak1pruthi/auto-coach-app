import urllib.request
import json

def test_register():
    url = "http://127.0.0.1:8000/register"
    data = {"email": "urllib_test@test.com", "password": "securepassword123"}
    jsondata = json.dumps(data).encode('utf-8')
    
    req = urllib.request.Request(url, data=jsondata, headers={'Content-Type': 'application/json'})
    
    try:
        with urllib.request.urlopen(req) as response:
            print(f"Status: {response.getcode()}")
            print(f"Response: {response.read().decode('utf-8')}")
    except urllib.error.HTTPError as e:
        print(f"HTTPError: {e.code}")
        print(f"Reason: {e.read().decode('utf-8')}")
    except Exception as e:
        print(f"Failed: {e}")

if __name__ == "__main__":
    test_register()
