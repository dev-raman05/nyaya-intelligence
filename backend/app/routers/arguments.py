from fastapi import APIRouter, HTTPException
from app.models.schemas import ArgumentBuildRequest, ArgumentBuildResponse
from app.services import export_service
from app.llm import gemini_service
from pydantic import BaseModel

router = APIRouter()

@router.post("/build", response_model=ArgumentBuildResponse)
def build_argument(request: ArgumentBuildRequest):
    argument_text = gemini_service.build_argument(request.query, request.selected_cases)
    return ArgumentBuildResponse(argument_text=argument_text)

class ExportRequest(BaseModel):
    research_data: dict

@router.post("/export")
def export_research(request: ExportRequest):
    md_content = export_service.generate_markdown(request.research_data)
    return {"markdown": md_content}
