"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { Coins, HeartHandshake, Sparkles, Flame } from "lucide-react";

const seedPackages = [
  { name: "Starter Seed Pack", seeds: 500, price: "$4.99" },
  { name: "Overflow Pack", seeds: 1500, price: "$9.99" },
  { name: "Open Heaven Pack", seeds: 5000, price: "$24.99" },
];

const sampleTargets = [
  { name: "Sunday Service", slug: "mike-todd" },
  { name: "Youth Night Co-Op", slug: "steven-furtick" },
  { name: "Worship Live", slug: "lauren-daigle" },
];

export default function SeedsPage() {
  const [selectedPack, setSelectedPack] = useState(seedPackages[0]);
  const [selectedTarget, setSelectedTarget] = useState(sampleTargets[0]);
  const [giftLog, setGiftLog] = useState<string[]>([]);

  const handleGift = () => {
    const msg = `You sowed ${selectedPack.seeds} Seeds into ${selectedTarget.name}.`;
    setGiftLog((prev) => [msg, ...prev].slice(0, 5));
  };

  const handleTithe = () => {
    const msg = `You tapped "Tithe Now" during ${selectedTarget.name}.`;
    setGiftLog((prev) => [msg, ...prev].slice(0, 5));
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* HEADER */}
        <section className="flex flex-col md:flex-row justify-between gap-4 items-start">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Coins className="w-7 h-7 text-amber-300" />
              Prophetic Seeds & Gifting
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Purchase Seeds and sow into live streams with “Seeds” or give directly with “Tithe Now.”
            </p>
          </div>
        </section>

        {/* BUY SEEDS + TARGET */}
        <section className="grid md:grid-cols-2 gap-6">
          {/* Seed Packs */}
          <div className="bg-[#101010] border border-white/10 rounded-2xl p-5">
            <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" /> Choose a Seed Pack
            </h2>
            <div className="space-y-2">
              {seedPackages.map((pack) => (
                <button
                  key={pack.name}
                  onClick={() => setSelectedPack(pack)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs border ${
                    selectedPack.name === pack.name
                      ? "bg-amber-500/20 border-amber-400 text-amber-100"
                      : "bg-white/5 border-white/15 text-gray-200 hover:bg-white/10"
                  }`}
                >
                  <div className="flex justify-between">
                    <span className="font-semibold">{pack.name}</span>
                    <span className="font-semibold">{pack.price}</span>
                  </div>
                  <p className="text-[11px] text-gray-300">
                    {pack.seeds.toLocaleString()} Seeds
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Target & Actions */}
          <div className="bg-[#101010] border border-white/10 rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-semibold flex items-center gap-2">
              <Flame className="w-4 h-4 text-red-400" /> Choose Live Stream Target
            </h2>
            <div className="flex gap-2 text-xs">
              {sampleTargets.map((t) => (
                <button
                  key={t.slug}
                  onClick={() => setSelectedTarget(t)}
                  className={`flex-1 px-3 py-2 rounded-full border ${
                    selectedTarget.slug === t.slug
                      ? "bg-violet-600 border-violet-400"
                      : "bg-white/5 border-white/20 hover:bg-white/10"
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <button
                onClick={handleGift}
                className="w-full bg-amber-400 hover:bg-amber-300 text-black font-bold py-2 rounded-xl text-sm flex items-center justify-center gap-2"
              >
                <Coins className="w-4 h-4" />
                Sow {selectedPack.seeds.toLocaleString()} Seeds
              </button>
              <button
                onClick={handleTithe}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-2 rounded-xl text-sm flex items-center justify-center gap-2"
              >
                <HeartHandshake className="w-4 h-4" />
                Tithe Now
              </button>
            </div>
          </div>
        </section>

        {/* RECENT ACTIVITY */}
        <section className="bg-[#101010] border border-white/10 rounded-2xl p-5">
          <h2 className="text-sm font-semibold mb-3">Recent Seed Activity (Demo)</h2>
          {giftLog.length === 0 ? (
            <p className="text-xs text-gray-500">
              No activity yet. Choose a pack, a stream, and try “Sow Seeds” or “Tithe Now”.
            </p>
          ) : (
            <ul className="space-y-1 text-xs text-gray-200">
              {giftLog.map((line, idx) => (
                <li key={idx}>• {line}</li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
