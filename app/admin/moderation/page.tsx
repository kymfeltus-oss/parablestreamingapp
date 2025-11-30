"use client";

import Navbar from "@/components/Navbar";
import { Flag, MessagesSquare, ShieldCheck, AlertTriangle } from "lucide-react";

export default function ModerationPanel() {
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-10 space-y-10">

        <h1 className="text-4xl font-black flex items-center gap-3">
          <Flag className="w-8 h-8 text-yellow-400" />
          Moderation Queue
        </h1>

        <p className="text-gray-400 text-sm mb-4">
          Review flagged messages, videos & creator activity.
        </p>

        <div className="space-y-6">

          <div className="bg-[#111] p-6 border border-white/10 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <MessagesSquare className="w-6 h-6 text-red-400" />
              <h3 className="text-xl font-bold">Flagged Chat Messages</h3>
            </div>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• User456: “This is trash” (Toxic)</li>
              <li>• GuestUser: “Spam link here…” (Spam)</li>
              <li>• Mike21: “Fake prophet!” (Harassment)</li>
            </ul>
          </div>

          <div className="bg-[#111] p-6 border border-white/10 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="w-6 h-6 text-orange-400" />
              <h3 className="text-xl font-bold">Flagged Videos</h3>
            </div>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• “Prophetic Drift?” – Reported for misinformation</li>
              <li>• “Sermon Highlights” – Copyright claim</li>
            </ul>
          </div>

          <div className="bg-[#111] p-6 border border-white/10 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <h3 className="text-xl font-bold">Auto-Moderation Rules</h3>
            </div>

            <button className="bg-violet-600 px-4 py-2 rounded-lg font-bold hover:bg-violet-500">
              Manage Filters
            </button>
          </div>

        </div>

      </main>
    </div>
  );
}
