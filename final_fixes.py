import os

print("🛠️ Applying Final Fixes: Home Name, Tools, and Kirk Video...")

# 1. UPDATE HOME PAGE (Name Match + Correct Tools)
home_page_code = """import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { creators } from "@/lib/preachers";
import Link from "next/link";
import { Activity, Users, DollarSign, Music, Mic2, Headphones, Layers, BookOpen, Video, UploadCloud } from "lucide-react";

export default function Home() {
  const featuredCreator = creators[0]; // T.D. Jakes

  return (
    <main className="min-h-screen pb-10 bg-black text-white font-sans">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* MINISTER'S DASHBOARD HEADER */}
        <div className="mb-10 bg-[#111] border border-white/10 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                
                {/* User Info (UPDATED NAME) */}
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border-2 border-white/20 flex items-center justify-center text-xl font-bold">
                            JD
                        </div>
                        <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-black"></div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Welcome, Bishop John Doe</h1>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span className="bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Pastor</span>
                            <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Influencer</span>
                            <span>• Kingdom Impact Center</span>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="flex gap-4">
                    <div className="text-center px-4 border-r border-white/10">
                        <div className="text-2xl font-bold text-white">12.5k</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest">Reach</div>
                    </div>
                    <div className="text-center px-4 border-r border-white/10">
                        <div className="text-2xl font-bold text-green-400 flex items-center gap-1"><DollarSign className="w-4 h-4" /> 2.4k</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest">Giving</div>
                    </div>
                    <div className="text-center px-4">
                        <div className="text-2xl font-bold text-gray-400 flex items-center gap-1">Offline</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest">Status</div>
                    </div>
                </div>
            </div>

            {/* CREATOR TOOLS (UPDATED BUTTONS) */}
            <div className="mt-6 pt-6 border-t border-white/5">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Creator Tools</h3>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    
                    {/* Go Live */}
                    <button className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition shrink-0 shadow-lg shadow-red-900/20">
                        <Activity className="w-4 h-4" /> Go Live
                    </button>

                    {/* Sermon Notes */}
                    <button className="flex items-center gap-2 bg-[#222] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#333] transition border border-white/10 shrink-0">
                        <BookOpen className="w-4 h-4 text-violet-400" /> Sermon Notes
                    </button>

                    {/* Access Loop Library (Linked to Music) */}
                    <Link href="/music" className="flex items-center gap-2 bg-[#222] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#333] transition border border-white/10 shrink-0">
                        <Layers className="w-4 h-4 text-blue-400" /> Access Loop Library
                    </Link>

                    {/* Schedule Shed (Linked to Music) */}
                    <Link href="/music" className="flex items-center gap-2 bg-[#222] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#333] transition border border-white/10 shrink-0">
                        <Headphones className="w-4 h-4 text-orange-400" /> Schedule Shed
                    </Link>

                    {/* Upload Reel */}
                    <button className="flex items-center gap-2 bg-[#222] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#333] transition border border-white/10 shrink-0">
                        <Video className="w-4 h-4 text-green-400" /> Upload Reel
                    </button>

                </div>
            </div>
        </div>

        <HeroSection creator={featuredCreator} />
        
        <h2 className="text-xl font-bold mb-4 mt-8">Trending Ministries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {creators.map(c => (
                <Link href={`/creator/${c.slug}`} key={c.slug} className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition group cursor-pointer">
                    <div className="flex items-center gap-4">
                        <img src={c.avatarUrl} className="w-16 h-16 rounded-full object-cover group-hover:scale-110 transition border-2 border-transparent group-hover:border-violet-500"/>
                        <div>
                            <h3 className="font-bold group-hover:text-violet-400 transition">{c.name}</h3>
                            <p className="text-sm text-gray-400">{c.ministry}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
      </div>
    </main>
  );
}
"""

