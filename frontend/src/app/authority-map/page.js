"use client";
import { useState, useEffect } from 'react';
import AuthorityGraph from '@/components/graph/AuthorityGraph';
import GraphLegend from '@/components/graph/GraphLegend';
import Badge from '@/components/common/Badge';
import { api } from '@/lib/api';
import Link from 'next/link';
import ProcessingAnimation from '@/components/research/ProcessingAnimation';
import { ExternalLink } from 'lucide-react';

export default function AuthorityMapPage() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGraph() {
      try {
        const data = await api.getFullGraph();
        // NetworkX sends nodes and edges.
        // D3 expects 'links' and node 'name' instead of 'label' for this specific component
        const formattedData = {
          nodes: data.nodes.map(n => ({
            ...n,
            name: n.label,
            level: n.court || 'Supreme Court',
          })),
          links: data.edges.map(e => ({
            ...e,
            type: e.relationship
          }))
        };
        setGraphData(formattedData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadGraph();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ProcessingAnimation />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col relative">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-nyaya-text">Authority Map</h1>
        <p className="text-nyaya-secondary text-sm">Interactive citation graph. Visualizing treatment of legal principles across cases.</p>
      </div>

      <div className="flex-1 relative rounded-xl overflow-hidden border border-nyaya-border shadow-lg">
        {graphData && graphData.nodes.length > 0 ? (
          <AuthorityGraph 
            data={graphData} 
            onNodeClick={(node) => setSelectedNode(node)} 
          />
        ) : (
          <div className="flex justify-center items-center h-full text-nyaya-secondary bg-nyaya-surface">
            No citation data available in corpus.
          </div>
        )}
        <GraphLegend />

        {selectedNode && (
          <div className="absolute bottom-4 left-4 bg-nyaya-surface border border-nyaya-border rounded-lg p-5 shadow-xl w-80">
            <div className="flex justify-between items-start mb-2">
              <Badge type={selectedNode.level === 'Supreme Court of India' || selectedNode.level === 'Supreme Court' ? 'warning' : 'info'}>
                {selectedNode.level}
              </Badge>
              <button onClick={() => setSelectedNode(null)} className="text-nyaya-secondary hover:text-nyaya-text">×</button>
            </div>
            <h3 className="font-bold text-nyaya-text text-lg mb-1">{selectedNode.name}</h3>
            <div className="text-sm text-nyaya-secondary mb-4">Decided: {selectedNode.year || 'Unknown'}</div>
            
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 bg-nyaya-bg rounded border border-nyaya-border/50">
                <span className="text-nyaya-secondary">Cited By</span>
                <span className="font-bold text-nyaya-text">{graphData.links.filter(l => l.target.id === selectedNode.id || l.target === selectedNode.id).length}</span>
              </div>
              <div className="flex justify-between p-2 bg-nyaya-bg rounded border border-nyaya-border/50">
                <span className="text-nyaya-secondary">Cites</span>
                <span className="font-bold text-nyaya-text">{graphData.links.filter(l => l.source.id === selectedNode.id || l.source === selectedNode.id).length}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <Link href={`/evidence/${selectedNode.id}`} className="block text-center w-full py-2 bg-nyaya-accent/10 hover:bg-nyaya-accent/20 text-nyaya-accent font-medium rounded text-sm transition-colors border border-nyaya-accent/30">
                View Extracted Evidence
              </Link>
              {selectedNode.url && (
                <a href={selectedNode.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-2 bg-nyaya-bg hover:bg-nyaya-border/50 text-nyaya-text font-medium rounded text-sm transition-colors border border-nyaya-border">
                  View Official Judgment <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
