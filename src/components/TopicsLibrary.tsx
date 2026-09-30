import React from 'react';
import { TOPICS } from '../data/topics';
import { ArrowRight, Layers, GitCommit, Split, Network, Database } from 'lucide-react';
import { TopicId } from '../types';

interface TopicsLibraryProps {
  onSelectTopic: (id: TopicId) => void;
  isDark: boolean;
}

export const TopicsLibrary: React.FC<TopicsLibraryProps> = ({ onSelectTopic, isDark }) => {
  const topicList = [
    {
      id: 'stack' as TopicId,
      name: 'Stack',
      icon: Layers,
      category: 'Linear LIFO',
      time: '6 min read',
      tagline: 'Last-In, First-Out Push/Pop Operations, Call Stacks & Parentheses Parsing',
      accent: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
    },
    {
      id: 'queue' as TopicId,
      name: 'Queue',
      icon: Database,
      category: 'Linear FIFO',
      time: '7 min read',
      tagline: 'First-In, First-Out Circular Buffers, Process Schedulers & BFS Queues',
      accent: 'border-teal-500/30 text-teal-400 bg-teal-500/10',
    },
    {
      id: 'linked-list' as TopicId,
      name: 'Linked List',
      icon: GitCommit,
      category: 'Linear Pointer Chain',
      time: '8 min read',
      tagline: 'Dynamic Heap-Allocated Singly & Doubly Nodes with Pointer Re-Hooking',
      accent: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
    },
    {
      id: 'tree' as TopicId,
      name: 'Binary Search Tree',
      icon: Split,
      category: 'Hierarchical',
      time: '9 min read',
      tagline: 'Logarithmic O(log N) Search Trees, Traversals (In/Pre/Post), and AVL Balancing',
      accent: 'border-indigo-500/30 text-indigo-400 bg-indigo-500/10',
    },
    {
      id: 'graph' as TopicId,
      name: 'Graph',
      icon: Network,
      category: 'Non-Linear Network',
      time: '10 min read',
      tagline: 'Vertices & Edges, Adjacency List vs Matrix, and BFS/DFS Traversal Engines',
      accent: 'border-rose-500/30 text-rose-400 bg-rose-500/10',
    },
    {
      id: 'array' as TopicId,
      name: 'Array & RAM Math',
      icon: Database,
      category: 'Linear Contiguous',
      time: '5 min read',
      tagline: 'Physical RAM Base Offsets, 0-Indexing Math, Cache Lines & Element Shifting',
      accent: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
    },
  ];

  return (
    <section id="topics" className={`py-20 border-t ${
      isDark ? 'bg-[#0a0e17] border-slate-800/80' : 'bg-slate-50/50 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className={`inline-block px-3 py-1 text-xs font-mono font-medium rounded-full border mb-4 ${
            isDark ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300' : 'border-cyan-200 bg-cyan-50 text-cyan-800'
          }`}>
            CURRICULUM DIRECTORY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Topic Library & Study Modules
          </h2>
          <p className={`mt-4 text-base sm:text-lg leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Select any data structure below to access memory schematics, interactive Practice Arena simulators,
            commented C code, and self-check quizzes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topicList.map((item) => {
            const Icon = item.icon;
            const topic = TOPICS[item.id];
            return (
              <div
                key={item.id}
                onClick={() => onSelectTopic(item.id)}
                className={`p-6 rounded-2xl border flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-1 hover:border-cyan-500/50 group ${
                  isDark
                    ? 'bg-[#0f172a] border-slate-800 shadow-lg shadow-black/20'
                    : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${item.accent}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      {item.time}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-cyan-400 font-medium">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight mb-2 group-hover:text-cyan-400 transition-colors">
                    {item.name}
                  </h3>

                  <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {item.tagline}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold">
                  <span className="text-cyan-400 group-hover:underline flex items-center gap-1">
                    Study Module
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className={`text-[10px] font-mono ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                    {topic?.quiz.length || 2} Quizzes Ready
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
