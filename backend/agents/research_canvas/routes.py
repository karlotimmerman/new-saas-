from fastapi import APIRouter
from backend.agents.research_canvas.agent import ResearchCanvasAgent

router = APIRouter()

@router.get("/run-canvas")
async def run_canvas():
    agent = ResearchCanvasAgent()
    agent.run_canvas_workflow()
    return {"status": "Research Canvas workflow started"}
