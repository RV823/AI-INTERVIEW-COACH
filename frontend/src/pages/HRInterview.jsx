import React, { useState } from 'react';
import SpeechRecorder from '../components/SpeechRecorder';
import { 
  Users, MessageSquare, Sparkles, CheckCircle2, Award, Heart, HelpCircle, ArrowRight, RefreshCw
} from 'lucide-react';

export default function HRInterview() {
  const hrTopics = [
    { title: '1. Tell Me About Yourself', description: 'Introduce your background, key technical achievements, and career path.' },
    { title: '2. Strengths & Weaknesses', description: 'Articulate your core technical strength and a genuine area for growth with action steps.' },
    { title: '3. Conflict Resolution', description: 'Describe how you handle technical disagreements or team friction using the STAR method.' },
    { title: '4. Leadership & Teamwork', description: 'Share an instance where you mentored a junior engineer or led a successful initiative.' },
    { title: '5. Salary Negotiation', description: 'Respond professionally to compensation queries while maintaining your target value.' },
    { title: '6. Career Goals', description: 'Explain where you see yourself professionally in 3-5 years.' }
  ];

  const [activeTopic, setActiveTopic] = useState(hrTopics[0]);
  const [speechResult, setSpeechResult] = useState(null);

  const handleSpeechComplete = (metrics) => {
    setSpeechResult(metrics);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 bg-pink-500/10 text-pink-400 border border-pink-500/30 px-3.5 py-1 rounded-full text-xs font-semibold">
          <Users className="w-3.5 h-3.5" />
          <span>HR & Behavioral Masterclass</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          HR Interview & <span className="text-gradient">STAR Technique Coach</span>
        </h1>
        <p className="text-sm text-gray-400">
          Master behavioral questions, salary negotiation, leadership stories, and culture fit rounds with instant speech evaluation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Topic List Selector */}
        <div className="glass-card p-6 rounded-3xl border border-gray-800 space-y-3 lg:col-span-1">
          <h3 className="font-bold text-white text-base">Key HR Topics</h3>
          <div className="space-y-2">
            {hrTopics.map((topic, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveTopic(topic);
                  setSpeechResult(null);
                }}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                  activeTopic.title === topic.title
                    ? 'bg-indigo-600/30 border-indigo-500/50 text-white shadow-md'
                    : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <span className="font-bold text-xs block">{topic.title}</span>
                <span className="text-[11px] text-gray-400 block mt-0.5">{topic.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Active Question & Recording Area */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="glass-card p-6 rounded-3xl border border-indigo-500/30 space-y-4">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              Active HR Scenario
            </span>
            <h2 className="text-2xl font-bold text-white leading-relaxed">
              "{activeTopic.title.split('. ')[1]}: {activeTopic.description}"
            </h2>
          </div>

          <SpeechRecorder
            isListening={false}
            setIsListening={() => {}}
            onSpeechComplete={handleSpeechComplete}
          />

          {/* STAR Method AI Feedback Card */}
          <div className="glass-card p-6 rounded-3xl border border-purple-500/30 space-y-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" /> STAR Method Structuring Tips
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-gray-900 border border-gray-800 p-3 rounded-xl">
                <span className="font-bold text-indigo-400 text-xs block">S - Situation</span>
                <span className="text-[10px] text-gray-400">Set the context</span>
              </div>
              <div className="bg-gray-900 border border-gray-800 p-3 rounded-xl">
                <span className="font-bold text-purple-400 text-xs block">T - Task</span>
                <span className="text-[10px] text-gray-400">Define goal</span>
              </div>
              <div className="bg-gray-900 border border-gray-800 p-3 rounded-xl">
                <span className="font-bold text-pink-400 text-xs block">A - Action</span>
                <span className="text-[10px] text-gray-400">Describe steps</span>
              </div>
              <div className="bg-gray-900 border border-gray-800 p-3 rounded-xl">
                <span className="font-bold text-emerald-400 text-xs block">R - Result</span>
                <span className="text-[10px] text-gray-400">Quantify impact</span>
              </div>
            </div>

            {speechResult && (
              <div className="bg-purple-950/30 border border-purple-500/30 p-4 rounded-2xl space-y-2">
                <span className="text-xs font-bold text-purple-300 block">AI Voice Evaluation:</span>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Your response pace was <strong className="text-emerald-400">{speechResult.wpm} WPM</strong> with <strong className="text-amber-400">{speechResult.fillers_count} filler words</strong> detected. Ensure you highlight quantifiable results in your final sentence.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
