from fastapi import FastAPI, Request
from fastapi.responses import Response, JSONResponse
from rag_engine import get_retriever
from langchain_google_genai import ChatGoogleGenerativeAI
import os

app = FastAPI(title="Welfare Scheme Chatbot API", version="1.0.0")

# Initialize the Gemini Chat model for conversational reasoning
llm = ChatGoogleGenerativeAI(model="gemini-3.5-flash", temperature=0.3)

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

    # RAG PIPELINE
    retriever = get_retriever()
    if not retriever:
        reply_text = "I'm sorry, my knowledge base is currently offline."
    else:
        # Retrieve the top relevant schemes based on the user's message
        docs = retriever.invoke(incoming_msg)
        context = "\n\n".join([d.page_content for d in docs])
        
        # Build the strict prompt
        prompt = f"""
        You are an AI assistant helping rural Indian citizens discover government welfare schemes.
        
        User's Message: "{incoming_msg}"
        
        Relevant Schemes retrieved from the database:
        {context}
        
        Instructions:
        1. Answer the user's question clearly based ONLY on the provided schemes.
        2. If they seem eligible for a scheme, list the documents they need.
        3. Do NOT make up schemes or requirements. If the answer isn't in the context, politely say you don't know.
        4. Respond in the same language the user wrote in (handle code-mixing gracefully).
        5. Keep it concise (WhatsApp friendly).
        """
        
        # Generate the response using Gemini
        ai_msg = llm.invoke(prompt)
        reply_text = ai_msg.content

    print(f"Sending reply to {sender}: {reply_text}")

    # Return valid TwiML (XML) response required by Twilio WhatsApp
    twiml = f"""<?xml version="1.0" encoding="UTF-8"?>
    <Response>
        <Message>{reply_text}</Message>
    </Response>"""
    
    return Response(content=twiml, media_type="application/xml")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
