"use client";
import { useState } from 'react';
import { ChevronDown, ChevronUp, Database, Brain, GitMerge, FileSearch, ShieldCheck } from 'lucide-react';

export default function ArchitecturePanel() {
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    { icon: Brain, label: "NL Query" },
    { icon: FileSearch, label: "Issue Extraction" },
    { icon: Database, label: "BM25 | Dense | Citation" },
    { icon: GitMerge, label: "Fusion & Rerank" },
    { icon: ShieldCheck, label: "LLM Verification" },
  ];

  return (
    <div className="bg-nyaya-surface border border-nyaya-border rounded-lg mb-8 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-nyaya-border/30 transition-colors"
      >
        <div className="text-sm font-semibold text-nyaya-text flex items-center gap-2">
          How Nyaya Searched
        </div>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isOpen && (
        <div className="p-6 border-t border-nyaya-border bg-nyaya-bg/50">
          <div className="flex items-center justify-between max-w-4xl mx-auto relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-nyaya-border -translate-y-1/2 z-0" />
            
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-nyaya-surface border-2 border-nyaya-accent flex items-center justify-center text-nyaya-accent shadow-lg">
                    <Icon size={18} />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-nyaya-secondary bg-nyaya-bg px-2">
                    {step.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
