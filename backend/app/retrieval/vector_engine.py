import os
import logging
import numpy as np
from config import settings
from typing import List, Dict

logger = logging.getLogger(__name__)

try:
    from sentence_transformers import SentenceTransformer
    import faiss
    HAS_VECTOR_LIBS = True
except ImportError:
    HAS_VECTOR_LIBS = False
    logger.warning("sentence-transformers or faiss-cpu not installed. Vector search will use fallback.")

_model = None
_index = None
_corpus_docs = []

def build_or_load_index(paragraphs: List[Dict]):
    global _model, _index, _corpus_docs
    _corpus_docs = paragraphs
    
    if not paragraphs:
        return
        
    if not HAS_VECTOR_LIBS:
        logger.warning("Skipping real vector index build due to missing libs.")
        return

    logger.info(f"Loading embedding model: {settings.EMBEDDING_MODEL}")
    _model = SentenceTransformer(settings.EMBEDDING_MODEL)
    
    index_path = os.path.join(os.path.abspath(settings.CORPUS_PATH), "faiss.index")
    
    if os.path.exists(index_path):
        logger.info(f"Loading FAISS index from {index_path}")
        _index = faiss.read_index(index_path)
    else:
        logger.info(f"Building FAISS index for {len(paragraphs)} paragraphs...")
        texts = [p['text'] for p in paragraphs]
        embeddings = _model.encode(texts, convert_to_numpy=True, show_progress_bar=True)
        
        dim = embeddings.shape[1]
        _index = faiss.IndexFlatIP(dim)
        faiss.normalize_L2(embeddings)
        _index.add(embeddings)
        
        try:
            faiss.write_index(_index, index_path)
            logger.info(f"Saved FAISS index to {index_path}")
        except Exception as e:
            logger.error(f"Error saving FAISS index: {e}")

def search(query: str, top_k: int = 10) -> List[Dict]:
    if not HAS_VECTOR_LIBS or not _model or not _index or not _corpus_docs:
        # Fallback dummy search
        return []

    query_embedding = _model.encode([query], convert_to_numpy=True)
    faiss.normalize_L2(query_embedding)
    
    distances, indices = _index.search(query_embedding, top_k)
    
    results = []
    for idx, dist in zip(indices[0], distances[0]):
        if idx < 0 or idx >= len(_corpus_docs):
            continue
        doc = _corpus_docs[idx].copy()
        doc['vector_score'] = float(dist)
        results.append(doc)
        
    return results
