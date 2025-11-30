import os

print("🎥 Updating Videos on Feed, Dashboard, and Music Page...")

# --- 1. UPDATE FEED PAGE (With Kirk's New Video) ---
feed_page_code = """"use client";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Heart, MessageCircle, Share2, MoreHorizontal, Image as ImageIcon, Play, Send } from "lucide-react";

const posts = [
  {
    id: 1,
    user: { name: "Bishop T.D. Jakes", handle: "@bishopjakes", avatar: "/td_avatar.jpg" },
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
    user: { name: "Kirk Franklin", handle: "@kirkfranklin", avatar: "/kirk_avatar.webp" },
    time: "4h ago",
    content: "Closing out the BET Awards with a Praise-Filled Medley! The energy was UNMATCHED! 🙌🔥 #KingdomMusic",
    tags: ["#PraiseBreak", "#Concert", "#BETAwards"],
    // KIRK FRANKLIN'S NEW VIDEO
    media: "https://www.youtube.com/embed/s9XthutHgB4?modestbranding=1&rel=0&controls=1&showinfo=0", 
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

# --- 2. UPDATE DASHBOARD (Featuring T.D. Jakes Video) ---
dashboard_code = """import Navbar from "@/components/Navbar";
import Link from "next/link";
import { creators } from "@/lib/preachers";
import { artists } from "@/lib/artists";

export default function Dashboard() {
  const liveNow = [creators[0], artists[0]];

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex items-center justify-between mb-8">
            <div><h1 className="text-3xl font-bold">Welcome back, Joshua</h1><p className="text-gray-400">You have 3 new notifications.</p></div>
            <button className="bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm hover:bg-white/20 transition">Edit Profile</button>
        </div>

        {/* FEATURED LIVE VIDEO (T.D. JAKES) */}
        <section className="mb-12">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"/> Live Channels You Follow</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* T.D. JAKES VIDEO CARD */}
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gray-900">
                    <div className="aspect-video w-full">
                        <iframe 
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/5osAqv0xkLk?modestbranding=1&rel=0&controls=1&showinfo=0" 
                            title="T.D. Jakes Live" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                            <img src="/td_avatar.jpg" className="w-10 h-10 rounded-full border-2 border-white" />
                            <div>
                                <span className="font-bold block text-lg">Bishop T.D. Jakes</span>
                                <span className="text-xs text-red-500 font-bold uppercase">● Live Now</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mb-1">Faith + Obedience = Miracles!</h3>
                        <p className="text-gray-400 text-sm">Join 15.4k others in this powerful word.</p>
                    </div>
                </div>

                {/* KIRK FRANKLIN CARD (Still clickable to profile) */}
                <Link href="/artist/kirk-franklin" className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gray-900 hover:border-violet-500/50 transition duration-300">
                    <div className="absolute inset-0">
                        <img src="/kirk_banner.jpg" className="h-full w-full object-cover opacity-50 group-hover:scale-105 transition duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    </div>
                    <div className="relative p-6 h-64 flex flex-col justify-end">
                        <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg">LIVE</div>
                        <div className="flex items-center gap-3 mb-2">
                            <img src="/kirk_avatar.webp" className="w-10 h-10 rounded-full border-2 border-white" />
                            <span className="font-bold">Kirk Franklin</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-1 leading-tight">Father's Day Tour Live</h3>
                        <p className="text-gray-300 text-sm">8.2k viewers • Started 20m ago</p>
                    </div>
                </Link>
            </div>
        </section>

        {/* LIBRARY */}
        <section className="mb-12">
             <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-bold">Your Library</h2><span className="text-sm text-gray-400 cursor-pointer hover:text-white">View All</span></div>
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <Link href="/library/leadership" className="bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 cursor-pointer transition group"><div className="aspect-[3/4] bg-gray-800 rounded-lg mb-3 relative overflow-hidden"><img src="/course_lead.jpg" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" /><div className="absolute inset-0 bg-black/20" /></div><p className="font-medium text-sm truncate group-hover:text-violet-400 transition">Leadership Masterclass</p><p className="text-xs text-green-400">Purchased</p></Link>
                <Link href="/library/vision" className="bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 cursor-pointer transition group"><div className="aspect-[3/4] bg-gray-800 rounded-lg mb-3 relative overflow-hidden"><img src="/course_conf.jpg" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" /><div className="absolute inset-0 bg-black/20" /></div><p className="font-medium text-sm truncate group-hover:text-violet-400 transition">2024 Vision Conference</p><p className="text-xs text-green-400">Purchased</p></Link>
                <Link href="/library/worship" className="bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 cursor-pointer transition group"><div className="aspect-[3/4] bg-gray-800 rounded-lg mb-3 relative overflow-hidden"><img src="/course_music.jpg" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" /><div className="absolute inset-0 bg-black/20" /></div><p className="font-medium text-sm truncate group-hover:text-violet-400 transition">Worship Arts Vol. 2</p><p className="text-xs text-green-400">Purchased</p></Link>
             </div>
        </section>
      </main>
    </div>
  );
}
"""

# --- 3. UPDATE MUSIC PAGE (Featuring Kirk Franklin Video) ---
music_page_code = """import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Flame, Mic2, Music2, Play, Headphones, Speaker, Download, Zap } from "lucide-react";

