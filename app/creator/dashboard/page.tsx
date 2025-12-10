"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import {
  PlayCircle,
  BarChart2,
  Video,
  Settings,
  Users,
} from "lucide-react";

export default function CreatorDashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [streams, setStreams] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      const accountType =
        (user.user_metadata as any)?.accountType || "viewer";

      if (accountType !== "creator") {
        router.replace("/feed");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", user.id)
        .maybeSingle();

      setDisplayName(
        (profile as any)?.display_name ||
          (user.user_metadata as any)?.displayName ||
          user.email
      );

      await loadCreatorStreams(user.id);

      setLoading(false);
    }

    load();
  }, [router, supabase]);

  async function loadCreatorStreams(creatorId: string) {
    const { data, error } = await supabase
      .from("live_streams")
      .select("*")
      .eq("creator_id", creatorId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading streams:", error);
      setStreams([]);
      return;
    }

    const normalized = (data || []).map((s) => ({
      id: s.id,
      title: s.title || "Untitled Stream",
      thumbnail_url: s.thumbnail_url || "/placeholder.jpg",
      viewer_count: s.viewer_count || 0,
      is_live: s.is_live ?? false,
      slug: s.slug || s.id,
    }));

    setStreams(normalized);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-sm text-gray-400">
          Loading your creator dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-20 pb-16 grid grid-cols-1 md:grid-cols-[220px,1fr] gap-8">
        
        {/* LEFT SIDEBAR */}
        <aside className="space-y-6">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-[0.18em] mb-2">
              Creator studio
            </p>
            <h2 className="text-lg font-bold">
              {displayName || "Creator"}
            </h2>
          </div>

          <nav className="space-y-1 text-sm">
            <button
              onClick={() => router.push("/creator/go-live")}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-[#111] border border-white/15"
            >
              <PlayCircle className="w-4 h-4 text-[#53fc18]" />
              Go live
            </button>

            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#111]">
              <Video className="w-4 h-4 text-gray-400" />
              Videos and replays
            </button>

            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#111]">
              <Users className="w-4 h-4 text-gray-400" />
              Community
            </button>

            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#111]">
              <BarChart2 className="w-4 h-4 text-gray-400" />
              Analytics
            </button>

            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#111]">
              <Settings className="w-4 h-4 text-gray-400" />
              Settings
            </button>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <section className="space-y-6">

          {/* HERO CARD */}
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">
                Welcome back
              </p>
              <h1 className="text-2xl font-extrabold">
                Ready to go live on Parable
              </h1>
              <p className="text-xs text-gray-400 mt-2 max-w-md">
                Start a live stream, upload a replay, or schedule an event. 
                This card will later show real-time stats for your audience.
              </p>
            </div>

            <button
              onClick={() => router.push("/creator/go-live")}
              className="px-5 py-2.5 bg-[#53fc18] text-black text-sm font-bold rounded-lg shadow-[0_0_16px_#53fc18] hover:brightness-110"
            >
              Go live now
            </button>
          </div>

          {/* STREAM LIST */}
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
            <p className="text-xs text-gray-400 mb-3">
              Your Streams
            </p>

            {streams.length === 0 ? (
              <p className="text-gray-400 text-sm">
                You haven’t streamed yet. Click “Go live now” to begin your first broadcast.
              </p>
            ) : (
              <div className="space-y-4">
                {streams.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center gap-4 bg-[#0d0d0d] border border-white/10 rounded-xl p-3 hover:bg-[#171717]"
                  >
                    <img
                      src={s.thumbnail_url}
                      className="w-28 h-16 rounded object-cover border border-white/10"
                    />

                    <div className="flex-1">
                      <p className="text-sm font-bold">
                        {s.title}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        {s.is_live ? "LIVE" : "Offline"} — {s.viewer_count} viewers
                      </p>
                    </div>

                    <button
                      onClick={() => router.push(`/creator/stream/${s.slug}`)}
                      className="px-3 py-1 bg-[#53fc18] text-black text-xs font-bold rounded-lg shadow-[0_0_10px_#53fc18] hover:brightness-110"
                    >
                      Manage
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </section>
      </main>
    </div>
  );
}
