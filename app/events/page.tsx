"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { events } from "@/lib/events";
import { Calendar, MapPin, Ticket } from "lucide-react";

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <h1 className="text-3xl font-black mb-6">Upcoming Events</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((ev) => (
            <Link
              key={ev.id}
              href={`/events/${ev.id}`}
              className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition"
            >
              <div className="relative h-48 w-full">
                <img
                  src={ev.imageUrl}
                  className="w-full h-full object-cover opacity-80"
                />
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg">{ev.title}</h3>
                <p className="text-sm text-gray-400">{ev.artist}</p>

                <div className="flex items-center gap-2 text-[12px] text-gray-400 mt-2">
                  <Calendar className="w-3 h-3" />
                  {ev.date}
                </div>

                <div className="flex items-center gap-2 text-[12px] text-gray-400">
                  <MapPin className="w-3 h-3" />
                  {ev.city} • {ev.venue}
                </div>

                <button className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2 rounded">
                  View Details
                </button>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
