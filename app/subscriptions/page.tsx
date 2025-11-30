"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Star, Crown, ShieldCheck } from "lucide-react";

export default function SubscriptionsPage() {
  const tiers = [
    {
      name: "Supporter",
      price: "$3.99 / mo",
      icon: Star,
      color: "from-slate-700 to-slate-900",
      perks: [
        "Ad-light viewing on supported streams",
        "Access to partner-only posts",
        "Basic Seed streak multiplier (x1.1)",
      ],
    },
    {
      name: "Partner",
      price: "$9.99 / mo",
      icon: ShieldCheck,
      color: "from-violet-600 to-indigo-700",
      perks: [
        "Full VOD + replay library",
        "Exclusive Q&A and Partner Nights",
        "Seed streak multiplier (x1.3)",
        "Partner badge next to your name in chat",
      ],
    },
    {
      name: "Kingdom Elite",
      price: "$24.99 / mo",
      icon: Crown,
      color: "from-amber-500 to-orange-700",
      perks: [
        "Front-row priority in chat & calls",
        "Invites to closed prophetic & mentorship rooms",
        "Seed streak multiplier (x1.5)",
        "Custom profile frame + Elite badge",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Subscription Tiers</h1>
          <p className="text-sm text-gray-400">
            Choose how you want to support ministries and unlock unique perks, badges, and Seed multipliers.
          </p>
        </header>

        <section className="grid sm:grid-cols-3 gap-5">
          {tiers.map((tier, idx) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.name}
                className={`rounded-3xl border border-white/10 bg-gradient-to-b ${tier.color} p-5 flex flex-col justify-between ${
                  idx === 1 ? "ring-2 ring-violet-400" : ""
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-5 h-5" />
                    <h2 className="text-lg font-bold">{tier.name}</h2>
                  </div>
                  <p className="text-sm text-gray-100 mb-3">{tier.price}</p>
                  <ul className="space-y-1 text-xs text-gray-100/80">
                    {tier.perks.map((perk) => (
                      <li key={perk}>• {perk}</li>
                    ))}
                  </ul>
                </div>
                <button className="mt-4 w-full bg-black/40 hover:bg-black/60 text-xs font-semibold py-2 rounded-full border border-white/20">
                  Choose {tier.name}
                </button>
              </div>
            );
          })}
        </section>

        <div className="mt-8 text-center">
          <Link
            href="/discover"
            className="text-xs text-violet-300 hover:text-violet-200 underline"
          >
            Back to Discover
          </Link>
        </div>
      </main>
    </div>
  );
}
