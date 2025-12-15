"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import {
  Radio,
  Users,
  Image as ImageIcon,
  Video,
  X,
} from "lucide-react";

type Profile = {
  id: string;
  display_name?: string | null;
  creator_category?: string | null;
  avatar_url?: string | null;
};

export default function HomePage() {
  const supabase = createClient();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [composerOpen, setComposerOpen] = useState(false);

  // Composer UI state
  const [postText, setPostText] = useState("");
  const [mode, setMode] = useState<"text" | "photo" | "video" | "live">("text");

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;
      if (!user) return;

      const { data: p } = await supabase
        .from("profiles")
        .select("id,display_name,creator_category,avatar_url")
        .eq("id", user.id)
        .maybeSingle();

      setProfile((p as Profile) || null);
    }

    load();
  }, [supabase]);

  const isCreator = !!profile?.creator_category;

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="max-w-7xl mx-auto px-6 pt-8 space-y-12">

        {/* LIVE NOW */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-extrabold neon-text">🔴 Live Now</h2>
            {isCreator && (
              <Link
                href="/creator/dashboard"
                className="text-xs neon-text hover:underline"
              >
                Creator Dashboard
              </Link>
            )}
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="min-w-[260px] bg-[#111] border border-white/10 rounded-xl p-4 hover:neon-border transition"
              >
                <div className="text-xs text-gray-400 mb-2">Ministry Live</div>
                <div className="text-sm font-bold mb-1">
                  Faith & Encouragement Night
                </div>
                <div className="text-[11px] text-gray-500">124 watching</div>
              </div>
            ))}
          </div>
        </section>

        {/* CREATE POST ENTRY */}
        <section>
          <div
            onClick={() => setComposerOpen(true)}
            className="bg-[#111] border border-white/10 rounded-xl p-4 cursor-pointer hover:border-white/20 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black border border-white/20 flex items-center justify-center overflow-hidden">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} className="w-full h-full object-cover" />
                ) : (
                  <Users className="w-5 h-5 text-gray-500" />
                )}
              </div>
              <p className="text-sm text-gray-400">What’s on your heart?</p>
            </div>
          </div>
        </section>

        {/* FEED */}
        <section>
          <h2 className="text-lg font-extrabold mb-4">Community</h2>

          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-[#111] border border-white/10 rounded-xl p-5"
              >
                <p className="text-sm text-gray-300">
                  Encouragement for today: Stay rooted, stay faithful, and trust
                  the process.
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* POST COMPOSER v2 */}
      {composerOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-xl bg-[#0b0b0b] border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(83,252,24,0.25)]">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h2 className="text-lg font-extrabold neon-text">Create Post</h2>
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
                className="w-full bg-black border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 min-h-[140px] focus:outline-none focus:border-[#53fc18]"
              />
            </div>

            {/* Action Bar */}
            <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex gap-4 text-sm">
                <button
                  onClick={() => setMode("photo")}
                  className={`flex items-center gap-2 ${mode === "photo" ? "neon-text" : "text-gray-400"}`}
                >
                  <ImageIcon className="w-4 h-4" />
                  Photo
                </button>

                <button
                  onClick={() => setMode("video")}
                  className={`flex items-center gap-2 ${mode === "video" ? "neon-text" : "text-gray-400"}`}
                >
                  <Video className="w-4 h-4" />
                  Video
                </button>

                <button
                  onClick={() => setMode("live")}
                  className={`flex items-center gap-2 ${mode === "live" ? "neon-text" : "text-gray-400"}`}
                >
                  <Radio className="w-4 h-4" />
                  Go Live
                </button>
              </div>

              <button
                onClick={() => {
                  setComposerOpen(false);
                  setPostText("");
                  setMode("text");
                }}
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
