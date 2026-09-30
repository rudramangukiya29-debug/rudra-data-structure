import React, { useState } from 'react';
import { TOPICS } from '../data/topics';
import { TopicId } from '../types';
import {
  ArrowLeft,
  Check,
  Copy,
  AlertTriangle,
  Play,
  RotateCcw,
  BookOpen,
  Code,
  HelpCircle,
  Cpu,
  Layers,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

interface TopicDetailProps {
  topicId: TopicId;
  onBack: () => void;
  onOpenArenaForTopic: (topicId: TopicId) => void;
  isDark: boolean;
}

export const TopicDetail: React.FC<TopicDetailProps> = ({
  topicId,
  onBack,
  onOpenArenaForTopic,
  isDark,
}) => {
  const topic = TOPICS[topicId] || TOPICS.stack;
  const [activeTab, setActiveTab] = useState<'core' | 'schematics' | 'operations' | 'code' | 'quiz'>('core');
  const [copiedCodeIdx, setCopiedCodeIdx] = useState<number | null>(null);

  // Quiz state
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const handleCopyCode = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeIdx(idx);
    setTimeout(() => setCopiedCodeIdx(null), 2000);
  };

  const handleAnswer = (optionIdx: number) => {
    if (hasAnswered) return;
    setSelectedOption(optionIdx);
    setHasAnswered(true);
    if (optionIdx === topic.quiz[currentQuizIdx].correctAnswer) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizIdx < topic.quiz.length - 1) {
      setCurrentQuizIdx((prev) => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuizIdx(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setQuizScore(0);
    setQuizFinished(false);
  };

  return (
    <div className={`min-h-screen pb-24 ${isDark ? 'bg-[#0b0f19] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Sub Header Navigation */}
      <div className={`sticky top-16 z-40 border-b backdrop-blur-md transition-colors ${
        isDark ? 'bg-[#0f172a]/95 border-slate-800' : 'bg-white/95 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                isDark
                  ? 'border-slate-800 hover:border-slate-700 text-slate-300 hover:bg-slate-800'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Topics</span>
            </button>
            <div className="h-4 w-px bg-slate-700/60 hidden sm:block" />
            <span className="text-xs font-mono text-cyan-400 font-bold hidden sm:inline">
              {topic.name.toUpperCase()} MODULE
            </span>
          </div>

          {/* Module Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto py-1 text-xs font-medium">
            <button
              onClick={() => setActiveTab('core')}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'core'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : isDark
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Concept Core
            </button>
            <button
              onClick={() => setActiveTab('schematics')}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'schematics'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : isDark
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Visual Schematics
            </button>
            <button
              onClick={() => setActiveTab('operations')}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'operations'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : isDark
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Operations & Flows
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'code'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : isDark
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              C Code & Pitfalls
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : isDark
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Knowledge Check ({topic.quiz.length})
            </button>
          </div>

          <button
            onClick={() => onOpenArenaForTopic(topicId)}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-sm cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-slate-950" />
            <span>Launch Arena</span>
          </button>
        </div>
      </div>

      {/* Main Module Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Module Header Hero */}
        <div className={`p-6 sm:p-8 rounded-2xl border mb-8 ${
          isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2.5 py-1 text-[11px] font-mono font-medium rounded border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
              {topic.category.toUpperCase()}
            </span>
            <span className="px-2.5 py-1 text-[11px] font-mono font-medium rounded border border-slate-700 bg-slate-800 text-slate-300">
              {topic.level.toUpperCase()} LEVEL
            </span>
            <span className="px-2.5 py-1 text-[11px] font-mono font-medium rounded border border-teal-500/30 bg-teal-500/10 text-teal-300">
              {topic.memoryModel.toUpperCase()}
            </span>
            <span className="text-xs text-slate-400 ml-auto font-mono">
              {topic.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-3">
            What is a <span className="text-cyan-400">{topic.name}</span>?
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {topic.summary}
          </p>
        </div>

        {/* TAB 1: CORE ARCHITECTURE & ANALOGY */}
        {activeTab === 'core' && (
          <div className="space-y-8">
            {/* Analogy Card */}
            <div className={`p-6 sm:p-7 rounded-2xl border ${
              isDark ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-[#101b2f] border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold mb-2">
                <BookOpen className="w-4 h-4" />
                <span>INTUITIVE MENTAL MODEL ANALOGY</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight mb-3">
                {topic.analogy.title}
              </h3>
              <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {topic.analogy.description}
              </p>
            </div>

            {/* Core Characteristics */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight">Key Architectural Invariants</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {topic.characteristics.map((char, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-xl border flex flex-col justify-between ${
                      isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                    }`}
                  >
                    <div>
                      {char.badge && (
                        <span className="inline-block text-[10px] font-mono text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 rounded mb-3 font-semibold">
                          {char.badge}
                        </span>
                      )}
                      <h4 className="text-base font-bold mb-2">{char.title}</h4>
                      <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {char.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* C Struct Definition */}
            <div className={`p-6 rounded-2xl border ${
              isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-bold">Standard C Memory Struct Definition</span>
                </div>
                <button
                  onClick={() => handleCopyCode(topic.cStruct, 99)}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  {copiedCodeIdx === 99 ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCodeIdx === 99 ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800/80 leading-relaxed">
                <code>{topic.cStruct}</code>
              </pre>
            </div>
          </div>
        )}

        {/* TAB 2: VISUAL SCHEMATICS & TYPES */}
        {activeTab === 'schematics' && (
          <div className="space-y-8">
            {topicId === 'linked-list' && (
              <div className="space-y-6">
                {/* Singly Linked List schematic (Screenshot 6) */}
                <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">1. Singly Linked List (Unidirectional)</h3>
                    <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">Foundation</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-4">
                    The simplest linear pointer chain: forward navigation only via <code className="text-cyan-300">next</code> pointer.
                  </p>

                  <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs flex flex-wrap items-center justify-center gap-2">
                    <span className="text-teal-400 font-bold">HEAD →</span>
                    <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-slate-900">
                      <span className="px-3 py-2 text-cyan-300 font-bold bg-slate-800/80">10</span>
                      <span className="px-2 py-2 text-slate-400 border-l border-slate-700 text-[10px]">next →</span>
                    </div>
                    <span className="text-cyan-400">→</span>
                    <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-slate-900">
                      <span className="px-3 py-2 text-cyan-300 font-bold bg-slate-800/80">20</span>
                      <span className="px-2 py-2 text-slate-400 border-l border-slate-700 text-[10px]">next →</span>
                    </div>
                    <span className="text-cyan-400">→</span>
                    <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-slate-900">
                      <span className="px-3 py-2 text-cyan-300 font-bold bg-slate-800/80">30</span>
                      <span className="px-2 py-2 text-rose-400 border-l border-slate-700 text-[10px] font-bold">NULL</span>
                    </div>
                  </div>
                </div>

                {/* Doubly Linked List schematic (Screenshot 6) */}
                <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">2. Doubly Linked List (Bidirectional)</h3>
                    <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">Bidirectional</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-4">
                    Two-way navigation with <code className="text-cyan-300">prev</code> and <code className="text-cyan-300">next</code> pointers per node.
                  </p>

                  <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs flex flex-wrap items-center justify-center gap-2">
                    <span className="text-rose-400 text-[10px] font-bold">NULL ←</span>
                    <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-slate-900 text-[10px]">
                      <span className="px-1.5 py-2 text-rose-400">NULL</span>
                      <span className="px-2 py-2 text-cyan-300 font-bold border-x border-slate-700 text-xs">10</span>
                      <span className="px-1.5 py-2 text-teal-400">→</span>
                    </div>
                    <span className="text-cyan-400 text-xs">↔</span>
                    <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-slate-900 text-[10px]">
                      <span className="px-1.5 py-2 text-teal-400">←</span>
                      <span className="px-2 py-2 text-cyan-300 font-bold border-x border-slate-700 text-xs">20</span>
                      <span className="px-1.5 py-2 text-teal-400">→</span>
                    </div>
                    <span className="text-cyan-400 text-xs">↔</span>
                    <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-slate-900 text-[10px]">
                      <span className="px-1.5 py-2 text-teal-400">←</span>
                      <span className="px-2 py-2 text-cyan-300 font-bold border-x border-slate-700 text-xs">30</span>
                      <span className="px-1.5 py-2 text-rose-400">NULL</span>
                    </div>
                    <span className="text-rose-400 text-[10px] font-bold">→ NULL</span>
                  </div>
                </div>
              </div>
            )}

            {topicId === 'tree' && (
              <div className="space-y-6">
                {/* Tree Anatomy (Screenshot 12) */}
                <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'}`}>
                  <h3 className="text-xl font-bold mb-4">Tree Structural Anatomy & Terminology</h3>
                  <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 font-mono text-center flex flex-col items-center">
                    <div className="text-[11px] text-teal-400 font-bold mb-1">ROOT (Ancestral Apex)</div>
                    <div className="w-9 h-9 rounded-full bg-cyan-500/20 border-2 border-cyan-400 text-cyan-300 flex items-center justify-center font-bold text-sm">
                      A
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">Depth = 0 · Degree = 2</div>

                    <div className="w-48 h-8 flex justify-between px-10 text-slate-500 text-sm mt-1">
                      <span>/</span>
                      <span className="text-[10px] text-amber-400 italic">Siblings (Shared A)</span>
                      <span>\</span>
                    </div>

                    <div className="flex items-center gap-20">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-400 text-indigo-300 flex items-center justify-center text-xs font-bold">
                          B
                        </div>
                        <div className="text-[10px] text-slate-400">Internal Node</div>
                        <div className="flex gap-6 text-slate-500 text-xs mt-1">
                          <span>/</span>
                          <span>\</span>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 flex items-center justify-center text-[11px] font-bold">
                            D
                          </div>
                          <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 flex items-center justify-center text-[11px] font-bold">
                            E
                          </div>
                        </div>
                        <div className="text-[9px] text-emerald-400 mt-1">Leaves (Terminal)</div>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-400 text-indigo-300 flex items-center justify-center text-xs font-bold">
                          C
                        </div>
                        <div className="text-[10px] text-slate-400">Internal Node</div>
                        <div className="text-slate-500 text-xs mt-1">\</div>
                        <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 flex items-center justify-center text-[11px] font-bold">
                          F
                        </div>
                        <div className="text-[9px] text-emerald-400 mt-1">Leaf (Terminal)</div>
                      </div>
                    </div>
                  </div>

                  {/* Anatomy glossary grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-6">
                    <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60 text-xs">
                      <span className="font-bold text-cyan-400 block mb-1">1. Root</span>
                      Topmost ancestral apex node with zero incoming edges. Every tree has exactly one root.
                    </div>
                    <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60 text-xs">
                      <span className="font-bold text-cyan-400 block mb-1">2. Edge</span>
                      The directed pointer link connecting a parent to a child. N nodes always have (N - 1) edges.
                    </div>
                    <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60 text-xs">
                      <span className="font-bold text-cyan-400 block mb-1">3. Leaf Node</span>
                      Bottom node with zero children (Degree = 0). Its left and right pointers are explicitly NULL.
                    </div>
                  </div>
                </div>

                {/* 5 Types of Binary Trees (Screenshot 10) */}
                <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'}`}>
                  <h3 className="text-xl font-bold mb-4">The Five Types of Binary Trees</h3>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-200 text-sm">1. Full Binary Tree</span>
                        <span className="text-[10px] font-mono text-cyan-400 border border-cyan-500/30 px-1.5 py-0.5 rounded">STRICT / PROPER</span>
                      </div>
                      <p className="text-slate-400">Every node has either 0 or exactly 2 children. No node possesses only 1 child!</p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-200 text-sm">2. Complete Binary Tree</span>
                        <span className="text-[10px] font-mono text-teal-400 border border-teal-500/30 px-1.5 py-0.5 rounded">HEAP FOUNDATION</span>
                      </div>
                      <p className="text-slate-400">All levels are completely filled except possibly the last level, filled strictly from left to right.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-200 text-sm">3. Perfect Binary Tree</span>
                        <span className="text-[10px] font-mono text-indigo-400 border border-indigo-500/30 px-1.5 py-0.5 rounded">SYMMETRIC APEX</span>
                      </div>
                      <p className="text-slate-400">All interior nodes have 2 children, and every leaf sits at the exact same depth level. Total nodes = 2^(h+1) - 1.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-200 text-sm">4. Balanced Binary Tree</span>
                        <span className="text-[10px] font-mono text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded">AVL STANDARD</span>
                      </div>
                      <p className="text-slate-400">For every node, the height difference between left and right subtrees is at most 1 (|h_L - h_R| ≤ 1).</p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-200 text-sm">5. Degenerate / Skewed Tree</span>
                        <span className="text-[10px] font-mono text-rose-400 border border-rose-500/30 px-1.5 py-0.5 rounded">WORST CASE</span>
                      </div>
                      <p className="text-slate-400">Every parent node has only 1 child. The tree structure collapses into a linear linked list with O(N) lookup time.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {topicId === 'stack' && (
              <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'}`}>
                <h3 className="text-xl font-bold mb-3">LIFO Stack Spatial Chamber Schematic</h3>
                <p className="text-sm text-slate-400 mb-6">
                  Elements are stacked vertically. The TOP cursor marks the active edge where push and pop take place.
                </p>
                <div className="max-w-md mx-auto p-6 rounded-xl bg-slate-950 border border-slate-800 font-mono">
                  <div className="border-x-2 border-b-2 border-slate-600 rounded-b-xl p-4 flex flex-col gap-2 min-h-[160px] justify-end">
                    <div className="p-2 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-center flex items-center justify-between text-xs">
                      <span>data[2] = 88</span>
                      <span className="text-[10px] bg-amber-500/30 px-1.5 py-0.5 rounded">← TOP (top = 2)</span>
                    </div>
                    <div className="p-2 rounded bg-slate-800 border border-slate-700 text-slate-300 text-center text-xs">
                      data[1] = 42
                    </div>
                    <div className="p-2 rounded bg-slate-800 border border-slate-700 text-slate-300 text-center text-xs">
                      data[0] = 15
                    </div>
                  </div>
                  <div className="text-center text-[11px] text-slate-500 mt-2">
                    Fixed Array Buffer: Bottom index 0 → Capacity Ceiling
                  </div>
                </div>
              </div>
            )}

            {topicId === 'queue' && (
              <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'}`}>
                <h3 className="text-xl font-bold mb-3">FIFO Circular Pipeline Schematic</h3>
                <p className="text-sm text-slate-400 mb-6">
                  Items enter from REAR and leave from FRONT. Using modulo arithmetic avoids false overflow.
                </p>
                <div className="max-w-md mx-auto p-6 rounded-xl bg-slate-950 border border-slate-800 font-mono text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="px-3 py-2 rounded bg-teal-500/20 border border-teal-500/40 text-teal-300 font-bold text-xs">
                      FRONT: [0]
                    </div>
                    <span className="text-slate-500">→</span>
                    <div className="px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-300 text-xs">
                      [1]
                    </div>
                    <span className="text-slate-500">→</span>
                    <div className="px-3 py-2 rounded bg-slate-800 border border-slate-700 text-slate-300 text-xs">
                      [2]
                    </div>
                    <span className="text-slate-500">→</span>
                    <div className="px-3 py-2 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs">
                      REAR: [3]
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-cyan-400">
                    Formula: rear = (rear + 1) % QUEUE_CAPACITY
                  </div>
                </div>
              </div>
            )}

            {topicId === 'graph' && (
              <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'}`}>
                <h3 className="text-xl font-bold mb-3">Graph Network Topology & Representations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs">
                    <span className="font-bold text-cyan-400 block mb-2">Adjacency List (Sparse O(V + E))</span>
                    <div className="space-y-1 text-slate-300">
                      <div>0: → 1 → 2</div>
                      <div>1: → 0 → 3</div>
                      <div>2: → 0 → 3</div>
                      <div>3: → 1 → 2</div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs">
                    <span className="font-bold text-amber-400 block mb-2">Adjacency Matrix (Dense O(V^2))</span>
                    <div className="space-y-1 text-slate-300">
                      <div>[0, 1, 1, 0]</div>
                      <div>[1, 0, 0, 1]</div>
                      <div>[1, 0, 0, 1]</div>
                      <div>[0, 1, 1, 0]</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {topicId === 'array' && (
              <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'}`}>
                <h3 className="text-xl font-bold mb-3">Contiguous RAM Memory Layout</h3>
                <p className="text-sm text-slate-400 mb-6">
                  Every integer occupies 4 consecutive bytes in physical memory.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                  <div className="p-3 rounded-lg border border-slate-800 bg-slate-950 text-center">
                    <div className="text-slate-500 text-[10px]">0x1000</div>
                    <div className="text-cyan-400 font-bold text-sm my-1">arr[0]</div>
                    <div className="text-slate-400 text-[11px]">4 bytes</div>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-800 bg-slate-950 text-center">
                    <div className="text-slate-500 text-[10px]">0x1004</div>
                    <div className="text-cyan-400 font-bold text-sm my-1">arr[1]</div>
                    <div className="text-slate-400 text-[11px]">4 bytes</div>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-800 bg-slate-950 text-center">
                    <div className="text-slate-500 text-[10px]">0x1008</div>
                    <div className="text-cyan-400 font-bold text-sm my-1">arr[2]</div>
                    <div className="text-slate-400 text-[11px]">4 bytes</div>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-800 bg-slate-950 text-center">
                    <div className="text-slate-500 text-[10px]">0x100C</div>
                    <div className="text-cyan-400 font-bold text-sm my-1">arr[3]</div>
                    <div className="text-slate-400 text-[11px]">4 bytes</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: OPERATIONS & POINTER FLOWS (Screenshot 7) */}
        {activeTab === 'operations' && (
          <div className="space-y-8">
            {topic.operations.map((op, idx) => (
              <div
                key={idx}
                className={`p-6 sm:p-7 rounded-2xl border ${
                  isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold tracking-tight">{op.name}</h3>
                  <span className="text-xs font-mono font-bold text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 rounded-md">
                    ⚡ {op.complexity}
                  </span>
                </div>

                <p className={`text-sm leading-relaxed mb-5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {op.description}
                </p>

                {/* Algorithmic Steps */}
                <div className="mb-5">
                  <h4 className="text-xs font-mono uppercase text-slate-400 font-bold tracking-wider mb-2">
                    Algorithmic Steps:
                  </h4>
                  <ol className="space-y-1.5 text-xs sm:text-sm text-slate-300 list-decimal list-inside font-mono">
                    {op.steps.map((st, sIdx) => (
                      <li key={sIdx} className="leading-relaxed">
                        {st}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Pointer Flow Box */}
                {op.pointerFlow && op.pointerFlow.length > 0 && (
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/20 mb-5">
                    <div className="text-[11px] font-mono text-cyan-400 font-bold mb-2">
                      POINTER FLOW:
                    </div>
                    <div className="space-y-1 font-mono text-xs text-amber-300/90">
                      {op.pointerFlow.map((flow, fIdx) => (
                        <div key={fIdx}>{flow}</div>
                      ))}
                    </div>
                  </div>
                )}

                {/* C Implementation */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-slate-400">C Implementation</span>
                    <button
                      onClick={() => handleCopyCode(op.cCode, idx)}
                      className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
                    >
                      {copiedCodeIdx === idx ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCodeIdx === idx ? 'Copied' : 'Copy Code'}</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800">
                    <code>{op.cCode}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: C CODE & PITFALLS (Screenshot 8) */}
        {activeTab === 'code' && (
          <div className="space-y-8">
            <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'}`}>
              <h3 className="text-xl font-bold mb-4">Complete C99 Data Structure Implementation</h3>
              <pre className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
                <code>{topic.cStruct}</code>
              </pre>
            </div>

            {/* Common Pitfalls Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Common Pitfalls & Memory Leaks in C</h3>
              {topic.pitfalls.map((pitfall, pIdx) => (
                <div
                  key={pIdx}
                  className={`p-6 rounded-2xl border ${
                    isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 font-bold">
                      PITFALL {pIdx + 1}
                    </span>
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                  </div>

                  <h4 className="text-lg font-bold mb-1.5">{pitfall.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-400 mb-4">{pitfall.description}</p>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/30 text-rose-200">
                      <div className="text-[10px] text-rose-400 font-bold mb-1">❌ INCORRECT / DANGEROUS:</div>
                      <pre className="overflow-x-auto">
                        <code>{pitfall.badCode}</code>
                      </pre>
                    </div>

                    <div className="p-3 rounded-lg bg-teal-950/20 border border-teal-500/30 text-teal-200">
                      <div className="text-[10px] text-teal-400 font-bold mb-1">✓ CORRECT / SAFE:</div>
                      <pre className="overflow-x-auto">
                        <code>{pitfall.goodCode}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: KNOWLEDGE CHECK QUIZ (Screenshot 9) */}
        {activeTab === 'quiz' && (
          <div className={`p-6 sm:p-8 rounded-2xl border ${
            isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="text-center max-w-xl mx-auto mb-8">
              <h3 className="text-2xl font-bold tracking-tight">Self-Assessment Knowledge Check</h3>
              <p className="text-xs text-slate-400 mt-1">Test your understanding with instant feedback</p>
            </div>

            {!quizFinished ? (
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-3 border-b border-slate-800">
                  <span>Question {currentQuizIdx + 1} of {topic.quiz.length}</span>
                  <span className="text-cyan-400 font-bold">
                    Score: {quizScore} / {topic.quiz.length}
                  </span>
                </div>

                <div className="text-base sm:text-lg font-semibold leading-snug">
                  {topic.quiz[currentQuizIdx].question}
                </div>

                <div className="space-y-3">
                  {topic.quiz[currentQuizIdx].options.map((opt, oIdx) => {
                    const letter = String.fromCharCode(65 + oIdx);
                    const isSelected = selectedOption === oIdx;
                    const isCorrect = oIdx === topic.quiz[currentQuizIdx].correctAnswer;

                    let btnClass = isDark
                      ? 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800';

                    if (hasAnswered) {
                      if (isCorrect) {
                        btnClass = 'bg-teal-500/20 border-teal-500 text-teal-300 font-medium';
                      } else if (isSelected) {
                        btnClass = 'bg-rose-500/20 border-rose-500 text-rose-300';
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleAnswer(oIdx)}
                        disabled={hasAnswered}
                        className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm flex items-start gap-3 transition-all cursor-pointer ${btnClass}`}
                      >
                        <span className="w-5 h-5 rounded-md bg-slate-800 text-slate-400 flex items-center justify-center font-mono text-xs shrink-0 mt-0.5">
                          {letter}
                        </span>
                        <span className="flex-1">{opt}</span>
                        {hasAnswered && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        )}
                        {hasAnswered && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {hasAnswered && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs leading-relaxed">
                    <span className="font-bold text-cyan-400 block mb-1">Explanation:</span>
                    <span className="text-slate-300">{topic.quiz[currentQuizIdx].explanation}</span>
                  </div>
                )}

                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleNextQuestion}
                    disabled={!hasAnswered}
                    className={`px-5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      hasAnswered
                        ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <span>{currentQuizIdx < topic.quiz.length - 1 ? 'Next Question →' : 'See Results'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="max-w-md mx-auto text-center space-y-5 py-6">
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-400 text-cyan-300 flex items-center justify-center mx-auto text-xl font-bold">
                  {quizScore}/{topic.quiz.length}
                </div>
                <h4 className="text-xl font-bold">Knowledge Check Complete!</h4>
                <p className="text-sm text-slate-400">
                  {quizScore === topic.quiz.length
                    ? 'Outstanding! You have mastered this data structure concept.'
                    : `You scored ${quizScore} out of ${topic.quiz.length}. Review the explanations and retry to reach 100%!`}
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleResetQuiz}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                  <button
                    onClick={() => onOpenArenaForTopic(topicId)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Practice in Arena</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
