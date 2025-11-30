import os

# This is the Raw React Code with the new Image URL hardcoded
content = """import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { creators } from "@/lib/preachers";
import { artists } from "@/lib/artists";
import { Search, Filter, ArrowDown } from "lucide-react";

export default function DiscoverPage() {
  // 1. GENERATE MOCK DATA
  const baseItems = [
    ...creators.map(c => ({ ...c, type: 'preacher', category: 'Ministry' })), 
    ...artists.map(a => ({ ...a, type: 'artist', category: 'Music' }))
  ];
  
  const allStreams = [...baseItems, ...baseItems, ...baseItems, ...baseItems].map((item, i) => ({
    ...item,
    uniqueId: i,
    viewerCount: Math.floor(Math.random() * 15000) + 500,
    isLive: i % 3 === 0,
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

            {/* FEATURED / HERO CAROUSEL (Updated Image) */}
            <div className="mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 <div className="col-span-1 md:col-span-2 aspect-video bg-gradient-to-br from-violet-900 to-black rounded-xl relative overflow-hidden group cursor-pointer border border-white/10">
                    <img src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1600" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-700"/>
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

with open("app/discover/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("✅ FIXED: app/discover/page.tsx has been restored with the new image.")