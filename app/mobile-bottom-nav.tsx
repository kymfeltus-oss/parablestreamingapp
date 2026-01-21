"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, BookOpen, Music2, Heart, Gamepad2, GaugeCircle } from "lucide-react";

export default function ClientBottomNav() {
  const pathname = usePathname();

  // FIXED: Changed color from green to Neon Blue (#00f2ff)
  const isActive = (route: string) => pathname === route ? "text-[#00f2ff]" : "text-gray-400";
  
  // FIXED: Added Neon Blue glow effect
  const glow = (route: string) => pathname === route ? "drop-shadow([0_0_8px_rgba(0,242,255,0.8)])" : "";

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/10 py-3 flex justify-around items-center z-50">
      <Link href="/feed" className="flex flex-col items-center text-[10px] font-black uppercase tracking-tighter transition-all">
        <Home className={`w-6 h-6 mb-1 ${isActive("/feed")} ${glow("/feed")}`} />
        <span className={isActive("/feed")}>Home</span>
      </Link>
      
      <Link href="/stream" className="flex flex-col items-center text-[10px] font-black uppercase tracking-tighter transition-all">
        <Users className={`w-6 h-6 mb-1 ${isActive("/stream")} ${glow("/stream")}`} />
        <span className={isActive("/stream")}>Streamers</span>
      </Link>

      <Link href="/parables" className="flex flex-col items-center text-[10px] font-black uppercase tracking-tighter transition-all">
        <BookOpen className={`w-6 h-6 mb-1 ${isActive("/parables")} ${glow("/parables")}`} />
        <span className={isActive("/parables")}>Parables</span>
      </Link>

      <Link href="/music" className="flex flex-col items-center text-[10px] font-black uppercase tracking-tighter transition-all">
        <Music2 className={`w-6 h-6 mb-1 ${isActive("/music")} ${glow("/music")}`} />
        <span className={isActive("/music")}>Music</span>
      </Link>

      <Link href="/follow" className="flex flex-col items-center text-[10px] font-black uppercase tracking-tighter transition-all">
        <Heart className={`w-6 h-6 mb-1 ${isActive("/follow")} ${glow("/follow")}`} />
        <span className={isActive("/follow")}>Fellowship</span>
      </Link>

      <Link href="/gaming" className="flex flex-col items-center text-[10px] font-black uppercase tracking-tighter transition-all">
        <Gamepad2 className={`w-6 h-6 mb-1 ${isActive("/gaming")} ${glow("/gaming")}`} />
        <span className={isActive("/gaming")}>Gaming</span>
      </Link>

      <Link href="/dashboard" className="flex flex-col items-center text-[10px] font-black uppercase tracking-tighter transition-all">
        <GaugeCircle className={`w-6 h-6 mb-1 ${isActive("/dashboard")} ${glow("/dashboard")}`} />
        <span className={isActive("/dashboard")}>Dashboard</span>
      </Link>
    </nav>
  );
}