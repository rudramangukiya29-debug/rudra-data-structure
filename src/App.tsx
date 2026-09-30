import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhyVisual } from './components/WhyVisual';
import { Framework } from './components/Framework';
import { TopicsLibrary } from './components/TopicsLibrary';
import { TopicDetail } from './components/TopicDetail';
import { PracticeArena } from './components/arena/PracticeArena';
import { ComplexityMatrix } from './components/ComplexityMatrix';
import { CourseGuide } from './components/CourseGuide';
import { Footer } from './components/Footer';
import { TopicId } from './types';

export default function App() {
  const [activeView, setActiveView] = useState<string>('overview');
  const [selectedTopic, setSelectedTopic] = useState<TopicId | null>(null);
  const [arenaInitialTopic, setArenaInitialTopic] = useState<TopicId | 'sorting'>('tree');
  const [isDark, setIsDark] = useState<boolean>(true);

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopic(topicId as TopicId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenArenaForTopic = (topicId: TopicId) => {
    setSelectedTopic(null);
    setArenaInitialTopic(topicId);
    setActiveView('arena');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavChange = (view: string) => {
    setSelectedTopic(null);
    setActiveView(view);
    if (view === 'overview') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(view);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDark ? 'bg-[#0b0f19] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Top Bar Navigation */}
      <Header
        activeView={selectedTopic ? 'topics' : activeView}
        setActiveView={handleNavChange}
        isDark={isDark}
        setIsDark={setIsDark}
        onSelectTopic={handleSelectTopic}
      />

      {/* Main Content Area */}
      <main>
        {selectedTopic ? (
          <TopicDetail
            topicId={selectedTopic}
            onBack={() => setSelectedTopic(null)}
            onOpenArenaForTopic={handleOpenArenaForTopic}
            isDark={isDark}
          />
        ) : activeView === 'arena' ? (
          <PracticeArena
            initialTopic={arenaInitialTopic}
            isDark={isDark}
          />
        ) : activeView === 'complexity' ? (
          <div className="py-6">
            <ComplexityMatrix isDark={isDark} />
          </div>
        ) : activeView === 'guide' ? (
          <div className="py-6">
            <CourseGuide isDark={isDark} onSelectTopic={handleSelectTopic} />
          </div>
        ) : (
          <>
            {/* Overview / Full Landing Flow */}
            <Hero
              onBrowseTopics={() => {
                const el = document.getElementById('topics');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenArena={() => {
                setActiveView('arena');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenComplexity={() => {
                setActiveView('complexity');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectTopic={handleSelectTopic}
              isDark={isDark}
            />

            <WhyVisual isDark={isDark} />

            <Framework isDark={isDark} />

            <TopicsLibrary onSelectTopic={handleSelectTopic} isDark={isDark} />

            <ComplexityMatrix isDark={isDark} />

            <CourseGuide isDark={isDark} onSelectTopic={handleSelectTopic} />
          </>
        )}
      </main>

      {/* Clean Footer */}
      <Footer setActiveView={handleNavChange} isDark={isDark} />
    </div>
  );
}
