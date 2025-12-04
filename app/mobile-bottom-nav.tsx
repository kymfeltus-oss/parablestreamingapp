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
} from "lucide-react";

export default function ClientBottomNav() {
  const pathname = usePathname();

  const isActive = (route: string) =>
    pathname === route ? "text-[#53fc18]" : "text-gray-400";

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-black border-t border-white/10 py-2 flex justify-around z-50">
      
      {/* HOME */}
      <Link
        href="/feed"
        className="flex flex-col items-center text-xs"
      >
        <Home className={`w-6 h-6 mb-1 ${isActive("/feed")}`} />
        <span className={isActive("/feed")}>Home</span>
      </Link>

      {/* DRAMAS (NEW) */}
      <Link
        href="/dramas"
        className="flex flex-col items-center text-xs"
      >
        <Film className={`w-6 h-6 mb-1 ${isActive("/dramas")}`} />
        <span className={isActive("/dramas")}>Dramas</span>
      </Link>

      {/* MUSIC */}
      <Link
        href="/music"
        className="flex flex-col items-center text-xs"
      >
        <Music2 className={`w-6 h-6 mb-1 ${isActive("/music")}`} />
        <span className={isActive("/music")}>Music</span>
      </Link>

      {/* STREAM */}
      <Link
        href="/stream"
        className="flex flex-col items-center text-xs"
      >
        <Radio className={`w-6 h-6 mb-1 ${isActive("/stream")}`} />
        <span className={isActive("/stream")}>Stream</span>
      </Link>

      {/* SEEDS / MONETIZATION */}
      <Link
        href="/monetization"
        className="flex flex-col items-center text-xs"
      >
        <Coins className={`w-6 h-6 mb-1 ${isActive("/monetization")}`} />
        <span className={isActive("/monetization")}>Seeds</span>
      </Link>

      {/* PROFILE */}
      <Link
        href="/profile"
        className="flex flex-col items-center text-xs"
      >
        <User className={`w-6 h-6 mb-1 ${isActive("/profile")}`} />
        <span className={isActive("/profile")}>Profile</span>
      </Link>

    </nav>
  );
}
