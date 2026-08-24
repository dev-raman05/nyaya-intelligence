from app.models.schemas import CitationCheckResponse
from app.services import corpus_loader
import re

def verify(text: str) -> CitationCheckResponse:
    # A simplified mock citation verifier
    # Real implementation would use regex + fuzzy search against corpus
    
    cases = corpus_loader._cases
    matches = []
    
    # Simple search for case names in text
    for cid, case in cases.items():
        name = case.get('case_name', '')
        if name and name.lower() in text.lower():
            # Fetch a relevant paragraph to compare words
            paragraphs = [p['text'] for p in corpus_loader._paragraphs if p.get('case_id') == cid]
            sample_text = paragraphs[0] if paragraphs else "No specific paragraph found, but case is verified."
            
            matches.append({
                "case_id": cid,
                "case_name": name,
                "citation": case.get('citation', ''),
                "status": "VERIFIED",
                "corpus_text": sample_text
            })
            
    # Also check standard citations pattern (e.g. 2021 SCC 123)
    # simplified logic here
            
    if not matches:
        return CitationCheckResponse(
            text=text,
            verification_status="NOT_FOUND",
            matches=[]
        )
        
    return CitationCheckResponse(
        text=text,
        verification_status="VERIFIED" if len(matches) > 0 else "REVIEW_REQUIRED",
        matches=matches
    )
