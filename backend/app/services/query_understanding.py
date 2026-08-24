import re
from app.models.schemas import QueryAnalysis
from app.llm import gemini_service

def analyze_query(query: str) -> QueryAnalysis:
    try:
        # Try to use LLM for query understanding first
        analysis = gemini_service.analyze_query(query)
        if analysis:
            return analysis
    except Exception as e:
        # Graceful fallback to rule-based
        pass

    # Rule-based fallback
    facts = []
    issues = []
    statutes = []
    
    # Very basic regex for statutes (e.g. "Section 302 of IPC")
    statute_pattern = re.compile(r"(Section\s+\d+\s+of\s+[A-Za-z\s]+)", re.IGNORECASE)
    found_statutes = statute_pattern.findall(query)
    if found_statutes:
        statutes.extend(found_statutes)
        
    return QueryAnalysis(
        facts=[query],
        legal_issues=["General Legal Query"],
        statutory_concepts=statutes,
        research_objective="Find relevant case laws",
        propositions=[query],
        expanded_terms=query.split()
    )
