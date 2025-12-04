"use client";

import Link from "next/link";
import { Sparkles, Play, Music2, Mic2, Users } from "lucide-react";
import SignUpForm from "@/components/SignUpForm";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-10">
        <h1 className="text-5xl font-extrabold leading-tight">
          Stream • Create • Worship • Connect.
        </h1>

        <p className="mt-4 text-gray-300 max-w-xl text-sm">
          A faith-centered streaming platform designed for pastors, musicians,
          vocalists, and creators of the gospel community.
        </p>

        <div className="mt-6 flex gap-4 flex-wrap">
          <Link
            href="/feed"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#53fc18] text-black font-bold rounded-xl text-sm shadow-[0_0_18px_#53fc18]"
          >
            <Play className="w-4 h-4" />
            Enter Parable
          </Link>

          <Link
            href="/creator/tools"
            className="inline-flex items-center gap-2 px-8 py-3 border border-white/20 rounded-xl text-sm hover:bg-white/10 transition"
          >
            Creator Tools
          </Link>
        </div>

        {/* EMAIL SIGNUP */}
        <div className="mt-10 max-w-md">
          <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-6">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#53fc18]" />
              <h3 className="text-lg font-bold">Get Early Access</h3>
            </div>

            <p className="text-xs text-gray-400 mb-4">
              Join the early access list for Parable and be notified when creator
              onboarding opens.
            </p>

            <SignUpForm />
          </div>
        </div>
      </section>

      {/* GRID SECTIONS */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="rounded-xl border border-white/10 p-5 bg-[#0d0d0d]">
          <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
            <Mic2 className="w-5 h-5 text-[#53fc18]" /> Pastors & Ministries
          </h3>
          <p className="text-xs text-gray-400">
            Stream sermons, conferences, worship, prayer nights, and teaching
            series with tools built for ministry.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 p-5 bg-[#0d0d0d]">
          <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
            <Music2 className="w-5 h-5 text-[#53fc18]" /> Musicians & Vocalists
          </h3>
          <p className="text-xs text-gray-400">
            Host shed rooms, vocal warmups, rehearsals, and musical collaborations.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 p-5 bg-[#0d0d0d]">
          <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#53fc18]" /> Communities
          </h3>
          <p className="text-xs text-gray-400">
            Build breakout rooms, prayer rooms, Bible study groups, and global
            fellowship communities.
          </p>
        </div>
      </section>
    </div>
  );
}
