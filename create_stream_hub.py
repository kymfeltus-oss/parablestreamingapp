import os

print("🔀 Building the Stream Hub & Adding 'Stitch' Feature...")

# 1. CREATE THE NEW "WATCH" PAGE (This was your old Stream page, now with 'Stitch')
watch_page_code = """import Navbar from "@/components/Navbar";
import { Send, Heart, MessageCircle, DollarSign, Share2, Sparkles, Hand, Users, Scissors, Camera } from "lucide-react";

export default function WatchPage() {
  return (
    <div className="min-h-screen bg-[#0b0e11] text-white font-sans flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
        
        {/* LEFT: MAIN STAGE */}
        <div className="flex-1 flex flex-col bg-black relative overflow-y-auto custom-scrollbar">
            
            {/* VIDEO PLAYER */}
            <div className="w-full aspect-video bg-black relative group">
                <iframe 
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/A6224mKoiww?autoplay=1&modestbranding=1&rel=0&controls=1&showinfo=0" 
                    title="Live Stream" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                ></iframe>
                
                <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider shadow-lg animate-pulse">LIVE</span>
                    <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1"><Users className="w-3 h-3" /> 15,402</span>
                </div>
            </div>

            {/* STREAMER INFO & ACTIONS */}
            <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                    
                    <div className="flex items-start gap-4">
                        <div className="relative">
                            <img src="/td_avatar.jpg" className="w-16 h-16 rounded-full border-2 border-green-500 p-0.5 object-cover" />
                            <div className="absolute bottom-0 right-0 bg-green-500 text-black text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-black uppercase">LIVE</div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-black italic uppercase tracking-tighter">Nothing Just Happens</h1>
                            <div className="flex items-center gap-2 text-violet-400 font-bold text-sm mb-1">
                                <span>Bishop T.D. Jakes</span>
                                <span className="text-gray-600">•</span>
                                <span className="text-gray-400 font-normal">Sunday Service</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 bg-[#53fc18] text-black px-4 py-2 rounded font-bold uppercase text-xs hover:brightness-110 transition">
                            <Heart className="w-4 h-4 fill-black" /> Follow
                        </button>
                        
                        {/* THE NEW STITCH FEATURE */}
                        <button className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded font-bold uppercase text-xs hover:bg-violet-500 transition shadow-lg shadow-violet-600/20">
                            <Scissors className="w-4 h-4" /> Stitch / React
                        </button>

                        <button className="p-2 bg-[#2f2f35] rounded hover:bg-[#3f3f45] transition text-gray-400">
                            <Share2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* RIGHT: CHAT PANEL */}
        <div className="w-full lg:w-80 bg-[#18181b] border-l border-[#2f2f35] flex flex-col h-full">
            <div className="h-12 border-b border-[#2f2f35] flex items-center justify-between px-4">
                <span className="font-bold text-xs uppercase tracking-wider text-gray-400">Stream Chat</span>
                <Users className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-sm">
                <div className="text-gray-500 text-center text-xs py-4">Welcome to the chat room!</div>
                <div className="break-words"><span className="font-bold text-[#53fc18] mr-2">JaydenKeys:</span><span className="text-gray-300">That point right there!! 🔥🔥</span></div>
                <div className="break-words"><span className="font-bold text-blue-400 mr-2">SarahWorships:</span><span className="text-gray-300">Amen Bishop! Faith requires movement.</span></div>
            </div>
            <div className="p-4 bg-[#18181b] border-t border-[#2f2f35]">
                <div className="relative">
                    <input type="text" placeholder="Send a message..." className="w-full bg-[#2f2f35] border border-transparent rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition placeholder-gray-500" />
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
"""

