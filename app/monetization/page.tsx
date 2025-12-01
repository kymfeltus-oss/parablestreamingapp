"use client";

import Link from "next/link";
import { Coins, Sparkles } from "lucide-react";

export default function MonetizationPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-3xl font-black mb-4">Monetization</h1>

      <p className="text-gray-300 mb-6">
        Support your favorite creators through Seeds, Gifts, and Live Tipping.
      </p>

      {/* HOW IT WORKS */}
      <div className="bg-[#111] p-5 rounded-2xl border border-white/10 mb-6">
        <h2 className="text-xl font-bold mb-2">How It Works</h2>
        <ul className="text-gray-400 space-y-2 text-sm">
          <li>• Buy Seeds to support creators.</li>
          <li>• Send Gifts during livestreams.</li>
          <li>• Unlock badges, reactions & exclusive emotes.</li>
          <li>• Creators earn revenue instantly.</li>
        </ul>
      </div>

      {/* BUY SEEDS */}
      <div className="bg-[#111] p-5 rounded-2xl border border-white/10">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-3">
          <Coins className="w-5 h-5 text-yellow-300" /> Buy Seeds
        </h2>

        <div className="space-y-3">
          {[100, 500, 1200, 5000].map((amt) => (
            <div
              key={amt}
              className="flex items-center justify-between bg-[#1a1a1a] px-4 py-3 rounded-xl border border-white/10"
            >
              <span className="text-lg font-bold">{amt} Seeds</span>
              <button className="bg-[#53fc18] px-4 py-2 text-black font-bold rounded-lg">
                Purchase
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-xs">
        Built for creators. Powered by community.
      </div>

    </div>
  );
}
