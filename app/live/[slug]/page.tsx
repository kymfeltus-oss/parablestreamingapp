"use client";

import { useEffect, useState } from "react";

export default function ViewerLivePage({ params }: any) {
  const { slug } = params;

  const [stream, setStream] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStream();
  }, []);

  async function fetchStream() {
    try {
      const res = await fetch(
        `https://api.parablestreaming.com/api/stream/by-slug?slug=${slug}`,
        { cache: "no-store" }
      );

      const json = await res.json();
      if (!json.ok) throw new Error(json.error);

      setStream(json.stream);
    } catch (err: any) {
      setError(err.message);
    }
  }

  if (error)
    return (
      <div className="min-h-screen bg-black text-white p-10 text-center">
        Stream not found
      </div>
    );

  if (!stream)
    return (
      <div className="min-h-screen bg-black text-white p-10 text-center">
        Loading…
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{stream.title}</h1>

      <div className="text-gray-400 mb-4">{stream.category}</div>

      {stream.is_live ? (
        <div className="text-red-500 font-bold mb-4">● LIVE Now</div>
      ) : (
        <div className="text-gray-400 mb-4">This stream is offline</div>
      )}

      {/* Placeholder player */}
      <div className="w-full h-64 bg-[#111] border border-white/20 rounded flex items-center justify-center text-gray-400 mb-6">
        Video Player Coming Soon
      </div>

      {stream.thumbnail_url && (
        <img
          src={stream.thumbnail_url}
          className="w-full rounded border border-white/20 mb-6"
        />
      )}

      <div className="text-gray-300 text-sm">
        Started: {stream.started_at || "Unknown"}
      </div>
    </div>
  );
}
