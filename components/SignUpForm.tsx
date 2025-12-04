"use client";

import { useState } from "react";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] =
    useState<"idle" | "loading" | "success" | "error">("idle");

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();

    if (!email) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={submitEmail} className="space-y-3">
      <input
        type="email"
        placeholder="you@yourministry.org"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 bg-black/60 border border-white/20 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#53fc18]"
      />

      <button
        disabled={status === "loading"}
        className="w-full py-2 bg-[#53fc18] text-black font-bold rounded-xl disabled:opacity-60"
      >
        {status === "loading"
          ? "Submitting..."
          : status === "success"
          ? "You're on the list!"
          : "Join Early Access"}
      </button>

      {status === "error" && (
        <p className="text-[11px] text-red-400">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
