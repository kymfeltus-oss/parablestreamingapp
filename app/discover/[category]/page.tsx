"use client";

import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { creators } from "@/lib/preachers";
import { artists } from "@/lib/artists";
import { ArrowLeft, Users } from "lucide-react";

export default function DiscoverCategoryPage() {
  const { category } = useParams();

  // Normalize category slug
  const categorySlug = String(category || "")
    .toLowerCase()
    .replace(/\s+/g, "-");

  // Merge creators + artists
  const allContent = [...creators, ...artists];

  // Helper normalizer
  const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

  // Filtering
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

  // Display Title
  const categoryTitle = categorySlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* Back */}
        <Link
          href="/discover"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Discover
        </Link>

        {/* Title */}
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-10">
          {categoryTitle}
        </h1>

        {/* Category Grid */}
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
                <div className="relative aspect-video rounded-xl overflow-hidden bg-[#111] mb-3 ring-2 ring-transparent group-hover:ring-violet-500 transition">
                  <img
                    src={item.bannerUrl}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />

                  {item.liveStream?.isLive && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] uppercase px-2 py-0.5 rounded font-black">
                      LIVE
                    </div>
                  )}

                  <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] flex items-center gap-1 font-bold">
                    <Users className="w-3 h-3 text-violet-400" />
                    {item.liveStream?.viewers?.toLocaleString() ||
                      "Offline"}
                  </div>
                </div>

                <div className="flex gap-3">
                  <img
                    src={item.avatarUrl}
                    className="w-10 h-10 rounded-full object-cover bg-[#222]"
                  />

                  <div>
                    <h3 className="font-bold text-[15px] leading-tight group-hover:text-violet-400 transition">
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
