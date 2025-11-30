import os

print("🔗 Wiring up Deep Links, Interactive Feed, and New Pages...")

# 1. NEW "BACKSTAGE" CONCERT PAGE (Drilldown from Music Page)
concert_page_code = """import Navbar from "@/components/Navbar";
import { Users, MessageCircle, Heart, Share2, DollarSign, Music, Zap, Play } from "lucide-react";

export default function ConcertPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
        {/* VIDEO PLAYER */}
        <div className="flex-1 flex flex-col bg-black relative">
            <div className="w-full h-full relative">
                <iframe className="w-full h-full" src="https://www.youtube.com/embed/ZJpwRj6E0Dw?autoplay=1&modestbranding=1&rel=0&controls=1&showinfo=0" title="Live Concert" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                <div className="absolute top-6 left-6 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded uppercase tracking-wider animate-pulse">LIVE BACKSTAGE</div>
            </div>
        </div>
        {/* INTERACTIVE SIDEBAR */}
        <div className="w-full lg:w-96 bg-[#0a0a0a] border-l border-white/10 flex flex-col">
            <div className="p-6 border-b border-white/10">
                <h1 className="text-2xl font-black italic uppercase mb-1">Friday Night Fire</h1>
                <p className="text-gray-400 text-xs uppercase font-bold tracking-widest">Official Live Stream</p>
                <div className="flex gap-2 mt-4">
                    <button className="flex-1 bg-white text-black font-bold py-2 rounded text-xs uppercase hover:bg-gray-200">Setlist</button>
                    <button className="flex-1 border border-white/20 text-white font-bold py-2 rounded text-xs uppercase hover:bg-white/10">Merch</button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <div className="text-center text-xs text-gray-500 my-4">--- Live Chat Started ---</div>
                <div className="flex gap-2"><span className="font-bold text-blue-400">DrummerBoy:</span><span className="text-gray-300">That fill was crazy! 🥁</span></div>
                <div className="flex gap-2"><span className="font-bold text-violet-400">SarahSings:</span><span className="text-gray-300">Tone is perfect tonight.</span></div>
            </div>
            <div className="p-4 bg-[#111] border-t border-white/10"><input type="text" placeholder="Send a message..." className="w-full bg-[#050505] border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" /></div>
        </div>
      </main>
    </div>
  );
}
"""

# 2. NEW "VIRTUAL STUDIO" PAGE (Drilldown from Shed Hub)
studio_jam_code = """import Navbar from "@/components/Navbar";
import { Mic, Video, Users, Settings, Volume2, MicOff, VideoOff, PhoneOff } from "lucide-react";

export default function VirtualStudioPage() {
  return (
    <div className="min-h-screen bg-[#111] text-white font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 p-6 flex gap-6">
        {/* MAIN STAGE (Grid of Musicians) */}
        <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center">
                <img src="/course_music.jpg" className="w-full h-full object-cover opacity-60" />
                <div className="absolute bottom-4 left-4 bg-black/60 px-2 py-1 rounded text-xs font-bold">Jamal Keys (Host)</div>
                <div className="absolute top-4 right-4 bg-green-500/20 text-green-400 px-2 py-1 rounded text-[10px] font-bold uppercase border border-green-500/50">Speaking</div>
            </div>
            <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center"><Users className="w-8 h-8 text-gray-500" /></div>
                <div className="absolute bottom-4 left-4 bg-black/60 px-2 py-1 rounded text-xs font-bold">Waiting for Drummer...</div>
            </div>
        </div>
        {/* CONTROLS SIDEBAR */}
        <div className="w-80 bg-[#0a0a0a] rounded-2xl border border-white/10 p-6 flex flex-col">
            <h2 className="text-xl font-bold uppercase tracking-wide mb-6">Session Controls</h2>
            <div className="space-y-4 mb-auto">
                <div className="flex justify-between items-center"><span className="text-sm text-gray-400">Master Volume</span><Volume2 className="w-4 h-4 text-gray-400" /></div>
                <div className="w-full bg-gray-800 h-1 rounded-full"><div className="w-[80%] h-full bg-green-500 rounded-full"></div></div>
                <div className="flex justify-between items-center mt-4"><span className="text-sm text-gray-400">Latency: 12ms</span><span className="text-green-500 text-xs font-bold">Excellent</span></div>
            </div>
            <div className="grid grid-cols-4 gap-2">
                <button className="bg-[#222] hover:bg-[#333] p-3 rounded-xl flex items-center justify-center"><Mic className="w-5 h-5" /></button>
                <button className="bg-[#222] hover:bg-[#333] p-3 rounded-xl flex items-center justify-center"><Video className="w-5 h-5" /></button>
                <button className="bg-[#222] hover:bg-[#333] p-3 rounded-xl flex items-center justify-center"><Settings className="w-5 h-5" /></button>
                <button className="bg-red-600 hover:bg-red-500 p-3 rounded-xl flex items-center justify-center"><PhoneOff className="w-5 h-5" /></button>
            </div>
        </div>
      </main>
    </div>
  );
}
"""

