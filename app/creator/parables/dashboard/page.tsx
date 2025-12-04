"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { PlusCircle, Video, Gauge, Coins, BookOpen } from "lucide-react";

export default function ParablesDashboard() {
  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 pt-28 space-y-10">

        <h1 className="text-3xl font-extrabold">Parables Dashboard</h1>

        {/* QUICK ACTIONS */}
        <section className="grid grid-cols-2 gap-4">

          <Link
            href="/creator/parables/new-series"
            className="bg-[#111] p-5 rounded-2xl border border:white/10 flex flex-col items-center gap-3 hover:border-[#53fc18]/50 transition"
          >
            <BookOpen className="w-10 h-10 text-[#53fc18]" />
            <p className="font-bold text-sm">Create New Series</p>
          </Link>

          <Link
            href="/creator/parables/upload"
            className="bg-[#111] p-5 rounded-2xl border border:white/10 flex flex-col items-center gap-3 hover:border-[#53fc18]/50 transition"
          >
            <Video className="w-10 h-10 text-[#53fc18]" />
            <p className="font-bold text-sm">Upload Episode</p>
          </Link>

          <Link
            href="/monetization"
            className="bg-[#111] p-5 rounded-2xl border border:white/10 flex flex-col items-center gap-3 hover:border-[#53fc18]/50 transition"
          >
            <Coins className="w-10 h-10 text-[#53fc18]" />
            <p className="font-bold text-sm">Earnings</p>
          </Link>

          <Link
            href="/creator/parables/analytics"
            className="bg-[#111] p-5 rounded-2xl border border:white/10 flex flex-col items-center gap-3 hover:border-[#53fc18]/50 transition"
          >
            <Gauge className="w-10 h-10 text-[#53fc18]" />
            <p className="font-bold text-sm">Analytics</p>
          </Link>
        </section>

        {/* HELP / EDUCATION */}
        <section className="bg-[#111] p-6 rounded-2xl border border-white/10 space-y-3">
          <h2 className="text-xl font-bold">Your Parables</h2>
          <p className="text-gray-400 text-sm">
            Manage your series, edit metadata, add episodes, and review performance.
          </p>

          <div className="bg-[#0d0d0d] p-4 rounded-xl border border-white/10 text-center text-gray-500 text-sm">
            No series yet. Create one to get started.
          </div>
        </section>

      </main>
    </div>
  );
}
