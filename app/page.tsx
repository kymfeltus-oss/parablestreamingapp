"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { creators } from "@/lib/preachers";
import Link from "next/link";

import {
  Activity,
  Users,
  DollarSign,
  BookOpen,
  Video,
  ArrowUpRight,
  Play,
  MoreHorizontal,
  Zap,
  ArrowLeft,
  ShoppingBag,
  Heart,
  MessageCircle,
  Share2,
  Headphones,
} from "lucide-react";

export default function Home() {
  const featuredCreator = creators[0];

  const miniVideos = [
    {
      title: "Don't Fall For The Trap",
      creator: "Mike Todd",
      embed: "https://www.youtube.com/embed/PqOUvrAP9Rc",
    },
    {
      title: "Winning Your Battles",
      creator: "Joyce Meyer",
      embed: "https://www.youtube.com/embed/Wgwog58pYJc",
    },
    {
      title: "When God Whispered to a Woman",
      creator: "Keion Henderson & Dr. Valerie Moore",
      embed: "https://www.youtube.com/embed/Xg7B07Kr1lU",
    },
    {
      title: "The Gift You Didn’t Ask For",
      creator: "Dr. Valerie Moore",
      embed: "https://www.youtube.com/embed/333eZPNy6kM",
    },
    {
      title: "I Survived the Rough Ride",
      creator: "John Heath II",
      embed: "https://www.youtube.com/embed/mJas2ZnJ9UQ",
    },
    {
      title: "No Weapon (Live)",
      creator: "Todd Dulaney",
      embed: "https://www.youtube.com/embed/_WdUIWfMDeU",
    },
    {
      title: "Deliver Me (Live)",
      creator: "Le’Andria Johnson",
      embed: "https://www.youtube.com/embed/Aj3dfAnUxyk",
    },
    {
      title: "Eva McCullar Interview",
      creator: "Gospel Artist Entertainment",
      embed: "https://www.youtube.com/embed/kMffpD5Gq7c",
    },
  ];

  return (
    <main className="min-h-screen pb-20 bg-black text-white font-sans">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">

        {/* BACK BUTTON */}
        <button
          onClick={() => history.back()}
          className="flex items-center gap-2 text-xs text-gray-500 hover:text-white mb-4"
        >
          <ArrowLeft className="w-3 h-3" /> Back
        </button>

        {/* PROFILE HEADER */}
        <section className="bg-[#111] border border-white/10 rounded-2xl p-6 mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-red-500 border-2 border-white/20 flex items-center justify-center text-xl font-bold shadow-[0_0_25px_rgba(0,142,255,0.6)]">
                  J
                </div>
                <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-black" />
              </div>

              <div>
                <h1 className="text-2xl font-bold">Joshua</h1>
                <p className="text-xs text-gray-400">Pastor • Creator • Influencer</p>

                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1 text-sm font-bold text-gray-300">
                    <Zap className="w-3 h-3 text-yellow-400" /> Level 12
                  </div>

                  <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-[75%] bg-gradient-to-r from-blue-400 to-red-500" />
                  </div>

                  <span className="text-xs text-gray-500">XP: 75%</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-center px-4 border-r border-white/10">
                <div className="text-2xl font-bold">12.5k</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">Followers</div>
              </div>

              <div className="text-center px-4 border-r border-white/10">
                <div className="text-2xl font-bold text-emerald-400 flex items-center gap-1">
                  <DollarSign className="w-4 h-4" /> 2.4k
                </div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">Seeds Given</div>
              </div>

              <div className="text-center px-4">
                <div className="text-2xl font-bold text-green-400">Online</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">Status</div>
              </div>
            </div>
          </div>
        </section>

        {/* LIVESTREAM SECTION */}
        <section className="grid lg:grid-cols-[2fr,1.2fr] gap-6 mb-12">

          <div className="bg-[#111] border border-white/10 rounded-2xl p-4">
            <div className="relative w-full pt-[56.25%] rounded-xl border border-white/10 bg-black overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/edcc68JTpwc"
                className="absolute inset-0 w-full h-full"
                allowFullScreen
              ></iframe>

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
                  LIVE
                </span>
                <span className="bg-black/60 text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                  <Users className="w-3 h-3" /> 18,205 watching
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 flex flex-col justify-center gap-4">
            <h2 className="text-2xl font-black">Currently Streaming</h2>
            <p className="text-gray-300 text-sm">Tap into the latest livestreams and content drops.</p>

            <Link
              href="/stream/watch"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition"
            >
              Watch Live <Play className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ⭐ RESTORED CREATOR TOOLS ⭐ */}
        <section className="mb-12">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
            Creator Tools
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* GO LIVE CARD */}
            <Link
              href="/stream"
              className="group bg-[#111] border border-white/10 rounded-2xl p-6 hover:border-red-500/50 transition"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-red-600 w-8 h-8 rounded-lg flex items-center justify-center">
                  <Activity className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-black tracking-wide">GO LIVE</h2>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-white/10">
                <img
                  src="/stock_live_broadcast.jpg"
                  className="w-full h-40 object-cover opacity-80 group-hover:opacity-100 transition"
                />
                <div className="absolute top-3 left-3 bg-red-600 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                  LIVE NOW
                </div>
                <div className="absolute bottom-3 left-3">
                  <h3 className="text-xl font-extrabold">Watch Broadcast</h3>
                  <p className="text-gray-300 text-xs">Bishop T.D. Jakes • The Potter’s House</p>
                </div>
              </div>
            </Link>

            {/* AI SANCTUARY CARD */}
            <Link
              href="/sanctuary"
              className="group bg-[#111] border border-white/10 rounded-2xl p-6 hover:border-violet-500/50 transition"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-violet-600 w-8 h-8 rounded-lg flex items-center justify-center">
                  <Video className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-black tracking-wide">AI SANCTUARY</h2>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-white/10">
                <img
                  src="/stock_ai_sanctuary.jpg"
                  className="w-full h-40 object-cover opacity-80 group-hover:opacity-100 transition"
                />
                <div className="absolute top-3 left-3 bg-violet-600 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                  SANCTUARY MODE
                </div>
                <div className="absolute bottom-3 left-3">
                  <h3 className="text-xl font-extrabold italic">ENTER SANCTUARY</h3>
                  <p className="text-gray-300 text-xs">AI-powered worship + message flow.</p>
                </div>
              </div>

              <button className="mt-4 bg-violet-600 hover:bg-violet-500 text-white px-5 py-2 rounded-full text-xs font-bold transition">
                LAUNCH →
              </button>
            </Link>

            {/* THIRD CARD — LEFT UNCHANGED */}

          </div>
        </section>

        {/* RECOMMENDED VIDEOS */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">Recommended Videos</h2>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              Swipe to browse <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {miniVideos.map((v, i) => (
              <div
                key={i}
                className="min-w-[260px] max-w-[260px] bg-[#111] border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/60 transition group"
              >
                <div className="relative w-full pt-[56.25%] bg-black">
                  <iframe
                    src={v.embed}
                    className="absolute inset-0 w-full h-full opacity-90 group-hover:opacity-100 transition"
                    allowFullScreen
                  ></iframe>
                </div>

                <div className="p-3">
                  <p className="font-bold text-sm truncate group-hover:text-blue-300 transition">
                    {v.title}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-1 truncate">
                    {v.creator}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MINI GRID */}
        <section className="mb-12">
          <h2 className="text-lg font-bold mb-3">More Content</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {miniVideos.map((v, i) => (
              <div
                key={i}
                className="bg-[#111] border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/50 transition group"
              >
                <div className="relative w-full pt-[56.25%] bg-black">
                  <iframe
                    src={v.embed}
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>

                <div className="p-3">
                  <p className="font-bold text-sm group-hover:text-blue-300">
                    {v.title}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-1">
                    {v.creator}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CREATOR FEED */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Creator Feed</h2>

          <div className="bg-[#111] border border-white/10 p-5 rounded-2xl mb-6">
            <div className="flex gap-3 mb-3">
              <img
                src="/td_avatar.jpg"
                className="w-10 h-10 rounded-full border border-white/10"
              />

              <div>
                <p className="font-bold text-sm">Joshua</p>
                <p className="text-xs text-gray-500">4h ago</p>
              </div>
            </div>

            <p className="text-sm text-gray-200 mb-4">
              “Walking in Authority” landed heavy today. Appreciate everyone tapping in 🔥🙏
            </p>

            <div className="aspect-video rounded-xl overflow-hidden border border-white/10">
              <img
                src="/td_banner.png"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-6 mt-4 text-gray-400 text-xs">
              <button className="flex items-center gap-1 hover:text-red-400">
                <Heart className="w-4 h-4" /> 1.4k
              </button>

              <button className="flex items-center gap-1 hover:text-blue-400">
                <MessageCircle className="w-4 h-4" /> 350
              </button>

              <button className="flex items-center gap-1 hover:text-green-400">
                <Share2 className="w-4 h-4" /> 210
              </button>
            </div>
          </div>
        </section>

        <HeroSection creator={featuredCreator} />

        <h2 className="text-xl font-bold mb-4 mt-10">Trending Creators</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {creators.map((c) => (
            <Link
              href={`/creator/${c.slug}`}
              key={c.slug}
              className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <img
                  src={c.avatarUrl}
                  className="w-16 h-16 rounded-full object-cover group-hover:scale-110 transition border-2 border-transparent group-hover:border-blue-500"
                />
                <div>
                  <h3 className="font-bold group-hover:text-blue-400 transition">
                    {c.name}
                  </h3>
                  <p className="text-sm text-gray-400">{c.ministry}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
