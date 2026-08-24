"use client";
import clsx from 'clsx';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

export default function ResultsTabs({ activeTab, setActiveTab, summary }) {
  return (
    <div className="flex gap-4 border-b border-nyaya-border mb-6">
      <button
        onClick={() => setActiveTab('supporting')}
        className={clsx(
          "flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors",
          activeTab === 'supporting'
            ? "border-nyaya-verified text-nyaya-verified bg-nyaya-verified/5"
            : "border-transparent text-nyaya-secondary hover:text-nyaya-text hover:bg-nyaya-surface"
        )}
      >
        <ShieldCheck size={16} />
        Supports Proposition ({summary.supporting})
      </button>
      
      <button
        onClick={() => setActiveTab('opposing')}
        className={clsx(
          "flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors",
          activeTab === 'opposing'
            ? "border-nyaya-warning text-nyaya-warning bg-nyaya-warning/5"
            : "border-transparent text-nyaya-secondary hover:text-nyaya-text hover:bg-nyaya-surface"
        )}
      >
        <ShieldAlert size={16} />
        Challenges Proposition ({summary.opposing})
      </button>
    </div>
  );
}
