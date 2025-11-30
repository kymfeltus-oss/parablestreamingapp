import os

print("🎹 Building 'The Shed' Interactive Module...")

# 1. NEW SHED HUB PAGE (The Lobby)
shed_hub_code = """import Navbar from "@/components/Navbar";
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
            <button className="bg-orange-600 hover:bg-orange-500 text-white font-extrabold px-6 py-3 rounded-full uppercase tracking-wide flex items-center gap-2 transition shadow-lg shadow-orange-600/20">
                <Plus className="w-5 h-5" /> Start an Open Shed
            </button>
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
                    <button className="bg-black/50 backdrop-blur-md text-white border border-white/20 font-bold px-6 py-3 rounded-full uppercase tracking-wide hover:bg-white/10 transition">
                        Backstage Pass
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

        {/* COMMUNITY & CURATION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6">
                <h3 className="text-lg font-bold uppercase tracking-wide mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" /> Shed Bosses
                </h3>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-bold text-sm">{i}</div>
                            <div className="flex-1">
                                <h4 className="font-bold text-sm">Top Contributor {i}</h4>
                                <p className="text-xs text-gray-500">Hosted 15 hrs this week</p>
                            </div>
                            <Zap className="w-4 h-4 text-orange-500" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6">
                <h3 className="text-lg font-bold uppercase tracking-wide mb-4 flex items-center gap-2">
                    <Video className="w-5 h-5 text-blue-400" /> Pro Tips Library
                </h3>
                <div className="space-y-4">
                    <div className="flex gap-3 cursor-pointer group">
                        <div className="w-24 h-14 bg-black rounded-lg relative overflow-hidden">
                            <img src="/course_music.jpg" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition" />
                            <Play className="w-4 h-4 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm group-hover:text-blue-400 transition">How to Play "Talk Music"</h4>
                            <p className="text-xs text-gray-500">2 min • Piano</p>
                        </div>
                    </div>
                    <div className="flex gap-3 cursor-pointer group">
                        <div className="w-24 h-14 bg-black rounded-lg relative overflow-hidden">
                            <img src="/cdub_tool.jpg" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition" />
                            <Play className="w-4 h-4 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm group-hover:text-blue-400 transition">Using Loops Effectively</h4>
                            <p className="text-xs text-gray-500">5 min • Production</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </main>
    </div>
  );
}
"""

# 2. UPDATE MAIN MUSIC PAGE (Link to Hub + Remove Maverick City Ref)
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

        {/* THE SHED PROMO SECTION */}
        <div className="relative mb-12 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-gray-900 to-black">
            <div className="absolute inset-0 bg-[url('/course_music.jpg')] opacity-30 bg-cover bg-center"></div>
            <div className="relative p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-xl">
                    <div className="flex items-center gap-2 mb-2 text-orange-500 font-bold tracking-widest uppercase text-xs">
                        <Headphones className="w-4 h-4" /> The Shed
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black italic uppercase leading-none mb-4">
                        Sharpen Your Gift
                    </h1>
                    <p className="text-gray-400 mb-6">
                        Join live shed sessions, download stems, and get the latest tools from legends like Carlton Whitfield (C-Dub).
                    </p>
                    <Link href="/music/shed" className="bg-orange-600 hover:bg-orange-500 text-white font-extrabold px-8 py-3 rounded-full uppercase tracking-wide transition shadow-lg shadow-orange-600/20 inline-block">
                        Enter The Shed
                    </Link>
                </div>
                
                {/* LIVE SHED PREVIEW CARD */}
                <div className="bg-gradient-to-br from-red-900/50 to-black border border-red-500/30 rounded-2xl p-6 flex flex-col justify-center items-center text-center max-w-sm w-full backdrop-blur-sm">
                    <div className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full mb-4 animate-pulse">LIVE NOW</div>
                    <h3 className="text-2xl font-black italic uppercase mb-2">Late Night Shed</h3>
                    
                    {/* UPDATED TEXT: Removed Maverick City Reference */}
                    <p className="text-sm text-gray-300 mb-6">Pro Keys & Organ Session - Live from Atlanta.</p>
                    
                    <Link href="/music/shed" className="bg-white text-black font-extrabold px-8 py-3 rounded-full uppercase text-xs hover:bg-gray-200 transition">
                        Join Room
                    </Link>
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
    print(f"✅ Created/Updated: {path}")

# EXECUTE
write_file("app/music/shed/page.tsx", shed_hub_code)
write_file("app/music/page.tsx", music_page_code)