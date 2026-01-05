"use client";

import { createClient } from "@/lib/supabaseClient";

export default function PraiseBreakButton({ refresh }: any) {
  const supabase = createClient();

  const praise = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase.from("posts").insert({
      user_id: user.id,
      content: "🙌 Praise break!",
      post_type: "praise",
    });

    refresh();
  };

  return (
    <button
      onClick={praise}
      className="bg-green-500 text-black px-4 py-2 rounded-lg"
    >
      Praise Break 🙌
    </button>
  );
}
