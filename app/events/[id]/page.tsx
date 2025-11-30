"use client";

import { events } from "@/lib/events";
import Navbar from "@/components/Navbar";
import { Calendar, MapPin, Ticket } from "lucide-react";
import Link from "next/link";

export default function EventDetail({ params }: { params: { id: string } }) {
  const event = events.find((e) => e.id === params.id);

  if (!event) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-500">Event not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* HERO IMAGE */}
        <div className="w-full h-64 rounded-2xl overflow-hidden border border-white/10 mb-6">
          <img
            src={event.imageUrl}
            className="w-full h-full object-cover"
          />
        </div>

        {/* EVENT TITLE */}
        <h1 className="text-4xl font-black mb-2">{event.title}</h1>
        <p className="text-lg text-gray-300 mb-6">{event.artist}</p>

        {/* EVENT INFO */}
        <div className="space-y-4 mb-10">
          <p className="flex items-center gap-2 text-gray-300">
            <Calendar className="w-5 h-5 text-blue-400" />
            {event.date}
          </p>

          <p className="flex items-center gap-2 text-gray-300">
            <MapPin className="w-5 h-5 text-green-400" />
            {event.city} — {event.venue}
          </p>
        </div>

        {/* DESCRIPTION */}
        <p className="text-gray-400 mb-10 leading-relaxed">
          {event.description}
        </p>

        {/* BUTTONS */}
        <div className="flex gap-4">
          <a
            href={event.ticketsUrl}
            target="_blank"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-full text-sm font-bold"
          >
            <Ticket className="w-4 h-4" /> Get Tickets
          </a>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full text-sm font-bold"
          >
            Back to Events
          </Link>
        </div>
      </main>
    </div>
  );
}
