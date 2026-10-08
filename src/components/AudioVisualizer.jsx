import React from 'react';

export function AudioVisualizer({ isSpeaking, isListening }) {
  // Generate random heights for animated audio equalizer bars
  const bars = [16, 28, 42, 60, 36, 52, 24, 68, 45, 30, 58, 40, 22, 50, 32, 18];

  return (
    <div className="flex items-center justify-center gap-1.5 h-16 px-4 py-2 rounded-2xl bg-slate-900/60 border border-white/5 backdrop-blur-md">
      {bars.map((defaultHeight, idx) => {
        let heightClass = "h-2 bg-slate-700";

        if (isSpeaking) {
          // AI is talking (Blue / Indigo wave)
          heightClass = "bg-gradient-to-t from-indigo-500 to-cyan-400 animate-pulse";
        } else if (isListening) {
          // Candidate is speaking (Emerald / Rose active wave)
          heightClass = "bg-gradient-to-t from-rose-500 to-amber-400 animate-pulse";
        }

        const calculatedHeight = isSpeaking || isListening
          ? Math.max(8, (defaultHeight * ((idx % 3 + 1) * 0.4)))
          : 6;

        return (
          <div
            key={idx}
            style={{
              height: `${calculatedHeight}px`,
              transition: 'height 0.15s ease-in-out',
              animationDelay: `${idx * 0.08}s`
            }}
            className={`w-1.5 rounded-full transition-all duration-200 ${heightClass}`}
          />
        );
      })}
    </div>
  );
}
