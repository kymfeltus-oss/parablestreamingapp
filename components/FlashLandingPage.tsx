"use client";

import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

export default function FlashLandingPage() {
  const router = useRouter();

  const handleEnter = () => {
    router.push("/welcome"); // ← this is the next page after flash
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(83,252,24,0.25),transparent_65%)]" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <h1 className="text-6xl font-black text-[#53fc18] drop-shadow-[0_0_30px_#53fc18]">
          PARABLE
        </h1>

        <p className="mt-4 text-gray-300 text-lg max-w-xl">
          Stream • Create • Worship • Connect.
          <br />
          A home for believers, creators, and gospel musicians.
        </p>

        <button
          onClick={handleEnter}
          className="
            mt-10 flex items-center gap-3
            px-10 py-4 rounded-2xl
            bg-[#53fc18] text-black font-bold text-lg
            shadow-[0_0_30px_#53fc18]
            hover:brightness-110 transition
          "
        >
          Enter Parable
          <Sparkles className="w-6 h-6" />
        </button>

        <p className="mt-4 text-xs text-gray-500">
          Auto-navigating to your feed…
        </p>
      </div>
    </div>
  );
}
