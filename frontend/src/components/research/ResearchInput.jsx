"use client";
import { useState } from 'react';
import { Search, ChevronDown, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAppContext } from '@/lib/context';

export default function ResearchInput({ setIsProcessing }) {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { setResearchResults, saveToHistory } = useAppContext();

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsProcessing(true);
    try {
      const results = await api.research(query, {});
      setResearchResults(results);
      saveToHistory({ query, date: new Date().toISOString(), results });
      router.push('/results');
    } catch (e) {
      console.error(e);
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 bg-nyaya-surface border border-nyaya-border rounded-xl shadow-2xl overflow-hidden focus-within:border-nyaya-accent/50 transition-colors">
      <div className="p-1">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe your legal issue, fact pattern or proposition..."
          className="w-full h-40 bg-transparent text-nyaya-text p-6 resize-none focus:outline-none text-lg leading-relaxed placeholder:text-nyaya-secondary/50 font-serif"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSearch();
            }
          }}
        />
      </div>
      
      <div className="bg-nyaya-bg/50 border-t border-nyaya-border p-4 flex items-center justify-between">
        <div className="flex gap-4">
          <button className="flex items-center gap-2 text-xs font-medium text-nyaya-secondary hover:text-nyaya-text px-3 py-1.5 rounded border border-transparent hover:border-nyaya-border transition-colors">
            <BookOpen size={14} /> Supreme Court of India <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-2 text-xs font-medium text-nyaya-secondary hover:text-nyaya-text px-3 py-1.5 rounded border border-transparent hover:border-nyaya-border transition-colors">
            Judgments + Statutes <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-2 text-xs font-medium text-nyaya-secondary hover:text-nyaya-text px-3 py-1.5 rounded border border-transparent hover:border-nyaya-border transition-colors">
            Hybrid AI Mode <ChevronDown size={14} />
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setQuery("Does termination of a contract necessarily terminate the arbitration agreement?")}
            className="text-xs font-medium text-nyaya-secondary hover:text-nyaya-text transition-colors px-3 py-2"
          >
            Try Demo Case
          </button>
          <button 
            onClick={handleSearch}
            disabled={!query.trim()}
            className="flex items-center gap-2 bg-nyaya-accent hover:bg-nyaya-accent/90 text-nyaya-bg font-bold px-6 py-2 rounded transition-colors disabled:opacity-50"
          >
            <Search size={16} />
            RESEARCH
          </button>
        </div>
      </div>
    </div>
  );
}
