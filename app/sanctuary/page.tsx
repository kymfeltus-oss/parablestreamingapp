import Navbar from "@/components/Navbar";
import { Send, Heart, BookOpen, MessageCircle, DollarSign, Share2, Sparkles, Hand, Music, PlusCircle } from "lucide-react";

export default function SanctuaryPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
        
        {/* LEFT: MAIN STAGE (Stream) */}
        <div className="flex-1 flex flex-col bg-black relative">
            
            {/* VIDEO PLAYER */}
            <div className="flex-1 relative bg-black flex items-center justify-center">
                <iframe 
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/5osAqv0xkLk?autoplay=1&modestbranding=1&rel=0&controls=1&showinfo=0" 
                    title="Sunday Service Live" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                ></iframe>
                
                {/* LIVE OVERLAY ALERTS */}
                <div className="absolute top-6 left-6 flex items-center gap-3 animate-fade-in">
                    <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded uppercase tracking-wider shadow-lg animate-pulse">
                        LIVE NOW
                    </span>
                    <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded">
                        15,402 Worshipping
                    </span>
                </div>

                {/* MUSIC SAVE FEATURE (Overlay) */}
                <div className="absolute top-6 right-6 group cursor-pointer">
                    <div className="bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 border border-white/10 hover:border-green-500 transition">
                        <Music className="w-4 h-4 text-green-400" />
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-400 uppercase leading-none">Now Playing</span>
                            <span className="text-xs font-bold leading-none">Silver & Gold - Kirk Franklin</span>
                        </div>
                        <PlusCircle className="w-4 h-4 text-gray-400 group-hover:text-white" />
                    </div>
                </div>
            </div>

            {/* INTERACTION BAR (Bottom) */}
            <div className="h-20 bg-[#111] border-t border-white/10 px-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <img src="/td_avatar.jpg" className="w-10 h-10 rounded-full border-2 border-violet-500" />
                        <div>
                            <h3 className="font-bold text-white text-sm">Bishop T.D. Jakes</h3>
                            <p className="text-xs text-gray-400">The Potter's House • Sunday Service</p>
                        </div>
                    </div>
                    <button className="bg-violet-600/20 text-violet-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-violet-600/30">
                        + Follow
                    </button>
                </div>

                {/* REACTION BUTTONS (Digital Pew) */}
                <div className="flex items-center gap-4">
                    <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-red-500 transition group">
                        <Heart className="w-6 h-6 group-hover:fill-red-500 transition transform group-hover:scale-110" />
                        <span className="text-[9px] font-bold uppercase">Amen</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-yellow-400 transition group">
                        <Hand className="w-6 h-6 transform group-hover:-translate-y-1 transition" />
                        <span className="text-[9px] font-bold uppercase">Raise Hand</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-green-400 transition group">
                        <DollarSign className="w-6 h-6 group-hover:text-green-400" />
                        <span className="text-[9px] font-bold uppercase">Give</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-400 transition group">
                        <Share2 className="w-6 h-6" />
                        <span className="text-[9px] font-bold uppercase">Share</span>
                    </button>
                </div>
            </div>
        </div>

        {/* RIGHT: VIRTUAL PEW (Sidebar) */}
        <div className="w-full lg:w-96 bg-[#0a0a0a] border-l border-white/10 flex flex-col">
            
            {/* TABS */}
            <div className="flex border-b border-white/10">
                <button className="flex-1 py-4 text-xs font-bold uppercase tracking-wider text-white border-b-2 border-violet-500 bg-white/5">
                    Live Chat
                </button>
                <button className="flex-1 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-gray-300 flex items-center justify-center gap-2">
                    <Sparkles className="w-3 h-3 text-yellow-400" /> AI Notes
                </button>
                <button className="flex-1 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-gray-300">
                    Bible
                </button>
            </div>

            {/* CHAT AREA */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="text-center py-4">
                    <span className="bg-white/5 text-gray-500 text-[10px] px-3 py-1 rounded-full">Welcome to the Sanctuary</span>
                </div>
                
                {/* Mock Messages */}
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-[10px]">JM</div>
                    <div>
                        <span className="text-xs font-bold text-gray-300">James M.</span>
                        <p className="text-sm text-white">Hallelujah! Receiving this word from Atlanta! 🙌</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center font-bold text-[10px]">SG</div>
                    <div>
                        <span className="text-xs font-bold text-gray-300">Sarah Grace</span>
                        <p className="text-sm text-white">"Faith + Obedience = Miracles" ... wow. I needed that equation today.</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <img src="/course_music.jpg" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                        <span className="text-xs font-bold text-violet-400">Jayden Arnold</span>
                        <p className="text-sm text-white">Preach Bishop! 🔥🔥🔥</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center font-bold text-[10px]">KD</div>
                    <div>
                        <span className="text-xs font-bold text-gray-300">Kevin D.</span>
                        <p className="text-sm text-white">Watching from London. Blessings family.</p>
                    </div>
                </div>
            </div>

            {/* AI INSIGHT (Floating Card) */}
            <div className="mx-4 mb-4 p-3 bg-gradient-to-r from-violet-900/40 to-blue-900/40 border border-violet-500/30 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-50"><Sparkles className="w-10 h-10 text-violet-400" /></div>
                <h4 className="text-xs font-bold text-violet-300 uppercase tracking-wide mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> AI Key Takeaway
                </h4>
                <p className="text-xs text-white leading-relaxed">
                    "Miracles happen when you stop waiting for convenience. Your obedience unlocks the supernatural."
                </p>
                <button className="mt-2 text-[9px] bg-white/10 px-2 py-1 rounded text-gray-300 hover:text-white transition">
                    Save to Notes
                </button>
            </div>

            {/* CHAT INPUT */}
            <div className="p-4 bg-[#111] border-t border-white/10">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Say something..." 
                        className="w-full bg-[#050505] border border-white/10 rounded-full pl-4 pr-10 py-3 text-sm text-white focus:outline-none focus:border-violet-500 transition"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-violet-600 rounded-full hover:bg-violet-500 transition">
                        <Send className="w-3 h-3" />
                    </button>
                </div>
            </div>

        </div>
      </main>
    </div>
  );
}
