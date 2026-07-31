import React, { useState } from 'react';
import { fetchCareerRoadmap } from '../services/api';
import { 
  Briefcase, Compass, Award, BookOpen, Sparkles, CheckCircle2, ArrowRight, RefreshCw, Layers
} from 'lucide-react';

export default function CareerAdvisor() {
  const [targetRole, setTargetRole] = useState('Software Engineer');
  const [experienceLevel, setExperienceLevel] = useState('Intermediate');
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState(null);

  const handleGenerateRoadmap = async () => {
    setLoading(true);
    try {
      const res = await fetchCareerRoadmap({ target_role: targetRole, experience_level: experienceLevel });
      setRoadmap(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 bg-blue-500/10 text-blue-400 border border-blue-500/30 px-3.5 py-1 rounded-full text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>Personalized AI Career Guidance & Roadmap</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          AI Career Advisor & <span className="text-gradient">Skill Gap Roadmap</span>
        </h1>
        <p className="text-sm text-gray-400">
          Generate an actionable 6-month career execution plan tailored to your target position and experience level.
        </p>
      </div>

      {/* Control Selector Card */}
      <div className="glass-card p-6 rounded-3xl border border-gray-800 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-300 uppercase tracking-wide">Target Role</label>
          <select
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-gray-200 outline-none focus:border-indigo-500"
          >
            <option value="Software Engineer">Software Engineer</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="AI Engineer">AI Engineer</option>
            <option value="Web Developer">Web Developer</option>
            <option value="Product Manager">Product Manager</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-300 uppercase tracking-wide">Experience Level</label>
          <select
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-gray-200 outline-none focus:border-indigo-500"
          >
            <option value="Beginner / Student">Beginner / Student</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Senior Lead">Senior Lead</option>
          </select>
        </div>

        <button
          onClick={handleGenerateRoadmap}
          disabled={loading}
          className="glass-button text-white py-2.5 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 glow-primary"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          <span>{loading ? "Generating Roadmap..." : "Generate 6-Month Roadmap"}</span>
        </button>
      </div>

      {/* Output Roadmap Timeline */}
      {roadmap && (
        <div className="space-y-8">
          
          {/* Summary Card */}
          <div className="glass-card p-6 rounded-3xl border border-indigo-500/30 space-y-2">
            <h3 className="text-xl font-bold text-white">Roadmap for {roadmap.target_role}</h3>
            <p className="text-xs text-gray-300 leading-relaxed">{roadmap.summary}</p>
          </div>

          {/* Phase Milestone Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roadmap.phases?.map((phase, idx) => (
              <div key={idx} className="glass-card p-6 rounded-3xl border border-gray-800 space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                    {phase.month}
                  </span>
                  <Layers className="w-5 h-5 text-gray-600" />
                </div>

                <h4 className="font-bold text-white text-base">{phase.title}</h4>

                <div className="space-y-2">
                  {phase.milestones?.map((m, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Key Skills & Recommended Portals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-3xl border border-purple-500/30 space-y-3">
              <h4 className="font-bold text-white text-base flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-400" /> Essential Skills & Certifications
              </h4>
              <div className="flex flex-wrap gap-2">
                {roadmap.key_skills_to_learn?.map((skill, i) => (
                  <span key={i} className="bg-purple-500/15 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full text-xs font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-blue-500/30 space-y-3">
              <h4 className="font-bold text-white text-base flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-400" /> Top Hiring & Internship Portals
              </h4>
              <div className="flex flex-wrap gap-2">
                {roadmap.internship_or_job_portals?.map((portal, i) => (
                  <span key={i} className="bg-blue-500/15 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-semibold">
                    {portal}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
