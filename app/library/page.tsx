"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { BookOpen, Play, Library, Download } from "lucide-react";

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-10 space-y-10">

        <h1 className="text-4xl font-black mb-3">Your Library</h1>
        <p className="text-gray-400 text-sm mb-10">
          Your purchased teachings, courses, worship packs & downloadable media.
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          <Link href="/library/teachings" className="bg-[#111] border border-white/10 p-6 rounded-2xl hover:border-violet-500/40 transition">
            <BookOpen className="w-8 h-8 text-violet-400 mb-3" />
            <h3 className="text-xl font-bold mb-1">Teachings</h3>
            <p className="text-xs text-gray-400">Saved sermons and preachings</p>
          </Link>

          <Link href="/library/music" className="bg-[#111] border border-white/10 p-6 rounded-2xl hover:border-violet-500/40 transition">
            <Play className="w-8 h-8 text-orange-400 mb-3" />
            <h3 className="text-xl font-bold mb-1">Worship & Music</h3>
            <p className="text-xs text-gray-400">Downloaded sessions and loops</p>
          </Link>

          <Link href="/library/downloads" className="bg-[#111] border border-white/10 p-6 rounded-2xl hover:border-violet-500/40 transition">
            <Download className="w-8 h-8 text-green-400 mb-3" />
            <h3 className="text-xl font-bold mb-1">Downloads</h3>
            <p className="text-xs text-gray-400">Files and media packs</p>
          </Link>

        </div>
      </main>
    </div>
  );
}
