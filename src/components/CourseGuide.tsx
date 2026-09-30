import React from 'react';
import { BookOpen, Cpu, Shield, Award, Terminal, HardDrive } from 'lucide-react';

interface CourseGuideProps {
  isDark: boolean;
  onSelectTopic: (topicId: string) => void;
}

export const CourseGuide: React.FC<CourseGuideProps> = ({ isDark, onSelectTopic }) => {
  const pointerPrinciples = [
    {
      code: 'int* ptr = &val;',
      title: 'Address-Of (&) & Pointers',
      description: 'A pointer does not store data itself; it holds a 64-bit hexadecimal RAM address pointing to where data lives.',
    },
    {
      code: 'int data = *ptr;',
      title: 'Dereferencing (*)',
      description: 'The dereference operator tells the CPU to jump directly to the target memory coordinates and read/write the underlying bytes.',
    },
    {
      code: 'node->next = newNode;',
      title: 'Struct Arrow (->) Chaining',
      description: 'Shorthand for (*node).next. Accesses the fields of a heap struct through its pointer reference in 1 cycle.',
    },
    {
      code: 'free(node); node = NULL;',
      title: 'Deallocation & Dangling Pointers',
      description: 'Always assign NULL immediately after calling free() to prevent accidental reads of garbage memory.',
    },
  ];

  const syllabus = [
    {
      week: 'Module 01',
      title: 'Contiguous RAM, Arrays & Address Math',
      topicId: 'array',
      desc: 'Base address calculation, row-major matrices, cache line alignment, element shifting.',
    },
    {
      week: 'Module 02',
      title: 'Dynamic Heap Chains: Singly & Doubly Linked Lists',
      topicId: 'linked-list',
      desc: 'malloc(), node re-hooking, fast prepend, boundary cases, cycle detection.',
    },
    {
      week: 'Module 03',
      title: 'LIFO Containers & The Runtime Call Stack',
      topicId: 'stack',
      desc: 'Top pointer management, stack frames, parentheses validation, undo-redo buffers.',
    },
    {
      week: 'Module 04',
      title: 'FIFO Buffers & Circular Queues',
      topicId: 'queue',
      desc: 'Modulo wrap-around indexing, false overflow prevention, process scheduling.',
    },
    {
      week: 'Module 05',
      title: 'Hierarchical Trees, BSTs & Balancing',
      topicId: 'tree',
      desc: 'Binary search invariants, in/pre/post/level order traversals, AVL height balance.',
    },
    {
      week: 'Module 06',
      title: 'Graph Networks, BFS & DFS Traversals',
      topicId: 'graph',
      desc: 'Adjacency list vs matrix tradeoffs, queue-driven BFS, recursive stack DFS.',
    },
  ];

  return (
    <section id="guide" className={`py-20 border-t ${
      isDark ? 'bg-[#0a0e17] border-slate-800/80 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className={`inline-block px-3 py-1 text-xs font-mono font-medium rounded-full border mb-4 ${
            isDark ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300' : 'border-cyan-200 bg-cyan-50 text-cyan-800'
          }`}>
            ACADEMIC SYLLABUS & MENTAL MODELS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Data Structure Studio Curriculum Guide
          </h2>
          <p className={`mt-3 text-base sm:text-lg leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Built on standard C99/C11 for undergraduate computer science courses, competitive programming, and technical interviews.
          </p>
        </div>

        {/* Academic specs banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">Language Standard</span>
            <div className="text-xl font-bold font-mono">C99 / C11 Standard</div>
            <p className="text-xs text-slate-400 mt-1">POSIX compliant, Valgrind tested, pure ANSI C syntax.</p>
          </div>
          <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-[10px] font-mono text-teal-400 uppercase tracking-wider block mb-1">Target Audience</span>
            <div className="text-xl font-bold font-mono">Undergraduate CS & LeetCode</div>
            <p className="text-xs text-slate-400 mt-1">Demystifies pointers, RAM addresses, and asymptotic big-O proofs.</p>
          </div>
          <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block mb-1">Pedagogical Framework</span>
            <div className="text-xl font-bold font-mono">Visual First + C Code</div>
            <p className="text-xs text-slate-400 mt-1">Spatial memory schematics paired with copy-ready runnable C code.</p>
          </div>
        </div>

        {/* Pointer Mental Models */}
        <div className="mb-14">
          <h3 className="text-xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <span>Foundational C Pointer Mental Models</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pointerPrinciples.map((principle, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border flex flex-col justify-between ${
                  isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 font-bold mb-3">
                    {principle.code}
                  </div>
                  <h4 className="text-base font-bold mb-1.5">{principle.title}</h4>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Modules Roadmap */}
        <div>
          <h3 className="text-xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-400" />
            <span>Curriculum Modules Roadmap</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {syllabus.map((mod, idx) => (
              <div
                key={idx}
                onClick={() => onSelectTopic(mod.topicId)}
                className={`p-6 rounded-2xl border cursor-pointer group transition-all hover:-translate-y-1 hover:border-cyan-500/50 ${
                  isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-cyan-400 font-bold mb-3">
                  <span>{mod.week}</span>
                  <span className="text-[10px] text-slate-500">Core Subject</span>
                </div>
                <h4 className="text-lg font-bold tracking-tight mb-2 group-hover:text-cyan-400 transition-colors">
                  {mod.title}
                </h4>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {mod.desc}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-800/60 text-xs font-semibold text-cyan-400 flex items-center gap-1">
                  <span>Open Deep-Dive</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
