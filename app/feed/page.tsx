"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import {
  Users,
  Music2,
  Gamepad2,
  Sparkles,
  Play,
  BookOpen,
  Clock,
  Heart,
} from "lucide-react";
import ParableCard from "@/components/ParableCard";

// TYPES
type Episode = {
  id: string;
  title: string;
  thumbnail?: string;
  seriesTitle?: string;
  episodeNumber?: number;
  scriptureRef?: string;
};

export default function HomePage() {
  const [parables, setParables] = useState<Episode[]>([]);
  const [loadingParables, setLoadingParables] = useState(true);

  // Placeholder personalized sections
  const continueWatching = [
    {
      id: "p1",
      title: "He Missed Church for a Game…",
      thumbnail: "/sample-parable.jpg",
      seriesTitle: "Gaming Addiction Parable",
    },
  ];

  const followedCreators = [
    {
      id: "creator1",
      name: "PastorPlays",
      avatar: "/creator1.jpg",
      followers: "12.5K",
    },
    {
      id: "creator2",
      name: "HolyHooper",
      avatar: "/creator2.jpg",
      followers: "8.1K",
    },
  ];

  const trendingParables = [
    {
      id: "tr1",
      title: "The Lost Phone Parable",
      thumbnail: "/parable-trending.jpg",
    },
  ];

  const recommendedParables = [
    {
      id: "rp1",
      title: "The Graceful Comeback",
      thumbnail: "/parable-recommended.jpg",
    },
  ];

  const liveStreamers = [
    {
      id: "stream1",
      name: "HolyHooper",
      game: "NBA 2K25",
      thumb: "/gaming-2k.jpg",
      viewers: 420,
    },
  ];

  const musicCreators = [
    {
      id: "m1",
      name: "Kirk Franklin",
      thumb: "/kirk_avatar.png",
    },
  ];

  const gamingCreators = [
    {
      id: "g1",
      name: "PastorPlays",
      thumb: "/gaming-fortnite.jpg",
    },
  ];

  useEffect(() => {
    async function loadParables() {
      try {
        const res = await fetch("/api/microdramas/list", { cache: "no-store" });
        const data = await res.json();
        setParables((data.episodes || []) as Episode[]);
      } catch (e) {
        setParables([]);
      } finally {
        setLoadingParables(false);
      }
    }
    loadParables();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-24 space-y-12">

        {/* HERO */}
        <section className="relative rounded-2xl overflow-hidden h-44 bg-gradient-to-r from-[#53fc18]/20 to-black border border-white/10 flex items-center px-6">
          <div>
            <h1 className="text-4xl font-black">Welcome to Parable</h1>
            <p className="text-sm text-gray-300">
              Stream • Create • Watch Parables • Connect
            </p>
          </div>
          <Sparkles className="absolute bottom-4 right-4 w-12 h-12 text-[#53fc18]" />
        </section>

        {/* CONTINUE WATCHING */}
        {continueWatching.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Clock className="w-6 h-6 text-[#53fc18]" /> Continue Watching
            </h2>

            <div className="space-y-3">
              {continueWatching.map((item) => (
                <Link
                  key={item.id}
                  href={`/parables/${item.id}`}
                  className="
                    flex items-center gap-4 bg-[#111] p-4 border border-white/10 
                    rounded-xl hover:border-[#53fc18]/40 transition
                  "
                >
                  <div className="w-24 h-16 rounded-lg overflow-hidden border border-white/10">
                    <img
                      src={item.thumbnail}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{item.title}</p>
                    <p className="text-[11px] text-gray-400">{item.seriesTitle}</p>
                  </div>
                  <Play className="w-5 h-5 text-gray-300" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FOLLOWING */}
        {followedCreators.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Heart className="w-6 h-6 text-[#53fc18]" /> Creators You Follow
            </h2>

            <div className="flex gap-4 overflow-x-auto pb-3">
              {followedCreators.map((c) => (
                <Link
                  key={c.id}
                  href={`/creator/${c.id}`}
                  className="
                    min-w-[140px] bg-[#111] p-4 rounded-2xl border border-white/10
                    hover:border-[#53fc18]/40 transition text-center
                  "
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-2 border border-white/10">
                    <img src={c.avatar} className="w-full h-full object-cover" />
                  </div>
                  <p className="font-bold text-sm">{c.name}</p>
                  <p className="text-[11px] text-gray-400">{c.followers} followers</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FEATURED PARABLES */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#53fc18]" /> Featured Parables
          </h2>

          {loadingParables && (
            <p className="text-sm text-gray-400">Loading Parables…</p>
          )}

          {!loadingParables && parables.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {parables.slice(0, 6).map((ep) => (
                <ParableCard key={ep.id} ep={ep} />
              ))}
            </div>
          )}
        </section>

        {/* TRENDING PARABLES */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#53fc18]" /> Trending Parables
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingParables.map((p) => (
              <ParableCard key={p.id} ep={p} />
            ))}
          </div>
        </section>

        {/* RECOMMENDED FOR YOU */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Play className="w-6 h-6 text-[#53fc18]" /> Recommended For You
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedParables.map((p) => (
              <ParableCard key={p.id} ep={p} />
            ))}
          </div>
        </section>

        {/* LIVE STREAMERS */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-[#53fc18]" /> Live Streamers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveStreamers.map((s) => (
              <Link
                key={s.id}
                href={`/watch/${s.id}`}
                className="rounded-2xl bg-[#111] border border-white/10 overflow-hidden hover:border-[#53fc18]/40 transition"
              >
                <div className="relative h-40">
                  <img src={s.thumb} className="w-full h-full object-cover" />

                  <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">
                    LIVE
                  </span>

                  <span className="absolute bottom-2 left-2 bg-black/70 text-xs px-2 py-1 rounded flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {s.viewers.toLocaleString()}
                  </span>
                </div>
                <div className="p-3">
                  <p className="font-bold text-sm">{s.name}</p>
                  <p className="text-[11px] text-gray-400">{s.game}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* GAMING CREATORS */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Gamepad2 className="w-6 h-6 text-[#53fc18]" /> Gaming Creators
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {gamingCreators.map((g) => (
              <Link
                key={g.id}
                href={`/gaming/creator/${g.id}`}
                className="bg-[#111] rounded-xl border border-white/10 overflow-hidden hover:border-[#53fc18]/40 transition"
              >
                <img
                  src={g.thumb}
                  className="w-full h-32 object-cover"
                />
                <p className="p-3 font-bold text-xs">{g.name}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* MUSIC */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Music2 className="w-6 h-6 text-[#53fc18]" /> Featured Music Artists
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {musicCreators.map((m) => (
              <Link
                key={m.id}
                href={`/music`}
                className="bg-[#111] rounded-xl border border:white/10 overflow-hidden hover:border-[#53fc18]/40 transition"
              >
                <img
                  src={m.thumb}
                  className="w-full h-32 object-cover"
                />
                  <p className="p-3 font-bold text-xs">{m.name}</p>
              </Link>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
