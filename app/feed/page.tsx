"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import {
  Send,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Share2,
  Image as ImageIcon,
  Play,
} from "lucide-react";

const artistSlugs = ["lauren-daigle", "kirk-franklin", "steven-furtick"];
const creatorSlugs = [
  "td-jakes",
  "mike-todd",
  "pastor-stevenson",
  "steven-furtick",
];

export default function FeedPage() {
  const [content, setContent] = useState("");

  const [posts, setPosts] = useState([
    {
      id: 0,
      user: {
        name: "Kirk Franklin",
        handle: "@kirkfranklin",
        avatar: "/kirk_avatar.png",
        slug: "kirk-franklin",
        live: false,
      },
      time: "1h ago",
      content: "God is doing a new thing! Stay ready 🙌🏾🔥",
      tags: ["#PraiseBreak", "#Testimony"],
      media: "",
      type: "text",
      likes: "12.3k",
      comments: "1.1k",
      shares: "4.2k",
    },
    {
      id: 1,
      user: {
        name: "Bishop T.D. Jakes",
        handle: "@bishopjakes",
        avatar: "/td_jakes_avatar.jpg",
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
      tags: ["#Encouragement", "#Faith"],
      media: "",
      type: "text",
      likes: "5.4k",
      comments: "240",
      shares: "910",
    },
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
      likes: "4.8k",
      comments: "450",
      shares: "1.3k",
    },
  ]);

  useEffect(() => {
    if (!document.querySelector('script[src="//www.instagram.com/embed.js"]')) {
      const script = document.createElement("script");
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handlePost = () => {
    if (!content.trim()) return;

    const newPost = {
      id: Date.now(),
      user: {
        name: "You",
        handle: "@you",
        avatar: "/td_jakes_avatar.jpg",
        slug: "you",
        live: false,
      },
      time: "Just now",
      content,
      tags: ["#MyTestimony"],
      media: "",
      type: "text",
      likes: "0",
      comments: "0",
      shares: "0",
    };

    setPosts([newPost, ...posts]);
    setContent("");
  };

  const getProfileUrl = (slug: string, live?: boolean) => {
    if (artistSlugs.includes(slug)) return `/artist/${slug}`;
    if (creatorSlugs.includes(slug))
      return live ? `/creator/${slug}#live` : `/creator/${slug}`;
    return `/creator/${slug}`;
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      <Navbar />

      <div className="flex">
        <Sidebar resolveProfileUrl={getProfileUrl} />

        <main className="flex-1 lg:ml-64 p-6 flex justify-center">
          <div className="w-full max-w-2xl space-y-8">
            
            <div>
              <h1 className="text-3xl font-black">Your Feed</h1>
              <p className="text-gray-400 text-sm mt-1">
                Stay connected. Stay inspired.
              </p>
            </div
