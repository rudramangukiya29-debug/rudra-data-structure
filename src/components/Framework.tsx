import React from 'react';
import { Check } from 'lucide-react';

interface FrameworkProps {
  isDark: boolean;
}

export const Framework: React.FC<FrameworkProps> = ({ isDark }) => {
  const steps = [
    {
      stepBadge: 'STEP 01 • MEMORY MODELS',
      title: 'Spatial Memory Math',
      description:
        'Learn how physical RAM addresses are calculated. Trace base addresses and offsets for 1D and 2D row-major matrices using live calculators.',
      points: [
        '1D & 2D Address Calculators',
        'Locker Hallway Analogy Tracing',
        'Row-Major vs Column-Major Layouts',
      ],
    },
    {
      stepBadge: 'STEP 02 • PRACTICE ARENA',
      title: 'Visual Step Simulators',
      description:
        'Interact with live visualizer canvases in Practice Arena. Step through insertions, deletions, push/pop operations, and tree rotations at your own pace.',
      points: [
        'Live Array Access, Insert, Delete',
        'Bubble, Selection & Insertion Sorting',
        'Real-Time Step-by-Step Execution Logs',
      ],
    },
    {
      stepBadge: 'STEP 03 • CODE & QUIZZES',
      title: 'Implementation & Self-Check',
      description:
        'Inspect clean, commented C code. Review line-by-line annotated walkthroughs and test your intuition with interactive quizzes.',
      points: [
        'Copy-Ready C99 Standard Code',
        'Annotated Interactive Code Cards',
        'Instant Self-Grading Quizzes',
      ],
    },
  ];

  return (
    <section className={`py-20 border-t ${
      isDark ? 'bg-[#0b0f19] border-slate-800/80' : 'bg-white border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className={`inline-block px-3 py-1 text-xs font-mono font-medium rounded-full border mb-4 ${
            isDark ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300' : 'border-cyan-200 bg-cyan-50 text-cyan-800'
          }`}>
            STUDENT LEARNING PATH
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Practice Arena Framework
          </h2>
          <p className={`mt-4 text-base sm:text-lg leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            A structured 3-phase methodology designed to turn abstract concepts into confident implementation
            and problem-solving skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
                isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div>
                <span className="inline-block text-[11px] font-mono text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 rounded-md mb-4 font-semibold">
                  {step.stepBadge}
                </span>
                <h3 className="text-xl font-bold tracking-tight mb-3">
                  {step.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {step.description}
                </p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-slate-800/50">
                {step.points.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-2 text-xs">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
