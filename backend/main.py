from fastapi import FastAPI, Request
from fastapi.responses import Response, JSONResponse, HTMLResponse
from rag_engine import get_retriever
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
from translation import translator
import os
import re
import markdown

app = FastAPI(title="Welfare Scheme Chatbot API", version="1.0.0")

# SMS constraint constants
SMS_MAX_CHARS = 300
_URL_PATTERN = re.compile(r'https?://\S+')

def sanitize_sms_reply(text: str) -> str:
    """
    Hard-enforces the two SMS fallback constraints:
    1. Strips any URL / hyperlink from the reply (basic keypad phones cannot
       tap links, and they bloat the character count).
    2. Truncates the total reply to SMS_MAX_CHARS characters to guarantee a
       single-part SMS and prevent unexpected billing for multi-part messages.
    
    This is a *code-level* guarantee, not merely a prompt instruction.
    """
    # 1. Strip URLs
    sanitized = _URL_PATTERN.sub('', text).strip()
    # Collapse any double whitespace / newlines left behind after URL removal
    sanitized = re.sub(r' {2,}', ' ', sanitized)
    sanitized = re.sub(r'\n{3,}', '\n\n', sanitized)

    # 2. Truncate to hard character limit
    if len(sanitized) > SMS_MAX_CHARS:
        # Truncate and append an ellipsis so the user knows there's more
        sanitized = sanitized[:SMS_MAX_CHARS - 1].rstrip() + '…'

    return sanitized

# Initialize the Gemini Chat model for conversational reasoning
llm = ChatGoogleGenerativeAI(model="gemini-flash-latest", temperature=0.3)

# In-memory session store
USER_SESSIONS = {}

SYSTEM_PROMPT_INTERVIEW = """
You are a helpful welfare scheme assistant for the Indian government.
Your goal is to gather the following 5 pieces of information from the user to determine their eligibility for welfare schemes:
1. Age
2. Gender
3. Occupation (e.g. farmer, student, unemployed, gig worker, street vendor)
4. Income Level (specific amount or BPL/APL status)
5. Location (State in India)

Review the conversation history. If ANY of these 5 pieces of information are missing, naturally ask the user ONE question at a time to gather the missing information. 
DO NOT ask for all missing information at once. Be polite, concise, and conversational.

CRITICAL INSTRUCTION:
If you have successfully gathered ALL 5 pieces of information, your response MUST be exactly in this format:
PROFILE_COMPLETE: [Age], [Gender], [Occupation], [Income Level], [Location]
Do NOT say anything else. Just that exact string.
"""

def get_session(sender: str):
    """Retrieve or create a session for the sender."""
    if sender not in USER_SESSIONS:
        USER_SESSIONS[sender] = {
            "history": [SystemMessage(content=SYSTEM_PROMPT_INTERVIEW)],
            "profile_complete": False,
            "profile_summary": ""
        }
    return USER_SESSIONS[sender]

def handle_retrieval(profile_summary: str, user_query: str, user_lang: str, is_sms: bool = False) -> str:
    """Uses FAISS and Gemini to recommend schemes based on the gathered profile."""
    retriever = get_retriever()
    if not retriever:
        return "I'm sorry, my knowledge base is currently offline."
    
    search_query = f"{profile_summary} {user_query}"
    docs = retriever.invoke(search_query)
    context = "\n\n".join([doc.page_content for doc in docs])

    lang_instruction = ""
    if not translator.is_active:
        lang_instruction = f"\nIMPORTANT: You MUST reply entirely in the language the user spoke in. If they used code-mixing (like Hinglish), reply in the same natural way."

    sms_instruction = ""
    if is_sms:
        sms_instruction = "\nCRITICAL: The user is on a basic SMS keypad phone. Your response MUST be extremely punchy, highly concise, and under 300 characters to prevent expensive multi-part SMS splitting. Keep checklists very brief. You MUST NOT include any web links or URLs."

    prompt = f"""
    You are a helpful welfare scheme assistant for the Indian government.
    The user's confirmed demographic profile is: {profile_summary}
    The user's latest message is: {user_query}
    
    Use the following retrieved scheme data to answer the user's question accurately.
    1. Recommend the most applicable schemes based on their profile.
    2. Explicitly explain WHY they are eligible.
    3. Include a clear 'Document Checklist' so they know what paperwork to prepare.
    If the answer is not in the data, state that you do not have that information.
    {lang_instruction}
    {sms_instruction}
    
    Context Data:
    {context}
    """
    
    ai_msg = llm.invoke(prompt)
    if isinstance(ai_msg.content, list):
        return "".join([block.get("text", "") for block in ai_msg.content if isinstance(block, dict) and "text" in block])
    return str(ai_msg.content)

@app.get("/")
async def root():
    return {"message": "Welfare Scheme Chatbot Backend is running."}

