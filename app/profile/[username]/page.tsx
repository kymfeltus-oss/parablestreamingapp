// PROFILE_PUBLIC_ROUTER_V5_INTERACTIVE

"use client";

import { useParams } from "next/navigation";
import {
  User,
  Mic2,
  PlayCircle,
  Radio,
  BookOpen,
  Music,
  Sparkles,
} from "lucide-react";

/* =========================
   DEMO PROFILES (TEMP)
   ========================= */
const DEMO_PROFILES: Record<string, any> = {
  kymtheceo: {
    username: "kymtheceo",
    display_name: "Kym The CEO",
    creator_category: "podcaster",
    bio: "Podcast host sharing conversations that inspire faith, leadership, purpose, and kingdom impact.",
    avatar_url:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=400",
  },
};

/* =========================
   MAIN ROUTER
   ========================= */
export default function PublicProfilePage() {
  const params = useParams();
  const raw = Array.isArray(params.username)
    ? params.username[0]
    : params.username;

  const normalized = decodeURIComponent(raw || "")
    .toLowerCase()
    .replace(/\s+/g, "");

  const profile = DEMO_PROFILES[normalized];

  if (!profile) {
    return (
      <div className="min-h-screen bg-black text-gray-400 flex items-center justify-center">
        Profile not found
      </div>
    );
  }

  if (profile.creator_category === "podcaster") {
    return <PodcasterProfile profile={profile} />;
  }

  return (
    <div className="min-h-screen bg-black text-gray-400 flex items-center justify-center">
      Template coming soon
    </div>
  );
}

/* =========================
   PODCASTER PROFILE (INTERACTIVE)
   ========================= */
function PodcasterProfile({ profile }: { profile: any }) {
  return (
    <div className="relative min-h-screen bg-black text-white pb-24 overflow-hidden">

      {/* ✨ BACKGROUND MOTION */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#53fc18]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-[#53fc18]/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-12 space-y-12">

        {/* HERO */}
        <section className="bg-[#0b0b0b] border border-white/10 rounded-2xl p-8 shadow-[0_0_50px_rgba(83,252,24,0.25)]">
          <div className="flex flex-col md:flex-row gap-8 items-center">

            {/* AVATAR */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border border-white/20 shadow-[0_0_30px_rgba(83,252,24,0.4)]">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-gray-500 mx-auto mt-10" />
                )}
              </div>
              <Sparkles className="absolute -bottom-3 -right-3 w-6 h-6 neon-text animate-pulse" />
            </div>

            {/* INFO */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-extrabold neon-text">
                {profile.display_name}
              </h1>

              <p className="text-sm text-gray-400 mt-3 max-w-xl">
                {profile.bio}
              </p>

              <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
                <button className="neon-button flex items-center gap-2 text-sm">
                  <PlayCircle className="w-4 h-4" />
                  Play Latest Episode
                </button>

                <button className="px-5 py-3 rounded-lg bg-black border border-white/15 text-sm hover:border-white/30 transition flex items-center gap-2">
                  <Radio className="w-4 h-4" />
                  Go Live
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* NOW PLAYING */}
        <section className="bg-[#111] border border-white/10 rounded-xl p-5 hover:neon-border transition">
          <div className="flex items-center gap-3">
            <Music className="w-5 h-5 neon-text" />
            <div>
              <p className="text-sm font-semibold">Now Playing</p>
              <p className="text-xs text-gray-400">
                Faith, Leadership & Purpose — Episode 12
              </p>
            </div>
          </div>
        </section>

        {/* EPISODES */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <Mic2 className="w-4 h-4 neon-text" />
            <h2 className="text-lg font-extrabold">Episodes</h2>
          </div>

          <div className="space-y-4">
            {[
              "Faith & Leadership",
              "Calling & Purpose",
              "Kingdom Conversations",
            ].map((title, i) => (
              <div
                key={i}
                className="bg-[#111] border border-white/10 rounded-xl p-5 hover:neon-border transition cursor-pointer"
              >
                <p className="font-semibold">{title}</p>
                <p className="text-xs text-gray-400 mt-1">
                  45 min • Tap to play
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
