from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routes from each agent
from backend.agents.datavisualizer.routes import router as datavisualizer_router
from backend.agents.research_canvas.routes import router as research_canvas_router
from backend.agents.research_assistant.routes import router as research_assistant_router

app = FastAPI()

# Set up CORS for frontend-backend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount routes for each agent
app.include_router(datavisualizer_router, prefix="/datavisualizer")
app.include_router(research_canvas_router, prefix="/research-canvas")
app.include_router(research_assistant_router, prefix="/research-assistant")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
