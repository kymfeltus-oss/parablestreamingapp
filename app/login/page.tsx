"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    if (loading) return;

    setLoading(true);
    setError(null);

    const { data, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError || !data.user) {
      setError(authError?.message || "Login failed");
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("onboarding_complete")
      .eq("id", data.user.id)
      .maybeSingle();

    setLoading(false);

    if (!profile || profile.onboarding_complete !== true) {
      router.replace("/profile-setup/creator");
    } else {
      router.replace("/feed");
    }
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* 🔧 FIX: background overlay must ignore pointer events */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(34,255,0,0.15),transparent_60%)]" />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111] p-8 shadow-[0_0_30px_rgba(83,252,24,0.25)]">
          {/* Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-black border border-white/20 shadow-[0_0_25px_rgba(83,252,24,0.8)] mb-4">
              <span className="neon-text text-xl font-bold">P</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight neon-text">
              Welcome to Parable
            </h1>

            <p className="text-zinc-400 mt-2">
              Enter the platform built for faith-driven creators
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-red-900/40 border border-red-500 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="text-xs uppercase tracking-wide text-zinc-400">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@parable.com"
                className="mt-1 w-full rounded-lg bg-black border border-white/15 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-[#53fc18]"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wide text-zinc-400">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full rounded-lg bg-black border border-white/15 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-[#53fc18]"
              />
            </div>

            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              className="w-full neon-button disabled:opacity-60"
            >
              {loading ? "Entering…" : "Enter Parable"}
            </button>
          </div>

          <div className="mt-8 text-center text-sm text-zinc-400">
            New to Parable?{" "}
            <a
              href="/auth/register"
              className="neon-text hover:underline"
            >
              Create your account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
