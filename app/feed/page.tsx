"use client";

import Link from "next/link";
import { Users, Coins, Sparkles, Music2, Mic2 } from "lucide-react";

export default function FeedPage() {
  /* ================== LIVE STREAMS ================== */
  const liveStreams = [
    {
      id: 1,
      title: "Faith + Obedience = Miracles!",
      streamer: "Bishop T.D. Jakes",
      viewers: 18205,
      thumbnail: "/td-jakes.jpg",
      tags: ["Sermon", "Faith", "Live"],
    },
    {
      id: 2,
      title: "Praise Break • Live Worship",
      streamer: "Kirk Franklin",
      viewers: 12440,
      thumbnail: "/kirk_avatar.png",
      tags: ["Worship", "Music", "Praise"],
    },
    {
      id: 3,
      title: "Gospel Flow Night",
      streamer: "Lauren Daigle",
      viewers: 9200,
      thumbnail: "/lauren-daigle.jpg",
      tags: ["Gospel", "Music", "Live"],
    },
    {
      id: 4,
      title: "Prayer & Prophetic Flow",
      streamer: "Pastor Stevenson",
      viewers: 7855,
      thumbnail: "/steven-furtick.jpg",
      tags: ["Prayer", "Teaching"],
    },
  ];

  /* ================== SHED ROOMS ================== */
  const shedRooms = [
    {
      id: 1,
      title: "Organ + Drum Pocket Session",
      streamer: "Jamal Keys",
      thumbnail: "/images.jfif",
      viewers: 1320,
    },
    {
      id: 2,
      title: "Bass Lines 101 • Gospel Grooves",
      streamer: "Marcus Bass",
      thumbnail: "/bass-room.jpg",
      viewers: 880,
    },
    {
      id: 3,
      title: "Aux Keys Worship Pads",
      streamer: "SynthLord",
      thumbnail: "/keys-room.jpg",
      viewers: 1670,
    },
  ];

  /* ================== VOCAL ROOMS ================== */
  const vocalRooms = [
    {
      id: 1,
      title: "🔥 Gospel Riffs + Runs Session",
      streamer: "Sarah Sings",
      thumbnail: "/vocal-room1.jpg",
      viewers: 2020,
    },
    {
      id: 2,
      title: "Choir Blending Workshop",
      streamer: "Voices United",
      thumbnail: "/vocal-room2.jpg",
      viewers: 920,
    },
    {
      id: 3,
      title: "Vocal Warmups Live",
      streamer: "Coach Harmony",
      thumbnail: "/vocal-room3.jpg",
      viewers: 1420,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-24">

      {/* ============================= HEADER ============================= */}
      <header className="flex items-center justify-between px-5 py-4 bg-[#0f0f0f] border-b border-white/10">
        <span className="text-5xl font-black tracking-tight text-[#53fc18] neon-text">
          PARABLE
        </span>

        <Link
          href="/monetization"
          className="bg-[#53fc18] text-black font-bold px-4 py-2 rounded-xl shadow-[0_0_10px_#53fc18] text-sm flex items-center gap-1"
        >
          <Coins className="w-4 h-4" />
          GET SEEDS
        </Link>
      </header>

      {/* ======================= FLASH HERO / BANNER ======================= */}
      <section className="relative mt-4 mx-5 rounded-2xl overflow-hidden neon-card h-40 flex items-center px-6">
        <div>
          <h2 className="text-3xl font-black">Streaming. Creating. Believing.</h2>
          <p className="text-gray-300 mt-1 text-sm">
            A home for believers, creators & GOSPEL musicians.
          </p>
        </div>
        <Sparkles className="absolute right-6 bottom-6 w-10 h-10 text-[#53fc18]" />
      </section>

      {/* =========================== LIVE NOW ============================= */}
      <section className="mt-8 px-5">
        <h2 className="section-title">Live Now</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {liveStreams.map((s) => (
            <div key={s.id} className="neon-card overflow-hidden rounded-xl">
              <div className="relative">
                <img
                  src={s.thumbnail}
                  className="w-full h-32 object-cover"
                />

                <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded font-black uppercase">
                  LIVE
                </span>

                <span className="absolute bottom-1 left-2 bg-black/70 px-2 py-0.5 text-[11px] rounded flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {s.viewers.toLocaleString()}
                </span>
              </div>

              <div className="p-2">
                <p className="font-bold text-sm">{s.title}</p>
                <p className="text-[11px] text-gray-400">{s.streamer}</p>

                <div className="flex flex-wrap gap-1 mt-2">
                  {s.tags.map((tag, idx) => (
                    <span key={idx} className="neon-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================== SHED ROOMS ========================= */}
      <section className="mt-10 px-5">
        <h2 className="section-title flex items-center gap-2">
          <Music2 className="w-6 h-6 text-[#53fc18]" />
          Shed Rooms (Musicians)
        </h2>

        <div className="flex gap-4 overflow-x-auto pb-3">
          {shedRooms.map((room) => (
            <div
              key={room.id}
              className="min-w-[200px] neon-card rounded-xl overflow-hidden"
            >
              <img src={room.thumbnail} className="w-full h-32 object-cover" />

              <div className="p-2">
                <p className="font-bold text-sm">{room.title}</p>
                <p className="text-[11px] text-gray-400">{room.streamer}</p>

                <span className="neon-tag mt-2 inline-block">
                  {room.viewers.toLocaleString()} watching
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================== VOCAL ROOMS ========================= */}
      <section className="mt-10 px-5">
        <h2 className="section-title flex items-center gap-2">
          <Mic2 className="w-6 h-6 text-[#53fc18]" />
          Vocal Rooms
        </h2>

        <div className="flex gap-4 overflow-x-auto pb-3">
          {vocalRooms.map((room) => (
            <div
              key={room.id}
              className="min-w-[200px] neon-card rounded-xl overflow-hidden"
            >
              <img src={room.thumbnail} className="w-full h-32 object-cover" />

              <div className="p-2">
                <p className="font-bold text-sm">{room.title}</p>
                <p className="text-[11px] text-gray-400">{room.streamer}</p>

                <span className="neon-tag mt-2 inline-block">
                  {room.viewers.toLocaleString()} watching
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
