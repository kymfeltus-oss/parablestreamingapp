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
          src={artist.bannerUrl || "/default-banner.jpg"}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

        {/* ARTIST INFO OVERLAY */}
        <div className="absolute bottom-6 left-6 flex items-center gap-6">
          <img
            src={artist.avatarUrl}
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

            {artist.isLive && (
              <div className="mt-2 inline-flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                <Radio className="w-3 h-3" /> LIVE NOW
              </div>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 space-y-16 mt-10">

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-4 flex-wrap">
          <button className="px-6 py-2 bg-violet-600 hover:bg-violet-700 rounded-full font-bold text-sm shadow-[0_0_12px_#7c3aed]">
            Follow Artist
          </button>

          <button className="px-6 py-2 bg-[#53fc18] text-black rounded-full font-bold text-sm hover:brightness-110 shadow-[0_0_12px_#53fc18]">
            Support
          </button>

          <Link
            href="/events"
            className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full font-bold text-sm"
          >
            View Events
          </Link>
        </div>

        {/* ABOUT ARTIST */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">About</h2>

          <div className="parable-card parable-card-hover hover:shadow-[0_0_20px_#53fc18] leading-relaxed text-sm text-gray-300">
            {artist.bio ||
              "This artist brings powerful faith-driven performances, worship anthems, and gospel excellence to the Parable community."}
          </div>
        </section>

        {/* FEATURED MUSIC / VIDEOS */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Music className="w-5 h-5 text-[#53fc18]" /> Featured Music
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="parable-card parable-card-hover hover:shadow-[0_0_15px_#53fc18]"
              >
                <div className="aspect-square bg-black rounded-xl border border-white/10 overflow-hidden"></div>
                <p className="mt-2 font-bold text-sm">Track {i}</p>
                <p className="text-xs text-gray-400">Single</p>
              </div>
            ))}
          </div>
        </section>

        {/* UPCOMING EVENTS */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold">Upcoming Events</h2>

          {artist.events && artist.events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {artist.events.map((ev, idx) => (
                <div
                  key={idx}
                  className="parable-card parable-card-hover hover:shadow-[0_0_18px_#53fc18]"
                >
                  <p className="text-[#53fc18] text-xs font-bold uppercase mb-1">
                    {ev.title}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                    <Calendar className="w-4 h-4" />
                    {ev.date}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <MapPin className="w-4 h-4" />
                    {ev.venue}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No upcoming events.</p>
          )}
        </section>
      </main>
    </div>
  );
}
