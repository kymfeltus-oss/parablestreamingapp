import os

files = {
    # 1. NEW SIDEBAR COMPONENT (The Twitch/Kick Left Menu)
    "components/Sidebar.tsx": """import Link from "next/link";
import { Users, Video, Radio, Heart } from "lucide-react";

const recommended = [
  { name: "Bishop Rivers", view: "12.4k", cat: "Leadership", live: true },
  { name: "Kingdom Sound", view: "8.2k", cat: "Worship", live: true },
  { name: "Pastor Hart", view: "5.1k", cat: "Healing", live: true },
  { name: "GamingPastor", view: "2.3k", cat: "Gaming", live: true },
  { name: "YouthNation", view: "1.1k", cat: "Youth", live: false },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex w-64 flex-col fixed left-0 top-14 bottom-0 bg-black border-r border-white/10 overflow-y-auto p-4 z-30">
      
      {/* SECTION 1: FOR YOU */}
      <div className="mb-6">
        <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
            <Heart className="w-3 h-3" /> Followed Channels
        </h3>
        <div className="space-y-1">
            {recommended.slice(0, 3).map((c, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg cursor-pointer group transition">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-800 border border-white/10 relative overflow-hidden">
                             {/* Placeholder Avatar */}
                             <div className="absolute inset-0 bg-gradient-to-tr from-violet-800 to-gray-800" />
                        </div>
                        <div className="text-sm font-medium text-gray-200 group-hover:text-white truncate w-24">{c.name}</div>
                    </div>
                    {c.live && (
                        <div className="flex items-center gap-1 text-xs text-red-500">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                            {c.view}
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>

      {/* SECTION 2: RECOMMENDED */}
      <div className="mb-6">
        <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
            <Video className="w-3 h-3" /> Recommended
        </h3>
        <div className="space-y-1">
            {recommended.map((c, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg cursor-pointer group transition">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-800 border border-white/10 relative overflow-hidden">
                             <div className="absolute inset-0 bg-gradient-to-tr from-blue-800 to-gray-800" />
                        </div>
                        <div className="flex flex-col">
                            <div className="text-sm font-medium text-gray-200 group-hover:text-white truncate w-20">{c.name}</div>
                            <div className="text-[10px] text-gray-500">{c.cat}</div>
                        </div>
                    </div>
                    {c.live && (
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                            {c.view}
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>
      
      {/* FOOTER LINKS */}
      <div className="mt-auto pt-6 border-t border-white/10 text-[10px] text-gray-500 flex flex-wrap gap-2">
        <span>About</span>
        <span>Partners</span>
        <span>Terms</span>
        <span>Privacy</span>
        <span>© 2025 NexusFaith</span>
      </div>
    </aside>
  );
}""",

    # 2. FULL DISCOVER PAGE (The Kick-Style Browse Grid)
    "app/discover/page.tsx": """import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { creators } from "@/lib/preachers";
import { artists } from "@/lib/artists";
import { Search, Filter, ArrowDown } from "lucide-react";

export default function DiscoverPage() {
  // 1. GENERATE MOCK DATA (Simulating lots of streams)
  // We combine preachers and artists, then duplicate them to fill the grid
  const baseItems = [
    ...creators.map(c => ({ ...c, type: 'preacher', category: 'Ministry' })), 
    ...artists.map(a => ({ ...a, type: 'artist', category: 'Music' }))
  ];
  
  // Create a long list to simulate scrolling
  const allStreams = [...baseItems, ...baseItems, ...baseItems, ...baseItems].map((item, i) => ({
    ...item,
    uniqueId: i, // Give unique ID for list
    viewerCount: Math.floor(Math.random() * 15000) + 500, // Random viewers
    isLive: i % 3 === 0, // Randomize live status slightly
    tags: item.tags || [item.genre || "Faith"]
  }));

  const categories = ["All", "Live Now", "Worship", "Teaching", "Youth", "Gaming", "Conferences", "Podcasts"];

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      <Navbar />
      
      <div className="flex pt-0">
        {/* LEFT SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 lg:ml-64 p-6">
            
            {/* CATEGORY FILTER BAR */}
            <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((cat, i) => (
                    <button 
                        key={cat} 
                        className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition ${
                            i === 0 
                            ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20" 
                            : "bg-[#1f1f1f] text-gray-300 hover:bg-[#2f2f2f] hover:text-white"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* FEATURED / HERO CAROUSEL (Mini) */}
            <div className="mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 <div className="col-span-1 md:col-span-2 aspect-video bg-gradient-to-br from-violet-900 to-black rounded-xl relative overflow-hidden group cursor-pointer border border-white/10">
                    <img src={creators[0].bannerUrl} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-700"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6">
                        <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded mb-2 inline-block">FEATURED LIVE</span>
                        <h2 className="text-3xl font-bold">{creators[0].liveStream?.title}</h2>
                        <p className="text-gray-300">{creators[0].name}</p>
                    </div>
                 </div>
                 <div className="hidden lg:block aspect-video bg-[#1f1f1f] rounded-xl p-6 border border-white/10 flex flex-col justify-center items-center text-center">
                    <h3 className="text-xl font-bold mb-2">Join the Community</h3>
                    <p className="text-gray-400 text-sm mb-4">Discover thousands of live ministries and worship events.</p>
                    <button className="bg-white text-black font-bold px-6 py-2 rounded-full hover:bg-gray-200">Sign Up</button>
                 </div>
            </div>

            {/* LIVE CHANNELS GRID */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <span className="text-green-500">●</span> Live Channels
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer hover:text-white">
                    <span>Sort by: Recommended</span>
                    <ArrowDown className="w-4 h-4" />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {allStreams.map((stream) => (
                    <Link href={stream.type === 'preacher' ? `/creator/${stream.slug}` : `/artist/${stream.slug}`} key={stream.uniqueId} className="group cursor-pointer">
                        {/* THUMBNAIL */}
                        <div className="relative aspect-video bg-[#1f1f1f] rounded-lg overflow-hidden mb-3 border border-transparent group-hover:border-violet-500/50 transition">
                            <img 
                                src={stream.featuredStreams?.[0]?.thumbnailUrl || stream.latestRelease?.coverUrl || stream.bannerUrl} 
                                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition duration-500"
                            />
                            <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                                LIVE
                            </div>
                            <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded">
                                {stream.viewerCount.toLocaleString()} viewers
                            </div>
                        </div>

                        {/* INFO */}
                        <div className="flex gap-3">
                            <img src={stream.avatarUrl} className="w-10 h-10 rounded-full object-cover bg-[#2f2f2f]" />
                            <div className="overflow-hidden">
                                <h3 className="font-bold text-white leading-tight truncate group-hover:text-violet-400 transition">
                                    {stream.liveStreamTitle || stream.liveStream?.title || "Live Broadcast"}
                                </h3>
                                <p className="text-sm text-gray-400 hover:underline">{stream.name}</p>
                                <div className="flex gap-1 mt-1">
                                    <span className="text-[10px] bg-[#2f2f2f] text-gray-400 px-2 py-0.5 rounded-full hover:bg-[#3f3f3f]">
                                        {stream.category || "Faith"}
                                    </span>
                                    {stream.tags && stream.tags[0] && (
                                        <span className="text-[10px] bg-[#2f2f2f] text-gray-400 px-2 py-0.5 rounded-full hover:bg-[#3f3f3f]">
                                            {stream.tags[0]}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* LOAD MORE BUTTON */}
            <div className="mt-12 flex justify-center">
                <button className="bg-[#1f1f1f] border border-white/10 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-[#2f2f2f] transition">
                    Show More Channels
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
    print(f"✅ Updated: {filepath}")