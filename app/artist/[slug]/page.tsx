"use client";

import Navbar from "@/components/Navbar";
import { useParams } from "next/navigation";
import { artists } from "@/lib/artists";
import Link from "next/link";
import { Music, Calendar, MapPin, Heart, Radio } from "lucide-react";

export default function ArtistPage() {
  const params = useParams();
  const slug = params.slug;

  // find the artist
  const artist = artists.find((a) => a.slug === slug);

  if (!artist) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Artist not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <Navbar />

      {/* HERO BANNER */}
      <div className="relative h-72 md:h-96 w-full border-b border-white/10 overflow-hidden">
        <img
          src={artist.banner_url}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

        {/* ARTIST INFO */}
        <div className="absolute bottom-6 left-6 flex items-center gap-6">
          <img
            src={artist.avatar_url}
            className="
              w-28 h-28 md:w-32 md:h-32 rounded-full object-cover
              border-4 border-[#53fc18] shadow-[0_0_20px_#53fc18]
            "
          />

          <div>
            <h1 className="text-3xl md:text-4xl font-black">{artist.name}</h1>
            <p className="text-sm text-gray-300 uppercase tracking-wide">
              {artist.genre}
            </p>

            {artist.is_live && (
              <div className="mt-2 inline-flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                <Radio className="w-3 h-3" /> LIVE NOW
              </div>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 space-y-16 mt-10">

        {/* ABOUT */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">About</h2>

          <div className="parable-card parable-card-hover leading-relaxed text-sm text-gray-300 hover:shadow-[0_0_20px_#53fc18] transition">
            {artist.bio ||
              "This artist brings powerful faith-driven performances, worship anthems, and gospel excellence to the Parable community."}
          </div>
        </section>

        {/* FEATURED MUSIC */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Music className="w-5 h-5 text-[#53fc18]" /> Featured Music
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="parable-card parable-card-hover hover:shadow-[0_0_15px_#53fc18] transition"
              >
                <div className="aspect-square bg-black rounded-xl border border-white/10 overflow-hidden"></div>
                <p className="mt-2 font-bold text-sm">Track {i}</p>
                <p className="text-xs text-gray-400">Single</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
