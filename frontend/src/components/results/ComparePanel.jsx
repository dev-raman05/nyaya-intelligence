"use client";
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import Badge from '../common/Badge';

export default function ComparePanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      {/* Generic LLM */}
      <div className="border border-nyaya-border/50 rounded-lg p-6 bg-nyaya-surface/50 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
        <div className="flex items-center gap-2 mb-4 text-nyaya-secondary font-semibold text-sm">
          Generic LLM
        </div>
        <p className="text-sm text-nyaya-text/80 leading-relaxed mb-6">
          Yes, the termination of a contract does not necessarily terminate the arbitration agreement. The doctrine of separability treats the arbitration clause as an independent agreement...
        </p>
        <div className="bg-nyaya-warning/10 border border-nyaya-warning/20 p-3 rounded flex items-start gap-3">
          <AlertTriangle size={16} className="text-nyaya-warning flex-shrink-0 mt-0.5" />
          <p className="text-xs text-nyaya-warning">
            Citation requires verification. The model generated this text based on pre-training data, not a live verified corpus. Risk of hallucination.
          </p>
        </div>
      </div>

      {/* Nyaya Intelligence */}
      <div className="border border-nyaya-accent/30 rounded-lg p-6 bg-gradient-to-b from-nyaya-surface to-nyaya-bg relative overflow-hidden shadow-lg shadow-nyaya-accent/5">
        <div className="absolute top-0 right-0 p-4">
          <Badge type="verified">Evidence-Constrained</Badge>
        </div>
        <div className="flex items-center gap-2 mb-4 text-nyaya-text font-semibold text-sm">
          <ShieldCheck size={18} className="text-nyaya-accent" />
          Nyaya Intelligence
        </div>
        <p className="text-sm text-nyaya-text leading-relaxed mb-6 font-serif">
          The termination of a contract does not automatically terminate the arbitration agreement. Under Indian law, the arbitration clause survives contract termination.
        </p>
        <div className="bg-nyaya-surface border border-nyaya-border p-3 rounded">
          <div className="text-xs font-bold text-nyaya-secondary mb-2 uppercase tracking-wider">Verified Evidence Chain</div>
          <div className="text-sm text-nyaya-text/90">
            Based on <span className="text-nyaya-accent cursor-pointer hover:underline">SMS Tea Estates Pvt. Ltd. v. Chandmari Tea Co.</span>, ¶12, directly affirming the doctrine of separability.
          </div>
        </div>
      </div>
    </div>
  );
}
