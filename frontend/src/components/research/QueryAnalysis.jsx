"use client";
import Badge from '@/components/common/Badge';
import { Target, FileText, Scale } from 'lucide-react';

export default function QueryAnalysis({ understanding }) {
  if (!understanding) return null;

  return (
    <div className="bg-nyaya-surface border border-nyaya-border rounded-lg p-6 mb-8 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Facts */}
        <div>
          <h3 className="flex items-center gap-2 text-xs font-bold tracking-wider text-nyaya-secondary uppercase mb-4">
            <FileText size={14} className="text-nyaya-accent" /> Identified Facts
          </h3>
          <ul className="space-y-2">
            {understanding.facts.map((fact, idx) => (
              <li key={idx} className="text-sm text-nyaya-text flex items-start gap-2">
                <span className="text-nyaya-accent/50 mt-1">•</span>
                {fact}
              </li>
            ))}
          </ul>
        </div>

        {/* Issues */}
        <div>
          <h3 className="flex items-center gap-2 text-xs font-bold tracking-wider text-nyaya-secondary uppercase mb-4">
            <Scale size={14} className="text-nyaya-accent" /> Legal Issues
          </h3>
          <ul className="space-y-3">
            {understanding.legal_issues.map((issue, idx) => (
              <li key={idx} className="text-sm text-nyaya-text font-serif bg-nyaya-bg p-3 rounded border border-nyaya-border/50">
                {issue}
              </li>
            ))}
          </ul>
        </div>

        {/* Objective */}
        <div>
          <h3 className="flex items-center gap-2 text-xs font-bold tracking-wider text-nyaya-secondary uppercase mb-4">
            <Target size={14} className="text-nyaya-accent" /> Research Objective
          </h3>
          <div className="text-sm text-nyaya-text bg-nyaya-bg p-3 rounded border-l-2 border-nyaya-accent">
            "{understanding.research_objective}"
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge type="info">Supreme Court</Badge>
            <Badge type="info">Judgments</Badge>
          </div>
        </div>

      </div>
    </div>
  );
}
