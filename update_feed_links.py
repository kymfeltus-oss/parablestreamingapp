import os

print("🎥 Linking Feed to YouTube & Instagram...")

feed_page_code = """"use client";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Heart, MessageCircle, Share2, MoreHorizontal, Image as ImageIcon, Play, Send } from "lucide-react";

// MOCK DATA: Using the LINKS you provided
const posts = [
  {
    id: 1,
    user: { name: "Bishop T.D. Jakes", handle: "@bishopjakes", avatar: "/td_avatar.jpg" },
    time: "2h ago",
    content: "Faith + Obedience = Miracles! Stop waiting on God to make it convenient. 🙌🏾 #PottersHouse #Faith",
    tags: ["#Sermon", "#Miracles"],
    // CONVERTED YOUR YOUTUBE SHORT LINK TO AN EMBED
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
    // YOUR INSTAGRAM EMBED CODE
    media: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DNoqvnev9MI/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"></blockquote>`,
    type: "instagram", 
    likes: "3.4k",
    comments: "156",
    shares: "420"
  },
  {
    id: 3,
    user: { name: "Kirk Franklin", handle: "@kirkfranklin", avatar: "/kirk_avatar.webp" },
    time: "4h ago",
    content: "The energy in the room last night was UNMATCHED! 🙌🔥 #KingdomMusic",
    tags: ["#PraiseBreak", "#Concert"],
    // Using a placeholder YouTube video for Kirk since we don't have his file yet
    media: "https://www.youtube.com/embed/F9kXstb9kOE?modestbranding=1&rel=0", 
    type: "youtube",
    likes: "42.1k",
    comments: "2.3k",
    shares: "12k"
  }
];

export default function FeedPage() {
  
  // Load Instagram Script
  useEffect(() => {
    // Check if script already exists to avoid duplicates
    if (!document.querySelector('script[src="//www.instagram.com/embed.js"]')) {
        const script = document.createElement("script");
        script.src = "//www.instagram.com/embed.js";
        script.async = true;
        document.body.appendChild(script);
    }
    // Force Instagram to re-process embeds if they load late
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
                
                {/* CREATE POST */}
                <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4">
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-500 to-blue-500 shrink-0" />
                        <div className="flex-1">
                            <input 
                                type="text" 
                                placeholder="Drop a testimony or share a clip..." 
                                className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 text-sm py-2"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/5">
                        <div className="flex gap-4 text-violet-400">
                            <button className="flex items-center gap-2 text-xs font-bold hover:text-white transition"><ImageIcon className="w-4 h-4" /> Media</button>
                            <button className="flex items-center gap-2 text-xs font-bold hover:text-white transition"><Play className="w-4 h-4" /> Live</button>
                        </div>
                        <button className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
                            Post <Send className="w-3 h-3" />
                        </button>
                    </div>
                </div>

                {/* FEED POSTS */}
                {posts.map((post) => (
                    <div key={post.id} className="bg-[#111] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition mb-6">
                        
                        {/* Header */}
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

                        {/* Content */}
                        <div className="px-4 pb-3">
                            <p className="text-sm text-gray-200 leading-relaxed">{post.content}</p>
                            <div className="flex gap-2 mt-2">
                                {post.tags.map(tag => (
                                    <span key={tag} className="text-violet-400 text-xs font-medium">{tag}</span>
                                ))}
                            </div>
                        </div>

                        {/* MEDIA PLAYER SWITCHER */}
                        <div className="relative bg-black w-full flex justify-center">
                            
                            {/* 1. YOUTUBE PLAYER */}
                            {post.type === 'youtube' ? (
                                <iframe 
                                    className="w-full aspect-video"
                                    src={post.media} 
                                    title="YouTube video player" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                ></iframe>
                            
                            /* 2. INSTAGRAM PLAYER */
                            ) : post.type === 'instagram' ? (
                                <div className="w-full flex justify-center py-2 bg-white" dangerouslySetInnerHTML={{ __html: post.media }} />
                            
                            /* 3. FALLBACK IMAGE */
                            ) : (
                                <img src={post.media} className="w-full h-auto object-cover opacity-90" />
                            )}
                        </div>

                        {/* Actions */}
                        <div className="p-4 flex items-center justify-between border-t border-white/5">
                            <div className="flex gap-6">
                                <button className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition group">
                                    <Heart className="w-5 h-5 group-hover:fill-red-500" />
                                    <span className="text-xs font-bold">{post.likes}</span>
                                </button>
                                <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition group">
                                    <MessageCircle className="w-5 h-5" />
                                    <span className="text-xs font-bold">{post.comments}</span>
                                </button>
                                <button className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition group">
                                    <Share2 className="w-5 h-5" />
                                    <span className="text-xs font-bold">{post.shares}</span>
                                </button>
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

with open("app/feed/page.tsx", "w", encoding="utf-8") as f:
    f.write(feed_page_code)
print("✅ Updated: app/feed/page.tsx with YouTube + Instagram Links")