from rank_bm25 import BM25Okapi
import re
import logging
from typing import List, Dict

logger = logging.getLogger(__name__)

_bm25 = None
_corpus_docs = []

def tokenize(text: str) -> List[str]:
    # Simple lowercase word tokenization
    return re.findall(r'\b\w+\b', text.lower())

def build_index(paragraphs: List[Dict]):
    global _bm25, _corpus_docs
    _corpus_docs = paragraphs
    
    if not _corpus_docs:
        logger.warning("No paragraphs provided to build BM25 index.")
        return
        
    tokenized_corpus = [tokenize(doc['text']) for doc in _corpus_docs]
    _bm25 = BM25Okapi(tokenized_corpus)
    logger.info(f"BM25 index built with {len(_corpus_docs)} documents.")

def search(query: str, top_k: int = 10) -> List[Dict]:
    if not _bm25 or not _corpus_docs:
        return []
        
    tokenized_query = tokenize(query)
    scores = _bm25.get_scores(tokenized_query)
    
    # Sort by score
    top_indices = sorted(range(len(scores)), key=lambda i: scores[i], reverse=True)[:top_k]
    
    results = []
    for idx in top_indices:
        score = float(scores[idx])
        if score <= 0.0:
            continue
        doc = _corpus_docs[idx].copy()
        doc['bm25_score'] = score
        results.append(doc)
        
    return results
