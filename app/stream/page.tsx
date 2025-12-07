"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
// FIX: Change import from named export 'supabase' to named export 'createClient'
import { createClient } from "@/lib/supabaseClient";
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
  // FIX: Instantiate the client by calling the createClient function
  const supabase = createClient();
  
  const [streamers, setStreamers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStreamers();
  }, []);

  async function loadStreamers() {
    const { data, error } = await supabase
      .from("streamers")
      .select("*")
      .order("viewers", { ascending: false });

    if (!error && data) {
      setStreamers(data);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans pb-24">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-16 space-y-20">

        {/* ======================================================
            HEADER 
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
            DYNAMIC FEATURED STREAMERS SECTION (NEW)
        ======================================================= */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold">🔥 Live & Featured Creators</h2>

          {loading && (
            <p className="text-gray-400 text-sm">Loading streamers...</p>
          )}

          {!loading && streamers.length === 0 && (
            <p className="text-gray-500 text-sm">
              No live or featured creators yet.
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {streamers.map((s) => (
              <div
                key={s.id}
                className="parable-card parable-card-hover hover:shadow-[0_0_20px_#53fc18] transition"
              >
                {/* Thumbnail */}
                <div className="aspect-video rounded-xl border border-white/10 overflow-hidden bg-black">
                  <img
                    src={s.thumbnail_url}
                    className="w-full h-full object-cover opacity-90 hover:scale-110 transition duration-500"
                  />
                </div>

                {/* Name */}
                <p className="font-bold mt-3 text-sm">{s.name}</p>

                {/* Live indicator */}
                <p className="text-xs flex items-center gap-2 text-gray-400 mt-1">
                  <Radio
                    className={`w-3 h-3 ${
                      s.is_live ? "text-[#53fc18]" : "text-gray-600"
                    }`}
                  />
                  {s.is_live ? `${s.viewers} watching` : "Offline"}
                </p>

                {/* Category */}
                <p className="text-[11px] text-gray-500">{s.category}</p>
              </div>
            ))}
          </div>
        </section>


        {/* ======================================================
            TWO-COLUMN MAIN GRID 
            (YOUR ORIGINAL UI — FULLY RETAINED)
        ======================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* LEFT COLUMN — GO LIVE */}
          <div className="space-y-10">
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
                <h3 className="text-3xl font-black italic">
                  Enter the Sanctuary
                </h3>
                <p className="text-gray-300 text-sm mt-1">
                  AI-guided prayer, sermons, and meditative worship.
                </p>
                <button className="mt-4 flex items-center gap-3 text-sm font-semibold hover:text-violet-400 transition">
                    Enter <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* AI ACTION BUTTONS */}
            <div className="grid grid-cols-2 gap-6">
              <button
                className="
                  bg-[#111] border border-white/10 rounded-2xl p-6 text-left group
                  hover:border-violet-500/40 hover:shadow-[0_0_15px_rgba(124,58,237,0.3)] transition
                "
              >
                <Headphones className="w-8 h-8 text-violet-400 mb-4 group-hover:scale-110 transition" />
                <h4 className="font-bold text-lg">Daily Devotional</h4>
                <p className="text-xs text-gray-500 mt-1">AI-read scripture & prayer</p>
              </button>

              <button
                className="
                  bg-[#111] border border-white/10 rounded-2xl p-6 text-left group
                  hover:border-[#53fc18]/40 hover:shadow-[0_0_15px_rgba(83,252,24,0.3)] transition
                "
              >
                <Church className="w-8 h-8 text-[#53fc18] mb-4 group-hover:scale-110 transition" />
                <h4 className="font-bold text-lg">Nearby Events</h4>
                <p className="text-xs text-gray-500 mt-1">Find local events & churches</p>
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
