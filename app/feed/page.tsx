"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import CreatePostModal from "@/components/CreatePostModal";

export default function FeedPage() {
  const supabase = createClient();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  const load = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/auth/login");
      return;
    }

    const { data } = await supabase
      .from("posts")
      .select(`
        id,
        content,
        post_type,
        created_at,
        profiles (
          display_name,
          avatar_url
        )
      `)
      .order("created_at", { ascending: false });

    setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading feed…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex justify-center px-4 py-8">
      <div className="w-full max-w-xl space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Feed</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 text-black px-4 py-2 rounded-lg"
          >
            Post
          </button>
        </div>

        {posts.map(post => (
          <div key={post.id} className="bg-zinc-900 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <img
                src={post.profiles?.avatar_url || "/avatar-placeholder.png"}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">
                  {post.profiles?.display_name}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(post.created_at).toLocaleString()}
                </p>
              </div>
            </div>

            <p className="whitespace-pre-wrap">{post.content}</p>

            {post.post_type === "praise" && (
              <div className="mt-3 inline-block bg-green-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                Praise Break 🙌
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <CreatePostModal
          onClose={() => setShowModal(false)}
          onPosted={load}
        />
      )}
    </div>
  );
}
