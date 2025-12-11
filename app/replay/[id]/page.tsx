
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";

type Stream = {
  id: string;
  title: string;
  category: string | null;
  thumbnail_url: string | null;
  replay_url: string | null;
  creator_id: string;
  slug: string;
  started_at: string | null;
  ended_at: string | null;
};

export default function ReplayPage({ params }: any) {
  const supabase = createClient();
  const { id } = params;

  const [stream, setStream] = useState<Stream | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReplay();
  }, []);

  async function loadReplay() {
    const { data, error } = await supabase
      .from("live_streams")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (!error) setStream(data);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading replay...
      </div>
    );
  }

  if (!stream || !stream.replay_url) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Replay Not Available</h1>
          <p className="text-gray-400 mt-2">This stream does not have a replay yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">{stream.title}</h1>

      <div className="flex items-center gap-3 text-gray-300 mb-6">
        <span className="text-gray-400">
          Aired on: {stream.started_at ? new Date(stream.started_at).toLocaleString() : "Unknown"}
        </span>

        {stream.category && (
          <span className="px-2 py-1 bg-[#111] border border-[#53fc18]/40 text-xs rounded">
            {stream.category}
          </span>
        )}
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl p-4 mb-6 max-w-3xl">
        <video
          src={stream.replay_url}
          controls
          className="w-full h-80 bg-black border border-white/20 rounded"
        />
      </div>

      <div className="max-w-3xl mt-4">
        <h2 className="text-xl font-semibold mb-2">About this replay</h2>
        <p className="text-gray-400">
          This is a replay of a past livestream on Parable. More features including timestamps,
          comments, chapters, and HLS streaming will be added soon.
        </p>
      </div>
    </div>
  );
}
