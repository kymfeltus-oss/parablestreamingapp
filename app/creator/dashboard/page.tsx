"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";

export default function CreatorDashboard() {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    // Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/auth/login";
      return;
    }

    // Check account type
    const accountType = user.user_metadata?.accountType;
    if (accountType !== "creator") {
      window.location.href = "/dashboard";
      return;
    }

    // Fetch creator profile
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (error || !data) {
      window.location.href = "/creator/setup";
      return;
    }

    setProfile(data);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading creator dashboard…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-2">
        Welcome back, {profile.display_name}
      </h1>

      <p className="text-sm text-gray-400 mb-8">
        Seeds balance:{" "}
        <span className="text-[#53fc18] font-bold">{profile.seeds ?? 0}</span>
      </p>

      <div className="space-y-6">

        {/* GO LIVE */}
        <a
          href="/creator/go-live"
          className="block bg-[#53fc18] text-black font-bold px-6 py-3 rounded"
        >
          Go Live
        </a>

        {/* STREAM KEY */}
        <a
          href="/creator/stream-key"
          className="block bg-[#111] border border-white/10 px-6 py-3 rounded"
        >
          Stream Key
        </a>

        {/* OBS SETUP */}
        <a
          href="/creator/obs-setup"
          className="block bg-[#111] border border-white/10 px-6 py-3 rounded"
        >
          OBS Setup
        </a>

        {/* EARNINGS */}
        <a
          href="/creator/earnings"
          className="block bg-[#111] border border-white/10 px-6 py-3 rounded"
        >
          Earnings
        </a>

        {/* VIEWER RETENTION */}
        <a
          href="/creator/retention"
          className="block bg-[#111] border border-white/10 px-6 py-3 rounded"
        >
          Viewer Retention
        </a>

        {/* PUBLIC CHANNEL */}
        <a
          href={`/creator/${profile.username}`}
          className="block bg-[#111] border border-white/10 px-6 py-3 rounded"
        >
          View Public Channel
        </a>
      </div>
    </div>
  );
}
