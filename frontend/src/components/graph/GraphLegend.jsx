"use client";

export default function GraphLegend() {
  return (
    <div className="absolute top-4 right-4 bg-nyaya-surface/90 backdrop-blur border border-nyaya-border rounded-lg p-4 shadow-lg text-xs">
      <div className="mb-4">
        <div className="font-bold text-nyaya-text mb-2">Courts</div>
        <div className="flex items-center gap-2 mb-1"><div className="w-3 h-3 rounded-full bg-nyaya-accent"></div> Supreme Court</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-nyaya-info"></div> High Court</div>
      </div>
      <div>
        <div className="font-bold text-nyaya-text mb-2">Relationships</div>
        <div className="flex items-center gap-2 mb-1"><div className="w-4 h-0.5 bg-nyaya-verified"></div> Follows / Relies On</div>
        <div className="flex items-center gap-2 mb-1"><div className="w-4 h-0.5 bg-nyaya-warning"></div> Distinguishes</div>
        <div className="flex items-center gap-2 mb-1"><div className="w-4 h-0.5 bg-nyaya-critical"></div> Overrules</div>
        <div className="flex items-center gap-2"><div className="w-4 h-0.5 bg-nyaya-border"></div> Cites</div>
      </div>
    </div>
  );
}
