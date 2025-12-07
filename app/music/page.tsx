"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import { Flame, Mic2, Headphones, Calendar, MapPin, Ticket } from "lucide-react";

/* ============================================================
   TYPES — camelCase aligned with your Supabase return fields
=============================================================== */
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

type ShedRoom = {
  id: string;
  name: string;
  host: string;
  avatarUrl: string;
  viewers: number;
  tags: string[];
};

type Event = {
  id: string;
  artist: string;
  title: string;
  date: string;
  venue: string;
  bannerUrl: string;
  url: string;
};

/* ============================================================
   PAGE COMPONENT
=============================================================== */
export default function MusicPage() {
  const supabase = createClient();

  const [artists, setArtists] = useState<Artist[]>([]);
  const [shedRooms, setShedRooms] = useState<ShedRoom[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);

    const [artistsRes, shedsRes, eventsRes] = await Promise.all([
      supabase.from("artists").select("*"),
      supabase.from("shed_rooms").select("*"),
      supabase.from("events").select("*"),
    ]);

    /* Artists */
    if (artistsRes.data) {
      setArtists(
        artistsRes.data.map((a: any) => ({
          id: a.id,
          name: a.name,
          genre: a.genre,
          avatarUrl: a.avatar_url,
          bannerUrl: a.banner_url,
          bio: a.bio,
          isLive: a.is_live,
          slug: a.slug,
        }))
      );
    }

    /* Shed Rooms */
    if (shedsRes.data) {
      setShedRooms(
        shedsRes.data.map((s: any) => ({
          id: s.id,
          name: s.name,
          host: s.host,
          avatarUrl: s.avatar_url,
          viewers: s.viewers,
          tags: s.tags || [],
        }))
      );
    }

    /* Events */
    if (eventsRes.data) {
      setEvents(
        eventsRes.data.map((e: any) => ({
          id: e.id,
          artist: e.artist,
          title: e.title,
          date: e.date,
          venue: e.venue,
          bannerUrl: e.banner_url,
          url: e.url,
        }))
      );
    }

    setLoading(false);
  }

  /* Filter groups */
  const gospelArtists = artists.filter((a) =>
    a.genre?.toLowerCase().includes("gospel") ||
    a.genre?.toLowerCase().includes("urban") ||
    a.genre?.toLowerCase().includes("hip-hop")
  );

  const worshipArtists = artists.filter((a) =>
    a.genre?.toLowerCase().includes("worship")
  );

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-20">

        {/* ======================================================
           HERO SECTION
        ======================================================= */}
        <section className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(83,252,24,0.1)]">
          <div className="relative w-full pt-[56.25%] overflow-hidden">
            <div
              className="absolute inset-0 bg-[url('/pexels-photo-7586656.webp')] bg-cover bg-center opacity-70"
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          </div>

          <div className="absolute bottom-0 left-0 p-10">
            <div className="bg-[#53fc18] text-black text-[10px] px-3 py-1 rounded font-bold uppercase mb-4 inline-block shadow-[0_0_12px_#53fc18]">
              Neon Music Sessions
            </div>

            <h1 className="text-5xl md:text-6xl font-black drop-shadow-[0_0_15px_#53fc18]">
              LIVE MUSIC ROOMS
            </h1>
            <p className="text-gray-300 text-lg max-w-xl mt-2">
              Gospel, CHH, Worship, and Sheds — all brought to life with neon energy.
            </p>
          </div>
        </section>

        {/* ======================================================
           FEATURED ARTISTS
        ======================================================= */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-black">🎤 Featured Artists</h2>
            <span className="text-xs text-gray-500 uppercase tracking-wide">
              Curated highlights
            </span>
          </div>

          {loading && <p className="text-xs text-gray-500">Loading artists...</p>}
          {!loading && artists.length === 0 && (
            <p className="text-xs text-gray-500">No artists found.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {artists.slice(0, 2).map((artist) => (
              <Link
                key={artist.id}
                href={`/artist/${artist.slug}`}
                className="group bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-[#53fc18]/60 hover:shadow-[0_0_20px_#53fc18] transition"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={artist.bannerUrl}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                <div className="p-5 flex items-center gap-4">
                  <img
                    src={artist.avatarUrl}
                    className="w-14 h-14 rounded-full object-cover border border-white/20"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-lg group-hover:text-[#53fc18]">
                      {artist.name}
                    </p>
                    <p className="text-sm text-gray-400">{artist.genre}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {artist.bio}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ======================================================
           SHED ROOMS
        ======================================================= */}
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

          {loading && <p className="text-xs text-gray-500 mt-4">Loading shed rooms...</p>}
          {!loading && shedRooms.length === 0 && (
            <p className="text-xs text-gray-500 mt-4">No shed rooms found.</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {shedRooms.map((room) => (
              <Link
                key={room.id}
                href={`/music/rooms/${room.id}`}
                className="bg-[#111] border border-white/10 rounded-2xl p-5 hover:border-[#53fc18]/60 hover:shadow-[0_0_18px_#53fc18] transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-red-600/20 text-red-400 text-[10px] px-2 py-1 rounded uppercase animate-pulse">
                    LIVE
                  </span>
                  <span className="text-xs text-gray-500">{room.viewers} watching</span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={room.avatarUrl}
                    className="w-12 h-12 rounded-full object-cover border border-white/10"
                  />
                  <div>
                    <h4 className="font-bold text-sm">{room.name}</h4>
                    <p className="text-xs text-gray-500">{room.host}</p>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap mb-4">
                  {room.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] bg-white/5 text-gray-400 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="w-full bg-[#222] hover:bg-violet-600 text-white text-xs font-bold py-2 rounded-lg transition">
                  Enter Room
                </button>
              </Link>
            ))}
          </div>
        </section>

        {/* ======================================================
           EVENTS
        ======================================================= */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-black">🎫 Upcoming Concerts & Worship Nights</h2>
          </div>

          {loading && <p className="text-xs text-gray-500">Loading events...</p>}
          {!loading && events.length === 0 && (
            <p className="text-xs text-gray-500">No events found.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="bg-[#111] border border-white/10 rounded-2xl p-5 hover:border-[#53fc18]/60 hover:shadow-[0_0_18px_#53fc18] transition"
              >
                <p className="text-[#53fc18] text-xs font-bold uppercase">{ev.artist}</p>
                <h3 className="font-bold text-sm">{ev.title}</h3>

                <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                  <Calendar className="w-3 h-3" />
                  {ev.date}
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-400 mt-1 mb-3">
                  <MapPin className="w-3 h-3" />
                  {ev.venue}
                </div>

                <Link
                  href={ev.url}
                  className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold px-3 py-2 rounded-full"
                >
                  <Ticket className="w-3 h-3" /> Get Tickets
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================
           GOSPEL ARTISTS
        ======================================================= */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-black italic flex items-center gap-2">
              <Flame className="w-7 h-7 text-[#53fc18]" /> Gospel & Urban
            </h2>
          </div>

          {gospelArtists.length === 0 && !loading && (
            <p className="text-xs text-gray-500">No gospel artists found.</p>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {gospelArtists.map((artist) => (
              <Link key={artist.id} href={`/artist/${artist.slug}`} className="group">
                <div className="relative aspect-square rounded-2xl border border-white/10 overflow-hidden hover:border-[#53fc18] hover:shadow-[0_0_15px_#53fc18] transition">
                  <img
                    src={artist.avatarUrl}
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

        {/* ======================================================
           WORSHIP ARTISTS
        ======================================================= */}
        <section className="pb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-black italic flex items-center gap-2">
              <Mic2 className="w-7 h-7 text-blue-400" /> Worship Artists
            </h2>
          </div>

          {worshipArtists.length === 0 && !loading && (
            <p className="text-xs text-gray-500">No worship artists found.</p>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {worshipArtists.map((artist) => (
              <Link key={artist.id} href={`/artist/${artist.slug}`} className="group">
                <div className="relative aspect-square rounded-2xl border border-white/10 overflow-hidden hover:border-blue-400 hover:shadow-[0_0_18px_#3b82f6] transition">
                  <img
                    src={artist.avatarUrl}
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
