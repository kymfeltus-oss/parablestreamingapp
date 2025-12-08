// app/auth/register/page.tsx
"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, UserPlus, Mail, CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [accountType, setAccountType] = useState<"viewer" | "creator">("viewer");

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [analyticsConsent, setAnalyticsConsent] = useState(false);

  const [loading, setLoading] = useState(false);

  function clearFormState() {
    setEmail("");
    setDisplayName("");
    setUsername("");
    setPassword("");
    setPasswordConfirm("");
    setAccountType("viewer");
    setAnalyticsConsent(false);
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password || !passwordConfirm || !displayName || !username) {
      alert("Please fill in all required fields");
      return;
    }

    if (password !== passwordConfirm) {
      alert("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    if (!analyticsConsent) {
      alert("You must agree to analytics consent");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Email verification link
        emailRedirectTo: `${location.origin}/auth/confirm`,

        // Public profile metadata
        data: {
          displayName,
          username,
          accountType,
          onboardingRequired: true,
        },
      },
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    clearFormState();
    setRegistrationSuccess(true);
  }

  const inputClass =
    "mt-1 w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#53fc18] focus:shadow-[0_0_12px_#53fc18]";

  const SuccessMessage = (
    <div className="flex flex-col items-center justify-center min-h-[500px] text-center p-8">
      <CheckCircle className="w-16 h-16 text-[#53fc18] mb-4" />
      <h2 className="text-2xl font-bold mb-3">Account Created</h2>

      <p className="text-gray-400 mb-6 max-w-sm">
        We sent a verification link to {email}.  
        Please check your inbox and click the link to continue to profile setup.
      </p>

      <Link
        href="/login"
        className="px-6 py-3 bg-[#53fc18] text-black font-bold rounded-lg shadow-[0_0_10px_#53fc18] hover:brightness-110 transition"
      >
        <Mail className="w-5 h-5 inline-block mr-2" />
        Go to Login
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-24 grid grid-cols-1 lg:grid-cols-5 gap-10">
        
        <section className="lg:col-span-2 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#53fc18]/40 bg-[#050505] shadow-[0_0_12px_rgba(83,252,24,0.2)]">
            <Sparkles className="w-4 h-4 text-[#53fc18]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-gray-300">
              Parable Creator Access
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
            Create your Parable account.
          </h1>

          <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
            Join our community of pastors, worship artists, gospel creators, and Christian gamers who stream, teach, and inspire the world.
          </p>
        </section>

        <section className="lg:col-span-3 space-y-6">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 space-y-6">

            {registrationSuccess ? (
              SuccessMessage
            ) : (
              <>
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-[#53fc18]" />
                    Create Account
                  </h2>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setAccountType("viewer")}
                    className={`flex-1 py-2 rounded-lg border ${
                      accountType === "viewer"
                        ? "border-[#53fc18] bg-[#53fc18]/20"
                        : "border-white/10 bg-black"
                    }`}
                  >
                    Viewer
                  </button>

                  <button
                    type="button"
                    onClick={() => setAccountType("creator")}
                    className={`flex-1 py-2 rounded-lg border ${
                      accountType === "creator"
                        ? "border-[#53fc18] bg-[#53fc18]/20"
                        : "border-white/10 bg-black"
                    }`}
                  >
                    Creator
                  </button>
                </div>

                <form onSubmit={handleRegister} className="space-y-5">

                  <div>
                    <label>Email</label>
                    <input
                      type="email"
                      className={inputClass}
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label>Display Name</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="John Doe"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label>Username</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="johndoe"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div>
                    <label>Password</label>
                    <input
                      type="password"
                      className={inputClass}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div>
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      className={inputClass}
                      placeholder="••••••••"
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <input
                      type="checkbox"
                      checked={analyticsConsent}
                      onChange={(e) => setAnalyticsConsent(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-xs text-gray-400">
                      I agree to anonymous analytics and activity tracking
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#53fc18] text-black text-sm font-bold rounded-lg py-3 shadow-[0_0_14px_#53fc18] hover:brightness-110 disabled:opacity-60 flex items-center justify-center"
                  >
                    {loading ? "Creating account..." : "Create account"}
                  </button>
                </form>

                <p className="text-xs text-gray-400 text-center mt-4">
                  Already have an account?{" "}
                  <Link href="/login" className="text-[#53fc18] font-semibold">
                    Sign in
                  </Link>
                </p>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