# 2. UPDATE FEED PAGE (Fix Kirk Video Link)
feed_page_code = """"use client";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Heart, MessageCircle, Share2, MoreHorizontal, Image as ImageIcon, Play, Send } from "lucide-react";

const posts = [
  {
    id: 1,
    user: { name: "Bishop T.D. Jakes", handle: "@bishopjakes", avatar: "/td_avatar.png" },
    time: "2h ago",
    content: "Faith + Obedience = Miracles! Stop waiting on God to make it convenient. 🙌🏾 #PottersHouse #Faith",
    tags: ["#Sermon", "#Miracles"],
    media: "https://www.youtube.com/embed/5osAqv0xkLk?modestbranding=1&rel=0&controls=1&showinfo=0",
    type: "youtube",
    likes: "15.4k",
    comments: "890",
    shares: "5.2k"
  },
  {
    id: 2,
    user: { name: "Jayden Arnold", handle: "@throwsomeorganonit", avatar: "/course_music.jpg" },
    time: "1h ago",
    content: "Jayden Arnold's Soulful Organ... 🔥🎹 #PraiseBreak #MusicianLife #Churchy",
    tags: ["#Organ", "#Shed"],
    media: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DNoqvnev9MI/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"></blockquote>`,
    type: "instagram", 
    likes: "3.4k",
    comments: "156",
    shares: "420"
  },
  {
    id: 3,
    user: { name: "Kirk Franklin", handle: "@kirkfranklin", avatar: "/kirk_avatar.png" },
    time: "4h ago",
    content: "The energy in the room last night was UNMATCHED! 🙌🔥 #KingdomMusic",
    tags: ["#PraiseBreak", "#Concert"],
    // UPDATED VIDEO LINK (Official VEVO Link - usually more stable)
    media: "https://www.youtube.com/embed/ZJpwRj6E0Dw?modestbranding=1&rel=0", 
    type: "youtube",
    likes: "42.1k",
    comments: "2.3k",
    shares: "12k"
  }
];

export default function FeedPage() {
  useEffect(() => {
    if (!document.querySelector('script[src="//www.instagram.com/embed.js"]')) {
        const script = document.createElement("script");
        script.src = "//www.instagram.com/embed.js";
        script.async = true;
        document.body.appendChild(script);
    }
    if (window.instgrm) {
        window.instgrm.Embeds.process();
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white font-sans">
      <Navbar />
      <div className="flex pt-0">
        <Sidebar />
        <main className="flex-1 lg:ml-64 p-6 flex justify-center">
            <div className="w-full max-w-2xl space-y-6">
                <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4">
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-500 to-blue-500 shrink-0" />
                        <div className="flex-1">
                            <input type="text" placeholder="Drop a testimony or share a clip..." className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 text-sm py-2" />
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/5">
                        <div className="flex gap-4 text-violet-400">
                            <button className="flex items-center gap-2 text-xs font-bold hover:text-white transition"><ImageIcon className="w-4 h-4" /> Media</button>
                            <button className="flex items-center gap-2 text-xs font-bold hover:text-white transition"><Play className="w-4 h-4" /> Live</button>
                        </div>
                        <button className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">Post <Send className="w-3 h-3" /></button>
                    </div>
                </div>
                {posts.map((post) => (
                    <div key={post.id} className="bg-[#111] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition mb-6">
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img src={post.user.avatar} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-sm text-white">{post.user.name}</h3>
                                        <span className="text-xs text-gray-500">{post.user.handle}</span>
                                    </div>
                                    <p className="text-[10px] text-gray-400">{post.time}</p>
                                </div>
                            </div>
                            <button className="text-gray-500 hover:text-white"><MoreHorizontal className="w-5 h-5" /></button>
                        </div>
                        <div className="px-4 pb-3">
                            <p className="text-sm text-gray-200 leading-relaxed">{post.content}</p>
                            <div className="flex gap-2 mt-2">
                                {post.tags.map(tag => (<span key={tag} className="text-violet-400 text-xs font-medium">{tag}</span>))}
                            </div>
                        </div>
                        <div className="relative bg-black w-full flex justify-center">
                            {post.type === 'youtube' ? (
                                <iframe className="w-full aspect-video" src={post.media} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            ) : post.type === 'instagram' ? (
                                <div className="w-full flex justify-center py-2 bg-white" dangerouslySetInnerHTML={{ __html: post.media }} />
                            ) : (
                                <img src={post.media} className="w-full h-auto object-cover opacity-90" />
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

def write_file(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Updated: {path}")

write_file("app/page.tsx", home_page_code)
write_file("app/feed/page.tsx", feed_page_code)