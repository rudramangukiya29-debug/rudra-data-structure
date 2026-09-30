import React, { useState } from 'react';
import { Plus, Minus, Eye, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';

interface StackArenaProps {
  isDark: boolean;
}

export const StackArena: React.FC<StackArenaProps> = ({ isDark }) => {
  const [capacity, setCapacity] = useState<number>(6);
  const [items, setItems] = useState<number[]>([15, 42, 88]);
  const [inputVal, setInputVal] = useState<string>('99');
  const [peekActive, setPeekActive] = useState<boolean>(false);
  const [log, setLog] = useState<string[]>(['Stack initialized with 3 elements. Top = 2.']);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Parentheses check demo
  const [parenInput, setParenInput] = useState<string>('{ [ ( ) ] }');
  const [parenResult, setParenResult] = useState<string | null>(null);

  const pushItem = () => {
    setErrorMsg(null);
    setPeekActive(false);
    const val = parseInt(inputVal);
    if (isNaN(val)) return;

    if (items.length >= capacity) {
      setErrorMsg(`Stack Overflow! Cannot push ${val} into full capacity of ${capacity}.`);
      setLog((prev) => [`[OVERFLOW ERROR] push(${val}) rejected - capacity ceiling hit!`, ...prev.slice(0, 9)]);
      return;
    }

    const nextItems = [...items, val];
    setItems(nextItems);
    setLog((prev) => [
      `push(${val}) -> stack[++top] = ${val}; Top index is now ${nextItems.length - 1}`,
      ...prev.slice(0, 9),
    ]);
    setInputVal(Math.floor(Math.random() * 80 + 10).toString());
  };

  const popItem = () => {
    setErrorMsg(null);
    setPeekActive(false);
    if (items.length === 0) {
      setErrorMsg('Stack Underflow! Cannot pop from empty stack.');
      setLog((prev) => ['[UNDERFLOW ERROR] pop() rejected - stack is already empty!', ...prev.slice(0, 9)]);
      return;
    }

    const popped = items[items.length - 1];
    const nextItems = items.slice(0, -1);
    setItems(nextItems);
    setLog((prev) => [
      `pop() -> extracted ${popped}; Top index decremented to ${nextItems.length - 1}`,
      ...prev.slice(0, 9),
    ]);
  };

  const peekItem = () => {
    setErrorMsg(null);
    if (items.length === 0) {
      setErrorMsg('Cannot peek: stack is empty!');
      return;
    }
    setPeekActive(true);
    const topVal = items[items.length - 1];
    setLog((prev) => [
      `peek() -> inspected top element ${topVal} at index ${items.length - 1}. No state change.`,
      ...prev.slice(0, 9),
    ]);
    setTimeout(() => setPeekActive(false), 2000);
  };

  const clearStack = () => {
    setItems([]);
    setErrorMsg(null);
    setPeekActive(false);
    setLog((prev) => ['Stack reset to empty. Top = -1.', ...prev.slice(0, 9)]);
  };

  const testParentheses = () => {
    const s: string[] = [];
    const map: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
    const chars = parenInput.replace(/\s+/g, '').split('');

    for (const ch of chars) {
      if (ch === '(' || ch === '[' || ch === '{') {
        s.push(ch);
      } else if (ch === ')' || ch === ']' || ch === '}') {
        if (s.length === 0 || s.pop() !== map[ch]) {
          setParenResult('❌ Unbalanced Parentheses detected!');
          return;
        }
      }
    }

    if (s.length === 0) {
      setParenResult('✓ Balanced Parentheses Verified!');
    } else {
      setParenResult('❌ Unbalanced Parentheses (unclosed tokens left on stack)!');
    }
  };

  return (
    <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
      isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-md'
    }`}>
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div>
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <span>Interactive LIFO Stack Chamber</span>
            <span className="text-[10px] font-mono text-amber-400 border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 rounded">
              Contiguous Array vs Dynamic Nodes
            </span>
          </h2>
        </div>

        {/* Capacity Selector */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>CAPACITY:</span>
          {[4, 6, 8].map((cap) => (
            <button
              key={cap}
              onClick={() => setCapacity(cap)}
              className={`px-2 py-1 rounded border text-xs font-bold cursor-pointer ${
                capacity === cap
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                  : 'bg-slate-900 border-slate-700 text-slate-400'
              }`}
            >
              {cap} slots
            </button>
          ))}
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
            className="w-20 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono text-slate-100 focus:outline-none focus:border-amber-400 text-center"
          />
          <button
            onClick={pushItem}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Push (Insert)</span>
          </button>
          <button
            onClick={popItem}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-semibold transition-all cursor-pointer"
          >
            <Minus className="w-3.5 h-3.5" />
            <span>Pop (Extract)</span>
          </button>
          <button
            onClick={peekItem}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>Peek (Top)</span>
          </button>
        </div>

        <button
          onClick={clearStack}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700 text-xs font-mono cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear</span>
        </button>
      </div>

      {errorMsg && (
        <div className="my-3 p-3 rounded-lg bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2 font-mono">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Visual Chamber Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-6">
        {/* Left: The Stack Chamber */}
        <div className="md:col-span-6 flex flex-col items-center justify-end p-6 rounded-xl bg-slate-950 border border-slate-800 relative min-h-[340px]">
          <div className="text-[11px] font-mono text-slate-400 mb-3 uppercase tracking-wider">
            PHYSICAL STACK BUFFER (TOP POINTER = {items.length - 1})
          </div>

          {/* Vertical Stack Frame */}
          <div className="w-56 border-x-4 border-b-4 border-slate-700 rounded-b-2xl p-3 flex flex-col-reverse gap-2 min-h-[220px] justify-start bg-slate-900/50">
            {Array.from({ length: capacity }).map((_, slotIdx) => {
              const itemVal = items[slotIdx];
              const isFilled = itemVal !== undefined;
              const isTop = slotIdx === items.length - 1;

              return (
                <div
                  key={slotIdx}
                  className={`h-11 rounded-lg border flex items-center justify-between px-3 text-xs font-mono transition-all ${
                    isFilled
                      ? isTop
                        ? peekActive
                          ? 'bg-amber-400 text-slate-950 font-bold border-amber-300 shadow-lg shadow-amber-400/50 scale-105 animate-pulse'
                          : 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                        : 'bg-slate-800/90 border-slate-700 text-slate-200'
                      : 'border-dashed border-slate-800 text-slate-700'
                  }`}
                >
                  <span className="text-[10px] text-slate-500">[{slotIdx}]</span>
                  <span className="font-bold text-sm">{isFilled ? itemVal : 'empty'}</span>
                  {isTop ? (
                    <span className="text-[10px] bg-amber-500/30 text-amber-300 px-1.5 py-0.5 rounded font-bold">
                      ← TOP
                    </span>
                  ) : (
                    <span className="w-8" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-[11px] font-mono text-slate-500 mt-3 text-center">
            Elements push downward into RAM. Pop strictly extracts from TOP.
          </div>
        </div>

        {/* Right: Real-Time Execution Log & Parentheses Demo */}
        <div className="md:col-span-6 flex flex-col justify-between space-y-4">
          {/* C Execution Log */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs flex-1">
            <div className="text-[11px] text-cyan-400 font-bold mb-2 flex items-center justify-between">
              <span>REAL-TIME C HARDWARE LOG</span>
              <span className="text-slate-500 text-[10px]">O(1) Time</span>
            </div>
            <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
              {log.map((line, idx) => (
                <div
                  key={idx}
                  className={`text-[11px] leading-relaxed ${
                    idx === 0 ? 'text-amber-300 font-bold' : 'text-slate-400'
                  }`}
                >
                  &gt; {line}
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Stack Application: Bracket Validator */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
            <span className="text-[11px] text-teal-400 font-bold block mb-2">
              STACK APPLICATION: BALANCED PARENTHESES CHECKER
            </span>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={parenInput}
                onChange={(e) => {
                  setParenInput(e.target.value);
                  setParenResult(null);
                }}
                className="flex-1 px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-slate-100 text-xs"
                placeholder="{ [ ( ) ] }"
              />
              <button
                onClick={testParentheses}
                className="px-3 py-1.5 rounded bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs cursor-pointer"
              >
                Validate
              </button>
            </div>
            {parenResult && (
              <div
                className={`p-2 rounded text-xs font-semibold ${
                  parenResult.includes('✓') ? 'bg-teal-950/40 text-teal-300' : 'bg-rose-950/40 text-rose-300'
                }`}
              >
                {parenResult}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 pt-3 border-t border-slate-800/60">
        <div>
          Current Size: <span className="text-amber-400 font-bold">{items.length} / {capacity}</span>
        </div>
        <div>
          Memory Overhead: <span className="text-cyan-400 font-bold">Contiguous Array (0 pointer bytes)</span>
        </div>
        <div>
          Big-O: <span className="text-teal-400 font-bold">Push O(1) · Pop O(1)</span>
        </div>
      </div>
    </div>
  );
};
