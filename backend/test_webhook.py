import asyncio
from main import twilio_webhook, twilio_sms

class DummyRequest:
    def __init__(self, sender, body):
        self.sender = sender
        self.body = body
    async def form(self):
        return {"From": self.sender, "Body": self.body}

async def interactive_test():
    print("=======================================")
    print("🤖 Welfare Chatbot Local Tester")
    print("=======================================")
    print("1. Test WhatsApp Mode (Rich Text & Links)")
    print("2. Test Offline SMS Mode (Basic Keypad, No Links)")
    print("=======================================")
    
    choice = input("Select mode (1 or 2): ").strip()
    is_sms = (choice == "2")
    
    sender = "+919999999999" if is_sms else "whatsapp:+919999999999"
    mode_name = "Offline SMS" if is_sms else "WhatsApp"
    
    print(f"\n[Starting {mode_name} session. Type 'quit' to exit, 'reset' to start over]")
    
    while True:
        user_msg = input("\nYou: ").strip()
        if user_msg.lower() == 'quit':
            break
            
        req = DummyRequest(sender, user_msg)
        try:
            if is_sms:
                res = await twilio_sms(req)
            else:
                res = await twilio_webhook(req)
            
            # Extract the actual message from the XML response for easy reading
            xml_str = res.body.decode('utf-8')
            msg_start = xml_str.find('<![CDATA[') + 9
            msg_end = xml_str.find(']]>')
            if msg_start > 8 and msg_end > 0:
                clean_reply = xml_str[msg_start:msg_end]
            else:
                clean_reply = xml_str
                
            print(f"\nBot: {clean_reply}")
        except Exception as e:
            print(f"\nError: {e}")

if __name__ == "__main__":
    asyncio.run(interactive_test())
