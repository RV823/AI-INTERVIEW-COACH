import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, XAxis, YAxis, Tooltip
} from 'recharts';
import { 
  Bot, Flame, Award, Video, FileText, Code, CheckCircle2, ArrowRight, Target, Sparkles, Building2, TrendingUp
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const radarData = [
    { subject: 'Technical', A: 88, fullMark: 100 },
    { subject: 'Communication', A: 92, fullMark: 100 },
    { subject: 'Confidence', A: 85, fullMark: 100 },
    { subject: 'Grammar', A: 90, fullMark: 100 },
    { subject: 'Eye Contact', A: 82, fullMark: 100 },
    { subject: 'Speech Pace', A: 86, fullMark: 100 },
    { subject: 'Vocabulary', A: 84, fullMark: 100 },
    { subject: 'Professionalism', A: 94, fullMark: 100 },
  ];

  const trendData = [
    { session: 'Session 1', score: 68 },
    { session: 'Session 2', score: 74 },
    { session: 'Session 3', score: 82 },
    { session: 'Session 4', score: 85 },
    { session: 'Session 5', score: 91 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-6">
      
      {/* Welcome Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Target Role: {user?.target_role || 'Software Engineer'}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            Welcome back, <span className="text-gradient">{user?.name || 'Alex'}</span>! 👋
          </h1>
          <p className="text-sm text-gray-300 max-w-xl">
            You're on a <strong className="text-amber-400 font-bold">{user?.streak || 5}-Day Practice Streak</strong>. Your overall readiness score increased by <strong className="text-emerald-400">+14% this week</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <Link
            to="/interview"
            className="glass-button text-white px-5 py-3 rounded-2xl text-sm font-bold flex items-center space-x-2 glow-primary"
          >
            <Video className="w-4 h-4" />
            <span>Start Mock Interview</span>
          </Link>

          <Link
            to="/resume"
            className="px-5 py-3 rounded-2xl bg-gray-800/80 hover:bg-gray-800 text-gray-200 border border-gray-700 text-sm font-semibold flex items-center space-x-2"
          >
            <FileText className="w-4 h-4 text-indigo-400" />
            <span>Scan Resume</span>
          </Link>
        </div>
      </div>

      {/* Overview Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-card p-5 rounded-2xl border border-gray-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 uppercase font-semibold">Overall Readiness</span>
            <Target className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white">88%</span>
            <span className="text-xs font-semibold text-emerald-400">+5% vs last week</span>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-gray-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 uppercase font-semibold">Practice Streak</span>
            <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-amber-400">{user?.streak || 5} Days</span>
            <span className="text-xs font-semibold text-gray-400">Streak active</span>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-gray-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 uppercase font-semibold">ATS Resume Score</span>
            <FileText className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-emerald-400">86/100</span>
            <span className="text-xs font-semibold text-emerald-400">ATS Optimized</span>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-gray-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 uppercase font-semibold">XP & Level</span>
            <Award className="w-5 h-5 text-purple-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-purple-300">Level {user?.level || 3}</span>
            <span className="text-xs font-semibold text-gray-400">({user?.xp || 450} XP)</span>
          </div>
        </div>

      </div>

      {/* Analytics Radar & Trend Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Radar Chart Card */}
        <div className="glass-card p-6 rounded-3xl border border-gray-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-lg">8-Dimension Skill Breakdown</h3>
            <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">AI Analytics</span>
          </div>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="subject" stroke="#9ca3af" tick={{ fill: '#d1d5db', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#4b5563" />
                <Radar name="Candidate Skill" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Growth Trend */}
        <div className="glass-card p-6 rounded-3xl border border-gray-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-lg">Interview Readiness Trend</h3>
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">+33% Growth</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <XAxis dataKey="session" stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                <YAxis domain={[50, 100]} stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '12px', color: '#fff' }} />
                <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Top Company Question Shortcuts */}
      <div className="glass-card p-6 rounded-3xl border border-gray-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-white text-lg">Target Top Tech Companies</h3>
          </div>
          <Link to="/company-prep" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1">
            <span>View All Company Banks</span> <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { name: 'Google', count: '45 Questions', color: 'from-blue-500/20 to-green-500/20 border-blue-500/30' },
            { name: 'Meta', count: '38 Questions', color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30' },
            { name: 'Amazon', count: '52 Questions', color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30' },
            { name: 'Microsoft', count: '40 Questions', color: 'from-teal-500/20 to-emerald-500/20 border-teal-500/30' },
            { name: 'Apple', count: '32 Questions', color: 'from-gray-500/20 to-slate-500/20 border-gray-500/30' },
            { name: 'Netflix', count: '28 Questions', color: 'from-red-500/20 to-pink-500/20 border-red-500/30' },
          ].map((c) => (
            <Link
              key={c.name}
              to="/company-prep"
              className={`p-3 rounded-2xl bg-gradient-to-br ${c.color} border hover:scale-105 transition-transform text-center space-y-1`}
            >
              <span className="font-bold text-white block text-sm">{c.name}</span>
              <span className="text-[11px] text-gray-400 block">{c.count}</span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
