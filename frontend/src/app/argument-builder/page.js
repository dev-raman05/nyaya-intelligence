"use client";
import { useState, useEffect } from 'react';
import { Briefcase, ArrowRight, FileText, Download } from 'lucide-react';
import { api } from '@/lib/api';
import ProcessingAnimation from '@/components/research/ProcessingAnimation';
import ExportButton from '@/components/common/ExportButton';

export default function ArgumentBuilder() {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [argument, setArgument] = useState('');
  const [availableCases, setAvailableCases] = useState([]);
  const [selectedCases, setSelectedCases] = useState([]);

  useEffect(() => {
    // Fetch some basic cases to populate the selector
    api.getCorpusStatus().then(status => {
      // Dummy fetch to get at least some case IDs based on standard demos
      setAvailableCases([
        { id: 'SC_ARB_001', name: 'Hindustan Petroleum Corporation Ltd. v. Pinkcity Midway Petroleums' },
        { id: 'SC_ARB_002', name: 'NTPC Ltd. v. Singer Company' },
        { id: 'SC_ARB_003', name: 'Bharat Aluminium Co. v. Kaiser Aluminium Technical Services Inc.' }
      ]);
    });
  }, []);

  const handleToggleCase = (id) => {
    setSelectedCases(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleBuild = async () => {
    if (!query.trim() || selectedCases.length === 0) return;
    setIsProcessing(true);
    try {
      const res = await api.buildArgument(query, selectedCases);
      setArgument(res.argument_text);
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 flex flex-col h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-nyaya-text mb-2 flex items-center gap-3">
          <Briefcase className="text-nyaya-accent" size={28} />
          Argument Builder
        </h1>
        <p className="text-nyaya-secondary">
          Synthesize a structured legal argument from selected authorities. AI drafts the argument anchored directly to the verified cases you choose.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2 space-y-4">
          <div className="bg-nyaya-surface border border-nyaya-border rounded-xl p-5 shadow-sm">
            <label className="block text-sm font-bold text-nyaya-text mb-2 uppercase tracking-wider">Argument Objective</label>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Argue that an arbitration clause survives the termination of the main contract..."
              className="w-full h-32 bg-nyaya-bg border border-nyaya-border rounded-lg p-4 text-nyaya-text focus:ring-1 focus:ring-nyaya-accent focus:border-nyaya-accent outline-none resize-none"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-nyaya-surface border border-nyaya-border rounded-xl p-5 shadow-sm h-full">
            <label className="block text-sm font-bold text-nyaya-text mb-4 uppercase tracking-wider">Select Authorities</label>
            <div className="space-y-2 overflow-y-auto max-h-32">
              {availableCases.map((c) => (
                <label key={c.id} className="flex items-start gap-3 p-2 rounded hover:bg-nyaya-bg cursor-pointer border border-transparent hover:border-nyaya-border transition-colors">
                  <input 
                    type="checkbox" 
                    checked={selectedCases.includes(c.id)}
                    onChange={() => handleToggleCase(c.id)}
                    className="mt-1 accent-nyaya-accent"
                  />
                  <span className="text-sm text-nyaya-text font-medium leading-tight">{c.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={handleBuild}
          disabled={!query.trim() || selectedCases.length === 0 || isProcessing}
          className="bg-nyaya-accent text-nyaya-bg font-bold px-8 py-3 rounded-lg hover:bg-nyaya-accent/90 disabled:opacity-50 transition-colors flex items-center gap-2"
        >
          {isProcessing ? 'Synthesizing...' : 'Draft Argument'} <ArrowRight size={18} />
        </button>
      </div>

      {isProcessing && (
        <div className="flex justify-center py-12">
          <ProcessingAnimation />
        </div>
      )}

      {argument && !isProcessing && (
        <div className="bg-nyaya-surface border border-nyaya-border rounded-xl p-8 shadow-sm flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-6 border-b border-nyaya-border pb-4">
            <h2 className="text-xl font-bold text-nyaya-text flex items-center gap-2">
              <FileText className="text-nyaya-info" size={20} /> Draft Argument
            </h2>
            <ExportButton targetId="argument-content" label="Export PDF" />
          </div>
          <div id="argument-content" className="prose prose-invert prose-nyaya max-w-none text-nyaya-text font-serif leading-relaxed whitespace-pre-wrap p-4 bg-nyaya-bg rounded-lg">
            {argument}
          </div>
        </div>
      )}
    </div>
  );
}
