import json

from channels.generic.websocket import AsyncWebsocketConsumer

class GeneratorConsumer(AsyncWebsocketConsumer):  
    async def connect(self):
        await self.accept()
        await self.send(text_data=json.dumps({
            'status': 'CONNECTED',
            'message': 'Welcome! Connection test successful.'
        }))

    async def disconnect(self, close_code):
        print(f"WebSocket disconnected with code: {close_code}")
        pass

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        print(f"Received message from client: {text_data}")
        await self.send(text_data=json.dumps({
            'status': 'ECHO',
            'received_message': json.loads(text_data)['message'] if 'message' in json.loads(text_data) else text_data,
            'timestamp': 'Test Successful'
        }))