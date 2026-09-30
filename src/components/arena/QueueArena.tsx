import React, { useState } from 'react';
import { Plus, Minus, Eye, RotateCcw, AlertCircle } from 'lucide-react';

interface QueueArenaProps {
  isDark: boolean;
}

export const QueueArena: React.FC<QueueArenaProps> = ({ isDark }) => {
  const CAPACITY = 6;
  const [buffer, setBuffer] = useState<(number | null)[]>([10, 20, 30, null, null, null]);
  const [front, setFront] = useState<number>(0);
  const [rear, setRear] = useState<number>(2);
  const [count, setCount] = useState<number>(3);
  const [inputVal, setInputVal] = useState<string>('40');
  const [log, setLog] = useState<string[]>([
    'Queue initialized with 3 items. Front = 0, Rear = 2, Count = 3.',
  ]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const enqueueItem = () => {
    setErrorMsg(null);
    const val = parseInt(inputVal);
    if (isNaN(val)) return;

    if (count === CAPACITY) {
      setErrorMsg(`Queue Overflow! Buffer is completely full (${CAPACITY} items).`);
      setLog((prev) => [`[OVERFLOW ERROR] enqueue(${val}) rejected - Queue is full!`, ...prev.slice(0, 9)]);
      return;
    }

    const nextRear = (rear + 1) % CAPACITY;
    const nextBuffer = [...buffer];
    nextBuffer[nextRear] = val;

    setRear(nextRear);
    setBuffer(nextBuffer);
    setCount(count + 1);
    setLog((prev) => [
      `enqueue(${val}) -> rear = (${rear} + 1) % ${CAPACITY} = ${nextRear}; buffer[${nextRear}] = ${val}; Count = ${count + 1}`,
      ...prev.slice(0, 9),
    ]);
    setInputVal(Math.floor(Math.random() * 80 + 10).toString());
  };

  const dequeueItem = () => {
    setErrorMsg(null);
    if (count === 0) {
      setErrorMsg('Queue Underflow! Cannot dequeue from empty queue.');
      setLog((prev) => ['[UNDERFLOW ERROR] dequeue() rejected - Queue is empty!', ...prev.slice(0, 9)]);
      return;
    }

    const dequeuedVal = buffer[front];
    const nextBuffer = [...buffer];
    nextBuffer[front] = null; // Clear slot for visual clarity

    const nextFront = (front + 1) % CAPACITY;
    setFront(nextFront);
    setBuffer(nextBuffer);
    setCount(count - 1);
    setLog((prev) => [
      `dequeue() -> extracted ${dequeuedVal}; front = (${front} + 1) % ${CAPACITY} = ${nextFront}; Count = ${count - 1}`,
      ...prev.slice(0, 9),
    ]);
  };

  const resetQueue = () => {
    setBuffer([null, null, null, null, null, null]);
    setFront(0);
    setRear(-1);
    setCount(0);
    setErrorMsg(null);
    setLog((prev) => ['Queue reset to empty. Front = 0, Rear = -1, Count = 0.', ...prev.slice(0, 9)]);
  };

  return (
    <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
      isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-md'
    }`}>
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div>
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <span>FIFO Circular Queue Pipeline Stage</span>
            <span className="text-[10px] font-mono text-teal-400 border border-teal-500/30 bg-teal-500/10 px-2 py-0.5 rounded">
              (rear + 1) % CAPACITY Modulo Engine
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>CAPACITY:</span>
          <span className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-teal-300 font-bold">
            {CAPACITY} Slots Fixed
          </span>
        </div>
      </div>

      {/* Controls Row */}
      <div className="py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/60">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-slate-400 font-semibold">VALUE:</span>
          <input
            type="number"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-20 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono text-slate-100 focus:outline-none focus:border-teal-400 text-center"
          />
          <button
            onClick={enqueueItem}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Enqueue (Rear)</span>
          </button>
          <button
            onClick={dequeueItem}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-semibold transition-all cursor-pointer"
          >
            <Minus className="w-3.5 h-3.5" />
            <span>Dequeue (Front)</span>
          </button>
        </div>

        <button
          onClick={resetQueue}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700 text-xs font-mono cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {errorMsg && (
        <div className="my-3 p-3 rounded-lg bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2 font-mono">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Queue Pipeline Visual Canvas */}
      <div className="my-6 p-6 rounded-xl bg-slate-950 border border-slate-800 font-mono">
        <div className="text-[11px] text-slate-400 text-center mb-6 uppercase tracking-wider">
          CIRCULAR BUFFER MEMORY SLOTS (Modulo {CAPACITY})
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
          {buffer.map((val, idx) => {
            const isFront = count > 0 && front === idx;
            const isRear = count > 0 && rear === idx;
            const hasVal = val !== null;

            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border flex flex-col items-center justify-between min-h-[110px] transition-all ${
                  isFront && isRear
                    ? 'bg-gradient-to-b from-teal-500/20 to-amber-500/20 border-teal-400 shadow-md'
                    : isFront
                    ? 'bg-teal-500/15 border-teal-400 shadow-sm'
                    : isRear
                    ? 'bg-amber-500/15 border-amber-400 shadow-sm'
                    : hasVal
                    ? 'bg-slate-900 border-slate-700 text-slate-200'
                    : 'bg-slate-950/60 border-dashed border-slate-800 text-slate-700'
                }`}
              >
                <div className="text-[10px] text-slate-500 font-bold">Slot [{idx}]</div>

                <div className="text-lg font-extrabold my-2">
                  {hasVal ? val : '—'}
                </div>

                <div className="flex flex-col gap-1 items-center w-full">
                  {isFront && (
                    <span className="w-full text-[9px] text-center font-bold px-1 py-0.5 rounded bg-teal-500/30 text-teal-300">
                      FRONT
                    </span>
                  )}
                  {isRear && (
                    <span className="w-full text-[9px] text-center font-bold px-1 py-0.5 rounded bg-amber-500/30 text-amber-300">
                      REAR
                    </span>
                  )}
                  {!isFront && !isRear && <span className="h-4" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modulo calculation explanation */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-400">
          <div>
            <span className="text-teal-400 font-bold">Front Cursor:</span> Index {front} (Next dequeue extracts here)
          </div>
          <div>
            <span className="text-amber-400 font-bold">Rear Cursor:</span> Index {rear} (Next enqueue advances to (rear+1)%{CAPACITY})
          </div>
        </div>
      </div>

      {/* Execution Log */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
        <div className="text-[11px] text-teal-400 font-bold mb-2">QUEUE EXECUTION TELEMETRY</div>
        <div className="space-y-1 max-h-[120px] overflow-y-auto">
          {log.map((entry, idx) => (
            <div
              key={idx}
              className={`text-[11px] ${idx === 0 ? 'text-teal-300 font-bold' : 'text-slate-400'}`}
            >
              &gt; {entry}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 pt-3 border-t border-slate-800/60 mt-4">
        <div>
          Buffered Count: <span className="text-teal-400 font-bold">{count} / {CAPACITY}</span>
        </div>
        <div>
          Discipline: <span className="text-cyan-400 font-bold">First-In, First-Out (FIFO)</span>
        </div>
        <div>
          Big-O: <span className="text-teal-400 font-bold">Enqueue O(1) · Dequeue O(1)</span>
        </div>
      </div>
    </div>
  );
};
