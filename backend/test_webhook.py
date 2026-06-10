import asyncio
from main import twilio_webhook

class DummyRequest:
    async def form(self):
        return {"From": "+123", "Body": "Hi"}

async def test():
    req = DummyRequest()
    try:
        res = await twilio_webhook(req)
        print("Success:", res.body)
    except Exception as e:
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test())
