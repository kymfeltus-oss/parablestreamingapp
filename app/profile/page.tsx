"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabaseClient";
import {
  Camera,
  Radio,
  Image as ImageIcon,
  Video,
  User,
} from "lucide-react";

type Profile = {
  display_name?: string | null;
  ministry_name?: string | null;
  creator_category?: string | null;
  bio?: string | null;
  avatar_url?: string | null;
};

export default function ProfilePage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeTab, setActiveTab] = useState<"posts" | "videos" | "live" | "about">("posts");

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;
      if (!user) return;

      const { data: p } = await supabase
        .from("profiles")
        .select("display_name,ministry_name,creator_category,bio,avatar_url")
        .eq("id", user.id)
        .maybeSingle();

      setProfile((p as Profile) || null);
    }

    load();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-black text-white pb-16">
      <div className="max-w-5xl mx-auto px-6 pt-10">

        {/* PROFILE HEADER */}
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <div className="relative">
            <div className="w-28 h-28 rounded-full border border-white/15 overflow-hidden bg-black flex items-center justify-center">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-10 h-10 text-gray-500" />
              )}
            </div>

            <button className="absolute bottom-0 right-0 bg-[#111] border border-white/20 rounded-full p-2 hover:neon-border transition">
              <Camera className="w-4 h-4 neon-text" />
            </button>
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-extrabold neon-text">
              {profile?.display_name || "Your Name"}
            </h1>

            <p className="text-sm text-gray-400 mt-1">
              {profile?.ministry_name} • {profile?.creator_category}
            </p>

            <p className="text-xs text-gray-400 mt-3 max-w-xl">
              {profile?.bio || "Tell your story, mission, or testimony here."}
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/creator/dashboard"
                className="neon-button text-sm"
              >
                Creator Dashboard
              </Link>

              <Link
                href="/creator/go-live"
                className="px-5 py-3 rounded-lg bg-black border border-white/15 text-sm hover:border-white/30 transition inline-flex items-center gap-2"
              >
                <Radio className="w-4 h-4" />
                Go Live
              </Link>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="mt-10 border-b border-white/10 flex gap-6 text-sm">
          <Tab label="Posts" active={activeTab === "posts"} onClick={() => setActiveTab("posts")} />
          <Tab label="Videos" active={activeTab === "videos"} onClick={() => setActiveTab("videos")} />
          <Tab label="Live" active={activeTab === "live"} onClick={() => setActiveTab("live")} />
          <Tab label="About" active={activeTab === "about"} onClick={() => setActiveTab("about")} />
        </div>

        {/* TAB CONTENT */}
        <div className="mt-8">

          {/* POSTS */}
          {activeTab === "posts" && (
            <div className="space-y-4">
              <CreatePostCard />
              <EmptyState text="No posts yet. Share your first message." />
            </div>
          )}

          {/* VIDEOS */}
          {activeTab === "videos" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <EmptyState text="No videos uploaded yet." />
            </div>
          )}

          {/* LIVE */}
          {activeTab === "live" && (
            <div className="bg-[#111] border border-white/10 rounded-xl p-6">
              <p className="text-sm text-gray-400">
                You are not live right now.
              </p>
              <Link
                href="/creator/go-live"
                className="neon-button mt-4 inline-flex items-center gap-2 text-sm"
              >
                <Radio className="w-4 h-4" />
                Start a Live Stream
              </Link>
            </div>
          )}

          {/* ABOUT */}
          {activeTab === "about" && (
            <div className="bg-[#111] border border-white/10 rounded-xl p-6 text-sm text-gray-400">
              <p>
                {profile?.bio || "Add more information about your ministry and mission."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

function Tab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`pb-3 ${
        active
          ? "border-b-2 border-[#53fc18] neon-text"
          : "text-gray-400 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

function CreatePostCard() {
  return (
    <div className="bg-[#111] border border-white/10 rounded-xl p-4">
      <p className="text-sm text-gray-400 mb-3">
        Share something with your community…
      </p>
      <div className="flex gap-3">
        <ActionButton icon={<ImageIcon className="w-4 h-4" />} label="Photo" />
        <ActionButton icon={<Video className="w-4 h-4" />} label="Video" />
        <ActionButton icon={<Radio className="w-4 h-4" />} label="Go Live" />
      </div>
    </div>
  );
}

function ActionButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black border border-white/15 text-xs hover:border-white/30 transition">
      {icon}
      {label}
    </button>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="bg-[#111] border border-white/10 rounded-xl p-6 text-center text-sm text-gray-400">
      {text}
    </div>
  );
}
