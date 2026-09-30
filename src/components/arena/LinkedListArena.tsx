import React, { useState } from 'react';
import { Plus, Minus, Search, RotateCcw, ArrowRight } from 'lucide-react';

interface LLNode {
  id: string;
  val: number;
  addr: string;
}

interface LinkedListArenaProps {
  isDark: boolean;
}

export const LinkedListArena: React.FC<LinkedListArenaProps> = ({ isDark }) => {
  const [listType, setListType] = useState<'singly' | 'doubly'>('singly');
  const [nodes, setNodes] = useState<LLNode[]>([
    { id: '1', val: 10, addr: '0x1040' },
    { id: '2', val: 20, addr: '0x1080' },
    { id: '3', val: 30, addr: '0x10C0' },
  ]);
  const [inputVal, setInputVal] = useState<string>('40');
  const [activeScanIdx, setActiveScanIdx] = useState<number | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [log, setLog] = useState<string[]>([
    'Linked list initialized with 3 dynamic nodes in heap memory.',
  ]);

  const generateAddr = () => {
    return '0x' + Math.floor(0x1000 + Math.random() * 0x3000).toString(16).toUpperCase();
  };

  const insertHead = () => {
    const val = parseInt(inputVal);
    if (isNaN(val)) return;

    const newNode: LLNode = {
      id: Date.now().toString(),
      val,
      addr: generateAddr(),
    };

    setNodes([newNode, ...nodes]);
    setLog((prev) => [
      `insertBeginning(${val}): malloc() allocated node at ${newNode.addr}. newNode->next = head; head = newNode; [O(1)]`,
      ...prev.slice(0, 9),
    ]);
    setInputVal(Math.floor(Math.random() * 80 + 10).toString());
  };

  const insertTail = () => {
    const val = parseInt(inputVal);
    if (isNaN(val)) return;

    const newNode: LLNode = {
      id: Date.now().toString(),
      val,
      addr: generateAddr(),
    };

    setNodes([...nodes, newNode]);
    setLog((prev) => [
      `insertEnd(${val}): traversed to tail node, tail->next = ${newNode.addr}. [O(N)]`,
      ...prev.slice(0, 9),
    ]);
    setInputVal(Math.floor(Math.random() * 80 + 10).toString());
  };

  const deleteHead = () => {
    if (nodes.length === 0) return;
    const removed = nodes[0];
    setNodes(nodes.slice(1));
    setLog((prev) => [
      `deleteBeginning(): temp = head; head = head->next; free(${removed.addr}); Memory reclaimed! [O(1)]`,
      ...prev.slice(0, 9),
    ]);
  };

  const deleteTail = () => {
    if (nodes.length === 0) return;
    const removed = nodes[nodes.length - 1];
    setNodes(nodes.slice(0, -1));
    setLog((prev) => [
      `deleteEnd(): traversed to second-to-last node, free(${removed.addr}); tail->next = NULL; [O(N)]`,
      ...prev.slice(0, 9),
    ]);
  };

  const searchKey = () => {
    const target = parseInt(inputVal);
    if (isNaN(target) || isScanning || nodes.length === 0) return;

    setIsScanning(true);
    let cur = 0;
    const interval = setInterval(() => {
      if (cur < nodes.length) {
        setActiveScanIdx(cur);
        setLog((prev) => [
          `Traversal hop: temp = temp->next; inspecting node at ${nodes[cur].addr} with val=${nodes[cur].val}`,
          ...prev.slice(0, 9),
        ]);
        if (nodes[cur].val === target) {
          clearInterval(interval);
          setIsScanning(false);
          setLog((prev) => [
            `✓ Found key ${target} at node index ${cur} (${nodes[cur].addr})!`,
            ...prev.slice(0, 9),
          ]);
          setTimeout(() => setActiveScanIdx(null), 2500);
          return;
        }
        cur++;
      } else {
        clearInterval(interval);
        setIsScanning(false);
        setActiveScanIdx(null);
        setLog((prev) => [`Key ${target} was not found in linked list!`, ...prev.slice(0, 9)]);
      }
    }, 600);
  };

  const resetList = () => {
    setNodes([
      { id: '1', val: 10, addr: '0x1040' },
      { id: '2', val: 20, addr: '0x1080' },
      { id: '3', val: 30, addr: '0x10C0' },
    ]);
    setActiveScanIdx(null);
    setLog(['Linked list reset to standard 3-node chain.']);
  };

  return (
    <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
      isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-md'
    }`}>
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div>
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <span>Dynamic Linked List Pointer Stage</span>
            <span className="text-[10px] font-mono text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 rounded">
              Heap Addresses & Pointer Re-hooking
            </span>
          </h2>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setListType('singly')}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              listType === 'singly' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Singly Linked
          </button>
          <button
            onClick={() => setListType('doubly')}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              listType === 'doubly' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Doubly Linked (Bidirectional)
          </button>
        </div>
      </div>

      {/* Control Actions Row */}
      <div className="py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/60">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-slate-400 font-semibold">VALUE:</span>
          <input
            type="number"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={isScanning}
            className="w-20 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-400 text-center"
          />
          <button
            onClick={insertHead}
            disabled={isScanning}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Insert Head O(1)</span>
          </button>
          <button
            onClick={insertTail}
            disabled={isScanning}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold cursor-pointer disabled:opacity-50"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Insert Tail</span>
          </button>
          <button
            onClick={deleteHead}
            disabled={isScanning || nodes.length === 0}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-semibold cursor-pointer disabled:opacity-50"
          >
            <Minus className="w-3.5 h-3.5" />
            <span>Delete Head</span>
          </button>
          <button
            onClick={deleteTail}
            disabled={isScanning || nodes.length === 0}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs cursor-pointer disabled:opacity-50"
          >
            <Minus className="w-3.5 h-3.5" />
            <span>Delete Tail</span>
          </button>
          <button
            onClick={searchKey}
            disabled={isScanning || nodes.length === 0}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold cursor-pointer disabled:opacity-50"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span>Search Key</span>
          </button>
        </div>

        <button
          onClick={resetList}
          disabled={isScanning}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700 text-xs font-mono cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Linked List Canvas */}
      <div className="my-6 p-6 rounded-xl bg-slate-950 border border-slate-800 font-mono overflow-x-auto">
        <div className="text-[11px] text-slate-400 text-center mb-6 uppercase tracking-wider">
          HEAP ALLOCATED POINTER CHAIN (MALLOC / FREE)
        </div>

        <div className="flex items-center justify-start sm:justify-center gap-3 min-w-max py-4">
          <div className="px-3 py-1.5 rounded bg-teal-500/20 border border-teal-500/40 text-teal-300 font-bold text-xs">
            HEAD →
          </div>

          {nodes.length === 0 ? (
            <div className="px-4 py-2 rounded bg-rose-950/30 border border-rose-800 text-rose-300 text-xs font-bold">
              NULL (Empty List)
            </div>
          ) : (
            nodes.map((node, idx) => {
              const isScan = activeScanIdx === idx;
              const nextAddr = idx < nodes.length - 1 ? nodes[idx + 1].addr : 'NULL';
              const prevAddr = idx > 0 ? nodes[idx - 1].addr : 'NULL';

              return (
                <React.Fragment key={node.id}>
                  {/* Node block */}
                  <div
                    className={`rounded-xl border flex flex-col items-center transition-all ${
                      isScan
                        ? 'bg-cyan-500/25 border-cyan-400 scale-105 shadow-lg shadow-cyan-500/30'
                        : 'bg-slate-900 border-slate-700'
                    }`}
                  >
                    {/* Heap Address Tag */}
                    <div className="w-full text-center py-1 text-[9px] text-slate-400 bg-slate-950/70 border-b border-slate-800 rounded-t-xl">
                      {node.addr}
                    </div>

                    {/* Node Interior */}
                    <div className="flex items-stretch text-xs">
                      {listType === 'doubly' && (
                        <div className="px-2 py-3 bg-slate-950/40 text-[10px] text-rose-300 border-r border-slate-800">
                          {prevAddr === 'NULL' ? 'NULL' : 'prev'}
                        </div>
                      )}
                      <div className="px-4 py-3 font-bold text-cyan-300 text-sm">
                        {node.val}
                      </div>
                      <div className="px-2 py-3 bg-slate-950/40 text-[10px] text-teal-300 border-l border-slate-800">
                        {nextAddr === 'NULL' ? 'NULL' : 'next'}
                      </div>
                    </div>

                    {isScan && (
                      <div className="w-full text-center py-0.5 text-[9px] bg-cyan-400 text-slate-950 font-bold rounded-b-xl animate-pulse">
                        TEMP CURSOR
                      </div>
                    )}
                  </div>

                  {/* Pointer arrow between nodes */}
                  {idx < nodes.length - 1 ? (
                    <div className="text-cyan-400 text-sm font-bold flex items-center px-1">
                      {listType === 'doubly' ? '↔' : '→'}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs text-rose-400 font-bold pl-1">
                      <span>→</span>
                      <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-rose-400 text-[10px]">
                        NULL
                      </span>
                    </div>
                  )}
                </React.Fragment>
              );
            })
          )}
        </div>
      </div>

      {/* Execution Log */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
        <div className="text-[11px] text-cyan-400 font-bold mb-2">POINTER RE-HOOKING EXECUTION LOG</div>
        <div className="space-y-1 max-h-[120px] overflow-y-auto">
          {log.map((entry, idx) => (
            <div
              key={idx}
              className={`text-[11px] ${idx === 0 ? 'text-cyan-300 font-bold' : 'text-slate-400'}`}
            >
              &gt; {entry}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 pt-3 border-t border-slate-800/60 mt-4">
        <div>
          Total Nodes: <span className="text-cyan-400 font-bold">{nodes.length}</span>
        </div>
        <div>
          Node Overhead: <span className="text-teal-400 font-bold">{listType === 'doubly' ? '24 bytes (Data + 2 Ptrs)' : '16 bytes (Data + 1 Ptr)'}</span>
        </div>
        <div>
          Access Mode: <span className="text-amber-400 font-bold">Sequential O(N) Traversal</span>
        </div>
      </div>
    </div>
  );
};
