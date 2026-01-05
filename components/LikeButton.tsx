"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";

export default function LikeButton({ postId }: { postId: string }) {
  const supabase = createClient();
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data: likes } = await supabase
      .from("post_likes")
      .select("id")
      .eq("post_id", postId);

    setCount(likes?.length || 0);

    const { data } = await supabase
      .from("post_likes")
      .select("id")
      .eq("post_id", postId)
      .eq("user_id", user.id)
      .maybeSingle();

    setLiked(!!data);
  }

  async function toggle() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    if (liked) {
      await supabase
        .from("post_likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", user.id);
    } else {
      await supabase.from("post_likes").insert({
        post_id: postId,
        user_id: user.id,
      });
    }

    load();
  }

  return (
    <button onClick={toggle} className="text-sm text-gray-400 hover:text-green-400">
      👍 {count}
    </button>
  );
}
