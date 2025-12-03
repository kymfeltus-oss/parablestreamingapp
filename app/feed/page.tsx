"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Sparkles, Coins, Music2, Mic2 } from "lucide-react";
import FlashLandingPage from "@/components/FlashLandingPage";

export default function FeedPage() {
  const [showFlash, setShowFlash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowFlash(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (showFlash) {
    return <FlashLandingPage />;
  }

  const liveStreams = [
    {
      id: 1,
      slug: "td-jakes",
      title: "Faith + Obedience = Miracles!",
      streamer: "Bishop T.D. Jakes",
      viewers: 18205,
      tags: ["Sermon", "Faith", "Live"],
      thumbnail: "/td-jakes.jpg",
    },
    {
      id: 2,
      slug: "kirk-franklin",
      title: "Praise Break • Live Worship",
      streamer: "Kirk Franklin",
      viewers: 12440,
      tags: ["Worship", "Music", "Praise"],
      thumbnail: "/kirk_avatar.png",
    },
    {
      id: 3,
      slug: "lauren-daigle",
      title: "Late Night Gospel Flow",
      streamer: "Lauren Daigle",
      viewers: 9200,
      tags: ["Gospel", "Live", "Music"],
      thumbnail: "/lauren-daigle.jpg",
    },
    {
      id: 4,
      slug: "pastor-stevenson",
      title: "Prayer & Prophetic Flow",
      streamer: "Pastor Stevenson",
      viewers: 7855,
      tags: ["Prayer", "Teaching"],
      thumbnail: "/steven-furtick.jpg",
    },
  ];

  const shedRooms = [
    {
      id: 1,
      title: "Combined Music Shed • Full Band",
      subtitle: "Keys • Drums • Bass • Guitar",
      viewers: 1320,
    },
    {
      id: 2,
      title: "Keys + Organ Session",
      subtitle: "Chord voicings • Flow • Pads",
      viewers: 880,
    },
    {
      id: 3,
      title: "Drums + Bass Lock-In",
      subtitle: "Pocket • Groove • Timing",
      viewers: 1670,
    },
    {
      id: 4,
      title: "Guitar + Aux Collab",
      subtitle: "Atmosphere • Textures • FX",
      viewers: 740,
    },
  ];

  const vocalRooms = [
    {
      id: 1,
      title: "🔥 Combined Vocal Shed",
      subtitle: "Leads • Harmony • Ad-libs",
      viewers: 2020,
    },
    {
      id: 2,
      title: "Lead Vocal Session",
      subtitle: "Tone • Control • Emotion",
      viewers: 920,
    },
    {
      id: 3,
      title: "Harmony Stack Room",
      subtitle: "Parts • Blends • Stacks",
      viewers: 1420,
    },
    {
      id: 4,
      title: "Choir & Ensemble Lab",
      subtitle: "Sections • Dynamics • Flow",
      viewers: 1100,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-28">
      {/* HEADER */}
      <div className="flex items-center justify-between w-full px-6 py-5 bg-[#0f0f0f] border-b border-white/10">
        <span className="text-6xl font-black tracking-tight text-[#53fc18]">
          PARABLE
        </span>

        <Link
          href="/monetization"
          className="bg-[#53fc18] text-black font-bold px-5 py-2 rounded-xl flex items-center gap-2 shadow-[0_0_12px_#53fc18]"
        >
          <Coins className="w-5 h-5" />
          GET SEEDS
        </Link>
      </div>

      {/* HERO */}
      <div className="relative mt-5 mx-6 rounded-2xl overflow-hidden border border-white/10 h-44 bg-gradient-to-r from-[#53fc18]/20 via-black to-[#3bff95]/20 flex items-center justify-start">
        <div className="px-6">
          <h2 className="text-4xl font-black">Streaming. Creating. Believing.</h2>
          <p className="text-gray-300 mt-2 text-sm max-w-xs">
            A community for believers, creators & gospel influencers.
          </p>
        </div>
        <Sparkles className="absolute right-6 bottom-6 w-12 h-12 text-[#53fc18]" />
      </div>

      {/* LIVE NOW */}
      <div className="mt-10 px-6 w-full">
        <h2 className="text-3xl font-extrabold mb-4 text-[#53fc18]">Live Now</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {liveStreams.map((s) => (
            <Link
              key={s.id}
              href={`/creator/${s.slug}`}
              className="rounded-xl overflow-hidden border border-white/10 bg-[#0d0d0d] hover:scale-[1.02] transition duration-200 flex flex-col h-[300px]"
            >
              {/* IMAGE */}
              <div className="relative h-36 w-full">
                <img src={s.thumbnail} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded font-black">
                  LIVE
                </span>
                <span className="absolute bottom-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {s.viewers.toLocaleString()}
                </span>
              </div>

              {/* TEXT */}
              <div className="flex flex-col justify-between flex-1 p-3">
                <div>
                  <p className="font-bold text-sm leading-tight line-clamp-2 text-center">
                    {s.title}
                  </p>
                  <p className="text-[12px] text-gray-300 mt-1 text-center">
                    {s.streamer}
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-1 mt-2">
                  {s.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-[#53fc18]/20 px-2 py-0.5 rounded text-[10px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* SHED ROOMS (TEXT BOXES) */}
      <div className="mt-12 px-6 w-full">
        <h2 className="text-3xl font-extrabold mb-3 text-[#53fc18] flex items-center gap-2">
          <Music2 className="w-6 h-6 text-[#53fc18]" /> Shed Rooms (Musicians)
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {shedRooms.map((room) => (
            <div
              key={room.id}
              className="rounded-xl border border-white/10 bg-[#0d0d0d] p-4 flex flex-col justify-between h-[140px]"
            >
              <div>
                <p className="font-bold text-sm text-center leading-tight">
                  {room.title}
                </p>
                <p className="text-[11px] text-gray-300 mt-1 text-center">
                  {room.subtitle}
                </p>
              </div>
              <p className="text-[11px] text-gray-400 text-center mt-2">
                {room.viewers.toLocaleString()} in room
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* VOCAL ROOMS (TEXT BOXES) */}
      <div className="mt-10 px-6 w-full">
        <h2 className="text-3xl font-extrabold mb-3 text-[#53fc18] flex items-center gap-2">
          <Mic2 className="w-6 h-6 text-[#53fc18]" /> Vocal Rooms
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {vocalRooms.map((room) => (
            <div
              key={room.id}
              className="rounded-xl border border-white/10 bg-[#0d0d0d] p-4 flex flex-col justify-between h-[140px]"
            >
              <div>
                <p className="font-bold text-sm text-center leading-tight">
                  {room.title}
                </p>
                <p className="text-[11px] text-gray-300 mt-1 text-center">
                  {room.subtitle}
                </p>
              </div>
              <p className="text-[11px] text-gray-400 text-center mt-2">
                {room.viewers.toLocaleString()} in room
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CREATOR TOOLS */}
      <div className="mt-12 px-6 w-full">
        <h2 className="text-3xl font-extrabold mb-3 text-[#53fc18]">
          Creator Tools
        </h2>

        <div className="grid grid-cols-2 gap-5">
          <Link
            href="/creator/tools"
            className="rounded-xl p-5 bg-[#0d0d0d] border border-white/10"
          >
            <h3 className="text-lg font-bold">Stream Setup</h3>
            <p className="text-xs text-gray-400 mt-1">
              Go live & manage overlays
            </p>
          </Link>

          <Link
            href="/dashboard/analytics"
            className="rounded-xl p-5 bg-[#0d0d0d] border border-white/10"
          >
            <h3 className="text-lg font-bold">Analytics</h3>
            <p className="text-xs text-gray-400 mt-1">Track performance</p>
          </Link>

          <Link
            href="/monetization"
            className="rounded-xl p-5 bg-[#0d0d0d] border border-white/10"
          >
            <h3 className="text-lg font-bold">Monetization</h3>
            <p className="text-xs text-gray-400 mt-1">Earn Seeds & Gifts</p>
          </Link>

          <Link
            href="/library"
            className="rounded-xl p-5 bg-[#0d0d0d] border border-white/10"
          >
            <h3 className="text-lg font-bold">Library</h3>
            <p className="text-xs text-gray-400 mt-1">Saved content</p>
          </Link>
        </div>
      </div>

      {/* BREAKOUT ROOMS */}
      <section className="mt-12 px-6 w-full">
        <h2 className="text-3xl font-extrabold mb-3 text-[#53fc18]">
          Breakout Rooms
        </h2>

        <div className="flex gap-4 overflow-x-auto pb-3">
          <Link
            href="/social"
            className="min-w-[200px] rounded-xl p-4 bg-[#0d0d0d] border border-white/10"
          >
            <h3 className="font-bold text-lg">🔥 Global Fellowship</h3>
            <p className="text-xs text-gray-400 mt-1">
              Open chat for all believers
            </p>
            <span className="bg-[#53fc18]/20 px-2 py-0.5 rounded text-[10px] inline-block mt-1">
              Join Now
            </span>
          </Link>

          <Link
            href="/social"
            className="min-w-[200px] rounded-xl p-4 bg-[#0d0d0d] border border-white/10"
          >
            <h3 className="font-bold text-lg">🎮 Gaming &amp; Faith</h3>
            <p className="text-xs text-gray-400 mt-1">
              Encouragement + gameplay
            </p>
            <span className="bg-[#53fc18]/20 px-2 py-0.5 rounded text-[10px] inline-block mt-1">
              Join Now
            </span>
          </Link>

          <Link
            href="/social"
            className="min-w-[200px] rounded-xl p-4 bg-[#0d0d0d] border border-white/10"
          >
            <h3 className="font-bold text-lg">🎤 Vocal Breakout</h3>
            <p className="text-xs text-gray-400 mt-1">
              Riffs • Runs • Harmony
            </p>
            <span className="bg-[#53fc18]/20 px-2 py-0.5 rounded text-[10px] inline-block mt-1">
              Join Now
            </span>
          </Link>

          <Link
            href="/social"
            className="min-w-[200px] rounded-xl p-4 bg-[#0d0d0d] border border-white/10"
          >
            <h3 className="font-bold text-lg">🙏 Prayer Room</h3>
            <p className="text-xs text-gray-400 mt-1">
              Support + encouragement
            </p>
            <span className="bg-[#53fc18]/20 px-2 py-0.5 rounded text-[10px] inline-block mt-1">
              Join Now
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
