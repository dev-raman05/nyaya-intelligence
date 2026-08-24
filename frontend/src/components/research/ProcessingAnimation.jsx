"use client";
import { useState, useEffect } from 'react';
import { Check, Loader2 } from 'lucide-react';
import clsx from 'clsx';

const steps = [
  "Parsing linguistic structure and legal concepts...",
  "Identifying facts and jurisdictional constraints...",
  "Extracting legal propositions...",
  "Expanding query with dense vectors...",
  "Traversing citation graph for authorities...",
  "Reranking candidate authorities...",
  "Synthesizing results..."
];

export default function ProcessingAnimation() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(s => (s < steps.length ? s + 1 : s));
    }, 400); // Fast animation for feel
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-md mx-auto mt-20 bg-nyaya-surface border border-nyaya-border rounded-xl p-8 shadow-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Loader2 className="animate-spin text-nyaya-accent" size={24} />
        <h2 className="text-lg font-semibold text-nyaya-text">Nyaya Intelligence</h2>
      </div>
      
      <div className="space-y-4">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isActive = idx === currentStep;
          const isPending = idx > currentStep;
          
          if (isPending && idx > currentStep + 1) return null; // hide far future steps

          return (
            <div key={idx} className={clsx(
              "flex items-center gap-3 text-sm transition-all duration-300",
              isCompleted ? "text-nyaya-secondary" : isActive ? "text-nyaya-text font-medium" : "text-nyaya-secondary/30 opacity-0"
            )}>
              <div className={clsx(
                "w-5 h-5 rounded-full flex items-center justify-center border",
                isCompleted ? "border-nyaya-verified text-nyaya-verified bg-nyaya-verified/10" : isActive ? "border-nyaya-accent text-nyaya-accent" : "border-nyaya-border text-transparent"
              )}>
                {isCompleted && <Check size={12} />}
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-nyaya-accent animate-pulse" />}
              </div>
              {step}
            </div>
          );
        })}
      </div>
    </div>
  );
}
