"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";

const CF_SUBDOMAIN =
  process.env.NEXT_PUBLIC_CF_STREAM_SUBDOMAIN ||
  "customer-abrj4wfwhu1pcgln.cloudflarestream.com"; // fallback for dev

type Episode = {
  id: string;
  videoId: string;
  title: string;
  seriesTitle: string;
  episodeNumber: number;
  description: string;
  scriptureRef: string;
  tags: string[];
};

export default function DramaEpisodePage() {
  const params = useParams();
  const id = params.id as string;

  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/microdramas/info/${id}`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (data.ok) {
          setEpisode(data.episode);
        } else {
          setEpisode(null);
        }
      } catch {
        setEpisode(null);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-400 text-sm">Loading episode…</p>
        </div>
      </div>
    );
  }

  if (!episode) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center flex-col px-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Episode not found</h1>
          <p className="text-gray-400 text-sm">
            This microdrama might have been removed or is not yet published.
          </p>
        </div>
      </div>
    );
  }

  const playerSrc = `https://${CF_SUBDOMAIN}/${episode.videoId}/iframe`;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col pb-10">
      <Navbar />

      <main className="max-w-4xl mx-auto w-full px-4 pt-6">
        {/* Title */}
        <section className="mb-4">
          <p className="text-[11px] text-gray-400 uppercase tracking-[0.2em] mb-1">
            {episode.seriesTitle || "Microdrama Series"} • Episode{" "}
            {episode.episodeNumber || 1}
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold mb-2">
            {episode.title}
          </h1>
          {episode.scriptureRef && (
            <p className="text-[12px] text-[#53fc18]">
              {episode.scriptureRef}
            </p>
          )}
        </section>

        {/* Cloudflare Player */}
        <section className="mb-6">
          <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-black aspect-[9/16] max-h-[80vh] mx-auto">
            <iframe
              src={playerSrc}
              allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
              title={episode.title}
            />
          </div>
        </section>

        {/* Description */}
        <section className="space-y-3">
          {episode.description && (
            <p className="text-sm text-gray-200 leading-relaxed">
              {episode.description}
            </p>
          )}

          {episode.tags && episode.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 text-[11px] text-gray-400 mt-2">
              {episode.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
