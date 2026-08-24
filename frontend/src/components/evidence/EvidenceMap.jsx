"use client";
import { ArrowRight, FileText, CheckCircle2 } from 'lucide-react';

export default function EvidenceMap({ caseData }) {
  if (!caseData) return null;
  
  return (
    <div className="h-full flex flex-col bg-nyaya-surface border-l border-nyaya-border">
      <div className="p-4 border-b border-nyaya-border bg-nyaya-bg">
        <h3 className="text-sm font-bold text-nyaya-text uppercase tracking-wider">Nyaya Evidence Map</h3>
      </div>
      
      <div className="p-6 flex-1 overflow-y-auto">
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-[19px] top-8 bottom-8 w-px bg-nyaya-border" />
          
          {/* Node 1: Proposition */}
          <div className="relative z-10 flex gap-4 mb-10">
            <div className="w-10 h-10 rounded-full bg-nyaya-bg border-2 border-nyaya-info flex items-center justify-center flex-shrink-0">
              <FileText size={18} className="text-nyaya-info" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-nyaya-secondary uppercase tracking-wider mb-1">User Proposition</div>
              <div className="text-sm text-nyaya-text bg-nyaya-bg p-3 rounded border border-nyaya-border/50">
                Does termination of a contract necessarily terminate the arbitration agreement?
              </div>
            </div>
          </div>
          
          {/* Node 2: Case */}
          <div className="relative z-10 flex gap-4 mb-10">
            <div className="w-10 h-10 rounded-full bg-nyaya-bg border-2 border-nyaya-border flex items-center justify-center flex-shrink-0">
              <ArrowRight size={18} className="text-nyaya-secondary" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-nyaya-secondary uppercase tracking-wider mb-1">Source Case</div>
              <div className="text-sm font-semibold text-nyaya-text">{caseData.caseName}</div>
              <div className="text-xs text-nyaya-secondary">{caseData.citation}</div>
            </div>
          </div>
          
          {/* Node 3: Verification */}
          <div className="relative z-10 flex gap-4">
            <div className="w-10 h-10 rounded-full bg-nyaya-bg border-2 border-nyaya-verified flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <CheckCircle2 size={18} className="text-nyaya-verified" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-nyaya-verified uppercase tracking-wider mb-1 flex items-center gap-2">
                Verified Evidence <span className="px-1.5 py-0.5 bg-nyaya-verified/10 rounded text-[9px]">¶ {caseData.paragraph}</span>
              </div>
              <div className="text-sm text-nyaya-text font-serif italic bg-nyaya-bg p-3 rounded border-l-2 border-nyaya-verified">
                "{caseData.passage}"
              </div>
              <div className="mt-3 text-xs text-nyaya-secondary">
                Model assessment: Direct textual support found for the proposition. No contradiction detected in the remaining judgment text.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