# 3. UPDATED FEED PAGE (Interactive Posting + Profile Links)
feed_page_code = """ "use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { Heart, MessageCircle, Share2, MoreHorizontal, Image as ImageIcon, Play, Send } from "lucide-react";

export default function FeedPage() {
  const [content, setContent] = useState("");
  // Initial Posts
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: { name: "Bishop T.D. Jakes", handle: "@bishopjakes", avatar: "/td_avatar.jpg", slug: "td-jakes" },
      time: "2h ago",
      content: "Faith + Obedience = Miracles! Stop waiting on God to make it convenient. 🙌🏾 #PottersHouse #Faith",
      tags: ["#Sermon", "#Miracles"],
      media: "https://www.youtube.com/embed/5osAqv0xkLk?modestbranding=1&rel=0&controls=1&showinfo=0",
      type: "youtube",
      likes: "15.4k", comments: "890", shares: "5.2k"
    },
    {
      id: 2,
      user: { name: "Jayden Arnold", handle: "@throwsomeorganonit", avatar: "/course_music.jpg", slug: "jayden-arnold" },
      time: "1h ago",
      content: "Jayden Arnold's Soulful Organ... 🔥🎹 #PraiseBreak #MusicianLife #Churchy",
      tags: ["#Organ", "#Shed"],
      media: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DNoqvnev9MI/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"></blockquote>`,
      type: "instagram", 
      likes: "3.4k", comments: "156", shares: "420"
    }
  ]);

  // Load Instagram Script
  useEffect(() => {
    if (!document.querySelector('script[src="//www.instagram.com/embed.js"]')) {
        const script = document.createElement("script");
        script.src = "//www.instagram.com/embed.js";
        script.async = true;
        document.body.appendChild(script);
    }
    if (window.instgrm) window.instgrm.Embeds.process();
  }, [posts]);

  // Handle New Post
  const handlePost = () => {
    if (!content) return;
    const newPost = {
        id: posts.length + 1,
        user: { name: "Joshua", handle: "@joshua", avatar: "/td_avatar.jpg", slug: "joshua" }, // Matches your profile
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
                
                {/* CREATE POST */}
                <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4">
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-500 to-blue-500 shrink-0 overflow-hidden">
                            {/* YOUR AVATAR */}
                            <img src="/td_avatar.jpg" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <input 
                                type="text" 
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Drop a testimony or share a clip..." 
                                className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 text-sm py-2 outline-none"
                            />
                        </div>
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
                        {post.media && (
                            <div className="relative bg-black w-full flex justify-center">
                                {post.type === 'youtube' ? (
                                    <iframe className="w-full aspect-video" src={post.media} title="Video" frameBorder="0" allowFullScreen></iframe>
                                ) : post.type === 'instagram' ? (
                                    <div className="w-full flex justify-center py-2 bg-white" dangerouslySetInnerHTML={{ __html: post.media }} />
                                ) : (
                                    <img src={post.media} className="w-full h-auto object-cover opacity-90" />
                                )}
                            </div>
                        )}
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

# 4. UPDATED HOME PAGE (Link "Upload New Teaching" to Sermon Prep)
home_page_code = """import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { creators } from "@/lib/preachers";
import Link from "next/link";
import { Activity, Users, DollarSign, Music, Mic2, Headphones, Layers, BookOpen, Video, Star, ArrowUpRight, Play, MoreHorizontal } from "lucide-react";

