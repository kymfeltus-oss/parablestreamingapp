"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading…
      </div>
    );
  }

  const accountType = user.user_metadata?.accountType || "viewer";
  const go = (path: string) => router.push(path);

  const ActionTile = ({
    title,
    subtitle,
    path,
  }: {
    title: string;
    subtitle: string;
    path: string;
  }) => (
    <button
      onClick={() => go(path)}
      className="relative group bg-zinc-900 rounded-2xl p-6 text-left overflow-hidden
                 hover:bg-zinc-800 transition-all duration-300"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition
                      bg-gradient-to-br from-green-500/10 to-transparent" />
      <h3 className="text-lg font-semibold relative z-10">{title}</h3>
      <p className="text-sm text-gray-400 mt-1 relative z-10">
        {subtitle}
      </p>
    </button>
  );

  const StatChip = ({
    label,
    value,
    path,
  }: {
    label: string;
    value: string | number;
    path: string;
  }) => (
    <button
      onClick={() => go(path)}
      className="flex flex-col bg-zinc-900 rounded-xl px-5 py-4
                 hover:bg-zinc-800 transition"
    >
      <span className="text-xs text-gray-400">{label}</span>
      <span className="text-2xl font-bold text-green-400 mt-1">
        {value}
      </span>
    </button>
  );

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-10">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <img
          src={profile?.avatar_url || "/avatar-placeholder.png"}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-green-500/40"
        />
        <div>
          <h1 className="text-xl font-bold tracking-wide">
            {profile?.display_name || "User"}
          </h1>
          <p className="text-gray-400 text-sm capitalize">
            {accountType} access
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatChip
          label="Seeds"
          value={profile?.seeds_balance || 0}
          path="/dashboard/coming-soon/seeds"
        />
        <StatChip
          label="Following"
          value={profile?.following_count || 0}
          path="/dashboard/coming-soon/following"
        />
        <StatChip
          label="Account"
          value={accountType}
          path="/dashboard/coming-soon/account"
        />
        <StatChip
          label="Profile"
          value="Edit"
          path="/profile-setup"
        />
      </div>

      {/* ACTIONS */}
      {accountType === "creator" && (
        <div>
          <h2 className="text-lg font-semibold mb-4 tracking-wide">
            Creator Command Center
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <ActionTile
              title="Go Live"
              subtitle="Start a broadcast"
              path="/dashboard/coming-soon/live"
            />
            <ActionTile
              title="Upload Content"
              subtitle="Videos or clips"
              path="/dashboard/coming-soon/upload"
            />
            <ActionTile
              title="Creator Profile"
              subtitle="Public presence"
              path="/profile-setup"
            />
            <ActionTile
              title="Analytics"
              subtitle="Performance metrics"
              path="/dashboard/coming-soon/stats"
            />
            <ActionTile
              title="Monetization"
              subtitle="Earnings and seeds"
              path="/dashboard/coming-soon/earnings"
            />
            <ActionTile
              title="Community"
              subtitle="Engage followers"
              path="/dashboard/coming-soon/community"
            />
          </div>
        </div>
      )}
    </div>
  );
}
