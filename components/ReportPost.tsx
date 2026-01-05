"use client";

import { createClient } from "@/lib/supabaseClient";

export default function ReportPost({ postId }: { postId: string }) {
  const supabase = createClient();

  async function report() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("post_reports").insert({
      post_id: postId,
      user_id: user.id,
      reason: "Reported by user",
    });

    alert("Post reported");
  }

  return (
    <button onClick={report} className="text-xs text-red-400">
      Report
    </button>
  );
}
