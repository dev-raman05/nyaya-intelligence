/**
 * Centralized API Client for Nyaya Intelligence
 * 
 * Handles all fetch requests to the FastAPI backend.
 * Base URL is defined by NEXT_PUBLIC_API_URL, which defaults to localhost during development.
 * Designed to silently fail and return graceful fallbacks to prevent intrusive Next.js dev overlays
 * when the backend is booting up.
 */
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

async function fetchAPI(path, options = {}) {
  const url = `${API_BASE}${path}`;
  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(`API Error ${res.status}: ${error}`);
    }
    return await res.json();
  } catch (err) {
    // Suppress console.error in dev to prevent intrusive Next.js popups on expected fallbacks
    throw err;
  }
}

export const api = {
  // Research
  research: async (query, options = {}) => {
    try {
      return await fetchAPI('/research', {
        method: 'POST',
        body: JSON.stringify({
          query,
          jurisdiction: options.jurisdiction || 'India',
          doc_type: options.doc_type || 'all',
          time_period: options.time_period || 'all',
          search_mode: options.search_mode || 'hybrid'
        }),
      });
    } catch (err) {
      console.warn("Backend error during research, triggering empty state fallback", err);
      // Return empty results to trigger the "Prototype Corpus" empty state gracefully
      return {
        research_id: 'error-' + Date.now(),
        query_analysis: {
          research_objective: query,
          legal_issues: ['Unknown Issue'],
          facts: [],
          statutory_concepts: [],
          propositions: [],
          expanded_terms: []
        },
        results: [],
        summary: "Error during retrieval.",
        metadata: { results_count: 0 }
      };
    }
  },

  getDemos: async () => {
    try {
      return await fetchAPI('/research/demos');
    } catch {
      return [
        { id: 'demo_1', title: 'Arbitration Separability', query: 'Does termination of a contract necessarily terminate the arbitration agreement contained in it?', description: 'Separability doctrine' },
        { id: 'demo_2', title: 'Electronic Evidence', query: 'Can electronic communications support the existence of a contractual relationship where there is no formal written agreement?', description: 'Electronic evidence and contracts' },
        { id: 'demo_3', title: 'Doctrine of Separability', query: 'Show the Supreme Court authorities supporting the doctrine of separability.', description: 'Separability authorities' },
        { id: 'demo_4', title: 'Right to Privacy', query: 'What is the constitutional basis for the right to privacy in India?', description: 'Privacy as fundamental right' }
      ];
    }
  },

  runDemo: async (demoId) => {
    try {
      return await fetchAPI(`/research/demo/${demoId}`, { method: 'POST' });
    } catch {
      const demos = await api.getDemos();
      const demo = demos.find(d => d.id === demoId);
      if (demo) return api.research(demo.query || demo.title);
      return api.research('demo query');
    }
  },

  // Citations
  checkCitations: async (text) => {
    try {
      return await fetchAPI('/citations/check', {
        method: 'POST',
        body: JSON.stringify({ text }),
      });
    } catch {
      return { text, verification_status: 'UNAVAILABLE', matches: [] };
    }
  },

  getCitationGraph: async (caseId) => {
    try {
      return await fetchAPI(`/citations/graph/${caseId}`);
    } catch {
      return { nodes: [], edges: [] };
    }
  },

  getFullGraph: async () => {
    try {
      return await fetchAPI('/citations/graph/full');
    } catch {
      return { nodes: [], edges: [] };
    }
  },

  // Arguments
  buildArgument: async (query, selectedCases) => {
    try {
      return await fetchAPI('/arguments/build', {
        method: 'POST',
        body: JSON.stringify({ query, selected_cases: selectedCases }),
      });
    } catch {
      return { argument_text: 'Backend unavailable. Please start the backend server.' };
    }
  },

  exportArgument: async (data) => {
    try {
      return await fetchAPI('/arguments/export', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch {
      return { markdown: '# Export unavailable' };
    }
  },

  // Corpus
  getCorpusStatus: async () => {
    try {
      return await fetchAPI('/corpus/status');
    } catch {
      return {
        total_cases: 26, total_paragraphs: 50, total_citations: 35,
        total_statutes: 3, corpus_name: 'Nyaya Intelligence Prototype Corpus',
        domains: ['Arbitration Law', 'Evidence and Contracts', 'Fundamental Rights', 'Constitutional Interpretation'],
        last_updated: '2026-08-24', index_status: 'Offline'
      };
    }
  },

  getCase: async (caseId) => {
    try {
      return await fetchAPI(`/corpus/case/${caseId}`);
    } catch {
      return null;
    }
  },

  getCaseParagraphs: async (caseId) => {
    try {
      return await fetchAPI(`/corpus/case/${caseId}/paragraphs`);
    } catch {
      return [];
    }
  }
};

// Fallback mock response
function getMockResponse(query) {
  return {
    research_id: 'mock-' + Date.now(),
    query_analysis: {
      facts: ['Contract termination', 'Arbitration clause invoked post-termination'],
      legal_issues: ['Separability of arbitration agreement', 'Survival after termination', 'Tribunal jurisdiction'],
      statutory_concepts: ['Section 16 - Arbitration Act 1996', 'Section 7 - Arbitration Act 1996'],
      research_objective: 'Identify verified Indian authorities supporting or opposing the proposition that an arbitration agreement survives contract termination.',
      propositions: ['An arbitration agreement can survive termination of the underlying contract.'],
      expanded_terms: ['separability', 'arbitration', 'termination', 'survival', 'kompetenz-kompetenz']
    },
    results: [
      {
        case_id: 'SC_ARB_001',
        case_name: 'Hindustan Petroleum Corporation Ltd. v. Pinkcity Midway Petroleums',
        court: 'Supreme Court of India',
        date: '2003-11-06',
        citation: '(2003) 6 SCC 503',
        relevance_score: 0.94,
        proposition_support: 'Strong support',
        authority_status: 'Verified',
        why_it_matters: 'Directly addresses the separability of the arbitration agreement from the underlying contract, holding that termination does not ipso facto terminate the arbitration agreement.',
        supporting_passages: [{
          paragraph_id: 'SC_ARB_001_P1',
          text: 'It is well settled that an arbitration agreement is a separate and distinct agreement from the underlying contract. The arbitration clause in a contract is an independent agreement. Even if the contract is terminated, the arbitration clause, being a separate agreement, survives such termination.',
          case_id: 'SC_ARB_001',
          case_name: 'Hindustan Petroleum Corporation Ltd. v. Pinkcity Midway Petroleums',
          evidence_status: 'Verified'
        }],
        ranking_breakdown: {
          lexical_score: 0.85, semantic_score: 0.92, statute_match: 1.0,
          issue_match: 0.95, court_weight: 1.2, citation_score: 0.8, paragraph_support_score: 0.94
        }
      },
      {
        case_id: 'SC_ARB_002',
        case_name: 'NTPC Ltd. v. Singer Company',
        court: 'Supreme Court of India',
        date: '1992-12-07',
        citation: '1992 (3) SCC 551',
        relevance_score: 0.91,
        proposition_support: 'Strong support',
        authority_status: 'Verified',
        why_it_matters: 'Recognized that an arbitration clause is a collateral and autonomous agreement that does not get extinguished by the frustration or termination of the main contract.',
        supporting_passages: [{
          paragraph_id: 'SC_ARB_002_P1',
          text: 'The arbitration agreement is an independent agreement. It is ancillary to the underlying contract. Even if the underlying contract comes to an end, the arbitration agreement does not thereby cease to exist. The arbitration clause survives for the purpose of resolution of disputes arising under or in relation to the contract.',
          case_id: 'SC_ARB_002',
          case_name: 'NTPC Ltd. v. Singer Company',
          evidence_status: 'Verified'
        }],
        ranking_breakdown: {
          lexical_score: 0.82, semantic_score: 0.90, statute_match: 0.8,
          issue_match: 0.90, court_weight: 1.2, citation_score: 0.75, paragraph_support_score: 0.91
        }
      }
    ],
    summary: 'Based on verified authorities in the prototype corpus, the doctrine of separability is well-established in Indian law. The Supreme Court has consistently held that an arbitration agreement is independent of the underlying contract and survives its termination. [1] Hindustan Petroleum Corporation Ltd. v. Pinkcity Midway Petroleums established that termination does not ipso facto terminate the arbitration clause. [2] NTPC Ltd. v. Singer Company confirmed that the arbitration agreement is a collateral and autonomous agreement.',
    metadata: { time_taken: 1.5, search_mode: 'hybrid (fallback)', results_count: 2 }
  };
}
