import os

print("🎹 Restoring Full Music Hub (Shed + Discovery)...")

music_page_code = """import Link from "next/link";
import { artists } from "@/lib/artists";
import Navbar from "@/components/Navbar";
import { Flame, Mic2, Music2, Play, Headphones, Speaker, Download, Zap, Layers, ArrowRight } from "lucide-react";

export default function MusicPage() {
  // Filter lists for different sections
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
                            Join live practice sessions, vote on key changes, and shed with pro musicians from around the world.
                        </p>
                        <Link href="/music/shed" className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-extrabold px-6 py-3 rounded-full uppercase tracking-wide transition shadow-lg shadow-orange-600/20">
                            Enter The Shed <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* FEATURED TOOL: C-DUB */}
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
                            <button className="bg-white text-black font-bold px-6 py-2 rounded-lg text-xs uppercase hover:bg-gray-200 transition">
                                Get The App
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        {/* --- SECTION 2: GOSPEL & URBAN (LISTENING) --- */}
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
                            <img 
                                src={artist.avatarUrl} 
                                alt={artist.name}
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-110" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                            {artist.isLive && (
                                <div className="absolute top-2 right-2 bg-red-600 text-[10px] font-bold px-2 py-1 rounded-sm animate-pulse">LIVE</div>
                            )}
                            <div className="absolute bottom-3 left-3">
                                <button className="bg-white text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition transform translate-y-2 group-hover:translate-y-0">
                                    <Play className="w-4 h-4 fill-black" />
                                </button>
                            </div>
                        </div>
                        <h3 className="font-bold text-lg leading-none group-hover:text-red-400 transition">{artist.name}</h3>
                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wide mt-1">{artist.genre}</p>
                    </Link>
                ))}
            </div>
        </div>

        {/* --- SECTION 3: WORSHIP (LISTENING) --- */}
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
                            <img 
                                src={artist.avatarUrl} 
                                alt={artist.name}
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-110" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                            <div className="absolute bottom-3 left-3">
                                <button className="bg-white text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition transform translate-y-2 group-hover:translate-y-0">
                                    <Play className="w-4 h-4 fill-black" />
                                </button>
                            </div>
                        </div>
                        <h3 className="font-bold text-lg leading-none group-hover:text-violet-400 transition">{artist.name}</h3>
                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wide mt-1">{artist.genre}</p>
                    </Link>
                ))}
            </div>
        </div>

        {/* --- SECTION 4: FRESH DROPS (NEW RELEASES) --- */}
        <div className="mb-8">
            <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-6 flex items-center gap-2">
                <Music2 className="w-6 h-6 text-blue-500" /> Fresh Drops
            </h2>
            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
                {artists.map((artist) => (
                    <div key={artist.latestRelease.title} className="min-w-[180px] w-[180px] group cursor-pointer">
                        <div className="relative overflow-hidden rounded-xl mb-3 shadow-lg">
                            <img 
                                src={artist.latestRelease.coverUrl} 
                                className="w-full aspect-square object-cover group-hover:scale-105 transition duration-500" 
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                <Play className="w-10 h-10 text-white fill-white" />
                            </div>
                        </div>
                        <p className="font-bold truncate text-sm text-white group-hover:text-blue-400 transition">{artist.latestRelease.title}</p>
                        <p className="text-xs text-gray-500 uppercase font-bold">{artist.name}</p>
                    </div>
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

write_file("app/music/page.tsx", music_page_code)