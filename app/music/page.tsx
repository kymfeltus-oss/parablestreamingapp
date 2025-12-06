"use client";

import Link from "next/link";
import { artists } from "@/lib/artists";
import Navbar from "@/components/Navbar";
import { Flame, Mic2, Headphones, Calendar, MapPin, Ticket } from "lucide-react";

export default function MusicPage() {
  const gospelArtists = artists.filter((a) =>
    a.genre.includes("Gospel") || a.genre.includes("Urban") || a.genre.includes("CHH")
  );

  const worshipArtists = artists.filter((a) => a.genre.includes("Worship"));

  const shedRooms = [
    {
      id: "organ-drums",
      name: "Shed is Live 🔥",
      host: "Jamal Keys",
      viewers: 142,
      tags: ["#Gospel", "#Shed"],
      avatar: "/images.jfif",
    },
    {
      id: "bass-101",
      name: "Bass Lines 101",
      host: "Marcus Miller Fan",
      viewers: 89,
      tags: ["#Bass", "#Groove"],
      avatar: "/images.jfif",
    },
    {
      id: "aux-keys",
      name: "Keys Session",
      host: "SynthLord",
      viewers: 310,
      tags: ["#MainStage", "#Pads"],
      avatar: "/images.jfif",
    },
    {
      id: "vocal-run",
      name: "Vocal Challenge 🔥",
      host: "SarahSings",
      viewers: 56,
      tags: ["#Vocals", "#Runs"],
      avatar: "/images.jfif",
    },
  ];

  const featuredArtists = [
    {
      name: "Kirk Franklin",
      role: "Gospel Artist",
      image: "/kirk_franklin_avatar.jpg",
      banner: "/kirk_franklin_banner.jpg",
      blurb: "High-energy Gospel sets and legendary choir moments.",
      slug: "kirk-franklin",
    },
    {
      name: "Lauren Daigle",
      role: "Worship Artist",
      image: "/lauren-daigle.jpg",
      banner: "/lauren-daigle-banner.jpg",
      blurb: "Soulful, worshipful sets that touch the heart.",
      slug: "lauren-daigle",
    },
  ];

  const upcomingEvents = [
    {
      artist: "Kirk Franklin",
      title: "Kingdom Praise Live Tour",
      date: "Dec 15, 2025",
      venue: "Dallas, TX",
      url: "/events/concert",
    },
    {
      artist: "Lauren Daigle",
      title: "Worship Night in the City",
      date: "Jan 10, 2026",
      venue: "Atlanta, GA",
      url: "/events/concert",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-20">

        {/* HERO SECTION */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(83,252,24,0.1)]">
          <div className="relative w-full pt-[56.25%] overflow-hidden">
            <div
              className="absolute inset-0 bg-[url('/pexels-photo-7586656.webp')] bg-cover bg-center opacity-70"
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          </div>

          <div className="absolute bottom-0 left-0 p-10 w-full">
            <div className="bg-[#53fc18] text-black text-[10px] px-3 py-1 rounded font-bold uppercase mb-4 inline-block shadow-[0_0_12px_#53fc18]">
              Neon Music Sessions
            </div>

            <h1 className="text-5xl md:text-6xl font-black mb-2 drop-shadow-[0_0_15px_#53fc18]">
              LIVE MUSIC ROOMS
            </h1>
            <p className="text-gray-300 text-lg max-w-xl">
              Gospel, CHH, Worship, and Shed Rooms — all brought to life with neon energy.
            </p>
          </div>
        </div>

        {/* FEATURED ARTISTS */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-black flex items-center gap-2">
              🎤 Featured Artists
            </h2>
            <span className="text-xs text-gray-500 uppercase tracking-wide">
              Curated highlights
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredArtists.map((artist) => (
              <Link
                key={artist.slug}
                href={`/artist/${artist.slug}`}
                className="group bg-[#111] border border-white/10 rounded-2xl overflow-hidden transition hover:border-[#53fc18]/60 hover:shadow-[0_0_20px_#53fc18]"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={artist.banner}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                <div className="p-5 flex items-center gap-4">
                  <img
                    src={artist.image}
                    className="w-14 h-14 rounded-full object-cover border border-white/20"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-lg group-hover:text-[#53fc18]">
                      {artist.name}
                    </p>
                    <p className="text-sm text-gray-400">{artist.role}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {artist.blurb}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SHED ROOMS */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Headphones className="w-9 h-9 text-[#53fc18]" />
            <h2 className="text-3xl font-black italic">The Shed Rooms</h2>
          </div>

          <Link
            href="/music/shed/start"
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-bold px-6 py-3 rounded-full uppercase tracking-wide transition shadow-[0_0_12px_#7c3aed]"
          >
            Start New Shed Room
          </Link>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {shedRooms.map((room) => (
              <Link
                key={room.id}
                href={`/music/rooms/${room.id}`}
                className="bg-[#111] border border-white/10 rounded-2xl p-5 transition hover:border-[#53fc18]/60 hover:shadow-[0_0_18px_#53fc18]"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-red-600/20 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase animate-pulse">
                    LIVE
                  </span>
                  <span className="text-xs text-gray-500">{room.viewers} watching</span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={room.avatar}
                    className="w-12 h-12 rounded-full object-cover border border-white/10"
                  />
                  <div>
                    <h4 className="font-bold text-sm group-hover:text-[#53fc18]">
                      {room.name}
                    </h4>
                    <p className="text-xs text-gray-500">{room.host}</p>
                  </div>
                </div>

                <div className="flex gap-2 mb-4">
                  {room.tags.map((tag) => (
                    <span key={tag} className="text-[10px] bg-white/5 text-gray-400 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="w-full bg-[#222] text-white text-xs font-bold py-2 rounded-lg hover:bg-violet-600 transition">
                  Enter Room
                </button>
              </Link>
            ))}
          </div>
        </section>

        {/* UPCOMING EVENTS */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-black flex items-center gap-2">
              🎫 Upcoming Concerts & Worship Nights
            </h2>
            <span className="text-xs text-gray-500 uppercase tracking-wide">
              Events • Streams • Tours
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((ev, idx) => (
              <div
                key={idx}
                className="bg-[#111] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-[#53fc18]/60 transition hover:shadow-[0_0_18px_#53fc18]"
              >
                <div>
                  <p className="text-xs text-[#53fc18] font-bold uppercase mb-1">
                    {ev.artist}
                  </p>
                  <h3 className="font-bold text-lg mb-1">{ev.title}</h3>

                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                    <Calendar className="w-3 h-3" />
                    {ev.date}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <MapPin className="w-3 h-3" />
                    {ev.venue}
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Link
                    href={ev.url}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold px-3 py-2 rounded-full"
                  >
                    <Ticket className="w-3 h-3" /> Get Tickets
                  </Link>

                  <button className="px-3 py-2 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20">
                    Notify Me
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GOSPEL & URBAN */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-black italic flex items-center gap-2">
              <Flame className="w-7 h-7 text-[#53fc18]" /> Gospel & Urban
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {gospelArtists.map((artist) => (
              <Link key={artist.slug} href={`/artist/${artist.slug}`} className="group">
                <div className="relative aspect-square rounded-2xl border border-white/10 overflow-hidden hover:border-[#53fc18] hover:shadow-[0_0_15px_#53fc18] transition">
                  <img
                    src={artist.avatarUrl}
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  {artist.isLive && (
                    <div className="absolute top-2 right-2 bg-red-600 text-[10px] px-2 py-1 rounded font-bold animate-pulse">
                      LIVE
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-sm mt-2 group-hover:text-[#53fc18]">
                  {artist.name}
                </h3>
                <p className="text-xs text-gray-500 uppercase">{artist.genre}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* WORSHIP */}
        <section className="pb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-black italic flex items-center gap-2">
              <Mic2 className="w-7 h-7 text-blue-400" /> Worship Artists
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {worshipArtists.map((artist) => (
              <Link key={artist.slug} href={`/artist/${artist.slug}`} className="group">
                <div className="relative aspect-square rounded-2xl border border-white/10 overflow-hidden hover:border-blue-400 hover:shadow-[0_0_18px_#3b82f6] transition">
                  <img
                    src={artist.avatarUrl}
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  {artist.isLive && (
                    <div className="absolute top-2 right-2 bg-blue-600 text-[10px] px-2 py-1 rounded font-bold animate-pulse">
                      LIVE
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-sm mt-2 group-hover:text-blue-300">
                  {artist.name}
                </h3>
                <p className="text-xs text-gray-500 uppercase">{artist.genre}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
