"use client";

import Link from "next/link";
import { Home, Compass, Video, Library, User } from "lucide-react";
import { usePathname } from "next/navigation";

export default function ClientBottomNav() {
  const pathname = usePathname();

  const item = (href: string, label: string, Icon: any) => (
    <Link href={href} className="flex flex-col items-center text-xs">
      <Icon
        className={`w-6 h-6 ${
          pathname === href || pathname.startsWith(href)
            ? "text-white"
            : "text-gray-400"
        }`}
      />
      <span
        className={
          pathname === href || pathname.startsWith(href)
            ? "text-white"
            : "text-gray-400"
        }
      >
        {label}
      </span>
    </Link>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#111] border-t border-white/10 px-4 py-2 flex justify-between items-center lg:hidden z-50">
      {item("/feed", "Home", Home)}
      {item("/discover", "Browse", Compass)}
      {item("/stream", "Stream", Video)}
      {item("/library", "Library", Library)}
      {item("/profile", "Profile", User)}
    </div>
  );
}
