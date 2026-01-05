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
    <div className="min-h-screen bg-black text-white p-6 space-y-6">

      {/* 🔴 DEBUG MARKER — MUST BE VISIBLE */}
      <div className="bg-red-600 text-white p-4 text-center font-bold">
        DASHBOARD DEBUG MARKER — CLIENT CODE IS RENDERING
      </div>

      <div className="rounded-2xl bg-zinc-900 p-6">
        <h1 className="text-2xl font-bold">
          Welcome, {profile?.display_name || "User"}
        </h1>
        <p className="text-gray-400 mt-1">Unified Dashboard</p>

        <div className="mt-6 flex gap-4">
          <button
            onClick={() => go("/feed")}
            className="bg-green-500 hover:bg-green-400 text-black px-5 py-3 rounded-xl font-semibold"
          >
            Feed
          </button>

          <button
            onClick={() => go("/dashboard/coming-soon/live")}
            className="border border-green-500/50 text-green-400 px-5 py-3 rounded-xl font-semibold"
          >
            Go Live
          </button>

          <button
            onClick={() => go("/dashboard/coming-soon/upload")}
            className="border border-green-500/50 text-green-400 px-5 py-3 rounded-xl font-semibold"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
