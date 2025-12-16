"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import {
  Radio,
  Image as ImageIcon,
  Video,
  X,
  User,
} from "lucide-react";

type Profile = {
  display_name?: string | null;
  avatar_url?: string | null;
};

type Post = {
  id: number;
  author: string;
  avatar?: string | null;
  content: string;
  type: "text" | "photo" | "video" | "live";
  createdAt: string;
};

export default function HomePage() {
  const supabase = createClient();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [composerOpen, setComposerOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [mode, setMode] = useState<Post["type"]>("text");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;
      if (!user) return;

      const { data: p } = await supabase
        .from("profiles")
        .select("display_name,avatar_url")
        .eq("id", user.id)
        .maybeSingle();

      setProfile(p || null);
    }

    load();
  }, [supabase]);

  function handlePost() {
    if (!postText.trim() && mode === "text") return;

    const newPost: Post = {
      id: Date.now(),
      author: profile?.display_name || "Anonymous",
      avatar: profile?.avatar_url,
      content:
        mode === "live"
          ? "🔴 Just went live — join now!"
          : postText,
      type: mode,
      createdAt: "Just now",
    };

    setPosts((prev) => [newPost, ...prev]);
    setComposerOpen(false);
    setPostText("");
    setMode("text");
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <div className="max-w-2xl mx-auto px-4 pt-6 space-y-6">

        {/* CREATE POST ENTRY */}
        <div
          onClick={() => setComposerOpen(true)}
          className="bg-[#111] border border-white/10 rounded-xl p-4 cursor-pointer hover:border-white/20 transition"
        >
          <div className="flex items-center gap-3">
            <Avatar avatar={profile?.avatar_url} />
            <span className="text-gray-400">
              Share what God is doing in your life…
            </span>
          </div>
        </div>

        {/* FEED */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-[#111] border border-white/10 rounded-xl p-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <Avatar avatar={post.avatar} />
                <div>
                  <p className="text-sm font-semibold">
                    {post.author}
                  </p>
                  <p className="text-xs text-gray-500">
                    {post.createdAt}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-300">
                {post.content}
              </p>
            </div>
          ))}

          {posts.length === 0 && (
            <p className="text-center text-gray-500 text-sm">
              No posts yet. Be the first to share.
            </p>
          )}
        </div>
      </div>

      {/* COMPOSER MODAL */}
      {composerOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-xl bg-[#0b0b0b] border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(83,252,24,0.25)]">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h2 className="text-lg font-extrabold neon-text">
                Create Post
              </h2>
              <button onClick={() => setComposerOpen(false)}>
                <X className="w-5 h-5 text-gray-400 hover:text-white" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Share what God is doing in your life…"
                className="w-full bg-black border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 min-h-[140px]"
              />
            </div>

            {/* Actions */}
            <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex gap-4 text-sm">
                <ModeButton
                  label="Photo"
                  active={mode === "photo"}
                  onClick={() => setMode("photo")}
                  icon={<ImageIcon className="w-4 h-4" />}
                />
                <ModeButton
                  label="Video"
                  active={mode === "video"}
                  onClick={() => setMode("video")}
                  icon={<Video className="w-4 h-4" />}
                />
                <ModeButton
                  label="Go Live"
                  active={mode === "live"}
                  onClick={() => setMode("live")}
                  icon={<Radio className="w-4 h-4" />}
                />
              </div>

              <button
                onClick={handlePost}
                className="neon-button text-sm"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Components ---------- */

function Avatar({ avatar }: { avatar?: string | null }) {
  return (
    <div className="w-9 h-9 rounded-full bg-black border border-white/20 overflow-hidden flex items-center justify-center">
      {avatar ? (
        <img src={avatar} className="w-full h-full object-cover" />
      ) : (
        <User className="w-4 h-4 text-gray-500" />
      )}
    </div>
  );
}

function ModeButton({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 ${
        active ? "neon-text" : "text-gray-400"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