export default function Home() {
  const featuredCreator = creators[0]; 

  return (
    <main className="min-h-screen pb-10 bg-black text-white font-sans">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        {/* HEADER */}
        <div className="mb-10 bg-[#111] border border-white/10 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 border-2 border-white/20 flex items-center justify-center text-xl font-bold">J</div>
                        <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-black"></div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Welcome back, Joshua</h1>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span className="bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Pastor</span>
                            <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Influencer</span>
                            <span>• Kingdom Impact Center</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="text-center px-4 border-r border-white/10"><div className="text-2xl font-bold text-white">12.5k</div><div className="text-[10px] text-gray-500 uppercase tracking-widest">Reach</div></div>
                    <div className="text-center px-4 border-r border-white/10"><div className="text-2xl font-bold text-green-400 flex items-center gap-1"><DollarSign className="w-4 h-4" /> 2.4k</div><div className="text-[10px] text-gray-500 uppercase tracking-widest">Giving</div></div>
                    <div className="text-center px-4"><div className="text-2xl font-bold text-gray-400 flex items-center gap-1">Offline</div><div className="text-[10px] text-gray-500 uppercase tracking-widest">Status</div></div>
                </div>
            </div>
            {/* TOOLS */}
            <div className="mt-6 pt-6 border-t border-white/5">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Creator Tools</h3>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    <Link href="/stream" className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition shrink-0 shadow-lg shadow-red-900/20"><Activity className="w-4 h-4" /> Go Live</Link>
                    <Link href="/tools/sermon-prep" className="flex items-center gap-2 bg-[#222] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#333] transition border border-white/10 shrink-0"><BookOpen className="w-4 h-4 text-violet-400" /> Sermon Notes</Link>
                    <a href="https://loopsbycdubmobile.com/all-loops" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#222] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#333] transition border border-white/10 shrink-0 group"><Layers className="w-4 h-4 text-blue-400" /> Access Loop Library <ArrowUpRight className="w-3 h-3 text-gray-500 group-hover:text-white" /></a>
                    <Link href="/music/shed" className="flex items-center gap-2 bg-[#222] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#333] transition border border-white/10 shrink-0"><Headphones className="w-4 h-4 text-orange-400" /> Schedule Shed</Link>
                    <Link href="/stream" className="flex items-center gap-2 bg-[#222] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#333] transition border border-white/10 shrink-0"><Video className="w-4 h-4 text-green-400" /> Upload Reel</Link>
                </div>
            </div>
        </div>

        {/* TEACHINGS */}
        <div className="mb-10">
            <div className="flex justify-between items-end mb-4"><h2 className="text-xl font-bold text-white flex items-center gap-2"><BookOpen className="w-5 h-5 text-gray-400" /> Recent Teachings</h2><span className="text-xs text-gray-500 font-bold uppercase cursor-pointer hover:text-white">View All</span></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5 hover:border-white/20 transition cursor-pointer group">
                    <div className="flex justify-between items-start mb-3"><span className="bg-violet-900/30 text-violet-300 text-[10px] font-bold px-2 py-1 rounded">Sunday Service</span><MoreHorizontal className="w-4 h-4 text-gray-500" /></div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-violet-400 transition">Walking in Authority</h3><p className="text-xs text-gray-400 mb-4">Streamed 2 days ago • 1.2k Views</p>
                    <div className="flex gap-2"><button className="flex-1 bg-white/5 hover:bg-white/10 py-2 rounded text-xs font-bold text-gray-300">Analytics</button><button className="flex-1 bg-white/5 hover:bg-white/10 py-2 rounded text-xs font-bold text-gray-300">Edit</button></div>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5 hover:border-white/20 transition cursor-pointer group">
                    <div className="flex justify-between items-start mb-3"><span className="bg-blue-900/30 text-blue-300 text-[10px] font-bold px-2 py-1 rounded">Bible Study</span><MoreHorizontal className="w-4 h-4 text-gray-500" /></div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-blue-400 transition">The Power of Prayer</h3><p className="text-xs text-gray-400 mb-4">Streamed 5 days ago • 850 Views</p>
                    <div className="flex gap-2"><button className="flex-1 bg-white/5 hover:bg-white/10 py-2 rounded text-xs font-bold text-gray-300">Analytics</button><button className="flex-1 bg-white/5 hover:bg-white/10 py-2 rounded text-xs font-bold text-gray-300">Edit</button></div>
                </div>
                
                {/* UPLOAD NEW TEACHING -> LINKS TO SERMON PREP */}
                <Link href="/tools/sermon-prep" className="border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition p-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-2"><Play className="w-5 h-5" /></div>
                    <span className="text-sm font-bold uppercase">Upload New Teaching</span>
                </Link>
            </div>
        </div>

        <HeroSection creator={featuredCreator} />
        
        {/* ADS */}
        <div className="mb-8">
            <div className="flex items-center gap-2 mb-4 text-xs font-bold text-yellow-500 uppercase tracking-widest"><Star className="w-4 h-4" /> Featured Events</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/events/kirk-tour" className="relative aspect-[21/9] bg-gray-800 rounded-2xl overflow-hidden group cursor-pointer border border-white/10 hover:border-yellow-500/50 transition">
                    <img src="/kirk_banner.jpg" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-center items-start"><span className="bg-yellow-500 text-black text-[10px] font-black px-2 py-1 rounded uppercase mb-2">Sponsored</span><h2 className="text-3xl font-black italic uppercase mb-2">The Reunion Tour</h2><p className="text-gray-300 mb-4 max-w-sm">Experience Kirk Franklin live in your city.</p><button className="bg-white text-black px-6 py-2 rounded-full font-bold text-xs uppercase hover:bg-gray-200 transition">Get Tickets</button></div>
                </Link>
                <Link href="/events/ils-2025" className="relative aspect-[21/9] bg-gray-800 rounded-2xl overflow-hidden group cursor-pointer border border-white/10 hover:border-violet-500/50 transition">
                    <img src="/td_banner.avif" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-center items-start"><span className="bg-violet-600 text-white text-[10px] font-black px-2 py-1 rounded uppercase mb-2">Conference</span><h2 className="text-3xl font-black italic uppercase mb-2">International Leadership Summit</h2><p className="text-gray-300 mb-4 max-w-sm">Register now for the premier leadership event of 2025.</p><button className="bg-white text-black px-6 py-2 rounded-full font-bold text-xs uppercase hover:bg-gray-200 transition">Register Now</button></div>
                </Link>
            </div>
        </div>
      </div>
    </main>
  );
}
"""

# 5. UPDATE NAVBAR (Right Corner Avatar Fix)
navbar_code = """ "use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/stream", label: "🔴 Stream" },
  { href: "/feed", label: "Feed" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/library", label: "Library" },
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
            const isLive = link.label.includes("🔴");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition hover:text-white uppercase text-xs font-bold tracking-wide ${
                  active ? "text-violet-400 border-b-2 border-violet-500 pb-0.5" : ""
                } ${isLive ? "text-red-500 animate-pulse" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
            <Link href="/dashboard" className="hidden sm:block">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-500 border border-white/20 shadow-lg cursor-pointer hover:scale-110 transition flex items-center justify-center font-bold text-xs">J</div>
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
    print(f"✅ Created/Updated: {path}")

# EXECUTE
write_file("app/events/concert/page.tsx", concert_page_code)
write_file("app/music/shed/jam/page.tsx", studio_jam_code)
write_file("app/feed/page.tsx", feed_page_code)
write_file("app/page.tsx", home_page_code)
write_file("components/Navbar.tsx", navbar_code)