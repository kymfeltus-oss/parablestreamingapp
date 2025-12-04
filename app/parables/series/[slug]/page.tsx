"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { Play, BookOpen, Users } from "lucide-react";
import ParableCard from "@/components/ParableCard";

export default function ParableSeriesPage({ params }: { params: { slug: string } }) {
  const [series, setSeries] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/parables/series/${params.slug}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (data.ok) setSeries(data.series);
      setLoading(false);
    }

    load();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading series…
      </div>
    );
  }

  if (!series) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Series not found.
      </div>
    );
  }

  const firstEp = series.episodes[0];

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-24 space-y-10">

        {/* HEADER */}
        <section className="space-y-4">
          {/* Banner */}
          <div className="relative h-52 w-full rounded-2xl overflow-hidden border border-white/10">
            <img
              src={firstEp.thumbnail || "/placeholder.jpg"}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

            <h1
              className="
                absolute bottom-4 left-4 text-3xl font-extrabold 
                shadow-[0_0_20px_black]
              "
            >
              {series.title}
            </h1>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed">
            A Parable Series created to inspire, teach, and move viewers through short, cinematic storytelling.
          </p>

          {/* Start watching */}
          <a
            href={`/parables/${firstEp.id}`}
            className="
              inline-flex items-center gap-2 px-6 py-3 rounded-xl 
              bg-[#53fc18] text-black font-bold shadow-[0_0_20px_#53fc18]
              hover:bg-[#45d516] transition
            "
          >
            Start Watching
            <Play className="w-5 h-5" />
          </a>
        </section>

        {/* EPISODE LIST */}
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#53fc18]" />
            Episodes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {series.episodes.map((ep: any) => (
  <ParableCard key={ep.id} ep={ep} unlocked={true} />
))}

          </div>
        </section>

        {/* CREATOR INFO (Future: dynamic) */}
        <section className="bg-[#111] p-6 rounded-2xl border border-white/10 space-y-3">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Users className="w-5 h-5 text-[#53fc18]" />
            Creator
          </h2>

          <p className="text-gray-300 text-sm">Faith-Based Storyteller</p>
          <p className="text-gray-400 text-xs">Upload series, episodes and teach through parables.</p>
        </section>
      </main>
    </div>
  );
}
