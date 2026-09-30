import React, { useState } from 'react';
import { Play, RotateCcw, Network, Eye } from 'lucide-react';

interface GraphNode {
  id: number;
  label: string;
  x: number;
  y: number;
}

interface GraphArenaProps {
  isDark: boolean;
}

export const GraphArena: React.FC<GraphArenaProps> = ({ isDark }) => {
  const nodes: GraphNode[] = [
    { id: 0, label: '0 (A)', x: 150, y: 150 },
    { id: 1, label: '1 (B)', x: 300, y: 70 },
    { id: 2, label: '2 (C)', x: 300, y: 230 },
    { id: 3, label: '3 (D)', x: 480, y: 70 },
    { id: 4, label: '4 (E)', x: 480, y: 230 },
    { id: 5, label: '5 (F)', x: 630, y: 150 },
  ];

  // Adjacency edges
  const edges = [
    [0, 1],
    [0, 2],
    [1, 3],
    [1, 2],
    [2, 4],
    [3, 5],
    [4, 5],
    [3, 4],
  ];

  const adjList: Record<number, number[]> = {
    0: [1, 2],
    1: [0, 2, 3],
    2: [0, 1, 4],
    3: [1, 4, 5],
    4: [2, 3, 5],
    5: [3, 4],
  };

  const [startNode, setStartNode] = useState<number>(0);
  const [visitedNodes, setVisitedNodes] = useState<number[]>([]);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [traversalType, setTraversalType] = useState<'bfs' | 'dfs' | null>(null);
  const [isTraversing, setIsTraversing] = useState<boolean>(false);
  const [telemetry, setTelemetry] = useState<string[]>(['Select a traversal method (BFS or DFS).']);
  const [inspectorMode, setInspectorMode] = useState<'list' | 'matrix'>('list');

  // Run BFS
  const runBFS = () => {
    if (isTraversing) return;
    setIsTraversing(true);
    setTraversalType('bfs');
    setVisitedNodes([]);
    setActiveNode(null);

    const visitedSet = new Set<number>();
    const queue: number[] = [startNode];
    visitedSet.add(startNode);

    const visitOrder: number[] = [];

    // Precompute BFS steps
    const qCopy = [...queue];
    const visCopy = new Set(visitedSet);

    while (qCopy.length > 0) {
      const u = qCopy.shift()!;
      visitOrder.push(u);
      const neighbors = adjList[u] || [];
      for (const v of neighbors) {
        if (!visCopy.has(v)) {
          visCopy.add(v);
          qCopy.push(v);
        }
      }
    }

    setTelemetry([`[BFS] Starting Breadth-First Search from vertex ${startNode}...`]);

    let step = 0;
    const interval = setInterval(() => {
      if (step < visitOrder.length) {
        const u = visitOrder[step];
        setActiveNode(u);
        setVisitedNodes((prev) => [...prev, u]);
        setTelemetry((prev) => [
          `BFS: dequeued vertex ${u} (${nodes[u].label}). Explored adjacent layer.`,
          ...prev.slice(0, 9),
        ]);
        step++;
      } else {
        clearInterval(interval);
        setActiveNode(null);
        setIsTraversing(false);
        setTelemetry((prev) => ['✓ BFS Traversal Complete! All connected vertices reached.', ...prev.slice(0, 9)]);
      }
    }, 700);
  };

  // Run DFS
  const runDFS = () => {
    if (isTraversing) return;
    setIsTraversing(true);
    setTraversalType('dfs');
    setVisitedNodes([]);
    setActiveNode(null);

    const visitOrder: number[] = [];
    const vis = new Set<number>();

    const dfsHelper = (u: number) => {
      vis.add(u);
      visitOrder.push(u);
      const neighbors = adjList[u] || [];
      for (const v of neighbors) {
        if (!vis.has(v)) {
          dfsHelper(v);
        }
      }
    };

    dfsHelper(startNode);

    setTelemetry([`[DFS] Starting Depth-First Search from vertex ${startNode}...`]);

    let step = 0;
    const interval = setInterval(() => {
      if (step < visitOrder.length) {
        const u = visitOrder[step];
        setActiveNode(u);
        setVisitedNodes((prev) => [...prev, u]);
        setTelemetry((prev) => [
          `DFS: pushed vertex ${u} (${nodes[u].label}) onto call stack. Descending deeply.`,
          ...prev.slice(0, 9),
        ]);
        step++;
      } else {
        clearInterval(interval);
        setActiveNode(null);
        setIsTraversing(false);
        setTelemetry((prev) => ['✓ DFS Traversal Complete! Call stack backtracked.', ...prev.slice(0, 9)]);
      }
    }, 700);
  };

  const resetGraph = () => {
    setVisitedNodes([]);
    setActiveNode(null);
    setTraversalType(null);
    setIsTraversing(false);
    setTelemetry(['Graph reset. Ready for traversal.']);
  };

  return (
    <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
      isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-md'
    }`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div>
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <span>Graph Traversal & Representation Engine</span>
            <span className="text-[10px] font-mono text-rose-400 border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 rounded">
              BFS (Queue) vs DFS (Stack)
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setInspectorMode('list')}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              inspectorMode === 'list' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400'
            }`}
          >
            Adjacency List O(V+E)
          </button>
          <button
            onClick={() => setInspectorMode('matrix')}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              inspectorMode === 'matrix' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400'
            }`}
          >
            Adjacency Matrix O(V²)
          </button>
        </div>
      </div>

      {/* Control Actions Row */}
      <div className="py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/60">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-slate-400 font-semibold">START VERTEX:</span>
          {nodes.map((n) => (
            <button
              key={n.id}
              onClick={() => setStartNode(n.id)}
              disabled={isTraversing}
              className={`w-8 h-8 rounded-lg border flex items-center justify-center font-bold cursor-pointer transition-all ${
                startNode === n.id
                  ? 'bg-rose-500 text-white border-rose-400 shadow-sm'
                  : 'bg-slate-900 border-slate-700 text-slate-300'
              }`}
            >
              {n.id}
            </button>
          ))}

          <button
            onClick={runBFS}
            disabled={isTraversing}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-slate-950" />
            <span>Run BFS (Queue)</span>
          </button>

          <button
            onClick={runDFS}
            disabled={isTraversing}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-slate-950" />
            <span>Run DFS (Stack)</span>
          </button>
        </div>

        <button
          onClick={resetGraph}
          disabled={isTraversing}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700 text-xs font-mono cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Main Visual Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-6">
        {/* Left: SVG Graph Canvas */}
        <div className="lg:col-span-8 p-4 rounded-xl bg-slate-950 border border-slate-800 relative h-[320px] flex items-center justify-center overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 760 300" preserveAspectRatio="xMidYMid meet">
            {/* Edges */}
            {edges.map(([u, v], i) => {
              const nu = nodes[u];
              const nv = nodes[v];
              const isTraversed = visitedNodes.includes(u) && visitedNodes.includes(v);
              return (
                <line
                  key={`edge-${i}`}
                  x1={nu.x}
                  y1={nu.y}
                  x2={nv.x}
                  y2={nv.y}
                  stroke={isTraversed ? '#f43f5e' : '#334155'}
                  strokeWidth={isTraversed ? '3' : '2'}
                  className="transition-colors duration-500"
                />
              );
            })}

            {/* Vertices */}
            {nodes.map((n) => {
              const isVisited = visitedNodes.includes(n.id);
              const isActive = activeNode === n.id;
              const isStart = startNode === n.id;

              return (
                <g key={`vertex-${n.id}`} className="transition-all duration-300">
                  {/* Active pulsing glow */}
                  {isActive && (
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r="28"
                      className="fill-rose-500/20 stroke-rose-400 stroke-2 animate-pulse"
                    />
                  )}

                  {/* Base Circle */}
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r="22"
                    className={`transition-colors ${
                      isActive
                        ? 'fill-rose-600 stroke-rose-300 stroke-2'
                        : isVisited
                        ? 'fill-teal-600 stroke-teal-300 stroke-2'
                        : isStart
                        ? 'fill-slate-900 stroke-amber-400 stroke-2'
                        : 'fill-slate-900 stroke-slate-700 stroke-1'
                    }`}
                  />

                  {/* Label */}
                  <text
                    x={n.x}
                    y={n.y + 4}
                    textAnchor="middle"
                    className={`font-mono text-xs font-bold pointer-events-none select-none ${
                      isActive || isVisited ? 'fill-white' : 'fill-slate-200'
                    }`}
                  >
                    {n.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Right: Inspector (Adjacency List or Matrix) */}
        <div className="lg:col-span-4 p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs flex flex-col justify-between">
          <div>
            <div className="text-[11px] text-rose-400 font-bold mb-3 flex items-center justify-between">
              <span>{inspectorMode === 'list' ? 'ADJACENCY LIST' : 'ADJACENCY MATRIX'}</span>
              <span className="text-slate-500 text-[10px]">6 Vertices</span>
            </div>

            {inspectorMode === 'list' ? (
              <div className="space-y-1.5 text-xs text-slate-300">
                {nodes.map((n) => (
                  <div
                    key={n.id}
                    className={`p-1.5 rounded flex items-center gap-2 ${
                      activeNode === n.id ? 'bg-rose-500/20 text-rose-300 font-bold' : ''
                    }`}
                  >
                    <span className="text-cyan-400 font-bold">[{n.id}]:</span>
                    <span>→ {adjList[n.id].join(' → ')}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto text-[11px]">
                <table className="w-full text-center">
                  <thead>
                    <tr className="text-cyan-400 border-b border-slate-800">
                      <th className="p-1">#</th>
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <th key={i} className="p-1">{i}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[0, 1, 2, 3, 4, 5].map((r) => (
                      <tr key={r} className="border-b border-slate-900">
                        <td className="p-1 text-cyan-400 font-bold">{r}</td>
                        {[0, 1, 2, 3, 4, 5].map((c) => {
                          const hasEdge = adjList[r]?.includes(c);
                          return (
                            <td
                              key={c}
                              className={`p-1 ${hasEdge ? 'text-teal-300 font-bold' : 'text-slate-600'}`}
                            >
                              {hasEdge ? 1 : 0}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-slate-400">
            Visited Sequence: [{visitedNodes.join(', ')}]
          </div>
        </div>
      </div>

      {/* Execution Telemetry Log */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
        <div className="text-[11px] text-rose-400 font-bold mb-2">GRAPH EXECUTION TELEMETRY</div>
        <div className="space-y-1 max-h-[100px] overflow-y-auto">
          {telemetry.map((t, idx) => (
            <div
              key={idx}
              className={`text-[11px] ${idx === 0 ? 'text-rose-300 font-bold' : 'text-slate-400'}`}
            >
              &gt; {t}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 pt-3 border-t border-slate-800/60 mt-4">
        <div>
          Graph Topology: <span className="text-rose-400 font-bold">6 Vertices · 8 Edges (Undirected)</span>
        </div>
        <div>
          BFS Engine: <span className="text-teal-400 font-bold">O(V + E) Queue Search</span>
        </div>
        <div>
          DFS Engine: <span className="text-amber-400 font-bold">O(V + E) Recursive Call Stack</span>
        </div>
      </div>
    </div>
  );
};
