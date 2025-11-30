import os

print("🎹 Fixing Images, Adding Loops Button, and Creating Shed Start Flow...")

# 1. UPDATE MUSIC PAGE (Fix Image + Add Loops Button)
music_page_code = """import Link from "next/link";
import { artists } from "@/lib/artists";
import Navbar from "@/components/Navbar";
import { Flame, Mic2, Music2, Play, Headphones, Speaker, Download, Zap, Layers, ArrowRight, ArrowUpRight, Plus } from "lucide-react";

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
                        <div className="flex gap-4">
                            <Link href="/music/shed" className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-extrabold px-6 py-3 rounded-full uppercase tracking-wide transition shadow-lg shadow-orange-600/20">
                                Enter The Shed <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* FEATURED TOOLS: C-DUB & WHOOP TRIGGERZ */}
                <div className="bg-[#1a1a1a] border border-white/10 p-8 rounded-2xl relative overflow-hidden group flex flex-col justify-between">
                    <div className="absolute top-0 right-0 p-4">
                        <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase">Pro Tools</span>
                    </div>
                    
                    <div className="flex gap-6 items-start mb-6">
                        {/* FIXED IMAGE PLACEHOLDER */}
                        <div className="w-24 h-24 bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10 shrink-0">
                            <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=300&q=80" className="w-full h-full object-cover opacity-80" alt="Music Tools" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-1 text-white">C-Dub Pro Suite</h3>
                            <p className="text-sm text-gray-400">The essential toolkit for church musicians. Backing tracks, loops, and triggers.</p>
                        </div>
                    </div>

                    {/* TWO BUTTONS: WHOOP TRIGGERZ & LOOPS */}
                    <div className="flex flex-wrap gap-3">
                        <a href="https://whooptriggerz.com/" target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex justify-center items-center gap-2 bg-white text-black font-bold px-4 py-3 rounded-lg text-xs uppercase hover:bg-gray-200 transition text-center">
                            <Zap className="w-4 h-4 fill-black" /> Whoop Triggerz <ArrowUpRight className="w-3 h-3" />
                        </a>
                        <a href="https://loopsbycdubmobile.com/all-loops" target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex justify-center items-center gap-2 bg-[#333] text-white font-bold px-4 py-3 rounded-lg text-xs uppercase hover:bg-[#444] transition border border-white/10 text-center">
                            <Layers className="w-4 h-4 text-blue-400" /> C-Dub Loops <ArrowUpRight className="w-3 h-3 text-gray-500" />
                        </a>
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

# 2. UPDATE SHED HUB (Link "Start" button to Drilldown)
shed_hub_code = """import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Mic2, Music, Users, Video, Play, Plus, Headphones, Zap, Star } from "lucide-react";

