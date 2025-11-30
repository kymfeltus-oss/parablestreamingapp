"use client";

import Navbar from "@/components/Navbar";
import { Flag, MessageSquare, User, AlertTriangle } from "lucide-react";

export default function FlagsPage() {
  const flags = [
    { 
      type: "Chat Message", 
      user: "RandomUser12", 
      reason: "Harassment", 
      message: "You're a false prophet bro 💀", 
      avatar: "/td_avatar.jpg"
    },
    { 
      type: "Video Clip", 
      user: "GuestUser", 
      reason: "Copyright Claim", 
      message: "Used background track without permission",
      avatar: "/course_music.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 pt-10 space-y-12">

        <h1 className="text-4xl font-black flex items-center gap-3">
          <Flag className="w-8 h-8 text-red-500" />
          Content Flags
        </h1>
        <p className="text-gray-400 text-sm">Review reports submitted by users at runtime.</p>

        <div className="space-y-6">
          {flags.map((f, idx) => (
            <div
              key={idx}
              className="bg-[#111] p-6 rounded-2xl border border-white/10 flex justify-between items-start"
            >
              <div className="flex gap-4">
                <img 
                  src={f.avatar} 
                  className="w-12 h-12 rounded-full border border-white/10 object-cover"
                />
                <div>
                  <p className="font-semibold text-sm">{f.type}</p>
                  <p className="text-xs text-gray-400 mb-2">Reported for: {f.reason}</p>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-xs text-gray-300">
                    {f.message}
                  </div>
                </div>
              </div>

              <button className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg text-xs font-bold">
                Resolve
              </button>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
