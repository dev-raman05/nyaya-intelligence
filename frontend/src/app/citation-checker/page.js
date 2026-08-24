"use client";
import { useState } from 'react';
import { CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { api } from '@/lib/api';
import Badge from '@/components/common/Badge';
import ProcessingAnimation from '@/components/research/ProcessingAnimation';

export default function CitationChecker() {
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);

  const handleCheck = async () => {
    if (!text.trim()) return;
    setIsProcessing(true);
    try {
      const res = await api.checkCitations(text);
      setResults(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-nyaya-text mb-2 flex items-center gap-3">
          <CheckCircle className="text-nyaya-accent" size={28} />
          Citation Checker
        </h1>
        <p className="text-nyaya-secondary">
          Paste your draft legal argument or brief below. Nyaya will scan for citations and verify them against the trusted prototype corpus.
        </p>
      </div>

      <div className="bg-nyaya-surface border border-nyaya-border rounded-xl p-6 mb-8 shadow-sm">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g. As held in SMS Tea Estates Pvt. Ltd. v. Chandmari Tea Co. Pvt. Ltd. (2011) 14 SCC 66, an arbitration agreement is a collateral term..."
          className="w-full h-48 bg-nyaya-bg border border-nyaya-border rounded-lg p-4 text-nyaya-text font-serif focus:ring-1 focus:ring-nyaya-accent focus:border-nyaya-accent outline-none resize-y mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={handleCheck}
            disabled={!text.trim() || isProcessing}
            className="bg-nyaya-accent text-nyaya-bg font-semibold px-6 py-2 rounded-md hover:bg-nyaya-accent/90 disabled:opacity-50 transition-colors"
          >
            {isProcessing ? 'Scanning...' : 'Verify Citations'}
          </button>
        </div>
      </div>

      {isProcessing && (
        <div className="flex justify-center py-12">
          <ProcessingAnimation />
        </div>
      )}

      {results && !isProcessing && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-nyaya-border pb-4">
            <h2 className="text-xl font-bold text-nyaya-text">Verification Report</h2>
            <Badge type={results.verification_status === 'VERIFIED' ? 'verified' : 'warning'}>
              {results.verification_status}
            </Badge>
          </div>

          {results.matches.length === 0 ? (
            <div className="bg-nyaya-surface border border-nyaya-border rounded-lg p-6 text-center text-nyaya-secondary">
              <AlertTriangle className="mx-auto mb-3 text-nyaya-warning opacity-80" size={32} />
              No verified citations found from our corpus in the provided text.
            </div>
          ) : (
            <div className="grid gap-6">
              {results.matches.map((match, idx) => (
                <div key={idx} className="bg-nyaya-surface border border-nyaya-border rounded-lg p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-nyaya-text mb-1">{match.case_name}</h3>
                      <div className="text-sm text-nyaya-secondary">{match.citation}</div>
                    </div>
                    <div className="flex items-center gap-2 text-nyaya-verified bg-nyaya-verified/10 px-3 py-1.5 rounded-full text-xs font-semibold">
                      <ShieldCheck size={16} /> Verified Active
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="bg-nyaya-bg p-4 rounded border border-nyaya-border/50">
                      <div className="text-xs font-bold text-nyaya-secondary uppercase mb-2">Your Text (Context)</div>
                      <p className="text-sm text-nyaya-text italic">"...{text.substring(Math.max(0, text.toLowerCase().indexOf(match.case_name.toLowerCase()) - 50), text.toLowerCase().indexOf(match.case_name.toLowerCase()) + match.case_name.length + 50)}..."</p>
                    </div>
                    <div className="bg-nyaya-accent/5 p-4 rounded border border-nyaya-accent/30">
                      <div className="text-xs font-bold text-nyaya-accent uppercase mb-2">Actual Corpus Text</div>
                      <p className="text-sm text-nyaya-text">{match.corpus_text || 'Exact paragraph not found.'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
