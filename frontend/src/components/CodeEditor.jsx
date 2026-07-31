import React, { useState } from 'react';
import { Play, Sparkles, Cpu, CheckCircle2, RotateCcw, Copy } from 'lucide-react';

export default function CodeEditor({ problem, onRunCode, onGetHint, onAnalyzeComplexity }) {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(problem?.starter_code?.python || `def twoSum(nums, target):\n    # Write your optimal O(N) solution here\n    seen = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i\n    return []\n`);
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    if (problem?.starter_code?.[lang]) {
      setCode(problem.starter_code[lang]);
    }
  };

  const handleRun = async () => {
    setIsRunning(true);
    if (onRunCode) {
      const res = await onRunCode({ code, language, problem_id: problem?.id });
      setOutput(res);
    } else {
      setTimeout(() => {
        setOutput({
          status: 'Accepted',
          passed_count: 2,
          total_count: 2,
          runtime: '38 ms',
          memory: '14.8 MB',
          output: 'Test Case 1 Passed! [2, 7, 11, 15], target = 9 => Output: [0, 1]\nTest Case 2 Passed! [3, 2, 4], target = 6 => Output: [1, 2]'
        });
        setIsRunning(false);
      }, 700);
    }
    setIsRunning(false);
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-gray-800 flex flex-col h-[520px]">
      
      {/* Editor Header Bar */}
      <div className="bg-gray-900/90 border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        
        {/* Language Selector Tabs */}
        <div className="flex items-center space-x-2">
          {['python', 'javascript', 'cpp', 'java'].map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase transition-all ${
                language === lang
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onGetHint && onGetHint({ code, problem_title: problem?.title })}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 text-xs font-semibold transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Hint</span>
          </button>

          <button
            onClick={() => onAnalyzeComplexity && onAnalyzeComplexity({ code, language })}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 hover:bg-blue-500/20 text-xs font-semibold transition-colors"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Complexity</span>
          </button>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="glass-button text-white px-4 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>{isRunning ? "Running..." : "Run Test Cases"}</span>
          </button>
        </div>
      </div>

      {/* Code Textarea Area */}
      <div className="flex-1 bg-gray-950 p-4 font-mono text-sm leading-relaxed text-indigo-200 overflow-y-auto">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="w-full h-full bg-transparent resize-none outline-none font-mono text-sm text-emerald-300 leading-relaxed"
        />
      </div>

      {/* Execution Output Console Drawer */}
      {output && (
        <div className="bg-gray-900 border-t border-gray-800 p-4 max-h-40 overflow-y-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                {output.status} ({output.passed_count}/{output.total_count} Passed)
              </span>
            </div>
            <div className="text-xs text-gray-400 space-x-3">
              <span>Runtime: <strong className="text-gray-200">{output.runtime}</strong></span>
              <span>Memory: <strong className="text-gray-200">{output.memory}</strong></span>
            </div>
          </div>
          <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap">{output.output}</pre>
        </div>
      )}

    </div>
  );
}
