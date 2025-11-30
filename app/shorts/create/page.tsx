"use client";

import Navbar from "@/components/Navbar";
import { UploadCloud } from "lucide-react";

export default function ShortsCreate() {
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />

      <main className="max-w-xl mx-auto px-6 pt-10 space-y-8">

        <h1 className="text-3xl font-black mb-4">Create Short</h1>
        <p className="text-gray-400 text-sm mb-8">Upload a sermon clip, reaction, or teaching moment.</p>

        <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">

          {/* Upload Area */}
          <div className="flex flex-col items-center justify-center py-10 border border-dashed border-white/20 rounded-xl cursor-pointer hover:bg-white/5 transition">
            <UploadCloud className="w-12 h-12 text-gray-500 mb-4" />
            <p className="text-gray-400 text-sm">Drag & drop your video or click to upload</p>
          </div>

          <input 
            className="w-full bg-black border border-white/20 rounded-lg px-4 py-3"
            placeholder="Short Title"
          />

          <button className="bg-violet-600 hover:bg-violet-500 w-full py-3 text-white font-bold rounded-lg">
            Upload Short
          </button>

        </div>
      </main>
    </div>
  );
}
