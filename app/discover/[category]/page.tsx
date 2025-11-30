"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useParams } from "next/navigation";
import { creators } from "@/lib/preachers";
import { artists } from "@/lib/artists";

export default function DiscoverCategoryPage() {
  const { category } = useParams();
  const categorySlug = String(category).toLowerCase().replace(/\s+/g, "-");

  const allContent = [...creators, ...artists];

  const filtered = allContent.filter((item: any) => {
    // SAFE fix for Vercel build — no assumption that liveStream exists
    const itemCategory =
      item.liveStream?.category ||
      item.category ||
      item.genre ||
      "";

    const tags = item.tags || [];

    return (
      itemCategory &&
      itemCategory.toLowerCase().replace(/\s+/g, "-") === categorySlug
    ) || tags.some(
      (tag: string) =>
        tag.toLowerCase().replace(/\s+/g, "-") === categorySlug
    );
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-black mb-6 capitalize">
          {categorySlug.replace("-", " ")}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item: any, index: number) => (
            <Link
              href={
                item.slug
                  ? `/creator/${item.slug}`
                  : `/artist/${item.slug}`
              }
              key={index}
              className="bg-[#111] p-4 rounded-xl border border-white/10 hover:border-violet-500 transition"
            >
              <img
                src={item.avatarUrl || "/placeholder.jpg"}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />

              <h3 className="font-bold text-xl">{item.name}</h3>
              <p className="text-sm text-gray-400">{item.genre || item.ministry}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
