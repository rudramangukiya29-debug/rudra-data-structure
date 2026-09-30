import React, { useState } from 'react';
import { ArrowDown, Zap, ArrowRight, Database, Cpu, HardDrive } from 'lucide-react';

interface HeroProps {
  onBrowseTopics: () => void;
  onOpenArena: () => void;
  onOpenComplexity: () => void;
  onSelectTopic: (topicId: string) => void;
  isDark: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onBrowseTopics,
  onOpenArena,
  onOpenComplexity,
  onSelectTopic,
  isDark,
}) => {
  // Interactive workbench state
  const [selectedArrIdx, setSelectedArrIdx] = useState<number>(2);
  const [stackItems, setStackItems] = useState<number[]>([15, 42, 88]);
  const [queueItems, setQueueItems] = useState<string[]>(['Req #1', 'Req #2', 'Req #3']);
  const [workbenchTab, setWorkbenchTab] = useState<'ram' | 'pointers' | 'lifo'>('ram');

  const arrayCells = [12, 34, 56, 78, 90];
  const baseAddress = 0x1000;

  const pushStackMini = () => {
    if (stackItems.length < 5) {
      setStackItems([...stackItems, Math.floor(Math.random() * 80 + 10)]);
    }
  };

  const popStackMini = () => {
    if (stackItems.length > 1) {
      setStackItems(stackItems.slice(0, -1));
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Copy & CTA */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-2.5 py-1 text-[11px] font-mono font-medium rounded-md border ${
                isDark ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300' : 'border-cyan-200 bg-cyan-50 text-cyan-800'
              }`}>
                DATA STRUCTURE STUDIO
              </span>
              <span className={`px-2.5 py-1 text-[11px] font-mono font-medium rounded-md border ${
                isDark ? 'border-slate-800 bg-slate-900/60 text-slate-400' : 'border-slate-200 bg-slate-100 text-slate-600'
              }`}>
                Visual Learning Hub · C Edition
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15]">
              Visual Data Structures for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-200">
                Modern Learners
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Learn core data structures through visual explanations, guided practice, and simple concept breakdowns.
              Explore memory architecture, step through pointer operations, and understand algorithmic trade-offs with clear visual models built for clarity.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onBrowseTopics}
                className="flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
              >
                <span>Browse Topics Library</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenArena}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold border transition-all cursor-pointer ${
                  isDark
                    ? 'border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-100'
                    : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-900'
                }`}
              >
                <span>Open Practice Arena</span>
                <Zap className="w-4 h-4 text-amber-400" />
              </button>

              <button
                onClick={onOpenComplexity}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                  isDark ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-600 hover:text-cyan-700'
                }`}
              >
                <span>Complexity Matrix</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Key Stats Bar */}
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t ${
              isDark ? 'border-slate-800/80' : 'border-slate-200'
            }`}>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-cyan-400">6</div>
                <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Core Modules</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-cyan-400">30+</div>
                <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Visual Schematics</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-cyan-400">C99</div>
                <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Standard C Code</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-cyan-400">100%</div>
                <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Student Friendly</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Studio Memory Workbench */}
          <div className="lg:col-span-6">
            <div className={`rounded-2xl border p-5 sm:p-6 shadow-2xl relative transition-all ${
              isDark
                ? 'bg-[#0f172a]/95 border-slate-800 shadow-cyan-950/20'
                : 'bg-white border-slate-200 shadow-slate-200'
            }`}>
              {/* Workbench Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/60 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-400">
                    Studio Memory Workbench
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 bg-slate-800/50 px-2 py-1 rounded">
                  <span>Pointers</span>
                  <span>•</span>
                  <span>RAM</span>
                  <span>•</span>
                  <span>Big-O</span>
                </div>
              </div>

              {/* Workbench Grid Cards */}
              <div className="space-y-4">
                {/* 01. Contiguous RAM Block (Array) */}
                <div className={`p-4 rounded-xl border transition-all ${
                  isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between text-xs font-mono mb-2.5">
                    <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                      01. CONTIGUOUS RAM BLOCK (ARRAY)
                    </span>
                    <span className="text-[11px] text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded">
                      • O(1) INSTANT ACCESS
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-2 text-center font-mono">
                    {arrayCells.map((val, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedArrIdx(idx)}
                        className={`p-2 rounded-lg border text-xs transition-all cursor-pointer ${
                          selectedArrIdx === idx
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-sm shadow-cyan-500/20'
                            : isDark
                            ? 'bg-slate-800/80 border-slate-700/60 text-slate-300 hover:border-slate-600'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-[10px] text-slate-400">idx {idx}</div>
                        <div className="text-sm font-bold mt-0.5">{val}</div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-2 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                    <span>Selected: arr[{selectedArrIdx}]</span>
                    <span className="text-cyan-400 font-semibold">
                      RAM Address: 0x{(baseAddress + selectedArrIdx * 4).toString(16).toUpperCase()} [4 bytes]
                    </span>
                  </div>
                </div>

                {/* 02. Pointer Nodes Dynamic & 03. LIFO Container Split */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Linked List Nodes */}
                  <div className={`p-4 rounded-xl border ${
                    isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="font-semibold text-slate-300">02. POINTER NODES</span>
                      <span className="text-[10px] text-slate-400">DYNAMIC</span>
                    </div>

                    <div className="flex items-center justify-center gap-1.5 py-2 font-mono text-xs">
                      <div className="px-2.5 py-1.5 rounded bg-slate-800 border border-slate-700 flex items-center gap-1 text-slate-200">
                        <span className="font-bold text-cyan-400">10</span>
                        <span className="text-slate-500">|</span>
                        <span className="text-[10px] text-teal-400">•-&gt;</span>
                      </div>
                      <span className="text-cyan-400 text-xs">→</span>
                      <div className="px-2.5 py-1.5 rounded bg-slate-800 border border-slate-700 flex items-center gap-1 text-slate-200">
                        <span className="font-bold text-cyan-400">20</span>
                        <span className="text-slate-500">|</span>
                        <span className="text-[10px] text-rose-400">NULL</span>
                      </div>
                    </div>

                    <div className="text-[10px] font-mono text-center text-slate-400 mt-1">
                      Scattered Heap Links O(1) Prepend
                    </div>
                  </div>

                  {/* LIFO Container (Stack) */}
                  <div className={`p-4 rounded-xl border ${
                    isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="font-semibold text-slate-300">03. LIFO CONTAINER</span>
                      <span className="text-[10px] text-amber-400">
                        TOP: {stackItems[stackItems.length - 1]}
                      </span>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-1 font-mono text-xs py-1">
                      {stackItems.slice(-3).reverse().map((item, idx) => (
                        <div
                          key={idx}
                          className={`w-36 py-1 px-2 text-center rounded border transition-all ${
                            idx === 0
                              ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 font-bold'
                              : 'bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          {idx === 0 ? `↑ Top: ${item}` : idx === 1 ? `Mid: ${item}` : `Base: ${item}`}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-center gap-2 mt-2">
                      <button
                        onClick={pushStackMini}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 cursor-pointer"
                      >
                        + Push
                      </button>
                      <button
                        onClick={popStackMini}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 cursor-pointer"
                      >
                        - Pop
                      </button>
                    </div>
                  </div>
                </div>

                {/* 04. FIFO Pipeline & 05. Binary Tree Split */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* FIFO Pipeline (Queue) */}
                  <div className={`p-4 rounded-xl border ${
                    isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="font-semibold text-slate-300">04. FIFO PIPELINE</span>
                      <span className="text-[10px] text-teal-400">FRONT → REAR</span>
                    </div>

                    <div className="flex items-center justify-between py-2 px-2 bg-slate-800/80 rounded-lg border border-slate-700/60 font-mono text-xs">
                      <span className="text-teal-400 text-[11px] font-bold">→ Front</span>
                      <span className="text-slate-400 text-xs">Mid</span>
                      <span className="text-amber-400 text-[11px] font-bold">Rear →</span>
                    </div>

                    <div className="text-[10px] font-mono text-center text-slate-400 mt-2">
                      (rear + 1) % CAPACITY Modulo
                    </div>
                  </div>

                  {/* Binary Tree */}
                  <div className={`p-4 rounded-xl border ${
                    isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="font-semibold text-slate-300">05. BINARY TREE</span>
                      <span className="text-[10px] text-indigo-400">HIERARCHICAL</span>
                    </div>

                    <div className="flex flex-col items-center justify-center font-mono py-1">
                      <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 flex items-center justify-center text-xs font-bold">
                        50
                      </div>
                      <div className="flex items-center justify-center gap-6 mt-1 text-[11px] text-slate-400">
                        <span>/</span>
                        <span>\</span>
                      </div>
                      <div className="flex items-center justify-center gap-6">
                        <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center text-[10px]">
                          25
                        </div>
                        <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center text-[10px]">
                          75
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Workbench Footer Quick Launch */}
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">Click any structure to inspect in depth</span>
                <button
                  onClick={() => onSelectTopic('tree')}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  Explore BST Simulator →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
