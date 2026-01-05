"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabaseClient";

export default function CreatePostModal({ onClose, onPosted }: any) {
  const supabase = createClient();
  const [content, setContent] = useState("");
  const [posting, setPosting] = useState(false);

  const submit = async () => {
    setPosting(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase.from("posts").insert({
      user_id: user.id,
      content,
      post_type: "text",
    });

    setPosting(false);
    setContent("");
    onPosted();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-6 rounded-xl w-full max-w-lg">
        <h2 className="text-lg font-bold mb-4">Create Post</h2>

        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full bg-black text-white p-3 rounded-lg mb-4"
          rows={4}
          placeholder="What's on your heart?"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="text-gray-400">
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={posting}
            className="bg-green-500 text-black px-4 py-2 rounded-lg"
          >
            {posting ? "Posting…" : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
}
