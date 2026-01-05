"use client";

import React from "react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

type PostRow = {
  id: string;
  created_at?: string;
  content?: string | null;
  type?: string | null;
  user_id?: string | null;
  display_name?: string | null;
  avatar_url?: string | null;
};

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
        setPostsLoading(true);

        const { data } = await supabase
          .from("posts")
          .select("id, created_at, content, type, display_name, avatar_url")
          .order("created_at", { ascending: false })
          .limit(8);

        setRecentPosts((data || []) as PostRow[]);
        setPostsLoading(false);
      } catch {
        setRecentPosts([]);
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

  const seededSeries = useMemo(() => {
    const mk = (base: number) =>
      Array.from({ length: 14 }, (_, i) => Math.max(0, base + ((i * 7) % 9) - 4));

    return {
      seeds: mk(profile?.seeds_balance || 0),
      followers: mk(profile?.followers_count || 0),
      uploads: mk(6),
      engagement: mk(12),
    };
  }, [profile]);

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
        onAnalytics={() => go("/dashboard/coming-soon/stats")}
        onCommunity={() => go("/dashboard/coming-soon/community")}
        onApplyCreator={() => go("/creator/apply")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 space-y-5">
          <SpotlightCard
            title="Spotlight"
            headline="Your next move starts here"
            sub="Live, upload, engage, and grow your presence on Parable."
            primaryLabel={isCreator ? "Go Live" : "Explore Creators"}
            primaryPath={isCreator ? "/dashboard/coming-soon/live" : "/feed"}
            secondaryLabel="Upload"
            secondaryPath="/dashboard/coming-soon/upload"
            go={go}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatChip label="Seeds" value={profile?.seeds_balance || 0} series={seededSeries.seeds} onClick={() => go("/dashboard/coming-soon/seeds")} />
            <StatChip label="Followers" value={profile?.followers_count || 0} series={seededSeries.followers} onClick={() => go("/dashboard/coming-soon/followers")} />
            <StatChip label="Uploads" value="—" series={seededSeries.uploads} onClick={() => go("/dashboard/coming-soon/upload")} />
            <StatChip label="Engagement" value="—" series={seededSeries.engagement} onClick={() => go("/dashboard/coming-soon/community")} />
          </div>

          <Panel title="Live Activity">
            {postsLoading ? (
              <div className="text-gray-400 text-sm">Loading activity…</div>
            ) : (
              recentPosts.map((p) => (
                <ActivityRow
                  key={p.id}
                  avatarUrl={p.avatar_url || "/avatar-placeholder.png"}
                  name={p.display_name || "User"}
                  content={p.content || ""}
                  onClick={() => go("/feed")}
                />
              ))
            )}
          </Panel>
        </div>

        <div className="lg:col-span-4 space-y-5">
          <Panel title="System Status">
            <StatusRow label="Auth" />
            <StatusRow label="Feed" />
            <StatusRow label="Upload" />
          </Panel>
        </div>
      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function HeaderBar({ avatarUrl, displayName, accountType, onEditProfile }: any) {
  return (
    <div className="rounded-2xl bg-zinc-900 p-5 flex items-center gap-4">
      <img src={avatarUrl} className="w-12 h-12 rounded-full object-cover ring-2 ring-green-500/40" />
      <div className="flex-1">
        <div className="text-xl font-bold">{displayName}</div>
        <div className="text-xs text-gray-400 capitalize">{accountType}</div>
      </div>
      <button onClick={onEditProfile} className="bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-xl">
        Edit Profile
      </button>
    </div>
  );
}

function CommandStrip({ isCreator, onFeed, onGoLive, onUpload, onAnalytics, onCommunity, onApplyCreator }: any) {
  return (
    <div className="rounded-2xl bg-zinc-900 p-3 flex gap-2 overflow-x-auto">
      <Cmd label="Feed" onClick={onFeed} />
      {isCreator ? (
        <>
          <Cmd label="Go Live" onClick={onGoLive} />
          <Cmd label="Upload" onClick={onUpload} />
          <Cmd label="Analytics" onClick={onAnalytics} />
          <Cmd label="Community" onClick={onCommunity} />
        </>
      ) : (
        <Cmd label="Become Creator" onClick={onApplyCreator} />
      )}
    </div>
  );
}

function Cmd({ label, onClick }: any) {
  return (
    <button onClick={onClick} className="px-4 py-2 rounded-xl bg-black/40 border border-green-500/25 hover:border-green-500/60">
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

function StatChip({ label, value, series, onClick }: any) {
  return (
    <button onClick={onClick} className="rounded-2xl bg-zinc-900 p-4 text-left">
      <div className="text-xs text-gray-400">{label}</div>
      <div className="text-2xl font-bold text-green-400">{value}</div>
      <Sparkline data={series} />
    </button>
  );
}

function ActivityRow({ avatarUrl, name, content, onClick }: any) {
  return (
    <button onClick={onClick} className="flex gap-3 p-3 rounded-xl bg-black/40 hover:bg-black/60">
      <img src={avatarUrl} className="w-8 h-8 rounded-full" />
      <div>
        <div className="font-semibold">{name}</div>
        <div className="text-sm text-gray-400 truncate max-w-xs">{content}</div>
      </div>
    </button>
  );
}

function StatusRow({ label }: any) {
  return (
    <div className="flex justify-between items-center p-3 rounded-xl bg-black/40">
      <span>{label}</span>
      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
    </div>
  );
}

function Sparkline({ data }: any) {
  const w = 80;
  const h = 24;
  const max = Math.max(...data, 1);
  const pts = data
    .map((v: number, i: number) => `${(i / (data.length - 1)) * w},${h - (v / max) * h}`)
    .join(" ");

  return (
    <svg width={w} height={h}>
      <polyline points={pts} fill="none" stroke="lime" strokeWidth="2" />
    </svg>
  );
}
