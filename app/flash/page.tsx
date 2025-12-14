"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { Sparkles } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function FlashPage() {
  const router = useRouter();

  const handleEnterParable = async () => {
    const { data } = await supabase.auth.getSession();

    if (data.session) {
      router.push("/feed");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white text-center">
      <div>
        <h1 className="text-5xl font-black mb-3 text-[#53fc18]">
          PARABLE
        </h1>

        <p className="text-gray-300 text-lg">
          Streaming. Creating. Believing.
        </p>

        <Sparkles className="mx-auto mt-5 w-10 h-10 text-[#53fc18]" />

        <div className="mt-10">
          <button
            onClick={handleEnterParable}
            className="px-8 py-3 rounded-lg bg-[#53fc18] text-black font-semibold hover:opacity-90 transition"
          >
            Enter Parable
          </button>
        </div>
      </div>
    </div>
  );
}
