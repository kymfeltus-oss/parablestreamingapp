"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import { Flame, Star, Crown, Gamepad2 } from "lucide-react";

export default function DiscoverPage() {
  const supabase = createClient();

  const [creators, setCreators] = useState<any[]>([]);
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    // Load creators
    const { data: creatorProfiles } = await supabase
      .from("profiles")
      .select("id, username, display_name, avatar_url, creator_category, ministry_name")
      .not("creator_category", "is", null)
      .order("display_name");

    // Load artists (tagged separately by category)
    const { data: artistProfiles } = await supabase
      .from("profiles")
      .select("id, username, display_name, avatar_url, creator_category, ministry_name")
      .eq("creator_category", "Worship artist");

    setCreators(creatorProfiles || []);
    setArtists(artistProfiles || []);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading content...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 space-y-10">

        {/* HEADER */}
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Discover</h1>
            <p className="text-gray-400 text-sm">
              Find new ministries, artists, and creators to support.
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

        {/* FEATURED CREATORS */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-400" /> Trending Ministries & Streamers
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {creators.slice(0, 8).map((p: any) => (
              <Link
                href={`/creator/${p.username}`}
                key={p.id}
                className="bg-[#101010] border border-white/10 rounded-2xl overflow-hidden hover:border-violet-500/50 transition"
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={p.avatar_url || "/placeholder.jpg"}
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                <div className="p-4 flex items-center gap-3">
                  <img
                    src={p.avatar_url || "/placeholder.jpg"}
                    className="w-10 h-10 rounded-full border border-white/20"
                  />
                  <div>
                    <p className="font-semibold text-sm">{p.display_name}</p>
                    <p className="text-[11px] text-gray-400">
                      {p.ministry_name || p.creator_category}
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
            <Star className="w-5 h-5 text-yellow-300" /> Featured Worship Artists
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {artists.slice(0, 8).map((a: any) => (
              <Link
                href={`/creator/${a.username}`}
                key={a.id}
                className="bg-[#101010] border border-white/10 rounded-2xl overflow-hidden hover:border-violet-500/50 transition"
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={a.avatar_url || "/placeholder.jpg"}
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                <div className="p-4 flex items-center gap-3">
                  <img
                    src={a.avatar_url || "/placeholder.jpg"}
                    className="w-10 h-10 rounded-full border border-white/20"
                  />
                  <div>
                    <p className="font-semibold text-sm">{a.display_name}</p>
                    <p className="text-[11px] text-gray-400">
                      Worship • Artist
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SUBSCRIPTIONS */}
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

      </main>
    </div>
  );
}
