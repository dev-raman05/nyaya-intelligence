"use client";
import ResearchInput from '@/components/research/ResearchInput';
import DemoCards from '@/components/research/DemoCards';
import GuidedDemo from '@/components/common/GuidedDemo';
import { useState } from 'react';
import ProcessingAnimation from '@/components/research/ProcessingAnimation';
import Badge from '@/components/common/Badge';

export default function Home() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const demoSteps = [
    { title: "Welcome to Nyaya", content: "Nyaya Intelligence is a premium legal research platform that grounds every AI response in verified case law." },
    { title: "Natural Language Queries", content: "You don't need boolean operators. Describe your legal issue in natural language just like you would to a colleague." },
    { title: "Verified Results", content: "The AI searches our curated corpus of Supreme Court judgments, extracts the exact paragraphs, and verifies the legal proposition before showing it to you." }
  ];

  if (isProcessing) {
    return (
      <div className="flex-1 flex items-center justify-center h-[80vh]">
        <ProcessingAnimation />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full pt-10">
      <div className="text-center mb-8">
        <Badge type="warning" className="mb-6">Prototype Corpus</Badge>
        <h1 className="text-5xl font-bold text-nyaya-text mb-4 tracking-tight">
          Legal Research Intelligence
        </h1>
        <p className="text-nyaya-secondary text-lg max-w-2xl mx-auto">
          Ask about facts, issues, propositions or authorities. Nyaya retrieves only verified sources from the prototype corpus.
        </p>
      </div>

      <ResearchInput setIsProcessing={setIsProcessing} />
      
      <DemoCards setIsProcessing={setIsProcessing} />

      <button 
        onClick={() => setIsDemoOpen(true)}
        className="mt-12 text-sm text-nyaya-accent hover:underline decoration-nyaya-accent/50 underline-offset-4"
      >
        Start Guided Demo
      </button>

      <GuidedDemo 
        isOpen={isDemoOpen} 
        onClose={() => setIsDemoOpen(false)} 
        steps={demoSteps} 
      />
    </div>
  );
}
