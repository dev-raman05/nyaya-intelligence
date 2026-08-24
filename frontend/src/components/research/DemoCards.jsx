"use client";
import { useEffect, useState, useCallback } from 'react';
import { api } from '@/lib/api';
import { ChevronRight, RefreshCw } from 'lucide-react';
import { useAppContext } from '@/lib/context';
import { useRouter } from 'next/navigation';

export default function DemoCards({ setIsProcessing }) {
  const [allDemos, setAllDemos] = useState([]);
  const [visibleDemos, setVisibleDemos] = useState([]);
  const { setResearchResults, saveToHistory } = useAppContext();
  const router = useRouter();

  const shuffleDemos = useCallback((demosToShuffle) => {
    const shuffled = [...demosToShuffle].sort(() => 0.5 - Math.random());
    setVisibleDemos(shuffled.slice(0, 4));
  }, []);

  useEffect(() => {
    api.getDemos().then(demos => {
      setAllDemos(demos);
      shuffleDemos(demos);
    });
  }, [shuffleDemos]);

  const runDemo = async (demo) => {
    setIsProcessing(true);
    try {
      const results = await api.research(demo.query || demo.text, {});
      setResearchResults(results);
      saveToHistory({ query: demo.query || demo.text, date: new Date().toISOString(), results });
      router.push('/results');
    } catch (e) {
      console.error(e);
      setIsProcessing(false);
    }
  };

  return (
    <div className="mt-16 w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-nyaya-secondary uppercase tracking-wider flex items-center gap-4">
          Example Queries
        </h3>
        <button 
          onClick={() => shuffleDemos(allDemos)}
          className="flex items-center gap-1.5 text-xs font-semibold text-nyaya-accent hover:text-nyaya-accent/80 transition-colors bg-nyaya-accent/10 px-3 py-1.5 rounded-full"
        >
          <RefreshCw size={14} /> Shuffle Demos
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {visibleDemos.map((demo) => (
          <button 
            key={demo.id}
            onClick={() => runDemo(demo)}
            className="group flex flex-col text-left bg-nyaya-surface border border-nyaya-border rounded-lg p-5 hover:border-nyaya-accent/50 transition-all hover:shadow-lg hover:shadow-nyaya-accent/5 relative overflow-hidden h-32"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-nyaya-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            <h4 className="text-nyaya-text font-semibold text-sm mb-2">{demo.title}</h4>
            <p className="text-nyaya-secondary text-sm font-serif italic line-clamp-2">"{demo.query || demo.text}"</p>
            <div className="mt-auto flex items-center gap-1 text-xs font-medium text-nyaya-accent opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
              Run Demo <ChevronRight size={14} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
