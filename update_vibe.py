import os

files = {
    # 1. NEW "HYPE" SIDEBAR
    "components/Sidebar.tsx": """import Link from "next/link";
import { Users, Zap, Radio, Heart, Flame, Compass } from "lucide-react";

const trending = [
  { name: "Bishop Rivers", view: "12.4k", cat: "Real Talk", live: true },
  { name: "Kingdom Sound", view: "8.2k", cat: "Worship Vibes", live: true },
  { name: "Pastor Hart", view: "5.1k", cat: "Healing", live: true },
  { name: "GamingPastor", view: "2.3k", cat: "Ranked", live: true },
  { name: "YouthNation", view: "1.1k", cat: "The Gen", live: false },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex w-64 flex-col fixed left-0 top-14 bottom-0 bg-[#090909] border-r border-white/5 overflow-y-auto p-4 z-30">
      
      {/* SECTION 1: YOUR SQUAD (Following) */}
      <div className="mb-8">
        <h3 className="text-[11px] font-extrabold text-gray-500 uppercase mb-4 flex items-center gap-2 tracking-widest">
            <Heart className="w-3 h-3" /> Your Squad
        </h3>
        <div className="space-y-1">
            {trending.slice(0, 3).map((c, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg cursor-pointer group transition">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-800 border-2 border-transparent group-hover:border-violet-500 relative overflow-hidden transition">
                             {/* Placeholder Avatar */}
                             <div className="absolute inset-0 bg-gradient-to-tr from-violet-800 to-black" />
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

      {/* SECTION 2: POPPING OFF (Recommended) */}
      <div className="mb-6">
        <h3 className="text-[11px] font-extrabold text-gray-500 uppercase mb-4 flex items-center gap-2 tracking-widest">
            <Flame className="w-3 h-3 text-orange-500" /> Popping Off
        </h3>
        <div className="space-y-2">
            {trending.map((c, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg cursor-pointer group transition">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-800 border border-white/5 relative overflow-hidden">
                             <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 to-black" />
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
}""",

    # 2. DISCOVER PAGE (The Streamer Vibe Rewrite)
    "app/discover/page.tsx": """import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { creators } from "@/lib/preachers";
import { artists } from "@/lib/artists";
import { Search, Filter, ArrowDown, Zap, MessageCircle } from "lucide-react";

export default function DiscoverPage() {
  // 1. GENERATE MOCK DATA
  const baseItems = [
    ...creators.map(c => ({ ...c, type: 'preacher', category: 'Real Talk' })), 
    ...artists.map(a => ({ ...a, type: 'artist', category: 'Worship Vibes' }))
  ];
  
  const allStreams = [...baseItems, ...baseItems, ...baseItems, ...baseItems].map((item, i) => ({
    ...item,
    uniqueId: i,
    viewerCount: (Math.floor(Math.random() * 15) + 1) + "." + (Math.floor(Math.random() * 9)) + "k", // "12.5k" format
    isLive: i % 3 === 0,
    tags: ["#Faith", "#Grind", "#Blessed"]
  }));

  // GEN Z / STREAMER CATEGORIES
  const categories = ["🔥 All", "Just Chatting", "Worship Vibes", "Real Talk", "Gaming", "Deep Dives", "Beats"];

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white font-sans">
      <Navbar />
      
      <div className="flex pt-0">
        <Sidebar />

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 lg:ml-64 p-6">
            
            {/* VIBE FILTERS */}
            <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((cat, i) => (
                    <button 
                        key={cat} 
                        className={`whitespace-nowrap px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition ${
                            i === 0 
                            ? "bg-white text-black" 
                            : "bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a] hover:text-white"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* HERO: THE "BIG STREAM" */}
            <div className="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
                 {/* Main Video Card */}
                 <div className="col-span-1 lg:col-span-2 aspect-video bg-[#111] rounded-xl relative overflow-hidden group cursor-pointer border-2 border-transparent hover:border-violet-500/50 transition duration-300">
                    <img src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1600" className="absolute inset-0 w-full h-full object-cover opacity-90"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    
                    {/* Live Badge */}
                    <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-extrabold px-3 py-1 rounded uppercase tracking-wider shadow-lg shadow-red-600/20">
                        LIVE NOW
                    </div>

                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
                        <div className="flex items-end justify-between">
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-black italic tracking-tight mb-2 uppercase">{creators[0].liveStream?.title}</h2>
                                <div className="flex items-center gap-3">
                                    <img src={creators[0].avatarUrl} className="w-8 h-8 rounded-full border border-white/50" />
                                    <span className="font-bold text-violet-400">{creators[0].name}</span>
                                    <span className="text-gray-400 text-sm">•</span>
                                    <span className="text-gray-400 text-sm">Just Chatting</span>
                                </div>
                            </div>
                            <button className="hidden sm:block bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-lg font-bold uppercase text-xs tracking-wider transition shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                                Watch Stream
                            </button>
                        </div>
                    </div>
                 </div>

                 {/* "Join the Fam" Side Card */}
                 <div className="hidden lg:flex flex-col justify-center items-center text-center bg-[#111] rounded-xl p-8 border border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                    <Zap className="w-12 h-12 text-yellow-400 mb-4 animate-pulse" />
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-2">Join the Squad</h3>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                        Don't just watch. Unlock exclusive badges, emotes, and prayer rooms.
                    </p>
                    <button className="w-full bg-white text-black font-extrabold px-6 py-3 rounded-lg hover:bg-gray-200 uppercase text-xs tracking-widest transition">
                        Create Account
                    </button>
                    <p className="text-[10px] text-gray-500 mt-4">Already locked in? <span className="text-white underline cursor-pointer">Login</span></p>
                 </div>
            </div>

            {/* LIVE GRID */}
            <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-black uppercase italic tracking-tighter flex items-center gap-2">
                    <span className="text-red-500 animate-pulse">●</span> Trending Live
                </h2>
                <div className="h-px flex-1 bg-white/10"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
                {allStreams.map((stream) => (
                    <Link href={stream.type === 'preacher' ? `/creator/${stream.slug}` : `/artist/${stream.slug}`} key={stream.uniqueId} className="group cursor-pointer">
                        {/* THUMBNAIL */}
                        <div className="relative aspect-video bg-[#111] rounded-xl overflow-hidden mb-3 ring-2 ring-transparent group-hover:ring-violet-500 transition duration-300">
                            <img 
                                src={stream.featuredStreams?.[0]?.thumbnailUrl || stream.latestRelease?.coverUrl || stream.bannerUrl} 
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            />
                            <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase">
                                LIVE
                            </div>
                            <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                                <Users className="w-3 h-3 text-violet-400" />
                                {stream.viewerCount} locked in
                            </div>
                        </div>

                        {/* INFO */}
                        <div className="flex gap-3">
                            <div className="relative">
                                <img src={stream.avatarUrl} className="w-10 h-10 rounded-full object-cover bg-[#222] ring-2 ring-[#111] group-hover:ring-violet-500 transition" />
                                {stream.isLive && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></span>}
                            </div>
                            <div className="overflow-hidden">
                                <h3 className="font-bold text-gray-100 leading-tight truncate group-hover:text-violet-400 transition text-[15px]">
                                    {stream.liveStreamTitle || stream.liveStream?.title || "Chill Stream & Prayer 🙏"}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1 hover:text-white transition">{stream.name}</p>
                                <div className="flex flex-wrap gap-1 mt-1.5">
                                    <span className="text-[10px] bg-[#222] text-gray-400 px-2 py-0.5 rounded hover:bg-[#333] transition font-medium">
                                        {stream.category}
                                    </span>
                                    {stream.tags.map((tag: string) => (
                                        <span key={tag} className="text-[10px] bg-[#222] text-violet-300/80 px-2 py-0.5 rounded hover:bg-[#333] transition font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* LOAD MORE BUTTON */}
            <div className="mt-16 pb-10 flex justify-center">
                <button className="bg-[#111] border border-white/10 text-gray-300 px-10 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#222] hover:text-white transition hover:scale-105">
                    Load More Vibes
                </button>
            </div>

        </main>
      </div>
    </div>
  );
}"""
}

for filepath, content in files.items():
    directory = os.path.dirname(filepath)
    if directory and not os.path.exists(directory):
        os.makedirs(directory)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Updated Vibe in: {filepath}")