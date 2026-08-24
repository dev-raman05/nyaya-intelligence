import os
import json
import logging
from app.models.schemas import QueryAnalysis, ResultCard
from config import settings

logger = logging.getLogger(__name__)

try:
    from google import genai
    HAS_GENAI = True
    
    if settings.GEMINI_API_KEY:
        client = genai.Client(api_key=settings.GEMINI_API_KEY)
    else:
        logger.warning("GEMINI_API_KEY not set. Gemini integration will be disabled.")
        HAS_GENAI = False
        client = None
except ImportError:
    logger.warning("google-genai not installed.")
    HAS_GENAI = False
    client = None

def get_client():
    if not HAS_GENAI or not client:
        return None
    return client

def analyze_query(query: str) -> QueryAnalysis:
    client = get_client()
    if not client:
        raise ValueError("Gemini API not available")

    prompt = f"""
    You are an expert Indian Legal AI. Analyze the following query.
    Extract the facts, legal issues, statutory concepts, research objective, propositions, and expanded search terms.
    Return ONLY a valid JSON object matching this schema:
    {{
        "facts": ["list", "of", "facts"],
        "legal_issues": ["list", "of", "issues"],
        "statutory_concepts": ["statutes", "sections"],
        "research_objective": "objective string",
        "propositions": ["legal", "propositions"],
        "expanded_terms": ["keywords", "synonyms"]
    }}
    
    Query: {query}
    """
    
    response = client.models.generate_content(
        model='gemini-1.5-flash',
        contents=prompt
    )
    response_text = response.text.strip()
    
    # Simple JSON extraction
    if response_text.startswith("```json"):
        response_text = response_text[7:-3]
    elif response_text.startswith("```"):
        response_text = response_text[3:-3]
        
    data = json.loads(response_text)
    return QueryAnalysis(**data)

def synthesize_research(query: str, results: list[ResultCard]) -> str:
    client = get_client()
    if not client:
        return "Gemini API not available for synthesis. Please review the case cards below."
        
    context = ""
    for idx, res in enumerate(results):
        context += f"Case [{idx+1}]: {res.case_name} ({res.citation})\n"
        context += f"Court: {res.court}\n"
        for p in res.supporting_passages:
            context += f"Excerpt: {p.text}\n"
        context += "\n"
        
    prompt = f"""
    You are an expert Indian legal researcher. 
    Synthesize an answer to the query based ONLY on the provided cases.
    NEVER invent or hallucinate citations or cases. ONLY use what is in the context.
    Use citation markers like [1], [2] corresponding to the case numbers.
    
    Query: {query}
    
    Context Cases:
    {context}
    """
    
    response = client.models.generate_content(
        model='gemini-1.5-flash',
        contents=prompt
    )
    return response.text

def build_argument(query: str, selected_cases: list[str]) -> str:
    client = get_client()
    if not client:
        return "Gemini API not available for building arguments."
        
    from app.services import corpus_loader
    
    context = ""
    for cid in selected_cases:
        case = corpus_loader._cases.get(cid)
        if case:
            context += f"Case ID: {cid}\nCase Name: {case.get('case_name')}\nCitation: {case.get('citation')}\n"
            paras = [p['text'] for p in corpus_loader._paragraphs if p.get('case_id') == cid]
            if paras:
                context += "Excerpts:\n" + "\n".join(paras[:2]) + "\n\n"
        
    prompt = f"""
    You are an expert Indian legal researcher drafting a formal legal argument.
    Build a structured legal argument for the following objective.
    You MUST anchor your arguments securely in the provided Context Cases.
    Do not hallucinate citations.
    Ensure the argument has an Introduction, Legal Principles, Application to Facts, and Conclusion.
    
    Objective: {query}
    
    Context Cases:
    {context}
    """
    
    response = client.models.generate_content(
        model='gemini-1.5-pro',
        contents=prompt
    )
    return response.text
