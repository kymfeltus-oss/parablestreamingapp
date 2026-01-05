"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

import CreatePostModal from "@/components/CreatePostModal";
import LikeButton from "@/components/LikeButton";
import PraiseBreakButton from "@/components/PraiseBreakButton";
import Comments from "@/components/Comments";
import ReportPost from "@/components/ReportPost";

export default function FeedPage() {
  const supabase = createClient();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  async function load() {
    const { data: { user } } = await supabase.auth.getUser();
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
  }

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
    <div className="min-h-screen bg-black text-white flex justify-center px-4 py-6">
      <div className="w-full max-w-xl space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center sticky top-0 bg-black z-10 pb-2">
          <h1 className="text-2xl font-bold">Feed</h1>
          <div className="flex gap-2">
            <PraiseBreakButton refresh={load} />
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-500 text-black px-4 py-2 rounded-lg font-semibold"
            >
              Post
            </button>
          </div>
        </div>

        {/* Posts */}
        {posts.map(post => (
          <div key={post.id} className="bg-zinc-900 rounded-xl p-4 space-y-3">

            {/* User header */}
            <div className="flex items-center gap-3">
              <img
                src={post.profiles?.avatar_url || "/avatar-placeholder.png"}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold leading-tight">
                  {post.profiles?.display_name}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(post.created_at).toLocaleString()}
                </p>
              </div>
              <ReportPost postId={post.id} />
            </div>

            {/* Content */}
            <p className="whitespace-pre-wrap text-sm">
              {post.content}
            </p>

            {/* Praise badge */}
            {post.post_type === "praise" && (
              <div className="inline-block bg-green-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                Praise Break 🙌
              </div>
            )}

            {/* Action bar */}
            <div className="flex gap-4 pt-2 text-sm">
              <LikeButton postId={post.id} />
            </div>

            {/* Comments */}
            <Comments postId={post.id} />

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
