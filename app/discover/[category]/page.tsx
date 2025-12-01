"use client";

import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { creators } from "@/lib/preachers";
import { artists } from "@/lib/artists";
import { ArrowLeft, Users } from "lucide-react";

export default function DiscoverCategoryPage() {
  const { category } = useParams();
  const categorySlug = String(category || "").toLowerCase().replace(/\s+/g, "-");

  // Combine all content
  const allContent = [...creators, ...artists];

  // Define normalization helper
  const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

  // Filter by category or tags
  const filteredContent = categorySlug === "all"
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

  // Convert slug to readable title
  const categoryTitle = categorySlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
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
          <ArrowLeft className="w-5 h-5" />
          Back to Discover
        </Link>

        {/* Title */}
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-10">
          {categoryTitle}
        </h1>

        {/* Content Grid */}
        {filteredContent.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredContent.map((item: any, i: number) => (
              <Link
                key={i}
                href={item.ministry ? `/creator/${item.slug}` : `/artist/${item.slug}`}
                className="group"
              >
                {/* Card */}
                <div className="relative aspect-video bg-[#111] rounded-xl overflow-hidden mb-3 ring-2 ring-transparent group-hover:ring-violet-500 transition">
                  <img
                    src={item.bannerUrl}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />

                  {/* LIVE Badge */}
                  {item.liveStream?.isLive && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase">
                      LIVE
                    </div>
                  )}

                  {/* Viewer Count */}
                  <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
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
                    <h3 className="text-[15px] font-bold leading-tight group-hover:text-violet-400 transition">
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
