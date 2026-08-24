"use client";
import { useEffect, useRef, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

export default function AuthorityGraph({ data, onNodeClick }) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight
      });
    }
  }, []);

  const getNodeColor = (node) => {
    if (node.level === 'Supreme Court') return '#F59E0B'; // nyaya-accent
    if (node.level === 'High Court') return '#38BDF8'; // nyaya-info
    return '#94A3B8'; // nyaya-secondary
  };

  const getLinkColor = (link) => {
    switch (link.type) {
      case 'follows': return '#10B981'; // verified
      case 'distinguishes': return '#F59E0B'; // warning
      case 'overrules': return '#EF4444'; // critical
      case 'cites': default: return '#263548'; // border
    }
  };

  return (
    <div ref={containerRef} className="w-full h-full bg-nyaya-bg rounded-lg border border-nyaya-border overflow-hidden">
      {typeof window !== 'undefined' && (
        <ForceGraph2D
          width={dimensions.width}
          height={dimensions.height}
          graphData={data}
          nodeLabel="name"
          nodeColor={getNodeColor}
          nodeRelSize={6}
          linkColor={getLinkColor}
          linkWidth={2}
          linkDirectionalArrowLength={3.5}
          linkDirectionalArrowRelPos={1}
          onNodeClick={onNodeClick}
          backgroundColor="#08111F"
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.name;
            const fontSize = 12 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.fillStyle = getNodeColor(node);
            ctx.beginPath();
            ctx.arc(node.x, node.y, 4, 0, 2 * Math.PI, false);
            ctx.fill();
            
            // Draw label
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fillText(label, node.x, node.y + 8);
          }}
        />
      )}
    </div>
  );
}
