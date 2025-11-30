"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Image as ImageIcon,
  Play,
  Send,
} from "lucide-react";

// ARTIST SLUGS
const artistSlugs = ["lauren-daigle", "kirk-franklin", "steven-furtick"];

// CREATOR SLUGS
const creatorSlugs = ["td-jakes", "mike-todd", "pastor-stevenson", "steven-furtick"];

export default function FeedPage() {
  const [content, setContent] = useState("");

  const [posts, setPosts] = useState([
    // ⭐ Kirk Franklin
    {
      id: 0,
      user: {
        name: "Kirk Franklin",
        handle: "@kirkfranklin",
        avatar: "/kirk_avatar.png",
        slug: "kirk-franklin",
        live: false
      },
      time: "1h ago",
      content: "God is doing a new thing! Stay ready 🙌🏾🔥",
      tags: ["#Gospel", "#Kingdom"],
      media: "/channels4_banner.png",
      type: "image",
      likes: "9.8k",
      comments: "1.1k",
      shares: "4.2k",
    },

    // ⭐ Bishop TD Jakes
    {
      id: 1,
      user: {
        name: "Bishop T.D. Jakes",
        handle: "@bishopjakes",
        avatar: "/td-jakes.jpg",
        slug: "td-jakes",
        live: true,
      },
      time: "2h ago",
      content: "Faith + Obedience = Miracles! 🙌🏾",
      tags: ["#Sermon", "#Miracles"],
      media: "https://www.youtube.com/embed/5osAqv0xkLk",
      type: "youtube",
      likes: "15.4k",
      comments: "890",
      shares: "5.2k",
    },

    // ⭐ Mike Todd
    {
      id: 2,
      user: {
        name: "Pastor Mike Todd",
        handle: "@miketodd",
        avatar: "/mike-todd.jpg",
        slug: "mike-todd",
        live: true,
      },
      time: "1h ago",
      content: "Relationship Goals is LIVE! 🔥",
      tags: ["#RelationshipGoals", "#Live"],
      media: "https://www.youtube.com/embed/hzjKTR1k4ps",
      type: "youtube",
      likes: "8.1k",
      comments: "430",
      shares: "1.9k",
    },

    // ⭐ Steven Furtick
    {
      id: 3,
      user: {
        name: "Pastor Steven Furtick",
        handle: "@stevenfurtick",
        avatar: "/steven-furtick.jpg",
        slug: "steven-furtick",
        live: false,
      },
      time: "5h ago",
      content: "Don't stop on 6. Keep believing. 🙏",
      tags: ["#Elevation", "#DontStop"],
      media: "/steven-furtick.jpg",
      type: "image",
      likes: "6.6k",
      comments: "240",
      shares: "910",
    },

    // ⭐ Lauren Daigle
    {
      id: 4,
      user: {
        name: "Lauren Daigle",
        handle: "@laurendaigle",
        avatar: "/lauren-daigle.jpg",
        slug: "lauren-daigle",
        live: false,
      },
      time: "Yesterday",
      content: "Grateful to worship with you all ❤️🎵",
      tags: ["#ChristianMusic", "#Worship"],
      media: "/lauren-daigle.jpg",
      type: "image",
      likes: "12.2k",
      comments: "940",
      shares: "3.1k",
    },
  ]);

  // Correct Instagram embed loader
  useEffect(() => {
    if (!document.querySelector('script[src="//www.instagram.com/embed.js"]')) {
      const script = document.createElement("script");
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // ⭐ FIXED NEW POST (NO NULL MEDIA, ALL REQUIRED FIELDS)
  const handlePost = () => {
    if (!content) return;

    const newPost = {
      id: posts.length + 1,
      user: {
        name: "Joshua",
        handle: "@joshua",
        avatar: "/td_jakes_avatar.jpg",
        slug: "joshua",
        live: false,      // REQUIRED FOR BUILD
      },
      time: "Just now",
      content,
      tags: ["#MyTestimony"],
      media: "",         // MUST BE STRING (NO NULL)
      type: "text",
      likes: "0",
      comments: "0",
      shares: "0",
    };

    setPosts([newPost, ...posts]);
    setContent("");
  };

  // ⭐ Profile routing logic
  const getProfileUrl = (slug: string, isLive?: boolean) => {
    if (artistSlugs.includes(slug)) return `/artist/${slug}`;
    if (creatorSlugs.includes(slug))
      return isLive ? `/creator/${slug}#live` : `/creator/${slug}`;
    return `/creator/${slug}`;
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      <Navbar />
      <div className="flex">
        <Sidebar resolveProfileUrl={getProfileUrl} />

        <main className="flex-1 lg:ml-64 p-6 flex justify-center">
          <div className="w-full max-w-2xl space-y-6">

            {/* CREATE POST */}
            <div className="bg-[#1a1a1a] border border-white/10 p-4 rounded-xl">
              <div className="flex gap-4">
                <img
                  src="/td_jakes_avatar.jpg"
                  className="w-10 h-10 rounded-full"
                />
                <input
                  className="flex-1 bg-transparent outline-none text-sm placeholder-gray-500"
                  placeholder="Drop a testimony or share a clip..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="flex justify-between mt-4 pt-3 border-t border-white/10">
                <div className="flex gap-4 text-violet-400">
                  <button className="flex items-center gap-2 text-xs">
                    <ImageIcon className="w-4 h-4" /> Media
                  </button>
                  <button className="flex items-center gap-2 text-xs">
                    <Play className="w-4 h-4" /> Live
                  </button>
                </div>

                <button
                  onClick={handlePost}
                  className="bg-violet-600 px-6 py-1.5 rounded-full text-xs font-bold"
                >
                  Post <Send className="w-3 h-3 inline" />
                </button>
              </div>
            </div>

            {/* POSTS */}
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-[#111] border border-white/10 rounded-xl overflow-hidden"
              >
                <div className="p-4 flex justify-between">
                  <Link
                    href={getProfileUrl(post.user.slug, post.user.live)}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={post.user.avatar}
                      className="w-10 h-10 rounded-full border border-white/10"
                    />
                    <div>
                      <p className="font-bold text-sm">{post.user.name}</p>
                      <p className="text-[10px] text-gray-500">{post.time}</p>
                    </div>
                  </Link>

                  <MoreHorizontal className="text-gray-500" />
                </div>

                <div className="px-4 pb-3 text-sm">{post.content}</div>

                {post.media && post.type !== "text" && (
                  <div className="bg-black">
                    {post.type === "youtube" ? (
                      <iframe
                        title="YouTube player"
                        src={post.media}
                        className="w-full aspect-video"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <img src={post.media} className="w-full" />
                    )}
                  </div>
                )}

                <div className="p-4 flex gap-6 border-t border-white/10 text-gray-400 text-xs">
                  <button className="flex items-center gap-1">
                    <Heart className="w-4 h-4" /> {post.likes}
                  </button>
                  <button className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" /> {post.comments}
                  </button>
                  <button className="flex items-center gap-1">
                    <Share2 className="w-4 h-4" /> {post.shares}
                  </button>
                </div>
              </div>
            ))}

          </div>
        </main>
      </div>
    </div>
  );
}
