"use client";
import { useAppContext } from '@/lib/context';

export default function CorpusStatus() {
  const { corpusStats } = useAppContext();
  
  return (
    <div className="bg-nyaya-surface/80 backdrop-blur-sm border-t border-nyaya-border py-2 px-6 flex items-center justify-between text-xs text-nyaya-secondary">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-nyaya-verified animate-pulse" />
          <span>Systems Operational</span>
        </div>
        <div className="flex items-center gap-4">
          <span><strong>{corpusStats.documents.toLocaleString()}</strong> Documents</span>
          <span><strong>{corpusStats.judgments.toLocaleString()}</strong> Judgments</span>
          <span><strong>{corpusStats.statutes.toLocaleString()}</strong> Statutes</span>
          <span><strong>{corpusStats.citations.toLocaleString()}</strong> Citations</span>
        </div>
      </div>
      <div className="text-nyaya-warning/80 italic pr-4">
        Prototype Corpus — Demonstration environment. Not a substitute for professional legal judgment.
      </div>
    </div>
  );
}
