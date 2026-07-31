import React, { useEffect, useState } from 'react';
import { fetchProblems, runCode, getAIHint, analyzeComplexity } from '../services/api';
import CodeEditor from '../components/CodeEditor';
import { 
  Code, Sparkles, Cpu, CheckCircle2, Play, BookOpen, AlertCircle, X, HelpCircle
} from 'lucide-react';

export default function CodingInterview() {
  const [problems, setProblems] = useState([]);
  const [activeProblem, setActiveProblem] = useState(null);
  const [hintModal, setHintModal] = useState(null);
  const [complexityModal, setComplexityModal] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProblems = async () => {
      try {
        const res = await fetchProblems();
        setProblems(res.data.problems);
        if (res.data.problems.length > 0) {
          setActiveProblem(res.data.problems[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadProblems();
  }, []);

  const handleGetHint = async (payload) => {
    setLoading(true);
    try {
      const res = await getAIHint(payload);
      setHintModal(res.data.hint);
    } catch (e) {
      console.error(e);
      setHintModal("Consider utilizing a Hash Map data structure to optimize lookup from O(N) to O(1).");
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeComplexity = async (payload) => {
    setLoading(true);
    try {
      const res = await analyzeComplexity(payload);
      setComplexityModal(res.data);
    } catch (e) {
      console.error(e);
      setComplexityModal({
        time_complexity: "O(N)",
        space_complexity: "O(N)",
        explanation: "Iterates through array once with hash map lookups.",
        optimal_solution: "Optimal O(N) time & O(N) space complexity."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-purple-500/10 text-purple-400 border border-purple-500/30 px-3.5 py-1 rounded-full text-xs font-semibold">
            <Code className="w-3.5 h-3.5" />
            <span>Interactive Technical Coding Sandbox</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-2">
            Coding Interview Mode
          </h1>
        </div>

        {/* Problem Picker Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400 font-semibold uppercase">Problem:</span>
          <select
            value={activeProblem?.id || ''}
            onChange={(e) => {
              const p = problems.find(item => item.id === e.target.value);
              if (p) setActiveProblem(p);
            }}
            className="bg-gray-900 border border-gray-700 text-xs text-gray-200 rounded-xl px-3 py-2 outline-none focus:border-indigo-500"
          >
            {problems.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} ({p.difficulty})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid: Left Problem Statement & Right Code Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Problem Description */}
        <div className="glass-card p-6 rounded-3xl border border-gray-800 space-y-6 lg:col-span-1">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">{activeProblem?.title || "1. Two Sum"}</h2>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                {activeProblem?.difficulty || "Easy"}
              </span>
            </div>
            <span className="text-xs text-gray-400 font-semibold block mt-1">
              Category: {activeProblem?.category || "Arrays & Hashing"}
            </span>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wide">Problem Description</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              {activeProblem?.description || "Given an array of integers nums and an integer target, return indices of two numbers adding to target."}
            </p>
          </div>

          {/* Examples */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wide">Examples</h4>
            {activeProblem?.examples?.map((ex, idx) => (
              <div key={idx} className="bg-gray-950 border border-gray-800 p-3 rounded-xl space-y-1 font-mono text-[11px]">
                <div className="text-gray-400">Input: <span className="text-indigo-300">{ex.input}</span></div>
                <div className="text-gray-400">Output: <span className="text-emerald-300">{ex.output}</span></div>
              </div>
            ))}
          </div>

          {/* Test Cases List */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wide">Predefined Test Cases</h4>
            {activeProblem?.test_cases?.map((tc, idx) => (
              <div key={idx} className="flex items-center justify-between bg-gray-900 border border-gray-800 p-2.5 rounded-xl text-xs">
                <span className="text-gray-400">Case {idx + 1}: {tc.input}</span>
                <span className="text-emerald-400 font-bold">⇒ {tc.expected}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Right Column: Code Editor & Execution Sandbox */}
        <div className="lg:col-span-2 space-y-6">
          <CodeEditor
            problem={activeProblem}
            onRunCode={runCode}
            onGetHint={handleGetHint}
            onAnalyzeComplexity={handleAnalyzeComplexity}
          />
        </div>

      </div>

      {/* AI Hint Drawer Modal */}
      {hintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="glass-card max-w-lg w-full p-6 rounded-3xl border border-purple-500/40 space-y-4 relative">
            <button
              onClick={() => setHintModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-bold text-white">AI Algorithm Hint</h3>
            </div>
            <p className="text-xs text-purple-200 leading-relaxed bg-purple-950/40 border border-purple-500/30 p-4 rounded-2xl">
              {hintModal}
            </p>
          </div>
        </div>
      )}

      {/* Complexity Analysis Modal */}
      {complexityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="glass-card max-w-lg w-full p-6 rounded-3xl border border-blue-500/40 space-y-4 relative">
            <button
              onClick={() => setComplexityModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-bold text-white">Big-O Complexity Breakdown</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-900 border border-gray-800 p-3 rounded-xl text-center">
                <span className="text-[11px] text-gray-400 block">Time Complexity</span>
                <span className="text-lg font-extrabold text-indigo-400">{complexityModal.time_complexity}</span>
              </div>
              <div className="bg-gray-900 border border-gray-800 p-3 rounded-xl text-center">
                <span className="text-[11px] text-gray-400 block">Space Complexity</span>
                <span className="text-lg font-extrabold text-purple-400">{complexityModal.space_complexity}</span>
              </div>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed bg-gray-950 p-3.5 rounded-xl border border-gray-800">
              {complexityModal.explanation}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
