import React, { useState } from 'react';
import { analyzeResumeText, analyzeResume } from '../services/api';
import { 
  FileText, Upload, Sparkles, AlertTriangle, CheckCircle2, Award, Briefcase, BookOpen, ArrowRight, RefreshCw, Zap
} from 'lucide-react';

export default function ResumeAnalyzer() {
  const [targetRole, setTargetRole] = useState('Software Engineer');
  const [resumeText, setResumeText] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('target_role', targetRole);
        const res = await analyzeResume(formData);
        setAnalysis(res.data.data);
      } else {
        const res = await analyzeResumeText({ resume_text: resumeText || defaultSampleResume, target_role: targetRole });
        setAnalysis(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const defaultSampleResume = `Alex Johnson | Alex@example.com | GitHub: github.com/alex | LinkedIn: linkedin.com/in/alex

SUMMARY:
Passionate Software Engineer with 2+ years of experience building web applications using Python, JavaScript, and React. Built REST APIs and worked with MongoDB databases.

EXPERIENCE:
Software Developer Intern - TechCorp (2024 - Present)
- Worked on React frontend application for customer dashboard.
- Created backend APIs in Python Flask for data processing.
- Collaborated with team in Agile sprint meetings.

PROJECTS:
E-Commerce Microservices App
- Designed shopping cart service using Node.js and MongoDB.
- Deployed on Vercel with responsive Tailwind CSS frontend.

SKILLS:
Languages: Python, JavaScript, HTML5, CSS3, SQL
Frameworks: React, Flask, Node.js, Express
Tools: Git, VS Code, Postman`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 bg-pink-500/10 text-pink-400 border border-pink-500/30 px-3.5 py-1 rounded-full text-xs font-semibold">
          <FileText className="w-3.5 h-3.5" />
          <span>AI Resume ATS Scanner & Question Generator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Optimize Your Resume for <span className="text-gradient">ATS & Top Recruiters</span>
        </h1>
        <p className="text-sm text-gray-400">
          Upload your resume to calculate ATS match score, detect missing keywords, fix grammar, and preview targeted interview questions recruiters will ask.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Input Box */}
        <div className="glass-card p-6 rounded-3xl border border-gray-800 space-y-6 lg:col-span-1">
          
          {/* Target Role Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wide block">Select Target Role</label>
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

          {/* File Upload Zone */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wide block">Upload Resume (PDF / DOCX)</label>
            <label className="border-2 border-dashed border-gray-700 hover:border-indigo-500 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-gray-950/40">
              <Upload className="w-8 h-8 text-indigo-400 mb-2" />
              <span className="text-xs font-semibold text-gray-300">
                {file ? file.name : "Drop PDF/DOCX or click to browse"}
              </span>
              <span className="text-[11px] text-gray-500 mt-1">Supports PDF & DOCX up to 5MB</span>
              <input type="file" accept=".pdf,.docx,.doc" onChange={handleFileChange} className="hidden" />
            </label>
          </div>

          {/* Textarea Fallback */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wide block">Or Paste Resume Text</label>
            <textarea
              rows={7}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder={defaultSampleResume}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-xs text-gray-200 font-mono outline-none focus:border-indigo-500"
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full glass-button text-white py-3 rounded-2xl font-bold text-sm flex items-center justify-center space-x-2 glow-primary"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>{loading ? "Analyzing Resume..." : "Analyze ATS & Keywords"}</span>
          </button>
        </div>

        {/* Right Output Results Drawer */}
        <div className="lg:col-span-2 space-y-6">
          {analysis ? (
            <div className="space-y-6">
              
              {/* ATS Score Header Card */}
              <div className="glass-card p-6 rounded-3xl border border-indigo-500/30 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                <div className="text-center space-y-1 sm:border-r border-gray-800">
                  <span className="text-xs text-gray-400 uppercase font-bold block">Overall ATS Score</span>
                  <div className="text-4xl font-extrabold text-emerald-400">{analysis.ats_score}/100</div>
                  <span className="text-[11px] text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-full inline-block">Great ATS Pass Probability</span>
                </div>

                <div className="text-center space-y-1 sm:border-r border-gray-800">
                  <span className="text-xs text-gray-400 uppercase font-bold block">Keyword Match</span>
                  <div className="text-3xl font-extrabold text-indigo-400">{analysis.keyword_match_score || 82}%</div>
                  <span className="text-[11px] text-gray-400">Target Role: {analysis.detected_role}</span>
                </div>

                <div className="text-center space-y-1">
                  <span className="text-xs text-gray-400 uppercase font-bold block">Action Verbs Impact</span>
                  <div className="text-3xl font-extrabold text-pink-400">{analysis.impact_score || 85}%</div>
                  <span className="text-[11px] text-pink-300">Strong metric focus</span>
                </div>
              </div>

              {/* Skills Found vs Missing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glass-card p-5 rounded-2xl border border-emerald-500/30 space-y-3">
                  <h4 className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Detected Core Skills
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.found_skills?.map((skill, i) => (
                      <span key={i} className="bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full text-xs font-semibold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="glass-card p-5 rounded-2xl border border-amber-500/30 space-y-3">
                  <h4 className="font-bold text-amber-400 text-sm flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Missing Keywords for {targetRole}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.missing_skills?.map((skill, i) => (
                      <span key={i} className="bg-amber-500/15 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-full text-xs font-semibold">
                        + {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Improved Bullet Points */}
              <div className="glass-card p-6 rounded-3xl border border-gray-800 space-y-4">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Zap className="w-5 h-5 text-indigo-400" /> AI Bullet Point Enhancements
                </h3>
                <div className="space-y-3">
                  {analysis.improved_bullets?.map((bullet, i) => (
                    <div key={i} className="bg-gray-950 border border-gray-800 p-3.5 rounded-xl text-xs text-gray-300 leading-relaxed font-mono">
                      {bullet}
                    </div>
                  ))}
                </div>
              </div>

              {/* Generated Interview Questions */}
              <div className="glass-card p-6 rounded-3xl border border-purple-500/30 space-y-4">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" /> Targeted Interview Questions Generated from Your Resume
                </h3>
                <div className="space-y-2.5">
                  {analysis.generated_interview_questions?.map((q, i) => (
                    <div key={i} className="flex items-start space-x-3 bg-purple-950/20 border border-purple-500/20 p-3.5 rounded-xl">
                      <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 font-bold text-xs flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-xs text-gray-200 font-medium leading-relaxed">{q}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="glass-card p-12 rounded-3xl border border-gray-800 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-indigo-900/40 border border-indigo-500/30 flex items-center justify-center mx-auto">
                <FileText className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Ready for ATS Resume Audit</h3>
              <p className="text-xs text-gray-400 max-w-md mx-auto">
                Select your target job role on the left and upload your resume file or paste text to receive an instant breakdown.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
