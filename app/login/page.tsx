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
        password
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,255,0,0.15),transparent_60%)]" />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-950 to-black p-8 shadow-[0_0_60px_rgba(34,255,0,0.15)]">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-black border border-green-500 shadow-[0_0_25px_rgba(34,255,0,0.8)] mb-4">
              <span className="text-green-400 text-xl font-bold">P</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              Welcome to Parable
            </h1>

            <p className="text-zinc-400 mt-2">
              Enter the platform built for faith-driven creators
            </p>
          </div>

          {error && (
            <div className="rounded-lg bg-red-900/40 border border-red-800 px-4 py-3 text-sm text-red-300 mb-4">
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
                className="mt-1 w-full rounded-lg bg-black border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-green-500 focus:shadow-[0_0_15px_rgba(34,255,0,0.5)]"
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
                className="mt-1 w-full rounded-lg bg-black border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-green-500 focus:shadow-[0_0_15px_rgba(34,255,0,0.5)]"
              />
            </div>

            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              className="w-full rounded-xl bg-green-500 py-3 font-semibold text-black hover:bg-green-400 transition shadow-[0_0_25px_rgba(34,255,0,0.9)]"
            >
              {loading ? "Entering…" : "Enter Parable"}
            </button>
          </div>

          <div className="mt-8 text-center text-sm text-zinc-400">
            New to Parable?{" "}
            <a
              href="/auth/register"
              className="text-green-400 hover:underline"
            >
              Create your account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
