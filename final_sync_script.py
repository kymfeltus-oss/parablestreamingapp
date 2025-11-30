import os

print("🔥 MASTER SYNC: FORCING ALL LINGERING UPDATES...")

# Helper function to write files
def write_file(path, content):
    directory = os.path.dirname(path)
    if directory and not os.path.exists(directory):
        os.makedirs(directory)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Updated: {path}")

# --- 1. UPDATE SIDEBAR (Fixes "Bishop Rivers" to "Pastor Mike Todd") ---
sidebar_code = """import Link from "next/link";
import { Users, Zap, Radio, Heart, Flame, Compass } from "lucide-react";

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

# --- 2. UPDATE HOME PAGE (Fixes All Links and Adds Gamification) ---
home_page_code = """import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { creators } from "@/lib/preachers";
import Link from "next/link";
import { Activity, Users, DollarSign, Music, Mic2, Headphones, Layers, BookOpen, Video, Star, ArrowUpRight, Play, MoreHorizontal, Zap } from "lucide-react";

export default function Home() {
  const featuredCreator = creators[0]; 

  return (
    <main className="min-h-screen pb-10 bg-black text-white font-sans">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* DASHBOARD HEADER (NOW WITH GAMIFICATION) */}
        <div className="mb-10 bg-[#111] border border-white/10 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                
                {/* User Info (Joshua + XP Bar) */}
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 border-2 border-white/20 flex items-center justify-center text-xl font-bold">J</div>
                        <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-black"></div>
                    </div>
                    
                    {/* NAME & XP BAR */}
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold text-white">Welcome back, Joshua</h1>
                        
                        {/* XP BAR */}
                        <div className="flex items-center gap-3 mt-1">
                            <div className="flex items-center gap-1 text-sm font-bold text-gray-300">
                                <Zap className="w-3 h-3 text-yellow-400 fill-yellow-400" /> Lvl 12
                            </div>
                            <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full w-[75%] bg-yellow-500 rounded-full"></div>
                            </div>
                            <span className="text-xs text-gray-500">75% to Lvl 13</span>
                        </div>

                        {/* ROLES / BADGES */}
                        <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
                            <span className="bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Pastor</span>
                            <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Influencer</span>
                            <span>• Kingdom Impact Center</span>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="flex gap-4">
                    <div className="text-center px-4 border-r border-white/10"><div className="text-2xl font-bold text-white">12.5k</div><div className="text-[10px] text-gray-500 uppercase tracking-widest">Reach</div></div>
                    <div className="text-center px-4 border-r border-white/10"><div className="text-2xl font-bold text-green-400 flex items-center gap-1"><DollarSign className="w-4 h-4" /> 2.4k</div><div className="text-[10px] text-gray-500 uppercase tracking-widest">Giving</div></div>
                    <div className="text-center px-4"><div className="text-2xl font-bold text-gray-400 flex items-center gap-1">Offline</div><div className="text-[10px] text-gray-500 uppercase tracking-widest">Status</div></div>
                </div>
            </div>

            {/* CREATOR TOOLS (FINAL LINKS) */}
            <div className="mt-6 pt-6 border-t border-white/5">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Creator Tools</h3>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    
                    <Link href="/stream" className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition shrink-0 shadow-lg shadow-red-900/20">
                        <Activity className="w-4 h-4" /> Go Live
                    </Link>

                    <Link href="/tools/sermon-prep" className="flex items-center gap-2 bg-[#222] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#333] transition border border-white/10 shrink-0">
                        <BookOpen className="w-4 h-4 text-violet-400" /> Sermon Notes
                    </Link>

                    <a href="https://loopsbycdubmobile.com/all-loops" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#222] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#333] transition border border-white/10 shrink-0 group">
                        <Layers className="w-4 h-4 text-blue-400" /> Access Loop Library <ArrowUpRight className="w-3 h-3 text-gray-500 group-hover:text-white" />
                    </a>

                    <Link href="/music/shed/start" className="flex items-center gap-2 bg-[#222] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#333] transition border border-white/10 shrink-0">
                        <Headphones className="w-4 h-4 text-orange-400" /> Schedule Shed
                    </Link>

                    <Link href="/stream" className="flex items-center gap-2 bg-[#222] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#333] transition border border-white/10 shrink-0">
                        <Video className="w-4 h-4 text-green-400" /> Upload Reel
                    </Link>

                </div>
            </div>
        </div>
        
        {/* RECENT TEACHINGS (All links correct) */}
        <div className="mb-10">
            <div className="flex justify-between items-end mb-4"><h2 className="text-xl font-bold text-white flex items-center gap-2"><BookOpen className="w-5 h-5 text-gray-400" /> Recent Teachings</h2><span className="text-xs text-gray-500 font-bold uppercase cursor-pointer hover:text-white">View All</span></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5 hover:border-white/20 transition cursor-pointer group"><div className="flex justify-between items-start mb-3"><span className="bg-violet-900/30 text-violet-300 text-[10px] font-bold px-2 py-1 rounded">Sunday Service</span><MoreHorizontal className="w-4 h-4 text-gray-500" /></div><h3 className="font-bold text-lg mb-1 group-hover:text-violet-400 transition">Walking in Authority</h3><p className="text-xs text-gray-400 mb-4">Streamed 2 days ago • 1.2k Views</p></div>
                <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5 hover:border-white/20 transition cursor-pointer group"><div className="flex justify-between items-start mb-3"><span className="bg-blue-900/30 text-blue-300 text-[10px] font-bold px-2 py-1 rounded">Bible Study</span><MoreHorizontal className="w-4 h-4 text-gray-500" /></div><h3 className="font-bold text-lg mb-1 group-hover:text-blue-400 transition">The Power of Prayer</h3><p className="text-xs text-gray-400 mb-4">Streamed 5 days ago • 850 Views</p></div>
                <Link href="/tools/sermon-prep" className="border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition p-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-2"><Play className="w-5 h-5" /></div>
                    <span className="text-sm font-bold uppercase">Upload New Teaching</span>
                </Link>
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

def write_file(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Updated: {path}")

# EXECUTE
write_file("app/page.tsx", home_page_code)