async def process_chat(request: Request, is_sms: bool):
    form_data = await request.form()
    incoming_msg = form_data.get('Body', '').strip()
    sender = form_data.get('From', '')

    print(f"Received message from {sender}: {incoming_msg}")

    try:
        session = get_session(sender)

        # Handle user reset explicitly
        if incoming_msg.lower() in ["reset", "restart", "start over"]:
            USER_SESSIONS.pop(sender, None)
            session = get_session(sender)
            incoming_msg = "Hello"

        user_lang = translator.detect_language(incoming_msg)
        english_query = translator.translate_to_english(incoming_msg, user_lang)

        session["history"].append(HumanMessage(content=english_query))

        reply_text = ""
        is_retrieval = False

        if not session["profile_complete"]:
            # Interview Mode
            if is_sms:
                sms_instruction = HumanMessage(content="[SYSTEM: The user is on standard SMS. Ask the question in under 100 characters.]")
                session["history"].append(sms_instruction)
                ai_msg = llm.invoke(session["history"])
                session["history"].pop()
            else:
                ai_msg = llm.invoke(session["history"])
                
            if isinstance(ai_msg.content, list):
                reply_english = "".join([block.get("text", "") for block in ai_msg.content if isinstance(block, dict) and "text" in block]).strip()
            else:
                reply_english = str(ai_msg.content).strip()
            
            # Check if the LLM has gathered all 5 pieces of information
            if reply_english.startswith("PROFILE_COMPLETE:"):
                profile_details = reply_english.replace("PROFILE_COMPLETE:", "").strip()
                print(f"[{sender}] Profile Gathered: {profile_details}")
                
                session["profile_complete"] = True
                session["profile_summary"] = profile_details
                
                reply_english = "Thank you! I have successfully gathered your profile. Please reply with 'show schemes' to see your personalized recommendations!"
                session["history"].append(AIMessage(content=reply_english))
            else:
                session["history"].append(AIMessage(content=reply_english))
                
            reply_text = reply_english
        else:
            # Post-Profile Q&A
            reply_english = handle_retrieval(session["profile_summary"], english_query, user_lang, is_sms)
            session["history"].append(AIMessage(content=reply_english))
            reply_text = reply_english
            is_retrieval = True

        # Translate response
        reply_text = translator.translate_from_english(reply_text, user_lang)

        # Append download link if this is a scheme retrieval (and NOT sms)
        if is_retrieval:
            session["last_translated_checklist"] = reply_text
            if not is_sms:
                clean_phone = sender.replace("whatsapp:", "").replace("+", "")
                
                host = request.headers.get("host")
                base_url = f"https://{host}" if host else str(request.base_url).rstrip('/')
                download_url = f"{base_url}/download/{clean_phone}"
                
                link_text = translator.translate_from_english("\n\n📄 Download this checklist: ", user_lang)
                reply_text += f"{link_text}{download_url}"

        # --- SMS Hard Enforcement (code-level guarantee) ---
        # Runs AFTER translation so char-count is accurate for the final language.
        # Also runs AFTER the checklist URL is appended for WhatsApp (is_sms=False)
        # so it only strips/truncates on the SMS path.
        if is_sms:
            original_len = len(reply_text)
            reply_text = sanitize_sms_reply(reply_text)
            if len(reply_text) < original_len:
                print(f"[SMS Sanitizer] Reply trimmed: {original_len} → {len(reply_text)} chars")
    except Exception as e:
        print(f"Error processing webhook: {e}")
        reply_text = "The system is currently busy or we hit an API rate limit. Please wait 30 seconds and try again."

    try:
        safe_reply = reply_text.encode('ascii', 'replace').decode('ascii')
        print(f"Sending reply to {sender}: {safe_reply[:200]}...")
    except Exception:
        pass

    # Return TwiML response
    twiml = f"""<?xml version="1.0" encoding="UTF-8"?>
    <Response>
        <Message><![CDATA[{reply_text}]]></Message>
    </Response>"""
    
    return Response(content=twiml, media_type="application/xml")

@app.post("/webhook")
async def twilio_webhook(request: Request):
    """WhatsApp Endpoint (Rich Text & Links)"""
    return await process_chat(request, is_sms=False)

@app.post("/sms")
async def twilio_sms(request: Request):
    """Standard SMS Endpoint (Concise & No Links)"""
    return await process_chat(request, is_sms=True)

@app.get("/download/{phone_number}", response_class=HTMLResponse)
async def download_checklist(phone_number: str):
    sender = f"whatsapp:+{phone_number}"
    session = USER_SESSIONS.get(sender)
    
    if not session or "last_translated_checklist" not in session:
        return HTMLResponse("<h1>Checklist not found. Please message the bot first.</h1>", status_code=404)
        
    html_content = markdown.markdown(session["last_translated_checklist"])
    
    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Welfare Scheme Checklist</title>
        <style>
            body {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; color: #333; line-height: 1.6; background: #f0fdf4; }}
            h1, h2, h3 {{ color: #166534; border-bottom: 2px solid #bbf7d0; padding-bottom: 5px; }}
            .checklist-box {{ background: #ffffff; border: 1px solid #dcfce7; padding: 30px; border-radius: 12px; margin-top: 20px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }}
            ul {{ padding-left: 20px; }}
            li {{ margin-bottom: 10px; }}
            .print-btn {{ background: #16a34a; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-size: 16px; margin-bottom: 20px; display: inline-block; text-decoration: none; font-weight: bold; box-shadow: 0 4px 6px -1px rgba(22, 163, 74, 0.2); transition: background 0.2s; }}
            .print-btn:hover {{ background: #15803d; }}
            .header {{ text-align: center; margin-bottom: 20px; }}
            @media print {{ 
                .print-btn {{ display: none; }} 
                body {{ background: white; padding: 0; }} 
                .checklist-box {{ box-shadow: none; border: none; padding: 0; }} 
                h1, h2, h3 {{ color: black; border-bottom: 1px solid #ccc; }}
            }}
        </style>
    </head>
    <body>
        <div class="header">
            <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
        </div>
        <div class="checklist-box">
            {html_content}
        </div>
    </body>
    </html>
    """
    return HTMLResponse(content=html)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
