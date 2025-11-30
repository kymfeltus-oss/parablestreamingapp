import os

print("🔥 Adding Pastor Mike Todd Profile & TikTok Embed...")

# Helper to write files
def write_file(path, content):
    directory = os.path.dirname(path)
    if directory and not os.path.exists(directory):
        os.makedirs(directory)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Updated: {path}")

# --- 1. UPDATE PREACHER DATABASE (Add Mike Todd) ---
preachers_code = """export type StreamCategory = "Live" | "Teaching" | "Conference" | "Youth" | "Worship" | "Real Talk" | "Music";

export interface Stream {
  id: string;
  title: string;
  category: StreamCategory;
  isLive: boolean;
  viewers: number;
  thumbnailUrl: string;
  scheduledFor?: string;
}

export interface Creator {
  slug: string;
  name: string;
  ministry: string;
  avatarUrl: string;
  bannerUrl: string;
  tags: string[];
  shortTagline: string;
  bio: string;
  socialStats?: { followers: string; subscribers: string; instagram: string };
  liveStream?: Stream;
  featuredStreams: Stream[];
  monetization: string[];
}

export const creators: Creator[] = [
  {
    slug: "td-jakes",
    name: "Bishop T.D. Jakes",
    ministry: "The Potter's House",
    avatarUrl: "/td_avatar.jpg",   
    bannerUrl: "/td_banner.avif",  
    tags: ["Leadership", "Vision", "Empowerment"],
    shortTagline: "Transforming lives through the Word.",
    bio: "Bishop T.D. Jakes is a visionary leader and entrepreneur serving as senior pastor of The Potter's House.",
    socialStats: { followers: "6.5M", subscribers: "2.1M", instagram: "@bishopjakes" },
    liveStream: {
      id: "tdj-live-1",
      title: "Live: The Mantle of Digital Influence",
      category: "Teaching",
      isLive: true,
      viewers: 45200,
      thumbnailUrl: "/td_banner.avif",
    },
    featuredStreams: [],
    monetization: ["Books", "Conferences", "Leadership Training"],
  },
  // NEW: PASTOR MIKE TODD PROFILE
  {
    slug: "mike-todd",
    name: "Pastor Mike Todd",
    ministry: "Transformation Church",
    avatarUrl: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400", // New Mike Todd visual proxy
    bannerUrl: "https://images.pexels.com/photos/1181400/pexels-photo-1181400.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["Relationships", "Purpose", "CrazyFaith"],
    shortTagline: "Crazy Faith. It's only crazy until it happens.",
    bio: "Pastor Mike Todd is the lead pastor of Transformation Church based in Tulsa, Oklahoma, bridging faith with modern cultural issues for millennials and Gen Z.",
    liveStream: {
        id: "mt-live-1",
        title: "Mustard Seed Faith: Building Your World",
        category: "Real Talk",
        isLive: true,
        viewers: 12400,
        thumbnailUrl: "https://images.pexels.com/photos/1181400/pexels-photo-1181400.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    featuredStreams: [],
    monetization: ["Merch", "Books", "Conferences"],
  }
];

export function getCreatorBySlug(slug: string): Creator | undefined {
  return creators.find((c) => c.slug === slug);
}
"""

