"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Users, Play } from "lucide-react";

const sampleStreams = [
  {
    id: "g1",
    name: "PastorPlays",
    viewers: 1200,
    thumbnail: "/gaming-fortnite.jpg",
  },
  {
    id: "g2",
    name: "FaithShooter",
    viewers: 845,
    thumbnail: "/gaming-cod.jpg",
  },
];

export default function GamingCategoryPage({ params }: { params: { slug: string } }) {
  const categoryName = params.slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-24 space-y-10">

        <section>
          <h1 className="text-3xl font-extrabold mb-1">{categoryName}</h1>
          <p className="text-xs text-gray-400">{sampleStreams.length} live streams</p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sampleStreams.map((stream) => (
            <Link
              key={stream.id}
              href={`/watch/${stream.id}`}
              className="bg-[#111] rounded-2xl overflow-hidden border border-white/10 hover:border-[#53fc18]/50 transition"
            >
              <div className="relative h-40 w-full">
                <img src={stream.thumbnail} className="w-full h-full object-cover" />

                <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">
                  LIVE
                </span>

                <span className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-xs flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {stream.viewers.toLocaleString()}
                </span>
              </div>

              <div className="p-3">
                <p className="font-bold text-sm">{stream.name}</p>
              </div>
            </Link>
          ))}
        </section>

      </main>
    </div>
  );
}
