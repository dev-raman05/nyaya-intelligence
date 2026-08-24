"use client";
import { ShieldCheck } from 'lucide-react';
import Tooltip from '../common/Tooltip';

export default function NoHallucinationBadge() {
  return (
    <Tooltip content="All answers are generated exclusively from retrieved, verified legal authorities. The LLM cannot inject external facts." position="bottom">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-nyaya-verified/10 border border-nyaya-verified/30 text-nyaya-verified text-xs font-semibold cursor-help">
        <ShieldCheck size={14} />
        Evidence-Constrained AI
      </div>
    </Tooltip>
  );
}
