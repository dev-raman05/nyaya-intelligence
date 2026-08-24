from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class ResearchRequest(BaseModel):
    query: str
    jurisdiction: Optional[str] = "India"
    doc_type: Optional[str] = "all"
    time_period: Optional[str] = "all"
    search_mode: Optional[str] = "hybrid"

class QueryAnalysis(BaseModel):
    facts: List[str] = []
    legal_issues: List[str] = []
    statutory_concepts: List[str] = []
    research_objective: str = ""
    propositions: List[str] = []
    expanded_terms: List[str] = []

class RankingBreakdown(BaseModel):
    lexical_score: float = 0.0
    semantic_score: float = 0.0
    statute_match: float = 0.0
    issue_match: float = 0.0
    court_weight: float = 0.0
    citation_score: float = 0.0
    paragraph_support_score: float = 0.0

class PassageResult(BaseModel):
    paragraph_id: str
    text: str
    case_id: str
    case_name: str
    evidence_status: str

class ResultCard(BaseModel):
    case_id: str
    case_name: str
    court: str
    date: str
    citation: str
    relevance_score: float
    proposition_support: str
    authority_status: str
    why_it_matters: str
    supporting_passages: List[PassageResult]
    ranking_breakdown: RankingBreakdown
    type: str = "supporting"

class ResearchResponse(BaseModel):
    research_id: str
    query_analysis: QueryAnalysis
    results: List[ResultCard]
    summary: str
    metadata: Dict[str, Any]

class CitationCheckRequest(BaseModel):
    text: str

class CitationCheckResponse(BaseModel):
    text: str
    verification_status: str
    matches: List[Dict[str, Any]]

class ArgumentBuildRequest(BaseModel):
    query: str
    selected_cases: List[str]

class ArgumentBuildResponse(BaseModel):
    argument_text: str

class CorpusStatus(BaseModel):
    total_cases: int
    total_paragraphs: int
    total_citations: int = 0
    total_statutes: int = 0
    jurisdictions: List[str]
    date_range: Dict[str, str]
    domains: List[str] = []
    corpus_name: str = "Nyaya Intelligence Prototype Corpus"
    last_updated: str = "Unknown"
    index_status: str

class CitationGraphNode(BaseModel):
    id: str
    label: str
    type: str

class CitationGraphEdge(BaseModel):
    source: str
    target: str
    relationship: str

class DemoQuery(BaseModel):
    id: str
    title: str
    query: str
    description: str
