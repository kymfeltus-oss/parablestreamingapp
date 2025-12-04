"use client";

import Navbar from "@/components/Navbar";
import { Users, Heart, Flame, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function WatchPage({ params }: { params: { id: string } }) {
  const [stream, setStream] = useState<any>(null);
  const [loadingStream, setLoadingStream] = useState(true);

  // CHAT STATE
  const [chatMessages, setChatMessages] = useState<
    { user: string; color: string; text: string }[]
  >([
    { user: "User1", color: "text-violet-400", text: "Hallelujah!" },
    { user: "Sarah", color: "text-blue-400", text: "Watching from Texas!" },
    { user: "Mike", color: "text-green-400", text: "What chapter is this?" },
  ]);

  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // AUTO-SCROLL CHAT
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  function sendMessage() {
    if (!inputValue.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      { user: "You", color: "text-[#53fc18]", text: inputValue },
    ]);
    setInputValue("");
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") sendMessage();
  }

  // REACTIONS
  const [reactions, setReactions] = useState({
    heart: 0,
    fire: 0,
    praise: 0,
  });

  function react(type: "heart" | "fire" | "praise") {
    setReactions((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  }

  // ⭐ LOAD REAL STREAM DATA
  useEffect(() => {
    async function loadStream() {
      try {
        const res = await fetch(`/api/streams/info/${params.id}`, {
          cache: "no-store",
        });
        const data = await res.json();

        if (data.ok) {
          setStream(data.stream);
        } else {
          setStream(null);
        }
      } catch {
        setStream(null);
      }
      setLoadingStream(false);
    }

    loadStream();
  }, [params.id]);

  // LOADING STATE
  if (loadingStream) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        Loading stream…
      </div>
    );
  }

  // STREAM NOT FOUND
  if (!stream) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white text-center px-6">
        <div>
          <h1 className="text-3xl font-bold mb-3">Stream Not Found</h1>
          <p className="text-gray-400">This live stream is offline or does not exist.</p>
        </div>
      </div>
    );
  }

  // ⭐ STREAM EXISTS — SHOW YOUR WATCH UI EXACTLY AS BEFORE
  return (
    <div className="flex h-screen flex-col bg-black text-white">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT: VIDEO PLAYER AREA */}
        <div className="flex-1 bg-gray-900 flex items-center justify-center relative">
          <div className="text-center p-10 w-full max-w-5xl mx-auto">
            {/* ⭐ STREAM TITLE */}
            <h2 className="text-2xl font-bold mb-2">{stream.title}</h2>

            {/* SHOW STREAM ID / CREATOR */}
            <p className="text-gray-400 mb-6">Creator ID: {stream.creatorId}</p>

            {/* FIXED HEIGHT VIDEO WRAPPER */}
            <div className="relative bg-black rounded-xl border border-white/10 w-full h-[60vh] max-h-[700px] overflow-hidden flex flex-col">
              {/* LIVE BADGE */}
              <div className="absolute top-4 left-4 bg-red-600 text-white font-bold text-xs px-3 py-1 rounded-full flex items-center gap-2">
                ● LIVE
              </div>

              {/* ⭐ REAL VIEWER COUNT */}
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs flex items-center gap-2 border border-white/10">
                <Users className="w-3 h-3 text-[#53fc18]" />
                {stream.viewers.toLocaleString()} watching
              </div>

              {/* SCRIPTURE OVERLAY (unchanged) */}
              <div className="absolute bottom-4 left-4 bg-black/70 border border-white/10 rounded-xl px-4 py-2 text-left max-w-xs text-xs leading-snug">
                <p className="text-[10px] text-gray-400 mb-1">John 3:16 (ESV)</p>
                <p className="text-gray-200">
                  “For God so loved the world, that he gave his only Son, that whoever
                  believes in him should not perish but have eternal life.”
                </p>
              </div>

              {/* REACTION BUTTONS (unchanged) */}
              <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">
                <button
                  onClick={() => react("heart")}
                  className="flex items-center gap-1 bg-black/70 border border-white/10 rounded-full px-3 py-1 text-xs"
                >
                  <Heart className="w-4 h-4 text-pink-500" />
                  <span>{reactions.heart}</span>
                </button>
                <button
                  onClick={() => react("fire")}
                  className="flex items-center gap-1 bg-black/70 border border-white/10 rounded-full px-3 py-1 text-xs"
                >
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span>{reactions.fire}</span>
                </button>
                <button
                  onClick={() => react("praise")}
                  className="flex items-center gap-1 bg-black/70 border border-white/10 rounded-full px-3 py-1 text-xs"
                >
                  <Sparkles className="w-4 h-4 text-[#53fc18]" />
                  <span>{reactions.praise}</span>
                </button>
              </div>

              {/* ⭐ REAL VIDEO POSTER */}
              <div className="flex-1 flex items-center justify-center">
                <video
                  className="w-full h-full object-cover bg-black"
                  controls
                  poster={stream.thumbnail}
                >
                  {/* Once real stream is ready, insert HLS or MP4 source here */}
                </video>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: SANCTUARY CHAT (unchanged except real-time messaging) */}
        <div className="w-80 border-l border-white/10 bg-gray-950 flex flex-col hidden lg:flex">
          <div className="p-4 border-b border-white/10 font-bold">Virtual Sanctuary</div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className="text-sm">
                <span className={`${msg.color} font-bold`}>{msg.user}: </span>
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 bg-gray-900 border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              placeholder="Send a message…"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKey}
              className="flex-1 bg-black border border-white/20 rounded-full px-4 py-2 text-sm text:white"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-[#53fc18] text-black rounded-full font-bold text-xs"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
