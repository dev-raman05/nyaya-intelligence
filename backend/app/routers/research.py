from fastapi import APIRouter, HTTPException
from app.models.schemas import ResearchRequest, ResearchResponse, DemoQuery
from app.services import hybrid_retrieval, query_understanding, demo_service
from app.llm import gemini_service
import uuid
import time

router = APIRouter()

@router.post("", response_model=ResearchResponse)
async def perform_research(request: ResearchRequest):
    start_time = time.time()
    
    # 1. Query Understanding
    analysis = query_understanding.analyze_query(request.query)
    
    # 2. Hybrid Retrieval
    results = hybrid_retrieval.search(analysis, request)
    
    # 3. LLM Synthesis
    if results:
        summary = gemini_service.synthesize_research(request.query, results)
    else:
        summary = "No verified authority found in the current prototype corpus."
    
    end_time = time.time()
    
    return ResearchResponse(
        research_id=str(uuid.uuid4()),
        query_analysis=analysis,
        results=results,
        summary=summary,
        metadata={
            "time_taken": round(end_time - start_time, 2),
            "search_mode": request.search_mode,
            "results_count": len(results)
        }
    )

@router.get("/demos", response_model=list[DemoQuery])
def get_demos():
    return demo_service.get_all_demos()

@router.post("/demo/{demo_id}", response_model=ResearchResponse)
async def run_demo(demo_id: str):
    demo = demo_service.get_demo(demo_id)
    if not demo:
        raise HTTPException(status_code=404, detail="Demo not found")
        
    req = ResearchRequest(query=demo.query)
    return await perform_research(req)