export default function ShedHub() {
  const activeRooms = [
    { id: 1, name: "Organ & Drums Pocket", host: "Jamal Keys", viewers: 142, tags: ["#Gospel", "#Shed"], avatar: "/course_music.jpg" },
    { id: 2, name: "Bass Lines 101", host: "MarcusMillerFan", viewers: 89, tags: ["#Bass", "#Theory"], avatar: "/cdub_tool.jpg" },
    { id: 3, name: "Aux Keys Worship", host: "SynthLord", viewers: 310, tags: ["#MainStage", "#Pad"], avatar: "/course_conf.jpg" },
    { id: 4, name: "Vocal Run Challenge", host: "SarahSings", viewers: 56, tags: ["#Vocals", "#Riffs"], avatar: "/course_lead.jpg" },
  ];

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white font-sans pb-20">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* HEADER & ACTIONS */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
                <div className="flex items-center gap-2 text-orange-500 font-bold uppercase tracking-widest text-xs mb-1">
                    <Headphones className="w-4 h-4" /> The Shed Ecosystem
                </div>
                <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">Live Sessions</h1>
            </div>
            {/* LINK TO DRILLDOWN PAGE */}
            <Link href="/music/shed/start" className="bg-orange-600 hover:bg-orange-500 text-white font-extrabold px-6 py-3 rounded-full uppercase tracking-wide flex items-center gap-2 transition shadow-lg shadow-orange-600/20">
                <Plus className="w-5 h-5" /> Start an Open Shed
            </Link>
        </div>

        {/* MAIN STAGE (High Production) */}
        <div className="relative mb-12 aspect-[21/9] bg-gray-900 rounded-3xl overflow-hidden border border-orange-500/30 group cursor-pointer">
            <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-60 group-hover:scale-105 transition duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
            
            <div className="absolute top-6 left-6">
                <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded uppercase tracking-wider animate-pulse">Main Stage Live</span>
            </div>

            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                <h2 className="text-3xl md:text-5xl font-black italic uppercase mb-2">Friday Night Fire</h2>
                <p className="text-gray-300 max-w-lg mb-6 text-sm md:text-base">
                    Official Pro-Musician Shed. Vote on the next key change, request songs, and watch the masters work.
                </p>
                <div className="flex gap-4">
                    <button className="bg-white text-black font-extrabold px-8 py-3 rounded-full uppercase tracking-wide hover:bg-gray-200 transition">
                        Join Stream
                    </button>
                </div>
            </div>
        </div>

        {/* OPEN SHED ROOMS (User Generated) */}
        <div className="mb-12">
            <h3 className="text-xl font-bold uppercase tracking-wide mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-400" /> Active Open Sheds
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {activeRooms.map((room) => (
                    <div key={room.id} className="bg-[#1a1a1a] border border-white/5 rounded-xl p-4 hover:border-orange-500/50 transition cursor-pointer group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                                <span className="bg-red-500/10 text-red-500 text-[9px] font-bold px-2 py-0.5 rounded uppercase flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div> Live
                                </span>
                                <span className="text-xs text-gray-500">{room.viewers} watching</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3 mb-3">
                            <img src={room.avatar} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                            <div>
                                <h4 className="font-bold text-sm text-gray-200 group-hover:text-white truncate">{room.name}</h4>
                                <p className="text-xs text-gray-500">{room.host}</p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            {room.tags.map(tag => (
                                <span key={tag} className="text-[10px] bg-white/5 text-gray-400 px-2 py-1 rounded">{tag}</span>
                            ))}
                        </div>
                        
                        <button className="w-full mt-4 bg-[#222] text-white text-xs font-bold py-2 rounded-lg group-hover:bg-orange-600 transition">
                            Join Room
                        </button>
                    </div>
                ))}
            </div>
        </div>

      </main>
    </div>
  );
}
"""

# 3. CREATE THE NEW "START SHED" DRILLDOWN PAGE
start_shed_page_code = """import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Headphones, Radio, Mic2, Music, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function StartShedPage() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white font-sans pb-20">
      <Navbar />
      
      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Back Button */}
        <Link href="/music/shed" className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-6 text-sm font-bold uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Back to Shed Hub
        </Link>

        <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Headphones className="w-32 h-32 text-orange-500" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter mb-2">Start Your Session</h1>
            <p className="text-gray-400 mb-8 text-lg">Configure your room and let the community know what you're shedding.</p>

            {/* Form Fields (Mockup) */}
            <div className="space-y-6 max-w-xl">
                
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Room Name / Vibe</label>
                    <input type="text" placeholder="e.g., Late Night Organ Flow, Bass Practice..." className="w-full bg-[#0e0e0e] border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Primary Instrument</label>
                        <select className="w-full bg-[#0e0e0e] border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition appearance-none">
                            <option>🎹 Keys / Organ</option>
                            <option>🥁 Drums</option>
                            <option>🎸 Bass</option>
                            <option>🎸 Guitar</option>
                            <option>🎤 Vocals</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Genre Focus</label>
                        <select className="w-full bg-[#0e0e0e] border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition appearance-none">
                            <option>🔥 Gospel / Churchy</option>
                            <option>🎵 Jazz / Fusion</option>
                            <option>🎹 Neo-Soul</option>
                            <option>🎸 CCM / Worship</option>
                        </select>
                    </div>
                </div>

                {/* Setup Checklist */}
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                    <h3 className="font-bold text-orange-400 mb-3 text-sm uppercase">Audio Checklist</h3>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 className="w-4 h-4 text-green-500" /> Interface Connected (Focusrite USB)</div>
                        <div className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 className="w-4 h-4 text-green-500" /> Low Latency Mode: ON</div>
                        <div className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 className="w-4 h-4 text-green-500" /> MIDI Inputs Detected</div>
                    </div>
                </div>

                {/* GO LIVE BUTTON */}
                <Link href="/stream" className="block w-full bg-orange-600 hover:bg-orange-500 text-white font-extrabold px-6 py-4 rounded-full uppercase tracking-wide transition shadow-lg shadow-orange-600/20 text-center text-lg flex items-center justify-center gap-2">
                    <Radio className="w-6 h-6" /> Go Live Now
                </Link>
                <p className="text-center text-xs text-gray-500 mt-2">By going live, you agree to the community guidelines.</p>

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
    print(f"✅ Updated/Created: {path}")

# EXECUTE
write_file("app/music/page.tsx", music_page_code)
write_file("app/music/shed/page.tsx", shed_hub_code)
write_file("app/music/shed/start/page.tsx", start_shed_page_code)