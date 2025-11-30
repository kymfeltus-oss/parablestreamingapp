import os

print("🏠 Updating Home Screen with Preacher/Musician Dashboard...")

# We are updating app/page.tsx to include the User Info section
home_page_code = """import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { creators } from "@/lib/preachers";
import Link from "next/link";
import { Activity, Users, DollarSign, Music, Mic2 } from "lucide-react";

export default function Home() {
  const featuredCreator = creators[0]; // T.D. Jakes

  return (
    <main className="min-h-screen pb-10 bg-black text-white font-sans">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* --- NEW: MINISTER'S DASHBOARD HEADER --- */}
        <div className="mb-10 bg-[#111] border border-white/10 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                
                {/* User Info */}
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <img 
                            src="/td_avatar.jpg" 
                            className="w-16 h-16 rounded-full border-2 border-violet-500 p-1" 
                        />
                        <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-black"></div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Welcome, Bishop</h1>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span className="bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Preacher</span>
                            <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Musician</span>
                            <span>• The Potter's House</span>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="flex gap-4">
                    <div className="text-center px-4 border-r border-white/10">
                        <div className="text-2xl font-bold text-white">1.2M</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest">Reach</div>
                    </div>
                    <div className="text-center px-4 border-r border-white/10">
                        <div className="text-2xl font-bold text-green-400 flex items-center gap-1"><DollarSign className="w-4 h-4" /> 45k</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest">Giving</div>
                    </div>
                    <div className="text-center px-4">
                        <div className="text-2xl font-bold text-red-500 flex items-center gap-1"><Activity className="w-4 h-4" /> Live</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest">Status</div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-6 border-t border-white/5 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                <button className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-gray-200 transition">
                    <Activity className="w-4 h-4" /> Go Live
                </button>
                <button className="flex items-center gap-2 bg-[#222] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#333] transition border border-white/10">
                    <Mic2 className="w-4 h-4 text-violet-400" /> Upload Sermon
                </button>
                <button className="flex items-center gap-2 bg-[#222] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#333] transition border border-white/10">
                    <Music className="w-4 h-4 text-blue-400" /> Upload Stem
                </button>
            </div>
        </div>

        {/* --- EXISTING HERO SECTION (With your specific title) --- */}
        <HeroSection creator={featuredCreator} />
        
        <h2 className="text-xl font-bold mb-4 mt-8">Trending Ministries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {creators.map(c => (
                <Link href={`/creator/${c.slug}`} key={c.slug} className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition group cursor-pointer">
                    <div className="flex items-center gap-4">
                        <img src={c.avatarUrl} className="w-16 h-16 rounded-full object-cover group-hover:scale-110 transition border-2 border-transparent group-hover:border-violet-500"/>
                        <div>
                            <h3 className="font-bold group-hover:text-violet-400 transition">{c.name}</h3>
                            <p className="text-sm text-gray-400">{c.ministry}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
      </div>
    </main>
  );
}
"""

def write_file(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Updated: {path}")

write_file("app/page.tsx", home_page_code)