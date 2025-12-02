"use client";

import Link from "next/link";
import { Users, Sparkles, Coins, Music2, Mic2 } from "lucide-react";
import { useState } from "react";

export default function FeedPage() {
  // Hide broken album images
  const [brokenImages, setBrokenImages] = useState<{ [key: number]: boolean }>({});

  const handleError = (id: number) => {
    setBrokenImages((prev) => ({ ...prev, [id]: true }));
  };

  // LIVE STREAMS — now with SLUGS for creator linking
  const liveStreams = [
    {
      id: 1,
      slug: "td-jakes",
      title: "Faith + Obedience = Miracles!",
      streamer: "Bishop T.D. Jakes",
      viewers: 18205,
      tags: ["Sermon", "Faith", "Live"],
      thumbnail: "/td-jakes.jpg",
    },
    {
      id: 2,
      slug: "kirk-franklin",
      title: "Praise Break • Live Worship",
      streamer: "Kirk Franklin",
      viewers: 12440,
      tags: ["Worship", "Music", "Praise"],
      thumbnail: "/kirk_avatar.png",
      album: "/kirk-franklin-album.jpg",
    },
    {
      id: 3,
      slug: "lauren-daigle",
      title: "Late Night Gospel Flow",
      streamer: "Lauren Daigle",
      viewers: 9200,
      tags: ["Gospel", "Live", "Music"],
      thumbnail: "/lauren-daigle.jpg",
    },
    {
      id: 4,
      slug: "pastor-stevenson",
      title: "Prayer & Prophetic Flow",
      streamer: "Pastor Stevenson",
      viewers: 7855,
      tags: ["Prayer", "Teaching"],
      thumbnail: "/steven-furtick.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-28">

      {/* HEADER */}
      <div className="flex items-center justify-between w-full px-6 py-5 bg-[#0f0f0f] border-b border-white/10">
        <span className="text-6xl font-black tracking-tight text-[#53fc18] neon-text">
          PARABLE
        </span>

        <Link
          href="/monetization"
          className="bg-[#53fc18] text-black font-bold px-5 py-2 rounded-xl flex items-center gap-2 shadow-[0_0_12px_#53fc18]"
        >
          <Coins className="w-5 h-5" />
          GET SEEDS
        </Link>
      </div>

      {/* FLASH HERO BANNER */}
      <div className="relative mt-5 mx-6 rounded-2xl overflow-hidden border border-white/10 h-44 bg-gradient-to-r from-[#53fc18]/20 via-black to-[#3bff95]/20 flex items-center justify-start">
        <div className="px-6">
          <h2 className="text-4xl font-black">Streaming. Creating. Believing.</h2>
          <p className="text-gray-300 mt-2 text-sm max-w-xs">
            A community for believers, creators & gospel influencers.
          </p>
        </div>
        <Sparkles className="absolute right-6 bottom-6 w-12 h-12 text-[#53fc18]" />
      </div>

      {/* LIVE NOW SECTION */}
      <div className="mt-10 px-6 w-full">
        <h2 className="text-3xl font-extrabold mb-4 text-[#53fc18]">Live Now</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

          {liveStreams.map((s) => (
            <Link
              key={s.id}
              href={`/creator/${s.slug}`}
              className="neon-card rounded-xl overflow-hidden border border-white/10 flex flex-col cursor-pointer hover:scale-[1.02] transition-transform duration-200 h-[300px]"
            >
              {/* Thumbnail */}
              <div className="relative">
                <img src={s.thumbnail} className="w-full h-36 object-cover" />

                <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded font-black uppercase">
                  LIVE
                </span>

                <span className="absolute bottom-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                  <Users className="w-3 h-3" /> {s.viewers.toLocaleString()}
                </span>
              </div>

              {/* Content */}
              <div className="p-3 flex flex-col flex-grow">
                <p className="font-bold text-sm leading-tight">{s.title}</p>

                <p className="text-[12px] text-gray-300 mt-1 leading-tight">
                  {s.streamer}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-2 mb-auto">
                  {s.tags.map((tag, i) => (
                    <span key={i} className="neon-tag text-[10px]">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Album (optional) */}
                {s.album && !brokenImages[s.id] && (
                  <img
                    src={s.album}
                    className="w-full h-20 object-cover rounded-lg border border-white/10"
                    onError={() => handleError(s.id)}
                  />
                )}
              </div>
            </Link>
          ))}

        </div>
      </div>
    </div>
  );
}
