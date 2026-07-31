import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Sparkles, Mic } from 'lucide-react';

export default function AnimatedAvatar({ state = 'speaking', questionText = '', isMuted = false, onToggleMute }) {
  const [mouthOpen, setMouthOpen] = useState(false);

  useEffect(() => {
    let interval;
    if (state === 'speaking') {
      interval = setInterval(() => {
        setMouthOpen((prev) => !prev);
      }, 180);

      // Text to speech execution if text present & not muted
      if (questionText && !isMuted && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(questionText);
        utterance.rate = 1.0;
        utterance.pitch = 1.05;
        window.speechSynthesis.speak(utterance);
      }
    } else {
      setMouthOpen(false);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state, questionText, isMuted]);

  return (
    <div className="relative flex flex-col items-center justify-center p-6 glass-card rounded-2xl border border-indigo-500/30 overflow-hidden">
      
      {/* Dynamic Background Glow */}
      <div className={`absolute -inset-1 rounded-2xl blur-xl opacity-30 transition-all duration-500 ${
        state === 'speaking' ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-60' :
        state === 'listening' ? 'bg-gradient-to-r from-emerald-500 to-teal-400 opacity-60' :
        'bg-gray-700'
      }`}></div>

      {/* Mute / Audio Toggle Button */}
      <button
        onClick={onToggleMute}
        className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-gray-800/80 border border-gray-700 text-gray-300 hover:text-white transition-colors"
        title={isMuted ? "Unmute Voice" : "Mute Voice"}
      >
        {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-indigo-400" />}
      </button>

      {/* Avatar Container */}
      <div className="relative w-36 h-36 rounded-full bg-gradient-to-b from-indigo-900 via-slate-900 to-black p-1 flex items-center justify-center shadow-2xl border-2 border-indigo-500/40">
        
        {/* Outer Pulsing Wave Ring */}
        {state === 'speaking' && (
          <div className="absolute inset-0 rounded-full border-2 border-indigo-400 animate-ping opacity-25"></div>
        )}

        {/* SVG Robot/AI Head Face */}
        <svg viewBox="0 0 100 100" className="w-28 h-28 drop-shadow-lg">
          {/* Head Base */}
          <rect x="20" y="20" width="60" height="55" rx="18" fill="url(#avatarGradient)" stroke="#818cf8" strokeWidth="2.5" />
          
          {/* Ear Modules */}
          <rect x="12" y="40" width="8" height="15" rx="3" fill="#4f46e5" />
          <rect x="80" y="40" width="8" height="15" rx="3" fill="#4f46e5" />

          {/* Eyes Visor Screen */}
          <rect x="28" y="32" width="44" height="20" rx="8" fill="#090d16" stroke="#4f46e5" strokeWidth="1" />

          {/* Animated Glowing Eyes */}
          <circle cx="40" cy="42" r={state === 'evaluating' ? "3" : "4.5"} fill={state === 'listening' ? "#34d399" : "#60a5fa"} className="transition-all duration-300">
            <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="60" cy="42" r={state === 'evaluating' ? "3" : "4.5"} fill={state === 'listening' ? "#34d399" : "#60a5fa"} className="transition-all duration-300">
            <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* Mouth Lip Sync Animation */}
          {mouthOpen ? (
            <ellipse cx="50" cy="62" rx="7" ry="4" fill="#6366f1" />
          ) : (
            <rect x="42" y="61" width="16" height="2.5" rx="1.2" fill="#818cf8" />
          )}

          {/* Forehead AI Chip Badge */}
          <rect x="44" y="24" width="12" height="4" rx="1.5" fill="#ec4899" />

          {/* Gradients */}
          <defs>
            <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Audio Visualizer Wave Bars */}
      <div className="flex items-center space-x-1.5 mt-4 h-6">
        {[40, 75, 100, 60, 90, 45, 80, 50].map((h, i) => (
          <span
            key={i}
            className={`w-1 rounded-full transition-all duration-200 ${
              state === 'speaking' ? 'bg-indigo-400 animate-pulse' :
              state === 'listening' ? 'bg-emerald-400 animate-pulse' :
              'bg-gray-700 h-2'
            }`}
            style={{
              height: (state === 'speaking' || state === 'listening') ? `${Math.max(6, (h * Math.random()))}px` : '4px'
            }}
          ></span>
        ))}
      </div>

      {/* State Badge */}
      <div className="mt-3 flex items-center space-x-2">
        <span className={`w-2.5 h-2.5 rounded-full ${
          state === 'speaking' ? 'bg-indigo-400 animate-ping' :
          state === 'listening' ? 'bg-emerald-400 animate-pulse' :
          'bg-amber-400'
        }`}></span>
        <span className="text-xs font-semibold tracking-wide uppercase text-gray-300">
          {state === 'speaking' ? 'Interviewer Speaking' :
           state === 'listening' ? 'Listening to Candidate...' :
           state === 'evaluating' ? 'Analyzing Response...' : 'AI Ready'}
        </span>
      </div>

    </div>
  );
}
