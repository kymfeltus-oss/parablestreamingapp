"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabaseClient";

type Stream = {
  id: string;
  title: string;
  thumbnail_url: string | null;
  slug: string | null;
  viewer_count: number;
};

export default function LiveNowStrip() {
  const supabase = createClient();
  const [streams, setStreams] = useState<Stream[]>([]);

  useEffect(() => {
    load();
    const interval = setInterval(load, 7000);
    return () => clearInterval(interval);
  }, []);

  async function load() {
    const { data } = await supabase
      .from("live_streams")
      .select("*")
      .eq("is_live", true)
      .order("viewer_count", { ascending: false })
      .limit(10);

    setStreams((data as Stream[]) || []);
  }

  if (!streams.length) return null;

  return (
    <div className="bg-[#111] border border-white/10 rounded-xl p-3 mb-6">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-gray-400">Live now on Parable</p>
        <Link href="/live" className="text-xs text-[#53fc18]">
          View all
        </Link>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {streams.map((s) => (
          <Link
            key={s.id}
            href={`/live/${s.slug || s.id}`}
            className="min-w-[160px] bg-black border border-white/10 rounded-lg overflow-hidden"
          >
            <div className="relative h-20">
              <img
                src={s.thumbnail_url || "/placeholder.jpg"}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-1 left-1 bg-red-600 text-[10px] px-2 py-0.5 rounded font-bold">
                LIVE
              </span>
              <span className="absolute bottom-1 right-1 bg-black/70 text-[10px] px-2 py-0.5 rounded">
                {s.viewer_count} watching
              </span>
            </div>
            <p className="px-2 py-1 text-[11px] line-clamp-2">{s.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
