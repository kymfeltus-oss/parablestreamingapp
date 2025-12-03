"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Sparkles, PenSquare, MonitorPlay, Mic2, LayoutTemplate } from "lucide-react";

export default function CreatorToolsPage() {
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 mt-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#53fc18]">
              Creator Tools
            </h1>
            <p className="text-sm text-gray-400 mt-2 max-w-xl">
              AI-powered tools to help you prep sermons, organize notes, and
              deliver with confidence when you go live.
            </p>
          </div>
          <Sparkles className="w-8 h-8 text-[#53fc18] hidden sm:block" />
        </div>

        {/* Tool grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* AI Sermon Assist */}
          <Link
            href="/tools/sermon-prep"
            className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-5 hover:border-[#53fc18]/70 hover:scale-[1.02] transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#53fc18]/20 flex items-center justify-center">
                <PenSquare className="w-5 h-5 text-[#53fc18]" />
              </div>
              <h2 className="text-lg font-bold">AI Sermon Assist</h2>
            </div>
            <p className="text-xs text-gray-300">
              Draft outlines, refine points, generate scriptures, and build
              full sermon flows with AI assistance.
            </p>
          </Link>

          {/* Sermon to Teleprompter */}
          <Link
            href="/creator/tools/teleprompter"
            className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-5 hover:border-[#53fc18]/70 hover:scale-[1.02] transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#53fc18]/20 flex items-center justify-center">
                <MonitorPlay className="w-5 h-5 text-[#53fc18]" />
              </div>
              <h2 className="text-lg font-bold">Sermon Teleprompter</h2>
            </div>
            <p className="text-xs text-gray-300">
              Upload or paste your sermon and use a teleprompter-style view
              while you preach live on Parable.
            </p>
          </Link>

          {/* Stream Setup */}
          <Link
            href="/creator/tools/stream-setup"
            className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-5 hover:border-[#53fc18]/70 hover:scale-[1.02] transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#53fc18]/20 flex items-center justify-center">
                <Mic2 className="w-5 h-5 text-[#53fc18]" />
              </div>
              <h2 className="text-lg font-bold">Stream Setup</h2>
            </div>
            <p className="text-xs text-gray-300">
              Configure cameras, audio, scenes, and overlays for your live
              stream with step-by-step guidance.
            </p>
          </Link>

          {/* Overlays & Scenes */}
          <Link
            href="/creator/tools/overlays"
            className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-5 hover:border-[#53fc18]/70 hover:scale-[1.02] transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#53fc18]/20 flex items-center justify-center">
                <LayoutTemplate className="w-5 h-5 text-[#53fc18]" />
              </div>
              <h2 className="text-lg font-bold">Scenes & Overlays</h2>
            </div>
            <p className="text-xs text-gray-300">
              Manage lower-thirds, scripture overlays, giving prompts, and
              worship scene layouts.
            </p>
          </Link>

          {/* Library & Notes */}
          <Link
            href="/library"
            className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-5 hover:border-[#53fc18]/70 hover:scale-[1.02] transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#53fc18]/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#53fc18]" />
              </div>
              <h2 className="text-lg font-bold">Sermon Library</h2>
            </div>
            <p className="text-xs text-gray-300">
              Store past sermons, notes, series, and teaching content to reuse
              across streams.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
