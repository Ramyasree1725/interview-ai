import React, { useState, useRef, useEffect } from 'react';
import { Camera, CameraOff, Eye, Smile, ShieldAlert } from 'lucide-react';

export function WebcamSimulator() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const videoRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsEnabled(true);
      setHasPermission(true);
    } catch (err) {
      console.warn("Webcam access not granted:", err);
      setHasPermission(false);
      setIsEnabled(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsEnabled(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-lg p-3 text-slate-300">
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <Camera className="w-4 h-4 text-indigo-400" />
          <span>Candidate Video Presence</span>
        </div>
        <button
          onClick={isEnabled ? stopCamera : startCamera}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
            isEnabled 
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30' 
              : 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-600/50'
          }`}
        >
          {isEnabled ? "Turn Off" : "Enable Camera"}
        </button>
      </div>

      <div className="relative aspect-video rounded-xl bg-slate-950 flex items-center justify-center overflow-hidden border border-white/5">
        {isEnabled ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover transform -scale-x-100"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-4">
            <CameraOff className="w-8 h-8 text-slate-600 mb-2" />
            <p className="text-xs text-slate-400 font-medium">Camera is disabled</p>
            <p className="text-[11px] text-slate-500 max-w-xs mt-1">Enable to practice natural eye contact, head posture, and interview engagement.</p>
          </div>
        )}

        {/* Real-time Presence Metrics HUD */}
        {isEnabled && (
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px]">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <Eye className="w-3 h-3" /> Eye Contact: 94%
            </div>
            <div className="flex items-center gap-1.5 text-amber-300">
              <Smile className="w-3 h-3" /> Posture: Upright
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
