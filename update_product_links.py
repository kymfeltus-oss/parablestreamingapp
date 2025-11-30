import os

print("🔗 Updating C-Dub Product Links...")

# 1. UPDATE HOME PAGE (Creator Tools)
home_page_code = """import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { creators } from "@/lib/preachers";
import Link from "next/link";
import { Activity, Users, DollarSign, Music, Mic2, Headphones, Layers, BookOpen, Video, Star, ArrowUpRight } from "lucide-react";

export default function Home() {
  const featuredCreator = creators[0]; 

  return (
    <main className="min-h-screen pb-10 bg-black text-white font-sans">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* MINISTER'S DASHBOARD HEADER */}
        <div className="mb-10 bg-[#111] border border-white/10 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border-2 border-white/20 flex items-center justify-center text-xl font-bold">
                            JD
                        </div>
                        <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-black"></div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Welcome, Bishop John Doe</h1>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span className="bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Pastor</span>
                            <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Influencer</span>
                            <span>• Kingdom Impact Center</span>
                        </div>
                    </div>
                </div>
                
                {/* Stats */}
                <div className="flex gap-4">
                    <div className="text-center px-4 border-r border-white/10">
                        <div className="text-2xl font-bold text-white">12.5k</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest">Reach</div>
                    </div>
                    <div className="text-center px-4 border-r border-white/10">
                        <div className="text-2xl font-bold text-green-400 flex items-center gap-1"><DollarSign className="w-4 h-4" /> 2.4k</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest">Giving</div>
                    </div>
                    <div className="text-center px-4">
                        <div className="text-2xl font-bold text-gray-400 flex items-center gap-1">Offline</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest">Status</div>
                    </div>
                </div>
            </div>

            {/* CREATOR TOOLS */}
            <div className="mt-6 pt-6 border-t border-white/5">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Creator Tools</h3>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    
                    <button className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition shrink-0 shadow-lg shadow-red-900/20">
                        <Activity className="w-4 h-4" /> Go Live
                    </button>

                    <button className="flex items-center gap-2 bg-[#222] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#333] transition border border-white/10 shrink-0">
                        <BookOpen className="w-4 h-4 text-violet-400" /> Sermon Notes
                    </button>

                    {/* LINK 1: LOOPS BY C-DUB */}
                    <a href="https://loopsbycdubmobile.com/all-loops" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#222] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#333] transition border border-white/10 shrink-0 group">
                        <Layers className="w-4 h-4 text-blue-400" /> Access Loop Library <ArrowUpRight className="w-3 h-3 text-gray-500 group-hover:text-white" />
                    </a>

                    <Link href="/music" className="flex items-center gap-2 bg-[#222] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#333] transition border border-white/10 shrink-0">
                        <Headphones className="w-4 h-4 text-orange-400" /> Schedule Shed
                    </Link>

                    <button className="flex items-center gap-2 bg-[#222] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#333] transition border border-white/10 shrink-0">
                        <Video className="w-4 h-4 text-green-400" /> Upload Reel
                    </button>

                </div>
            </div>
        </div>

        <HeroSection creator={featuredCreator} />
        
        {/* FEATURED ADS */}
        <div className="mb-8">
            <div className="flex items-center gap-2 mb-4 text-xs font-bold text-yellow-500 uppercase tracking-widest">
                <Star className="w-4 h-4" /> Featured Events
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative aspect-[21/9] bg-gray-800 rounded-2xl overflow-hidden group cursor-pointer border border-white/10 hover:border-yellow-500/50 transition">
                    <img src="/kirk_banner.jpg" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-center items-start">
                        <span className="bg-yellow-500 text-black text-[10px] font-black px-2 py-1 rounded uppercase mb-2">Sponsored</span>
                        <h2 className="text-3xl font-black italic uppercase mb-2">The Reunion Tour</h2>
                        <p className="text-gray-300 mb-4 max-w-sm">Experience Kirk Franklin live in your city.</p>
                        <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-xs uppercase hover:bg-gray-200 transition">Get Tickets</button>
                    </div>
                </div>
                <div className="relative aspect-[21/9] bg-gray-800 rounded-2xl overflow-hidden group cursor-pointer border border-white/10 hover:border-violet-500/50 transition">
                    <img src="/td_banner.avif" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-center items-start">
                        <span className="bg-violet-600 text-white text-[10px] font-black px-2 py-1 rounded uppercase mb-2">Conference</span>
                        <h2 className="text-3xl font-black italic uppercase mb-2">International Leadership Summit</h2>
                        <p className="text-gray-300 mb-4 max-w-sm">Register now for the premier leadership event of 2025.</p>
                        <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-xs uppercase hover:bg-gray-200 transition">Register Now</button>
                    </div>
                </div>
            </div>
        </div>

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

# 2. UPDATE MUSIC PAGE (Product Links)
music_page_code = """import Link from "next/link";
import { artists } from "@/lib/artists";
import Navbar from "@/components/Navbar";
import { Flame, Mic2, Music2, Play, Headphones, Speaker, Download, Zap, Layers, ArrowRight, ArrowUpRight } from "lucide-react";

