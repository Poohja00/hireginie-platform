"""
chat_router.py

Handles real-time chat using WebSockets.
This allows Slack-style messaging inside Hireginie.
"""

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

router = APIRouter()

# -------------------------------------------------------------
# ACTIVE CONNECTION MANAGER
# -------------------------------------------------------------
# This keeps track of who is connected to which chat room.

class ConnectionManager:

    def __init__(self):
        # room_id -> list of websocket connections
        self.active_connections = {}

    async def connect(self, room_id: int, websocket: WebSocket):
        await websocket.accept()

        if room_id not in self.active_connections:
            self.active_connections[room_id] = []

        self.active_connections[room_id].append(websocket)

    def disconnect(self, room_id: int, websocket: WebSocket):
        self.active_connections[room_id].remove(websocket)

    async def broadcast(self, room_id: int, message: str):
        for connection in self.active_connections.get(room_id, []):
            await connection.send_text(message)


manager = ConnectionManager()


# -------------------------------------------------------------
# WEBSOCKET CHAT ENDPOINT
# -------------------------------------------------------------
# Clients connect here for real-time messaging.

@router.websocket("/ws/chat/{room_id}")
async def websocket_chat(websocket: WebSocket, room_id: int):

    await manager.connect(room_id, websocket)

    try:
        while True:
            data = await websocket.receive_text()

            # Broadcast message to everyone in the room
            await manager.broadcast(room_id, data)

    except WebSocketDisconnect:
        manager.disconnect(room_id, websocket)