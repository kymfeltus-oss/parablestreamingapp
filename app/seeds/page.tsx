"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";

const PACKAGES = [
  { amount: 100, label: "100 Seeds", description: "Starter pack" },
  { amount: 250, label: "250 Seeds", description: "Supporter pack" },
  { amount: 500, label: "500 Seeds", description: "Partner pack" },
];

export default function SeedsPage() {
  const supabase = createClient();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    loadBalance();
  }, []);

  async function loadBalance() {
    setLoading(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be logged in to use Seeds.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("seeds")
      .eq("id", user.id)
      .maybeSingle();

    if (error || !data) {
      setError(error?.message || "Could not load profile.");
      setLoading(false);
      return;
    }

    setBalance(data.seeds || 0);
    setLoading(false);
  }

  async function buySeeds(amount: number, description: string) {
    setBuying(true);
    setError("");

    try {
      const res = await fetch(
        "https://api.parablestreaming.com/api/seeds/add",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount, description }),
        }
      );

      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Failed to add seeds.");

      setBalance(json.balance);
    } catch (err: any) {
      setError(err.message);
    }

    setBuying(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading Seeds…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Seeds</h1>

      {error && (
        <div className="bg-red-900 text-red-300 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-6">
        <p className="text-sm text-gray-400">Your current balance:</p>
        <p className="text-3xl font-bold text-[#53fc18]">
          {balance ?? 0} Seeds
        </p>
      </div>

      <h2 className="text-xl font-bold mb-4">Add Seeds (Demo)</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {PACKAGES.map((p) => (
          <button
            key={p.amount}
            disabled={buying}
            onClick={() => buySeeds(p.amount, p.description)}
            className="bg-[#111] border border-white/10 rounded p-4 text-left hover:border-[#53fc18]/60 transition"
          >
            <p className="font-bold text-lg">{p.label}</p>
            <p className="text-xs text-gray-400 mt-1">{p.description}</p>
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-6">
        This is a demo implementation of Seeds. In production, this would be
        connected to Stripe or another payment provider.
      </p>
    </div>
  );
}
