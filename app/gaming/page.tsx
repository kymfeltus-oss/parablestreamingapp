"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Gamepad2, Users, Play } from "lucide-react";

export default function GamingPage() {
  const categories = [
    { slug: "fortnite", name: "Fortnite", thumb: "/cat-fortnite.jpg" },
    { slug: "call-of-duty", name: "Call of Duty", thumb: "/cat-cod.jpg" },
    { slug: "nba-2k", name: "NBA 2K", thumb: "/cat-2k.jpg" },
    { slug: "gta-rp", name: "GTA RP", thumb: "/cat-gta.jpg" },
  ];

  const featuredCreators = [
    { id: "holyhooper", name: "HolyHooper", thumb: "/gaming-2k.jpg" },
    { id: "pastorplays", name: "PastorPlays", thumb: "/gaming-fortnite.jpg" },
  ];

  const liveStreams = [
    {
      id: "live1",
      name: "HolyHooper",
      game: "NBA 2K25",
      viewers: 512,
      thumb: "/gaming-2k.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-24 space-y-12">
        
        {/* Header */}
        <section className="flex items-center gap-3">
          <Gamepad2 className="w-10 h-10 text-[#53fc18]" />
          <h1 className="text-3xl font-extrabold">Gaming</h1>
        </section>

        {/* Live Streams */}
        <section>
          <h2 className="text-xl font-bold mb-4">Live Now</h2>

          {liveStreams.map((s) => (
            <Link
              key={s.id}
              href={`/watch/${s.id}`}
              className="block bg-[#111] rounded-2xl overflow-hidden border border-white/10 hover:border-[#53fc18]/50 transition"
            >
              <div className="relative h-56 w-full">
                <img src={s.thumb} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded font-bold text-xs">LIVE</span>
                <span className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-xs flex items-center gap-1">
                  <Users className="w-3 h-3" /> {s.viewers.toLocaleString()}
                </span>
              </div>
              <div className="p-4">
                <p className="font-bold">{s.name}</p>
                <p className="text-xs text-gray-400">{s.game}</p>
              </div>
            </Link>
          ))}
        </section>

        {/* Featured Creators */}
        <section>
          <h2 className="text-xl font-bold mb-4">Featured Creators</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {featuredCreators.map((creator) => (
              <Link
                key={creator.id}
                href={`/gaming/creator/${creator.id}`}
                className="bg-[#111] rounded-xl border border-white/10 overflow-hidden hover:border-[#53fc18]/50 transition"
              >
                <img
                  src={creator.thumb}
                  className="w-full h-28 object-cover"
                />
                <div className="p-3">
                  <p className="text-sm font-bold">{creator.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section>
          <h2 className="text-xl font-bold mb-4">Categories</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/gaming/category/${cat.slug}`}
                className="bg-[#111] rounded-xl overflow-hidden border border-white/10 hover:border-[#53fc18]/50 transition"
              >
                <img
                  src={cat.thumb}
                  className="w-full h-28 object-cover"
                />
                <p className="text-center py-2 text-xs font-bold">{cat.name}</p>
              </Link>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
