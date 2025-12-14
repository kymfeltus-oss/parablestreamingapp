"use client";

import { useRouter } from "next/navigation";

export default function FlashPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,255,0,0.18),transparent_65%)]" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="mb-8">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-green-500 shadow-[0_0_40px_rgba(34,255,0,0.9)]">
            <span className="text-4xl font-bold text-green-400">P</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            Parable
          </h1>

          <p className="mt-4 max-w-md text-zinc-400">
            A next generation streaming platform for faith driven creators
            teachers and communities
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          <button
            onClick={() => router.push("/auth/register")}
            className="rounded-xl bg-green-500 py-3 font-semibold text-black shadow-[0_0_30px_rgba(34,255,0,0.8)] hover:bg-green-400 transition"
          >
            Create account
          </button>

          <button
            onClick={() => router.push("/login")}
            className="rounded-xl border border-zinc-700 py-3 font-semibold text-white hover:border-green-500 hover:text-green-400 transition"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
