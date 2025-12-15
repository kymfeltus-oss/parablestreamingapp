"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import {
  User,
  Radio,
  Users,
} from "lucide-react";

type Profile = {
  display_name?: string | null;
  ministry_name?: string | null;
  creator_category?: string | null;
  bio?: string | null;
  avatar_url?: string | null;
};

export default function PublicProfilePage() {
  const { username } = useParams();
  const supabase = createClient();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeTab, setActiveTab] =
    useState<"posts" | "videos" | "live" | "about">("posts");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!username) return;

      const { data } = await supabase
        .from("profiles")
        .select("display_name,ministry_name,creator_category,bio,avatar_url")
        .eq("username", username)
        .maybeSingle();

      setProfile((data as Profile) || null);
      setLoading(false);
    }

    load();
  }, [username, supabase]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-gray-400 flex items-center justify-center">
        Loading profile…
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-black text-gray-400 flex items-center justify-center">
        Profile not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-16">
      <div className="max-w-5xl mx-auto px-6 pt-10">

        {/* PROFILE HEADER */}
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <div className="w-28 h-28 rounded-full border border-white/15 overflow-hidden bg-black flex items-center justify-center">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-10 h-10 text-gray-500" />
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-extrabold neon-text">
              {profile.display_name}
            </h1>

            <p className="text-sm text-gray-400 mt-1">
              {profile.ministry_name} • {profile.creator_category}
            </p>

            <p className="text-xs text-gray-400 mt-3 max-w-xl">
              {profile.bio}
            </p>

            <div className="mt-4 flex gap-3">
              <button className="neon-button text-sm">
                Follow
              </button>

              <button className="px-5 py-3 rounded-lg bg-black border border-white/15 text-sm hover:border-white/30 transition inline-flex items-center gap-2">
                <Radio className="w-4 h-4" />
                Watch Live
              </button>
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

          {activeTab === "posts" && (
            <EmptyState text="No posts yet." />
          )}

          {activeTab === "videos" && (
            <EmptyState text="No videos uploaded yet." />
          )}

          {activeTab === "live" && (
            <div className="bg-[#111] border border-white/10 rounded-xl p-6">
              <p className="text-sm text-gray-400">
                {profile.display_name} is not live right now.
              </p>
            </div>
          )}

          {activeTab === "about" && (
            <div className="bg-[#111] border border-white/10 rounded-xl p-6 text-sm text-gray-400">
              {profile.bio}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Tab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
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

function EmptyState({ text }: { text: string }) {
  return (
    <div className="bg-[#111] border border-white/10 rounded-xl p-6 text-center text-sm text-gray-400">
      {text}
    </div>
  );
}
