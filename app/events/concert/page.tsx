import Navbar from "@/components/Navbar";
import { Users, MessageCircle, Heart, Share2, DollarSign, Music, Zap, Play } from "lucide-react";

export default function ConcertPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
        {/* VIDEO PLAYER */}
        <div className="flex-1 flex flex-col bg-black relative">
            <div className="w-full h-full relative">
                <iframe className="w-full h-full" src="https://www.youtube.com/embed/ZJpwRj6E0Dw?autoplay=1&modestbranding=1&rel=0&controls=1&showinfo=0" title="Live Concert" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                <div className="absolute top-6 left-6 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded uppercase tracking-wider animate-pulse">LIVE BACKSTAGE</div>
            </div>
        </div>
        {/* INTERACTIVE SIDEBAR */}
        <div className="w-full lg:w-96 bg-[#0a0a0a] border-l border-white/10 flex flex-col">
            <div className="p-6 border-b border-white/10">
                <h1 className="text-2xl font-black italic uppercase mb-1">Friday Night Fire</h1>
                <p className="text-gray-400 text-xs uppercase font-bold tracking-widest">Official Live Stream</p>
                <div className="flex gap-2 mt-4">
                    <button className="flex-1 bg-white text-black font-bold py-2 rounded text-xs uppercase hover:bg-gray-200">Setlist</button>
                    <button className="flex-1 border border-white/20 text-white font-bold py-2 rounded text-xs uppercase hover:bg-white/10">Merch</button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <div className="text-center text-xs text-gray-500 my-4">--- Live Chat Started ---</div>
                <div className="flex gap-2"><span className="font-bold text-blue-400">DrummerBoy:</span><span className="text-gray-300">That fill was crazy! 🥁</span></div>
                <div className="flex gap-2"><span className="font-bold text-violet-400">SarahSings:</span><span className="text-gray-300">Tone is perfect tonight.</span></div>
            </div>
            <div className="p-4 bg-[#111] border-t border-white/10"><input type="text" placeholder="Send a message..." className="w-full bg-[#050505] border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" /></div>
        </div>
      </main>
    </div>
  );
}
