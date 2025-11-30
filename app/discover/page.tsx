"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { creators } from "@/lib/preachers";
import { artists } from "@/lib/artists";
import { Flame, Gamepad2, Star, Crown } from "lucide-react";

export default function DiscoverPage() {
  const topPreachers = creators.slice(0, 4);
  const topArtists = artists.slice(0, 4);

  const tiers = [
    {
      name: "Supporter",
      price: "$3.99/mo",
      tag: "Starter",
      perks: [
        "Ad-light viewing",
        "Access to partner-only posts",
        "Seed streak multiplier x1.1",
      ],
    },
    {
      name: "Partner",
      price: "$9.99/mo",
      tag: "Most Popular",
      perks: [
        "Full VOD access",
        "Exclusive Q&A sessions",
        "Seed streak multiplier x1.3",
        "Unlock ‘Partner’ badge in chat",
      ],
    },
    {
      name: "Kingdom Elite",
      price: "$24.99/mo",
      tag: "Elite",
      perks: [
        "Front-row chat priority",
        "Exclusive prophetic nights",
        "Seed streak multiplier x1.5",
        "Founder badge + profile frame",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 space-y-10">
        {/* HEADER */}
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Discover</h1>
            <p className="text-gray-400 text-sm">
              Find new ministries, worship artists, and games to support with Seeds and subscriptions.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/subscriptions"
              className="px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-500 text-sm font-semibold"
            >
              View Subscription Tiers
            </Link>
            <Link
              href="/seeds"
              className="px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-sm font-semibold text-black"
            >
              Launch Seeds Game
            </Link>
          </div>
        </section>

        {/* FEATURED STREAMERS / GAMERS */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-400" /> Trending Ministries & Streamers
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topPreachers.map((p: any, i: number) => (
              <Link
                href={`/creator/${p.slug}`}
                key={i}
                className="bg-[#101010] border border-white/10 rounded-2xl overflow-hidden hover:border-violet-500/50 transition group"
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={p.bannerUrl}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>
                <div className="p-4 flex items-center gap-3">
                  <img
                    src={p.avatarUrl}
                    className="w-10 h-10 rounded-full border border-white/20"
                  />
                  <div>
                    <p className="font-semibold text-sm">{p.name}</p>
                    <p className="text-[11px] text-gray-400">
                      {p.ministry ? "Ministry • Live & On-Demand" : "Creator"}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FEATURED ARTISTS */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-300" /> Featured Worship & Artists
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topArtists.map((a: any, i: number) => (
              <Link
                href={`/artist/${a.slug}`}
                key={i}
                className="bg-[#101010] border border-white/10 rounded-2xl overflow-hidden hover:border-violet-500/50 transition group"
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={a.bannerUrl}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>
                <div className="p-4 flex items-center gap-3">
                  <img
                    src={a.avatarUrl}
                    className="w-10 h-10 rounded-full border border-white/20"
                  />
                  <div>
                    <p className="font-semibold text-sm">{a.name}</p>
                    <p className="text-[11px] text-gray-400">Artist • Worship & Live Sets</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SUBSCRIPTION TIERS PREVIEW */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Crown className="w-5 h-5 text-violet-300" /> Subscription Tiers
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {tiers.map((tier, i) => (
              <div
                key={tier.name}
                className={`rounded-2xl border border-white/10 bg-[#101010] p-5 flex flex-col justify-between ${
                  i === 1 ? "ring-2 ring-violet-500" : ""
                }`}
              >
                <div>
                  <p className="text-xs uppercase text-gray-500 mb-1">
                    {tier.tag}
                  </p>
                  <h3 className="text-lg font-bold mb-1">{tier.name}</h3>
                  <p className="text-sm text-violet-300 mb-3">{tier.price}</p>
                  <ul className="space-y-1 text-xs text-gray-300">
                    {tier.perks.map((perk) => (
                      <li key={perk}>• {perk}</li>
                    ))}
                  </ul>
                </div>
                <Link
                  href="/subscriptions"
                  className="mt-4 w-full text-center bg-violet-600 hover:bg-violet-500 text-xs font-semibold py-2 rounded-full"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* GAMER DISCOVERY */}
        <section className="space-y-4 pb-10">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-emerald-300" /> Faith + Gaming Channels
          </h2>
          <p className="text-xs text-gray-400 mb-2">
            Discover pastors and creators who mix Bible study, community nights, and gaming.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-[#101010] border border-white/10 rounded-2xl p-4 flex flex-col justify-between"
              >
                <div>
                  <p className="text-sm font-semibold mb-1">
                    Youth Co-Op Night #{i}
                  </p>
                  <p className="text-xs text-gray-400 mb-2">
                    Co-op gameplay, prayer, & discipleship moments.
                  </p>
                </div>
                <button className="mt-2 w-full bg-white/10 hover:bg-white/20 text-[11px] font-semibold py-2 rounded-full">
                  View Channel
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
