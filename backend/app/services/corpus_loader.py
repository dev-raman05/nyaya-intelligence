import os
import json
import logging
from config import settings

logger = logging.getLogger(__name__)

_cases = {}
_paragraphs = []
_citations = []
_statutes = {}
_metadata = {}

def init_corpus():
    global _cases, _paragraphs, _citations, _statutes, _metadata
    
    corpus_dir = os.path.abspath(settings.CORPUS_PATH)
    logger.info(f"Loading corpus from {corpus_dir}")
    
    # Load cases
    cases_file = os.path.join(corpus_dir, "cases.json")
    if os.path.exists(cases_file):
        try:
            with open(cases_file, 'r', encoding='utf-8') as f:
                cases_data = json.load(f)
                for case in cases_data:
                    _cases[case['case_id']] = case
        except Exception as e:
            logger.error(f"Error loading cases.json: {e}")
    
    # Load paragraphs (separate file)
    paragraphs_file = os.path.join(corpus_dir, "paragraphs.json")
    if os.path.exists(paragraphs_file):
        try:
            with open(paragraphs_file, 'r', encoding='utf-8') as f:
                paras_data = json.load(f)
                for p in paras_data:
                    case = _cases.get(p['case_id'], {})
                    _paragraphs.append({
                        'paragraph_id': p.get('paragraph_id', ''),
                        'case_id': p.get('case_id', ''),
                        'case_name': case.get('case_name', 'Unknown'),
                        'court': case.get('court', 'Unknown'),
                        'date': case.get('date', 'Unknown'),
                        'citation': case.get('citation', ''),
                        'paragraph_number': p.get('paragraph_number', ''),
                        'text': p.get('text', ''),
                        'legal_propositions': p.get('legal_propositions', [])
                    })
        except Exception as e:
            logger.error(f"Error loading paragraphs.json: {e}")
    
    # Load citations
    citations_file = os.path.join(corpus_dir, "citations.json")
    if os.path.exists(citations_file):
        try:
            with open(citations_file, 'r', encoding='utf-8') as f:
                _citations = json.load(f)
        except Exception as e:
            logger.error(f"Error loading citations.json: {e}")
    
    # Load statutes
    statutes_file = os.path.join(corpus_dir, "statutes.json")
    if os.path.exists(statutes_file):
        try:
            with open(statutes_file, 'r', encoding='utf-8') as f:
                statutes_data = json.load(f)
                for s in statutes_data:
                    _statutes[s['statute_id']] = s
        except Exception as e:
            logger.error(f"Error loading statutes.json: {e}")
    
    # Load metadata
    metadata_file = os.path.join(corpus_dir, "metadata.json")
    if os.path.exists(metadata_file):
        try:
            with open(metadata_file, 'r', encoding='utf-8') as f:
                _metadata = json.load(f)
        except Exception as e:
            logger.error(f"Error loading metadata.json: {e}")
    
    logger.info(f"Loaded {len(_cases)} cases, {len(_paragraphs)} paragraphs, {len(_citations)} citation relationships.")

def get_status():
    return {
        "total_cases": len(_cases),
        "total_paragraphs": len(_paragraphs),
        "total_citations": len(_citations),
        "total_statutes": len(_statutes),
        "jurisdictions": list(set(c.get('court', 'Unknown') for c in _cases.values())),
        "date_range": {
            "start": min((c.get('date', '9999') for c in _cases.values()), default='Unknown'),
            "end": max((c.get('date', '0000') for c in _cases.values()), default='Unknown')
        },
        "domains": _metadata.get('domains_covered', []),
        "corpus_name": _metadata.get('corpus_name', 'Nyaya Intelligence Prototype Corpus'),
        "last_updated": _metadata.get('last_updated', 'Unknown'),
        "index_status": "Loaded" if _cases else "Empty"
    }

def get_case(case_id: str):
    return _cases.get(case_id)

def get_all_cases():
    return list(_cases.values())

def get_case_paragraphs(case_id: str):
    return [p for p in _paragraphs if p['case_id'] == case_id]

def get_all_paragraphs():
    return _paragraphs

def get_citations_data():
    return _citations

def get_all_statutes():
    return list(_statutes.values())

def search_cases_by_keyword(keyword: str):
    keyword_lower = keyword.lower()
    results = []
    for case in _cases.values():
        searchable = ' '.join([
            case.get('case_name', ''),
            case.get('facts', ''),
            case.get('issues', '') if isinstance(case.get('issues'), str) else ' '.join(case.get('issues', [])),
            case.get('holding', ''),
            case.get('reasoning', ''),
            ' '.join(case.get('acts', [])),
            ' '.join(case.get('sections', []))
        ]).lower()
        if keyword_lower in searchable:
            results.append(case)
    return results
