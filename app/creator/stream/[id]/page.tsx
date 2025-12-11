"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

type Stream = {
  id: string;
  title: string;
  category: string | null;
  thumbnail_url: string | null;
  is_live: boolean;
  viewer_count: number;
  slug: string | null;
};

export default function CreatorStreamManager({ params }: any) {
  const router = useRouter();
  const supabase = createClient();

  const stream_id = params.id;

  const [stream, setStream] = useState<Stream | null>(null);
  const [loading, setLoading] = useState(true);
  const [ending, setEnding] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadStream();
  }, []);

  async function loadStream() {
    try {
      const { data, error } = await supabase
        .from("live_streams")
        .select("*")
        .eq("id", stream_id)
        .maybeSingle();

      if (error) throw error;
      setStream(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleEndStream() {
    try {
      setEnding(true);

      const res = await fetch("/api/stream/stop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ streamId: stream_id }),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Failed to end stream");
      }

      router.replace("/creator/dashboard");
    } catch (err: any) {
      setError(err.message);
      setEnding(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading your stream...
      </div>
    );
  }

  if (!stream) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Stream not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Stream Manager</h1>

      {error && (
        <div className="bg-red-900 border border-red-700 p-3 mb-6 rounded text-red-200 text-sm">
          {error}
        </div>
      )}

      <div className="bg-[#111] p-6 rounded-xl border border-white/10 shadow-lg max-w-4xl">
        <h2 className="text-xl font-bold mb-3">
          {stream.title} {stream.is_live && <span className="text-red-500">• LIVE</span>}
        </h2>

        <p className="text-gray-400 text-sm mb-4">
          Category: {stream.category || "None"}
        </p>

        {stream.thumbnail_url && (
          <img
            src={stream.thumbnail_url}
            className="w-full max-w-sm rounded-lg border border-white/10 mb-6"
          />
        )}

        <p className="text-gray-300 text-sm mb-6">
          Viewers: {stream.viewer_count}
        </p>

        <button
          onClick={handleEndStream}
          disabled={ending}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 font-bold rounded-lg shadow-md disabled:opacity-50"
        >
          {ending ? "Ending stream..." : "End Stream"}
        </button>
      </div>
    </div>
  );
}
