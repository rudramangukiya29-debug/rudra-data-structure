import React, { useState, useEffect } from 'react';
import { RotateCcw, Search, Plus, Play, Pause } from 'lucide-react';

interface TreeNodeData {
  val: number;
  left: TreeNodeData | null;
  right: TreeNodeData | null;
  x?: number;
  y?: number;
}

interface TreeArenaProps {
  isDark: boolean;
}

export const TreeArena: React.FC<TreeArenaProps> = ({ isDark }) => {
  // Default tree matching Screenshot 11:
  // Root: 50 -> Left: 30 (20, 40), Right: 70 (60, 80)
  const initialTree: TreeNodeData = {
    val: 50,
    left: {
      val: 30,
      left: { val: 20, left: null, right: null },
      right: { val: 40, left: null, right: null },
    },
    right: {
      val: 70,
      left: { val: 60, left: null, right: null },
      right: { val: 80, left: null, right: null },
    },
  };

  const [root, setRoot] = useState<TreeNodeData | null>(initialTree);
  const [nodeInput, setNodeInput] = useState<string>('45');
  const [searchInput, setSearchInput] = useState<string>('');
  const [speed, setSpeed] = useState<number>(600); // ms per step
  const [activeNodeVal, setActiveNodeVal] = useState<number | null>(null);
  const [foundNodeVal, setFoundNodeVal] = useState<number | null>(null);
  const [traversalStream, setTraversalStream] = useState<number[]>([]);
  const [traversalType, setTraversalType] = useState<string>('Ready - Select a traversal button above');
  const [isTraversing, setIsTraversing] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('Ready');

  // Insert BST logic
  const insertNode = () => {
    const val = parseInt(nodeInput);
    if (isNaN(val)) return;

    const insertHelper = (node: TreeNodeData | null, v: number): TreeNodeData => {
      if (!node) return { val: v, left: null, right: null };
      if (v < node.val) {
        return { ...node, left: insertHelper(node.left, v) };
      } else if (v > node.val) {
        return { ...node, right: insertHelper(node.right, v) };
      }
      return node; // Duplicate ignored
    };

    setRoot((prev) => insertHelper(prev, val));
    setStatusMessage(`Inserted node ${val}`);
    setNodeInput(Math.floor(Math.random() * 90 + 10).toString());
  };

  const resetTree = () => {
    setRoot(initialTree);
    setActiveNodeVal(null);
    setFoundNodeVal(null);
    setTraversalStream([]);
    setTraversalType('Ready - Select a traversal button above');
    setStatusMessage('Tree reset to standard 7-node BST');
  };

  // Traversal order generators
  const getInOrder = (node: TreeNodeData | null, acc: number[] = []): number[] => {
    if (!node) return acc;
    getInOrder(node.left, acc);
    acc.push(node.val);
    getInOrder(node.right, acc);
    return acc;
  };

  const getPreOrder = (node: TreeNodeData | null, acc: number[] = []): number[] => {
    if (!node) return acc;
    acc.push(node.val);
    getPreOrder(node.left, acc);
    getPreOrder(node.right, acc);
    return acc;
  };

  const getPostOrder = (node: TreeNodeData | null, acc: number[] = []): number[] => {
    if (!node) return acc;
    getPostOrder(node.left, acc);
    getPostOrder(node.right, acc);
    acc.push(node.val);
    return acc;
  };

  const getLevelOrder = (r: TreeNodeData | null): number[] => {
    if (!r) return [];
    const queue: TreeNodeData[] = [r];
    const res: number[] = [];
    while (queue.length > 0) {
      const cur = queue.shift()!;
      res.push(cur.val);
      if (cur.left) queue.push(cur.left);
      if (cur.right) queue.push(cur.right);
    }
    return res;
  };

  // Run animated traversal
  const runTraversal = (type: 'in' | 'pre' | 'post' | 'level') => {
    if (isTraversing || !root) return;
    setIsTraversing(true);
    setFoundNodeVal(null);
    setTraversalStream([]);

    let order: number[] = [];
    let label = '';
    if (type === 'in') {
      order = getInOrder(root);
      label = 'In-Order Traversal (Sorted Ascending)';
    } else if (type === 'pre') {
      order = getPreOrder(root);
      label = 'Pre-Order Traversal (Root First)';
    } else if (type === 'post') {
      order = getPostOrder(root);
      label = 'Post-Order Traversal (Bottom-Up)';
    } else {
      order = getLevelOrder(root);
      label = 'Level-Order Traversal (Breadth-First)';
    }

    setTraversalType(label);
    setStatusMessage(`Running ${label}...`);

    let step = 0;
    const interval = setInterval(() => {
      if (step < order.length) {
        const val = order[step];
        setActiveNodeVal(val);
        setTraversalStream((prev) => [...prev, val]);
        step++;
      } else {
        clearInterval(interval);
        setActiveNodeVal(null);
        setIsTraversing(false);
        setStatusMessage(`Completed ${label}`);
      }
    }, speed);
  };

  // Search Key
  const handleSearchKey = () => {
    const target = parseInt(nodeInput);
    if (isNaN(target) || !root || isTraversing) return;

    setIsTraversing(true);
    setFoundNodeVal(null);
    setTraversalStream([]);
    setTraversalType(`Searching for key ${target}...`);

    const path: number[] = [];
    let cur: TreeNodeData | null = root;
    let found = false;

    while (cur) {
      path.push(cur.val);
      if (cur.val === target) {
        found = true;
        break;
      } else if (target < cur.val) {
        cur = cur.left;
      } else {
        cur = cur.right;
      }
    }

    let step = 0;
    const interval = setInterval(() => {
      if (step < path.length) {
        const val = path[step];
        setActiveNodeVal(val);
        setTraversalStream((prev) => [...prev, val]);
        step++;
      } else {
        clearInterval(interval);
        setIsTraversing(false);
        if (found) {
          setFoundNodeVal(target);
          setStatusMessage(`Found key ${target} in ${path.length} comparisons!`);
        } else {
          setActiveNodeVal(null);
          setStatusMessage(`Key ${target} not found in BST`);
        }
      }
    }, speed);
  };

  // Compute node count and height
  const countNodes = (n: TreeNodeData | null): number => {
    if (!n) return 0;
    return 1 + countNodes(n.left) + countNodes(n.right);
  };

  const getHeight = (n: TreeNodeData | null): number => {
    if (!n) return 0;
    return 1 + Math.max(getHeight(n.left), getHeight(n.right));
  };

  const totalNodes = countNodes(root);
  const treeHeight = getHeight(root);

  // Layout coordinates calculation for rendering
  interface RenderNode {
    val: number;
    x: number;
    y: number;
    parentX?: number;
    parentY?: number;
  }

  const computeLayout = (): RenderNode[] => {
    if (!root) return [];
    const list: RenderNode[] = [];

    const traverse = (node: TreeNodeData, x: number, y: number, offset: number, px?: number, py?: number) => {
      list.push({ val: node.val, x, y, parentX: px, parentY: py });
      if (node.left) {
        traverse(node.left, x - offset, y + 80, offset / 2, x, y);
      }
      if (node.right) {
        traverse(node.right, x + offset, y + 80, offset / 2, x, y);
      }
    };

    traverse(root, 400, 50, 160);
    return list;
  };

  const renderNodes = computeLayout();

  return (
    <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
      isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-md'
    }`}>
      {/* Header bar matching Screenshot 11 */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div>
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <span>Hierarchical Binary Search Tree Stage</span>
            <span className="text-[10px] font-mono text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 rounded">
              BST Traversal & Search Engine
            </span>
          </h2>
        </div>

        {/* Speed Slider */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>SPEED</span>
          <input
            type="range"
            min="200"
            max="1200"
            step="100"
            value={1400 - speed}
            onChange={(e) => setSpeed(1400 - parseInt(e.target.value))}
            className="w-24 accent-cyan-400 cursor-pointer"
          />
        </div>
      </div>

      {/* Control Actions Row (Screenshot 11) */}
      <div className="py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/60">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-slate-400 font-semibold">NODE VALUE:</span>
          <input
            type="number"
            value={nodeInput}
            onChange={(e) => setNodeInput(e.target.value)}
            disabled={isTraversing}
            className="w-20 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-400 text-center"
          />
          <button
            onClick={insertNode}
            disabled={isTraversing}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Insert Node</span>
          </button>
          <button
            onClick={handleSearchKey}
            disabled={isTraversing}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span>Search Key</span>
          </button>
        </div>

        <button
          onClick={resetTree}
          disabled={isTraversing}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700 text-xs font-mono cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Tree</span>
        </button>
      </div>

      {/* Traversals Row */}
      <div className="py-3 flex flex-wrap items-center gap-2 border-b border-slate-800/60 text-xs font-mono">
        <span className="text-slate-400 font-semibold">TRAVERSALS:</span>
        <button
          onClick={() => runTraversal('in')}
          disabled={isTraversing}
          className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-500/50 transition-all cursor-pointer disabled:opacity-50"
        >
          ▶ In-Order (Sorted)
        </button>
        <button
          onClick={() => runTraversal('pre')}
          disabled={isTraversing}
          className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-500/50 transition-all cursor-pointer disabled:opacity-50"
        >
          ▶ Pre-Order (Root First)
        </button>
        <button
          onClick={() => runTraversal('post')}
          disabled={isTraversing}
          className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-500/50 transition-all cursor-pointer disabled:opacity-50"
        >
          ▶ Post-Order (Bottom Up)
        </button>
        <button
          onClick={() => runTraversal('level')}
          disabled={isTraversing}
          className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-500/50 transition-all cursor-pointer disabled:opacity-50"
        >
          ▶ Level-Order (BFS)
        </button>
      </div>

      {/* Interactive Visual Tree Canvas (Screenshot 11) */}
      <div className="relative my-6 w-full h-[320px] rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="xMidYMid meet">
          {/* Render connecting edges */}
          {renderNodes.map((n, i) => {
            if (n.parentX !== undefined && n.parentY !== undefined) {
              return (
                <line
                  key={`line-${i}`}
                  x1={n.parentX}
                  y1={n.parentY}
                  x2={n.x}
                  y2={n.y}
                  stroke="#334155"
                  strokeWidth="2"
                />
              );
            }
            return null;
          })}

          {/* Render circular nodes */}
          {renderNodes.map((n, i) => {
            const isActive = activeNodeVal === n.val;
            const isFound = foundNodeVal === n.val;
            return (
              <g key={`node-${i}`} className="transition-all duration-300">
                {/* Active glow halo */}
                {isActive && (
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r="26"
                    className="fill-cyan-500/20 stroke-cyan-400 stroke-2 animate-pulse"
                  />
                )}
                {/* Found halo */}
                {isFound && (
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r="26"
                    className="fill-teal-500/30 stroke-teal-400 stroke-2"
                  />
                )}
                {/* Base circle */}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="20"
                  className={`transition-colors ${
                    isFound
                      ? 'fill-teal-600 stroke-teal-300 stroke-2'
                      : isActive
                      ? 'fill-cyan-600 stroke-cyan-300 stroke-2'
                      : 'fill-slate-900 stroke-slate-700 stroke-1'
                  }`}
                />
                {/* Value text */}
                <text
                  x={n.x}
                  y={n.y + 5}
                  textAnchor="middle"
                  className={`font-mono text-xs font-bold pointer-events-none select-none ${
                    isActive || isFound ? 'fill-white' : 'fill-slate-200'
                  }`}
                >
                  {n.val}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Traversal Stream Log (Screenshot 11) */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs mb-4">
        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
          TRAVERSAL STREAM:
        </div>
        <div className="flex flex-wrap items-center gap-1.5 text-cyan-400 min-h-[24px]">
          {traversalStream.length === 0 ? (
            <span className="text-slate-500">{traversalType}</span>
          ) : (
            traversalStream.map((v, i) => (
              <React.Fragment key={i}>
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold">
                  {v}
                </span>
                {i < traversalStream.length - 1 && <span className="text-slate-600">→</span>}
              </React.Fragment>
            ))
          )}
        </div>
      </div>

      {/* Footer Metrics & Status Bar (Screenshot 11) */}
      <div className="flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 pt-3 border-t border-slate-800/60">
        <div className="flex items-center gap-4">
          <span>
            Total Nodes: <span className="text-cyan-400 font-bold">{totalNodes} Nodes</span>
          </span>
          <span>
            Tree Height: <span className="text-teal-400 font-bold">Height: {treeHeight}</span>
          </span>
        </div>
        <div>
          Status: <span className="text-cyan-400 font-bold">{statusMessage}</span>
        </div>
      </div>
    </div>
  );
};
