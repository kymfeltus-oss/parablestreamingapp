"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Radio, Users, Mic2, Gamepad2, Music, Sparkles } from "lucide-react";

export default function StreamersPage() {
  // Placeholder featured streamers
  const featured = [
    {
      name: "Pastor Live Experience",
      viewers: 1820,
      category: "Sermons",
      banner: "/placeholder-stream-1.jpg",
    },
    {
      name: "Midweek Worship Live",
      viewers: 940,
      category: "Worship",
      banner: "/placeholder-stream-2.jpg",
    },
    {
      name: "Gospel Gaming Lounge",
      viewers: 640,
      category: "Gaming",
      banner: "/placeholder-stream-3.jpg",
    },
    {
      name: "Night Encouragement Hour",
      viewers: 510,
      category: "Encouragement",
      banner: "/placeholder-stream-4.jpg",
    },
  ];

  const categories = [
    { name: "Sermons", icon: Mic2 },
    { name: "Gaming", icon: Gamepad2 },
    { name: "Music", icon: Music },
    { name: "Live Worship", icon: Radio },
    { name: "Talk Shows", icon: Users },
    { name: "Bible Study", icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-24 space-y-16">

        {/* HEADER */}
        <section className="space-y-2">
          <h1 className="parable-heading">Streamers</h1>
          <p className="parable-subtext">
            Discover live Christian creators, gospel streamers, and ministry broadcasters.
          </p>
        </section>

        {/* FEATURED STREAMERS */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold">🔥 Featured Streamers</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featured.map((stream, index) => (
              <div
                key={index}
                className="parable-card parable-card-hover hover:shadow-[0_0_20px_#53fc18]"
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-black rounded-xl border border-white/10 overflow-hidden">
                  <img
                    src={stream.banner}
                    alt={stream.name}
                    className="w-full h-full object-cover opacity-90 hover:scale-105 transition duration-500"
                  />
                </div>

                {/* Info */}
                <div className="mt-3 space-y-1">
                  <p className="font-bold text-sm hover:text-[#53fc18] transition">
                    {stream.name}
                  </p>

                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <Radio className="w-3 h-3 text-[#53fc18]" /> {stream.viewers.toLocaleString()} watching
                  </p>

                  <p className="text-[11px] text-gray-500">{stream.category}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold">Categories</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((c, index) => {
              const Icon = c.icon;
              return (
                <Link
                  key={index}
                  href="#"
                  className="parable-card parable-card-hover text-center py-10 hover:shadow-[0_0_18px_#53fc18] flex flex-col items-center gap-3"
                >
                  <Icon className="w-8 h-8 text-[#53fc18]" />
                  <p className="font-bold text-sm">{c.name}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* TOP STREAMERS SECTION */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold">⭐ Top Creators</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="parable-card parable-card-hover hover:shadow-[0_0_18px_#53fc18]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#111] border border-white/10" />
                  <div>
                    <p className="font-bold text-sm hover:text-[#53fc18] transition">
                      Streamer {i}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      Live • Christian Content
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
