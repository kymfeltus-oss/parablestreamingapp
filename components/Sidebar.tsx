"use client";

import Link from "next/link";
import { Users } from "lucide-react";

type SidebarProfile = {
  name: string;
  subtitle: string;
  avatar: string;
  slug: string;
  live?: boolean;
  viewers?: string;
  isArtist?: boolean;
};

type SidebarProps = {
  resolveProfileUrl?: (slug: string, isLive?: boolean) => string;
};

// CLEANED: Only 1 Stevenson profile remains
const yourSquad: SidebarProfile[] = [
  {
    name: "Pastor Mike Todd",
    subtitle: "Real Talk",
    avatar: "/mike-todd.jpg",
    slug: "mike-todd",
    live: true,
    viewers: "12.4k",
  },
  {
    name: "Bishop T.D. Jakes",
    subtitle: "Worship",
    avatar: "/td-jakes.jpg",
    slug: "td-jakes",
    live: true,
    viewers: "8.2k",
  },
  {
    name: "Pastor Stevenson",
    subtitle: "Leadership",
    avatar: "/steven-furtick.jpg", // Assuming this avatar path is correct for "Pastor Stevenson"
    slug: "pastor-stevenson", // The slug you want to keep
  },
];

const poppingOff: SidebarProfile[] = [
  {
    name: "Lauren Daigle",
    subtitle: "Christian Music",
    avatar: "/lauren-daigle.jpg",
    slug: "lauren-daigle",
    isArtist: true,
  },
  {
    name: "Kirk Franklin",
    subtitle: "Gospel",
    avatar: "/kirk_avatar.png",
    slug: "kirk-franklin",
    isArtist: true,
  },
];

export default function Sidebar({ resolveProfileUrl }: SidebarProps) {
  const getHref = (p: SidebarProfile) => {
    if (resolveProfileUrl) return resolveProfileUrl(p.slug, p.live);
    if (p.isArtist) return `/artist/${p.slug}`;
    return `/creator/${p.slug}`;
  };

  const RenderSection = ({
    title,
    profiles,
    hideTitle = false,
  }: {
    title: string;
    profiles: SidebarProfile[];
    hideTitle?: boolean;
  }) => (
    <section className="mb-6">
      {!hideTitle && (
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
          {title}
        </h3>
      )}

      <div className="space-y-2">
        {profiles.map((p) => (
          <Link
            key={`${title}-${p.slug}`}
            href={getHref(p)}
            className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-white/5 transition cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                <img
                  src={p.avatar}
                  className="w-8 h-8 rounded-full object-cover"
                />
                {p.live && (
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-red-500 border border-black rounded-full"></span>
                )}
              </div>

              <div>
                <p className="text-xs font-semibold group-hover:text-white">
                  {p.name}
                </p>
                <p className="text-[10px] text-gray-500">{p.subtitle}</p>
              </div>
            </div>

            {p.viewers && (
              <span className="text-[10px] text-gray-400 bg-white/10 px-2 py-0.5 rounded-full">
                {p.viewers}
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  );

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-black border-r border-white/10 px-4 py-6">

      {/* GLOBAL HEADER — KEEP THIS */}
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-4 h-4 text-white" />
        <p className="text-xs font-bold uppercase tracking-widest text-gray-300">
          Your Squad
        </p>
      </div>

      {/* FIRST SECTION — REMOVE TITLE */}
      <RenderSection title="Your Squad" profiles={yourSquad} hideTitle />

      {/* POPPING OFF — KEEP TITLE */}
      <RenderSection title="Popping Off" profiles={poppingOff} />

      <button className="mt-auto bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded-full py-2 px-4 shadow-lg shadow-violet-900/30">
        Go Live
      </button>
    </aside>
  );
}
