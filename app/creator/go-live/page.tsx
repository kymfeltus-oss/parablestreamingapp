"use client";

import { useState } from "react";

export default function GoLivePage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGoLive() {
    setError("");
    setLoading(true);

    try {
      // Upload thumbnail if provided
      let thumbnailUrl = "";
      if (thumbnail) {
        const form = new FormData();
        form.append("file", thumbnail);

        const uploadRes = await fetch(
          "https://api.parablestreaming.com/api/upload-thumbnail",
          { method: "POST", body: form }
        );

        const uploadJson = await uploadRes.json();
        if (!uploadJson.ok) throw new Error("Thumbnail upload failed");
        thumbnailUrl = uploadJson.url;
      }

      // Create stream entry
      const res = await fetch(
        "https://api.parablestreaming.com/api/stream-live",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            category,
            thumbnailUrl,
          }),
        }
      );

      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Stream creation failed");

      // Redirect to Stream Manager
      window.location.href = `/creator/stream/${json.streamId}`;
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Go Live</h1>

      {error && (
        <div className="bg-red-900 text-red-200 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      <label className="block mb-2">Stream Title</label>
      <input
        className="w-full p-2 bg-[#111] border border-white/20 rounded mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label className="block mb-2">Category</label>
      <input
        className="w-full p-2 bg-[#111] border border-white/20 rounded mb-4"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <label className="block mb-2">Thumbnail</label>
      <input
        type="file"
        className="mb-4"
        onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
      />

      <button
        onClick={handleGoLive}
        disabled={loading}
        className="px-6 py-3 bg-[#53fc18] text-black font-bold rounded"
      >
        {loading ? "Starting..." : "Go Live"}
      </button>
    </div>
  );
}
