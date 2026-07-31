import React, { useEffect, useRef, useState } from 'react';
import { Camera, CameraOff, Eye, Smile, UserCheck, ShieldAlert } from 'lucide-react';

export default function FaceTracker({ onMetricsUpdate }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [eyeContact, setEyeContact] = useState(85);
  const [smileScore, setSmileScore] = useState(78);
  const [confidenceScore, setConfidenceScore] = useState(88);
  const [postureStatus, setPostureStatus] = useState("Optimal");

  useEffect(() => {
    let stream = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { width: 480, height: 360 } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraActive(true);
        }
      } catch (err) {
        console.warn("Webcam unavailable or permission denied:", err);
        setCameraActive(false);
      }
    };

    startCamera();

    // Canvas overlay detection simulation loop
    const interval = setInterval(() => {
      if (videoRef.current && canvasRef.current && cameraActive) {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        // Draw futuristic tracking bounding box
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 6]);
        ctx.strokeRect(60, 40, 180, 190);

        // Draw Eye Contact Alignment points
        ctx.fillStyle = '#34d399';
        ctx.beginPath();
        ctx.arc(110, 100, 4, 0, 2 * Math.PI);
        ctx.arc(190, 100, 4, 0, 2 * Math.PI);
        ctx.fill();

        // Simulate metric jitter
        const newEye = Math.min(98, Math.max(70, eyeContact + (Math.random() * 6 - 3)));
        const newSmile = Math.min(95, Math.max(60, smileScore + (Math.random() * 4 - 2)));
        const newConf = Math.min(96, Math.max(72, intScore((newEye + newSmile) / 2)));
        
        setEyeContact(Math.round(newEye));
        setSmileScore(Math.round(newSmile));
        setConfidenceScore(Math.round(newConf));

        if (onMetricsUpdate) {
          onMetricsUpdate({
            eye_contact_ratio: newEye / 100,
            smile_score: newSmile,
            confidence_score: newConf,
            posture: postureStatus
          });
        }
      }
    }, 1500);

    return () => {
      clearInterval(interval);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraActive]);

  function intScore(val) {
    return Math.round(val);
  }

  return (
    <div className="glass-card rounded-2xl p-4 border border-gray-800 relative flex flex-col items-center">
      
      <div className="w-full flex items-center justify-between mb-3 px-1">
        <div className="flex items-center space-x-2">
          <Camera className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-semibold text-gray-200 uppercase tracking-wide">Live Face Analysis</span>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
          cameraActive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400'
        }`}>
          {cameraActive ? 'Tracking Active' : 'Simulated Feed'}
        </span>
      </div>

      {/* Video Container */}
      <div className="relative w-full h-48 bg-gray-950 rounded-xl overflow-hidden border border-gray-800 flex items-center justify-center">
        {cameraActive ? (
          <>
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform -scale-x-100" />
            <canvas ref={canvasRef} width="300" height="240" className="absolute inset-0 w-full h-full pointer-events-none" />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <div className="w-16 h-16 rounded-full bg-indigo-900/40 border border-indigo-500/30 flex items-center justify-center mb-2">
              <CameraOff className="w-8 h-8 text-indigo-400" />
            </div>
            <p className="text-xs text-gray-400">Webcam stream inactive</p>
            <p className="text-[11px] text-gray-500 mt-1">Real-time simulation active for eye contact & posture</p>
          </div>
        )}
      </div>

      {/* Real-time Metric Badges */}
      <div className="grid grid-cols-3 gap-2 w-full mt-3">
        <div className="bg-gray-900/80 border border-gray-800 p-2 rounded-xl text-center">
          <div className="flex items-center justify-center gap-1 text-[11px] text-gray-400 mb-0.5">
            <Eye className="w-3 h-3 text-emerald-400" /> Eye Contact
          </div>
          <span className="text-sm font-bold text-emerald-400">{eyeContact}%</span>
        </div>

        <div className="bg-gray-900/80 border border-gray-800 p-2 rounded-xl text-center">
          <div className="flex items-center justify-center gap-1 text-[11px] text-gray-400 mb-0.5">
            <Smile className="w-3 h-3 text-indigo-400" /> Smile Index
          </div>
          <span className="text-sm font-bold text-indigo-400">{smileScore}%</span>
        </div>

        <div className="bg-gray-900/80 border border-gray-800 p-2 rounded-xl text-center">
          <div className="flex items-center justify-center gap-1 text-[11px] text-gray-400 mb-0.5">
            <UserCheck className="w-3 h-3 text-purple-400" /> Posture
          </div>
          <span className="text-xs font-bold text-purple-300">{postureStatus}</span>
        </div>
      </div>

    </div>
  );
}
