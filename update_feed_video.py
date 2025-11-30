import os

print("🎥 Upgrading Feed to support Real Video Playback...")

feed_page_code = """import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Heart, MessageCircle, Share2, MoreHorizontal, Play, Image as ImageIcon, Send, Volume2 } from "lucide-react";

// MOCK DATA: Now using a real video file
const posts = [
  {
    id: 1,
    user: { name: "Jayden Arnold", handle: "@jayden_organ", avatar: "/course_music.jpg" },
    time: "2h ago",
    content: "When the spirit hits the keys! 🙌🎹 Had to let loose on this one. #Soulful #Organ #Churchy",
    tags: ["#PraiseBreak", "#MusicianLife"],
    media: "/praise_break.mp4", // <--- REAL VIDEO FILE
    type: "video",
    likes: "3.4k",
    comments: "156",
    shares: "420"
  },
  {
    id: 2,
    user: { name: "Sarah Grace", handle: "@sarah_worships", avatar: "/course_lead.jpg" },
    time: "4h ago",
    content: "Sometimes you just have to sit in His presence. No words needed today. 🙏✨",
    tags: ["#Worship", "#Stillness"],
    media: "https://images.pexels.com/photos/154147/pexels-photo-154147.jpeg?auto=compress&cs=tinysrgb&w=1200",
    type: "image",
    likes: "892",
    comments: "22",
    shares: "15"
  },
  {
    id: 3,
    user: { name: "Bishop T.D. Jakes", handle: "@bishopjakes", avatar: "/td_avatar.png" },
    time: "6h ago",
    content: "Stop waiting for permission to walk into your destiny. The door is already open!",
    tags: ["#Motivation", "#Purpose"],
    media: "/td_banner.png",
    type: "image",
    likes: "15.4k",
    comments: "890",
    shares: "5.2k"
  }
];

export default function FeedPage() {
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
                    <div key={post.id} className="bg-[#111] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition">
                        
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

                        {/* Content Text */}
                        <div className="px-4 pb-3">
                            <p className="text-sm text-gray-200 leading-relaxed">{post.content}</p>
                            <div className="flex gap-2 mt-2">
                                {post.tags.map(tag => (
                                    <span key={tag} className="text-violet-400 text-xs font-medium">{tag}</span>
                                ))}
                            </div>
                        </div>

                        {/* Media Player */}
                        <div className="relative bg-black w-full">
                            {post.type === 'video' ? (
                                <div className="relative w-full aspect-video">
                                    <video 
                                        src={post.media} 
                                        className="w-full h-full object-cover" 
                                        controls 
                                        loop 
                                        playsInline
                                        poster="https://images.pexels.com/photos/7520999/pexels-photo-7520999.jpeg?auto=compress&cs=tinysrgb&w=1200"
                                    />
                                </div>
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
print("✅ Updated: app/feed/page.tsx")