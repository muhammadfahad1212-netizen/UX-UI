
import React, { useState } from 'react';
import { curriculum } from './data/curriculum';
import { Week, Topic } from './types';
import { getTopicExplanation } from './services/gemini';

const App: React.FC = () => {
  const [weeks, setWeeks] = useState<Week[]>(curriculum);
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([1]); // Default week 1 expanded
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleWeek = (id: number) => {
    setExpandedWeeks(prev => 
      prev.includes(id) ? prev.filter(wId => wId !== id) : [...prev, id]
    );
  };

  const toggleTopicCompletion = (weekId: number, topicId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWeeks(prev => prev.map(week => {
      if (week.id === weekId) {
        return {
          ...week,
          topics: week.topics.map(topic => 
            topic.id === topicId ? { ...topic, completed: !topic.completed } : topic
          )
        };
      }
      return week;
    }));
  };

  const handleExplainTopic = async (topicTitle: string) => {
    setSelectedTopic(topicTitle);
    setExplanation(null);
    setIsLoading(true);
    const result = await getTopicExplanation(topicTitle);
    setExplanation(result);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen main-gradient text-white selection:bg-[#0047ff]/30">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Curriculum Sections */}
        <div className="lg:col-span-7 space-y-6">
          <div className="mb-10 px-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-4 bg-[#0047ff] rounded-sm"></div>
              <span className="text-sm font-bold tracking-[0.3em] text-[#0047ff] uppercase">Curriculum</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">UX/UI Mastery</h1>
          </div>

          {weeks.map((week) => {
            const isExpanded = expandedWeeks.includes(week.id);
            return (
              <div key={week.id} className="glass-card rounded-2xl overflow-hidden transition-all duration-300">
                <div 
                  className="p-8 flex items-center justify-between cursor-pointer group/header"
                  onClick={() => toggleWeek(week.id)}
                >
                  <div>
                    <h3 className="text-xl font-bold mb-1 group-hover/header:text-[#0047ff] transition-colors">{week.subtitle}</h3>
                    <p className="text-xs text-gray-500 font-medium">
                      {week.topics.length} Lessons • {Math.floor(week.topics.length * 1.5)} Resources • {week.id * 2} Hours
                    </p>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover/header:bg-white/10 transition-all">
                    {isExpanded ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
                      </svg>
                    )}
                  </button>
                </div>

                {isExpanded && (
                  <div className="px-8 pb-8 space-y-3 animate-in slide-in-from-top-2 duration-300">
                    {week.topics.map((topic) => (
                      <div 
                        key={topic.id}
                        onClick={() => handleExplainTopic(topic.title)}
                        className={`group flex items-center gap-5 p-4 rounded-xl cursor-pointer hover:bg-white/5 transition-all border border-transparent hover:border-white/10 ${topic.completed ? 'opacity-40' : ''}`}
                      >
                        <div 
                          className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 group-hover:bg-[#0047ff] transition-all shadow-lg`}
                          onClick={(e) => toggleTopicCompletion(week.id, topic.id, e)}
                        >
                          {topic.completed ? (
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-white fill-current" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className={`text-sm font-medium ${topic.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                            {topic.title}
                          </h4>
                          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">01:03:00</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right: CTA Sidebar */}
        <div className="lg:col-span-5">
          <div className="glass-card rounded-[32px] p-10 sticky top-16 overflow-hidden">
            {/* Subtle glow effect behind the content */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#0047ff]/10 blur-[100px] pointer-events-none -z-10"></div>
            
            <span className="text-[10px] font-extrabold text-[#0047ff] tracking-[0.25em] uppercase mb-6 block">
              TRANSFORM YOUR CAREER
            </span>
            
            <h2 className="text-4xl font-black tracking-tighter mb-6 leading-[1.1]">
              Unlock Your Potential as a Elite Designer
            </h2>
            
            <p className="text-gray-400 text-sm leading-relaxed mb-10 font-normal">
              Go beyond simple tools. This masterclass is designed to turn you into a product thinker capable of solving complex problems for global brands. Gain the confidence to lead design teams and ship world-class products.
            </p>

            <div className="space-y-4">
              <button className="w-full bg-[#0047ff] hover:bg-blue-600 active:scale-[0.98] py-5 rounded-2xl text-sm font-bold transition-all shadow-xl shadow-[#0047ff]/30">
                Join the Masterclass
              </button>
              <button className="w-full bg-white/5 hover:bg-white/10 active:scale-[0.98] py-5 rounded-2xl text-sm font-bold transition-all border border-white/10">
                Start Learning Now
              </button>
            </div>
            
            <div className="mt-10 pt-8 border-t border-white/5 flex flex-wrap gap-4 justify-center">
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold">40+</span>
                <span className="text-[9px] text-gray-500 uppercase font-black">Lessons</span>
              </div>
              <div className="w-px h-8 bg-white/5"></div>
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold">100+</span>
                <span className="text-[9px] text-gray-500 uppercase font-black">Assets</span>
              </div>
              <div className="w-px h-8 bg-white/5"></div>
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold">8</span>
                <span className="text-[9px] text-gray-500 uppercase font-black">Weeks</span>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2">
               <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0a0a0f] bg-gray-600" />
                 ))}
               </div>
               <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Join 5k+ Students</span>
            </div>
          </div>
        </div>
      </main>

      {/* AI Explanation Overlay */}
      {selectedTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="glass-card w-full max-w-xl p-12 rounded-[48px] shadow-2xl relative border border-white/15">
            <button 
              onClick={() => setSelectedTopic(null)}
              className="absolute top-10 right-10 p-3 rounded-full hover:bg-white/5 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-[#0047ff] rounded-full animate-pulse"></div>
                <span className="text-[11px] font-black text-[#0047ff] uppercase tracking-[0.3em] block">Mentor Insights</span>
              </div>
              <h4 className="text-4xl font-extrabold text-white tracking-tight">{selectedTopic}</h4>
            </div>

            <div className="min-h-[140px] flex flex-col justify-center">
              {isLoading ? (
                <div className="space-y-4">
                  <div className="h-5 bg-white/5 rounded-full w-full animate-pulse" />
                  <div className="h-5 bg-white/5 rounded-full w-11/12 animate-pulse" />
                  <div className="h-5 bg-white/5 rounded-full w-4/5 animate-pulse" />
                </div>
              ) : (
                <div className="text-gray-300 text-lg leading-relaxed font-light">
                  {explanation}
                </div>
              )}
            </div>

            <button 
              onClick={() => setSelectedTopic(null)}
              className="mt-12 w-full py-5 bg-white text-black text-sm font-black rounded-3xl hover:bg-gray-200 transition-all active:scale-[0.99]"
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
