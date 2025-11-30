"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Users, Play } from "lucide-react";

const rooms = [
  {
    id: "organ-drums",
    name: "Shed is Live 🔥",
    host: "Jamal Keys",
    viewers: 142,
    tags: ["#Gospel", "#Shed"],
    avatar: "/images.jfif",
    stream: "https://www.youtube.com/embed/edcc68JTpwc",
  },
  {
    id: "bass-101",
    name: "Bass Lines 101",
    host: "Marcus Miller Fan",
    viewers: 89,
    tags: ["#Bass", "#Groove"],
    avatar: "/images.jfif",
    stream: "https://www.youtube.com/embed/hzjKTR1k4ps",
  },
  {
    id: "aux-keys",
    name: "Keys Session",
    host: "SynthLord",
    viewers: 310,
    tags: ["#MainStage", "#Pads"],
    avatar: "/images.jfif",
    stream: "https://www.youtube.com/embed/PqOUvrAP9Rc",
  },
  {
    id: "vocal-run",
    name: "Vocal Challenge 🔥",
    host: "SarahSings",
    viewers: 56,
    tags: ["#Vocals", "#Runs"],
    avatar: "/images.jfif",
    stream: "https://www.youtube.com/embed/Aj3dfAnUxyk",
  },
];

export default function MusicRoomPage() {
  const { id } = useParams();
  const room = rooms.find((r) => r.id === id);

  const [viewerCount, setViewerCount] = useState(room?.viewers || 0);

  // ⭐ FIXED: TypeScript requires typing "prev"
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev: number) => {
        let delta = Math.random() < 0.5 ? -1 : 1;
        let next = prev + delta;

        if (next < Math.max(1, (room?.viewers || 10) - 20)) next = room?.viewers || 10;
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [room]);

  if (!room) {
    return (
      <div className="min-h-screen bg-black text-white p-10">
        <h1 className="text-2xl font-bold">Room not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* HEADER */}
        <div className="flex items-center gap-6 mb-10">
          <img
            src={room.avatar}
            className="w-20 h-20 rounded-full border border-white/20"
          />
          <div>
            <h1 className="text-3xl font-black">{room.name}</h1>
            <p className="text-gray-400 text-sm">Hosted by {room.host}</p>
            <div className="flex items-center gap-2 text-red-500 text-xs font-bold mt-1">
              <Users className="w-4 h-4" /> {viewerCount} Watching Live
            </div>
          </div>
        </div>

        {/* VIDEO PLAYER */}
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl mb-8">
          <iframe
            src={room.stream}
            className="w-full aspect-video"
            allowFullScreen
          ></iframe>
        </div>

        {/* TAGS */}
        <div className="flex gap-3 mb-6">
          {room.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-white/10 px-3 py-1 rounded-full text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* BACK BUTTON */}
        <Link
          href="/music"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white"
        >
          ← Back to Music Rooms
        </Link>
      </main>
    </div>
  );
}
