"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Film,
  Music2,
  Heart,
  GaugeCircle,
  User,
} from "lucide-react";

export default function ClientBottomNav() {
  const pathname = usePathname();

  const isActive = (route: string) =>
    pathname === route ? "text-[#53fc18]" : "text-gray-500";

  const glow = (route: string) =>
    pathname === route ? "shadow-[0_0_12px_#53fc18]" : "";

  return (
    <nav
      className="
        fixed bottom-0 left-0 w-full 
        bg-black/90 backdrop-blur-xl 
        border-t border-white/10 
        py-2 flex justify-around items-center 
        z-50
      "
    >

      {/* HOME */}
      <Link href="/feed" className="flex flex-col items-center text-xs">
        <Home className={`w-6 h-6 mb-1 ${isActive("/feed")} ${glow("/feed")}`} />
        <span className={isActive("/feed")}>Home</span>
      </Link>

      {/* STREAMERS */}
      <Link href="/stream" className="flex flex-col items-center text-xs">
        <Users className={`w-6 h-6 mb-1 ${isActive("/stream")} ${glow("/stream")}`} />
        <span className={isActive("/stream")}>Streamers</span>
      </Link>

      {/* DRAMA */}
      <Link href="/dramas" className="flex flex-col items-center text-xs">
        <Film className={`w-6 h-6 mb-1 ${isActive("/dramas")} ${glow("/dramas")}`} />
        <span className={isActive("/dramas")}>Drama</span>
      </Link>

      {/* MUSIC */}
      <Link href="/music" className="flex flex-col items-center text-xs">
        <Music2 className={`w-6 h-6 mb-1 ${isActive("/music")} ${glow("/music")}`} />
        <span className={isActive("/music")}>Music</span>
      </Link>

      {/* FOLLOW (BOOKMARK/SAVED) */}
      <Link href="/follow" className="flex flex-col items-center text-xs">
        <Heart className={`w-6 h-6 mb-1 ${isActive("/follow")} ${glow("/follow")}`} />
        <span className={isActive("/follow")}>Follow</span>
      </Link>

      {/* DASHBOARD - MONETIZATION */}
      <Link
        href="/monetization"
        className="flex flex-col items-center text-xs"
      >
        <GaugeCircle
          className={`w-6 h-6 mb-1 ${isActive("/monetization")} ${glow("/monetization")}`}
        />
        <span className={isActive("/monetization")}>Dashboard</span>
      </Link>

      {/* PROFILE */}
      <Link href="/profile" className="flex flex-col items-center text-xs">
        <User className={`w-6 h-6 mb-1 ${isActive("/profile")} ${glow("/profile")}`} />
        <span className={isActive("/profile")}>Profile</span>
      </Link>
    </nav>
  );
}
