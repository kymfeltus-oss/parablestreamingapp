"use client";

import { useState } from "react";
import { Plus, Video, Music } from "lucide-react";

export default function PraiseBreakUpload() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative mb-12 p-8 border border-dashed border-[#00f2ff]/30 rounded-2xl bg-black/40 hover:border-[#00f2ff] transition-all cursor-pointer group"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-[#00f2ff]/10 flex items-center justify-center shadow-[0_0_15px_rgba(0,242,255,0.1)] group-hover:shadow-[0_0_25px_rgba(0,242,255,0.4)] transition-all">
          <Plus className="text-[#00f2ff] w-6 h-6" />
        </div>
        <div className="text-center">
          <h3 className="text-[11px] font-black tracking-[4px] text-white uppercase italic">Initialize_Praise_Break</h3>
          <p className="text-[8px] text-gray-500 uppercase mt-2 font-mono">Select MP4/MOV // Auto-Sync Enabled</p>
        </div>
      </div>
      
      {/* Hidden Input for File Selection */}
      <input 
        type="file" 
        className="absolute inset-0 opacity-0 cursor-pointer" 
        accept="video/*"
      />
    </div>
  );
}