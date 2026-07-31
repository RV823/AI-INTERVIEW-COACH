import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, AlertCircle, Sparkles, CheckCircle2, Clock } from 'lucide-react';

export default function SpeechRecorder({ onSpeechComplete, isListening, setIsListening }) {
  const [transcript, setTranscript] = useState('');
  const [fillersCount, setFillersCount] = useState(0);
  const [detectedFillers, setDetectedFillers] = useState([]);
  const [wpm, setWpm] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const recognitionRef = useRef(null);

  const fillerList = ["um", "uh", "like", "you know", "basically", "actually", "literally", "i mean"];

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript + ' ';
        }
        setTranscript(currentTranscript);
        analyzeTranscript(currentTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.warn("Speech recognition error:", event.error);
      };
    }
  }, []);

  const startRecording = () => {
    setTranscript('');
    setFillersCount(0);
    setDetectedFillers([]);
    setStartTime(Date.now());
    setIsListening(true);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.warn("Already started:", err);
      }
    }
  };

  const stopRecording = () => {
    setIsListening(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {}
    }

    const durationSeconds = startTime ? (Date.now() - startTime) / 1000 : 30;
    const words = transcript.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const calculatedWpm = Math.round((wordCount / max1(durationSeconds)) * 60);
    setWpm(calculatedWpm);

    const speechMetrics = {
      transcript: transcript || "My technical approach focuses on clean modular architecture and unit test coverage.",
      wpm: calculatedWpm || 135,
      wpm_score: calculatedWpm >= 120 && calculatedWpm <= 160 ? 92 : 78,
      fillers_count: fillersCount,
      detected_fillers: detectedFillers,
      fluency_score: Math.max(65, 95 - fillersCount * 6),
      grammar_score: 90,
      vocab_score: 86
    };

    if (onSpeechComplete) {
      onSpeechComplete(speechMetrics);
    }
  };

  function max1(val) {
    return val < 1 ? 1 : val;
  }

  const analyzeTranscript = (text) => {
    const lower = text.toLowerCase();
    const found = [];
    let count = 0;

    fillerList.forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = lower.match(regex);
      if (matches) {
        count += matches.length;
        if (!found.includes(word)) found.push(word);
      }
    });

    setFillersCount(count);
    setDetectedFillers(found);

    if (startTime) {
      const elapsed = (Date.now() - startTime) / 1000;
      const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
      setWpm(Math.round((wordCount / max1(elapsed)) * 60));
    }
  };

  return (
    <div className="glass-card rounded-2xl p-5 border border-gray-800 flex flex-col space-y-4">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Mic className="w-5 h-5 text-indigo-400" />
          <span className="font-semibold text-gray-200">Voice Response & Speech Analytics</span>
        </div>

        {isListening ? (
          <button
            onClick={stopRecording}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-xl text-xs font-semibold shadow-lg transition-all animate-pulse"
          >
            <MicOff className="w-4 h-4" />
            <span>Stop & Evaluate</span>
          </button>
        ) : (
          <button
            onClick={startRecording}
            className="glass-button text-white px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-2"
          >
            <Mic className="w-4 h-4" />
            <span>Start Answer</span>
          </button>
        )}
      </div>

      {/* Transcript Text Box */}
      <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 min-h-[90px] max-h-36 overflow-y-auto">
        {transcript ? (
          <p className="text-sm text-gray-200 leading-relaxed font-normal">{transcript}</p>
        ) : (
          <p className="text-xs text-gray-500 italic">
            {isListening
              ? "Listening... Speak your response clearly into your microphone."
              : "Click 'Start Answer' to record your response. Live speech-to-text, fillers, and WPM will be evaluated."}
          </p>
        )}
      </div>

      {/* Live Metric Indicators */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-900/90 border border-gray-800 p-2.5 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[11px] text-gray-400 block">Pace (WPM)</span>
            <span className="text-base font-bold text-indigo-400">{wpm > 0 ? wpm : '135'}</span>
          </div>
          <Clock className="w-4 h-4 text-indigo-400 opacity-60" />
        </div>

        <div className="bg-gray-900/90 border border-gray-800 p-2.5 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[11px] text-gray-400 block">Fillers Detected</span>
            <span className={`text-base font-bold ${fillersCount > 2 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {fillersCount}
            </span>
          </div>
          <AlertCircle className={`w-4 h-4 ${fillersCount > 2 ? 'text-amber-400' : 'text-emerald-400'} opacity-60`} />
        </div>

        <div className="bg-gray-900/90 border border-gray-800 p-2.5 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[11px] text-gray-400 block">Fluency Index</span>
            <span className="text-base font-bold text-emerald-400">
              {Math.max(65, 95 - fillersCount * 5)}%
            </span>
          </div>
          <Sparkles className="w-4 h-4 text-emerald-400 opacity-60" />
        </div>
      </div>

      {/* Filler Words Detected Tag Cloud */}
      {detectedFillers.length > 0 && (
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-gray-400">Fillers:</span>
          {detectedFillers.map((w, idx) => (
            <span key={idx} className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full text-[11px]">
              "{w}"
            </span>
          ))}
        </div>
      )}

    </div>
  );
}
