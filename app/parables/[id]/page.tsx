"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { Play, Lock, Coins } from "lucide-react";

export default function ParableEpisodePage({ params }: { params: { id: string } }) {
  const id = params.id;
  const [episode, setEpisode] = useState<any>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [unlocking, setUnlocking] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/microdramas/info/${id}`, { cache: "no-store" });
      const data = await res.json();
      if (data.ok) setEpisode(data.episode);

      // check unlock
      const u = await fetch("/api/parables/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ episodeId: id }),
      });
      const ud = await u.json();
      setUnlocked(ud.unlocked);

      setLoading(false);
    }
    load();
  }, [id]);

  if (loading || !episode) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-24 space-y-8">

        <h1 className="text-3xl font-extrabold">{episode.title}</h1>

        {/* BLOCKED (Locked Episode) */}
        {!unlocked && (
          <div className="bg-[#111] p-10 rounded-2xl border border-white/10 text-center space-y-6">
            <Lock className="w-12 h-12 text-white mx-auto opacity-80" />
            <p className="text-gray-300 text-sm">
              This Parable episode is locked. Unlock it to continue watching.
            </p>

            <button
              onClick={async () => {
                setUnlocking(true);
                const res = await fetch("/api/parables/unlock", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ episodeId: id }),
                });
                const data = await res.json();
                setUnlocked(true);
                setUnlocking(false);
              }}
              className="
                inline-flex items-center gap-2 px-6 py-3 rounded-xl 
                bg-[#53fc18] text-black font-bold shadow-[0_0_20px_#53fc18]
                hover:bg-[#45d516] transition
              "
            >
              {unlocking ? "Unlocking…" : "Unlock Episode"}
              <Coins className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* PLAYBACK */}
        {unlocked && (
          <div className="rounded-2xl overflow-hidden border border-white/10">
            <iframe
              src={`https://customer-abrj4wfwhu1pcgln.cloudflarestream.com/${episode.videoId}/iframe`}
              className="w-full aspect-video"
              allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </main>
    </div>
  );
}
