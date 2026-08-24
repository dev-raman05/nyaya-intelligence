"use client";
import Badge from '@/components/common/Badge';
import PassageDisplay from './PassageDisplay';
import RankingBreakdown from './RankingBreakdown';
import { ExternalLink, Network, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import clsx from 'clsx';

export default function ResultCard({ result }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-nyaya-surface border border-nyaya-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow mb-6">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-xs font-bold text-nyaya-secondary tracking-widest uppercase mb-1">
              {result.court}
            </div>
            <h3 className="text-xl font-bold text-nyaya-text mb-1 flex items-center gap-3">
              {result.case_name}
              <Badge type={result.authority_status === 'Verified' ? 'verified' : 'warning'}>
                {result.authority_status}
              </Badge>
            </h3>
            <div className="text-sm font-medium text-nyaya-secondary">
              {result.citation} • {result.date ? new Date(result.date).getFullYear() : ''}
            </div>
          </div>
          
          <div className="flex gap-4 items-center bg-nyaya-bg p-3 rounded-lg border border-nyaya-border/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-nyaya-accent">{Math.round(result.relevance_score * 100)}%</div>
              <div className="text-[10px] uppercase tracking-wider text-nyaya-secondary font-medium">Relevance</div>
            </div>
            <div className="w-px h-8 bg-nyaya-border" />
            <div className="text-center">
              <div className="text-2xl font-bold text-nyaya-verified">100%</div>
              <div className="text-[10px] uppercase tracking-wider text-nyaya-secondary font-medium">Support</div>
            </div>
          </div>
        </div>

        <div className="bg-nyaya-bg rounded-lg p-4 border-l-2 border-nyaya-info mb-6">
          <div className="text-xs font-bold text-nyaya-info uppercase tracking-wider mb-2 flex items-center gap-2">
            Why this case matters
          </div>
          <p className="text-sm text-nyaya-text leading-relaxed">
            {result.why_it_matters}
          </p>
        </div>

        {result.supporting_passages && result.supporting_passages.length > 0 && (
          <PassageDisplay passage={result.supporting_passages[0].text} paragraph={result.supporting_passages[0].paragraph_id} />
        )}

        <div className="mt-6 flex items-center justify-between border-t border-nyaya-border pt-4">
          <div className="flex gap-3">
            <Link 
              href={`/evidence/${result.case_id}`}
              className="flex items-center gap-1.5 text-xs font-medium bg-nyaya-accent/10 text-nyaya-accent hover:bg-nyaya-accent/20 px-3 py-1.5 rounded transition-colors"
            >
              <FileText size={14} /> Full Judgment
            </Link>
            <Link 
              href={`/authority-map?caseId=${result.case_id}`}
              className="flex items-center gap-1.5 text-xs font-medium text-nyaya-secondary hover:text-nyaya-text bg-nyaya-bg hover:bg-nyaya-border/50 px-3 py-1.5 rounded border border-nyaya-border transition-colors"
            >
              <Network size={14} /> Trace Citations
            </Link>
          </div>
          
          <button 
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs font-medium text-nyaya-secondary hover:text-nyaya-text transition-colors"
          >
            {expanded ? (
              <><ChevronUp size={14} /> Hide Ranking Details</>
            ) : (
              <><ChevronDown size={14} /> Why This Result?</>
            )}
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="bg-nyaya-bg border-t border-nyaya-border p-6">
          <RankingBreakdown result={result} />
        </div>
      )}
    </div>
  );
}
