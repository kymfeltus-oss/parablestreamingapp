"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Play, Users, Gamepad2 } from "lucide-react";

export default function GamerProfilePage({ params }: { params: { id: string } }) {
  const gamerName = params.id.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  const recentClips = [
    {
      id: "clip1",
      title: "Victory Royale Moment",
      thumb: "/clip-victory.jpg",
    },
    {
      id: "clip2",
      title: "GTA RP Sermon Scene",
      thumb: "/clip-gta.jpg",
    },
  ];

  const liveStream = {
    id: "live1",
    title: "HolyHooper Live on 2K",
    viewers: 512,
    thumb: "/gaming-2k.jpg",
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-24 space-y-10">
        {/* HEADER */}
        <section className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden border border-white/10">
            <img src="/creator1.jpg" className="w-full h-full object-cover" />
          </div>

          <div>
            <h1 className="text-3xl font-extrabold">{gamerName}</h1>
            <p className="text-gray-400 text-xs">Christian Gamer • Influencer</p>
          </div>
        </section>

        {/* LIVE STREAM */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Live Now</h2>

          <Link
            href={`/watch/${liveStream.id}`}
            className="bg-[#111] rounded-2xl overflow-hidden border border-white/10 hover:border-[#53fc18]/40 transition block"
          >
            <div className="relative h-48 w-full">
              <img src={liveStream.thumb} className="w-full h-full object-cover" />

              <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">
                LIVE
              </span>
              <span className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-xs flex items-center gap-1">
                <Users className="w-3 h-3" />
                {liveStream.viewers.toLocaleString()}
              </span>
            </div>

            <div className="p-3">
              <p className="font-bold">{liveStream.title}</p>
            </div>
          </Link>
        </section>

        {/* RECENT CLIPS */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Play className="w-5 h-5 text-[#53fc18]" /> Recent Clips
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {recentClips.map((clip) => (
              <Link
                key={clip.id}
                href={`/watch/${clip.id}`}
                className="bg-[#111] rounded-xl overflow-hidden border border-white/10 hover:border-[#53fc18]/40 transition block"
              >
                <div className="relative h-28 w-full">
                  <img src={clip.thumb} className="w-full h-full object-cover" />
                </div>

                <div className="p-2">
                  <p className="text-sm font-bold">{clip.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
