"use client";

import Link from "next/link";
import ParableParticles from "@/components/ParableParticles";

export default function FlashPage() {
  return (
    <div className="relative flex items-center justify-center h-screen w-full bg-black overflow-hidden">
      {/* BACKGROUND LAYER: Particles */}
      <div className="absolute inset-0 z-0">
        <ParableParticles />
      </div>
      
      {/* VISUAL LAYER: Cyan Glow Mist */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,_rgba(0,242,255,0.15)_0%,_transparent_70%)]" />

      {/* CONTENT LAYER: Text and Button */}
      <div className="relative z-20 text-center px-6">
        <h1 className="text-5xl md:text-9xl font-black text-[#00f2ff] mb-4 tracking-[15px] md:tracking-[25px] uppercase drop-shadow-[0_0_30px_rgba(0,242,255,0.8)]">
          PARABLE
        </h1>

        <div className="space-y-2 mb-10">
          <p className="text-[#00f2ff] text-lg md:text-2xl font-bold tracking-[4px] uppercase">
            Stream • Create • Worship • Connect
          </p>
          <p className="text-gray-400 text-sm md:text-lg tracking-[1px] opacity-80">
            A home for believers, creators, and gospel musicians.
          </p>
        </div>

        {/* LOCKED LOGIC: 
            1. Using a direct Link to /welcome
            2. z-50 ensures it is ALWAYS on top of particles
            3. cursor-pointer forced for mobile touch reliability
        */}
        <Link href="/welcome" className="relative z-50 inline-block">
          <button className="cursor-pointer border-2 border-[#00f2ff] text-[#00f2ff] font-bold px-14 py-5 uppercase tracking-[4px] transition-all duration-500 hover:bg-[#00f2ff] hover:text-black hover:shadow-[0_0_50px_#00f2ff] bg-black/20 backdrop-blur-sm active:scale-95">
            Enter Parable
          </button>
        </Link>
      </div>
    </div>
  );
}