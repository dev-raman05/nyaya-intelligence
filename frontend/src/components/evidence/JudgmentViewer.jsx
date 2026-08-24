"use client";
import { Search } from 'lucide-react';
import ExportButton from '@/components/common/ExportButton';

export default function JudgmentViewer({ caseData }) {
  if (!caseData) return null;

  // Use real paragraphs if available, otherwise mock
  const paragraphs = caseData.paragraphs && caseData.paragraphs.length > 0 
    ? caseData.paragraphs 
    : Array.from({ length: 20 }, (_, i) => ({
        paragraph_number: (i + 1).toString(),
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      }));

  return (
    <div className="h-full flex flex-col bg-nyaya-bg">
      <div className="p-4 border-b border-nyaya-border flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-nyaya-text">{caseData.caseName}</h2>
          <div className="text-sm text-nyaya-secondary">{caseData.court} • {caseData.citation} • {caseData.date}</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-nyaya-secondary" />
            <input 
              type="text" 
              placeholder="Search within text..." 
              className="bg-nyaya-surface border border-nyaya-border rounded pl-8 pr-3 py-1.5 text-sm text-nyaya-text focus:outline-none focus:border-nyaya-accent/50 w-64"
            />
          </div>
          <ExportButton targetId="judgment-content" label="PDF" />
        </div>
      </div>
      
      <div id="judgment-content" className="flex-1 overflow-y-auto p-8 font-serif leading-relaxed text-nyaya-text/90">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center mb-12 uppercase tracking-widest text-sm font-sans font-bold">
            IN THE {caseData.court}
            <br/><br/>
            {caseData.caseName}
          </div>
          
          {paragraphs.map((p, idx) => {
            return (
              <div 
                key={idx} 
                className={`flex gap-6`}
                id={`para-${p.paragraph_number || idx}`}
              >
                <div className="w-8 text-right flex-shrink-0 text-nyaya-secondary font-sans text-sm font-semibold pt-1">
                  {p.paragraph_number || idx + 1}.
                </div>
                <div className="text-lg">
                  {p.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
