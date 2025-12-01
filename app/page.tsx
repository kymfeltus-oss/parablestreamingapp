"use client";

import Link from "next/link";
import { Users, Sparkles, Coins } from "lucide-react";

export default function HomePage() {
  const liveStreams = [
    {
      id: 1,
      title: "Faith + Obedience = Miracles!",
      streamer: "Bishop T.D. Jakes",
      viewers: 18_205,
      tags: ["Sermon", "Faith", "Live"],
      thumbnail: "/td-jakes.jpg",
    },
    {
      id: 2,
      title: "Praise Break • Live Worship",
      streamer: "Kirk Franklin",
      viewers: 12_440,
      tags: ["Worship", "Music", "Praise"],
      thumbnail: "/kirk_avatar.png",
    },
    {
      id: 3,
      title: "Late Night Gospel Flow",
      streamer: "Lauren Daigle",
      viewers: 9_200,
      tags: ["Gospel", "Live", "Music"],
      thumbnail: "/lauren-daigle.jpg",
    },
    {
      id: 4,
      title: "Prayer & Prophetic Flow",
      streamer: "Pastor Stevenson",
      viewers: 7_855,
      tags: ["Prayer", "Teaching"],
      thumbnail: "/steven-furtick.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-24">

      {/* HEADER */}
      <div className="flex items-center justify-between px-5 py-4 bg-[#0f0f0f] border-b border-white/10">

        {/* BIG PARABLE LOGO */}
        <span className="text-5xl font-black tracking-tight text-[#53fc18]">
          PARABLE
        </span>

        {/* GET SEEDS BUTTON */}
        <Link
          href="/monetization"
          className="bg-[#53fc18] text-black font-bold px-4 py-2 rounded-xl flex items-center gap-2 shadow-[0_0_10px_#53fc18] text-sm"
        >
          <Coins className="w-4 h-4" />
          GET SEEDS
        </Link>
      </div>

      {/* FEATURED FLASH BANNER */}
      <div className="relative mt-4 mx-5 rounded-2xl overflow-hidden border border-white/10 h-40 bg-gradient-to-r from-[#53fc18]/20 via-black to-[#3bff95]/20 flex items-center">
        <div className="px-6">
          <h2 className="text-3xl font-black">Streaming. Creating. Believing.</h2>
          <p className="text-gray-300 mt-1 text-sm">
            Build your voice. Grow your ministry. Inspire a generation.
          </p>
        </div>
        <Sparkles className="absolute right-6 bottom-6 w-10 h-10 text-[#53fc18]" />
      </div>

      {/* LIVE NOW SECTION */}
      <div className="mt-8 px-5">
        <h2 className="text-2xl font-bold mb-3">Live Now</h2>

        {/* GRID — 2 on desktop, 3–4 on tablet/phone */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {liveStreams.map((stream) => (
            <div
              key={stream.id}
              className="bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-xl"
            >
              <div className="relative">
                <img
                  src={stream.thumbnail}
                  className="w-full h-32 object-cover"
                />

                <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded font-black uppercase">
                  LIVE
                </span>

                <span className="absolute bottom-1 left-2 bg-black/70 px-2 py-0.5 text-[11px] rounded flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {stream.viewers.toLocaleString()}
                </span>
              </div>

              <div className="p-2">
                <p className="font-bold text-sm leading-tight">{stream.title}</p>
                <p className="text-[11px] text-gray-400">{stream.streamer}</p>

                <div className="flex flex-wrap gap-1 mt-2">
                  {stream.tags.map((t, i) => (
                    <span
                      key={i}
                      className="px-1 py-0.5 bg-[#222] border border-white/10 text-[9px] rounded text-gray-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CREATOR TOOLS SECTION */}
      <div className="mt-10 px-5">
        <h2 className="text-2xl font-bold mb-3">Creator Tools</h2>

        <div className="grid grid-cols-2 gap-4">
          {/* STREAM SETUP */}
          <Link
            href="/creator/tools"
            className="bg-[#111] p-4 rounded-xl border border-white/10 hover:bg-[#1a1a1a] transition"
          >
            <h3 className="font-bold">Stream Setup</h3>
            <p className="text-gray-400 text-xs mt-1">Go live, manage overlays</p>
          </Link>

          {/* ANALYTICS */}
          <Link
            href="/dashboard/analytics"
            className="bg-[#111] p-4 rounded-xl border border-white/10 hover:bg-[#1a1a1a] transition"
          >
            <h3 className="font-bold">Analytics</h3>
            <p className="text-gray-400 text-xs mt-1">View engagement</p>
          </Link>

          {/* MONETIZATION */}
          <Link
            href="/monetization"
            className="bg-[#111] p-4 rounded-xl border border-white/10 hover:bg-[#1a1a1a] transition"
          >
            <h3 className="font-bold">Monetization</h3>
            <p className="text-gray-400 text-xs mt-1">
              Earn seeds & gifts
            </p>
          </Link>

          {/* LIBRARY */}
          <Link
            href="/library"
            className="bg-[#111] p-4 rounded-xl border border-white/10 hover:bg-[#1a1a1a] transition"
          >
            <h3 className="font-bold">My Library</h3>
            <p className="text-gray-400 text-xs mt-1">
              Saved content
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
