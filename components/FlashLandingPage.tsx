"use client";

import { Sparkles, Play } from "lucide-react";

type FlashLandingPageProps = {
  onEnter?: () => void;
};

export default function FlashLandingPage({ onEnter }: FlashLandingPageProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white flex items-center justify-center">

      {/* NEON PARTICLES */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-[#53fc18] rounded-full opacity-80 animate-ping"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}

      {/* GLOWING AURA */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(83,252,24,0.2),_transparent_70%)] animate-[spin_20s_linear_infinite] opacity-60" />

      {/* FLOATING ICON */}
      <div className="absolute top-10 right-10 opacity-80 animate-bounce">
        <Sparkles className="w-10 h-10 text-[#53fc18]" />
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-10 text-center transition-all duration-700">
        <h1 className="text-6xl font-black tracking-tight text-[#53fc18] neon-text mb-3">
          PARABLE
        </h1>

        <p className="text-gray-300 text-lg mb-6 px-8 leading-relaxed">
          Stream • Create • Worship • Connect.
          <br />
          A home for believers, creators, and gospel musicians.
        </p>

        {/* FIXED: Button instead of Link */}
        <button
          onClick={onEnter}
          className="bg-[#53fc18] hover:bg-[#46d615] text-black font-bold inline-flex items-center gap-3 px-10 py-3 rounded-2xl text-xl transition-transform hover:scale-105 shadow-[0_0_15px_#53fc18] cursor-pointer"
        >
          Enter Parable
          <Play className="w-5 h-5 fill-black" />
        </button>

        <p className="text-xs text-gray-500 mt-4">
          Auto-navigating to your feed…
        </p>
      </div>
    </div>
  );
}