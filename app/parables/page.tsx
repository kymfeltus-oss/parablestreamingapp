"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Film, BookOpen, Sparkles } from "lucide-react";

export default function ParablesPage() {
  const featured = [
    {
      title: "Faith & Obedience",
      episodes: 6,
      banner: "/parable_banner_1.jpg",
    },
    {
      title: "The Prodigal Journey",
      episodes: 4,
      banner: "/parable_banner_2.jpg",
    },
    {
      title: "When God Speaks",
      episodes: 8,
      banner: "/parable_banner_3.jpg",
    },
  ];

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

        {/* FEATURED SERIES */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold">🔥 Featured Series</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {featured.map((p, i) => (
              <div
                key={i}
                className="parable-card parable-card-hover hover:shadow-[0_0_20px_#53fc18]"
              >
                <div className="aspect-video bg-black rounded-xl border border-white/10 overflow-hidden">
                  <img
                    src={p.banner}
                    className="w-full h-full object-cover opacity-90 hover:scale-110 transition duration-500"
                    alt={p.title}
                  />
                </div>

                <p className="font-bold mt-3 text-sm hover:text-[#53fc18] transition">
                  {p.title}
                </p>

                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-[#53fc18]" />
                  {p.episodes} Episodes
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold">Categories</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((c, i) => (
              <Link
                key={i}
                href="#"
                className="parable-card parable-card-hover text-center py-10 hover:shadow-[0_0_18px_#53fc18] flex flex-col items-center gap-3"
              >
                <Sparkles className="w-6 h-6 text-[#53fc18]" />
                <p className="font-bold text-sm">{c}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
