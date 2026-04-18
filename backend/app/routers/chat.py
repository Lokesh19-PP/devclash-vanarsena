from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
import httpx
import structlog
from app.config import Settings

logger = structlog.get_logger()
router = APIRouter()
settings = Settings()

class ChatMessage(BaseModel):
    role: str
    content: str

class NodeChatRequest(BaseModel):
    node_id: str
    node_code: Optional[str] = ""
    node_summary: Optional[str] = ""
    query: str
    history: List[ChatMessage] = []

class NodeChatResponse(BaseModel):
    response: str

@router.post("/chat/node", response_model=NodeChatResponse)
async def chat_with_node(req: NodeChatRequest):
    if not settings.GROQ_API_KEY:
        raise HTTPException(status_code=500, detail="GROQ_API_KEY is not configured on the backend.")

    try:
        # Construct messages for Groq
        messages = [
            {
                "role": "system",
                "content": f"You are an expert AI architect assistant in DevClash CodeMap. The user is currently inspecting a specific file/node in their repository codebase.\n\nFile id/path: {req.node_id}\n\nFile Summary / Role: {req.node_summary}\n\nFile Source Code:\n```\n{req.node_code}\n```\n\nAnswer the user's questions concerning this file accurately and concisely. Focus on the architecture and meaning."
            }
        ]

        for msg in req.history:
            messages.append({"role": msg.role, "content": msg.content})
            
        messages.append({"role": "user", "content": req.query})

        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {settings.GROQ_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "llama-3.3-70b-versatile", 
                    "messages": messages,
                    "temperature": 0.5,
                    "max_tokens": 800
                }
            )
            
            resp.raise_for_status()
            data = resp.json()
            reply = data["choices"][0]["message"]["content"]
            
            return NodeChatResponse(response=reply)

    except httpx.HTTPError as e:
        logger.error("groq_api_error", error=str(e), response=getattr(e.response, "text", ""))
        raise HTTPException(status_code=502, detail="Failed to communicate with Groq AI API.")
    except Exception as e:
        logger.error("chat_unexpected_error", error=str(e))
        raise HTTPException(status_code=500, detail="An internal error occurred while generating the neural link response.")
