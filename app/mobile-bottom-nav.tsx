"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  BookOpen,
  Music2,
  Heart,
  Gamepad2,
  GaugeCircle,
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
        <Users
          className={`w-6 h-6 mb-1 ${isActive("/stream")} ${glow("/stream")}`}
        />
        <span className={isActive("/stream")}>Streamers</span>
      </Link>

      {/* PARABLES */}
      <Link href="/parables" className="flex flex-col items-center text-xs">
        <BookOpen
          className={`w-6 h-6 mb-1 ${isActive("/parables")} ${glow("/parables")}`}
        />
        <span className={isActive("/parables")}>Parables</span>
      </Link>

      {/* MUSIC */}
      <Link href="/music" className="flex flex-col items-center text-xs">
        <Music2
          className={`w-6 h-6 mb-1 ${isActive("/music")} ${glow("/music")}`}
        />
        <span className={isActive("/music")}>Music</span>
      </Link>

      {/* FOLLOW */}
      <Link href="/follow" className="flex flex-col items-center text-xs">
        <Heart
          className={`w-6 h-6 mb-1 ${isActive("/follow")} ${glow("/follow")}`}
        />
        <span className={isActive("/follow")}>Follow</span>
      </Link>

      {/* GAMING (NEW) */}
      <Link href="/gaming" className="flex flex-col items-center text-xs">
        <Gamepad2
          className={`w-6 h-6 mb-1 ${isActive("/gaming")} ${glow("/gaming")}`}
        />
        <span className={isActive("/gaming")}>Gaming</span>
      </Link>

      {/* DASHBOARD */}
      <Link href="/dashboard" className="flex flex-col items-center text-xs">
        <GaugeCircle
          className={`w-6 h-6 mb-1 ${isActive("/dashboard")} ${glow(
            "/dashboard"
          )}`}
        />
        <span className={isActive("/dashboard")}>Dashboard</span>
      </Link>

      {/* PROFILE REMOVED FROM NAV — lives in Dashboard now */}
    </nav>
  );
}
