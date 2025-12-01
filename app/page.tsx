"use client";

import Link from "next/link";
import { Play, Zap, Users, Rocket, Star, Sparkles, Flame } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full text-white bg-black relative overflow-hidden pb-24">

      {/* 🔥 ANIMATED GRADIENT BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2b0057] via-black to-[#00522e] animate-pulse opacity-60"></div>

      {/* 🔥 MOVING SCANLINE EFFECT */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[url('/scanline.png')] mix-blend-soft-light"></div>

      {/* 🔥 FLOATING NEON PARTICLES */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400 rounded-full opacity-70 animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>

      {/* 🔥 FORTNITE-STYLE LIGHT SWEEP */}
      <div className="absolute top-0 left-0 w-full h-[200vh] opacity-20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_70%)] animate-[spin_20s_linear_infinite]"></div>

      {/* HEADER */}
      <header className="relative z-30 flex items-center justify-between px-6 py-5">
        <span className="text-4xl font-black tracking-tighter text-[#53fc18] drop-shadow-[0_0_8px_#53fc18]">
          PARABLE
        </span>

        <div className="flex items-center gap-4">
          <button className="px-3 py-1 rounded-md bg-white/10 border border-white/20 text-sm font-bold">
            Log in
          </button>
          <button className="px-4 py-2 rounded-md bg-[#53fc18] text-black font-bold">
            Sign up
          </button>
        </div>
      </header>

      {/* 🔥 HERO SECTION — UPGRADED */}
      <section className="relative z-30 px-6 text-center mt-14">
        <h1 className="text-5xl font-black tracking-tight leading-tight drop-shadow-[0_0_10px_rgba(83,252,24,0.45)]">
          STREAM • GAME • GROW
        </h1>
        <h2 className="text-2xl font-bold mt-3 text-gray-300">
          Join the movement. Build the future.
        </h2>

        <p className="mt-3 text-gray-400 max-w-xl mx-auto">
          Where gamers, believers, streamers, musicians & influencers create together.
        </p>

        {/* 🔥 GLOWING CTA BUTTONS */}
        <div className="mt-8 flex justify-center gap-5">
          <Link
            href="/stream"
            className="px-8 py-3 bg-[#53fc18] text-black rounded-xl text-lg font-extrabold flex items-center gap-2 shadow-[0_0_20px_#53fc18]"
          >
            <Play className="w-5 h-5" /> Go Live
          </Link>

          <Link
            href="/discover"
            className="px-8 py-3 bg-white/10 border border-white/20 backdrop-blur-xl rounded-xl text-lg font-bold flex items-center gap-2 hover:bg-white/20 transition"
          >
            <Zap className="w-5 h-5 text-yellow-400" /> Discover
          </Link>
        </div>
      </section>

      {/* 🔥 FEATURE RIBBONS */}
      <section className="mt-16 relative z-30 px-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-[0_0_20px_rgba(83,252,24,0.15)] hover:bg-white/10">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6 text-green-400" /> Grow Your Audience
          </h3>
          <p className="text-gray-400 mt-2">
            Connect with a global community of believers, gamers & creators.
          </p>
        </div>

        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-[0_0_20px_rgba(128,0,255,0.15)] hover:bg-white/10">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Rocket className="w-6 h-6 text-purple-400" /> Earn Seeds & Support
          </h3>
          <p className="text-gray-400 mt-2">
            Unlock supporter perks, donations, Seeds & platform rewards.
          </p>
        </div>
      </section>

      {/* 🔥 FEATURED FLASH CARDS */}
      <section className="mt-16 relative z-30 px-6">
        <h2 className="text-2xl font-extrabold mb-4 tracking-tight">🔥 Featured Streams</h2>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-none">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="min-w-[300px] bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:scale-[1.02] shadow-xl shadow-green-400/20 transition"
            >
              <div className="relative">
                <img src="/sample_live_thumb.jpg" className="w-full h-48 object-cover" />

                <span className="absolute top-2 left-2 bg-red-500 text-white text-[11px] px-2 py-0.5 rounded uppercase font-black">
                  LIVE
                </span>

                <span className="absolute bottom-2 left-2 bg-black/70 px-2 py-0.5 text-[11px] rounded flex items-center gap-1">
                  <Users className="w-3 h-3" /> 22.4K watching
                </span>
              </div>

              <div className="p-3">
                <p className="font-bold text-[15px] leading-tight">
                  Gospel Gaming Night – Fellowship & Fun 🎮🔥
                </p>
                <p className="text-xs text-gray-400 mt-1">The Kingdom Crew</p>

                <div className="flex flex-wrap gap-1 mt-2">
                  {["English", "Gaming", "Live", "Faith"].map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-[#222] border border-white/10 text-[10px] rounded-full text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔥 BADGE BAR */}
      <section className="mt-16 px-6 relative z-30 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full backdrop-blur-xl shadow-lg shadow-purple-400/10">
          <Star className="w-5 h-5 text-yellow-300" />
          <span className="text-sm">Faith Powered • Creator Focused • Built for Streamers</span>
        </div>
      </section>

    </div>
  );
}
