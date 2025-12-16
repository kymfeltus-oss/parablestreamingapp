// PROFILE_PUBLIC_ROUTER_V1

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import {
  Mic2,
  PlayCircle,
  Radio,
  User,
} from "lucide-react";

type Profile = {
  username?: string | null;
  display_name?: string | null;
  bio?: string | null;
  avatar_url?: string | null;
  creator_category?: string | null;
};

export default function PublicProfilePage() {
  const { username } = useParams();
  const supabase = createClient();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!username) return;

      const { data } = await supabase
        .from("profiles")
        .select("username,display_name,bio,avatar_url,creator_category")
        .eq("username", username)
        .maybeSingle();

      setProfile(data || null);
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

  /* 🔀 TEMPLATE SWITCH */
  if (profile.creator_category === "podcaster") {
    return <PodcasterProfile profile={profile} />;
  }

  /* FALLBACK (OTHER TYPES COMING NEXT) */
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <p className="text-gray-400">
        Profile template coming soon.
      </p>
    </div>
  );
}

/* ===================== */
/* PODCASTER TEMPLATE */
/* ===================== */

function PodcasterProfile({ profile }: { profile: Profile }) {
  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <div className="max-w-4xl mx-auto px-6 pt-10 space-y-10">

        {/* HERO */}
        <section className="bg-[#0b0b0b] border border-white/10 rounded-2xl p-6 shadow-[0_0_40px_rgba(83,252,24,0.2)]">
          <div className="flex items-center gap-6">
            <div className="w-28 h-28 rounded-full bg-black border border-white/20 overflow-hidden flex items-center justify-center">
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-10 h-10 text-gray-500" />
              )}
            </div>

            <div>
              <h1 className="text-3xl font-extrabold neon-text">
                {profile.display_name}
              </h1>

              <p className="text-sm text-gray-400 mt-2 max-w-xl">
                {profile.bio || "Podcast host sharing conversations that inspire faith, purpose, and truth."}
              </p>

              <div className="mt-4 flex gap-3">
                <button className="neon-button text-sm flex items-center gap-2">
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

        {/* EPISODES */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Mic2 className="w-4 h-4 neon-text" />
            <h2 className="text-lg font-extrabold">
              Episodes
            </h2>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-[#111] border border-white/10 rounded-xl p-4 hover:border-white/20 transition"
              >
                <p className="text-sm font-semibold">
                  Episode {i}: Faith, Purpose & Calling
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  45 minutes • Listen now
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
