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

  const Tile = ({
    title,
    value,
    subtitle,
    onClick,
  }: {
    title: string;
    value?: string | number;
    subtitle?: string;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className="bg-zinc-900 hover:bg-zinc-800 transition rounded-xl p-5 text-left"
    >
      <p className="text-sm text-gray-400">{title}</p>
      {value !== undefined && (
        <p className="text-3xl font-bold text-green-400 mt-1">
          {value}
        </p>
      )}
      {subtitle && (
        <p className="text-gray-400 text-sm mt-2">{subtitle}</p>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-8">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <img
          src={profile?.avatar_url || "/avatar-placeholder.png"}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h1 className="text-xl font-bold">
            Welcome, {profile?.display_name || "User"}
          </h1>
          <p className="text-gray-400 capitalize">
            {accountType} dashboard
          </p>
        </div>
      </div>

      {/* CORE STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Tile
          title="Seeds"
          value={profile?.seeds_balance || 0}
          onClick={() => go("/dashboard/coming-soon/seeds")}
        />
        <Tile
          title="Following"
          value={profile?.following_count || 0}
          onClick={() => go("/dashboard/coming-soon/following")}
        />
        <Tile
          title="Account"
          value={accountType}
          onClick={() => go("/dashboard/coming-soon/account")}
        />
        <Tile
          title="Profile"
          subtitle="Edit your info"
          onClick={() => go("/profile-setup")}
        />
      </div>

      {/* CREATOR ACTIONS */}
      {accountType === "creator" && (
        <>
          <div>
            <h2 className="text-lg font-semibold mb-3">
              Creator Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Tile
                title="Go Live"
                subtitle="Start a stream"
                onClick={() => go("/dashboard/coming-soon/live")}
              />
              <Tile
                title="Upload"
                subtitle="Videos or clips"
                onClick={() => go("/dashboard/coming-soon/upload")}
              />
              <Tile
                title="Creator Profile"
                subtitle="Public page"
                onClick={() => go("/profile-setup")}
              />
              <Tile
                title="Stats"
                subtitle="Performance"
                onClick={() => go("/dashboard/coming-soon/stats")}
              />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">
              Creator Metrics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Tile
                title="Followers"
                value={profile?.followers_count || 0}
                onClick={() => go("/dashboard/coming-soon/followers")}
              />
              <Tile
                title="Streams This Month"
                value={0}
                onClick={() => go("/dashboard/coming-soon/streams")}
              />
              <Tile
                title="Seeds Earned"
                value={profile?.seeds_balance || 0}
                onClick={() => go("/dashboard/coming-soon/earnings")}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
