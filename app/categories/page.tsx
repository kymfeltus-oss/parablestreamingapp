"use client";

import Link from "next/link";

const CATS = [
  "Pastor or teacher",
  "Worship artist",
  "Gospel creator",
  "Christian gamer",
  "Podcaster",
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Creator Categories</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {CATS.map((c) => (
          <Link
            key={c}
            href={`/categories/${encodeURIComponent(c)}`}
            className="bg-[#111] border border-white/10 p-4 rounded-xl text-center font-bold"
          >
            {c}
          </Link>
        ))}
      </div>
    </div>
  );
}
