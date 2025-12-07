"use client";

import Navbar from "@/components/Navbar";
import { createClient } from "@/lib/supabaseClient"; // <--- CHANGED THIS IMPORT
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Music, Radio } from "lucide-react";

type Artist = {
  id: string;
  name: string;
  genre: string;
  avatarUrl: string;
  bannerUrl: string;
  bio?: string;
  isLive: boolean;
  slug: string;
};

export default function ArtistPage() {
  const supabase = createClient(); // <--- ADDED THIS LINE
  const params = useParams();
  const slug = params.slug as string;

  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArtist();
  }, []);

  async function loadArtist() {
    const { data, error } = await supabase
      .from("artists")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (!error && data) {
      setArtist({
        id: data.id,
        name: data.name,
        genre: data.genre,
        avatarUrl: data.avatar_url,
        bannerUrl: data.banner_url,
        bio: data.bio,
        isLive: data.is_live,
        slug: data.slug,
      });
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-10">
        <Navbar />
        <p className="text-gray-400">Loading artist...</p>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Navbar />
        <p className="text-gray-400 text-sm mt-10">Artist not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <Navbar />

      {/* HERO */}
      <div className="relative h-72 md:h-96 w-full border-b border-white/10 overflow-hidden">
        <img
          src={artist.bannerUrl}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

        <div className="absolute bottom-6 left-6 flex items-center gap-6">
          <img
            src={artist.avatarUrl}
            className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-[#53fc18] shadow-[0_0_20px_#53fc18]"
          />

          <div>
            <h1 className="text-3xl md:text-4xl font-black">{artist.name}</h1>
            <p className="text-sm text-gray-300 uppercase tracking-wide">
              {artist.genre}
            </p>

            {artist.isLive && (
              <div className="mt-2 inline-flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                <Radio className="w-3 h-3" /> LIVE NOW
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <main className="max-w-6xl mx-auto px-6 space-y-16 mt-10">

        <section className="space-y-4">
          <h2 className="text-xl font-bold">About</h2>

          <div className="parable-card p-5 text-sm text-gray-300 leading-relaxed border border-white/10 rounded-xl bg-[#111]">
            {artist.bio || "This artist shares powerful performances and worship."}
          </div>
        </section>

        {/* FEATURED MUSIC */}
        <section className="space-y-6 pb-16">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Music className="w-5 h-5 text-[#53fc18]" /> Featured Music
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="parable-card hover:shadow-[0_0_15px_#53fc18] p-3 rounded-xl border border-white/10"
              >
                <div className="aspect-square bg-black rounded-xl border border-white/10"></div>
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