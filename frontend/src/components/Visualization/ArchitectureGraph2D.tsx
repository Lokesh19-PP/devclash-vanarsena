import { useMemo } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap,
  MarkerType,
  Handle,
  Position,
  Panel,
  type Node,
  type Edge
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FileCode2, FolderOpen, MousePointer2, ZoomIn, Info, Share2 } from 'lucide-react';

interface NodeData {
  id: string;
  label: string;
  role: string;
  position: [number, number, number];
  type?: 'file' | 'dir';
  color?: string;
  summary?: string;
}

interface EdgeData {
  id: string;
  source: string;
  target: string;
  type?: string;
}

// Enhanced "Big Box" Node Design
const CustomNode = ({ data, selected }: { data: any, selected: boolean }) => {
  const isDir = data.type === 'dir';
  const color = data.color || '#6366f1';
  
  return (
    <motion.div 
      animate={{ 
        scale: selected ? 1.2 : 1,
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      }}
      className={`relative group ${selected ? 'z-50' : 'z-10'}`}
    >
      <div className={`
        relative px-6 py-5 rounded-[24px] border backdrop-blur-2xl transition-all duration-500
        ${selected 
          ? 'bg-accent/30 border-accent shadow-[0_0_50px_rgba(99,102,241,0.4)]' 
          : 'bg-[#0f111a]/90 border-white/10 hover:border-white/30 shadow-2xl'}
      `}
      style={{ 
        width: selected ? '240px' : '200px',
        minHeight: '80px'
      }}>
        
        <Handle type="target" position={Position.Top} className="!bg-accent !w-3 !h-3 !border-none !-top-1.5" />
        
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-2xl ${isDir ? 'bg-amber-500/20 text-amber-500' : 'bg-accent/20 text-accent'}`}>
              {isDir ? <FolderOpen size={20} /> : <FileCode2 size={20} />}
            </div>
            <div className="flex flex-col overflow-hidden pt-1">
              <span className="text-sm font-black text-white leading-none mb-1.5 truncate">
                {data.label}
              </span>
              <div className="flex items-center gap-2">
                <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-tighter ${isDir ? 'bg-amber-500/10 text-amber-500' : 'bg-accent/10 text-accent'}`}>
                    {isDir ? 'Package' : data.role || 'Module'}
                </span>
                {selected && (
                    <span className="text-[9px] text-white/40 font-medium">Active Node</span>
                )}
              </div>
            </div>
          </div>
          
          <AnimatePresence>
            {selected && data.summary && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="text-[10px] text-white/60 leading-relaxed border-t border-white/5 pt-3 mt-1">
                  {data.summary}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Handle type="source" position={Position.Bottom} className="!bg-accent !w-3 !h-3 !border-none !-bottom-1.5" />
        
        {/* Glow behind the box */}
        {selected && (
          <div className="absolute inset-0 rounded-[24px] -z-10 animate-pulse bg-accent/20 blur-3xl" />
        )}
      </div>

      {/* Outer focus ring */}
      <div className={`absolute -inset-2 rounded-[32px] border-2 border-accent/0 transition-all duration-700 ${selected ? 'border-accent/30 scale-105' : ''}`} />
    </motion.div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export default function ArchitectureGraph2D({ 
  nodes, 
  edges, 
  selectedId, 
  onSelect 
}: { 
  nodes: NodeData[]; 
  edges: EdgeData[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const rfData = useMemo(() => {
    // Determine neighbor set for focus mode
    const neighbors = new Set<string>();
    if (selectedId) {
        neighbors.add(selectedId);
        edges.forEach(e => {
            if (e.source === selectedId) neighbors.add(e.target);
            if (e.target === selectedId) neighbors.add(e.source);
        });
    }

    const flowNodes: Node[] = nodes.map(n => {
      const isNeighbor = neighbors.has(n.id);
      const isFocused = !!selectedId;
      
      return {
        id: n.id,
        type: 'custom',
        // Increased scaling for the "Bigger Box" feel
        position: { x: n.position[0] * 250, y: n.position[2] * 250 },
        data: { 
          label: n.label, 
          role: n.role, 
          type: n.type,
          color: n.color,
          summary: n.summary
        },
        selected: n.id === selectedId,
        // Visual dimming for non-related nodes
        style: { 
            opacity: isFocused && !isNeighbor ? 0.15 : 1,
            transition: 'opacity 0.5s ease',
            pointerEvents: isFocused && !isNeighbor ? 'none' : 'all'
        }
      };
    });

    const flowEdges: Edge[] = edges.map(e => {
      const isRelated = e.source === selectedId || e.target === selectedId;
      const isFocused = !!selectedId;

      return {
        id: e.id,
        source: e.source,
        target: e.target,
        type: 'bezier',
        animated: isRelated,
        style: { 
          stroke: isRelated ? '#6366f1' : 'rgba(255,255,255,0.05)',
          strokeWidth: isRelated ? 4 : 1.5,
          opacity: isFocused && !isRelated ? 0.1 : 1,
          transition: 'all 0.5s ease'
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: isRelated ? '#6366f1' : 'rgba(255,255,255,0.1)',
        },
      };
    });

    return { nodes: flowNodes, edges: flowEdges };
  }, [nodes, edges, selectedId]);

  return (
    <div className="w-full h-full bg-[#020204]">
      <ReactFlow
        nodes={rfData.nodes}
        edges={rfData.edges}
        onNodeClick={(_, node) => onSelect(node.id)}
        onPaneClick={() => onSelect(null)}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3, duration: 800 }}
        className="architecture-flow"
        minZoom={0.05}
        maxZoom={1.5}
      >
        <Background color="#1a1a1a" gap={40} size={1} />
        
        <Panel position="top-left" className="m-6">
            <div className="flex flex-col gap-2">
                <h2 className="text-xl font-black text-white/90 tracking-tighter flex items-center gap-2">
                    <Share2 size={24} className="text-accent" />
                    2D TOPOLOGY
                </h2>
                <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">
                    System Dependency Map
                </p>
            </div>
        </Panel>

        <Panel position="bottom-center" className="mb-8">
            <div className="bg-[#0f111a]/80 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-8 text-white/40 text-[11px] font-bold shadow-2xl">
                <div className="flex items-center gap-3">
                    <MousePointer2 size={14} className="text-accent" />
                    <span>Select Node to Focus Neighbors</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-3">
                    <Info size={14} className="text-sky-400" />
                    <span>Double Click to Reset Zoom</span>
                </div>
            </div>
        </Panel>

        <Controls 
            showInteractive={false} 
            className="!bg-[#0f111a]/90 !border-white/10 !rounded-2xl !p-1 !shadow-2xl" 
        />
        
        <MiniMap 
            nodeColor={(n: any) => n.data.type === 'dir' ? '#f59e0b' : '#6366f1'} 
            maskColor="rgba(0, 0, 0, 0.85)"
            className="!bg-black/40 !border-white/10 !rounded-2xl !backdrop-blur-md"
            nodeStrokeWidth={0}
            zoomable
            pannable
        />
      </ReactFlow>

      <style>{`
        .react-flow__handle { width: 6px; height: 6px; background: #6366f1 !important; border: 2px solid #000 !important; }
        .react-flow__edge-path { stroke-dasharray: 5; stroke-dashoffset: 10; animation: dash 2s linear infinite; }
        @keyframes dash { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }
        .react-flow__controls-button { border-bottom: 1px solid rgba(255,255,255,0.05) !important; color: white !important; fill: white !important; height: 32px !important; width: 32px !important; }
        .react-flow__attribution { display: none; }
      `}</style>
    </div>
  );
}
