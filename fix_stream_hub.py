import os

print("🔀 Updating Stream Hub: Fixing 'Watch Musicians' Tab...")

# STREAM HUB (Landing Page for Go Live / Upload)
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

                {/* Card 1: Watch Live (Links to Player) */}
                <Link href="/stream/watch" className="block group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111] hover:border-violet-500/50 transition h-64">
                    <div className="absolute inset-0 bg-[url('/td_banner.avif')] bg-cover bg-center opacity-40 group-hover:scale-105 transition duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    <div className="p-8 relative z-10 h-full flex flex-col justify-end">
                        <div className="absolute top-6 left-6 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded uppercase tracking-wider animate-pulse">Live Now</div>
                        <h3 className="text-3xl font-black italic uppercase mb-1">Watch Service</h3>
                        <p className="text-gray-300 text-sm">Bishop T.D. Jakes • The Potter's House</p>
                    </div>
                </Link>

                {/* Card 2: Go Live Tools */}
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

                {/* Card 1: Watch Shed (UPDATED LINK & IMAGE) */}
                <Link href="/music/shed" className="block group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111] hover:border-orange-500/50 transition h-64">
                    {/* Background Image: Using the Music Course / Shed Image */}
                    <div className="absolute inset-0 bg-[url('/course_music.jpg')] bg-cover bg-center opacity-40 group-hover:scale-105 transition duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    
                    <div className="p-8 relative z-10 h-full flex flex-col justify-end">
                        <div className="absolute top-6 left-6 bg-orange-600 text-white text-[10px] font-black px-3 py-1 rounded uppercase tracking-wider">The Shed</div>
                        <h3 className="text-3xl font-black italic uppercase mb-1">Watch Musicians</h3>
                        <p className="text-gray-300 text-sm">Live shed sessions, loops, and pro tips.</p>
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

def write_file(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Updated: {path}")

# EXECUTE
write_file("app/stream/page.tsx", hub_page_code)