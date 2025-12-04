"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Play, Volume2, VolumeX } from "lucide-react";

type Episode = {
  id: string;
  title: string;
  seriesTitle: string;
  episodeNumber: number;
  duration: string;
  thumbnail: string;
  tag: string;
  description: string;
};

const MOCK_EPISODES: Episode[] = [
  {
    id: "gaming-addiction-ep1",
    title: "He missed church… for a game.",
    seriesTitle: "Gaming Addiction Parable",
    episodeNumber: 1,
    duration: "1:15",
    thumbnail: "/vertical-gaming-1.jpg",
    tag: "Microdrama",
    description:
      "A young gamer skips family dinner for a ranked match. Things go left quickly.",
  },
  {
    id: "behind-pulpit-ep1",
    title: "Pastor by day, broken at night.",
    seriesTitle: "Behind the Pulpit",
    episodeNumber: 1,
    duration: "1:30",
    thumbnail: "/vertical-pastor-1.jpg",
    tag: "Behind The Scenes",
    description:
      "A young pastor has to preach hope while privately battling doubt.",
  },
  {
    id: "kindness-ep1",
    title: "Would you return the $20?",
    seriesTitle: "The Unseen Act of Kindness",
    episodeNumber: 1,
    duration: "0:58",
    thumbnail: "/vertical-kindness-1.jpg",
    tag: "Modern Parable",
    description:
      "A cashier gives too much change. No one sees… except God.",
  },
  {
    id: "forgiveness-ep1",
    title: "You blocked them… but not the hurt.",
    seriesTitle: "The Forgiveness Challenge",
    episodeNumber: 1,
    duration: "1:05",
    thumbnail: "/vertical-forgiveness-1.jpg",
    tag: "Relationship",
    description:
      "Two best friends fall out over betrayal. Can grace win?",
  },
];

export default function DramasPage() {
  const [muted, setMuted] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="h-screen w-full bg-black text-white flex flex-col">
      <Navbar />

      {/* Microdrama Feed */}
      <div className="flex-1 relative overflow-hidden">
        <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">
          {MOCK_EPISODES.map((ep) => (
            <section
              key={ep.id}
              className="h-[calc(100vh-5rem)] w-full snap-start flex items-center justify-center relative"
              onClick={() => setActiveId(ep.id)}
            >
              {/* Vertical Card */}
              <div className="relative w-full max-w-sm h-full bg-black overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col">
                {/* Thumbnail / Video Placeholder */}
                <div className="relative flex-1">
                  <Image
                    src={ep.thumbnail}
                    alt={ep.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />

                  {/* Top Labels */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2 text-left">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/60 text-[11px] font-semibold">
                      {ep.tag}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-[10px]">
                      {ep.seriesTitle} • Ep {ep.episodeNumber}
                    </span>
                  </div>

                  {/* Duration */}
                  <span className="absolute top-4 right-4 text-[11px] bg-black/70 px-2 py-1 rounded-full">
                    {ep.duration}
                  </span>

                  {/* Title & CTA */}
                  <div className="absolute bottom-4 left-4 right-4 space-y-2 text-left">
                    <h2 className="text-lg font-bold leading-tight">
                      {ep.title}
                    </h2>
                    <p className="text-[12px] text-gray-300 line-clamp-2">
                      {ep.description}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <button className="inline-flex items-center gap-2 bg-[#53fc18] text-black px-4 py-2 rounded-full text-xs font-semibold hover:bg-[#46d615]">
                        <Play className="w-3 h-3 fill-black" />
                        Watch Episode
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setMuted((prev) => !prev);
                          }}
                          className="w-8 h-8 rounded-full bg-black/70 flex items-center justify-center"
                        >
                          {muted ? (
                            <VolumeX className="w-4 h-4" />
                          ) : (
                            <Volume2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Page Label */}
        <div className="absolute left-4 bottom-4 text-[11px] text-gray-400 bg-black/50 px-3 py-1 rounded-full">
          Microdramas • Swipe up for next episode
        </div>
      </div>
    </div>
  );
}
