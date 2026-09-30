import React from 'react';
import { Brain, Zap, Laptop, Target } from 'lucide-react';

interface WhyVisualProps {
  isDark: boolean;
}

export const WhyVisual: React.FC<WhyVisualProps> = ({ isDark }) => {
  const features = [
    {
      icon: Brain,
      title: 'Spatial Memory Layout',
      description:
        'See contiguous RAM cells versus scattered heap nodes in real time. Grasp base addresses, byte offsets, and memory alignment naturally.',
      tag: 'Contiguous vs Scattered',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10 border-cyan-500/30',
      tagColor: 'text-cyan-400',
    },
    {
      icon: Zap,
      title: 'Big-O Made Simple',
      description:
        'Understand why an index lookup is instantaneous O(1) and why linear scans require O(n) traversals before writing a single line of code.',
      tag: 'Algorithmic Performance',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10 border-amber-500/30',
      tagColor: 'text-amber-400',
    },
    {
      icon: Laptop,
      title: 'Pointers Without Fear',
      description:
        'Master malloc(), free(), pointer arithmetic, and struct chaining in standard C with zero intimidation and zero memory leaks.',
      tag: 'Pure Standard C99 / C11',
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/10 border-teal-500/30',
      tagColor: 'text-teal-400',
    },
    {
      icon: Target,
      title: 'Exam & Career Ready',
      description:
        'Retain foundational mental models that make university midterms, exams, and competitive programming problems click smoothly.',
      tag: 'Academic & Student Focused',
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/10 border-rose-500/30',
      tagColor: 'text-rose-400',
    },
  ];

  return (
    <section id="why-visual" className={`py-20 border-t ${
      isDark ? 'bg-[#0a0e17] border-slate-800/80' : 'bg-slate-50/50 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className={`inline-block px-3 py-1 text-xs font-mono font-medium rounded-full border mb-4 ${
            isDark ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300' : 'border-cyan-200 bg-cyan-50 text-cyan-800'
          }`}>
            INTUITIVE CONCEPT BREAKDOWNS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Why Visual Learning?
          </h2>
          <p className={`mt-4 text-base sm:text-lg leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Code makes far more sense when you can picture what happens inside system memory. Visualizing
            layouts and pointer movements eliminates guesswork.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl border flex flex-col justify-between transition-all hover:-translate-y-1 ${
                  isDark
                    ? 'bg-[#0f172a] border-slate-800 hover:border-slate-700 shadow-lg'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${feature.bgColor}`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight mb-2.5">
                    {feature.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60">
                  <span className={`text-xs font-mono font-medium tracking-wide ${feature.tagColor}`}>
                    {feature.tag}
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
