"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { BookOpen, Coins, Play, Users } from "lucide-react";

export default function ParablesHub() {
  return (
    <div className="min-h-screen bg-black text-white pb-28">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 pt-28 space-y-12">

        {/* HEADER */}
        <section className="text-center">
          <div className="w-20 h-20 mx-auto bg-[#53fc18]/20 border border-[#53fc18]/40 rounded-2xl flex items-center justify-center shadow-[0_0_20px_#53fc18] mb-4">
            <BookOpen className="w-10 h-10 text-[#53fc18]" />
          </div>
          <h1 className="text-4xl font-black mb-3">Parables</h1>
          <p className="text-gray-300 text-sm leading-relaxed">
            Short-form stories. Big lessons. Parables are vertical mini-dramas designed to teach, inspire, 
            and move people — in under 2 minutes. 
          </p>
        </section>

        {/* WHAT ARE PARABLES */}
        <section className="bg-[#111] p-6 rounded-2xl border border-white/10 space-y-3">
          <h2 classclassName="text-xl font-bold">What Are Parables?</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Parables are short, vertical video stories created by pastors, influencers, ministries, and 
            storytellers. Each parable teaches a principle through a modern, cinematic microdrama.
          </p>

          <ul className="text-gray-400 text-sm space-y-2 mt-4">
            <li>• Episodes are 30–120 seconds</li>
            <li>• Mobile-first vertical format</li>
            <li>• Designed for binge-watching</li>
            <li>• Optimized for AI-powered discovery</li>
          </ul>
        </section>

        {/* MONETIZATION */}
        <section className="bg-[#111] p-6 rounded-2xl border border-white/10 space-y-3">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Coins className="w-5 h-5 text-[#53fc18]" /> How Creators Earn
          </h2>

          <p className="text-gray-300 text-sm leading-relaxed">
            Parables are fully monetizable. Creators earn Seeds every time a viewer engages, watches, shares,
            or unlocks premium episodes. Seeds convert into real revenue.
          </p>

          <ul className="text-gray-400 text-sm space-y-2 mt-4">
            <li>• Earn from episode unlocks</li>
            <li>• Earn from gifts & reactions</li>
            <li>• Earn from Shares & Saves</li>
            <li>• Earn ad-revenue from popular parables</li>
          </ul>
        </section>

        {/* HOW TO GET STARTED */}
        <section className="bg-[#111] p-6 rounded-2xl border border-white/10 space-y-3">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Users className="w-5 h-5 text-[#53fc18]" /> Become a Parable Creator
          </h2>

          <p className="text-gray-300 text-sm leading-relaxed">
            Whether you're a pastor, storyteller, actor, musician, or influencer — Parables give you a
            powerful way to reach people with faith-based stories that matter.
          </p>

          <ul className="text-gray-400 text-sm space-y-2 mt-4">
            <li>• Create a series with any theme or topic</li>
            <li>• Upload episodes using our creator tools</li>
            <li>• Track performance inside your dashboard</li>
            <li>• Monetize through Seeds, ranking bonuses & premium views</li>
          </ul>
        </section>

        {/* BUTTON TO CREATOR DASHBOARD */}
        <div className="text-center">
          <Link
            href="/creator/parables/dashboard"
            className="
              inline-flex items-center gap-2 px-8 py-4 
              bg-[#53fc18] text-black font-bold rounded-2xl 
              shadow-[0_0_20px_#53fc18] hover:bg-[#45d516] 
              transition-all text-lg
            "
          >
            Go to Parables Dashboard
            <Play className="w-5 h-5" />
          </Link>
        </div>
      </main>
    </div>
  );
}
