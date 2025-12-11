"use client";

import { useEffect, useState } from "react";

export default function StreamManagerPage({ params }: any) {
  const { id } = params;

  const [stream, setStream] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadStream();
  }, []);

  async function loadStream() {
    try {
      const res = await fetch(
        `https://api.parablestreaming.com/api/stream/get?id=${id}`
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
      <div className="p-6 text-red-400 text-xl">
        Stream not found: {error}
      </div>
    );

  if (!stream)
    return <div className="p-6 text-gray-300">Loading stream...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">{stream.title}</h1>
      <p className="text-gray-400 mb-4">{stream.category}</p>

      <img
        src={stream.thumbnail_url}
        className="w-full max-w-md rounded border border-white/20"
      />
    </div>
  );
}
