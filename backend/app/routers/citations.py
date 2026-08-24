from fastapi import APIRouter, HTTPException
from app.models.schemas import CitationCheckRequest, CitationCheckResponse
from app.services import citation_verifier
from app.graph import citation_graph

router = APIRouter()

@router.post("/check", response_model=CitationCheckResponse)
def check_citation(request: CitationCheckRequest):
    result = citation_verifier.verify(request.text)
    return result

@router.get("/graph/full")
def get_full_graph():
    print("DEBUG _G size inside route:", len(citation_graph._G.nodes()))
    graph_data = citation_graph.get_full_graph()
    return graph_data

@router.get("/graph/{case_id}")
def get_citation_graph(case_id: str):
    graph_data = citation_graph.get_subgraph(case_id)
    if not graph_data:
        raise HTTPException(status_code=404, detail="Case not found in graph")
    return graph_data
