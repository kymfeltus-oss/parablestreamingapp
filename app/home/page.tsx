"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import PostComposer from "@/components/PostComposer";
import {
  Radio,
  PlayCircle,
  Users,
  Image as ImageIcon,
  Video,
} from "lucide-react";

type Profile = {
  id: string;
  display_name?: string | null;
  creator_category?: string | null;
  avatar_url?: string | null;
};

export default function HomePage() {
  const supabase = createClient();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [composerOpen, setComposerOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;
      if (!user) return;

      const { data: p } = await supabase
        .from("profiles")
        .select("id,display_name,creator_category,avatar_url")
        .eq("id", user.id)
        .maybeSingle();

      setProfile((p as Profile) || null);
    }

    load();
  }, [supabase]);

  const isCreator = !!profile?.creator_category;

  return (
    <div className="min-h-screen bg-black text-white pb-16">
      <div className="max-w-7xl mx-auto px-6 pt-8 space-y-12">

        {/* LIVE NOW STRIP */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-extrabold neon-text">
              🔴 Live Now
            </h2>

            {isCreator && (
              <Link
                href="/creator/dashboard"
                className="text-xs neon-text hover:underline"
              >
                Creator Dashboard
              </Link>
            )}
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="min-w-[260px] bg-[#111] border border-white/10 rounded-xl p-4 hover:neon-border transition cursor-pointer"
              >
                <div className="text-xs text-gray-400 mb-2">
                  Ministry Live
                </div>
                <div className="text-sm font-bold mb-1">
                  Faith & Encouragement Night
                </div>
                <div className="text-[11px] text-gray-500">
                  124 watching
                </div>
              </div>
            ))}

            {isCreator && (
              <Link
                href="/creator/go-live"
                className="min-w-[260px] bg-black border border-dashed border-white/20 rounded-xl p-4 flex flex-col items-center justify-center hover:border-white/40 transition"
              >
                <Radio className="w-6 h-6 neon-text mb-2" />
                <span className="text-sm font-bold neon-text">
                  Go Live
                </span>
              </Link>
            )}
          </div>
        </section>

        {/* COMMUNITY POST COMPOSER */}
        <section>
          <div
            onClick={() => setComposerOpen(true)}
            className="bg-[#111] border border-white/10 rounded-xl p-4 cursor-pointer hover:border-white/20 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black border border-white/20 overflow-hidden flex items-center justify-center">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Users className="w-5 h-5 text-gray-500" />
                )}
              </div>

              <p className="text-sm text-gray-400">
                What’s on your heart?
              </p>
            </div>

            <div className="flex gap-4 mt-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <ImageIcon className="w-4 h-4 neon-text" />
                Photo
              </span>
              <span className="flex items-center gap-1">
                <Video className="w-4 h-4 neon-text" />
                Video
              </span>
              <span className="flex items-center gap-1">
                <Radio className="w-4 h-4 neon-text" />
                Go Live
              </span>
            </div>
          </div>

          <PostComposer
            open={composerOpen}
            onClose={() => setComposerOpen(false)}
          />
        </section>

        {/* COMMUNITY FEED */}
        <section>
          <h2 className="text-lg font-extrabold mb-4">
            Community
          </h2>

          <div className="space-y-6">

            {/* FEED ITEM */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-[#111] border border-white/10 rounded-xl p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-black border border-white/20 flex items-center justify-center">
                    <Users className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">
                      Faith Builder Ministry
                    </p>
                    <p className="text-[11px] text-gray-500">
                      2 hours ago
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-300">
                  Encouragement for today: Stay rooted, stay faithful,
                  and trust the process God is building in you.
                </p>

                <div className="flex gap-6 mt-4 text-xs text-gray-400">
                  <span>❤️ 12</span>
                  <span>💬 3</span>
                  <span>↗ Share</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
