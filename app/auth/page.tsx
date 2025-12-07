"use client";

import { useState } from "react";
// UPDATED: Changed from named import { supabase } to default import supabase
import supabase from "@/lib/supabaseClient"; 
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      alert("Email and password required");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error);
      alert(error.message || "Login failed");
      setLoading(false);
      return;
    }

    // Redirect to the dashboard after successful login
    router.push("/dashboard"); 
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-2xl p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold">Sign in to Parable</h1>
          <p className="text-xs text-gray-400 mt-1">
            Secure login with email and password
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="text-xs text-gray-400">Email</label>
            <input
              type="email"
              className="mt-1 w-full bg-black border border-white/10 rounded-lg p-3 text-sm"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs text-gray-400">Password</label>
            <input
              type="password"
              className="mt-1 w-full bg-black border border-white/10 rounded-lg p-3 text-sm"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-[10px] text-gray-500 mt-1">
              At least 8 characters recommended
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-600 hover:bg-violet-700 text-sm font-bold rounded-lg py-3 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center">
          Do not have an account yet{" "}
          <Link href="/auth/register" className="text-[#53fc18] font-semibold">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
