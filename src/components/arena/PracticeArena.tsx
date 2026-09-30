import React, { useState } from 'react';
import { TreeArena } from './TreeArena';
import { StackArena } from './StackArena';
import { QueueArena } from './QueueArena';
import { LinkedListArena } from './LinkedListArena';
import { GraphArena } from './GraphArena';
import { SortingArena } from './SortingArena';
import { Split, Layers, Database, GitCommit, Network, BarChart2 } from 'lucide-react';
import { TopicId } from '../../types';

interface PracticeArenaProps {
  initialTopic?: TopicId | 'sorting';
  isDark: boolean;
}

export const PracticeArena: React.FC<PracticeArenaProps> = ({
  initialTopic = 'tree',
  isDark,
}) => {
  const [selectedArena, setSelectedArena] = useState<string>(
    initialTopic === 'tree' ? 'tree' : initialTopic
  );

  const tabs = [
    { id: 'tree', label: 'Binary Search Tree', icon: Split, color: 'text-indigo-400' },
    { id: 'stack', label: 'LIFO Stack', icon: Layers, color: 'text-amber-400' },
    { id: 'queue', label: 'FIFO Queue', icon: Database, color: 'text-teal-400' },
    { id: 'linked-list', label: 'Linked List', icon: GitCommit, color: 'text-cyan-400' },
    { id: 'graph', label: 'Graph Network', icon: Network, color: 'text-rose-400' },
    { id: 'sorting', label: 'Sorting Algorithms', icon: BarChart2, color: 'text-emerald-400' },
  ];

  return (
    <div className={`py-12 ${isDark ? 'bg-[#0b0f19] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Arena Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className={`inline-block px-3 py-1 text-xs font-mono font-medium rounded-full border mb-4 ${
            isDark ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300' : 'border-cyan-200 bg-cyan-50 text-cyan-800'
          }`}>
            STUDIO PRACTICE ARENA
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Interactive Visual Execution Simulators
          </h1>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Select any engine below to step through insertions, extractions, pointer mutations, and graph traversals in real time.
          </p>
        </div>

        {/* Tab selection bar */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 mb-8">
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedArena === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedArena(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold font-mono tracking-wide transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : tab.color}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Arena Content Engine */}
        <div>
          {selectedArena === 'tree' && <TreeArena isDark={isDark} />}
          {selectedArena === 'stack' && <StackArena isDark={isDark} />}
          {selectedArena === 'queue' && <QueueArena isDark={isDark} />}
          {selectedArena === 'linked-list' && <LinkedListArena isDark={isDark} />}
          {selectedArena === 'graph' && <GraphArena isDark={isDark} />}
          {selectedArena === 'sorting' && <SortingArena isDark={isDark} />}
        </div>
      </div>
    </div>
  );
};
