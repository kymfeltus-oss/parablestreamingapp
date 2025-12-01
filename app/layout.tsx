// app/layout.tsx
"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  Home,
  Compass,
  Video,
  Library,
  User,
} from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nexus Platform",
  description: "Faith-based content app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const BottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#111] border-t border-white/10 px-4 py-2 flex justify-between items-center lg:hidden">

      <Link href="/feed" className="flex flex-col items-center text-xs">
        <Home className={`w-6 h-6 ${pathname === "/feed" ? "text-white" : "text-gray-400"}`} />
        <span className={pathname === "/feed" ? "text-white" : "text-gray-400"}>Home</span>
      </Link>

      <Link href="/discover" className="flex flex-col items-center text-xs">
        <Compass className={`w-6 h-6 ${pathname?.startsWith("/discover") ? "text-white" : "text-gray-400"}`} />
        <span className={pathname?.startsWith("/discover") ? "text-white" : "text-gray-400"}>Discover</span>
      </Link>

      <Link href="/stream" className="flex flex-col items-center text-xs">
        <Video className={`w-6 h-6 ${pathname?.startsWith("/stream") ? "text-white" : "text-gray-400"}`} />
        <span className={pathname?.startsWith("/stream") ? "text-white" : "text-gray-400"}>Stream</span>
      </Link>

      <Link href="/library" className="flex flex-col items-center text-xs">
        <Library className={`w-6 h-6 ${pathname?.startsWith("/library") ? "text-white" : "text-gray-400"}`} />
        <span className={pathname?.startsWith("/library") ? "text-white" : "text-gray-400"}>Library</span>
      </Link>

      <Link href="/profile" className="flex flex-col items-center text-xs">
        <User className={`w-6 h-6 ${pathname?.startsWith("/profile") ? "text-white" : "text-gray-400"}`} />
        <span className={pathname?.startsWith("/profile") ? "text-white" : "text-gray-400"}>Profile</span>
      </Link>

    </div>
  );

  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <div className="min-h-screen pb-20">
          {children}
        </div>

        <BottomNav />
      </body>
    </html>
  );
}
