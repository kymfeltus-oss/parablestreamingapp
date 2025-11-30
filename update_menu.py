import os

print("📝 Updating Discover Page Menu...")

discover_page_code = """import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { creators } from "@/lib/preachers";
import { artists } from "@/lib/artists";
import { Users, PlayCircle, Zap } from "lucide-react";

const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, '-');

export default function DiscoverPage() {
  const mainCreator = creators[0]; // Bishop T.D. Jakes

  // Combine lists for the grid
  const allStreams = [...creators, ...artists];

  const categories = ["All", "Just Chatting", "Worship", "Real Talk", "Gaming", "Deep Dives", "Music"];

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white font-sans">
      <Navbar />

      <div className="flex pt-0">
        <Sidebar />

        <main className="flex-1 lg:ml-64 p-6">

            {/* DRILLDOWN CATEGORY MENU */}
            <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((cat, i) => (
                    <Link
                        key={cat}
                        href={`/discover/${normalize(cat)}`}
                        className={`whitespace-nowrap px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition ${
                            i === 0 ? "bg-white text-black" : "bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a] hover:text-white"
                        }`}
                    >
                        {cat}
                    </Link>
                ))}
            </div>

            {/* HERO: BISHOP T.D. JAKES */}
            <div className="mb-12">
                 <Link href={`/creator/${mainCreator.slug}`}>
                     <div className="aspect-video bg-[#111] rounded-xl relative overflow-hidden group cursor-pointer border-2 border-transparent hover:border-violet-500/50 transition duration-300 shadow-2xl">

                        {/* HERO IMAGE */}
                        <img src={mainCreator.bannerUrl} className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition duration-700"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                        {/* LIVE BADGE */}
                        {mainCreator.liveStream?.isLive && (
                        <div className="absolute top-6 left-6 flex items-center gap-3">
                            <span className="bg-red-600 text-white text-[10px] font-extrabold px-3 py-1 rounded uppercase tracking-wider shadow-lg animate-pulse">
                                LIVE NOW
                            </span>
                            <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded flex items-center gap-2">
                                <Users className="w-3 h-3" /> {mainCreator.liveStream.viewers.toLocaleString()} Locked In
                            </span>
                        </div>
                        )}

                        {/* CONTENT INFO */}
                        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black to-transparent">
                            <div className="flex items-end justify-between">
                                <div className="max-w-2xl">
                                    <div className="flex items-center gap-3 mb-3">
                                        <img src={mainCreator.avatarUrl} className="w-10 h-10 rounded-full border-2 border-white shadow-lg" />
                                        <h3 className="text-violet-400 font-bold text-lg">{mainCreator.name}</h3>
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-black italic tracking-tight mb-2 uppercase leading-none text-white drop-shadow-lg">
                                        {mainCreator.liveStream?.title}
                                    </h1>
                                    <p className="text-gray-300 line-clamp-2 text-sm md:text-base font-medium">
                                        {mainCreator.shortTagline}
                                    </p>
                                </div>
                                <button className="hidden md:flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-8 py-4 rounded-xl font-bold uppercase text-sm tracking-wider transition shadow-[0_0_30px_rgba(124,58,237,0.5)] transform group-hover:scale-105">
                                    <PlayCircle className="w-5 h-5" /> Watch Stream
                                </button>
                            </div>
                        </div>
                     </div>
                 </Link>
            </div>

            {/* TRENDING GRID */}
            <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-black uppercase italic tracking-tighter flex items-center gap-2">
                    <span className="text-orange-500">●</span> Trending Live
                </h2>
                <div className="h-px flex-1 bg-white/10"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
                {allStreams.slice(1).map((item: any, i) => (
                    <Link href={item.ministry ? `/creator/${item.slug}` : `/artist/${item.slug}`} key={i} className="group cursor-pointer">
                        <div className="relative aspect-video bg-[#111] rounded-xl overflow-hidden mb-3 ring-2 ring-transparent group-hover:ring-violet-500 transition duration-300">
                            <img
                                src={item.bannerUrl}
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            />
                            {item.liveStream?.isLive && <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase">LIVE</div>}
                            <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                                <Users className="w-3 h-3 text-violet-400" />
                                {item.liveStream?.viewers.toLocaleString() || 0}
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <img src={item.avatarUrl} className="w-10 h-10 rounded-full object-cover bg-[#222]" />
                            <div>
                                <h3 className="font-bold text-gray-100 text-[14px] leading-tight group-hover:text-violet-400 transition">
                                    {item.liveStream?.title || item.name}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">{item.ministry || item.genre}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
      </div>
    </div>
  );
}
"""

with open("app/discover/page.tsx", "w", encoding="utf-8") as f:
    f.write(discover_page_code)
print("✅ Updated: app/discover/page.tsx")