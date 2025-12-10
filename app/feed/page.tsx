"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabaseClient";
import { Users, Coins, Sparkles, Music2, Mic2 } from "lucide-react";

export default function FeedPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [liveStreams, setLiveStreams] = useState<any[]>([]);

  /* ================== AUTH GUARD ================== */
  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      loadStreams();
    }

    checkUser();
  }, []);

  /* ================== LOAD REAL STREAMS ================== */
  async function loadStreams() {
    const { data, error } = await supabase
      .from("live_streams")
      .select("*");

    if (error) console.error("Error fetching live streams:", error);

    const normalized = (data || []).map((stream: any) => ({
      id: stream.id,
      slug: stream.slug || stream.id, // Fallback
      title: stream.title || "Untitled Stream",
      streamer: stream.streamer_name || "Creator",
      viewers: stream.viewer_count || 0,
      thumbnail: stream.thumbnail_url || "/placeholder.jpg",
      tags: stream.tags || (stream.category ? [stream.category] : []),
      isLive: stream.is_live ?? true, // Default true for now
    }));

    setLiveStreams(normalized);
    setLoading(false);
  }

  /* ====================== LOADING SKELETON ====================== */
  const SkeletonCard = () => (
    <div className="neon-card rounded-xl bg-[#111] animate-pulse h-40" />
  );

  /* ================== SHED ROOMS (NO CHANGE) ================== */
  const shedRooms = [
    { id: 1, title: "Organ + Drum Pocket Session", streamer: "Jamal Keys", thumbnail: "/images.jfif", viewers: 1320 },
    { id: 2, title: "Bass Lines 101 • Gospel Grooves", streamer: "Marcus Bass", thumbnail: "/bass-room.jpg", viewers: 880 },
    { id: 3, title: "Aux Keys Worship Pads", streamer: "SynthLord", thumbnail: "/keys-room.jpg", viewers: 1670 },
  ];

  /* ================== VOCAL ROOMS (NO CHANGE) ================== */
  const vocalRooms = [
    { id: 1, title: "🔥 Gospel Riffs + Runs Session", streamer: "Sarah Sings", thumbnail: "/vocal-room1.jpg", viewers: 2020 },
    { id: 2, title: "Choir Blending Workshop", streamer: "Voices United", thumbnail: "/vocal-room2.jpg", viewers: 920 },
    { id: 3, title: "Vocal Warmups Live", streamer: "Coach Harmony", thumbnail: "/vocal-room3.jpg", viewers: 1420 },
  ];

  /* ================== SKELETON DURING LOAD ================== */
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white pb-24">
        <header className="flex items-center justify-between px-5 py-4 bg-[#0f0f0f] border-b border-white/10">
          <span className="text-5xl font-black tracking-tight text-[#53fc18]">PARABLE</span>
        </header>

        <section className="mt-8 px-5">
          <h2 className="text-3xl font-extrabold mb-4 text-[#53fc18]">Live Now</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </section>
      </div>
    );
  }

  /* ================== PAGE UI (UNCHANGED) ================== */
  return (
    <div className="min-h-screen bg-black text-white pb-24">

      {/* ============================= HEADER ============================= */}
      <header className="flex items-center justify-between px-5 py-4 bg-[#0f0f0f] border-b border-white/10">
        <span className="text-5xl font-black tracking-tight text-[#53fc18]">
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

      {/* ======================= HERO BANNER ======================= */}
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
        <h2 className="text-3xl font-extrabold mb-4 text-[#53fc18]">Live Now</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {liveStreams.map((s) => (
            <Link
              key={s.id}
              href={`/creator/${s.slug}`}
              className="neon-card overflow-hidden rounded-xl"
            >
              <div className="relative">
                <img src={s.thumbnail} className="w-full h-32 object-cover" />

                {s.isLive && (
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded font-black uppercase">
                    LIVE
                  </span>
                )}

                <span className="absolute bottom-1 left-2 bg-black/70 px-2 py-0.5 text-[11px] rounded flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {s.viewers.toLocaleString()}
                </span>
              </div>

              <div className="p-2">
                <p className="font-bold text-sm">{s.title}</p>
                <p className="text-[11px] text-gray-400">{s.streamer}</p>

                <div className="flex flex-wrap gap-1 mt-2">
                  {s.tags.map((tag: string, idx: number) => (
                    <span key={idx} className="neon-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ======================== SHED ROOMS ========================= */}
      <section className="mt-10 px-5">
        <h2 className="text-3xl font-extrabold mb-3 text-[#53fc18] flex items-center gap-2">
          <Music2 className="w-6 h-6 text-[#53fc18]" />
          Shed Rooms (Musicians)
        </h2>

        <div className="flex gap-4 overflow-x-auto pb-3">
          {shedRooms.map((room) => (
            <div key={room.id} className="min-w-[200px] neon-card rounded-xl overflow-hidden">
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
        <h2 className="text-3xl font-extrabold mb-3 text-[#53fc18] flex items-center gap-2">
          <Mic2 className="w-6 h-6 text-[#53fc18]" />
          Vocal Rooms
        </h2>

        <div className="flex gap-4 overflow-x-auto pb-3">
          {vocalRooms.map((room) => (
            <div key={room.id} className="min-w-[200px] neon-card rounded-xl overflow-hidden">
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
