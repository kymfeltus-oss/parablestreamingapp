"use client";

import Link from "next/link";
import { Play, Lock } from "lucide-react";

export default function ParableCard({ ep, unlocked }: { ep: any; unlocked?: boolean }) {
  return (
    <Link
      href={`/parables/${ep.id}`}
      className="
        relative w-full h-[380px] rounded-2xl overflow-hidden 
        bg-[#0d0d0d] border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]
        hover:shadow-[0_0_25px_#53fc18] hover:border-[#53fc18]/40
        transition-all duration-200 flex-shrink-0
      "
    >
      <img
        src={ep.thumbnail || "/placeholder.jpg"}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />

      {/* Locked overlay */}
      {!unlocked && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div
            className="
              w-14 h-14 rounded-full bg-black/60 border border-white/20
              flex items-center justify-center shadow-[0_0_15px_black]
            "
          >
            <Lock className="w-6 h-6 text-white" />
          </div>
        </div>
      )}

      {/* Episode ribbon */}
      <span className="
        absolute top-3 left-3 bg-[#53fc18]/20 text-[#53fc18] border border-[#53fc18]/30 
        px-3 py-1 rounded-full text-xs font-bold shadow-[0_0_10px_#53fc18]
      ">
        Episode {ep.episodeNumber || 1}
      </span>

      {/* Play button (if unlocked) */}
      {unlocked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="
            w-14 h-14 rounded-full bg-black/50 border border-white/20 
            flex items-center justify-center hover:scale-110 transition
          ">
            <Play className="w-6 h-6 text-white" />
          </div>
        </div>
      )}

      {/* Text */}
      <div className="absolute bottom-4 left-4 right-4 text-white">
        <p className="font-bold text-lg leading-tight mb-1">{ep.title}</p>
        {ep.scriptureRef && <p className="text-xs text-[#53fc18]">{ep.scriptureRef}</p>}
        <p className="text-[11px] text-gray-400">{ep.seriesTitle}</p>
      </div>
    </Link>
  );
}
