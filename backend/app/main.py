"""
Main Application Entry Point for Nyaya Intelligence Backend.

This module initializes the FastAPI application, configures CORS, and defines
the startup event to preload data (Corpus, BM25 Index, FAISS Vector Index, and Citation Graph).
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from app.routers import research, citations, arguments, corpus
from app.services import corpus_loader
from app.retrieval import bm25_engine, vector_engine
from app.graph import citation_graph
import logging

# Configure basic logging for the backend
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app with metadata
app = FastAPI(title="Nyaya Intelligence API", version="1.0.0", description="Backend API for Legal Research Prototype")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    logger.info("Initializing Nyaya Intelligence Backend...")
    
    # Load corpus
    logger.info("Loading corpus...")
    corpus_loader.init_corpus()
    
    # Build BM25
    logger.info("Building BM25 Index...")
    bm25_engine.build_index(corpus_loader.get_all_paragraphs())
    
    # Build Vector Index
    logger.info("Building Vector Index (this may take a moment on first run)...")
    vector_engine.build_or_load_index(corpus_loader.get_all_paragraphs())
    
    # Build Citation Graph
    logger.info("Building Citation Graph...")
    citation_graph.build_graph(corpus_loader.get_citations_data())
    # Pass case metadata for enriched node labels
    cases_dict = {c['case_id']: c for c in corpus_loader.get_all_cases()}
    citation_graph.set_case_metadata(cases_dict)
    
    status = corpus_loader.get_status()
    logger.info(f"Initialization complete. Cases: {status['total_cases']}, Paragraphs: {status['total_paragraphs']}, Citations: {status['total_citations']}")

app.include_router(research.router, prefix="/api/research", tags=["research"])
app.include_router(citations.router, prefix="/api/citations", tags=["citations"])
app.include_router(arguments.router, prefix="/api/arguments", tags=["arguments"])
app.include_router(corpus.router, prefix="/api/corpus", tags=["corpus"])

@app.get("/health")
def health_check():
    return {"status": "ok"}
