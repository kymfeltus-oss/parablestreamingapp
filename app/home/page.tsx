"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import {
  Radio,
  PlayCircle,
  Compass,
  Users,
  Gamepad2,
  Mic2,
  Music2,
  BookOpen,
} from "lucide-react";

type Profile = {
  id: string;
  display_name?: string | null;
  ministry_name?: string | null;
  creator_category?: string | null;
};

export default function HomePage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;

      if (!user) {
        setLoading(false);
        return;
      }

      const { data: p } = await supabase
        .from("profiles")
        .select("id,display_name,ministry_name,creator_category")
        .eq("id", user.id)
        .maybeSingle();

      setProfile((p as Profile) || null);
      setLoading(false);
    }

    load();
  }, [supabase]);

  const isCreator = !!profile?.creator_category;

  return (
    <div className="min-h-screen bg-black text-white pb-16">
      <div className="max-w-7xl mx-auto px-6 pt-8 space-y-12">

        {/* HERO: LIVE NOW */}
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
                Go to Creator Dashboard
              </Link>
            )}
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {[1, 2, 3, 4].map((i) => (
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

        {/* CONTINUE WATCHING */}
        <section>
          <h2 className="text-lg font-extrabold mb-4">
            Continue Watching
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-[#111] border border-white/10 rounded-xl p-4 hover:border-white/20 transition"
              >
                <PlayCircle className="w-6 h-6 neon-text mb-3" />
                <div className="text-sm font-semibold">
                  Sunday Teaching
                </div>
                <div className="text-[11px] text-gray-500">
                  Resume where you left off
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED MOMENT */}
        <section>
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 shadow-[0_0_30px_rgba(83,252,24,0.15)]">
            <h2 className="text-lg font-extrabold neon-text mb-2">
              Featured Ministry
            </h2>
            <p className="text-sm text-gray-400 max-w-2xl">
              Experience powerful worship and teaching from ministries
              impacting lives this week.
            </p>
          </div>
        </section>

        {/* FAITH SHORTS */}
        <section>
          <h2 className="text-lg font-extrabold mb-4">
            Faith Clips
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="min-w-[180px] bg-[#111] border border-white/10 rounded-xl p-4 hover:border-white/20 transition"
              >
                <div className="text-sm font-bold mb-1">
                  60-second encouragement
                </div>
                <div className="text-[11px] text-gray-500">
                  Watch now
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPLORE BY CATEGORY */}
        <section>
          <h2 className="text-lg font-extrabold mb-4">
            Explore
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <Category icon={BookOpen} label="Teaching" />
            <Category icon={Music2} label="Worship" />
            <Category icon={Gamepad2} label="Christian Gaming" />
            <Category icon={Mic2} label="Podcasts" />
            <Category icon={Users} label="Testimonies" />
            <Category icon={Compass} label="Discover" />
          </div>
        </section>

        {/* COMMUNITY PULSE */}
        <section>
          <div className="bg-black border border-white/10 rounded-xl p-4 flex flex-wrap gap-6 text-xs text-gray-400">
            <span>18 creators live now</span>
            <span>2,340 people watching</span>
            <span>New ministries joined today</span>
          </div>
        </section>

      </div>
    </div>
  );
}

function Category({
  icon: Icon,
  label,
}: {
  icon: any;
  label: string;
}) {
  return (
    <div className="bg-[#111] border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-white/20 transition cursor-pointer">
      <Icon className="w-6 h-6 neon-text" />
      <span className="text-xs font-semibold text-center">
        {label}
      </span>
    </div>
  );
}
