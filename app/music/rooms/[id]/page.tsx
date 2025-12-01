"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Users } from "lucide-react";

// ========================================================
// ROOM DEFINITIONS
// ========================================================
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

// ========================================================
// RANDOM CHAT MESSAGES
// ========================================================
const randomMessages = [
  { user: "Guest123", text: "Bro this is nuts 🔥" },
  { user: "ChurchDrummer", text: "Drop that in 7/4 👀" },
  { user: "Keys4Christ", text: "Save this progression please 🙏" },
  { user: "SingerLife", text: "Those voicings >>>" },
  { user: "ProducerMike", text: "Loop that!!!" },
];

// ========================================================
// PAGE COMPONENT
// ========================================================
export default function MusicRoomPage() {
  const params = useParams();

  const id = Array.isArray(params?.id) ? params.id[0] : params?.id ?? "";
  const room = rooms.find((r) => r.id === id);

  if (!room) {
    return (
      <div className="min-h-screen bg-black text-white p-10">
        <Navbar />
        <h1 className="text-2xl font-bold">Room not found</h1>
        <Link href="/music" className="mt-4 text-gray-400 underline">
          ← Back to Music Rooms
        </Link>
      </div>
    );
  }

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
  const [viewerCount, setViewerCount] = useState(room.viewers);

  // VIEWER COUNT SIMULATION
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => {
        let delta = Math.random() < 0.5 ? -1 : 1;
        let next = prev + delta;

        if (next < room.viewers - 20) next = room.viewers;
        if (next > room.viewers + 40) next = room.viewers + 20;

        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [room]);

  // RANDOM CHAT SIMULATION
  useEffect(() => {
    const interval = setInterval(() => {
      const msg =
        randomMessages[Math.floor(Math.random() * randomMessages.length)];
      setMessages((prev) => [msg, ...prev].slice(0, 40));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  function send() {
    if (!input.trim()) return;
    setMessages([{ user: "You", text: input }, ...messages]);
    setInput("");
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

        {/* VIDEO */}
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

        {/* CHAT BOX */}
        <div className="w-full lg:w-[350px] bg-[#111] border border-white/10 rounded-2xl flex flex-col overflow-hidden mb-10">

          <div className="h-10 border-b border-white/10 flex items-center justify-between px-3 text-xs">
            <span className="uppercase tracking-wide text-gray-400 font-bold">
              Room Chat
            </span>
            <span className="text-gray-500">{messages.length} msgs</span>
          </div>

          <div className="flex-1 p-3 overflow-y-auto text-sm space-y-3 max-h-[300px]">
            {messages.map((m, i) => (
              <div key={i}>
                <span className="font-bold text-orange-400">{m.user}: </span>
                <span className="text-gray-200">{m.text}</span>
              </div>
            ))}
          </div>

          <div className="p-3 flex gap-2 border-t border-white/10">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              className="flex-1 bg-black border border-white/20 rounded-lg px-3 py-2 text-sm outline-none"
              placeholder="Say something..."
            />
            <button
              onClick={send}
              className="bg-orange-600 hover:bg-orange-500 px-3 py-2 rounded-lg text-xs font-bold"
            >
              Send
            </button>
          </div>
        </div>

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
