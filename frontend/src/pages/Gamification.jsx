import React, { useEffect, useState } from 'react';
import { fetchGamificationStats } from '../services/api';
import { 
  Award, Flame, Target, CheckCircle2, Trophy, Crown, Sparkles, Zap, Users, Code, FileText, Mic
} from 'lucide-react';

export default function Gamification() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetchGamificationStats();
        setData(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    loadStats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-xs font-semibold">
            <Trophy className="w-3.5 h-3.5" />
            <span>Gamification & XP Leaderboard</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            Level {data?.user?.level || 3} Interview Master
          </h1>
          <p className="text-xs text-gray-300">
            Earn XP for practicing mock interviews, scanning resumes, and solving coding problems. Maintain your streak to climb the global leaderboard!
          </p>
        </div>

        {/* Level XP Bar */}
        <div className="w-full md:w-72 bg-gray-900 border border-gray-800 p-4 rounded-2xl space-y-2 z-10">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-gray-300">XP Progress</span>
            <span className="text-amber-400">{data?.user?.xp || 450} / 600 XP</span>
          </div>
          <div className="w-full bg-gray-800 h-2.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-indigo-500 h-full rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Daily Challenges & Badges */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Daily Challenges */}
          <div className="glass-card p-6 rounded-3xl border border-gray-800 space-y-4">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" /> Today's Daily Challenges
            </h3>

            <div className="space-y-3">
              {data?.daily_challenges?.map((c) => (
                <div key={c.id} className="flex items-center justify-between bg-gray-950 border border-gray-800 p-4 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className={`w-5 h-5 ${c.completed ? 'text-emerald-400' : 'text-gray-600'}`} />
                    <span className={`text-xs font-bold ${c.completed ? 'text-gray-200 line-through opacity-75' : 'text-white'}`}>
                      {c.title}
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    +{c.xp_reward} XP
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="glass-card p-6 rounded-3xl border border-gray-800 space-y-4">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-400" /> Unlockable Achievement Badges
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {data?.badges?.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${
                    badge.unlocked
                      ? 'bg-gradient-to-b from-indigo-900/40 to-slate-900/60 border-indigo-500/40 glow-primary'
                      : 'bg-gray-950/60 border-gray-800 opacity-50 grayscale'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center mx-auto">
                    <Award className="w-5 h-5 text-indigo-300" />
                  </div>
                  <span className="font-bold text-xs text-white block">{badge.title}</span>
                  <span className="text-[10px] text-gray-400 block leading-tight">{badge.description}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                    badge.unlocked ? 'bg-emerald-500/20 text-emerald-300' : 'bg-gray-800 text-gray-400'
                  }`}>
                    {badge.unlocked ? 'Unlocked' : 'Locked'}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Global Leaderboard */}
        <div className="glass-card p-6 rounded-3xl border border-gray-800 space-y-4 lg:col-span-1">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-400" /> Global Leaderboard
            </h3>
            <span className="text-xs text-gray-400">Weekly Top 5</span>
          </div>

          <div className="space-y-3">
            {data?.leaderboard?.map((user) => (
              <div
                key={user.rank}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                  user.rank === 3
                    ? 'bg-indigo-600/20 border-indigo-500/40 shadow-sm'
                    : 'bg-gray-950 border-gray-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center ${
                    user.rank === 1 ? 'bg-amber-500 text-black' :
                    user.rank === 2 ? 'bg-gray-300 text-black' :
                    user.rank === 3 ? 'bg-amber-700 text-white' :
                    'bg-gray-800 text-gray-400'
                  }`}>
                    {user.rank}
                  </span>

                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-gray-700" />

                  <div>
                    <span className="font-bold text-xs text-white block">{user.name}</span>
                    <span className="text-[10px] text-gray-400">Lvl {user.level} • {user.streak}🔥 streak</span>
                  </div>
                </div>

                <span className="text-xs font-extrabold text-amber-400">{user.xp} XP</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
