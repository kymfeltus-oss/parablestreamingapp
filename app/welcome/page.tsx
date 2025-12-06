"use client";

import Link from "next/link";
import { Sparkles, Play, Music2, Mic2, Users, TrendingUp } from "lucide-react";
import SignUpForm from "@/components/SignUpForm";
import ParableParticles from "@/components/ParableParticles";
import useReveal from "@/components/useReveal";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function WelcomePage() {
  const reveal1 = useReveal();
  const reveal2 = useReveal();
  const reveal3 = useReveal();
  const reveal4 = useReveal();

  const [trending, setTrending] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrending();
  }, []);

  async function loadTrending() {
    setLoading(true);

    const [streamersRes, parablesRes, eventsRes] = await Promise.all([
      supabase.from("streamers").select("*"),
      supabase.from("parables").select("*"),
      supabase.from("events").select("*"),
    ]);

    const streamers = (streamersRes.data || [])
      .filter((s: any) => s.is_live)
      .map((s: any) => ({
        type: "Live Stream",
        title: s.name,
        banner: s.thumbnail_url,
        badge: "LIVE NOW",
        badgeColor: "#53fc18",
        url: "/stream",
        priority: 1, // highest
      }));

    const parables = (parablesRes.data || []).map((p: any) => ({
      type: "Parable Series",
      title: p.title,
      banner: p.banner_url,
      badge: `${p.episodes_count} Episodes`,
      badgeColor: "#7c3aed",
      url: `/parables/${p.id}`,
      priority: 2,
    }));

    const events = (eventsRes.data || []).map((ev: any) => ({
      type: "Event",
      title: ev.title,
      banner: ev.banner_url,
      badge: ev.date,
      badgeColor: "#53fc18",
      url: ev.url,
      priority: 3,
    }));

    // Combine all and sort by priority
    const combined = [...streamers, ...parables, ...events]
      .sort((a, b) => a.priority - b.priority)
      .slice(0, 10);

    setTrending(combined);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-32">
        <ParableParticles />

        <div ref={reveal1} className="relative z-20 space-y-5">
          <h1 className="text-5xl md:text-6xl font-black leading-tight drop-shadow-[0_0_25px_#53fc18]">
            Stream • Create • Worship • Connect.
          </h1>

          <p className="text-gray-300 max-w-xl text-base leading-relaxed">
            A faith-centered streaming platform designed for pastors, musicians,
            vocalists, and creators of the gospel community.
          </p>

          <div className="mt-6 flex gap-4 flex-wrap">
            <Link
              href="/feed"
              className="
                inline-flex items-center gap-2 px-10 py-3
                bg-[#53fc18] text-black font-bold rounded-xl text-sm
                shadow-[0_0_20px_#53fc18] hover:brightness-110 transition
              "
            >
              <Play className="w-4 h-4" />
              Enter Parable
            </Link>

            <Link
              href="/auth/register"
              className="
                inline-flex items-center gap-2 px-10 py-3
                border border-white/20 rounded-xl text-sm
                hover:bg-white/10 transition
              "
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* TRENDING SECTION */}
      <section ref={reveal2} className="max-w-7xl mx-auto px-6 -mt-20 space-y-6">
        <h2 className="text-2xl font-black flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-[#53fc18]" />
          Trending Now
        </h2>

        {loading && (
          <p className="text-xs text-gray-500">Loading trending content...</p>
        )}

        {!loading && trending.length === 0 && (
          <p className="text-xs text-gray-500">No trending content yet.</p>
        )}

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {trending.map((item, i) => (
            <Link
              key={i}
              href={item.url}
              className="
                min-w-[240px] w-[240px]
                parable-card parable-card-hover
                hover:shadow-[0_0_20px_#53fc18]
                transition block
              "
            >
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <img
                  src={item.banner}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-90 hover:scale-110 transition duration-500"
                />
              </div>

              <p className="mt-3 font-bold text-sm hover:text-[#53fc18] transition">
                {item.title}
              </p>
              <p className="text-xs text-gray-400">{item.type}</p>

              <span
                className="text-[10px] mt-2 inline-block px-2 py-1 rounded font-bold uppercase"
                style={{
                  backgroundColor: item.badgeColor,
                  color: "#000",
                }}
              >
                {item.badge}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* EARLY ACCESS SIGNUP */}
      <section ref={reveal3} className="max-w-7xl mx-auto px-6 mt-16 max-w-md">
        <div className="p-6 rounded-2xl bg-[#0d0d0d] border border-white/10 hover:border-[#53fc18]/40 hover:shadow-[0_0_18px_#53fc18] transition">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#53fc18]" />
            <h3 className="text-lg font-bold">Get Early Access</h3>
          </div>

          <p className="text-xs text-gray-400 mb-4">
            Join the early access list for Parable and be notified when creator
            onboarding opens.
          </p>

          <SignUpForm />
        </div>
      </section>

      {/* FEATURE GRID */}
      <section ref={reveal4} className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
        <div className="
          rounded-2xl border border-white/10 p-6 bg-[#0d0d0d]
          transition hover:border-[#53fc18]/40 hover:shadow-[0_0_18px_#53fc18]
        ">
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Mic2 className="w-6 h-6 text-[#53fc18]" /> Pastors & Ministries
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Stream sermons, conferences, worship, prayer nights, and teaching series.
          </p>
        </div>

        <div className="
          rounded-2xl border border-white/10 p-6 bg-[#0d0d0d]
          transition hover:border-[#53fc18]/40 hover:shadow-[0_0_18px_#53fc18]
        ">
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Music2 className="w-6 h-6 text-[#53fc18]" /> Musicians & Vocalists
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Host shed rooms, vocal warmups, rehearsals, and musical collaborations.
          </p>
        </div>

        <div className="
          rounded-2xl border border-white/10 p-6 bg-[#0d0d0d]
          transition hover:border-[#53fc18]/40 hover:shadow-[0_0_18px_#53fc18]
        ">
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Users className="w-6 h-6 text-[#53fc18]" /> Communities
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Build breakout rooms, prayer rooms, Bible study groups, and global fellowship communities.
          </p>
        </div>
      </section>
    </div>
  );
}
