"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Music, Video, DollarSign, User } from "lucide-react";

export default function ClientBottomNav() {
  const pathname = usePathname();

  const tab = (href: string, label: string, Icon: any) => (
    <Link href={href} className="flex flex-col items-center text-xs">
      <Icon
        className={`w-6 h-6 ${
          pathname === href || pathname.startsWith(href)
            ? "text-[#53fc18]"
            : "text-gray-400"
        }`}
      />
      <span
        className={`${
          pathname === href || pathname.startsWith(href)
            ? "text-[#53fc18]"
            : "text-gray-400"
        }`}
      >
        {label}
      </span>
    </Link>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#111] border-t border-white/10 px-4 py-2 flex justify-between items-center lg:hidden z-50">
      {tab("/feed", "Feed", Home)}
      {tab("/music", "Music", Music)}
      {tab("/stream", "Stream", Video)}
      {tab("/monetization", "Monetize", DollarSign)}
      {tab("/profile", "Profile", User)}
    </div>
  );
}