export default function MusicPage() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white font-sans pb-20">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* HERO: KIRK FRANKLIN VIDEO */}
        <div className="relative mb-12 overflow-hidden rounded-3xl border-2 border-transparent hover:border-violet-500/50 transition duration-500 group bg-black">
            <div className="aspect-video w-full h-[60vh]">
                <iframe 
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/s9XthutHgB4?autoplay=1&mute=1&controls=1&showinfo=0&modestbranding=1" 
                    title="Kirk Franklin BET Awards" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                ></iframe>
            </div>
            
            {/* OVERLAY TEXT (Positioned over video) */}
            <div className="absolute bottom-0 left-0 w-full p-10 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none">
                <div className="max-w-3xl pointer-events-auto">
                    <div className="inline-flex items-center gap-2 rounded bg-red-600 px-3 py-1 text-xs font-black uppercase tracking-wider text-white mb-4 animate-pulse">
                        ● Live Performance
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-2">Kirk Franklin</h1>
                    <p className="text-xl text-gray-200 mb-6 font-medium">Closes Out the BET Awards With a Praise-Filled Medley</p>
                    <div className="flex gap-4">
                        <button className="rounded-full bg-white text-black px-8 py-3 font-extrabold uppercase tracking-wide hover:bg-gray-200 transition shadow-[0_0_20px_rgba(255,255,255,0.4)] flex items-center gap-2">
                            <Play className="w-4 h-4 fill-black" /> Full Concert
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* THE SHED */}
        <div className="relative mb-12 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-gray-900 to-black">
            <div className="absolute inset-0 bg-[url('/course_music.jpg')] opacity-30 bg-cover bg-center"></div>
            <div className="relative p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-xl">
                    <div className="flex items-center gap-2 mb-2 text-orange-500 font-bold tracking-widest uppercase text-xs">
                        <Headphones className="w-4 h-4" /> The Shed
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black italic uppercase leading-none mb-4">Sharpen Your Gift</h1>
                    <p className="text-gray-400 mb-6">Join live shed sessions, download stems, and get the latest tools from legends like Carlton Whitfield (C-Dub).</p>
                    <button className="bg-orange-600 hover:bg-orange-500 text-white font-extrabold px-8 py-3 rounded-full uppercase tracking-wide transition shadow-lg shadow-orange-600/20">Enter The Shed</button>
                </div>
                <div className="bg-black/60 border border-white/10 p-6 rounded-2xl backdrop-blur-md max-w-sm w-full transform hover:scale-105 transition duration-300 cursor-pointer shadow-2xl">
                    <div className="flex justify-between items-start mb-4">
                        <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded">FEATURED TOOL</span>
                        <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    </div>
                    <div className="h-40 bg-gray-800 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
                        <img src="/cdub_tool.jpg" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-xl font-bold mb-1 text-white">Whoop Triggerz Plus</h3>
                    <p className="text-sm text-gray-400 mb-4">By C-Dub. Back up the preacher instantly.</p>
                    <div className="flex justify-between items-center border-t border-white/10 pt-4">
                        <span className="font-bold text-lg text-white">$24.99/mo</span>
                        <span className="text-blue-400 text-xs font-bold uppercase hover:underline">Get It Now</span>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
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
write_file("app/dashboard/page.tsx", dashboard_code)
write_file("app/music/page.tsx", music_page_code