"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import {
  Play,
  Radio,
  Upload,
  Mic2,
  Music,
  Video,
  Scissors,
  ArrowRight,
  Headphones,
  Church,
  Sparkles,
} from "lucide-react";

export default function StreamHub() {
  return (
    <div className="min-h-screen bg-black text-white font-sans pb-24">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-16 space-y-20">

        {/* ======================================================
            HEADER + SUBTITLE
        ======================================================= */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter drop-shadow-[0_0_25px_#53fc18]">
            Parable Live Hub
          </h1>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            Go live, shed, upload, react, or enter the AI Sanctuary.
            <br />
            <span className="text-[#53fc18] text-[10px] tracking-widest uppercase block mt-3">
              Stream. Game. Grow in Christ.
            </span>
          </p>
        </section>

        {/* ======================================================
            TWO-COLUMN MAIN GRID
        ======================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* LEFT COLUMN — GO LIVE */}
          <div className="space-y-10">

            {/* SECTION TITLE */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-600 rounded-lg shadow-[0_0_12px_rgba(255,0,0,0.4)]">
                <Radio className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold uppercase tracking-wide">
                Go Live
              </h2>
            </div>

            {/* FEATURED LIVE BROADCAST */}
            <Link
              href="/stream/watch"
              className="
                block relative overflow-hidden rounded-2xl border border-white/10 bg-[#111] h-64 group
                hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(255,0,0,0.4)]
                transition
              "
            >
              <div className="absolute inset-0 bg-[url('/pexels-photo-7586656.webp')] bg-cover bg-center opacity-40 group-hover:scale-105 transition duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

              <div className="p-8 relative z-10 h-full flex flex-col justify-end">
                <div className="absolute top-6 left-6 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded uppercase tracking-wider animate-pulse shadow-lg">
                  Live Now
                </div>

                <h3 className="text-3xl font-black italic mb-1 group-hover:text-red-400 transition">
                  Watch Broadcast
                </h3>
                <p className="text-gray-300 text-sm">
                  Bishop T.D. Jakes • The Potter's House
                </p>
              </div>
            </Link>

            {/* GO LIVE ACTION BUTTONS */}
            <div className="grid grid-cols-2 gap-6">
              <button
                className="
                  bg-[#111] border border-white/10 rounded-2xl p-6 text-left group
                  hover:border-red-500/40 hover:shadow-[0_0_15px_rgba(255,0,0,0.3)] transition
                "
              >
                <Radio className="w-8 h-8 text-red-400 mb-4 group-hover:scale-110 transition" />
                <h4 className="font-bold text-lg">Start Broadcast</h4>
                <p className="text-xs text-gray-500 mt-1">Go live now</p>
              </button>

              <button
                className="
                  bg-[#111] border border-white/10 rounded-2xl p-6 text-left group
                  hover:border-blue-500/40 hover:shadow-[0_0_15px_rgba(0,132,255,0.3)] transition
                "
              >
                <Upload className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition" />
                <h4 className="font-bold text-lg">Upload Content</h4>
                <p className="text-xs text-gray-500 mt-1">Post a recorded message</p>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN — AI SANCTUARY */}
          <div className="space-y-10">

            {/* SECTION TITLE */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-violet-600 rounded-lg shadow-[0_0_12px_#7c3aed]">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold uppercase tracking-wide">
                AI Sanctuary
              </h2>
            </div>

            {/* AI SANCTUARY CARD */}
            <div
              className="
                relative overflow-hidden rounded-2xl border border-white/10 bg-[#111] h-64 group
                hover:border-violet-500/50 hover:shadow-[0_0_20px_#7c3aed] transition
              "
            >
              <div className="absolute inset-0 bg-[url('/pexels-photo-7586656.webp')] bg-cover bg-center opacity-30 group-hover:scale-105 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

              <div className="absolute top-6 left-6 bg-violet-600 text-white text-[10px] font-black px-3 py-1 rounded uppercase tracking-wider shadow-md">
                Sanctuary Mode
              </div>

              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <h3 className="text-3xl font-black italic uppercase mb-1 group-hover:text-violet-300 transition">
                  Enter Sanctuary
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  AI-powered worship + message flow.
                </p>

                <Link
                  href="/sanctuary"
                  className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition shadow-lg"
                >
                  Launch <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* WORSHIP MODES */}
            <div className="grid grid-cols-2 gap-6">
              <button
                className="
                  bg-[#111] border border-white/10 rounded-2xl p-6 text-left group
                  hover:border-violet-500/40 hover:shadow-[0_0_15px_#7c3aed] transition
                "
              >
                <Church className="w-8 h-8 text-violet-400 mb-4 group-hover:scale-110 transition" />
                <h4 className="font-bold text-lg">Sunday Mode</h4>
                <p className="text-xs text-gray-500 mt-1">Worship + message</p>
              </button>

              <button
                className="
                  bg-[#111] border border-white/10 rounded-2xl p-6 text-left group
                  hover:border-blue-400/40 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition
                "
              >
                <Church className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition" />
                <h4 className="font-bold text-lg">Sabbath Mode</h4>
                <p className="text-xs text-gray-500 mt-1">Saturday worship</p>
              </button>
            </div>
          </div>
        </section>

        {/* ======================================================
            MUSIC SESSIONS
        ======================================================= */}
        <section className="space-y-10">

          {/* TITLE */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-600 rounded-lg shadow-[0_0_12px_rgba(255,128,0,0.4)]">
              <Music className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold uppercase tracking-wide">
              Music Sessions
            </h2>
          </div>

          {/* MAIN HERO BOX */}
          <Link
            href="/music/shed"
            className="
              block relative overflow-hidden rounded-2xl border border-white/10 bg-[#111] h-64 group mb-6
              hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(255,128,0,0.5)]
              transition
            "
          >
            <div className="absolute inset-0 bg-[url('/pexels-photo-7586656.webp')] bg-cover bg-center opacity-40 group-hover:scale-105 transition duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

            <div className="absolute top-6 left-6 bg-orange-600 text-white text-[10px] font-black px-3 py-1 rounded uppercase tracking-wider">
              Shed Sessions
            </div>

            <div className="p-8 relative z-10 h-full flex flex-col justify-end">
              <h3 className="text-3xl font-black italic uppercase mb-1 group-hover:text-orange-300 transition">
                Live Music Rooms
              </h3>
              <p className="text-gray-300 text-sm">
                Live sheds, loops, and worship vibes.
              </p>
            </div>
          </Link>

          {/* START NEW SHED ROOM */}
          <Link
            href="/music/shed/start"
            className="
              inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold px-6 py-3 rounded-full uppercase tracking-wide transition shadow-lg shadow-orange-600/20
            "
          >
            Start New Shed Room
          </Link>

          {/* MUSIC QUICK ACTIONS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            <button className="bg-[#111] border border-white/10 p-6 rounded-2xl hover:bg-[#222] hover:shadow-[0_0_15px_rgba(255,128,0,0.3)] transition text-left group">
              <Headphones className="w-8 h-8 text-orange-400 mb-4 group-hover:scale-110 transition" />
              <h4 className="font-bold text-lg">Live Sheds</h4>
              <p className="text-xs text-gray-500 mt-1">Musicians live</p>
            </button>

            <button className="bg-[#111] border border-white/10 p-6 rounded-2xl hover:bg-[#222] hover:shadow-[0_0_15px_rgba(255,0,0,0.3)] transition text-left group">
              <Video className="w-8 h-8 text-red-400 mb-4 group-hover:scale-110 transition" />
              <h4 className="font-bold text-lg">Loop Packs</h4>
              <p className="text-xs text-gray-500 mt-1">CDub & Whoop</p>
            </button>

            <button className="bg-[#111] border border-white/10 p-6 rounded-2xl hover:bg-[#222] hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition text-left group">
              <Mic2 className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition" />
              <h4 className="font-bold text-lg">Vocals</h4>
              <p className="text-xs text-gray-500 mt-1">Runs & riffs</p>
            </button>

            <button className="bg-[#111] border border-white/10 p-6 rounded-2xl hover:bg-[#222] hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] transition text-left group">
              <Scissors className="w-8 h-8 text-pink-400 mb-4 group-hover:scale-110 transition" />
              <h4 className="font-bold text-lg">Stitch</h4>
              <p className="text-xs text-gray-500 mt-1">React to clips</p>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
