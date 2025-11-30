"use client";

import Navbar from "@/components/Navbar";
import { Trophy, Medal, Sparkles, Award } from "lucide-react";

const unlocked = [
  {
    title: "First Fruits",
    desc: "Received your first Tithe via the platform.",
    icon: Trophy,
    className: "from-emerald-500/40 to-emerald-800/40",
  },
  {
    title: "Seed Sower",
    desc: "Viewers gifted over 10,000 Seeds total.",
    icon: Sparkles,
    className: "from-amber-400/40 to-orange-700/40",
  },
  {
    title: "Faithful Streamer",
    desc: "Streamed 7 days in a row.",
    icon: Medal,
    className: "from-violet-500/40 to-indigo-800/40",
  },
];

const locked = [
  {
    title: "Open Heaven",
    desc: "Maintain a 30 day streak of streaming and Seed activity.",
  },
  {
    title: "Global Impact",
    desc: "Reach viewers from 25 different countries.",
  },
  {
    title: "Revival Season",
    desc: "Hit 10,000 concurrent viewers in a single stream.",
  },
];

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-8">
        <header>
          <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">
            <Award className="w-7 h-7 text-yellow-300" />
            Achievements
          </h1>
          <p className="text-sm text-gray-400">
            Track your progress as a hybrid ministry + gaming creator. Unlock badges, effects, and Seed multipliers.
          </p>
        </header>

        {/* UNLOCKED */}
        <section>
          <h2 className="text-sm font-semibold mb-3">Unlocked</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {unlocked.map((ach) => {
              const Icon = ach.icon;
              return (
                <div
                  key={ach.title}
                  className={`rounded-2xl border border-white/15 bg-gradient-to-b ${ach.className} p-4 flex flex-col justify-between`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-5 h-5" />
                    <p className="font-semibold text-sm">{ach.title}</p>
                  </div>
                  <p className="text-[11px] text-gray-100">{ach.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* LOCKED */}
        <section>
          <h2 className="text-sm font-semibold mb-3">Locked (Preview)</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {locked.map((ach) => (
              <div
                key={ach.title}
                className="rounded-2xl border border-dashed border-white/15 bg-[#101010] p-4 text-xs text-gray-400"
              >
                <p className="font-semibold text-sm text-gray-200 mb-1">
                  {ach.title}
                </p>
                <p>{ach.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
