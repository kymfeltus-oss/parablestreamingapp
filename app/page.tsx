"use client";

import Link from "next/link";
import { Users } from "lucide-react";

export default function HomePage() {
  const liveStreams = [
    {
      id: 1,
      title: "Tarkov now Arc Later",
      streamer: "gingy",
      game: "Escape From Tarkov",
      viewers: 296,
      tags: ["English", "18+", "fps", "tarkov", "solo", "arcade"],
      thumbnail: "/sample_live_thumb.jpg",
    },
    {
      id: 2,
      title: "Worship Live Tonight 🙏🔥",
      streamer: "PastorWill",
      game: "Worship",
      viewers: 1221,
      tags: ["English", "Worship", "Live"],
      thumbnail: "/sample_live_2.jpg",
    },
  ];

  const categories = [
    { title: "Just Chatting", viewers: "113.2K watching", image: "/cat_chat.jpg" },
    { title: "IRL", viewers: "102.5K watching", image: "/cat_irl.jpg" },
    { title: "Slots & Casino", viewers: "90K watching", image: "/cat_casino.jpg" },
    { title: "Shooter", viewers: "60.3K watching", image: "/cat_shooter.jpg" },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-20">

      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-4 bg-[#0f0f0f] border-b border-white/10">
        <Link href="/" className="text-3xl font-black tracking-tight text-[#53fc18]">
          PARABLE
        </Link>

        <div className="flex items-center gap-3">
          <button className="bg-[#53fc18] text-black px-3 py-1 rounded-md font-bold text-xs">
            Get SEEDS
          </button>

          <img
            src="/td_jakes_avatar.jpg"
            className="w-8 h-8 rounded-full border border-white/10"
          />
        </div>
      </div>

      {/* LIVE CAROUSEL */}
      <div className="p-4">
        <div className="overflow-x-auto flex gap-4 pb-2 scrollbar-none">

          {liveStreams.map((stream) => (
            <div
              key={stream.id}
              className="min-w-[330px] bg-[#111] rounded-xl overflow-hidden border border-white/10"
            >
              <div className="relative">
                <img
                  src={stream.thumbnail}
                  className="w-full h-48 object-cover"
                />

                <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded uppercase font-black">
                  LIVE
                </span>

                <span className="absolute bottom-2 left-2 bg-black/70 px-2 py-0.5 text-[11px] rounded flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {stream.viewers} watching
                </span>
              </div>

              <div className="p-3">
                <p className="font-bold text-[15px] leading-tight">
                  {stream.title}
                </p>

                <p className="text-sm mt-1">{stream.game}</p>

                <p className="text-xs text-gray-400">{stream.streamer}</p>

                <div className="flex flex-wrap gap-1 mt-2">
                  {stream.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-[#222] border border-white/10 text-[10px] rounded-full text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* TOP CATEGORIES */}
      <div className="px-4 mt-4">
        <h2 className="text-lg font-bold mb-3">Top Live Categories</h2>

        <div className="overflow-x-auto flex gap-4 pb-2 scrollbar-none">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="min-w-[130px] bg-[#111] rounded-lg overflow-hidden border border-white/10"
            >
              <img src={cat.image} className="w-full h-24 object-cover" />
              <div className="p-2">
                <p className="font-bold text-sm leading-tight">{cat.title}</p>
                <p className="text-[10px] text-gray-400">{cat.viewers}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* JUST CHATTING SECTION */}
      <div className="px-4 mt-6">
        <h2 className="text-lg font-bold mb-3">Just Chatting</h2>

        <div className="overflow-x-auto flex gap-4 pb-2 scrollbar-none">
          {[1, 2, 3].map((x) => (
            <div
              key={x}
              className="min-w-[330px] bg-[#111] rounded-xl overflow-hidden border border-white/10"
            >
              <img
                src="/sample_chat_thumb.jpg"
                className="w-full h-48 object-cover"
              />
              <div className="p-3">
                <p className="font-bold text-[15px] leading-tight">
                  Chatting session live right now
                </p>
                <p className="text-xs text-gray-400 mt-1">Host Speaker</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
