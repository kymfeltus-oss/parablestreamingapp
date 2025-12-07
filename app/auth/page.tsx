"use client";

import { useState } from "react";
// UPDATED: Use a named import for the createClient function
import { createClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
// Assuming you still need this component, otherwise remove the import:
// import Navbar from "@/components/Navbar"; 

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Call the function inside the component to get the supabase client instance
  const supabase = createClient();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      alert("Email and password required");
      return;
    }

    setLoading(true);

    // Use the correctly instantiated 'supabase' client
    const { error } = await supabase.auth.signUp({
      email,
      password,
      // You can add options like email redirects here if needed:
      // options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
    });

    if (error) {
      console.error(error);
      alert(error.message || "Registration failed");
      setLoading(false);
      return;
    }

    // After successful signup (usually requires email verification)
    alert("Check your email to confirm your account!");
    router.push("/auth/login"); // Redirect to login page after successful registration prompt
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-2xl p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold">Create an Account</h1>
          <p className="text-xs text-gray-400 mt-1">
            Sign up with email and password
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSignup}>
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
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center">
          Already have an account?{" "}
          <Link href="/auth/page.tsx" className="text-[#53fc18] font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
