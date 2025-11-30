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

  // Shed Rooms data
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

  // Featured Artists
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
      blurb: "Soulful, worshipful sets that hit the heart.",
      slug: "lauren-daigle",
    },
  ];

  // Upcoming Events
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
    <div className="min-h-screen bg-[#0e0e0e] text-white pb-20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">

        {/* HERO SECTION */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 mb-16">
          <div className="relative w-full pt-[56.25%] overflow-hidden">
            <div
              className="
                absolute inset-0
                bg-[url('/pexels-photo-7586656.webp')]
                bg-cover bg-center
                opacity-70
              "
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          </div>

          <div className="absolute bottom-0 left-0 p-10 w-full">
            <div className="bg-orange-600 text-white text-[10px] px-3 py-1 rounded font-bold uppercase mb-4 inline-block">
              Music Sessions
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-2">LIVE MUSIC ROOMS</h1>
            <p className="text-gray-300 text-lg">
              Gospel, CHH, Worship, and live Shed rooms — all in one place.
            </p>
          </div>
        </div>

        {/* FEATURED ARTISTS */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-black flex items-center gap-2">
              🎤 Featured Artists
            </h2>
            <span className="text-xs text-gray-500 uppercase tracking-wide">
              Curated for this season
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredArtists.map((artist) => (
              <Link
                key={artist.slug}
                href={`/artist/${artist.slug}`}
                className="group bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/60 transition"
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={artist.banner}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                <div className="p-4 flex items-center gap-3">
                  <img
                    src={artist.image}
                    className="w-12 h-12 rounded-full object-cover border border-white/20"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-sm group-hover:text-blue-300">
                      {artist.name}
                    </p>
                    <p className="text-[11px] text-gray-400">{artist.role}</p>
                    <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                      {artist.blurb}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SHED ROOMS */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Headphones className="w-8 h-8 text-orange-500" />
            <h2 className="text-3xl font-black italic">The Shed Rooms</h2>
          </div>

          <Link
            href="/music/shed/start"
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold px-6 py-3 rounded-full uppercase tracking-wide transition shadow-lg shadow-orange-600/20 mb-8"
          >
            Start New Shed Room
          </Link>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {shedRooms.map((room) => (
              <Link
                href={`/music/rooms/${room.id}`}
                key={room.id}
                className="bg-[#1a1a1a] border border-white/10 p-5 rounded-2xl hover:border-orange-500/50 transition cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-red-500/10 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase animate-pulse">
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
                    <h4 className="font-bold text-sm group-hover:text-orange-400">
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

                <button className="w-full bg-[#222] text-white text-xs font-bold py-2 rounded-lg group-hover:bg-orange-600 transition">
                  Enter Room
                </button>
              </Link>
            ))}
          </div>
        </section>

        {/* UPCOMING EVENTS */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-black flex items-center gap-2">
              🎫 Upcoming Concerts & Worship Nights
            </h2>
            <span className="text-xs text-gray-500 uppercase tracking-wide">
              Live events • Streams • Tours
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingEvents.map((ev, idx) => (
              <div
                key={idx}
                className="bg-[#111] border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-blue-500/50 transition"
              >
                <div>
                  <p className="text-xs text-blue-300 font-bold uppercase mb-1">{ev.artist}</p>
                  <h3 className="font-bold text-sm mb-1">{ev.title}</h3>
                  <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-1">
                    <Calendar className="w-3 h-3" />
                    <span>{ev.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-2">
                    <MapPin className="w-3 h-3" />
                    <span>{ev.venue}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-2">
                  <Link
                    href={ev.url}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold px-3 py-2 rounded-full"
                  >
                    <Ticket className="w-3 h-3" /> Get Tickets
                  </Link>
                  <button className="px-3 py-2 rounded-full text-[11px] font-bold bg-white/10 hover:bg-white/20">
                    Notify Me
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GOSPEL & URBAN */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black italic flex items-center gap-2">
              <Flame className="w-6 h-6 text-red-500" /> Gospel & Urban
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {gospelArtists.map((artist) => (
              <Link
                key={artist.slug}
                href={`/artist/${artist.slug}`}
                className="group"
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl mb-3 border border-white/5 hover:border-red-500 transition shadow-2xl">
                  <img
                    src={artist.avatarUrl}
                    alt={artist.name}
                    className="h-full w-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  {artist.isLive && (
                    <div className="absolute top-2 right-2 bg-red-600 text-[10px] px-2 py-1 rounded-sm font-bold animate-pulse">
                      LIVE
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-lg group-hover:text-red-400">
                  {artist.name}
                </h3>
                <p className="text-sm text-gray-500 uppercase">{artist.genre}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* WORSHIP ARTISTS */}
        <section className="mb-24">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-black italic flex items-center gap-2">
              <Mic2 className="w-6 h-6 text-blue-400" /> Worship Artists
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {worshipArtists.map((artist) => (
              <Link
                key={artist.slug}
                href={`/artist/${artist.slug}`}
                className="group"
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl mb-3 border border-white/5 hover:border-blue-400 transition shadow-xl">
                  <img
                    src={artist.avatarUrl}
                    alt={artist.name}
                    className="h-full w-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  {artist.isLive && (
                    <div className="absolute top-2 right-2 bg-blue-600 text-[10px] px-2 py-1 rounded-sm font-bold animate-pulse">
                      LIVE
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-lg group-hover:text-blue-300">
                  {artist.name}
                </h3>
                <p className="text-sm text-gray-500 uppercase">{artist.genre}</p>
              </Link>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