# --- 2. UPDATE SIDEBAR (Fixes the Screenshot's "Bishop Rivers" issue) ---
sidebar_code = """import Link from "next/link";
import { Users, Zap, Radio, Heart, Flame, Compass } from "lucide-react";

// Updated list uses the new Pastor Mike Todd slug
const trending = [
  { name: "Pastor Mike Todd", view: "12.4k", cat: "Crazy Faith", live: true, img: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Bishop T.D. Jakes", view: "45.2k", cat: "Leadership", live: true, img: "/td_avatar.jpg" },
  { name: "Kirk Franklin", view: "8.2k", cat: "Worship Vibes", live: true, img: "/kirk_avatar.webp" },
  { name: "C-Dub", view: "1.5k", cat: "The Shed", live: true, img: "/course_music.jpg" },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex w-64 flex-col fixed left-0 top-14 bottom-0 bg-[#090909] border-r border-white/5 overflow-y-auto p-4 z-30">
      
      {/* SECTION 1: YOUR SQUAD */}
      <div className="mb-8">
        <h3 className="text-[11px] font-extrabold text-gray-500 uppercase mb-4 flex items-center gap-2 tracking-widest">
            <Heart className="w-3 h-3" /> Your Squad
        </h3>
        <div className="space-y-1">
            {trending.slice(0, 3).map((c, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg cursor-pointer group transition">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full border-2 border-transparent group-hover:border-violet-500 relative overflow-hidden transition">
                            <img src={c.img} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                             <div className="text-sm font-bold text-gray-200 group-hover:text-white truncate w-24">{c.name}</div>
                             <div className="text-[10px] text-gray-500 group-hover:text-violet-400">{c.cat}</div>
                        </div>
                    </div>
                    {c.live && (
                        <div className="flex items-center gap-1 text-xs font-bold text-red-500">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            {c.view}
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>

      {/* SECTION 2: POPPING OFF (Simple Repeat for mock) */}
      <div className="mb-6">
        <h3 className="text-[11px] font-extrabold text-gray-500 uppercase mb-4 flex items-center gap-2 tracking-widest">
            <Flame className="w-3 h-3 text-orange-500" /> Popping Off
        </h3>
        <div className="space-y-2">
            {trending.map((c, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg cursor-pointer group transition">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full border border-white/5 relative overflow-hidden">
                             <img src={c.img} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                            <div className="text-sm font-bold text-gray-200 group-hover:text-white truncate w-24">{c.name}</div>
                            <div className="text-[10px] text-gray-500">{c.cat}</div>
                        </div>
                    </div>
                    {c.live && (
                        <div className="bg-white/5 px-2 py-0.5 rounded text-[10px] font-bold text-gray-400">
                            {c.view}
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>
      
      {/* FOOTER */}
      <div className="mt-auto pt-6 border-t border-white/5">
        <button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xs py-3 rounded-lg hover:brightness-110 transition shadow-lg shadow-violet-900/20">
            📡 GO LIVE
        </button>
      </div>
    </aside>
  );
}
"""

