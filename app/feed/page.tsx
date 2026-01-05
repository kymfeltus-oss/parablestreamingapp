"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import { motion } from "framer-motion";

import CreatePostModal from "@/components/CreatePostModal";
import LikeButton from "@/components/LikeButton";
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
        Loading
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* Ambient depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,0.18),transparent_45%)]" />

      {/* Vertical energy line */}
      <motion.div
        className="absolute left-1/2 top-0 h-full w-px bg-green-500/20"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative z-10 flex justify-center px-4 py-16">
        <div className="w-full max-w-xl space-y-16">

          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.96, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative group"
            >

              {/* Presence glow */}
              <div className="absolute -inset-6 rounded-3xl bg-green-500/5 opacity-0 group-hover:opacity-100 transition" />

              <div className="relative rounded-3xl bg-zinc-900/70 backdrop-blur p-6 border border-white/10 shadow-2xl">

                {/* Identity */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={post.profiles?.avatar_url || "/avatar-placeholder.png"}
                    className="w-14 h-14 rounded-full ring-2 ring-green-500/40"
                  />
                  <div className="flex-1">
                    <p className="text-lg font-semibold">
                      {post.profiles?.display_name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(post.created_at).toLocaleString()}
                    </p>
                  </div>
                  <ReportPost postId={post.id} />
                </div>

                {/* Content as hero */}
                <p className="text-xl leading-relaxed mb-6">
                  {post.content}
                </p>

                {/* Praise emphasis */}
                {post.post_type === "praise" && (
                  <div className="inline-block mb-5 px-5 py-1 rounded-full bg-green-500 text-black font-bold shadow-lg">
                    PRAISE
                  </div>
                )}

                {/* Interaction rail */}
                <div className="flex items-center gap-6 opacity-80 group-hover:opacity-100 transition">
                  <LikeButton postId={post.id} />
                </div>

                {/* Comments */}
                <div className="mt-4">
                  <Comments postId={post.id} />
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating creator action dock */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
      >
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowModal(true)}
          className="w-14 h-14 rounded-full bg-green-500 text-black font-bold shadow-[0_0_30px_rgba(34,197,94,0.8)]"
        >
          +
        </motion.button>
      </motion.div>

      {showModal && (
        <CreatePostModal
          onClose={() => setShowModal(false)}
          onPosted={load}
        />
      )}
    </div>
  );
}
