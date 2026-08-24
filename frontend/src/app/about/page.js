import { Info, Database, Layers, ShieldCheck, Network } from 'lucide-react';
import Badge from '@/components/common/Badge';
import CorpusStatus from '@/components/common/CorpusStatus';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-nyaya-text mb-4">About Nyaya Intelligence</h1>
        <p className="text-xl text-nyaya-secondary max-w-2xl mx-auto">
          An India-specific, citation-grounded AI legal research and precedent discovery platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-nyaya-surface border border-nyaya-border rounded-xl p-8 shadow-sm">
          <ShieldCheck className="text-nyaya-verified mb-4" size={40} />
          <h2 className="text-xl font-bold text-nyaya-text mb-3">Zero Hallucination Guarantee</h2>
          <p className="text-nyaya-secondary leading-relaxed">
            Unlike generic LLMs (ChatGPT, Claude) that generate text probabilistically and often invent fake citations, Nyaya uses a strict Retrieval-Augmented Generation (RAG) architecture. Every single claim and citation is grounded in a verified corpus.
          </p>
        </div>

        <div className="bg-nyaya-surface border border-nyaya-border rounded-xl p-8 shadow-sm">
          <Layers className="text-nyaya-info mb-4" size={40} />
          <h2 className="text-xl font-bold text-nyaya-text mb-3">Hybrid Retrieval Engine</h2>
          <p className="text-nyaya-secondary leading-relaxed">
            We don't just rely on keywords. Our engine combines BM25 (lexical search) for exact statutory matches and FAISS/Sentence-Transformers (semantic search) to understand the *meaning* of your query.
          </p>
        </div>
        
        <div className="bg-nyaya-surface border border-nyaya-border rounded-xl p-8 shadow-sm">
          <Network className="text-nyaya-accent mb-4" size={40} />
          <h2 className="text-xl font-bold text-nyaya-text mb-3">Citation Graph</h2>
          <p className="text-nyaya-secondary leading-relaxed">
            The law is a web of relationships. Nyaya models Supreme Court cases as a directed graph using NetworkX. We understand when a case is cited, followed, distinguished, or overruled.
          </p>
        </div>
        
        <div className="bg-nyaya-surface border border-nyaya-border rounded-xl p-8 shadow-sm">
          <Database className="text-nyaya-warning mb-4" size={40} />
          <h2 className="text-xl font-bold text-nyaya-text mb-3">Prototype Corpus</h2>
          <p className="text-nyaya-secondary leading-relaxed">
            This prototype is powered by a curated, highly-accurate subset of landmark Indian Supreme Court judgments focusing on Arbitration, Evidence, and Constitutional Law.
          </p>
        </div>
      </div>

      <div className="bg-nyaya-surface border border-nyaya-border rounded-xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-nyaya-border pb-4">
          <Info className="text-nyaya-accent" size={24} />
          <h2 className="text-2xl font-bold text-nyaya-text">Live Corpus Statistics</h2>
        </div>
        <CorpusStatus />
      </div>
    </div>
  );
}
