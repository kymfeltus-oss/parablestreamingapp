import os

print("📱 Building the Community Feed...")

# 1. NEW FEED PAGE
feed_page_code = """import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Heart, MessageCircle, Share2, MoreHorizontal, Play, Image as ImageIcon, Send } from "lucide-react";

// MOCK DATA: SOCIAL POSTS
const posts = [
  {
    id: 1,
    user: { name: "Jamal Keys", handle: "@j_keys_official", avatar: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=400" },
    time: "2h ago",
    content: "That organ change at the 2:30 mark was NASTY! 🔥🎹 Had to clip this from Sunday service. Who else felt that shift?",
    tags: ["#PraiseBreak", "#MusicianLife", "#Churchy"],
    media: "https://images.pexels.com/photos/7520999/pexels-photo-7520999.jpeg?auto=compress&cs=tinysrgb&w=1200", // Organist
    type: "video",
    likes: "1.2k",
    comments: "45",
    shares: "120"
  },
  {
    id: 2,
    user: { name: "Sarah Grace", handle: "@sarah_worships", avatar: "https://images.pexels.com/photos/3775131/pexels-photo-3775131.jpeg?auto=compress&cs=tinysrgb&w=400" },
    time: "4h ago",
    content: "Sometimes you just have to sit in His presence. No words needed today. 🙏✨",
    tags: ["#Worship", "#Stillness", "#Devotion"],
    media: "https://images.pexels.com/photos/154147/pexels-photo-154147.jpeg?auto=compress&cs=tinysrgb&w=1200", // Worship crowd
    type: "image",
    likes: "892",
    comments: "22",
    shares: "15"
  },
  {
    id: 3,
    user: { name: "Bishop T.D. Jakes", handle: "@bishopjakes", avatar: "/td_avatar.png" },
    time: "6h ago",
    content: "Stop waiting for permission to walk into your destiny. The door is already open, you just have to step through! 🚪💨",
    tags: ["#Motivation", "#Purpose", "#SermonClip"],
    media: "/td_banner.png", // Using your real image
    type: "video",
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

                        {/* Media */}
                        {post.media && (
                            <div className="relative aspect-video bg-black cursor-pointer group">
                                <img src={post.media} className="w-full h-full object-cover opacity-90" />
                                {post.type === 'video' && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition">
                                        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition">
                                            <Play className="w-6 h-6 fill-white text-white ml-1" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

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

# 2. UPDATE NAVBAR (Add Feed Link)
navbar_code = """ "use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/feed", label: "Community Feed" }, // <--- NEW TAB
  { href: "/dashboard", label: "My Dashboard" },
  { href: "/music", label: "Music" },
  { href: "/discover", label: "Discover" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur-xl text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-xs font-bold text-white shadow-[0_0_15px_rgba(124,58,237,0.5)]">
            NF
          </span>
          <span className="text-sm font-semibold tracking-wide text-white sm:text-base">
            NexusFaith
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm text-gray-300">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition hover:text-white uppercase text-xs font-bold tracking-wide ${
                  active ? "text-violet-400 border-b-2 border-violet-500 pb-0.5" : ""
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
            <Link href="/dashboard" className="hidden sm:block">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-500 border border-white/20 shadow-lg cursor-pointer hover:scale-110 transition" />
            </Link>
        </div>
      </div>
    </header>
  );
}
"""

def write_file(path, content):
    directory = os.path.dirname(path)
    if directory and not os.path.exists(directory):
        os.makedirs(directory)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Created: {path}")

# EXECUTE
write_file("app/feed/page.tsx", feed_page_code)
write_file("components/Navbar.tsx", navbar_code)