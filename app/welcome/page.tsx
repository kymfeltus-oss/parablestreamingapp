"use client";

import Link from "next/link";
import { Sparkles, Play, Music2, Mic2, Users, TrendingUp } from "lucide-react";
import SignUpForm from "@/components/SignUpForm";
import ParableParticles from "@/components/ParableParticles";
import useReveal from "@/components/useReveal";

export default function WelcomePage() {
  const reveal1 = useReveal();
  const reveal2 = useReveal();
  const reveal3 = useReveal();
  const reveal4 = useReveal();

  const trending = [
    {
      title: "Faith & Obedience",
      banner: "/parable_banner_1.jpg",
      type: "Parable Series",
    },
    {
      title: "Gospel Shed Session",
      banner: "/event_banner_2.jpg",
      type: "Live Music",
    },
    {
      title: "Midweek Worship",
      banner: "/stream-banner-2.jpg",
      type: "Worship Stream",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-24 overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-32">
        {/* Floating neon particles */}
        <ParableParticles />

        {/* HEADLINE */}
        <div ref={reveal1} className="relative z-20 space-y-5">
          <h1 className="text-5xl md:text-6xl font-black leading-tight drop-shadow-[0_0_25px_#53fc18]">
            Stream • Create • Worship • Connect.
          </h1>

          <p className="text-gray-300 max-w-xl text-base leading-relaxed">
            A faith-centered streaming platform designed for pastors, musicians,
            vocalists, and creators of the gospel community.
          </p>

          {/* CTA BUTTONS */}
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
              href="/creator/tools"
              className="
                inline-flex items-center gap-2 px-10 py-3
                border border-white/20 rounded-xl text-sm
                hover:bg-white/10 transition
              "
            >
              Creator Tools
            </Link>
          </div>
        </div>
      </section>

      {/* TRENDING ROW */}
      <section ref={reveal2} className="max-w-7xl mx-auto px-6 -mt-20 space-y-6">
        <h2 className="text-2xl font-black flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-[#53fc18]" />
          Trending Now
        </h2>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {trending.map((t, i) => (
            <div
              key={i}
              className="
                min-w-[240px] w-[240px]
                parable-card parable-card-hover
                hover:shadow-[0_0_20px_#53fc18]
              "
            >
              <div className="aspect-video rounded-xl overflow-hidden border border-white/10">
                <img
                  src={t.banner}
                  className="w-full h-full object-cover opacity-90 hover:scale-110 transition duration-500"
                />
              </div>
              <p className="mt-3 font-bold text-sm hover:text-[#53fc18] transition">
                {t.title}
              </p>
              <p className="text-xs text-gray-400">{t.type}</p>
            </div>
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
            Build breakout rooms, prayer rooms, Bible study groups, and global fellowship.
          </p>
        </div>
      </section>
    </div>
  );
}
