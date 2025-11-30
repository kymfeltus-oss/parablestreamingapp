"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { 
  ArrowLeft, 
  CheckCircle2, 
  Drum, 
  Guitar, 
  Piano, 
  Mic, 
  Radio 
} from "lucide-react";

export default function StartShedPage() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white font-sans pb-24">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-8">

        {/* BACK LINK */}
        <Link
          href="/music/shed"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-6 text-sm font-bold uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Shed Hub
        </Link>

        {/* CARD */}
        <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 md:p-12">

          <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter mb-2">
            Start a Shed Room
          </h1>

          <p className="text-gray-400 mb-10 text-lg">
            Set up your live practice session and let musicians join your flow in real-time.
          </p>

          <div className="space-y-8 max-w-xl">

            {/* ROOM NAME */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Room Name / Vibe
              </label>
              <input
                type="text"
                placeholder="e.g., Late Night Organ Flow…"
                className="w-full bg-[#0e0e0e] border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition"
              />
            </div>

            {/* INSTRUMENT + GENRE */}
            <div className="grid grid-cols-2 gap-6">

              {/* PRIMARY INSTRUMENT */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Primary Instrument
                </label>
                <select className="w-full bg-[#0e0e0e] border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition">
                  <option>🎹 Keys / Organ</option>
                  <option>🥁 Drums</option>
                  <option>🎸 Bass</option>
                  <option>🎤 Vocals</option>
                  <option>🎛 Producer</option>
                </select>
              </div>

              {/* GENRE */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Genre Focus
                </label>
                <select className="w-full bg-[#0e0e0e] border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition">
                  <option>🔥 Gospel / Churchy</option>
                  <option>🎵 Jazz / Fusion</option>
                  <option>🎹 Neo-Soul</option>
                  <option>🎸 CCM / Worship</option>
                  <option>🎶 Producer / Beats</option>
                </select>
              </div>

            </div>

            {/* AUDIO CHECKLIST */}
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
              <h3 className="font-bold text-orange-400 mb-3 text-sm uppercase">
                Audio Checklist
              </h3>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Interface Connected
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Low Latency Mode: ON
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Gain Levels Balanced
                </div>
              </div>
            </div>

            {/* COVER IMAGE */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Cover Image URL
              </label>
              <input
                placeholder="Paste an image URL (optional)"
                className="w-full bg-[#0e0e0e] border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition"
              />
            </div>

            {/* GO LIVE */}
            <Link
              href="/stream/watch"
              className="block w-full bg-orange-600 hover:bg-orange-500 text-white font-extrabold px-6 py-4 rounded-full uppercase tracking-wide transition shadow-lg shadow-orange-600/20 text-center text-lg flex items-center justify-center gap-2"
            >
              <Radio className="w-6 h-6" /> Go Live Now
            </Link>

          </div>

        </div>
      </main>
    </div>
  );
}
