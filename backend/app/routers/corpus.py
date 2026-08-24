from fastapi import APIRouter, HTTPException
from app.models.schemas import CorpusStatus
from app.services import corpus_loader

router = APIRouter()

@router.get("/status", response_model=CorpusStatus)
def get_status():
    return corpus_loader.get_status()

@router.get("/case/{case_id}")
def get_case(case_id: str):
    case_data = corpus_loader.get_case(case_id)
    if not case_data:
        raise HTTPException(status_code=404, detail="Case not found")
    return case_data

@router.get("/case/{case_id}/paragraphs")
def get_case_paragraphs(case_id: str):
    paragraphs = corpus_loader.get_case_paragraphs(case_id)
    if not paragraphs:
        raise HTTPException(status_code=404, detail="Case paragraphs not found")
    return paragraphs