# --- 3. UPDATE FEED PAGE (Add Mike Todd TikTok Post) ---
feed_page_code = """ "use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Heart, MessageCircle, Share2, MoreHorizontal, Image as ImageIcon, Play, Send } from "lucide-react";

// Initial Posts (Now includes Mike Todd TikTok)
const initialPosts = [
  {
    id: 1,
    user: { name: "Pastor Mike Todd", handle: "@iammiketodd", avatar: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400", slug: "mike-todd" },
    time: "Just now",
    content: '“NOW faith is the substance of things hoped for...” Your faith is building the world you live in! #MUSTARD #CrazyFaith',
    tags: ["#CrazyFaith", "#Mustard"],
    media: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@iammiketodd/video/7498704340077514014" data-video-id="7498704340077514014" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@iammiketodd" href="https://www.tiktok.com/@iammiketodd?refer=embed">@iammiketodd</a> “NOW faith is the substance of things hoped for, the evidence of things not seen.” ‭‭Hebrews‬ ‭11‬:‭1‬ ‭NKJV‬‬ Your faith is building the world🌎 you live in…  <a title="mustard" target="_blank" href="https://www.tiktok.com/tag/mustard?refer=embed">#MUSTARD</a>! <a title="fyp" target="_blank" href="https://www.tiktok.com/tag/fyp?refer=embed">#fyp</a> <a title="foryoupage" target="_blank" href="https://www.tiktok.com/tag/foryoupage?refer=embed">#foryoupage</a> <a title="christiantiktok" target="_blank" href="https://www.tiktok.com/tag/christiantiktok?refer=embed">#christiantiktok</a>   <a title="crazyfaith" target="_blank" href="https://www.tiktok.com/tag/crazyfaith?refer=embed">#crazyfaith</a>  <a title="itsonlycrazyuntilithappens" target="_blank" href="https://www.tiktok.com/tag/itsonlycrazyuntilithappens?refer=embed">#itsonlycrazyuntilithappens</a>  <a title="focus" target="_blank" href="https://www.tiktok.com/tag/focus?refer=embed">#focus</a>  <a title="represent" target="_blank" href="https://www.tiktok.com/tag/represent?refer=embed">#REPRESENT</a></section> </blockquote>`,
    type: "tiktok",
    likes: "105k", comments: "2.1k", shares: "15k"
  },
  {
    id: 2,
    user: { name: "Bishop T.D. Jakes", handle: "@bishopjakes", avatar: "/td_avatar.jpg", slug: "td-jakes" },
    time: "2h ago",
    content: "Faith + Obedience = Miracles! Stop waiting on God to make it convenient. 🙌🏾 #PottersHouse #Faith",
    tags: ["#Sermon", "#Miracles"],
    media: "https://www.youtube.com/embed/5osAqv0xkLk",
    type: "youtube",
    likes: "15.4k", comments: "890", shares: "5.2k"
  },
  {
    id: 3,
    user: { name: "Jayden Arnold", handle: "@throwsomeorganonit", avatar: "/course_music.jpg", slug: "jayden-arnold" },
    time: "1h ago",
    content: "Jayden Arnold's Soulful Organ... 🔥🎹 #PraiseBreak #MusicianLife #Churchy",
    tags: ["#Organ", "#Shed"],
    media: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DNoqvnev9MI/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"></blockquote>`,
    type: "instagram", 
    likes: "3.4k", comments: "156", shares: "420"
  }
];

export default function FeedPage() {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState(initialPosts);

  // Load External Scripts (TikTok, Instagram)
  useEffect(() => {
    if (!document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
        const tiktokScript = document.createElement("script");
        tiktokScript.src = "https://www.tiktok.com/embed.js";
        tiktokScript.async = true;
        document.body.appendChild(tiktokScript);
    }
    if (!document.querySelector('script[src="//www.instagram.com/embed.js"]')) {
        const igScript = document.createElement("script");
        igScript.src = "//www.instagram.com/embed.js";
        igScript.async = true;
        document.body.appendChild(igScript);
    }
    // Force Instagram to process embeds if they load late
    if (window.instgrm) window.instgrm.Embeds.process();
  }, [posts]);

  // Handle New Post
  const handlePost = () => {
    if (!content) return;
    const newPost = {
        id: posts.length + 1,
        user: { name: "Joshua", handle: "@joshua", avatar: "/td_avatar.jpg", slug: "joshua" }, // User Profile
        time: "Just now",
        content: content,
        tags: ["#MyTestimony"],
        media: null,
        type: "text",
        likes: "0", comments: "0", shares: "0"
    };
    setPosts([newPost, ...posts]);
    setContent("");
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white font-sans">
      <Navbar />
      <div className="flex pt-0">
        <Sidebar />
        <main className="flex-1 lg:ml-64 p-6 flex justify-center">
            
            <div className="w-full max-w-2xl space-y-6">
                {/* CREATE POST INPUT */}
                <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4">
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-500 to-blue-500 shrink-0 overflow-hidden"><img src="/td_avatar.jpg" className="w-full h-full object-cover" /></div>
                        <div className="flex-1"><input type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Drop a testimony or share a clip..." className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 text-sm py-2 outline-none" /></div>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/5">
                        <div className="flex gap-4 text-violet-400">
                            <button className="flex items-center gap-2 text-xs font-bold hover:text-white transition"><ImageIcon className="w-4 h-4" /> Media</button>
                            <button className="flex items-center gap-2 text-xs font-bold hover:text-white transition"><Play className="w-4 h-4" /> Live</button>
                        </div>
                        <button onClick={handlePost} className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 transition">
                            Post <Send className="w-3 h-3" />
                        </button>
                    </div>
                </div>

                {/* POSTS */}
                {posts.map((post) => (
                    <div key={post.id} className="bg-[#111] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition mb-6">
                        <div className="p-4 flex items-center justify-between">
                            {/* PROFILE LINKING FIX */}
                            <Link href={`/creator/${post.user.slug}`} className="flex items-center gap-3 cursor-pointer group">
                                <img src={post.user.avatar} className="w-10 h-10 rounded-full object-cover border border-white/10 group-hover:border-violet-500 transition" />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-sm text-white group-hover:text-violet-400 transition">{post.user.name}</h3>
                                        <span className="text-xs text-gray-500">{post.user.handle}</span>
                                    </div>
                                    <p className="text-[10px] text-gray-400">{post.time}</p>
                                </div>
                            </Link>
                            <button className="text-gray-500 hover:text-white"><MoreHorizontal className="w-5 h-5" /></button>
                        </div>
                        <div className="px-4 pb-3">
                            <p className="text-sm text-gray-200 leading-relaxed">{post.content}</p>
                            <div className="flex gap-2 mt-2">
                                {post.tags.map(tag => (<span key={tag} className="text-violet-400 text-xs font-medium">{tag}</span>))}
                            </div>
                        </div>

                        {/* MEDIA PLAYER SWITCHER */}
                        <div className="relative bg-black w-full flex justify-center">
                            
                            {/* YOUTUBE PLAYER */}
                            {post.type === 'youtube' ? (
                                <iframe className="w-full aspect-video" src={post.media} title="YouTube video player" frameBorder="0" allowFullScreen></iframe>
                            
                            /* INSTAGRAM PLAYER */
                            ) : post.type === 'instagram' ? (
                                <div className="w-full flex justify-center py-2 bg-white" dangerouslySetInnerHTML={{ __html: post.media }} />
                            
                            /* TIKTOK PLAYER */
                            ) : post.type === 'tiktok' ? (
                                <div className="w-full flex justify-center py-2 bg-white" dangerouslySetInnerHTML={{ __html: post.media }} />
                            
                            /* IMAGE/TEXT POST */
                            ) : (
                                null
                            )}
                        </div>
                        <div className="p-4 flex items-center justify-between border-t border-white/5">
                            <div className="flex gap-6">
                                <button className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition group"><Heart className="w-5 h-5 group-hover:fill-red-500" /><span className="text-xs font-bold">{post.likes}</span></button>
                                <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition group"><MessageCircle className="w-5 h-5" /><span className="text-xs font-bold">{post.comments}</span></button>
                                <button className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition group"><Share2 className="w-5 h-5" /><span className="text-xs font-bold">{post.shares}</span></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
      </div>
    </div>
  );
}
"""

