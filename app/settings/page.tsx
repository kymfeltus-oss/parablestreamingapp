"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function SettingsPage() {
  const [displayName, setDisplayName] = useState("Joshua");
  const [showGaming, setShowGaming] = useState(true);
  const [showProphetic, setShowProphetic] = useState(true);
  const [acceptSeeds, setAcceptSeeds] = useState(true);
  const [autoTitheLabel, setAutoTitheLabel] = useState("Tithe Now");
  const [bio, setBio] = useState(
    "Hybrid ministry streamer mixing teaching, community, and gaming."
  );

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-8">
        <header>
          <h1 className="text-3xl font-bold mb-1">Creator Settings</h1>
          <p className="text-sm text-gray-400">
            Configure how your hybrid ministry + gaming presence appears on NexusFaith.
          </p>
        </header>

        {/* BASIC INFO */}
        <section className="bg-[#101010] border border-white/10 rounded-2xl p-5 space-y-4">
          <h2 className="text-sm font-semibold">Profile</h2>
          <div className="space-y-3 text-sm">
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Display Name
              </label>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-violet-500 resize-none"
              />
            </div>
          </div>
        </section>

        {/* TOGGLES */}
        <section className="bg-[#101010] border border-white/10 rounded-2xl p-5 space-y-4 text-sm">
          <h2 className="text-sm font-semibold">Channel Modules</h2>
          <label className="flex items-center justify-between gap-3">
            <div>
              <p>Show Gaming Tab</p>
              <p className="text-xs text-gray-400">
                Display your gaming streams along with sermons and teaching.
              </p>
            </div>
            <button
              onClick={() => setShowGaming((v) => !v)}
              className={`w-12 h-6 rounded-full flex items-center px-1 ${
                showGaming ? "bg-emerald-500" : "bg-gray-600"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transform transition ${
                  showGaming ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </label>

          <label className="flex items-center justify-between gap-3">
            <div>
              <p>Show Prophetic / Ministry Focus</p>
              <p className="text-xs text-gray-400">
                Surface teaching, prayer, and Q&A sessions more prominently.
              </p>
            </div>
            <button
              onClick={() => setShowProphetic((v) => !v)}
              className={`w-12 h-6 rounded-full flex items-center px-1 ${
                showProphetic ? "bg-emerald-500" : "bg-gray-600"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transform transition ${
                  showProphetic ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </label>

          <label className="flex items-center justify-between gap-3">
            <div>
              <p>Accept Seeds & Gifts</p>
              <p className="text-xs text-gray-400">
                Allow viewers to sow Seeds and gifts during your streams.
              </p>
            </div>
            <button
              onClick={() => setAcceptSeeds((v) => !v)}
              className={`w-12 h-6 rounded-full flex items-center px-1 ${
                acceptSeeds ? "bg-emerald-500" : "bg-gray-600"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transform transition ${
                  acceptSeeds ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </label>
        </section>

        {/* TITHE LABEL */}
        <section className="bg-[#101010] border border-white/10 rounded-2xl p-5 space-y-3 text-sm">
          <h2 className="text-sm font-semibold">Tithe Button Label</h2>
          <p className="text-xs text-gray-400">
            Customize the label that appears for your primary giving button.
          </p>
          <input
            value={autoTitheLabel}
            onChange={(e) => setAutoTitheLabel(e.target.value)}
            className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-violet-500"
          />
          <div className="mt-2">
            <p className="text-xs text-gray-400 mb-1">Preview:</p>
            <button className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-4 py-2 rounded-full text-xs">
              {autoTitheLabel}
            </button>
          </div>
        </section>

        <div className="flex justify-end">
          <button className="bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs px-5 py-2 rounded-full">
            Save Changes (Demo)
          </button>
        </div>
      </main>
    </div>
  );
}
