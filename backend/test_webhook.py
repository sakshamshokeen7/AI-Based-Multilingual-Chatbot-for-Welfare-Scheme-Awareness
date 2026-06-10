import requests

def test_webhook():
    # URL of your local FastAPI webhook endpoint
    url = "http://localhost:8000/webhook"
    
    # Simulate a Twilio payload for an incoming WhatsApp message
    # Twilio sends data as form-urlencoded
    payload = {
        "From": "whatsapp:+14155238886",
        "To": "whatsapp:+1234567890",
        "Body": "mera aadhaar card kho gaya hai, kya karu?"
    }
    
    print(f"Sending test WhatsApp message: '{payload['Body']}'")
    print("-" * 50)
    
    try:
        response = requests.post(url, data=payload)
        print(f"Status Code: {response.status_code}")
        print("TwiML Response from Backend:")
        print(response.text)
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to the backend. Make sure FastAPI is running with: cd backend && .\\venv\\Scripts\\activate && uvicorn main:app --reload")

if __name__ == "__main__":
    test_webhook()
