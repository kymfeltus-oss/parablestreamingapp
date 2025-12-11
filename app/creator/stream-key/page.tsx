"use client";

import { useState } from "react";

export default function StreamKeyPage() {
  const [key, setKey] = useState("");

  async function generate() {
    const res = await fetch("/api/stream-key", { method: "POST" });
    const json = await res.json();
    if (json.ok) setKey(json.streamKey);
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Your Stream Key</h1>

      <button
        onClick={generate}
        className="bg-[#53fc18] text-black px-4 py-2 rounded font-bold mb-4"
      >
        Generate New Stream Key
      </button>

      {key && (
        <div className="bg-[#111] border border-white/10 p-4 rounded text-sm">
          {key}
        </div>
      )}
    </div>
  );
}
