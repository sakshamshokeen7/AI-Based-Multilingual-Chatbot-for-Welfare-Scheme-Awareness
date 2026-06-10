from fastapi import FastAPI, Request
from fastapi.responses import Response, JSONResponse
from rag_engine import get_retriever
from langchain_google_genai import ChatGoogleGenerativeAI
from translation import translator
import os

app = FastAPI(title="Welfare Scheme Chatbot API", version="1.0.0")

# Initialize the Gemini Chat model for conversational reasoning
llm = ChatGoogleGenerativeAI(model="gemini-flash-latest", temperature=0.3)

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

    # Step 1: Detect and Translate incoming message using Bhashini
    user_lang = translator.detect_language(incoming_msg)
    english_query = translator.translate_to_english(incoming_msg, user_lang)

    # Step 2: Retrieve relevant documents using FAISS
    retriever = get_retriever()
    if not retriever:
        reply_text = "I'm sorry, my knowledge base is currently offline."
    else:
        docs = retriever.invoke(english_query)
        context = "\n\n".join([doc.page_content for doc in docs])

        lang_instruction = ""
        if not translator.is_active:
            lang_instruction = f"\nIMPORTANT: You MUST reply entirely in the language the user spoke in. If they used code-mixing (like Hinglish), reply in the same natural way."

        prompt = f"""
        You are a helpful welfare scheme assistant for the Indian government.
        Use the following retrieved scheme data to answer the user's question accurately.
        If the answer is not in the data, state that you do not have that information.
        {lang_instruction}
        
        Context Data:
        {context}
        
        User Query: {english_query}
        """
        
        # Generate the response using Gemini
        ai_msg = llm.invoke(prompt)
        
        # LangChain sometimes returns a list of blocks for newer Gemini models
        if isinstance(ai_msg.content, list):
            reply_text = "".join([block.get("text", "") for block in ai_msg.content if isinstance(block, dict) and "text" in block])
        else:
            reply_text = str(ai_msg.content)

        # Step 4: Translate the response back to user's language using Bhashini
        reply_text = translator.translate_from_english(reply_text, user_lang)

    print(f"Sending reply to {sender}: {reply_text}")

    # Return valid TwiML (XML) response required by Twilio WhatsApp
    twiml = f"""<?xml version="1.0" encoding="UTF-8"?>
    <Response>
        <Message><![CDATA[{reply_text}]]></Message>
    </Response>"""
    
    return Response(content=twiml, media_type="application/xml")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
