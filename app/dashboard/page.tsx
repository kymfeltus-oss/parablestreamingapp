"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import {
  Users,
  Zap,
  Flame,
  Trophy,
  Video,
  Upload,
  Scissors,
  ArrowRight,
  DollarSign,
} from "lucide-react";

export default function Dashboard() {
  const liveNow = [
    {
      name: "Bishop T.D. Jakes",
      slug: "td-jakes",
      bannerUrl: "/td-jakes-banner.jpg",
      avatarUrl: "/td-jakes.jpg",
      liveStreamTitle: "Sunday Live from The Potter’s House",
    },
    {
      name: "Pastor Mike Todd",
      slug: "mike-todd",
      bannerUrl: "/channels4_banner.jpg",
      avatarUrl: "/mike-todd.jpg",
      liveStreamTitle: "Relationship Goals Reloaded",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold">Creator Hub</h1>
            <p className="text-gray-400 text-sm">
              Track your XP, earnings, and live channels across Parable.
            </p>
          </div>

          <button className="bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm hover:bg-white/20 transition">
            Edit Profile
          </button>
        </div>

        {/* XP + TODAY’S EARNINGS */}
        <section className="mb-12 grid md:grid-cols-[2fr,1fr] gap-4">
          {/* XP CARD */}
          <div className="bg-[#0f0f0f] border border-white/10 py-6 px-6 rounded-2xl">
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="text-xs text-gray-400">Creator Level</p>
                <h3 className="text-lg font-bold flex items-center gap-2">
                  Level 12 <Trophy className="w-5 h-5 text-yellow-400" />
                </h3>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">XP Progress</p>
                <p className="font-semibold text-emerald-400">18,420 / 20,000</p>
              </div>
            </div>

            <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-[87%] bg-gradient-to-r from-emerald-300 via-blue-500 to-red-500"></div>
            </div>

            <p className="mt-2 text-[11px] text-gray-500">
              Earn XP by going live, uploading content, and engaging with your community.
            </p>
          </div>

          {/* TODAY’S EARNINGS */}
          <div className="bg-[#0f0f0f] border border-white/10 py-4 px-5 rounded-2xl flex flex-col justify-center">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
              Today’s Earnings
            </p>
            <p className="text-2xl font-black text-emerald-400 flex items-center gap-1 mb-1">
              <DollarSign className="w-5 h-5" /> 182.50
            </p>
            <p className="text-[11px] text-gray-500 mb-2">
              Seeds, subs, and storefront combined.
            </p>
            <Link
              href="/dashboard/monetary"
              className="text-[11px] text-blue-400 hover:text-blue-200 flex items-center gap-1"
            >
              Open Monetary Dashboard <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <section className="grid md:grid-cols-4 gap-4 mb-12">
          <Link
            href="/stream"
            className="bg-[#151515] hover:bg-[#1f1f1f] border border-white/10 rounded-2xl p-5 transition"
          >
            <Video className="w-8 h-8 text-red-400 mb-3" />
            <p className="text-xl font-bold">Go Live</p>
            <p className="text-sm text-gray-400">Start a broadcast or sermon stream.</p>
          </Link>

          <Link
            href="/tools/sermon-prep"
            className="bg-[#151515] hover:bg-[#1f1f1f] border border-white/10 rounded-2xl p-5 transition"
          >
            <Upload className="w-8 h-8 text-blue-400 mb-3" />
            <p className="text-xl font-bold">Upload</p>
            <p className="text-sm text-gray-400">Drop a new teaching or clip.</p>
          </Link>

          <Link
            href="/shorts/create"
            className="bg-[#151515] hover:bg-[#1f1f1f] border border-white/10 rounded-2xl p-5 transition"
          >
            <Scissors className="w-8 h-8 text-pink-400 mb-3" />
            <p className="text-xl font-bold">Create Short</p>
            <p className="text-sm text-gray-400">Cut moments into reels.</p>
          </Link>

          <Link
            href="/support"
            className="bg-[#151515] hover:bg-[#1f1f1f] border border-white/10 rounded-2xl p-5 transition"
          >
            <DollarSign className="w-8 h-8 text-emerald-400 mb-3" />
            <p className="text-xl font-bold">Support Tools</p>
            <p className="text-sm text-gray-400">Seeds, subs, and store settings.</p>
          </Link>
        </section>

        {/* LIVE NOW SECTION */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-600 animate-pulse rounded-full"></span>
            Live Channels You Follow
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {liveNow.map((c, i) => (
              <Link
                key={i}
                href={`/creator/${c.slug}`}
                className="group relative rounded-2xl overflow-hidden bg-[#111] border border-white/10 hover:border-blue-400/50 transition"
              >
                <img
                  src={c.bannerUrl}
                  className="w-full h-60 object-cover opacity-60 group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] px-2 py-1 rounded font-bold shadow">
                  LIVE
                </div>

                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={c.avatarUrl}
                      className="w-10 h-10 rounded-full border border-white object-cover"
                    />
                    <span className="font-bold text-lg">{c.name}</span>
                  </div>
                  <p className="font-bold text-xl leading-tight">
                    {c.liveStreamTitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* EVENTS */}
        <section className="mb-12">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Flame className="w-6 h-6 text-red-500" /> Upcoming Events
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <Link
              href="/events"
              className="bg-[#151515] border border-white/10 p-6 rounded-2xl hover:bg-[#1f1f1f] transition block"
            >
              <h3 className="text-2xl font-bold mb-2">Revival Nights</h3>
              <p className="text-sm text-gray-400 mb-4">
                Live worship, prophetic sessions, and guest voices.
              </p>
              <span className="text-blue-400 font-bold text-xs flex items-center gap-1">
                View Schedule <ArrowRight className="w-3 h-3" />
              </span>
            </Link>

            <Link
              href="/music/events"
              className="bg-[#151515] border border-white/10 p-6 rounded-2xl hover:bg-[#1f1f1f] transition block"
            >
              <h3 className="text-2xl font-bold mb-2">Concert Streams</h3>
              <p className="text-sm text-gray-400 mb-4">
                Worship nights, tours, and live music sets.
              </p>
              <span className="text-blue-400 font-bold text-xs flex items-center gap-1">
                View Concerts <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
