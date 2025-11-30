"use client";

import Navbar from "@/components/Navbar";

export default function MusicWatchPage() {
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 mt-10 space-y-6">
        <h1 className="text-3xl font-black">MUSIC & THE SHED • Watch Musicians</h1>
        <p className="text-sm text-gray-400">Live shed sessions, loops, and pro tips</p>

        <div className="relative w-full pt-[56.25%] bg-black rounded-3xl overflow-hidden border border-white/10">
          <iframe
            src="https://www.youtube.com/embed/XXGQyKyEdz8?si=Okd6Pl918NK6Drvo&start=7"
            className="absolute inset-0 w-full h-full"
            allowFullScreen
          />
        </div>
      </main>
    </div>
  );
}
