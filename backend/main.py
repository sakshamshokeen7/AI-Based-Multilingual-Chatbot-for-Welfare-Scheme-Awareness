from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

app = FastAPI(title="Welfare Scheme Chatbot API", version="1.0.0")

@app.get("/")
async def root():
    return {"message": "Welfare Scheme Chatbot Backend is running."}

@app.post("/webhook")
async def twilio_webhook(request: Request):
    """
    Endpoint to receive messages from Twilio WhatsApp Sandbox.
    """
    # Parse form data from Twilio
    form_data = await request.form()
    incoming_msg = form_data.get('Body', '').strip()
    sender = form_data.get('From', '')

    print(f"Received message from {sender}: {incoming_msg}")

    # TODO: Pass incoming_msg to NLP layer (Bhashini/Google Translate)
    # TODO: Pass translated text to LLM (Gemini) with RAG (FAISS)
    # TODO: Translate response back to original language
    # TODO: Send response back via Twilio API

    return JSONResponse(content={"status": "received"})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
