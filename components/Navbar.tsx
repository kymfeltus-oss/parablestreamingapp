"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  Music2,
  Users,
  User,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const tabs = [
    {
      href: "/feed",
      label: "Home",
      icon: <Home className="w-5 h-5" />,
    },
    {
      href: "/discover",
      label: "Discover",
      icon: <Compass className="w-5 h-5" />,
    },
    {
      href: "/music",
      label: "Music",
      icon: <Music2 className="w-5 h-5" />,
    },
    {
      href: "/social",
      label: "Social",
      icon: <Users className="w-5 h-5" />,
    },
    {
      href: "/profile",
      label: "Profile",
      icon: <User className="w-5 h-5" />,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 h-20 flex items-center justify-around z-50">
      {tabs.map((tab) => {
        const active = pathname === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex flex-col items-center justify-center gap-1 w-full"
          >
            <div
              className={`${
                active ? "text-[#53fc18]" : "text-gray-400"
              } transition`}
            >
              {tab.icon}
            </div>

            <span
              className={`text-[11px] ${
                active ? "text-[#53fc18] font-bold" : "text-gray-400"
              }`}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
