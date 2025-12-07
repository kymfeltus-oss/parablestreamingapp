"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
// FIX: Change import from named export 'supabase' to named export 'createClient'
import { createClient } from "@/lib/supabaseClient";
import { Film, BookOpen, Sparkles } from "lucide-react";

type Parable = {
  id: string;
  title: string;
  description: string;
  banner_url: string;
  episodes_count: number;
};

export default function ParablesPage() {
  // FIX: Instantiate the client by calling the createClient function
  const supabase = createClient();

  const [parables, setParables] = useState<Parable[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadParables();
  }, []);

  async function loadParables() {
    setLoading(true);

    const { data, error } = await supabase
      .from("parables")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setParables(data as Parable[]);
    }

    setLoading(false);
  }

  const categories = [
    "Faith",
    "Relationships",
    "Purpose",
    "Deliverance",
    "Hope",
    "Gospel Stories",
    "Testimonies",
    "Biblical Dramas",
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-24 space-y-16">

        {/* HEADER */}
        <section className="space-y-2">
          <h1 className="parable-heading">Parables</h1>
          <p className="parable-subtext">
            Explore cinematic micro-sermons, gospel stories, and faith-based series.
          </p>
        </section>

        {/* FEATURED / ALL SERIES */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold">🔥 Featured Series</h2>

          {loading && (
            <p className="text-xs text-gray-500">Loading parables...</p>
          )}

          {!loading && parables.length === 0 && (
            <p className="text-xs text-gray-500">
              No parable series available yet.
            </p>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {parables.map((p) => (
              <Link
                key={p.id}
                href={`/parables/${p.id}`}
                className="
                  parable-card parable-card-hover
                  hover:shadow-[0_0_18px_#53fc18]
                  transition block
                "
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-black rounded-xl border border-white/10 overflow-hidden">
                  <img
                    src={p.banner_url}
                    alt={p.title}
                    className="w-full h-full object-cover opacity-90 hover:scale-110 transition duration-500"
                  />
                </div>

                {/* Title + Episode Count */}
                <p className="font-bold mt-3 text-sm hover:text-[#53fc18] transition">
                  {p.title}
                </p>

                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-[#53fc18]" />
                  {p.episodes_count} Episodes
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold">Categories</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((c, i) => (
              <div
                key={i}
                className="
                  parable-card parable-card-hover
                  text-center py-10 flex flex-col items-center gap-3
                  hover:shadow-[0_0_18px_#53fc18]
                "
              >
                <Sparkles className="w-6 h-6 text-[#53fc18]" />
                <p className="font-bold text-sm">{c}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
