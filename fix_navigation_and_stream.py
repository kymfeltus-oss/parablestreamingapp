import os

print("🛠️ Fixing Navigation Links & Forcing Stream Tab Update...")

# 1. UPDATE HERO SECTION (Fixing the "View Creator Hub" Button)
hero_section_code = """import Link from "next/link";
import { Creator } from "@/lib/preachers";

interface HeroSectionProps {
  creator: Creator;
}

export default function HeroSection({ creator }: HeroSectionProps) {
  const live = creator.liveStream;

  return (
    <section className="relative mb-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-900 via-slate-900 to-black group">
      {/* Background Image */}
      <div
        className="absolute inset-0 opacity-60 group-hover:scale-105 transition duration-700"
        style={{
          backgroundImage: `url(${creator.bannerUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/80 to-transparent" />

      <div className="relative flex flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:gap-10 sm:px-10">
        <div className="flex-1">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-600/20 border border-red-500/30 px-3 py-1 text-xs font-bold text-red-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Live Global Broadcast
          </div>

          <h1 className="mb-3 text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white">
            {live ? live.title : creator.shortTagline}
          </h1>
          <p className="mb-6 max-w-xl text-sm text-gray-300 sm:text-base leading-relaxed">
            {creator.bio}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {live && (
              <Link
                href="/stream" // Goes to the Stream/Sanctuary Tab
                className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-red-600/30 hover:bg-red-500 transition transform hover:scale-105"
              >
                ▶ Watch Stream
              </Link>
            )}
            
            {/* THIS LINK GOES TO THE MINISTRY PROFILE */}
            <Link
              href={`/creator/${creator.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-6 py-3 text-sm font-bold text-white hover:bg-white hover:text-black transition"
            >
              View Ministry Profile
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
"""

# 2. FORCE UPDATE STREAM PAGE (Landscape Layout)
stream_page_code = """import Navbar from "@/components/Navbar";
import { Send, Heart, MessageCircle, DollarSign, Share2, Sparkles, Hand, Users, Zap, Repeat, Music } from "lucide-react";

export default function StreamPage() {
  return (
    <div className="min-h-screen bg-[#0b0e11] text-white font-sans flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
        
        {/* LEFT: MAIN STAGE (Player + Info) */}
        <div className="flex-1 flex flex-col bg-black relative overflow-y-auto custom-scrollbar">
            
            {/* VIDEO PLAYER CONTAINER (16:9 Landscape) */}
            <div className="w-full aspect-video bg-black relative group">
                <iframe 
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/A6224mKoiww?autoplay=1&modestbranding=1&rel=0&controls=1&showinfo=0" 
                    title="Live Stream" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                ></iframe>
                
                {/* LIVE OVERLAY BADGES */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider shadow-lg animate-pulse">
                        LIVE
                    </span>
                    <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                        <Users className="w-3 h-3" /> 15,402
                    </span>
                </div>
            </div>

            {/* STREAMER PROFILE CARD & INFO */}
            <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                    
                    {/* PROFILE INFO */}
                    <div className="flex items-start gap-4">
                        <div className="relative">
                            <img src="/td_avatar.png" className="w-16 h-16 rounded-full border-2 border-green-500 p-0.5 object-cover" />
                            <div className="absolute bottom-0 right-0 bg-green-500 text-black text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-black uppercase">
                                LIVE
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-black italic uppercase tracking-tighter">Nothing Just Happens</h1>
                            <div className="flex items-center gap-2 text-violet-400 font-bold text-sm mb-1">
                                <span>Bishop T.D. Jakes</span>
                                <span className="text-gray-600">•</span>
                                <span className="text-gray-400 font-normal">Sunday Service</span>
                            </div>
                            <div className="flex gap-2 mt-2">
                                <span className="bg-[#1f1f23] text-gray-400 text-xs px-2 py-1 rounded font-bold hover:text-white cursor-pointer">#Faith</span>
                                <span className="bg-[#1f1f23] text-gray-400 text-xs px-2 py-1 rounded font-bold hover:text-white cursor-pointer">#PottersHouse</span>
                            </div>
                        </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 bg-[#53fc18] text-black px-4 py-2 rounded font-bold uppercase text-xs hover:brightness-110 transition">
                            <Heart className="w-4 h-4 fill-black" /> Follow
                        </button>
                        <button className="flex items-center gap-2 bg-[#2f2f35] text-white px-4 py-2 rounded font-bold uppercase text-xs hover:bg-[#3f3f45] transition">
                            <DollarSign className="w-4 h-4 text-green-400" /> Give
                        </button>
                        <button className="flex items-center gap-2 bg-[#2f2f35] text-white px-4 py-2 rounded font-bold uppercase text-xs hover:bg-[#3f3f45] transition">
                            <Share2 className="w-4 h-4" /> Share
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
                <div className="break-words"><span className="font-bold text-violet-400 mr-2">ModSquad:</span><span className="text-gray-300 bg-white/5 px-1 rounded">Don't forget to give at the link below!</span></div>
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

def write_file(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Updated: {path}")

# EXECUTE
write_file("components/HeroSection.tsx", hero_section_code)
write_file("app/stream/page.tsx", stream_page_code)