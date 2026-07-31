import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchNextQuestion, finishInterview } from '../services/api';
import AnimatedAvatar from '../components/AnimatedAvatar';
import FaceTracker from '../components/FaceTracker';
import SpeechRecorder from '../components/SpeechRecorder';
import { 
  Video, Play, CheckCircle2, ChevronRight, AlertCircle, Sparkles, Mic, RefreshCw, Volume2, ShieldCheck
} from 'lucide-react';

export default function MockInterview() {
  const navigate = useNavigate();
  const [sessionStarted, setSessionStarted] = useState(false);
  const [role, setRole] = useState('Software Engineer');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [type, setType] = useState('Technical');
  
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [qaHistory, setQaHistory] = useState([]);
  const [avatarState, setAvatarState] = useState('idle'); // 'speaking', 'listening', 'evaluating', 'idle'
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const [speechMetrics, setSpeechMetrics] = useState(null);
  const [faceMetrics, setFaceMetrics] = useState(null);
  const [loading, setLoading] = useState(false);

  const startSession = async () => {
    setLoading(true);
    try {
      const res = await fetchNextQuestion({
        role, difficulty, type, question_index: 0, previous_qa: []
      });
      setCurrentQuestion(res.data);
      setSessionStarted(true);
      setAvatarState('speaking');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeechComplete = async (metrics) => {
    setSpeechMetrics(metrics);
    setAvatarState('evaluating');
    
    const updatedHistory = [
      ...qaHistory,
      {
        question: currentQuestion?.question || "Tell me about your software experience.",
        answer: metrics.transcript,
        wpm: metrics.wpm,
        fillers: metrics.fillers_count
      }
    ];
    setQaHistory(updatedHistory);

    // Fetch Next Question or Finish
    if (questionIndex >= 4) {
      // Complete interview
      finishSession(updatedHistory, metrics);
    } else {
      setTimeout(async () => {
        try {
          const res = await fetchNextQuestion({
            role, difficulty, type, question_index: questionIndex + 1, previous_qa: updatedHistory
          });
          setQuestionIndex(prev => prev + 1);
          setCurrentQuestion(res.data);
          setAvatarState('speaking');
        } catch (e) {
          console.error(e);
        }
      }, 1200);
    }
  };

  const finishSession = async (history = qaHistory, lastSpeech = speechMetrics) => {
    setLoading(true);
    try {
      const res = await finishInterview({
        role,
        difficulty,
        type,
        qa_list: history,
        speech_metrics: lastSpeech || { wpm: 135, fluency_score: 88 },
        face_metrics: faceMetrics || { eye_contact_ratio: 0.85, confidence_score: 88 }
      });
      navigate('/interview-report', { state: { report: res.data.report, role, difficulty, type } });
    } catch (err) {
      console.error(err);
      navigate('/interview-report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {!sessionStarted ? (
        /* Setup Setup Form Modal */
        <div className="max-w-2xl mx-auto glass-card p-8 rounded-3xl border border-indigo-500/30 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center mx-auto">
              <Video className="w-6 h-6 text-indigo-400" />
            </div>
            <h1 className="text-2xl font-extrabold text-white">Configure AI Mock Interview Room</h1>
            <p className="text-xs text-gray-400">Select your target role, difficulty, and interview type to initialize your AI interviewer.</p>
          </div>

          <div className="space-y-4">
            {/* Target Role */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wide">Target Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none focus:border-indigo-500"
              >
                <option value="Software Engineer">Software Engineer</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="AI Engineer">AI Engineer</option>
                <option value="Web Developer">Web Developer</option>
                <option value="Product Manager">Product Manager</option>
                <option value="HR Interview">HR Interview</option>
              </select>
            </div>

            {/* Difficulty */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wide">Difficulty Level</label>
              <div className="grid grid-cols-3 gap-3">
                {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setDifficulty(lvl)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      difficulty === lvl
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                        : 'bg-gray-900 text-gray-400 border-gray-800 hover:text-white'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Interview Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wide">Interview Round Type</label>
              <div className="grid grid-cols-3 gap-3">
                {['Technical', 'HR', 'Behavioral'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      type === t
                        ? 'bg-purple-600 text-white border-purple-500 shadow-md'
                        : 'bg-gray-900 text-gray-400 border-gray-800 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={startSession}
            disabled={loading}
            className="w-full glass-button text-white py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center space-x-2 glow-primary"
          >
            {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5 fill-white" />}
            <span>{loading ? "Initializing AI Interviewer..." : "Enter AI Mock Room"}</span>
          </button>
        </div>
      ) : (
        /* Active Mock Interview Room Layout */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: AI Interviewer & Face Tracker */}
          <div className="space-y-6 lg:col-span-1">
            <AnimatedAvatar
              state={avatarState}
              questionText={currentQuestion?.question}
              isMuted={isMuted}
              onToggleMute={() => setIsMuted(!isMuted)}
            />
            <FaceTracker onMetricsUpdate={setFaceMetrics} />
          </div>

          {/* Right Main Column: Question Board & Speech Controller */}
          <div className="lg:col-span-2 space-y-6 flex flex-col justify-between">
            
            {/* Question Display Card */}
            <div className="glass-card p-6 rounded-3xl border border-indigo-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                  Question {questionIndex + 1} of 5
                </span>
                {currentQuestion?.is_followup && (
                  <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Dynamic AI Follow-up
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
                "{currentQuestion?.question}"
              </h2>

              <p className="text-xs text-gray-400 italic">
                Note: {currentQuestion?.interviewer_note}
              </p>
            </div>

            {/* Speech Recording & Filler Analysis Component */}
            <SpeechRecorder
              isListening={isListening}
              setIsListening={(val) => {
                setIsListening(val);
                setAvatarState(val ? 'listening' : 'idle');
              }}
              onSpeechComplete={handleSpeechComplete}
            />

            {/* Finish Early Button */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-gray-400">
                Answer each question out loud. AI evaluates speech, eye contact, and technical depth.
              </span>
              <button
                onClick={() => finishSession()}
                className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-300 border border-gray-700"
              >
                End Session & View Report
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
