"use client";

import { X, Image as ImageIcon, Video, Radio } from "lucide-react";

export default function PostComposer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#111] border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(83,252,24,0.25)] p-6 relative">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-extrabold neon-text">
            Create Post
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Text input */}
        <textarea
          placeholder="What’s on your heart?"
          className="w-full bg-black border border-white/15 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 min-h-[120px] focus:outline-none focus:border-[#53fc18]"
        />

        {/* Actions */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-3">
            <Action icon={<ImageIcon className="w-4 h-4" />} label="Photo" />
            <Action icon={<Video className="w-4 h-4" />} label="Video" />
            <Action icon={<Radio className="w-4 h-4" />} label="Go Live" />
          </div>

          <button className="neon-button text-sm">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

function Action({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black border border-white/15 text-xs hover:border-white/30 transition">
      {icon}
      {label}
    </button>
  );
}
