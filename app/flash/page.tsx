"use client";

import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

export default function FlashPage() {
  const router = useRouter();

  const handleEnter = () => {
    router.push("/welcome");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="text-right pr-16">
        <h1 className="text-6xl font-black text-[#53fc18] mb-2">
          PARABLE
        </h1>

        <p className="text-gray-300 text-lg mb-4">
          Streaming. Creating. Believing.
        </p>

        <Sparkles className="ml-auto mb-6 w-8 h-8 text-[#53fc18]" />

        <button
          onClick={handleEnter}
          className="bg-[#53fc18] text-black font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition"
        >
          Enter Parable
        </button>
      </div>
    </div>
  );
}
