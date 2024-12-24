from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from agent_contoller import AgentController
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request models
class Message(BaseModel):
    role: str
    content: str

class ChatInput(BaseModel):
    messages: List[Message]

class ChatRequest(BaseModel):
    input: ChatInput

agent_controller = AgentController()

@app.post("/chat")
async def chat(request: ChatRequest):
    response = agent_controller.get_response(request.dict())
    return response

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)