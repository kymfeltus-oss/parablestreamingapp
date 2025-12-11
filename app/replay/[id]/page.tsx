"use client";

import { useEffect, useState } from "react";

export default function ReplayPage({ params }: any) {
  const { id } = params;

  const [stream, setStream] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStream();
  }, []);

  async function fetchStream() {
    try {
      const res = await fetch(
        `https://api.parablestreaming.com/api/stream/get?id=${id}`,
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
      <div className="min-h-screen bg-black text-white p-10">
        Replay not found
      </div>
    );

  if (!stream)
    return (
      <div className="min-h-screen bg-black text-white p-10">
        Loading…
      </div>
    );

  if (!stream.replay_url)
    return (
      <div className="min-h-screen bg-black text-white p-10">
        Replay not yet available.
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-2">{stream.title}</h1>

      <div className="text-gray-400 mb-4">{stream.category}</div>

      <div className="mb-6">
        <video
          src={stream.replay_url}
          controls
          className="w-full rounded border border-white/20"
        />
      </div>

      <p className="text-gray-400 text-sm">
        Originally streamed on: {stream.started_at}
      </p>
    </div>
  );
}
