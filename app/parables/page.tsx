"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import ParableCard from "@/components/ParableCard";

export default function ParablesPage() {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/microdramas/list", { cache: "no-store" });
      const data = await res.json();
      setEpisodes(data.episodes || []);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-24 space-y-8">
        <h1 className="text-3xl font-extrabold mb-4">Parables</h1>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {episodes.map((ep) => (
            <ParableCard key={ep.id} ep={ep} />
          ))}
        </div>
      </main>
    </div>
  );
}