# 4. UPDATE SIDEBAR (Final Name Fix)
sidebar_code = """import Link from "next/link";
import { Users, Zap, Radio, Heart, Flame, Compass } from "lucide-react";

// Updated list uses the new Pastor Mike Todd slug
const trending = [
  { name: "Pastor Mike Todd", view: "12.4k", cat: "Crazy Faith", live: true, img: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Bishop T.D. Jakes", view: "45.2k", cat: "Leadership", live: true, img: "/td_avatar.jpg" },
  { name: "Kirk Franklin", view: "8.2k", cat: "Worship Vibes", live: true, img: "/kirk_avatar.webp" },
  { name: "C-Dub", view: "1.5k", cat: "The Shed", live: true, img: "/course_music.jpg" },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex w-64 flex-col fixed left-0 top-14 bottom-0 bg-[#090909] border-r border-white/5 overflow-y-auto p-4 z-30">
      
      <div className="mb-8">
        <h3 className="text-[11px] font-extrabold text-gray-500 uppercase mb-4 flex items-center gap-2 tracking-widest">
            <Heart className="w-3 h-3" /> Your Squad
        </h3>
        <div className="space-y-1">
            {trending.slice(0, 3).map((c, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg cursor-pointer group transition">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full border-2 border-transparent group-hover:border-violet-500 relative overflow-hidden transition">
                            <img src={c.img} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                             <div className="text-sm font-bold text-gray-200 group-hover:text-white truncate w-24">{c.name}</div>
                             <div className="text-[10px] text-gray-500 group-hover:text-violet-400">{c.cat}</div>
                        </div>
                    </div>
                    {c.live && (
                        <div className="flex items-center gap-1 text-xs font-bold text-red-500">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            {c.view}
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>
      <div className="mt-auto pt-6 border-t border-white/5">
        <button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xs py-3 rounded-lg hover:brightness-110 transition shadow-lg shadow-violet-900/20">
            📡 GO LIVE
        </button>
      </div>
    </aside>
  );
}
"""

def write_file(path, content):
    directory = os.path.dirname(path)
    if directory and not os.path.exists(directory):
        os.makedirs(directory)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Updated: {path}")

# EXECUTE
write_file("app/feed/page.tsx", feed_page_code)
write_file("components/Sidebar.tsx", sidebar_code)