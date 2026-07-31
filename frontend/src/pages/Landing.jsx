import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, Video, FileText, Code, Award, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Zap, TrendingUp, Users, Play
} from 'lucide-react';

export default function Landing() {
  return (
    <div className="space-y-24 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 text-center overflow-hidden">
        
        {/* Glow Spheres Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-indigo-600/30 via-purple-600/30 to-pink-500/20 blur-3xl -z-10 rounded-full"></div>

        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Next-Gen AI Mock Interviews & Resume ATS Analyzer</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Ace Your Tech & HR Interviews with <span className="text-gradient">Real-Time AI Coaching</span>
          </h1>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Practice realistic mock interviews with an interactive AI avatar, get live face & speech feedback, optimize your resume ATS score, and solve coding challenges with instant AI hints.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/interview"
              className="glass-button text-white px-8 py-3.5 rounded-2xl font-bold text-base flex items-center space-x-2 glow-primary w-full sm:w-auto justify-center"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Start Free AI Mock Interview</span>
            </Link>

            <Link
              to="/resume"
              className="px-8 py-3.5 rounded-2xl bg-gray-800/80 hover:bg-gray-800 text-gray-200 border border-gray-700 font-semibold text-base flex items-center space-x-2 w-full sm:w-auto justify-center transition-colors"
            >
              <FileText className="w-5 h-5 text-indigo-400" />
              <span>Analyze Resume ATS</span>
            </Link>
          </div>

          {/* Social Proof Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 border-t border-gray-800/60 max-w-3xl mx-auto">
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-indigo-400 block">94%</span>
              <span className="text-xs text-gray-400">Offer Success Rate</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 block">50,000+</span>
              <span className="text-xs text-gray-400">Interviews Practiced</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-pink-400 block">0.2s</span>
              <span className="text-xs text-gray-400">Real-Time AI Response</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 block">4.9/5</span>
              <span className="text-xs text-gray-400">User Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-bold text-white">Complete 360° AI Interview Preparation</h2>
          <p className="text-gray-400 text-sm">Everything you need to transform from nervous candidate to confident hire.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass-card p-6 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center">
              <Video className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white">AI Avatar Mock Interview</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Engage with an interactive AI interviewer. Choose Software Engineer, Data Analyst, AI Engineer, or PM roles with adaptive follow-up questions.
            </p>
            <Link to="/interview" className="inline-flex items-center space-x-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300">
              <span>Try Mock Interview</span> <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center">
              <Zap className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Speech & Face Expression AI</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Webcam eye-contact detection, smile tracking, posture analysis, speaking pace (WPM), and live filler word ("um", "like") counter.
            </p>
            <Link to="/interview" className="inline-flex items-center space-x-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300">
              <span>View Speech Analytics</span> <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-pink-600/20 border border-pink-500/40 flex items-center justify-center">
              <FileText className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="text-xl font-bold text-white">ATS Resume Analyzer</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Upload your PDF/DOCX resume for an instant 0–100 ATS score, missing skills highlights, bullet improver, and custom interview questions.
            </p>
            <Link to="/resume" className="inline-flex items-center space-x-1 text-xs font-semibold text-pink-400 hover:text-pink-300">
              <span>Scan Resume Now</span> <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center">
              <Code className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Coding Interview Sandbox</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Solve DSA problems in Python, JS, C++, or Java with test cases, AI hint assistant, and instant O(N) time/space complexity analysis.
            </p>
            <Link to="/coding" className="inline-flex items-center space-x-1 text-xs font-semibold text-purple-400 hover:text-purple-300">
              <span>Open Code Sandbox</span> <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center">
              <Award className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Gamification & Streak</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Earn XP points, unlock achievement badges, maintain practice streaks, complete daily challenges, and rank on the global leaderboard.
            </p>
            <Link to="/gamification" className="inline-flex items-center space-x-1 text-xs font-semibold text-amber-400 hover:text-amber-300">
              <span>View Leaderboard</span> <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white">AI Career Roadmap</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Get personalized 6-month career roadmaps, skill gap analysis, recommended certifications, and internship opportunities tailored to your role.
            </p>
            <Link to="/career" className="inline-flex items-center space-x-1 text-xs font-semibold text-blue-400 hover:text-blue-300">
              <span>Generate Roadmap</span> <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
