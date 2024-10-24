from fastapi import APIRouter
from backend.agents.datavisualizer.WorkflowManager import WorkflowManager

router = APIRouter()

@router.get("/start")
async def start_datavisualization():
    workflow_manager = WorkflowManager()
    workflow_manager.start_workflow()
    return {"status": "Visualization started"}
