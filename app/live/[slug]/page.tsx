"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";

type Stream = {
  id: string;
  title: string;
  category: string | null;
  thumbnail_url: string | null;
  creator_id: string;
  slug: string;
  viewer_count: number;
  is_live: boolean;
};

export default function LiveWatchPage({ params }: any) {
  const supabase = createClient();
  const { slug } = params;

  const [stream, setStream] = useState<Stream | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStream();
    const interval = setInterval(() => loadStream(), 5000);
    return () => clearInterval(interval);
  }, []);

  async function loadStream() {
    const { data, error } = await supabase
      .from("live_streams")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (!error) setStream(data);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading stream...
      </div>
    );
  }

  if (!stream || !stream.is_live) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Stream Offline</h1>
          <p className="text-gray-400 mt-2">This stream is not currently live.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">{stream.title}</h1>

      <div className="flex items-center gap-3 text-gray-300 mb-6">
        <span className="text-red-500 font-bold">● LIVE</span>
        <span>{stream.viewer_count} watching</span>
        {stream.category && (
          <span className="px-2 py-1 bg-[#111] border border-[#53fc18]/40 text-xs rounded">
            {stream.category}
          </span>
        )}
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl p-4 mb-6 max-w-3xl">
        {/* Placeholder video player (we replace with Cloudflare Stream later) */}
        <div className="w-full h-64 bg-black border border-white/20 rounded flex items-center justify-center text-gray-500">
          Video Player Placeholder
        </div>
      </div>

      <div className="max-w-3xl mt-4">
        <h2 className="text-xl font-semibold mb-2">About this stream</h2>
        <p className="text-gray-400">
          Watch live content streamed by the creator. Real video playback will be added soon.
        </p>
      </div>
    </div>
  );
}
