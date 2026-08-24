"use client";
import Sidebar from './Sidebar';
import CorpusStatus from '@/components/common/CorpusStatus';

export default function Layout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col relative overflow-hidden bg-nyaya-bg">
        <main className="flex-1 overflow-y-auto pt-6 pb-20 px-8">
          <div className="max-w-7xl mx-auto w-full h-full">
            {children}
          </div>
        </main>
        <div className="absolute bottom-0 w-full">
          <CorpusStatus />
        </div>
      </div>
    </div>
  );
}
