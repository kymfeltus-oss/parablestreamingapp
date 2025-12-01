"use client";

import Link from "next/link";
import { Play, Zap, Users, Rocket, Star } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden pb-20">

      {/* BACKGROUND EFFECT */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-700/20 via-black to-green-500/10 animate-pulse"></div>
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-30 mix-blend-soft-light"></div>

      {/* FLOATING GLOW ORBS */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-green-500/20 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-5 w-52 h-52 bg-purple-500/20 blur-3xl rounded-full animate-pulse"></div>

      {/* HEADER */}
      <header className="flex items-center justify-between px-6 py-5 relative z-20">
        <div className="flex items-center gap-2">
          <span className="text-4xl font-black text-[#53fc18] tracking-tighter">
            PARABLE
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button className="px-3 py-1 rounded-md bg-white/10 border border-white/20 text-sm font-bold">
            Log in
          </button>
          <button className="px-4 py-2 rounded-md bg-[#53fc18] text-black font-bold">
            Sign up
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="px-6 mt-10 relative z-20 text-center">
        <h1 className="text-4xl font-black leading-tight tracking-tight">
          STREAM. GAME. GROW IN CHRIST.
        </h1>

        <p className="text-gray-300 mt-3 text-lg">
          A creator home built for believers, gamers, pastors & influencers.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/stream"
            className="px-6 py-3 rounded-xl bg-[#53fc18] text-black font-extrabold text-lg flex items-center gap-2 shadow-lg shadow-green-500/30"
          >
            <Play className="w-5 h-5" />
            Go Live
          </Link>

          <Link
            href="/discover"
            className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-lg flex items-center gap-2 backdrop-blur-xl"
          >
            <Zap className="w-5 h-5 text-yellow-400" />
            Discover
          </Link>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <section className="mt-14 px-6 relative z-20 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md hover:bg-white/10 transition">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6 text-green-400" /> Grow Your Audience
          </h3>
          <p className="text-gray-400 mt-2">
            Connect with believers, gamers, musicians and creators from around the world.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md hover:bg-white/10 transition">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Rocket className="w-6 h-6 text-purple-400" /> Earn Seeds & Support
          </h3>
          <p className="text-gray-400 mt-2">
            Receive donations, Seeds, and exclusive supporter perks instantly.
          </p>
        </div>
      </section>

      {/* FEATURED CARDS (FLASH STYLE) */}
      <section className="mt-12 px-6 relative z-20">
        <h2 className="text-2xl font-extrabold tracking-tight mb-4">Featured Streams</h2>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-none">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="min-w-[300px] bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-xl shadow-green-500/10 hover:scale-[1.02] transition-transform"
            >
              <div className="relative">
                <img
                  src="/sample_live_thumb.jpg"
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-2 left-2 bg-red-600 text-white text-[11px] px-2 py-0.5 rounded uppercase font-black">
                  LIVE
                </span>
                <span className="absolute bottom-2 left-2 bg-black/70 px-2 py-0.5 text-[11px] rounded flex items-center gap-1">
                  <Users className="w-3 h-3" /> 15.2K watching
                </span>
              </div>

              <div className="p-3">
                <p className="font-bold text-[15px] leading-tight">
                  Gospel Gaming Night — Fellowship + Fun 🎮🔥
                </p>
                <p className="text-xs text-gray-400 mt-1">The Kingdom Crew</p>

                <div className="flex flex-wrap gap-1 mt-2">
                  {["English", "Gospel", "Live", "Gaming"].map((tag, idx) => (
                    <span
                      key={idx}
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

      {/* BADGE STRIP */}
      <section className="mt-12 px-6 pb-10 relative z-20 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full backdrop-blur-xl">
          <Star className="w-5 h-5 text-yellow-300" />
          <span className="text-sm">New Platform • Creator Focused • Faith Powered</span>
        </div>
      </section>

    </div>
  );
}
