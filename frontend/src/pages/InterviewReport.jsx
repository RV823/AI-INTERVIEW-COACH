import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Award, CheckCircle2, AlertTriangle, BookOpen, Briefcase, Download, ArrowRight, Sparkles, Target, Zap, RotateCcw
} from 'lucide-react';

export default function InterviewReport() {
  const location = useLocation();
  const reportData = location.state?.report || {
    overall_score: 88,
    scores: {
      technical_knowledge: 86,
      communication: 92,
      confidence: 88,
      grammar: 90,
      eye_contact: 84,
      speech_rate: 85,
      vocabulary: 88,
      professionalism: 94
    },
    strengths: [
      "Demonstrated strong software design fundamentals and clear articulation",
      "Maintained steady eye contact ratio (84%) and positive posture throughout",
      "Pacing was optimal at 138 words per minute with low filler usage"
    ],
    weaknesses: [
      "Could elaborate more on system design edge cases and trade-offs",
      "Occasional use of filler phrases like 'you know' during complex technical questions"
    ],
    improvement_plan: [
      "Practice the STAR method (Situation, Task, Action, Result) for behavioral scenarios",
      "Review distributed caching strategies (Redis/Memcached) for technical rounds",
      "Do 2 additional mock sessions in Advanced mode"
    ],
    suggested_courses: [
      "System Design Interview Bootcamp for Engineers",
      "Executive Technical Communication & Public Speaking"
    ],
    recommended_projects: [
      "Build a Distributed Microservices Rate Limiter in Python/Go",
      "Implement a Real-Time WebSocket Analytics Pipeline"
    ]
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 print:p-0">
      
      {/* Printable Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-800 pb-6 print:hidden">
        <div>
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Feedback Report Compiled</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-2">
            Interview Performance Evaluation
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-semibold text-xs border border-gray-700 flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF Report</span>
          </button>

          <Link
            to="/interview"
            className="glass-button text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retry Interview</span>
          </Link>
        </div>
      </div>

      {/* Main Score Hero Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-indigo-500/30 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        
        {/* Overall Score Dial */}
        <div className="text-center space-y-2 md:border-r border-gray-800 pr-4">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Overall Readiness Score</span>
          <div className="text-5xl font-extrabold text-gradient">{reportData.overall_score}/100</div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 inline-block">
            Strong Candidate Pass
          </span>
        </div>

        {/* Highlight Summary */}
        <div className="md:col-span-2 space-y-2">
          <h3 className="text-lg font-bold text-white">Executive AI Evaluation Summary</h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            Candidate demonstrated robust technical understanding for {location.state?.role || 'Software Engineer'} role. Communication style was confident with consistent eye-contact and optimal speaking cadence.
          </p>
        </div>

      </div>

      {/* 8 Dimension Scores Grid */}
      <div className="space-y-4">
        <h3 className="font-bold text-white text-lg">Detailed Category Performance</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { title: 'Technical Knowledge', score: reportData.scores?.technical_knowledge || 86, color: 'text-indigo-400' },
            { title: 'Communication', score: reportData.scores?.communication || 92, color: 'text-emerald-400' },
            { title: 'Confidence Index', score: reportData.scores?.confidence || 88, color: 'text-purple-400' },
            { title: 'Grammar Accuracy', score: reportData.scores?.grammar || 90, color: 'text-blue-400' },
            { title: 'Eye Contact Ratio', score: reportData.scores?.eye_contact || 84, color: 'text-pink-400' },
            { title: 'Speech Rate (WPM)', score: reportData.scores?.speech_rate || 85, color: 'text-amber-400' },
            { title: 'Vocabulary Score', score: reportData.scores?.vocabulary || 88, color: 'text-cyan-400' },
            { title: 'Professionalism', score: reportData.scores?.professionalism || 94, color: 'text-teal-400' },
          ].map((item) => (
            <div key={item.title} className="glass-card p-4 rounded-2xl border border-gray-800 space-y-2">
              <span className="text-xs text-gray-400 font-medium block">{item.title}</span>
              <div className="flex items-baseline justify-between">
                <span className={`text-2xl font-extrabold ${item.color}`}>{item.score}%</span>
                <div className="w-16 bg-gray-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${item.score}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Strengths */}
        <div className="glass-card p-6 rounded-3xl border border-emerald-500/30 space-y-4">
          <h4 className="font-bold text-emerald-400 text-base flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> Verified Candidate Strengths
          </h4>
          <div className="space-y-2.5">
            {reportData.strengths?.map((s, i) => (
              <div key={i} className="flex items-start space-x-2 text-xs text-gray-200 bg-emerald-950/20 border border-emerald-500/20 p-3 rounded-xl">
                <span className="text-emerald-400 font-bold">•</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weaknesses & Areas for Growth */}
        <div className="glass-card p-6 rounded-3xl border border-amber-500/30 space-y-4">
          <h4 className="font-bold text-amber-400 text-base flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Target Areas for Growth
          </h4>
          <div className="space-y-2.5">
            {reportData.weaknesses?.map((w, i) => (
              <div key={i} className="flex items-start space-x-2 text-xs text-gray-200 bg-amber-950/20 border border-amber-500/20 p-3 rounded-xl">
                <span className="text-amber-400 font-bold">•</span>
                <span>{w}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Actionable Improvement Plan & Recommended Courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="glass-card p-6 rounded-3xl border border-indigo-500/30 space-y-4">
          <h4 className="font-bold text-white text-base flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-400" /> Actionable 7-Day Improvement Plan
          </h4>
          <div className="space-y-2.5">
            {reportData.improvement_plan?.map((step, i) => (
              <div key={i} className="flex items-start space-x-3 bg-gray-900 border border-gray-800 p-3 rounded-xl text-xs text-gray-300">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-purple-500/30 space-y-4">
          <h4 className="font-bold text-white text-base flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" /> Recommended Courses & Projects
          </h4>
          <div className="space-y-3">
            <div>
              <span className="text-xs text-gray-400 font-semibold uppercase block mb-1.5">Courses</span>
              {reportData.suggested_courses?.map((c, i) => (
                <div key={i} className="text-xs font-semibold text-purple-300 bg-purple-950/30 border border-purple-500/20 p-2.5 rounded-xl mb-1.5">
                  {c}
                </div>
              ))}
            </div>
            <div>
              <span className="text-xs text-gray-400 font-semibold uppercase block mb-1.5">Portfolio Projects</span>
              {reportData.recommended_projects?.map((p, i) => (
                <div key={i} className="text-xs font-semibold text-indigo-300 bg-indigo-950/30 border border-indigo-500/20 p-2.5 rounded-xl mb-1.5">
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
