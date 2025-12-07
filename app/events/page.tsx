"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
// FIX: Change import from named export 'supabase' to named export 'createClient'
import { createClient } from "@/lib/supabaseClient";
import { Calendar, MapPin, Ticket, Music, Mic2, Sparkles } from "lucide-react";

type EventItem = {
  id: string;
  artist: string;
  title: string;
  date: string;
  venue: string;
  banner_url: string;
  url: string;
};

export default function EventsPage() {
  // FIX: Instantiate the client by calling the createClient function
  const supabase = createClient();
  
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { name: "Concerts", icon: Music },
    { name: "Worship Nights", icon: Mic2 },
    { name: "Conferences", icon: Sparkles },
    { name: "Live Streams", icon: Calendar },
  ];

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    setLoading(true);

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });

    if (!error && data) setEvents(data as EventItem[]);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-24 space-y-16">

        {/* HEADER */}
        <section>
          <h1 className="parable-heading">Events</h1>
          <p className="parable-subtext">
            Concerts, worship nights, conferences, and gospel events happening around you.
          </p>
        </section>

        {/* CATEGORY FILTERS */}
        <section>
          <h2 className="text-xl font-bold mb-4">Browse by Category</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {categories.map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={i}
                  className="
                    parable-card parable-card-hover flex flex-col items-center justify-center gap-3 py-10
                    hover:shadow-[0_0_18px_#53fc18] transition
                  "
                >
                  <Icon className="w-8 h-8 text-[#53fc18]" />
                  <p className="font-bold text-sm">{c.name}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* UPCOMING EVENTS */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold">🔥 Upcoming Events</h2>

          {loading && <p className="text-xs text-gray-500">Loading events...</p>}

          {!loading && events.length === 0 && (
            <p className="text-xs text-gray-500">No events available.</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {events.map((ev) => (
              <Link
                key={ev.id}
                href={ev.url}
                className="
                  parable-card parable-card-hover overflow-hidden
                  hover:shadow-[0_0_20px_#53fc18] transition block
                "
              >
                {/* Banner */}
                <div className="aspect-video rounded-xl overflow-hidden border border-white/10">
                  <img
                    src={ev.banner_url}
                    className="w-full h-full object-cover opacity-90 hover:scale-110 transition duration-500"
                  />
                </div>

                <div className="mt-3 space-y-1">
                  <p className="text-[#53fc18] text-xs font-bold uppercase">
                    {ev.artist}
                  </p>

                  <p className="font-bold text-sm hover:text-[#53fc18] transition">
                    {ev.title}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />
                    {ev.date}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <MapPin className="w-3 h-3" />
                    {ev.venue}
                  </div>
                </div>

                <button className="mt-4 w-full bg-violet-600 hover:bg-violet-700 py-2 rounded-lg text-xs font-bold shadow-[0_0_12px_#7c3aed]">
                  <span className="inline-flex items-center gap-2 justify-center">
                    <Ticket className="w-3 h-3" /> Get Tickets
                  </span>
                </button>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
