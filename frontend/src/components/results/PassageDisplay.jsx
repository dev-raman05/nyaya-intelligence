"use client";
import { Quote } from 'lucide-react';

export default function PassageDisplay({ passage, paragraph }) {
  return (
    <div className="relative mt-4 bg-nyaya-bg border border-nyaya-border rounded-lg overflow-hidden group">
      <div className="absolute top-0 left-0 w-1 h-full bg-nyaya-border group-hover:bg-nyaya-accent transition-colors" />
      <div className="p-4 pl-6">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-bold text-nyaya-secondary uppercase tracking-wider flex items-center gap-2">
            <Quote size={12} className="text-nyaya-accent" />
            Supporting Passage
          </div>
          <div className="text-xs font-mono text-nyaya-secondary bg-nyaya-surface px-2 py-0.5 rounded border border-nyaya-border">
            ¶ {paragraph}
          </div>
        </div>
        <blockquote className="font-serif text-lg leading-relaxed text-nyaya-text/90 italic pl-2 border-l-2 border-nyaya-border/50">
          "{passage}"
        </blockquote>
      </div>
    </div>
  );
}
