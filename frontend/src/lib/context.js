"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [researchResults, setResearchResults] = useState(null);
  const [researchHistory, setResearchHistory] = useState([]);
  const [corpusStats, setCorpusStats] = useState({
    documents: 250000,
    judgments: 120000,
    statutes: 5000,
    citations: 1500000
  });
  
  useEffect(() => {
    const saved = localStorage.getItem('nyaya_history');
    if (saved) {
      try {
        setResearchHistory(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const saveToHistory = (item) => {
    const newHistory = [item, ...researchHistory];
    setResearchHistory(newHistory);
    localStorage.setItem('nyaya_history', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setResearchHistory([]);
    localStorage.removeItem('nyaya_history');
  };

  return (
    <AppContext.Provider value={{
      researchResults,
      setResearchResults,
      researchHistory,
      saveToHistory,
      clearHistory,
      corpusStats
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
