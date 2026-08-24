import networkx as nx
from typing import Dict, List, Any
import logging

logger = logging.getLogger(__name__)

_G = nx.DiGraph()
_case_metadata = {}

def build_graph(citations_data: List[Dict]):
    global _G
    _G.clear()
    
    if not citations_data:
        return
    
    # Our citations_data is a list of {source_case_id, target_case_id, relationship, context}
    for edge in citations_data:
        source = edge.get('source_case_id', '')
        target = edge.get('target_case_id', '')
        relationship = edge.get('relationship', 'cites')
        context = edge.get('context', '')
        
        if source and target:
            _G.add_node(source)
            _G.add_node(target)
            _G.add_edge(source, target, relationship=relationship, context=context)
            
    logger.info(f"Built citation graph with {_G.number_of_nodes()} nodes and {_G.number_of_edges()} edges.")

def set_case_metadata(cases: Dict):
    """Store case metadata for graph node labels."""
    global _case_metadata
    _case_metadata = cases

def get_subgraph(case_id: str, depth: int = 2) -> Dict[str, Any]:
    if case_id not in _G:
        return {"nodes": [], "edges": []}
        
    # Get ego graph (nodes within 'depth' distance)
    subgraph = nx.ego_graph(_G, case_id, radius=depth, undirected=True)
    
    nodes = []
    for n in subgraph.nodes():
        case = _case_metadata.get(n, {})
        nodes.append({
            "id": n,
            "label": case.get('case_name', n),
            "court": case.get('court', 'Unknown'),
            "year": case.get('date', '')[:4] if case.get('date') else '',
            "citation": case.get('citation', ''),
            "url": case.get('source_url', ''),
            "type": "case"
        })
    
    edges = []
    for u, v, d in subgraph.edges(data=True):
        edges.append({
            "source": u,
            "target": v,
            "relationship": d.get("relationship", "cites"),
            "context": d.get("context", "")
        })
    
    return {"nodes": nodes, "edges": edges}

def get_full_graph() -> Dict[str, Any]:
    """Return the entire citation graph for the authority map page."""
    nodes = []
    for n in _G.nodes():
        case = _case_metadata.get(n, {})
        nodes.append({
            "id": n,
            "label": case.get('case_name', n),
            "court": case.get('court', 'Unknown'),
            "year": case.get('date', '')[:4] if case.get('date') else '',
            "citation": case.get('citation', ''),
            "url": case.get('source_url', ''),
            "type": "case"
        })
    
    edges = []
    for u, v, d in _G.edges(data=True):
        edges.append({
            "source": u,
            "target": v,
            "relationship": d.get("relationship", "cites"),
            "context": d.get("context", "")
        })
    
    return {"nodes": nodes, "edges": edges}

def get_citing_cases(case_id: str) -> List[str]:
    """Get cases that cite this case."""
    if case_id not in _G:
        return []
    return list(_G.predecessors(case_id))

def get_cited_cases(case_id: str) -> List[str]:
    """Get cases cited by this case."""
    if case_id not in _G:
        return []
    return list(_G.successors(case_id))

def get_relationship(source_id: str, target_id: str) -> str:
    """Get the relationship type between two cases."""
    if _G.has_edge(source_id, target_id):
        return _G[source_id][target_id].get('relationship', 'cites')
    return None
