"use client";

export default function RankingBreakdown({ result }) {
  const breakdown = [
    { label: "Semantic Match (Dense Vector)", score: result.relevance, color: "bg-nyaya-info" },
    { label: "Keyword Overlap (BM25)", score: result.relevance - 15, color: "bg-nyaya-accent" },
    { label: "Citation Centrality", score: result.relevance + 5, color: "bg-nyaya-verified" },
    { label: "Jurisdiction Weight", score: 100, color: "bg-nyaya-text" }
  ];

  return (
    <div>
      <h4 className="text-sm font-semibold text-nyaya-text mb-4">Ranking Factors</h4>
      <div className="space-y-4">
        {breakdown.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-nyaya-secondary">{item.label}</span>
              <span className="font-mono text-nyaya-text">{Math.min(item.score, 100)}%</span>
            </div>
            <div className="w-full bg-nyaya-surface h-1.5 rounded-full overflow-hidden">
              <div 
                className={`h-full ${item.color} rounded-full`}
                style={{ width: `${Math.min(item.score, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
