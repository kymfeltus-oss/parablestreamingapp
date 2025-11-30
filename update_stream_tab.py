import os

print("🔴 Building the Dedicated 'Stream' Tab (Kick/Twitch Style)...")

# 1. NEW STREAM PAGE (Replaces Sanctuary)
stream_page_code = """import Navbar from "@/components/Navbar";
import { Send, Heart, MessageCircle, DollarSign, Share2, Sparkles, Hand, Users, Zap, Repeat } from "lucide-react";

export default function StreamPage() {
  return (
    <div className="min-h-screen bg-[#0b0e11] text-white font-sans flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
        
        {/* LEFT: MAIN STAGE (Kick/Twitch Style Player) */}
        <div className="flex-1 flex flex-col bg-black relative overflow-y-auto custom-scrollbar">
            
            {/* VIDEO PLAYER CONTAINER */}
            <div className="w-full aspect-video bg-black relative group">
                <iframe 
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/5osAqv0xkLk?autoplay=1&modestbranding=1&rel=0&controls=1&showinfo=0" 
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
                            <img src="/td_avatar.jpg" className="w-16 h-16 rounded-full border-2 border-green-500 p-0.5 object-cover" />
                            <div className="absolute bottom-0 right-0 bg-green-500 text-black text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-black uppercase">
                                LIVE
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-black italic uppercase tracking-tighter">Faith + Obedience = Miracles!</h1>
                            <div className="flex items-center gap-2 text-violet-400 font-bold text-sm mb-1">
                                <span>Bishop T.D. Jakes</span>
                                <span className="text-gray-600">•</span>
                                <span className="text-gray-400 font-normal">Just Chatting / Sermon</span>
                            </div>
                            <div className="flex gap-2 mt-2">
                                <span className="bg-[#1f1f23] text-gray-400 text-xs px-2 py-1 rounded font-bold hover:text-white cursor-pointer">#Faith</span>
                                <span className="bg-[#1f1f23] text-gray-400 text-xs px-2 py-1 rounded font-bold hover:text-white cursor-pointer">#Miracles</span>
                                <span className="bg-[#1f1f23] text-gray-400 text-xs px-2 py-1 rounded font-bold hover:text-white cursor-pointer">#PottersHouse</span>
                            </div>
                        </div>
                    </div>

                    {/* ACTION BUTTONS (Raid/Host/Share) */}
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 bg-[#53fc18] text-black px-4 py-2 rounded font-bold uppercase text-xs hover:brightness-110 transition">
                            <Heart className="w-4 h-4 fill-black" /> Follow
                        </button>
                        <button className="flex items-center gap-2 bg-[#2f2f35] text-white px-4 py-2 rounded font-bold uppercase text-xs hover:bg-[#3f3f45] transition">
                            <DollarSign className="w-4 h-4 text-green-400" /> Give
                        </button>
                        <button className="flex items-center gap-2 bg-[#2f2f35] text-white px-4 py-2 rounded font-bold uppercase text-xs hover:bg-[#3f3f45] transition">
                            <Repeat className="w-4 h-4 text-violet-400" /> Host Channel
                        </button>
                        <button className="p-2 bg-[#2f2f35] rounded hover:bg-[#3f3f45] transition text-gray-400">
                            <Share2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* STREAMER STATS / BIO PANEL */}
                <div className="mt-8 bg-[#18181b] p-6 rounded-lg border border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h3 className="text-gray-500 font-bold uppercase text-xs mb-2">About the Streamer</h3>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            Bishop T.D. Jakes is a visionary leader and entrepreneur serving as senior pastor of The Potter's House.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-gray-500 font-bold uppercase text-xs mb-2">Stream Stats</h3>
                        <div className="flex gap-6">
                            <div>
                                <div className="text-xl font-bold text-white">6.5M</div>
                                <div className="text-xs text-gray-500">Followers</div>
                            </div>
                            <div>
                                <div className="text-xl font-bold text-white">125k</div>
                                <div className="text-xs text-gray-500">Avg Viewers</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-gray-500 font-bold uppercase text-xs mb-2">Links</h3>
                        <div className="flex flex-col gap-1 text-sm">
                            <a href="#" className="text-violet-400 hover:underline">bishopjakes.org</a>
                            <a href="#" className="text-violet-400 hover:underline">instagram.com/bishopjakes</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* RIGHT: CHAT PANEL (Discord/Twitch Vibe) */}
        <div className="w-full lg:w-80 bg-[#18181b] border-l border-[#2f2f35] flex flex-col h-full">
            
            {/* CHAT HEADER */}
            <div className="h-12 border-b border-[#2f2f35] flex items-center justify-between px-4">
                <span className="font-bold text-xs uppercase tracking-wider text-gray-400">Stream Chat</span>
                <Users className="w-4 h-4 text-gray-400" />
            </div>

            {/* CHAT MESSAGES */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-sm">
                <div className="text-gray-500 text-center text-xs py-4">Welcome to the chat room!</div>
                
                <div className="break-words">
                    <span className="font-bold text-[#53fc18] mr-2">JaydenKeys:</span>
                    <span className="text-gray-300">That point right there!! 🔥🔥</span>
                </div>
                <div className="break-words">
                    <span className="font-bold text-blue-400 mr-2">SarahWorships:</span>
                    <span className="text-gray-300">Amen Bishop! Faith requires movement.</span>
                </div>
                <div className="break-words">
                    <span className="font-bold text-red-400 mr-2">DrummerBoy99:</span>
                    <span className="text-gray-300">Anyone catch that organ run? 🎹</span>
                </div>
                <div className="break-words">
                    <span className="font-bold text-violet-400 mr-2">ModSquad:</span>
                    <span className="text-gray-300 bg-white/5 px-1 rounded">Don't forget to give at the link below!</span>
                </div>
                <div className="break-words">
                    <span className="font-bold text-orange-400 mr-2">NewUser12:</span>
                    <span className="text-gray-300">First time here, loving the vibe.</span>
                </div>
            </div>

            {/* CHAT INPUT */}
            <div className="p-4 bg-[#18181b] border-t border-[#2f2f35]">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Send a message..." 
                        className="w-full bg-[#2f2f35] border border-transparent rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition placeholder-gray-500"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-gray-400 cursor-pointer hover:text-yellow-400" />
                    </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <div className="flex gap-2">
                        <span className="text-xs font-bold text-[#53fc18] bg-[#53fc18]/10 px-2 py-0.5 rounded cursor-pointer">250 Bits</span>
                    </div>
                    <button className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-1 rounded text-xs font-bold transition">Chat</button>
                </div>
            </div>

        </div>
      </main>
    </div>
  );
}
"""