export default function MusicPage() {
  const gospelArtists = artists.filter(a => a.genre.includes("Gospel") || a.genre.includes("Urban") || a.genre.includes("CHH"));
  const worshipArtists = artists.filter(a => a.genre.includes("Worship"));

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white font-sans pb-20">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* HERO: KIRK FRANKLIN VIDEO */}
        <div className="relative mb-16 overflow-hidden rounded-3xl border-2 border-transparent hover:border-violet-500/50 transition duration-500 group bg-black">
            <div className="aspect-video w-full h-[60vh]">
                <iframe 
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/ZJpwRj6E0Dw?autoplay=1&mute=1&controls=1&showinfo=0&modestbranding=1" 
                    title="Kirk Franklin Live" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                ></iframe>
            </div>
            
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

        {/* --- SECTION 1: THE SHED (FOR MUSICIANS) --- */}
        <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
                <Headphones className="w-8 h-8 text-orange-500" />
                <h2 className="text-3xl font-black uppercase italic tracking-tighter">The Musician's Shed</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* SHED HUB LINK */}
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-orange-900/40 to-black p-8 group">
                    <div className="absolute inset-0 bg-[url('/course_music.jpg')] opacity-20 bg-cover bg-center group-hover:scale-105 transition duration-700"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3 text-orange-400 font-bold uppercase text-xs tracking-widest">
                            <Speaker className="w-4 h-4" /> Interactive Jam Session
                        </div>
                        <h3 className="text-3xl font-black italic uppercase mb-2">Live Shed Rooms</h3>
                        <p className="text-gray-300 mb-6 max-w-sm">
                            Join live practice sessions, vote on key changes, and shed with pro musicians.
                        </p>
                        <Link href="/music/shed" className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-extrabold px-6 py-3 rounded-full uppercase tracking-wide transition shadow-lg shadow-orange-600/20">
                            Enter The Shed <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* FEATURED TOOL: C-DUB (LINK 2: WHOOP TRIGGERZ) */}
                <div className="bg-[#1a1a1a] border border-white/10 p-8 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4">
                        <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase">Pro Tool</span>
                    </div>
                    <div className="flex gap-6 items-center">
                        <div className="w-24 h-24 bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10 shrink-0">
                            <img src="/cdub_tool.jpg" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-1 text-white">Whoop Triggerz Plus</h3>
                            <p className="text-sm text-gray-400 mb-4">By C-Dub. The secret weapon for church musicians. Add backing tracks instantly.</p>
                            
                            {/* EXTERNAL LINK TO WHOOP TRIGGERZ */}
                            <a href="https://whooptriggerz.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-2 rounded-lg text-xs uppercase hover:bg-gray-200 transition">
                                Get The App <ArrowUpRight className="w-3 h-3" />
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        {/* --- SECTION 2: GOSPEL & URBAN --- */}
        <div className="mb-12">
            <div className="flex justify-between items-end mb-6">
                <h2 className="text-2xl font-black uppercase italic tracking-tighter flex items-center gap-2">
                    <Flame className="w-6 h-6 text-red-500" /> Gospel & Urban Heat
                </h2>
                <span className="text-xs font-bold text-gray-500 uppercase cursor-pointer hover:text-white">View All</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {gospelArtists.map((artist) => (
                    <Link key={artist.slug} href={`/artist/${artist.slug}`} className="group relative block">
                        <div className="relative aspect-square overflow-hidden rounded-2xl mb-3 border border-white/5 group-hover:border-red-500 transition shadow-2xl">
                            <img src={artist.avatarUrl} alt={artist.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                            {artist.isLive && <div className="absolute top-2 right-2 bg-red-600 text-[10px] font-bold px-2 py-1 rounded-sm animate-pulse">LIVE</div>}
                        </div>
                        <h3 className="font-bold text-lg leading-none group-hover:text-red-400 transition">{artist.name}</h3>
                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wide mt-1">{artist.genre}</p>
                    </Link>
                ))}
            </div>
        </div>

        {/* --- SECTION 3: WORSHIP --- */}
        <div className="mb-12">
            <div className="flex justify-between items-end mb-6">
                <h2 className="text-2xl font-black uppercase italic tracking-tighter flex items-center gap-2">
                    <Mic2 className="w-6 h-6 text-violet-500" /> Global Worship
                </h2>
                <span className="text-xs font-bold text-gray-500 uppercase cursor-pointer hover:text-white">View All</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {worshipArtists.map((artist) => (
                    <Link key={artist.slug} href={`/artist/${artist.slug}`} className="group relative block">
                        <div className="relative aspect-square overflow-hidden rounded-2xl mb-3 border border-white/5 group-hover:border-violet-500 transition shadow-2xl">
                            <img src={artist.avatarUrl} alt={artist.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                        </div>
                        <h3 className="font-bold text-lg leading-none group-hover:text-violet-400 transition">{artist.name}</h3>
                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wide mt-1">{artist.genre}</p>
                    </Link>
                ))}
            </div>
        </div>

      </main>
    </div>
  );
}
"""

def write_file(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Updated: {path}")

# EXECUTE
write_file("app/page.tsx", home_page_code)
write_file("app/music/page.tsx", music_page_code)