from fastapi import APIRouter
from backend.agents.research_assistant.agent import ResearchAssistant

router = APIRouter()

@router.get("/summarize")
async def summarize():
    assistant = ResearchAssistant()
    assistant.summarize_data()
    return {"status": "Summary completed"}
