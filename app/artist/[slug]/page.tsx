"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { artists } from "@/lib/artists";
import Navbar from "@/components/Navbar";
import { Mic2, Music, Video, Calendar } from "lucide-react";

export default function ArtistProfilePage() {
  const { slug } = useParams();

  const artist = artists.find((a) => a.slug === slug);

  if (!artist) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Artist not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      <Navbar />

      {/* BANNER */}
      <div className="relative w-full h-64 md:h-80 overflow-hidden">
        <img
          src={artist.bannerUrl || "/default_banner.jpg"}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        
        {/* AVATAR + NAME */}
        <div className="flex items-center gap-6 mb-6">
          <img
            src={artist.avatarUrl}
            className="w-28 h-28 rounded-full border-4 border-black object-cover"
          />
          <div>
            <h1 className="text-4xl font-black">{artist.name}</h1>
            <p className="text-gray-400 text-sm uppercase">{artist.genre}</p>
          </div>
        </div>

        {/* BIO */}
        {artist.bio && (
          <p className="text-gray-300 max-w-2xl mb-10 leading-relaxed">
            {artist.bio}
          </p>
        )}

        {/* LIVE STATUS */}
        {artist.isLive && (
          <Link
            href={`/live/${artist.slug}`}
            className="block bg-red-600 hover:bg-red-500 text-white px-6 py-4 rounded-xl font-bold text-center mb-10"
          >
            🔴 Watch {artist.name} Live
          </Link>
        )}

        {/* NAVIGATION SECTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">

          {/* MUSIC */}
          <Link
            href="#music"
            className="bg-[#161616] border border-white/10 p-6 rounded-2xl hover:border-blue-500/50 transition"
          >
            <Music className="w-7 h-7 mb-3 text-blue-400" />
            <h3 className="font-bold text-xl mb-1">Music & Sessions</h3>
            <p className="text-gray-400 text-sm">Watch recorded sets & live music rooms</p>
          </Link>

          {/* VIDEOS */}
          <Link
            href="#videos"
            className="bg-[#161616] border border-white/10 p-6 rounded-2xl hover:border-purple-500/50 transition"
          >
            <Video className="w-7 h-7 mb-3 text-purple-400" />
            <h3 className="font-bold text-xl mb-1">Videos & Clips</h3>
            <p className="text-gray-400 text-sm">Behind-the-scenes & worship moments</p>
          </Link>

          {/* EVENTS */}
          <Link
            href="#events"
            className="bg-[#161616] border border-white/10 p-6 rounded-2xl hover:border-green-500/50 transition"
          >
            <Calendar className="w-7 h-7 mb-3 text-green-400" />
            <h3 className="font-bold text-xl mb-1">Upcoming Events</h3>
            <p className="text-gray-400 text-sm">Concerts & worship nights</p>
          </Link>

        </div>

        {/* MUSIC SECTION */}
        <section id="music" className="mb-20">
          <h2 className="text-3xl font-black mb-4 flex items-center gap-2">
            <Mic2 className="w-6 h-6 text-blue-400" /> Music Sessions
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Streams, rehearsals, shed rooms & worship sessions
          </p>

          <div className="bg-[#151515] border border-white/10 p-6 rounded-2xl text-gray-400">
            Coming soon…
          </div>
        </section>

        {/* VIDEOS SECTION */}
        <section id="videos" className="mb-20">
          <h2 className="text-3xl font-black mb-4 flex items-center gap-2">
            <Video className="w-6 h-6 text-purple-400" /> Videos & Clips
          </h2>
          <div className="bg-[#151515] border border-white/10 p-6 rounded-2xl text-gray-400">
            Coming soon…
          </div>
        </section>

        {/* EVENTS SECTION */}
        <section id="events" className="mb-20">
          <h2 className="text-3xl font-black mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-green-400" /> Upcoming Events
          </h2>
          <div className="bg-[#151515] border border-white/10 p-6 rounded-2xl text-gray-400">
            Coming soon…
          </div>
        </section>

      </main>
    </div>
  );
}
