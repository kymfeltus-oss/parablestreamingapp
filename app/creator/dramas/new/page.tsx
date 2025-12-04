"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function CreatorMicrodramaUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [seriesTitle, setSeriesTitle] = useState("");
  const [episodeNumber, setEpisodeNumber] = useState<number | "">("");
  const [scriptureRef, setScriptureRef] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    if (!file) {
      setStatus("Please select a video file.");
      return;
    }

    try {
      setIsUploading(true);
      setStatus("Requesting upload URL from Cloudflare…");

      // 1) Get direct upload URL + videoId from our API
      const res = await fetch("/api/microdramas/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus("Failed to get upload URL.");
        setIsUploading(false);
        return;
      }

      const { uploadURL, videoId } = data;
      setVideoId(videoId);

      setStatus("Uploading video to Cloudflare Stream…");

      // 2) Upload bytes directly to Cloudflare
      const uploadRes = await fetch(uploadURL, {
        method: "PUT",
        body: file,
      });

      if (!uploadRes.ok) {
        setStatus("Upload to Cloudflare failed.");
        setIsUploading(false);
        return;
      }

      // At this point the video is stored in Cloudflare Stream.
      // Later we will save metadata (title, series, etc.) into a DB.
      setStatus("Upload complete! Your video is now on Cloudflare Stream.");
      setIsUploading(false);
    } catch (err) {
      console.error(err);
      setStatus("Unexpected error during upload.");
      setIsUploading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-10 pb-24">
        <h1 className="text-3xl font-extrabold mb-2">Upload Microdrama Episode</h1>
        <p className="text-sm text-gray-400 mb-8">
          Upload a vertical (9:16) video for a microdrama series. We’ll send it
          to Cloudflare Stream and return a video ID you can use in your series
          later.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* VIDEO FILE */}
          <div>
            <label className="block text-xs uppercase tracking-wide text-gray-400 mb-2">
              Episode Video (Vertical 9:16)
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-sm text-gray-200 bg-black border border-white/20 rounded-lg px-3 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[#53fc18] file:text-black"
            />
            <p className="text-[11px] text-gray-500 mt-1">
              Recommended: under 5 minutes, vertical format, under 500MB.
            </p>
          </div>

          {/* TITLE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wide text-gray-400 mb-2">
                Episode Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                placeholder="He missed church… for a game."
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wide text-gray-400 mb-2">
                Series Title
              </label>
              <input
                type="text"
                value={seriesTitle}
                onChange={(e) => setSeriesTitle(e.target.value)}
                className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                placeholder="Gaming Addiction Parable"
              />
            </div>
          </div>

          {/* EPISODE NUMBER + SCRIPTURE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wide text-gray-400 mb-2">
                Episode #
              </label>
              <input
                type="number"
                min={1}
                value={episodeNumber}
                onChange={(e) =>
                  setEpisodeNumber(e.target.value === "" ? "" : Number(e.target.value))
                }
                className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                placeholder="1"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wide text-gray-400 mb-2">
                Scripture Reference
              </label>
              <input
                type="text"
                value={scriptureRef}
                onChange={(e) => setScriptureRef(e.target.value)}
                className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                placeholder="John 3:16"
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-xs uppercase tracking-wide text-gray-400 mb-2">
              Short Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
              placeholder="A young gamer skips family dinner for a ranked match. Things go left quickly…"
            />
          </div>

          {/* TAGS */}
          <div>
            <label className="block text-xs uppercase tracking-wide text-gray-400 mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
              placeholder="microdrama, gaming, testimony"
            />
          </div>

          {/* SUBMIT */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={isUploading || !file}
              className="px-6 py-2.5 rounded-xl bg-[#53fc18] text-black text-sm font-bold disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isUploading ? "Uploading…" : "Upload Episode"}
            </button>

            {videoId && (
              <span className="text-[11px] text-gray-400">
                Cloudflare Video ID:{" "}
                <span className="text-[#53fc18] font-mono">{videoId}</span>
              </span>
            )}
          </div>

          {status && (
            <p className="text-[11px] text-gray-300 mt-2">
              {status}
            </p>
          )}
        </form>
      </main>
    </div>
  );
}
