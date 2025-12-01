"use client";

import Link from "next/link";
import { Users, MessageCircle, Flame } from "lucide-react";

export default function SocialPage() {
  const rooms = [
    {
      id: 1,
      name: "🔥 Global Fellowship",
      description: "Chat with believers from around the world.",
      users: 842,
      icon: Flame,
    },
    {
      id: 2,
      name: "🎶 Gospel Musicians",
      description: "Shed talk. Gear. Theory. Tips.",
      users: 521,
      icon: Users,
    },
    {
      id: 3,
      name: "🎤 Vocal Breakout Room",
      description: "Riffs, runs, warmups, technique.",
      users: 406,
      icon: MessageCircle,
    },
    {
      id: 4,
      name: "🎮 Gaming & Faith",
      description: "Gamers discussing scripture & strategy.",
      users: 311,
      icon: Users,
    },
    {
      id: 5,
      name: "🙏 Prayer & Encouragement",
      description: "Share, receive & give support.",
      users: 1290,
      icon: Flame,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-28">
      <h1 className="text-4xl font-black neon-text mb-4">Chat Rooms</h1>

      <p className="text-gray-400 mb-6 text-sm">
        Join breakout rooms to connect, talk, encourage, or collaborate.
      </p>

      <div className="flex flex-col gap-4">
        {rooms.map((room) => (
          <Link
            key={room.id}
            href={`/social/rooms/${room.id}`}
            className="neon-card p-4 rounded-xl flex items-center gap-4"
          >
            <room.icon className="w-10 h-10 text-[#53fc18]" />
            <div className="flex-1">
              <h2 className="font-bold text-lg">{room.name}</h2>
              <p className="text-gray-400 text-xs">{room.description}</p>
            </div>
            <span className="neon-tag">{room.users} Online</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
