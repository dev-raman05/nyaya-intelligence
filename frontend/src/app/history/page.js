"use client";
import { History as HistoryIcon, Clock, ArrowRight, Trash2 } from 'lucide-react';
import { useAppContext } from '@/lib/context';
import Link from 'next/link';
import Badge from '@/components/common/Badge';

export default function History() {
  const { researchHistory, clearHistory } = useAppContext();

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-nyaya-text mb-2 flex items-center gap-3">
            <HistoryIcon className="text-nyaya-accent" size={28} />
            Research History
          </h1>
          <p className="text-nyaya-secondary">
            Your past verified research queries and results.
          </p>
        </div>
        
        {researchHistory.length > 0 && (
          <button 
            onClick={clearHistory}
            className="flex items-center gap-2 text-sm text-nyaya-critical hover:text-red-400 transition-colors"
          >
            <Trash2 size={16} /> Clear History
          </button>
        )}
      </div>

      {researchHistory.length === 0 ? (
        <div className="bg-nyaya-surface border border-nyaya-border rounded-xl p-12 text-center shadow-sm">
          <Clock className="mx-auto mb-4 text-nyaya-border" size={48} />
          <h3 className="text-xl font-bold text-nyaya-text mb-2">No history yet</h3>
          <p className="text-nyaya-secondary mb-6">Your research queries will appear here automatically.</p>
          <Link href="/" className="inline-flex items-center gap-2 text-nyaya-bg bg-nyaya-accent px-6 py-2 rounded-md font-semibold hover:bg-nyaya-accent/90 transition-colors">
            Start Research <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {researchHistory.map((item, idx) => (
            <Link 
              key={idx} 
              href={`/results?id=${item.research_id}`}
              className="block bg-nyaya-surface border border-nyaya-border rounded-xl p-6 hover:border-nyaya-accent/50 transition-colors shadow-sm group"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <Badge type="info">Query</Badge>
                  <span className="text-xs text-nyaya-secondary font-medium tracking-wider uppercase">
                    {new Date(item.timestamp || Date.now()).toLocaleDateString()}
                  </span>
                </div>
                <ArrowRight size={18} className="text-nyaya-secondary group-hover:text-nyaya-accent transition-colors opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 duration-300" />
              </div>
              
              <h3 className="text-lg font-bold text-nyaya-text mb-3 leading-tight group-hover:text-nyaya-accent transition-colors">
                {item.query_analysis?.research_objective || item.understanding?.objective || 'Research Query'}
              </h3>
              
              <div className="flex items-center gap-4 text-sm text-nyaya-secondary">
                <span className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-nyaya-verified"></div>
                  {item.metadata?.results_count || item.summary?.total || 0} Authorities Found
                </span>
                <span className="text-nyaya-border">•</span>
                <span className="truncate max-w-md">
                  {item.query_analysis?.legal_issues?.[0] || item.understanding?.issues?.[0] || 'Legal Research'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
