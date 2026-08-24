from app.models.schemas import QueryAnalysis, RankingBreakdown
from typing import List, Dict

def rerank(candidates: List[Dict], analysis: QueryAnalysis) -> List[Dict]:
    reranked = []
    
    for doc in candidates:
        # Dummy scoring based on available data
        lexical = doc.get('bm25_score', 0.5)
        semantic = doc.get('vector_score', 0.5)
        
        # Simple feature logic
        statute_match = 0.0
        text_lower = doc.get('text', '').lower()
        for stat in analysis.statutory_concepts:
            if stat.lower() in text_lower:
                statute_match = 1.0
                break
                
        issue_match = 0.5 if analysis.legal_issues else 0.0
        
        court_weight = 1.0
        court = doc.get('court', '').lower()
        if 'supreme court' in court:
            court_weight = 1.2
        elif 'high court' in court:
            court_weight = 1.0
        else:
            court_weight = 0.8
            
        citation_score = 0.5 # placeholder
        paragraph_support_score = semantic
        
        # Weighted combination
        final_score = (
            (lexical * 0.2) +
            (semantic * 0.3) +
            (statute_match * 0.2) +
            (issue_match * 0.1) +
            (court_weight * 0.1) +
            (citation_score * 0.1)
        )
        
        doc['final_score'] = final_score
        doc['ranking_breakdown'] = RankingBreakdown(
            lexical_score=round(lexical, 2),
            semantic_score=round(semantic, 2),
            statute_match=round(statute_match, 2),
            issue_match=round(issue_match, 2),
            court_weight=round(court_weight, 2),
            citation_score=round(citation_score, 2),
            paragraph_support_score=round(paragraph_support_score, 2)
        )
        reranked.append(doc)
        
    reranked.sort(key=lambda x: x['final_score'], reverse=True)
    return reranked
