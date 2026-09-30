import React, { useState } from 'react';
import { COMPLEXITY_DATA } from '../data/complexity';
import { Search, Filter, ShieldCheck, Zap } from 'lucide-react';

interface ComplexityMatrixProps {
  isDark: boolean;
}

export const ComplexityMatrix: React.FC<ComplexityMatrixProps> = ({ isDark }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredData = COMPLEXITY_DATA.filter((row) => {
    const matchesSearch =
      row.structure.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.notes.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      categoryFilter === 'all' ||
      (categoryFilter === 'linear' && row.category.toLowerCase().includes('linear')) ||
      (categoryFilter === 'hierarchical' && row.category.toLowerCase().includes('hierarchical')) ||
      (categoryFilter === 'network' && row.category.toLowerCase().includes('network'));
    return matchesSearch && matchesCat;
  });

  const getBadgeClass = (val: string) => {
    if (val === 'O(1)') {
      return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
    }
    if (val.includes('log N') || val === 'O(H)') {
      return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
    }
    if (val === 'O(N)' || val === 'O(V)') {
      return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
    }
    if (val.includes('V + E') || val.includes('deg')) {
      return 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';
    }
    if (val.includes('N²') || val.includes('V²')) {
      return 'bg-rose-500/15 text-rose-300 border-rose-500/30 font-bold';
    }
    return 'bg-slate-800 text-slate-300 border-slate-700';
  };

  return (
    <section id="complexity" className={`py-20 border-t ${
      isDark ? 'bg-[#0b0f19] border-slate-800/80 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className={`inline-block px-3 py-1 text-xs font-mono font-medium rounded-full border mb-4 ${
            isDark ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300' : 'border-cyan-200 bg-cyan-50 text-cyan-800'
          }`}>
            ASYMPTOTIC ANALYSIS REFERENCE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Master Algorithmic Complexity Matrix
          </h2>
          <p className={`mt-3 text-base sm:text-lg leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Cross-compare Time (Best, Average, Worst) and Space complexities across all standard data structures.
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                categoryFilter === 'all' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              All Structures
            </button>
            <button
              onClick={() => setCategoryFilter('linear')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                categoryFilter === 'linear' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              Linear (Array/Stack/Queue/List)
            </button>
            <button
              onClick={() => setCategoryFilter('hierarchical')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                categoryFilter === 'hierarchical' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              Trees (BST / AVL)
            </button>
            <button
              onClick={() => setCategoryFilter('network')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                categoryFilter === 'network' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              Graphs (Matrix / List)
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search structure or notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 w-64"
            />
          </div>
        </div>

        {/* Complexity Legend */}
        <div className="flex flex-wrap items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono mb-6 text-slate-400">
          <span className="font-bold text-slate-300">Big-O Legend:</span>
          <span className="px-2 py-0.5 rounded border bg-emerald-500/10 border-emerald-500/30 text-emerald-400">
            O(1) Excellent / Constant
          </span>
          <span className="px-2 py-0.5 rounded border bg-cyan-500/10 border-cyan-500/30 text-cyan-300">
            O(log N) Good / Logarithmic
          </span>
          <span className="px-2 py-0.5 rounded border bg-amber-500/10 border-amber-500/30 text-amber-300">
            O(N) Fair / Linear
          </span>
          <span className="px-2 py-0.5 rounded border bg-rose-500/10 border-rose-500/30 text-rose-300">
            O(N²) Quadratic / Expensive
          </span>
        </div>

        {/* The Matrix Table */}
        <div className={`rounded-2xl border overflow-hidden ${
          isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-md'
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className={`border-b text-[11px] uppercase tracking-wider ${
                isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}>
                <tr>
                  <th className="py-4 px-5 font-bold">Data Structure</th>
                  <th className="py-4 px-4 font-bold">Category</th>
                  <th className="py-4 px-3 font-bold text-center">Access (Avg)</th>
                  <th className="py-4 px-3 font-bold text-center">Search (Avg)</th>
                  <th className="py-4 px-3 font-bold text-center">Insert (Avg)</th>
                  <th className="py-4 px-3 font-bold text-center">Delete (Avg)</th>
                  <th className="py-4 px-3 font-bold text-center">Space (Worst)</th>
                  <th className="py-4 px-5 font-bold">Architectural Takeaway</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredData.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      isDark ? 'hover:bg-slate-900/60' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3.5 px-5 font-bold text-slate-200 text-xs sm:text-sm">
                      {row.structure}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      {row.category}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded border text-[11px] ${getBadgeClass(row.access.avg)}`}>
                        {row.access.avg}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded border text-[11px] ${getBadgeClass(row.search.avg)}`}>
                        {row.search.avg}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded border text-[11px] ${getBadgeClass(row.insert.avg)}`}>
                        {row.insert.avg}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded border text-[11px] ${getBadgeClass(row.delete.avg)}`}>
                        {row.delete.avg}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span className="inline-block px-2 py-0.5 rounded border bg-slate-900 border-slate-700 text-slate-300 text-[11px]">
                        {row.space}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-slate-400 text-[11px] leading-relaxed max-w-xs">
                      {row.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
