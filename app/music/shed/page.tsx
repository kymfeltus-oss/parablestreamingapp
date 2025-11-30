"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Headphones, Users, Plus } from "lucide-react";

export default function ShedHub() {

  const rooms = [
    { id: "organ-drums", name: "Organ & Drums Pocket", host: "Jamal Keys", avatar: "/course_music.jpg", viewers: 142 },
    { id: "bass-101", name: "Bass Lines 101", host: "MarcusMillerFan", avatar: "/cdub_tool.jpg", viewers: 89 },
    { id: "aux-keys", name: "Aux Keys Worship", host: "SynthLord", avatar: "/course_conf.jpg", viewers: 310 },
    { id: "vocal-run", name: "Vocal Run Challenge", host: "SarahSings", avatar: "/course_lead.jpg", viewers: 56 }
  ];

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-10 pb-20">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-orange-500 font-bold uppercase tracking-widest text-xs">
              <Headphones className="w-4 h-4" /> The Shed Ecosystem
            </div>
            <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">
              Live Sessions
            </h1>
          </div>

          <Link 
            href="/music/shed/start"
            className="bg-orange-600 hover:bg-orange-500 text-white font-extrabold px-6 py-3 rounded-full uppercase tracking-wide flex items-center gap-2 transition shadow-lg"
          >
            <Plus className="w-4 h-4" /> Start an Open Shed
          </Link>
        </div>

        {/* ACTIVE SHED ROOMS */}
        <h3 className="text-xl font-bold uppercase tracking-wide mb-6 flex items-center gap-2">
          <Users className="w-5 h-5 text-gray-400" /> Active Open Sheds
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <Link
              key={room.id}
              href={`/music/rooms/${room.id}`}
              className="bg-[#1a1a1a] border border-white/5 rounded-xl p-4 hover:border-orange-500/50 transition"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded uppercase font-bold animate-pulse">
                  Live
                </span>
                <span className="text-xs text-gray-400">{room.viewers} watching</span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <img src={room.avatar} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                <div>
                  <div className="font-bold">{room.name}</div>
                  <div className="text-xs text-gray-400">{room.host}</div>
                </div>
              </div>

              <button className="w-full bg-[#222] hover:bg-orange-600 text-white text-xs font-bold py-2 rounded-lg transition">
                Join Room
              </button>
            </Link>
          ))}
        </div>

      </main>
    </div>
  );
}
