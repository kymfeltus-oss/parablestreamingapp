"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import { motion } from "framer-motion";

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
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Ambient animated background */}
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-transparent to-black"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative flex justify-center px-4 py-6">
        <div className="w-full max-w-xl space-y-6">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex justify-between items-center sticky top-0 bg-black/80 backdrop-blur z-10 pb-2"
          >
            <motion.h1
              animate={{ opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="text-2xl font-bold tracking-tight"
            >
              Feed
            </motion.h1>

            <div className="flex gap-2">
              <PraiseBreakButton refresh={load} />
              <motion.button
                whileTap={{ scale: 0.94 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setShowModal(true)}
                className="bg-green-500 text-black px-4 py-2 rounded-lg font-semibold shadow-lg"
              >
                Post
              </motion.button>
            </div>
          </motion.div>

          {/* Posts */}
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="relative bg-zinc-900/90 rounded-xl p-4 space-y-3 shadow-xl"
            >

              {/* Glow on new posts */}
              <motion.div
                aria-hidden
                className="absolute inset-0 rounded-xl border border-green-500/20"
                animate={{ opacity: [0.15, 0.35, 0.15] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              {/* User header */}
              <div className="relative flex items-center gap-3">
                <motion.img
                  whileHover={{ scale: 1.06 }}
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
              <motion.p
                animate={{ opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="whitespace-pre-wrap text-sm leading-relaxed"
              >
                {post.content}
              </motion.p>

              {/* Praise pulse */}
              {post.post_type === "praise" && (
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="inline-block bg-green-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-md"
                >
                  Praise Break
                </motion.div>
              )}

              {/* Actions */}
              <div className="pt-1">
                <LikeButton postId={post.id} />
              </div>

              {/* Comments */}
              <Comments postId={post.id} />

            </motion.div>
          ))}
        </div>
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
