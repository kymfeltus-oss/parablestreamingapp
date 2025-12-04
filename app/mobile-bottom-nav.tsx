"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Film,
  Music2,
  Radio,
  Coins,
  User,
  PlusCircle,
} from "lucide-react";

export default function ClientBottomNav() {
  const pathname = usePathname();

  const isActive = (route: string) =>
    pathname === route ? "text-[#53fc18]" : "text-gray-500";

  const isActiveGlow = (route: string) =>
    pathname === route ? "shadow-[0_0_12px_#53fc18]" : "";

  return (
    <nav className="
      fixed bottom-0 left-0 w-full 
      bg-black/80 backdrop-blur-xl 
      border-t border-white/10 
      py-2 flex justify-around items-center 
      z-50
    ">
      {/* HOME */}
      <Link href="/feed" className="flex flex-col items-center text-xs">
        <Home className={`w-6 h-6 mb-1 transition-all ${isActive("/feed")} ${isActiveGlow("/feed")}`} />
        <span className={`transition-all ${isActive("/feed")}`}>Home</span>
      </Link>

      {/* DRAMAS */}
      <Link href="/dramas" className="flex flex-col items-center text-xs">
        <Film className={`w-6 h-6 mb-1 transition-all ${isActive("/dramas")} ${isActiveGlow("/dramas")}`} />
        <span className={`transition-all ${isActive("/dramas")}`}>Dramas</span>
      </Link>

      {/* CENTER CREATE BUTTON */}
      <Link
        href="/creator/dramas/new"
        className="
          absolute -top-5 
          bg-[#53fc18]
          rounded-full 
          p-4 
          shadow-[0_0_15px_#53fc18] 
          hover:scale-110 
          transition-all
        "
      >
        <PlusCircle className="w-7 h-7 text-black" />
      </Link>

      {/* MUSIC */}
      <Link href="/music" className="flex flex-col items-center text-xs">
        <Music2 className={`w-6 h-6 mb-1 transition-all ${isActive("/music")} ${isActiveGlow("/music")}`} />
        <span className={`transition-all ${isActive("/music")}`}>Music</span>
      </Link>

      {/* STREAM */}
      <Link href="/stream" className="flex flex-col items-center text-xs">
        <Radio className={`w-6 h-6 mb-1 transition-all ${isActive("/stream")} ${isActiveGlow("/stream")}`} />
        <span className={`transition-all ${isActive("/stream")}`}>Stream</span>
      </Link>

      {/* SEEDS */}
      <Link href="/monetization" className="flex flex-col items-center text-xs">
        <Coins className={`w-6 h-6 mb-1 transition-all ${isActive("/monetization")} ${isActiveGlow("/monetization")}`} />
        <span className={`transition-all ${isActive("/monetization")}`}>Seeds</span>
      </Link>

      {/* PROFILE */}
      <Link href="/profile" className="flex flex-col items-center text-xs">
        <User className={`w-6 h-6 mb-1 transition-all ${isActive("/profile")} ${isActiveGlow("/profile")}`} />
        <span className={`transition-all ${isActive("/profile")}`}>Profile</span>
      </Link>
    </nav>
  );
}
