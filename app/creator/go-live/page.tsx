"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GoLivePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGoLive() {
    try {
      setLoading(true);
      setError("");

      // Upload thumbnail if provided
      let thumbnail_url = null;

      if (thumbnail) {
        const formData = new FormData();
        formData.append("file", thumbnail);

        const uploadRes = await fetch("/api/upload-thumbnail", {
          method: "POST",
          body: formData,
        });

        const uploadJson = await uploadRes.json();
        thumbnail_url = uploadJson.url;
      }

      // Call the live stream API
      const res = await fetch("/api/stream-live", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          thumbnail_url,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Failed to start stream");
        setLoading(false);
        return;
      }

      // Redirect to the Stream Manager page
      router.push(`/creator/stream/${json.stream_id}`);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Go Live</h1>

      {error && (
        <div className="bg-red-900 border border-red-600 text-red-200 px-4 py-2 mb-4 rounded">
          {error}
        </div>
      )}

      <div className="space-y-6 max-w-xl">
        <div>
          <label className="block mb-1 text-sm text-gray-300">Stream Title</label>
          <input
            className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2"
            placeholder="Sunday Worship | Live"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-300">Category</label>
          <input
            className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2"
            placeholder="Sermon, Worship, Music..."
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-300">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            className="w-full"
            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
          />
        </div>

        <button
          onClick={handleGoLive}
          disabled={loading}
          className="bg-[#53fc18] text-black px-6 py-3 rounded text-lg font-bold hover:brightness-110 shadow-[0_0_12px_#53fc18] disabled:opacity-50"
        >
          {loading ? "Starting..." : "Go Live"}
        </button>
      </div>
    </div>
  );
}
