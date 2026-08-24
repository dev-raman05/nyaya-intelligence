"use client";
import { useState } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

export default function GuidedDemo({ steps, isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const next = () => setCurrentStep(Math.min(steps.length - 1, currentStep + 1));
  const prev = () => setCurrentStep(Math.max(0, currentStep - 1));

  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-nyaya-surface border border-nyaya-border rounded-lg shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-nyaya-border">
          <h3 className="text-sm font-bold text-nyaya-text">Guided Tour</h3>
          <button onClick={onClose} className="text-nyaya-secondary hover:text-nyaya-text">
            <X size={18} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-2 text-xs font-medium text-nyaya-accent uppercase tracking-wider">
            Step {currentStep + 1} of {steps.length}
          </div>
          <h4 className="text-lg font-semibold text-nyaya-text mb-2">{step.title}</h4>
          <p className="text-sm text-nyaya-secondary mb-6 leading-relaxed">
            {step.content}
          </p>
          
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prev}
              disabled={currentStep === 0}
              className="flex items-center gap-1 text-sm text-nyaya-secondary disabled:opacity-30 hover:text-nyaya-text"
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <div className="flex gap-1">
              {steps.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === currentStep ? 'bg-nyaya-accent' : 'bg-nyaya-border'}`} />
              ))}
            </div>
            <button
              onClick={currentStep === steps.length - 1 ? onClose : next}
              className="flex items-center gap-1 text-sm text-nyaya-bg bg-nyaya-accent px-4 py-1.5 rounded font-medium hover:bg-nyaya-accent/90"
            >
              {currentStep === steps.length - 1 ? 'Finish' : 'Next'} <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
