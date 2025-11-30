import Navbar from "@/components/Navbar";
import { Mic, Video, Users, Settings, Volume2, MicOff, VideoOff, PhoneOff } from "lucide-react";

export default function VirtualStudioPage() {
  return (
    <div className="min-h-screen bg-[#111] text-white font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 p-6 flex gap-6">
        {/* MAIN STAGE (Grid of Musicians) */}
        <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center">
                <img src="/course_music.jpg" className="w-full h-full object-cover opacity-60" />
                <div className="absolute bottom-4 left-4 bg-black/60 px-2 py-1 rounded text-xs font-bold">Jamal Keys (Host)</div>
                <div className="absolute top-4 right-4 bg-green-500/20 text-green-400 px-2 py-1 rounded text-[10px] font-bold uppercase border border-green-500/50">Speaking</div>
            </div>
            <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center"><Users className="w-8 h-8 text-gray-500" /></div>
                <div className="absolute bottom-4 left-4 bg-black/60 px-2 py-1 rounded text-xs font-bold">Waiting for Drummer...</div>
            </div>
        </div>
        {/* CONTROLS SIDEBAR */}
        <div className="w-80 bg-[#0a0a0a] rounded-2xl border border-white/10 p-6 flex flex-col">
            <h2 className="text-xl font-bold uppercase tracking-wide mb-6">Session Controls</h2>
            <div className="space-y-4 mb-auto">
                <div className="flex justify-between items-center"><span className="text-sm text-gray-400">Master Volume</span><Volume2 className="w-4 h-4 text-gray-400" /></div>
                <div className="w-full bg-gray-800 h-1 rounded-full"><div className="w-[80%] h-full bg-green-500 rounded-full"></div></div>
                <div className="flex justify-between items-center mt-4"><span className="text-sm text-gray-400">Latency: 12ms</span><span className="text-green-500 text-xs font-bold">Excellent</span></div>
            </div>
            <div className="grid grid-cols-4 gap-2">
                <button className="bg-[#222] hover:bg-[#333] p-3 rounded-xl flex items-center justify-center"><Mic className="w-5 h-5" /></button>
                <button className="bg-[#222] hover:bg-[#333] p-3 rounded-xl flex items-center justify-center"><Video className="w-5 h-5" /></button>
                <button className="bg-[#222] hover:bg-[#333] p-3 rounded-xl flex items-center justify-center"><Settings className="w-5 h-5" /></button>
                <button className="bg-red-600 hover:bg-red-500 p-3 rounded-xl flex items-center justify-center"><PhoneOff className="w-5 h-5" /></button>
            </div>
        </div>
      </main>
    </div>
  );
}
