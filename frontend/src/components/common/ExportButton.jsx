"use client";
import { Download, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function ExportButton({ data, targetId, label = "Export PDF" }) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const element = targetId ? document.getElementById(targetId) : document.body;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const textContent = element.innerText;
      
      // Simple text formatting for PDF
      const margin = 15;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const maxLineWidth = pageWidth - (margin * 2);
      
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      
      const lines = pdf.splitTextToSize(textContent, maxLineWidth);
      let cursorY = margin;
      
      for (let i = 0; i < lines.length; i++) {
        if (cursorY > 280) {
          pdf.addPage();
          cursorY = margin;
        }
        pdf.text(lines[i], margin, cursorY);
        cursorY += 7; // line height
      }
      
      pdf.save(`Nyaya_Export_${Date.now()}.pdf`);
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button 
      onClick={handleExport}
      disabled={isExporting}
      className="flex items-center gap-2 text-sm text-nyaya-bg bg-nyaya-text hover:bg-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50"
    >
      {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
      {label}
    </button>
  );
}
