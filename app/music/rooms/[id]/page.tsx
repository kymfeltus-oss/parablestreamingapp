"use client";

import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";

// Core room data – all rooms are configured here
const rooms: any = {
  "organ-drums": {
    name: "Organ & Drums Pocket",
    video: "https://www.youtube.com/embed/XXGQyKyEdz8?start=7",
    avatar: "/course_music.jpg",
    host: "Jamal Keys",
    tags: ["#Gospel", "#Shed"],
    viewers: 142,
    baseMessages: [
      { user: "Jamal", text: "🔥🔥🔥 That pocket is crazy!" },
      { user: "Marcus", text: "Try modulating to Eb!" }
    ],
  },
  "bass-101": {
    name: "Bass Lines 101",
    video: "https://www.youtube.com/embed/XXGQyKyEdz8?start=7",
    avatar: "/cdub_tool.jpg",
    host: "MarcusMillerFan",
    tags: ["#Bass", "#Theory"],
    viewers: 89,
    baseMessages: [
      { user: "BassMan", text: "That run was CLEAN 🔥" },
      { user: "Marcus", text: "Try a chromatic lead!" }
    ],
  },
  "aux-keys": {
    name: "Aux Keys Worship",
    video: "https://www.youtube.com/embed/XXGQyKyEdz8?start=7",
    avatar: "/course_conf.jpg",
    host: "SynthLord",
    tags: ["#MainStage", "#Pad"],
    viewers: 310,
    baseMessages: [
      { user: "PadLord", text: "🔥 That worship flow!!" }
    ],
  },
  "vocal-run": {
    name: "Vocal Run Challenge",
    video: "https://www.youtube.com/embed/XXGQyKyEdz8?start=7",
    avatar: "/course_lead.jpg",
    host: "SarahSings",
    tags: ["#Vocals", "#Riffs"],
    viewers: 56,
    baseMessages: [
      { user: "VocalQueen", text: "That riff!! 🔥🔥🔥" }
    ],
  },
};

// Some fun fake chat messages for "real-time" simulation
const randomMessages = [
  { user: "Guest123", text: "Bro this is nuts 🔥" },
  { user: "ChurchDrummer", text: "Drop that in 7/4 👀" },
  { user: "Keys4Christ", text: "Save this progression please 🙏" },
  { user: "SingerLife", text: "Those voicings >>>" },
  { user: "ProducerMike", text: "Loop that!!!" },
];

export default function DynamicRoom({ params }: { params: { id: string } }) {
  const room = rooms[params.id];

  if (!room) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <main className="max-w-xl mx-auto px-6 pt-16 text-center">
          <h1 className="text-2xl font-bold mb-2">Room Not Found</h1>
          <p className="text-gray-400 text-sm">
            This Shed Room does not exist. Double-check the URL or choose a room from the Shed Hub.
          </p>
        </main>
      </div>
    );
  }

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(room.baseMessages);
  const [viewerCount, setViewerCount] = useState(room.viewers);

  // Simulated live viewer count adjustments
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => {
        let delta = Math.random() < 0.5 ? -1 : 1;
        let next = prev + delta;
        if (next < Math.max(1, room.viewers - 20)) next = room.viewers;
        if (next > room.viewers + 40) next = room.viewers + 20;
        return next;
      });
    }, 6000); // every 6 seconds

    return () => clearInterval(interval);
  }, [room.viewers]);

  // Simulated "real-time" chat from others
  useEffect(() => {
    const interval = setInterval(() => {
      const msg = randomMessages[Math.floor(Math.random() * randomMessages.length)];
      setMessages((prev) => [msg, ...prev].slice(0, 40)); // keep last 40
    }, 9000); // every 9 seconds

    return () => clearInterval(interval);
  }, []);

  function send() {
    if (!input.trim()) return;
    setMessages([{ user: "You", text: input }, ...messages]);
    setInput("");
  }

  // multi-cam previews (for now just duplicates with different labels/thumbnails)
  const multiCams = [
    { label: "Main Mix", video: room.video },
    { label: "Keys Cam", video: room.video },
    { label: "Drums Cam", video: room.video },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-20 flex flex-col">
      <Navbar />

      <main className="flex flex-1 max-w-7xl mx-auto px-4 mt-6 gap-6 flex-col lg:flex-row">
        
        {/* LEFT: VIDEO + MULTI-CAM + META */}
        <div className="flex-1 flex flex-col gap-4">

          {/* Header */}
          <div className="flex items-center gap-3">
            <img
              src={room.avatar}
              className="w-12 h-12 rounded-full border border-white/20 object-cover"
            />
            <div>
              <h1 className="text-2xl md:text-3xl font-black mb-1">
                {room.name}
              </h1>
              <p className="text-xs text-gray-400">Host: {room.host}</p>
            </div>
          </div>

          {/* Main Video */}
          <div className="relative w-full pt-[56.25%] bg-black border border-white/10 rounded-3xl overflow-hidden">
            <iframe
              src={room.video}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
            />
          </div>

          {/* Live meta + viewer count */}
          <div className="flex flex-wrap justify-between items-center mt-2 gap-3">
            <div className="flex gap-2 items-center text-xs">
              <span className="bg-red-600 text-white px-2 py-0.5 rounded-full font-bold uppercase animate-pulse">
                LIVE
              </span>
              <span className="text-gray-400">
                {viewerCount.toLocaleString()} watching
              </span>
            </div>

            <div className="flex flex-wrap gap-2 text-[10px]">
              {room.tags.map((t: string) => (
                <span
                  key={t}
                  className="bg-white/5 text-gray-300 px-2 py-1 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Multi-Cam Layout */}
          <div className="mt-4">
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">
              Multi-Cam Views (Demo)
            </p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {multiCams.map((cam, idx) => (
                <div
                  key={idx}
                  className="min-w-[140px] bg-[#111] border border-white/10 rounded-xl overflow-hidden text-xs"
                >
                  <div className="relative w-full pt-[56.25%] bg-black">
                    <iframe
                      src={cam.video}
                      className="absolute inset-0 w-full h-full opacity-70"
                      allowFullScreen
                    />
                  </div>
                  <div className="px-2 py-1 text-gray-300">{cam.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT: CHAT */}
        <div className="w-full lg:w-[350px] bg-[#111] border border-white/10 rounded-2xl flex flex-col overflow-hidden">
          
          {/* Chat header */}
          <div className="h-10 border-b border-white/10 flex items-center justify-between px-3 text-xs">
            <span className="uppercase tracking-wide text-gray-400 font-bold">
              Room Chat
            </span>
            <span className="text-gray-500">
              {messages.length} msgs
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto text-sm space-y-3">
            {messages.map((m, i) => (
              <div key={i}>
                <span className="font-bold text-orange-400">{m.user}: </span>
                <span className="text-gray-200">{m.text}</span>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 flex gap-2 border-t border-white/10">
            <input
              value={input}
              onChange={(e)=> setInput(e.target.value)}
              onKeyDown={(e)=> e.key === "Enter" && send()}
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
      </main>
    </div>
  );
}
