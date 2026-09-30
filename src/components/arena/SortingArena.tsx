import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, BarChart3, Grid, Shuffle } from 'lucide-react';

interface SortingArenaProps {
  isDark: boolean;
}

export const SortingArena: React.FC<SortingArenaProps> = ({ isDark }) => {
  const [listSize, setListSize] = useState<number>(10);
  const [items, setItems] = useState<number[]>([45, 12, 89, 34, 22, 67, 19, 90, 53, 28]);
  const [algo, setAlgo] = useState<'bubble' | 'selection' | 'insertion'>('bubble');
  const [viewMode, setViewMode] = useState<'bar' | 'ram'>('bar');
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(400);
  const [comparisons, setComparisons] = useState<number>(0);
  const [swaps, setSwaps] = useState<number>(0);
  const [howItWorks, setHowItWorks] = useState<string>(
    'Bubble Sort repeatedly compares adjacent elements and swaps them if they are in the wrong order. Largest unsorted elements bubble to the end in O(N²) time.'
  );

  const generatePreset = (preset: 'random' | 'nearly' | 'reverse' | 'duplicates') => {
    if (isSorting) return;
    let arr: number[] = [];
    if (preset === 'random') {
      arr = Array.from({ length: listSize }, () => Math.floor(Math.random() * 85 + 10));
    } else if (preset === 'nearly') {
      arr = Array.from({ length: listSize }, (_, i) => 10 + i * 8);
      // Swap 2 random pairs
      if (arr.length > 3) {
        const tmp = arr[2];
        arr[2] = arr[3];
        arr[3] = tmp;
      }
    } else if (preset === 'reverse') {
      arr = Array.from({ length: listSize }, (_, i) => 95 - i * 8);
    } else {
      arr = Array.from({ length: listSize }, () => [25, 45, 75][Math.floor(Math.random() * 3)]);
    }
    setItems(arr);
    setActiveIndices([]);
    setSortedIndices([]);
    setComparisons(0);
    setSwaps(0);
  };

  const handleAlgoChange = (selected: 'bubble' | 'selection' | 'insertion') => {
    if (isSorting) return;
    setAlgo(selected);
    if (selected === 'bubble') {
      setHowItWorks(
        'Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. Pass by pass, largest numbers bubble up to the top.'
      );
    } else if (selected === 'selection') {
      setHowItWorks(
        'Selection Sort scans the unsorted partition to locate the minimum element, then swaps it into the next available sorted position at the front.'
      );
    } else {
      setHowItWorks(
        'Insertion Sort builds the final sorted array one item at a time by consuming one input element per repetition and shifting greater elements rightward.'
      );
    }
  };

  // Run bubble sort step by step
  const runSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    const arr = [...items];
    let cmpCount = 0;
    let swpCount = 0;

    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    if (algo === 'bubble') {
      const n = arr.length;
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          setActiveIndices([j, j + 1]);
          cmpCount++;
          setComparisons(cmpCount);
          await delay(speed);

          if (arr[j] > arr[j + 1]) {
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            swpCount++;
            setSwaps(swpCount);
            setItems([...arr]);
            await delay(speed);
          }
        }
        setSortedIndices((prev) => [...prev, n - 1 - i]);
      }
      setSortedIndices(Array.from({ length: n }, (_, i) => i));
    } else if (algo === 'selection') {
      const n = arr.length;
      for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
          setActiveIndices([minIdx, j]);
          cmpCount++;
          setComparisons(cmpCount);
          await delay(speed);

          if (arr[j] < arr[minIdx]) {
            minIdx = j;
          }
        }
        if (minIdx !== i) {
          const temp = arr[i];
          arr[i] = arr[minIdx];
          arr[minIdx] = temp;
          swpCount++;
          setSwaps(swpCount);
          setItems([...arr]);
          await delay(speed);
        }
        setSortedIndices((prev) => [...prev, i]);
      }
      setSortedIndices(Array.from({ length: n }, (_, i) => i));
    } else {
      // Insertion sort
      const n = arr.length;
      for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
          setActiveIndices([j, j + 1]);
          cmpCount++;
          setComparisons(cmpCount);
          await delay(speed);

          arr[j + 1] = arr[j];
          swpCount++;
          setSwaps(swpCount);
          setItems([...arr]);
          j--;
          await delay(speed);
        }
        arr[j + 1] = key;
        setItems([...arr]);
      }
      setSortedIndices(Array.from({ length: n }, (_, i) => i));
    }

    setActiveIndices([]);
    setIsSorting(false);
  };

  const resetAll = () => {
    generatePreset('random');
  };

  return (
    <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
      isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-md'
    }`}>
      {/* Title (Screenshot 4) */}
      <div className="pb-5 border-b border-slate-800/80">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 text-[11px] font-mono font-medium rounded border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
            PRACTICE ARENA
          </span>
          <span className="px-2.5 py-0.5 text-[11px] font-mono font-medium rounded border border-teal-500/30 bg-teal-500/10 text-teal-300">
            LIVE SIMULATION
          </span>
          <span className="px-2.5 py-0.5 text-[11px] font-mono font-medium rounded border border-slate-700 bg-slate-800 text-slate-300">
            TACTILE CONTROLS
          </span>
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight">
          Interactive <span className="text-cyan-400">Sorting Practice Arena</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Run, step through, and compare Bubble, Selection, and Insertion Sort in real-time. Inspect live comparisons, swaps, and memory layout.
        </p>
      </div>

      {/* Algorithm selector pills */}
      <div className="py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/60 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleAlgoChange('bubble')}
            disabled={isSorting}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
              algo === 'bubble'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                : 'bg-slate-900 border-slate-700 text-slate-300'
            }`}
          >
            🫧 Bubble Sort
          </button>
          <button
            onClick={() => handleAlgoChange('selection')}
            disabled={isSorting}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
              algo === 'selection'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                : 'bg-slate-900 border-slate-700 text-slate-300'
            }`}
          >
            🎯 Selection Sort
          </button>
          <button
            onClick={() => handleAlgoChange('insertion')}
            disabled={isSorting}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
              algo === 'insertion'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                : 'bg-slate-900 border-slate-700 text-slate-300'
            }`}
          >
            🃏 Insertion Sort
          </button>
        </div>

        {/* View toggles */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setViewMode('bar')}
            className={`px-2.5 py-1 rounded flex items-center gap-1 cursor-pointer ${
              viewMode === 'bar' ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-400'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Bar Chart View</span>
          </button>
          <button
            onClick={() => setViewMode('ram')}
            className={`px-2.5 py-1 rounded flex items-center gap-1 cursor-pointer ${
              viewMode === 'ram' ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-400'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>RAM Cells View</span>
          </button>
        </div>
      </div>

      {/* How it works banner */}
      <div className="my-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 flex items-start gap-2">
        <span className="text-amber-400 font-bold">💡 How it works:</span>
        <span>{howItWorks}</span>
      </div>

      {/* Presets and List Size bar */}
      <div className="py-3 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/60 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-400 font-semibold">PRESET LIST:</span>
          <button
            onClick={() => generatePreset('random')}
            disabled={isSorting}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 cursor-pointer"
          >
            🎲 Random List
          </button>
          <button
            onClick={() => generatePreset('nearly')}
            disabled={isSorting}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 cursor-pointer"
          >
            📈 Nearly Sorted
          </button>
          <button
            onClick={() => generatePreset('reverse')}
            disabled={isSorting}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 cursor-pointer"
          >
            📉 Reverse Order (Worst Case)
          </button>
          <button
            onClick={() => generatePreset('duplicates')}
            disabled={isSorting}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 cursor-pointer"
          >
            👥 Duplicates
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={runSort}
            disabled={isSorting}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-sm cursor-pointer disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-slate-950" />
            <span>{isSorting ? 'Sorting...' : 'Start Sort'}</span>
          </button>
          <button
            onClick={resetAll}
            disabled={isSorting}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Visual Chart Area (Screenshot 4) */}
      <div className="my-6 p-6 rounded-xl bg-slate-950 border border-slate-800 min-h-[260px] flex items-end justify-center font-mono">
        {viewMode === 'bar' ? (
          <div className="w-full flex items-end justify-center gap-3 sm:gap-4 h-52">
            {items.map((val, idx) => {
              const isActive = activeIndices.includes(idx);
              const isSorted = sortedIndices.includes(idx);

              return (
                <div key={idx} className="flex-1 max-w-[48px] flex flex-col items-center gap-2 h-full justify-end">
                  <span className={`text-[11px] font-bold ${
                    isActive ? 'text-amber-400' : isSorted ? 'text-teal-400' : 'text-slate-300'
                  }`}>
                    {val}
                  </span>
                  <div
                    style={{ height: `${(val / 100) * 160 + 15}px` }}
                    className={`w-full rounded-t-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-amber-400 shadow-md shadow-amber-400/50'
                        : isSorted
                        ? 'bg-teal-500/80 shadow-sm shadow-teal-500/30'
                        : 'bg-slate-800 border-t border-slate-700'
                    }`}
                  />
                  <span className="text-[10px] text-slate-500">[{idx}]</span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 w-full my-auto">
            {items.map((val, idx) => {
              const isActive = activeIndices.includes(idx);
              const isSorted = sortedIndices.includes(idx);
              return (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    isActive
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                      : isSorted
                      ? 'bg-teal-500/20 border-teal-400 text-teal-300'
                      : 'bg-slate-900 border-slate-800 text-slate-200'
                  }`}
                >
                  <div className="text-[10px] text-slate-500">0x{(0x2000 + idx * 4).toString(16).toUpperCase()}</div>
                  <div className="text-base font-extrabold my-1">{val}</div>
                  <div className="text-[10px] text-slate-400">arr[{idx}]</div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Metrics Row */}
      <div className="flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 pt-3 border-t border-slate-800/60">
        <div>
          Comparisons: <span className="text-cyan-400 font-bold">{comparisons}</span>
        </div>
        <div>
          Swaps / Shifts: <span className="text-amber-400 font-bold">{swaps}</span>
        </div>
        <div>
          Time Complexity: <span className="text-teal-400 font-bold">Worst O(N²) · Best O(N)</span>
        </div>
      </div>
    </div>
  );
};