# 2. CREATE THE NEW STREAM LANDING HUB
hub_page_code = """import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Play, Radio, Upload, Mic2, Music, Video, Scissors, ArrowRight } from "lucide-react";

export default function StreamHub() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-2 text-center">Stream Hub</h1>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Your central command for live ministry. Watch the word, broadcast your gift, or react to the culture.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* COLUMN 1: MINISTRY STREAMING */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-violet-600 rounded-lg"><Mic2 className="w-6 h-6 text-white" /></div>
                    <h2 className="text-2xl font-bold uppercase tracking-wide">Ministry & Word</h2>
                </div>

                {/* Card 1: Watch Live */}
                <Link href="/stream/watch" className="block group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111] hover:border-violet-500/50 transition">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-900/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
                    <div className="p-8 relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded uppercase tracking-wider animate-pulse">Live Now</div>
                            <ArrowRight className="w-6 h-6 text-gray-500 group-hover:text-white transition" />
                        </div>
                        <h3 className="text-3xl font-black italic uppercase mb-2">Watch Service</h3>
                        <p className="text-gray-400 text-sm">Join Bishop Jakes, Elevation, and more live.</p>
                    </div>
                </Link>

                {/* Card 2: Go Live */}
                <div className="grid grid-cols-2 gap-4">
                    <button className="bg-[#1a1a1a] border border-white/10 p-6 rounded-2xl hover:bg-[#222] transition text-left group">
                        <Radio className="w-8 h-8 text-violet-400 mb-4 group-hover:scale-110 transition" />
                        <h4 className="font-bold text-lg">Go Live</h4>
                        <p className="text-xs text-gray-500 mt-1">Start a sermon stream</p>
                    </button>
                    <button className="bg-[#1a1a1a] border border-white/10 p-6 rounded-2xl hover:bg-[#222] transition text-left group">
                        <Upload className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition" />
                        <h4 className="font-bold text-lg">Upload</h4>
                        <p className="text-xs text-gray-500 mt-1">Post a pre-recorded word</p>
                    </button>
                </div>
            </div>

            {/* COLUMN 2: MUSIC & CREATIVE */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-orange-600 rounded-lg"><Music className="w-6 h-6 text-white" /></div>
                    <h2 className="text-2xl font-bold uppercase tracking-wide">Music & The Shed</h2>
                </div>

                {/* Card 1: Watch Shed */}
                <Link href="/music" className="block group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111] hover:border-orange-500/50 transition">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
                    <div className="p-8 relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-orange-600 text-white text-[10px] font-black px-3 py-1 rounded uppercase tracking-wider">The Shed</div>
                            <ArrowRight className="w-6 h-6 text-gray-500 group-hover:text-white transition" />
                        </div>
                        <h3 className="text-3xl font-black italic uppercase mb-2">Watch Musicians</h3>
                        <p className="text-gray-400 text-sm">Live shed sessions, loops, and pro tips.</p>
                    </div>
                </Link>

                {/* Card 2: Creative Tools */}
                <div className="grid grid-cols-2 gap-4">
                    <button className="bg-[#1a1a1a] border border-white/10 p-6 rounded-2xl hover:bg-[#222] transition text-left group">
                        <Scissors className="w-8 h-8 text-pink-500 mb-4 group-hover:scale-110 transition" />
                        <h4 className="font-bold text-lg">Stitch</h4>
                        <p className="text-xs text-gray-500 mt-1">React to a video</p>
                    </button>
                    <button className="bg-[#1a1a1a] border border-white/10 p-6 rounded-2xl hover:bg-[#222] transition text-left group">
                        <Video className="w-8 h-8 text-green-400 mb-4 group-hover:scale-110 transition" />
                        <h4 className="font-bold text-lg">Clip It</h4>
                        <p className="text-xs text-gray-500 mt-1">Create a short</p>
                    </button>
                </div>
            </div>

        </div>
      </main>
    </div>
  );
}
"""

# Helper function
def write_file(path, content):
    directory = os.path.dirname(path)
    if directory and not os.path.exists(directory):
        os.makedirs(directory)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Created: {path}")

# EXECUTE
# 1. Create the new Watch sub-page
write_file("app/stream/watch/page.tsx", watch_page_code)
# 2. Overwrite the main Stream page with the Landing Hub
write_file("app/stream/page.tsx", hub_page_code)