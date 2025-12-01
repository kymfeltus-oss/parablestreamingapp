"use client";

import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { creators } from "@/lib/preachers";
import { artists } from "@/lib/artists";
import { ArrowLeft, Users } from "lucide-react";

export default function DiscoverCategoryPage() {
  const { category } = useParams();

  // normalize slug
  const categorySlug = String(category || "")
    .toLowerCase()
    .replace(/\s+/g, "-");

  // merge creators + artists
  const allContent = [...creators, ...artists];

  // text normalizer
  const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

  // filtering
  const filteredContent =
    categorySlug === "all"
      ? allContent
      : allContent.filter((item: any) => {
          const cat =
            item.liveStream?.category ||
            item.category ||
            item.genre ||
            "";
          const tags = item.tags || [];

          return (
            normalize(cat) === categorySlug ||
            tags.some((tag: string) => normalize(tag) === categorySlug)
          );
        });

  // readable UI title
  const categoryTitle = categorySlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* Back Button */}
        <Link
          href="/discover"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Discover
        </Link>

        {/* Title */}
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-10">
          {categoryTitle}
        </h1>

        {/* Grid of Creators / Artists */}
        {filteredContent.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredContent.map((item: any, i: number) => (
              <Link
                key={i}
                href={
                  item.ministry
                    ? `/creator/${item.slug}`
                    : `/artist/${item.slug}`
                }
                className="group"
              >
                <div className="relative aspect-video bg-[#111] rounded-xl overflow-hidden mb-3 ring-2 ring-transparent group-hover:ring-violet-500 transition">
                  {/* Banner */}
                  <img
                    src={item.bannerUrl}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />

                  {/* LIVE badge */}
                  {item.liveStream?.isLive && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] px-2 py-0.5 rounded uppercase font-black">
                      LIVE
                    </div>
                  )}

                  {/* Viewers */}
                  <div className="absolute bottom-2 left-2 bg-black/80 py-0.5 px-2 rounded text-[10px] font-bold flex items-center gap-1">
                    <Users className="w-3 h-3 text-violet-400" />
                    {item.liveStream?.viewers?.toLocaleString() || "Offline"}
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex gap-3">
                  <img
                    src={item.avatarUrl}
                    className="w-10 h-10 rounded-full object-cover bg-[#222]"
                  />
                  <div>
                    <h3 className="text-[15px] font-bold leading-tight transition group-hover:text-violet-400">
                      {item.liveStream?.title || item.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.ministry || item.genre}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center mt-20">
            No content found for this category yet.
          </p>
        )}
      </main>
    </div>
  );
}