# 2. UPDATE NAVBAR (Rename "Sanctuary" to "Stream")
navbar_code = """ "use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/stream", label: "🔴 Stream" }, // <--- RENAMED TO STREAM
  { href: "/feed", label: "Feed" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/music", label: "Music" },
  { href: "/discover", label: "Discover" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur-xl text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-xs font-bold text-white shadow-[0_0_15px_rgba(124,58,237,0.5)]">
            NF
          </span>
          <span className="text-sm font-semibold tracking-wide text-white sm:text-base">
            NexusFaith
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm text-gray-300">
          {links.map((link) => {
            const active = pathname === link.href;
            const isLive = link.label.includes("🔴");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition hover:text-white uppercase text-xs font-bold tracking-wide ${
                  active ? "text-violet-400 border-b-2 border-violet-500 pb-0.5" : ""
                } ${isLive ? "text-red-500 animate-pulse" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
            <Link href="/dashboard" className="hidden sm:block">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-500 border border-white/20 shadow-lg cursor-pointer hover:scale-110 transition" />
            </Link>
        </div>
      </div>
    </header>
  );
}
"""

def write_file(path, content):
    directory = os.path.dirname(path)
    if directory and not os.path.exists(directory):
        os.makedirs(directory)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Updated: {path}")

# EXECUTE
write_file("app/stream/page.tsx", stream_page_code)
write_file("components/Navbar.tsx", navbar_code)