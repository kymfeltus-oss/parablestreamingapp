"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

/* ---------------- TYPES ---------------- */

type PostRow = {
  id: string;
  content?: string | null;
  display_name?: string | null;
  avatar_url?: string | null;
};

/* ---------------- PAGE ---------------- */

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  const [postsLoading, setPostsLoading] = useState(true);
  const [recentPosts, setRecentPosts] = useState<PostRow[]>([]);

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/auth/login");
        return;
      }

      setUser(user);

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(data);
      setLoading(false);
    };

    load();
  }, [router, supabase]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const { data } = await supabase
          .from("posts")
          .select("id, content, display_name, avatar_url")
          .order("created_at", { ascending: false })
          .limit(6);

        setRecentPosts((data || []) as PostRow[]);
      } catch {
        setRecentPosts([]);
      } finally {
        setPostsLoading(false);
      }
    };

    if (!loading) loadPosts();
  }, [loading, supabase]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading…
      </div>
    );
  }

  const accountType = user.user_metadata?.accountType || "viewer";
  const isCreator = accountType === "creator";
  const go = (path: string) => router.push(path);

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-6">
      <HeaderBar
        avatarUrl={profile?.avatar_url || "/avatar-placeholder.png"}
        displayName={profile?.display_name || "User"}
        accountType={accountType}
        onEditProfile={() => go("/profile-setup")}
      />

      <CommandStrip
        isCreator={isCreator}
        onFeed={() => go("/feed")}
        onGoLive={() => go("/dashboard/coming-soon/live")}
        onUpload={() => go("/dashboard/coming-soon/upload")}
        onApplyCreator={() => go("/creator/apply")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 space-y-5">
          <SpotlightCard
            title="Spotlight"
            headline="Your next move starts here"
            sub="Live, upload, engage, and grow your presence on Parable."
            primaryLabel={isCreator ? "Go Live" : "Explore Feed"}
            primaryPath={isCreator ? "/dashboard/coming-soon/live" : "/feed"}
            secondaryLabel="Upload"
            secondaryPath="/dashboard/coming-soon/upload"
            go={go}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatChip
              label="Seeds"
              value={profile?.seeds_balance || 0}
              onClick={() => go("/dashboard/coming-soon/seeds")}
            />
            <StatChip
              label="Followers"
              value={profile?.followers_count || 0}
              onClick={() => go("/dashboard/coming-soon/followers")}
            />
            <StatChip
              label="Following"
              value={profile?.following_count || 0}
              onClick={() => go("/dashboard/coming-soon/following")}
            />
            <StatChip
              label="Profile"
              value="Edit"
              onClick={() => go("/profile-setup")}
            />
          </div>

          <Panel title="Live Activity">
            {postsLoading ? (
              <div className="text-gray-400 text-sm">Loading activity…</div>
            ) : recentPosts.length === 0 ? (
              <div className="text-gray-400 text-sm">
                No activity available yet.
              </div>
            ) : (
              <div className="space-y-3">
                {recentPosts.map((p) => (
                  <ActivityRow
                    key={p.id}
                    avatarUrl={p.avatar_url || "/avatar-placeholder.png"}
                    name={p.display_name || "User"}
                    content={p.content || ""}
                    onClick={() => go("/feed")}
                  />
                ))}
              </div>
            )}
          </Panel>
        </div>

        <div className="lg:col-span-4 space-y-5">
          <Panel title="System Status">
            <StatusRow label="Auth" />
            <StatusRow label="Feed" />
            <StatusRow label="Upload" />
            <StatusRow label="Go Live" />
          </Panel>
        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function SpotlightCard({
  title,
  headline,
  sub,
  primaryLabel,
  primaryPath,
  secondaryLabel,
  secondaryPath,
  go,
}: any) {
  return (
    <div className="rounded-2xl bg-zinc-900 p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/15 to-transparent" />
      <div className="relative flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="text-xs text-green-400 mb-2">{title}</div>
          <div className="text-2xl font-bold">{headline}</div>
          <div className="text-sm text-gray-400 mt-2">{sub}</div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => go(primaryPath)}
            className="bg-green-500 hover:bg-green-400 text-black px-5 py-3 rounded-xl font-semibold"
          >
            {primaryLabel}
          </button>
          <button
            onClick={() => go(secondaryPath)}
            className="border border-green-500/50 text-green-400 px-5 py-3 rounded-xl font-semibold"
          >
            {secondaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function HeaderBar({
  avatarUrl,
  displayName,
  accountType,
  onEditProfile,
}: any) {
  return (
    <div className="rounded-2xl bg-zinc-900 p-5 flex items-center gap-4">
      <img
        src={avatarUrl}
        className="w-12 h-12 rounded-full object-cover"
        alt="Profile"
      />
      <div className="flex-1">
        <div className="text-xl font-bold">{displayName}</div>
        <div className="text-xs text-gray-400 capitalize">{accountType}</div>
      </div>
      <button
        onClick={onEditProfile}
        className="bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-xl"
      >
        Edit Profile
      </button>
    </div>
  );
}

function CommandStrip({
  isCreator,
  onFeed,
  onGoLive,
  onUpload,
  onApplyCreator,
}: any) {
  return (
    <div className="rounded-2xl bg-zinc-900 p-3 flex gap-2 overflow-x-auto">
      <Cmd label="Feed" onClick={onFeed} />
      {isCreator ? (
        <>
          <Cmd label="Go Live" onClick={onGoLive} />
          <Cmd label="Upload" onClick={onUpload} />
        </>
      ) : (
        <Cmd label="Become Creator" onClick={onApplyCreator} />
      )}
    </div>
  );
}

function Cmd({ label, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-xl bg-black/40 border border-green-500/25 hover:border-green-500/60"
    >
      {label}
    </button>
  );
}

function Panel({ title, children }: any) {
  return (
    <div className="rounded-2xl bg-zinc-900 p-5 space-y-3">
      <div className="text-lg font-semibold">{title}</div>
      {children}
    </div>
  );
}

function StatChip({ label, value, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-2xl bg-zinc-900 p-4 hover:bg-zinc-800 transition"
    >
      <div className="text-xs text-gray-400">{label}</div>
      <div className="text-2xl font-bold text-green-400">{value}</div>
    </div>
  );
}

function ActivityRow({ avatarUrl, name, content, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="flex gap-3 p-3 rounded-xl bg-black/40 hover:bg-black/60 cursor-pointer"
    >
      <img
        src={avatarUrl}
        className="w-8 h-8 rounded-full object-cover"
        alt="User"
      />
      <div className="flex-1">
        <div className="text-sm font-bold">{name}</div>
        <div className="text-xs text-gray-400 truncate">
          {content || "No text"}
        </div>
      </div>
    </div>
  );
}

function StatusRow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-400">{label}</span>
      <span className="text-green-500">● Operational</span>
    </div>
  );
}
