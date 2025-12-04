"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import ParableCard from "@/components/ParableCard";

// Type for microdrama / parable episodes
type Episode = {
  id: string;
  videoId?: string;
  title: string;
  seriesTitle?: string;
  episodeNumber?: number;
  description?: string;
  scriptureRef?: string;
  thumbnail?: string;
  tags?: string[];
  createdAt?: string;
};

export default function ParablesPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/microdramas/list", { cache: "no-store" });
        const data = await res.json();

        // Cast the result to Episode[] for TypeScript
        const eps = (data.episodes || []) as Episode[];
        setEpisodes(eps);
      } catch (e) {
        setEpisodes([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-24 space-y-8">
        <h1 className="text-3xl font-extrabold mb-4">Parables</h1>

        {loading && (
          <p className="text-sm text-gray-400">Loading Parables…</p>
        )}

        {!loading && episodes.length === 0 && (
          <p className="text-sm text-gray-500">
            No Parables have been uploaded yet. Create one in the Parables
            Dashboard.
          </p>
        )}

        {!loading && episodes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {episodes.map((ep) => (
              <ParableCard key={ep.id} ep={ep} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
