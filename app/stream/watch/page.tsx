"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import {
  Send,
  Users,
  Scissors,
  X,
  ArrowLeft,
  Sparkles,
  Gift,
  Coins,
} from "lucide-react";

type GiftType = {
  name: string;
  amount: number;
  icon: string;
};

export default function WatchPage() {
  const [isStitching, setIsStitching] = useState(false);
  const [showGifts, setShowGifts] = useState(false);
  const [messages, setMessages] = useState([
    { user: "JaydenKeys", text: "That point right there!! 🔥🔥🔥", type: "normal" },
  ]);
  const [input, setInput] = useState("");
  const [seedBalance, setSeedBalance] = useState(5200);

  const gifts: GiftType[] = [
    { name: "Seed", amount: 50, icon: "🌱" },
    { name: "Double Portion", amount: 150, icon: "✨" },
    { name: "Overflow", amount: 500, icon: "🔥" },
    { name: "Breakthrough", amount: 1200, icon: "⚡" },
    { name: "Open Heaven", amount: 2500, icon: "🌈" },
  ];

  function sendMessage(isSuper = false) {
    if (!input.trim()) return;
    const newMsg = {
      user: "You",
      text: input,
      type: isSuper ? "super" : "normal",
    };
    setMessages([newMsg, ...messages]);
    setInput("");
  }

  function sendGift(gift: GiftType) {
    if (seedBalance < gift.amount) return alert("Not enough Prophetic Seeds!");
    setSeedBalance(seedBalance - gift.amount);
    const newMsg = {
      user: "You",
      text: `${gift.icon} Sent ${gift.name}! (−${gift.amount} Seeds)`,
      type: "gift",
    };
    setMessages([newMsg, ...messages]);
    setShowGifts(false);
  }

  return (
    <div className="min-h-screen bg-[#0b0e11] text-white font-sans flex flex-col relative">
      <Navbar />

      {/* STITCH MODAL */}
      {isStitching && (
        <div className="absolute inset-0 z-50 bg-black/90 flex items-center justify-center p-8 backdrop-blur-sm">
          <div className="bg-[#18181b] border border-white/10 w-full max-w-4xl h-[80vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl relative">
            <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#111]">
              <div className="flex items-center gap-2">
                <Scissors className="w-5 h-5 text-violet-500" />
                <span className="font-bold text-lg uppercase tracking-wide">
                  Create Stitch
                </span>
              </div>

              <button
                onClick={() => setIsStitching(false)}
                className="p-2 hover:bg-white/10 rounded-full transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 flex">
              <div className="flex-1 bg-black relative border-r border-white/10">
                <iframe
                  className="absolute inset-0 w-full h-full opacity-60"
                  src="https://www.youtube.com/embed/5osAqv0xkLk"
                ></iframe>
              </div>

              <div className="flex-1 bg-[#222] relative overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full border-4 border-red-500 flex items-center justify-center mb-4 cursor-pointer">
                    <div className="w-16 h-16 bg-red-600 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-sm font-bold uppercase tracking-widest text-red-400">
                    Tap to Record
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">

        {/* LEFT SIDE VIDEO */}
        <div className="flex-1 flex flex-col bg-black overflow-y-auto">
          <div className="p-4">
            <Link
              href="/stream"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-xs font-bold uppercase mb-4"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Hub
            </Link>
          </div>

          <div className="p-4 pt-0">
            <div className="w-full aspect-video bg-black rounded-xl overflow-hidden border border-white/10">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/edcc68JTpwc?autoplay=1"
                allowFullScreen
              ></iframe>

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded animate-pulse">
                  LIVE
                </span>
                <span className="bg-black/60 px-2 py-0.5 text-[10px] font-bold rounded flex items-center gap-1">
                  <Users className="w-3 h-3" /> 18,205
                </span>
              </div>
            </div>
          </div>

          <div className="px-6 pb-6">
            <h1 className="text-2xl font-black italic uppercase tracking-tighter">
              Faith + Obedience = Miracles!
            </h1>
          </div>
        </div>

        {/* RIGHT SIDE CHAT */}
        <div className="w-full lg:w-80 bg-[#18181b] border-l border-[#2f2f35] flex flex-col h-full">

          {/* CHAT HEADER */}
          <div className="h-12 border-b border-[#2f2f35] flex items-center justify-between px-4">
            <span className="font-bold text-xs uppercase tracking-wider text-gray-400">
              Stream Chat
            </span>
            <span className="flex items-center gap-1 text-xs text-emerald-300 font-bold">
              <Coins className="w-3 h-3" /> {seedBalance}
            </span>
          </div>

          {/* CHAT MESSAGES */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
            {messages.map((m, i) => (
              <div key={i}>
                {m.type === "gift" && (
                  <div className="text-amber-300 font-bold flex items-center gap-1">
                    <Gift className="w-4 h-4" /> {m.user}: {m.text}
                  </div>
                )}

                {m.type === "super" && (
                  <div className="bg-violet-600/30 border border-violet-500 rounded-lg p-2 font-bold">
                    {m.user}: {m.text}
                  </div>
                )}

                {m.type === "normal" && (
                  <span>
                    <span className="font-bold text-[#53fc18] mr-2">
                      {m.user}:
                    </span>
                    <span className="text-gray-300">{m.text}</span>
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* GIFTS POPUP */}
          {showGifts && (
            <div className="absolute right-0 bottom-16 w-64 bg-[#111] border border-white/10 rounded-xl p-4">
              <div className="grid grid-cols-2 gap-3">
                {gifts.map((gift, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendGift(gift)}
                    className="bg-[#1f1f1f] p-3 rounded-lg border border-white/10"
                  >
                    <span className="text-2xl">{gift.icon}</span>
                    <span className="text-xs text-gray-400">{gift.name}</span>
                    <span className="text-xs font-bold text-yellow-400">
                      {gift.amount} Seeds
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CHAT INPUT */}
          <div className="p-4 border-t border-[#2f2f35] flex items-center gap-2">

            <button
              onClick={() => setShowGifts(!showGifts)}
              className="p-2 bg-[#222] rounded-full"
            >
              <Gift className="w-5 h-5 text-yellow-300" />
            </button>

            <button
              onClick={() => sendMessage(true)}
              className="p-2 bg-violet-600 rounded-full"
            >
              <Sparkles className="w-5 h-5" />
            </button>

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(false)}
              placeholder="Send a message…"
              className="flex-1 bg-[#2f2f35] rounded-lg px-3 py-2 text-sm"
            />

            <button
              onClick={() => sendMessage()}
              className="p-2 bg-violet-600 rounded-full"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
