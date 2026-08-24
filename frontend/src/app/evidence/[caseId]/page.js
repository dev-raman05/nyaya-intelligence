"use client";
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import JudgmentViewer from '@/components/evidence/JudgmentViewer';
import EvidenceMap from '@/components/evidence/EvidenceMap';
import { api } from '@/lib/api';

// Using mock data for the page
const mockCaseData = {
  id: "case_1",
  court: "SUPREME COURT OF INDIA",
  caseName: "SMS Tea Estates Pvt. Ltd. v. Chandmari Tea Co. Pvt. Ltd.",
  citation: "(2011) 14 SCC 66",
  date: "2011-07-20",
  passage: "The arbitration agreement is an independent agreement between the parties... even if the main agreement is terminated, the arbitration agreement will survive for resolution of disputes arising under or in connection with the main agreement.",
  paragraph: "12",
};

export default function EvidencePage({ params }) {
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCase() {
      try {
        const data = await api.getCase(params.caseId);
        const paragraphs = await api.getCaseParagraphs(params.caseId);
        if (data) {
          setCaseData({
            id: data.case_id,
            court: data.court,
            caseName: data.case_name,
            citation: data.citation,
            date: data.date,
            paragraphs: paragraphs // pass full paragraphs to map
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCase();
  }, [params.caseId]);

  if (loading) {
    return <div className="p-8 text-nyaya-secondary">Loading case data...</div>;
  }

  if (!caseData) {
    return <div className="p-8 text-nyaya-secondary">Case not found in prototype corpus.</div>;
  }

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col -mx-8 -mt-6">
      <div className="px-8 py-3 bg-nyaya-surface border-b border-nyaya-border flex items-center">
        <Link 
          href="/results"
          className="flex items-center gap-2 text-sm text-nyaya-secondary hover:text-nyaya-text transition-colors"
        >
          <ArrowLeft size={16} /> Back to Results
        </Link>
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        <div className="w-2/3 h-full">
          <JudgmentViewer caseData={caseData} />
        </div>
        <div className="w-1/3 h-full">
          <EvidenceMap caseData={caseData} />
        </div>
      </div>
    </div>
  );
}
