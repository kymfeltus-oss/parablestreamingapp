"use client";

import Navbar from "@/components/Navbar";

export default function MobilePreview() {
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />

      <main className="max-w-md mx-auto px-6 pt-10 space-y-8">

        <h1 className="text-3xl font-black">Mobile Layout Preview</h1>
        <p className="text-gray-400 text-sm">
          Preview your components and screens optimized for mobile devices.
        </p>

        <div className="bg-[#111] border border-white/10 p-8 rounded-2xl">
          <p className="text-gray-400 text-sm">
            Add your mobile previews, demos, or generated mobile layouts here.
          </p>
        </div>

      </main>
    </div>
  );
}
