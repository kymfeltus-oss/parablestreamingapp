"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";

export default function Comments({ postId }: { postId: string }) {
  const supabase = createClient();
  const [comments, setComments] = useState<any[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await supabase
      .from("post_comments")
      .select("content, created_at, profiles(display_name)")
      .eq("post_id", postId)
      .order("created_at");

    setComments(data || []);
  }

  async function submit() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user || !text.trim()) return;

    await supabase.from("post_comments").insert({
      post_id: postId,
      user_id: user.id,
      content: text,
    });

    setText("");
    load();
  }

  return (
    <div className="mt-3 space-y-2">
      {comments.map((c, i) => (
        <div key={i} className="text-sm text-gray-300">
          <strong>{c.profiles?.display_name}:</strong> {c.content}
        </div>
      ))}

      <div className="flex gap-2">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Comment…"
          className="flex-1 bg-black border border-white/10 rounded px-2 py-1 text-sm"
        />
        <button onClick={submit} className="text-green-400 text-sm">
          Post
        </button>
      </div>
    </div>
  );
}
