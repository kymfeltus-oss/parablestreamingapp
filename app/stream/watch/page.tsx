"use client";

import { useState } from "react";
import {
  Send,
  Users,
  Scissors,
  X,
  ArrowLeft,
  Sparkles,
  Gift,
  Coins,
  Menu,
  Bell,
  Search
} from "lucide-react";

// --- MOCKS FOR PREVIEW ---
// In your actual Next.js app, keep your original imports:
// import Navbar from "@/components/Navbar";
// import Link from "next/link";

const Link = ({ href, children, className }: any) => (
  <a href={href} className={className}>
    {children}
  </a>
);

const Navbar = () => (
  <nav className="h-16 bg-[#111] border-b border-white/10 flex items-center justify-between px-6 sticky top-0 z-40">
    <div className="flex items-center gap-4">
      <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center font-bold text-xl">
        P
      </div>
      <span className="font-bold text-lg tracking-tight">Parable</span>
    </div>
    <div className="flex items-center gap-6 text-gray-400">
      <Search className="w-5 h-5 hover:text-white cursor-pointer" />
      <Bell className="w-5 h-5 hover:text-white cursor-pointer" />
      <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
    </div>
  </nav>
);
// -------------------------

export default function WatchPage() {
  const [isStitching, setIsStitching] = useState(false);
  const [showGifts, setShowGifts] = useState(false);
  const [messages, setMessages] = useState([
    { user: "JaydenKeys", text: "That point right there!! 🔥🔥🔥", type: "normal" },
  ]);
  const [input, setInput] = useState("");
  const [seedBalance, setSeedBalance] = useState(5200); // Example balance

  const gifts = [
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

  // FIX APPLIED HERE: Added ': any' to the gift parameter
  function sendGift(gift: any) {
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

      {/* ============================================================
          MODAL — STITCH MODE
      ============================================================ */}
      {isStitching && (
        <div className="absolute inset-0 z-50 bg-black/90 flex items-center justify-center p-8 backdrop-blur-sm animate-fade-in">
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
                  src="https://www.youtube.com/embed/5osAqv0xkLk?autoplay=0&controls=0&showinfo=0"
                  title="Original Video"
                ></iframe>
              </div>

              <div className="flex-1 bg-[#222] relative overflow-hidden">
                <img
                  src="/course_music.jpg"
                  className="w-full h-full object-cover opacity-40 grayscale"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full border-4 border-red-500 flex items-center justify-center mb-4 cursor-pointer hover:scale-110 transition shadow-[0_0_25px_rgba(239,68,68,0.5)]">
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

      {/* ============================================================
          MAIN STREAM LAYOUT
      ============================================================ */}
      <main className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">

        {/* LEFT SIDE — LIVE VIDEO */}
        <div className="flex-1 flex flex-col bg-black relative overflow-y-auto custom-scrollbar">

          <div className="p-4">
            <Link
              href="/stream"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-xs font-bold uppercase mb-4"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Hub
            </Link>
          </div>

          <div className="p-4 pt-0">
            <div className="w-full aspect-video bg-black relative rounded-xl overflow-hidden border border-white/10">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/edcc68JTpwc?autoplay=1&modestbranding=1&rel=0&controls=1"
                title="Live Stream"
                allowFullScreen
              ></iframe>

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
                  LIVE
                </span>
                <span className="bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  <Users className="w-3 h-3" /> 18,205
                </span>
              </div>
            </div>
          </div>

          {/* STREAM INFO + STITCH BUTTON */}
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <img
                    src="/td_avatar.jpg"
                    className="w-16 h-16 rounded-full border-2 border-green-500 p-0.5 object-cover"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                  <div className="absolute bottom-0 right-0 bg-green-500 text-black text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-black uppercase">
                    LIVE
                  </div>
                </div>

                <div>
                  <h1 className="text-2xl font-black italic uppercase tracking-tighter">
                    Faith + Obedience = Miracles!
                  </h1>

                  <div className="flex items-center gap-2 text-violet-400 font-bold text-sm mb-1">
                    <span>Bishop T.D. Jakes</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-400 font-normal">
                      Sunday Service
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsStitching(true)}
                className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded font-bold uppercase text-xs hover:bg-violet-500 transition shadow-lg shadow-violet-600/20 transform hover:scale-105"
              >
                <Scissors className="w-4 h-4" /> Stitch / React
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================
            RIGHT SIDE — CHAT + GIFTS + SUPERCHAT
        ============================================================ */}
        <div className="w-full lg:w-80 bg-[#18181b] border-l border-[#2f2f35] flex flex-col h-full">

          {/* =========================
              CHAT HEADER
          ========================== */}
          <div className="h-12 border-b border-[#2f2f35] flex items-center justify-between px-4">
            <span className="font-bold text-xs uppercase tracking-wider text-gray-400">
              Stream Chat
            </span>

            {/* SEED BALANCE */}
            <span className="flex items-center gap-1 text-xs text-emerald-300 font-bold">
              <Coins className="w-3 h-3" /> {seedBalance}
            </span>
          </div>

          {/* =========================
              CHAT MESSAGES
          ========================== */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">

            {messages.map((m, i) => (
              <div key={i} className="break-words">
                
                {/* GIFT MESSAGE */}
                {m.type === "gift" && (
                  <div className="text-amber-300 font-bold flex items-center gap-1">
                    <Gift className="w-4 h-4" /> {m.user}: {m.text}
                  </div>
                )}

                {/* SUPERCHAT */}
                {m.type === "super" && (
                  <div className="bg-violet-600/30 border border-violet-500 rounded-lg p-2 text-white font-bold shadow-lg">
                    {m.user}: {m.text}
                  </div>
                )}

                {/* NORMAL */}
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

          {/* =========================
              GIFT MENU
          ========================== */}
          {showGifts && (
            <div className="absolute right-0 bottom-16 w-64 bg-[#111] border border-white/10 rounded-xl p-4 z-50 shadow-2xl">
              <h3 className="font-bold mb-2 text-sm">Send a Gift</h3>

              <div className="grid grid-cols-2 gap-3">
                {gifts.map((gift, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendGift(gift)}
                    className="bg-[#1f1f1f] hover:bg-[#252525] p-3 rounded-lg border border-white/10 transition text-left"
                  >
                    <span className="text-2xl block">{gift.icon}</span>
                    <span className="text-xs text-gray-400">
                      {gift.name}
                    </span>
                    <span className="text-xs font-bold text-yellow-400">
                      {gift.amount} Seeds
                    </span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowGifts(false)}
                className="mt-3 text-xs text-gray-400 hover:text-white w-full text-center"
              >
                Close
              </button>
            </div>
          )}

          {/* =========================
              CHAT INPUT / SUPERCHAT / GIFTS
          ========================== */}
          <div className="p-4 bg-[#18181b] border-t border-[#2f2f35]">
            <div className="flex items-center gap-2">

              {/* GIFT BUTTON */}
              <button
                onClick={() => setShowGifts(!showGifts)}
                className="p-2 bg-[#222] hover:bg-[#333] rounded-full transition"
              >
                <Gift className="w-5 h-5 text-yellow-300" />
              </button>

              {/* SUPERCHAT BUTTON */}
              <button
                onClick={() => sendMessage(true)}
                className="p-2 bg-violet-600 hover:bg-violet-500 rounded-full transition shadow-md"
              >
                <Sparkles className="w-5 h-5 text-white" />
              </button>

              {/* INPUT FIELD */}
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(false)}
                placeholder="Send a message…"
                className="flex-1 bg-[#2f2f35] border border-transparent rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition placeholder-gray-500"
              />

              {/* SEND */}
              <button
                onClick={() => sendMessage(false)}
                className="p-2 bg-violet-600 hover:bg-violet-500 rounded-full transition"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}