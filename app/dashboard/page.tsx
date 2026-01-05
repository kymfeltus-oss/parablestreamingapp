"use client";

import React from "react";
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

  const go = (path: string) => router.push(path);

  return (
    <div className="min-h-screen bg-black text-white px-5 py-6 space-y-8 animate-fade-in">
      {/* HEADER */}
      <div className="rounded-3xl bg-gradient-to-r from-zinc-900 to-zinc-800 p-6 flex items-center gap-5">
        <img
          src={profile?.avatar_url || "/avatar-placeholder.png"}
          className="w-14 h-14 rounded-full object-cover ring-2 ring-green-500/50"
        />
        <div className="flex-1">
          <div className="text-2xl font-bold tracking-wide">
            Welcome, {profile?.display_name || "Creator"}
          </div>
          <div className="text-sm text-gray-400">Unified Dashboard</div>
        </div>

        <button
          onClick={() => go("/profile-setup")}
          className="bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-xl font-semibold transition"
        >
          Edit Profile
        </button>
      </div>

      {/* QUICK ACTION BAR */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        <QuickAction label="Feed" onClick={() => go("/feed")} primary />
        <QuickAction label="Go Live" onClick={() => go("/go-live")} />
        <QuickAction label="Upload" onClick={() => go("/dashboard/coming-soon/upload")} />
      </div>

      {/* SPOTLIGHT */}
      <div className="relative overflow-hidden rounded-3xl bg-zinc-900 p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-transparent to-transparent" />
        <div className="relative flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <div className="text-green-400 text-xs uppercase tracking-wider mb-2">
              Spotlight
            </div>
            <div className="text-3xl font-bold leading-tight">
              Your next move starts here
            </div>
            <p className="text-gray-400 mt-2 max-w-xl">
              Go live, upload content, and engage your community in real time.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => go("/go-live")}
              className="bg-green-500 hover:bg-green-400 text-black px-6 py-4 rounded-2xl font-bold text-lg transition"
            >
              Go Live
            </button>

            <button
              onClick={() => go("/dashboard/coming-soon/upload")}
              className="border border-green-500/50 hover:border-green-400 text-green-400 px-6 py-4 rounded-2xl font-bold text-lg transition"
            >
              Upload
            </button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Seeds" value={profile?.seeds_balance || 0} />
        <StatCard label="Followers" value={profile?.followers_count || 0} />
        <StatCard label="Following" value={profile?.following_count || 0} />
        <StatCard label="Profile" value="Edit" onClick={() => go("/profile-setup")} />
      </div>

      {/* ACTIVITY */}
      <div className="rounded-3xl bg-zinc-900 p-6">
        <div className="text-lg font-semibold mb-2">Live Activity</div>
        <div className="text-gray-400 text-sm">
          No activity available yet.
        </div>
      </div>

      {/* SYSTEM STATUS */}
      <div className="rounded-3xl bg-zinc-900 p-6">
        <div className="text-lg font-semibold mb-4">System Status</div>
        <StatusRow label="Auth" />
        <StatusRow label="Feed" />
        <StatusRow label="Upload" />
        <StatusRow label="Go Live" />
      </div>

      {/* subtle animation */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function QuickAction({
  label,
  onClick,
  primary,
}: {
  label: string;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-3 rounded-2xl font-semibold whitespace-nowrap transition ${
        primary
          ? "bg-green-500 text-black hover:bg-green-400"
          : "bg-zinc-900 text-green-400 hover:bg-zinc-800"
      }`}
    >
      {label}
    </button>
  );
}

function StatCard({
  label,
  value,
  onClick,
}: {
  label: string;
  value: string | number;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl bg-zinc-900 p-5 cursor-pointer hover:bg-zinc-800 transition`}
    >
      <div className="text-xs text-gray-400">{label}</div>
      <div className="text-2xl font-bold text-green-400 mt-1">
        {value}
      </div>
    </div>
  );
}

function StatusRow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between py-2 text-sm">
      <span className="text-gray-400">{label}</span>
      <span className="text-green-500">● Operational</span>
    </div>
  );
}
