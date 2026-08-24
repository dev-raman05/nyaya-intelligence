import markdown

def generate_markdown(research_data: dict) -> str:
    # A simple markdown generator from JSON results
    md = f"# Research Report\n\n"
    
    summary = research_data.get('summary', '')
    if summary:
        md += f"## Summary\n{summary}\n\n"
        
    results = research_data.get('results', [])
    if results:
        md += "## Key Authorities\n\n"
        for idx, res in enumerate(results):
            md += f"### {idx+1}. {res.get('case_name')} ({res.get('citation')})\n"
            md += f"**Court**: {res.get('court')} | **Date**: {res.get('date')}\n\n"
            md += f"**Relevance**: {res.get('why_it_matters')}\n\n"
            
            passages = res.get('supporting_passages', [])
            if passages:
                md += "**Supporting Excerpts:**\n"
                for p in passages:
                    md += f"> {p.get('text')}\n\n"
                    
    return md
