"use client";

import Navbar from "@/components/Navbar";
import { Megaphone, Send } from "lucide-react";

export default function AnnouncementsPage() {
  const announcements = [
    { message: "🔥 Revival Night this Sunday @ 6pm CST!", date: "Feb 12" },
    { message: "New worship loops added to The Shed!", date: "Feb 10" },
    { message: "Congratulations to Bishop Jakes on 1M followers!", date: "Feb 7" }
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-10 space-y-12">

        <h1 className="text-4xl font-black flex items-center gap-3">
          <Megaphone className="w-8 h-8 text-yellow-400" />
          Global Announcements
        </h1>
        <p className="text-gray-400 text-sm mb-4">Send platform-wide messages to all users.</p>

        {/* CREATE ANNOUNCEMENT */}
        <div className="bg-[#111] border border-white/10 p-6 rounded-2xl space-y-4">
          <textarea
            rows={4}
            className="bg-black border border-white/20 rounded-lg w-full p-4 text-sm outline-none"
            placeholder="Write an announcement..."
          ></textarea>

          <button className="bg-violet-600 hover:bg-violet-500 px-6 py-3 rounded-lg font-bold flex items-center gap-2">
            <Send className="w-5 h-5" /> Post Announcement
          </button>
        </div>

        {/* LIST OF ANNOUNCEMENTS */}
        <div className="space-y-4">
          {announcements.map((a, i) => (
            <div
              key={i}
              className="bg-[#111] border border-white/10 p-5 rounded-xl flex justify-between"
            >
              <div>
                <p className="font-medium">{a.message}</p>
                <p className="text-xs text-gray-500 mt-1">Posted: {a.date}</p>
              </div>
              
              <button className="text-red-400 hover:text-red-300 text-xs font-bold">
                Delete
              </button>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
