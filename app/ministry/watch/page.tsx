"use client";

import Navbar from "@/components/Navbar";

export default function MinistryWatchPage() {
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 mt-10 space-y-6">
        <h1 className="text-3xl font-black">MINISTRY & WORD • Watch Service</h1>
        <p className="text-sm text-gray-400">Bishop T.D. Jakes • The Potter’s House</p>

        <div className="relative w-full pt-[56.25%] bg-black rounded-3xl overflow-hidden border border-white/10">
          <iframe
            src="https://www.youtube.com/embed/edcc68JTpwc?si=KVcrfdnQQ6Ov5m06&start=3"
            className="absolute inset-0 w-full h-full"
            allowFullScreen
          />
        </div>
      </main>
    </div>
  );
}
