"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Heart, Play, BookOpen, Radio, Gamepad2 } from "lucide-react";

export default function FollowerFeedPage() {
  // Placeholder for now. These will be dynamic later.
  const followedParables = [
    {
      id: "p1",
      title: "He Missed Church for a Game…",
      thumbnail: "/sample-parable.jpg",
      seriesTitle: "Gaming Addiction Parable",
      creator: "FaithPlays",
    },
  ];

  const followedStreamers = [
    {
      id: "s1",
      name: "HolyHooper",
      game: "NBA 2K25",
      thumbnail: "/gaming-2k.jpg",
      viewers: 421,
    },
  ];

  const followedCreators = [
    {
      id: "c1",
      name: "PastorPlays",
      avatar: "/creator1.jpg",
      followers: "12.5K",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-24 space-y-10">

        {/* HEADER */}
        <section className="flex items-center gap-3">
          <Heart className="w-7 h-7 text-[#53fc18]" />
          <h1 className="text-3xl font-extrabold">Following</h1>
        </section>

        {/* FOLLOWED CREATORS */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold mb-1">Creators</h2>

          {followedCreators.length === 0 && (
            <p className="text-xs text-gray-400">
              Follow creators to see their latest content here.
            </p>
          )}

          {followedCreators.map((creator) => (
            <Link
              key={creator.id}
              href={`/creator/${creator.id}`}
              className="flex items-center gap-4 bg-[#111] p-4 border border-white/10 rounded-xl hover:border-[#53fc18]/50 transition"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden border border-white/10">
                <img
                  src={creator.avatar || "/placeholder.jpg"}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <p className="font-bold text-sm">{creator.name}</p>
                <p className="text-[11px] text-gray-400">
                  {creator.followers} followers
                </p>
              </div>

              <Heart className="w-5 h-5 text-[#53fc18]" />
            </Link>
          ))}
        </section>

        {/* FOLLOWED PARABLES */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#53fc18]" /> Parables
          </h2>

          {followedParables.length === 0 && (
            <p className="text-xs text-gray-400">
              Watch Parables and follow creators to see more here.
            </p>
          )}

          {followedParables.map((ep) => (
            <Link
              key={ep.id}
              href={`/parables/${ep.id}`}
              className="flex items-center gap-4 bg-[#111] p-4 border border-white/10 rounded-xl hover:border-[#53fc18]/50 transition"
            >
              <div className="relative w-24 h-16 rounded-lg overflow-hidden border border-white/10">
                <img
                  src={ep.thumbnail}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <p className="font-bold text-sm">{ep.title}</p>
                <p className="text-[11px] text-gray-400">
                  {ep.seriesTitle} • {ep.creator}
                </p>
              </div>

              <Play className="w-5 h-5 text-gray-300" />
            </Link>
          ))}
        </section>

        {/* FOLLOWED STREAMERS */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
            <Radio className="w-5 h-5 text-[#53fc18]" /> Livestreams
          </h2>

          {followedStreamers.length === 0 && (
            <p className="text-xs text-gray-400">
              Follow streamers to see live rooms here.
            </p>
          )}

          {followedStreamers.map((s) => (
            <Link
              key={s.id}
              href={`/watch/${s.id}`}
              className="flex items-center gap-4 bg-[#111] p-4 border border-white/10 rounded-xl hover:border-[#53fc18]/50 transition"
            >
              <div className="relative w-24 h-16 rounded-lg overflow-hidden border border-white/10">
                <img
                  src={s.thumbnail}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <p className="font-bold text-sm">{s.name}</p>
                <p className="text-[11px] text-gray-400">
                  {s.game} • {s.viewers} watching
                </p>
              </div>

              <Radio className="w-5 h-5 text-red-500" />
            </Link>
          ))}
        </section>

      </main>
    </div>
  );
}
