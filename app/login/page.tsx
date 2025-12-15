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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
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
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-[#111] border border-white/10 rounded-2xl p-8 shadow-[0_0_30px_rgba(83,252,24,0.25)]"
      >
        <h1 className="text-2xl font-extrabold text-center mb-2 neon-text">
          Welcome to Parable
        </h1>

        <p className="text-xs text-gray-400 text-center mb-6">
          Enter the platform built for faith-driven creators
        </p>

        {error && (
          <div className="mb-4 rounded-md bg-red-900/40 border border-red-500 text-red-100 text-xs px-3 py-2">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="text-xs font-semibold mb-1 block">
            Email
          </label>
          <input
            type="email"
            className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@parable.com"
            required
          />
        </div>

        <div className="mb-6">
          <label className="text-xs font-semibold mb-1 block">
            Password
          </label>
          <input
            type="password"
            className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full neon-button disabled:opacity-60"
        >
          {loading ? "Entering…" : "Enter Parable"}
        </button>

        <div className="mt-6 text-center text-xs text-gray-400">
          New to Parable?{" "}
          <a
            href="/auth/register"
            className="neon-text hover:underline"
          >
            Create your account
          </a>
        </div>
      </form>
    </div>
  );
}
