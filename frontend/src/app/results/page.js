"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/lib/context';
import QueryAnalysis from '@/components/research/QueryAnalysis';
import ArchitecturePanel from '@/components/results/ArchitecturePanel';
import ComparePanel from '@/components/results/ComparePanel';
import ResultsTabs from '@/components/results/ResultsTabs';
import ResultCard from '@/components/results/ResultCard';
import NoHallucinationBadge from '@/components/results/NoHallucinationBadge';
import ExportButton from '@/components/common/ExportButton';
import { ArrowLeft } from 'lucide-react';

export default function ResultsPage() {
  const { researchResults } = useAppContext();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('supporting');

  useEffect(() => {
    if (!researchResults) {
      router.push('/');
    }
  }, [researchResults, router]);

  if (!researchResults) return null;

  const filteredResults = researchResults.results.filter(r => r.type === activeTab);

  return (
    <div className="max-w-5xl mx-auto py-6">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-sm text-nyaya-secondary hover:text-nyaya-text transition-colors"
        >
          <ArrowLeft size={16} /> New Research
        </button>
        <div className="flex items-center gap-4">
          <NoHallucinationBadge />
          <ExportButton data={researchResults} />
        </div>
      </div>

      <h1 className="text-2xl font-bold text-nyaya-text mb-6">Research Analysis</h1>
      
      <QueryAnalysis understanding={researchResults.query_analysis} />
      
      <ArchitecturePanel />

      <div className="mb-12">
        <h2 className="text-xl font-bold text-nyaya-text mb-4">Results Summary</h2>
        
        {researchResults.results && researchResults.results.length > 0 ? (
          <>
            <div className="text-nyaya-secondary bg-nyaya-surface p-4 rounded-lg border border-nyaya-border text-sm mb-6">
              Found <strong className="text-nyaya-text">{researchResults.results.length}</strong> candidate authorities from the prototype corpus.
            </div>
            
            <ResultsTabs activeTab={activeTab} setActiveTab={setActiveTab} summary={{ 
              total: researchResults.results.length, 
              supporting: researchResults.results.filter(r => r.type === 'supporting').length, 
              opposing: researchResults.results.filter(r => r.type === 'opposing').length, 
              neutral: researchResults.results.filter(r => r.type === 'neutral').length 
            }} />
            
            <div className="space-y-6">
              {filteredResults.length > 0 ? (
                filteredResults.map(result => (
                  <ResultCard key={result.case_id} result={result} />
                ))
              ) : (
                <div className="text-center py-12 text-nyaya-secondary border border-dashed border-nyaya-border rounded-lg">
                  No {activeTab} authorities found for this proposition.
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="bg-nyaya-surface border border-nyaya-border rounded-xl p-12 text-center shadow-sm">
            <h3 className="text-xl font-bold text-nyaya-warning mb-3">Prototype Corpus</h3>
            <p className="text-nyaya-secondary leading-relaxed mb-6">
              We couldn't find any verified legal authorities matching your query in the current dataset. 
              Remember that this is a <strong>prototype</strong> loaded with a highly-curated subset of 
              ~30 landmark Supreme Court judgments (Arbitration, Evidence, Constitutional Law).
            </p>
            <div className="inline-block bg-nyaya-bg border border-nyaya-border/50 text-nyaya-text px-6 py-3 rounded-md font-medium">
              Will be updated soon with full comprehensive corpus.
            </div>
          </div>
        )}
      </div>

      <div className="mt-16 pt-10 border-t border-nyaya-border">
        <h2 className="text-xl font-bold text-nyaya-text mb-6">LLM Comparison</h2>
        <ComparePanel />
      </div>
    </div>
  );
}
