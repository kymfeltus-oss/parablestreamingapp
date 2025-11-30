"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },

    // 🔴 LIVE FIRST
    { href: "/stream", label: "🔴 Live" },

    // 🎵 MUSIC MOVED RIGHT AFTER LIVE
    { href: "/music", label: "Music" },

    { href: "/feed", label: "Feed" },
    { href: "/discover", label: "Discover" },
    { href: "/library", label: "Library" },
    { href: "/dashboard", label: "Creator Hub" },
    { href: "/support", label: "Support" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur-xl text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg 
            bg-gradient-to-br from-blue-600 to-red-600 
            text-xs font-bold text-white 
            shadow-[0_0_18px_rgba(0,128,255,0.4)] 
            group-hover:shadow-[0_0_25px_rgba(255,50,80,0.6)]
            transition">
            <Sparkles className="w-4 h-4" />
          </span>

          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-wide sm:text-base">
              PARABLE
            </span>
            <span className="text-[9px] text-gray-400 tracking-widest uppercase">
              Stream. Game. Grow in Christ.
            </span>
          </div>
        </Link>

        {/* NAV LINKS */}
        <nav className="hidden lg:flex items-center gap-6 text-sm text-gray-300">
          {links.map((link) => {
            const active = pathname === link.href;
            const isLive = link.label.includes("🔴");

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  transition hover:text-white uppercase text-xs font-bold tracking-wide 
                  ${active ? "text-blue-400 border-b-2 border-blue-500 pb-0.5" : ""} 
                  ${isLive ? "text-red-500 animate-pulse" : ""}
                `}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* PROFILE ICON */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="hidden sm:block">
            <div
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-red-500 
              border border-white/20 shadow-lg cursor-pointer 
              hover:scale-110 transition flex items-center justify-center 
              font-bold text-xs"
            >
              J
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
