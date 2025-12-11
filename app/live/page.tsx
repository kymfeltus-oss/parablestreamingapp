"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import Link from "next/link";

type Stream = {
  id: string;
  title: string;
  thumbnail_url: string | null;
  slug: string | null;
  viewer_count: number;
  creator_id: string;
};

export default function LiveFeedPage() {
  const supabase = createClient();
  const [streams, setStreams] = useState<Stream[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  async function load() {
    const { data, error } = await supabase
      .from("live_streams")
      .select("*")
      .eq("is_live", true)
      .order("viewer_count", { ascending: false });

    if (!error) setStreams((data as Stream[]) || []);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading live streams...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Live Now</h1>

      {streams.length === 0 && (
        <p className="text-gray-400">No streams are live right now.</p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {streams.map((s) => (
          <Link
            key={s.id}
            href={`/live/${s.slug || s.id}`}
            className="bg-[#111] border border-white/10 rounded-xl overflow-hidden"
          >
            <div className="relative h-40">
              <img
                src={s.thumbnail_url || "/placeholder.jpg"}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 bg-red-600 text-xs px-2 py-1 rounded font-bold">
                LIVE
              </span>
              <span className="absolute bottom-2 right-2 bg-black/70 text-xs px-2 py-1 rounded">
                {s.viewer_count} watching
              </span>
            </div>
            <div className="p-3">
              <p className="font-bold text-sm">{s.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
