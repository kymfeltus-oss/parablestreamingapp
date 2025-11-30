import os

print("💎 Integrating Final Monetization and Gamification Payoff...")

# 1. UPDATE CREATOR PROFILE PAGE (The Monetization Hub)
creator_page_code = """import { getCreatorBySlug } from "@/lib/preachers";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Users, DollarSign, Star, BookOpen, Clock, Heart, Lock, CheckCircle2, ArrowUpRight } from "lucide-react";

export default function CreatorPage({ params }: { params: { slug: string } }) {
  const creator = getCreatorBySlug(params.slug);
  if (!creator) return <div className="p-10 text-white">Creator not found</div>;

  // Mock Data for Monetization & Community
  const mockTiers = [
    { name: "Partner", price: 9.99, perks: ["Exclusive Q&A Channel", "Early Access"], color: "text-violet-400", lock: false },
    { name: "VIP Elite", price: 24.99, perks: ["Digital Library Access", "Monthly Leadership Call", "Sermon Notes"], color: "text-amber-400", lock: false },
  ];
  const isSubscriber = true; // Assume the user is subscribed for the demo

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />
      
      {/* BANNER */}
      <div className="relative h-64 w-full overflow-hidden">
        <img src={creator.bannerUrl} className="absolute inset-0 bg-cover bg-center w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 flex items-end justify-between max-w-7xl mx-auto">
             <div className="flex items-end gap-4">
                 <img src={creator.avatarUrl} className="w-24 h-24 rounded-full border-4 border-white shadow-2xl object-cover" />
                 <div>
                     <h1 className="text-4xl md:text-5xl font-black italic uppercase">{creator.name}</h1>
                     <p className="text-gray-300">{creator.ministry}</p>
                 </div>
             </div>
             
             {/* QUICK STATS & JOIN BUTTON */}
             <div className="flex flex-col items-end gap-3">
                <div className="flex gap-4 text-sm font-bold text-gray-300">
                    <div className="flex items-center gap-1"><Users className="w-4 h-4 text-violet-400" /> {creator.socialStats?.followers || '0'} Followers</div>
                    <div className="flex items-center gap-1"><DollarSign className="w-4 h-4 text-green-400" /> {creator.socialStats?.subscribers || '0'} Subs</div>
                </div>
                <Link href={`/server/${creator.slug}`} className="bg-green-600 hover:bg-green-500 text-black px-6 py-3 rounded-full text-sm font-black uppercase tracking-wide flex items-center gap-2 shadow-lg shadow-green-600/30">
                    <Users className="w-5 h-5" /> Join Ministry Hub
                </Link>
             </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT COLUMN: Content & Monetization */}
        <div className="lg:col-span-2 space-y-10">
            <h2 className="text-3xl font-bold mb-4">Partner Tiers & Access</h2>
            
            {/* SUBSCRIPTION CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mockTiers.map((tier) => (
                    <div key={tier.name} className="bg-[#111] border-2 border-white/10 p-6 rounded-2xl relative shadow-xl hover:border-violet-500 transition duration-300">
                        <span className={`text-xl font-black italic ${tier.color}`}>{tier.name}</span>
                        <div className="text-3xl font-bold my-3">${tier.price} <span className="text-sm text-gray-500 font-normal">/ month</span></div>
                        <p className="text-gray-400 mb-4">{tier.perks[0]}</p>
                        <ul className="space-y-2 text-sm">
                            {tier.perks.map((perk) => (
                                <li key={perk} className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" /> {perk}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full mt-6 bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 rounded-full text-sm uppercase">
                            Subscribe Now
                        </button>
                    </div>
                ))}
            </div>

            {/* AI GAMIFICATION TRACKER (Simulating Progress Tracking) */}
            <h2 className="text-3xl font-bold mt-10 mb-4 flex items-center gap-2"><Zap className="w-5 h-5 text-yellow-400" /> My Progression</h2>
            <div className="bg-[#111] border border-white/10 p-6 rounded-2xl space-y-3">
                <div className="flex justify-between text-gray-400 text-sm font-bold">
                    <span>Sermon Series XP</span>
                    <span>1,850 / 2,000 XP</span>
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div className="h-full w-[92.5%] bg-yellow-500 rounded-full"></div>
                </div>
                <p className="text-xs text-gray-500 flex items-center gap-1"><Star className="w-3 h-3 text-white" /> Complete this to unlock the **Elder** role on the server!</p>
            </div>


            {/* DIGITAL RESOURCE STORE */}
            <h2 className="text-3xl font-bold mt-10 mb-4">Digital Resources</h2>
            <div className="grid grid-cols-3 gap-4">
                <div className="group cursor-pointer">
                    <div className="aspect-[3/4] bg-gray-800 rounded-lg mb-2 overflow-hidden relative shadow-lg">
                        <img src="/course_lead.jpg" className="w-full h-full object-cover group-hover:scale-105 transition" />
                    </div>
                    <div className="font-bold text-sm">Leadership Workbook</div>
                    <div className="text-xs text-green-400">$19.99</div>
                </div>
            </div>
        </div>

        {/* RIGHT COLUMN: Community Access & Stream Info */}
        <div className="space-y-8">
            
            {/* LIVE STREAM SNAPSHOT */}
            <div className="bg-[#18181b] p-6 rounded-2xl border border-red-500/30 relative">
                <h3 className="text-lg font-black uppercase mb-2">Live Now</h3>
                <div className="text-xs text-gray-400 flex items-center gap-2 mb-4">
                    <Clock className="w-3 h-3" /> Streaming for 45 mins
                </div>
                <img src="/td_banner.avif" className="w-full h-24 object-cover rounded mb-3 opacity-60" />
                <Link href="/stream" className="block w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2 rounded-full text-xs uppercase text-center">
                    Watch Stream
                </Link>
            </div>

            {/* DISCORD/SERVER CHANNELS (Role-Based Access) */}
            <div className="bg-[#18181b] p-6 rounded-2xl border border-violet-500/30">
                <h3 className="text-lg font-black uppercase mb-4 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-violet-400" /> Locked Channels
                </h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4 text-amber-400" />
                            <span className="text-sm">#leadership-mastermind</span>
                        </div>
                        <span className="text-xs font-bold bg-amber-400/10 text-amber-400 px-2 py-0.5 rounded">VIP ONLY</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4 text-amber-400" />
                            <span className="text-sm">#private-q-a</span>
                        </div>
                        <span className="text-xs font-bold bg-amber-400/10 text-amber-400 px-2 py-0.5 rounded">VIP ONLY</span>
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-4">Upgrade your role to access these exclusive channels.</p>
            </div>
        </div>

      </div>
    </div>
  );
}
"""

# 2. UPDATE HOME PAGE (Integrate Gamification UI)
home_page_code = """import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { creators } from "@/lib/preachers";
import Link from "next/link";
import { Activity, Users, DollarSign, Music, Mic2, Headphones, Layers, BookOpen, Video, Star, ArrowUpRight, Play, MoreHorizontal, Zap } from "lucide-react";

export default function Home() {
  const featuredCreator = creators[0]; 

  return (
    <main className="min-h-screen pb-10 bg-black text-white font-sans">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* DASHBOARD HEADER (NOW WITH GAMIFICATION) */}
        <div className="mb-10 bg-[#111] border border-white/10 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                
                {/* User Info (Joshua + XP Bar) */}
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 border-2 border-white/20 flex items-center justify-center text-xl font-bold">J</div>
                        <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-black"></div>
                    </div>
                    
                    {/* NAME & XP BAR */}
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold text-white">Welcome back, Joshua</h1>
                        
                        {/* XP BAR */}
                        <div className="flex items-center gap-3 mt-1">
                            <div className="flex items-center gap-1 text-sm font-bold text-gray-300">
                                <Zap className="w-3 h-3 text-yellow-400 fill-yellow-400" /> Lvl 12
                            </div>
                            <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full w-[75%] bg-yellow-500 rounded-full"></div>
                            </div>
                            <span className="text-xs text-gray-500">75% to Lvl 13</span>
                        </div>

                        {/* ROLES / BADGES */}
                        <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
                            <span className="bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Pastor</span>
                            <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Influencer</span>
                            <span>• Kingdom Impact Center</span>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="flex gap-4">
                    <div className="text-center px-4 border-r border-white/10"><div className="text-2xl font-bold text-white">12.5k</div><div className="text-[10px] text-gray-500 uppercase tracking-widest">Reach</div></div>
                    <div className="text-center px-4 border-r border-white/10"><div className="text-2xl font-bold text-green-400 flex items-center gap-1"><DollarSign className="w-4 h-4" /> 2.4k</div><div className="text-[10px] text-gray-500 uppercase tracking-widest">Giving</div></div>
                    <div className="text-center px-4"><div className="text-2xl font-bold text-gray-400 flex items-center gap-1">Offline</div><div className="text-[10px] text-gray-500 uppercase tracking-widest">Status</div></div>
                </div>
            </div>

            {/* CREATOR TOOLS */}
            <div className="mt-6 pt-6 border-t border-white/5">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Creator Tools</h3>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    
                    <Link href="/stream" className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition shrink-0 shadow-lg shadow-red-900/20">
                        <Activity className="w-4 h-4" /> Go Live
                    </Link>

                    <Link href="/tools/sermon-prep" className="flex items-center gap-2 bg-[#222] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#333] transition border border-white/10 shrink-0">
                        <BookOpen className="w-4 h-4 text-violet-400" /> Sermon Notes
                    </Link>

                    <a href="https://loopsbycdubmobile.com/all-loops" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#222] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#333] transition border border-white/10 shrink-0 group">
                        <Layers className="w-4 h-4 text-blue-400" /> Access Loop Library <ArrowUpRight className="w-3 h-3 text-gray-500 group-hover:text-white" />
                    </a>

                    <Link href="/music/shed/start" className="flex items-center gap-2 bg-[#222] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#333] transition border border-white/10 shrink-0">
                        <Headphones className="w-4 h-4 text-orange-400" /> Schedule Shed
                    </Link>

                    <Link href="/stream" className="flex items-center gap-2 bg-[#222] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#333] transition border border-white/10 shrink-0">
                        <Video className="w-4 h-4 text-green-400" /> Upload Reel
                    </Link>

                </div>
            </div>
        </div>

        <HeroSection creator={featuredCreator} />
        
        {/* RECENT TEACHINGS (WITH FIXED LINK FOR UPLOAD) */}
        <div className="mb-10">
            <div className="flex justify-between items-end mb-4"><h2 className="text-xl font-bold text-white flex items-center gap-2"><BookOpen className="w-5 h-5 text-gray-400" /> Recent Teachings</h2><span className="text-xs text-gray-500 font-bold uppercase cursor-pointer hover:text-white">View All</span></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5 hover:border-white/20 transition cursor-pointer group">
                    <div className="flex justify-between items-start mb-3"><span className="bg-violet-900/30 text-violet-300 text-[10px] font-bold px-2 py-1 rounded">Sunday Service</span><MoreHorizontal className="w-4 h-4 text-gray-500" /></div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-violet-400 transition">Walking in Authority</h3><p className="text-xs text-gray-400 mb-4">Streamed 2 days ago • 1.2k Views</p>
                    <div className="flex gap-2"><button className="flex-1 bg-white/5 hover:bg-white/10 py-2 rounded text-xs font-bold text-gray-300">Analytics</button><button className="flex-1 bg-white/5 hover:bg-white/10 py-2 rounded text-xs font-bold text-gray-300">Edit</button></div>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5 hover:border-white/20 transition cursor-pointer group">
                    <div className="flex justify-between items-start mb-3"><span className="bg-blue-900/30 text-blue-300 text-[10px] font-bold px-2 py-1 rounded">Bible Study</span><MoreHorizontal className="w-4 h-4 text-gray-500" /></div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-blue-400 transition">The Power of Prayer</h3><p className="text-xs text-gray-400 mb-4">Streamed 5 days ago • 850 Views</p>
                    <div className="flex gap-2"><button className="flex-1 bg-white/5 hover:bg-white/10 py-2 rounded text-xs font-bold text-gray-300">Analytics</button><button className="flex-1 bg-white/5 hover:bg-white/10 py-2 rounded text-xs font-bold text-gray-300">Edit</button></div>
                </div>
                
                {/* UPLOAD NEW TEACHING -> LINKS TO SERMON PREP */}
                <Link href="/tools/sermon-prep" className="border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition p-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-2"><Play className="w-5 h-5" /></div>
                    <span className="text-sm font-bold uppercase">Upload New Teaching</span>
                </Link>
            </div>
        </div>

        <HeroSection creator={featuredCreator} />
        
        {/* FEATURED ADS */}
        <div className="mb-8">
            <div className="flex items-center gap-2 mb-4 text-xs font-bold text-yellow-500 uppercase tracking-widest"><Star className="w-4 h-4" /> Featured Events</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/events/kirk-tour" className="relative aspect-[21/9] bg-gray-800 rounded-2xl overflow-hidden group cursor-pointer border border-white/10 hover:border-yellow-500/50 transition">
                    <img src="/kirk_banner.jpg" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-center items-start"><span className="bg-yellow-500 text-black text-[10px] font-black px-2 py-1 rounded uppercase mb-2">Sponsored</span><h2 className="text-3xl font-black italic uppercase mb-2">The Reunion Tour</h2><p className="text-gray-300 mb-4 max-w-sm">Experience Kirk Franklin live in your city.</p><button className="bg-white text-black px-6 py-2 rounded-full font-bold text-xs uppercase hover:bg-gray-200 transition">Get Tickets</button></div>
                </Link>
                <Link href="/events/ils-2025" className="relative aspect-[21/9] bg-gray-800 rounded-2xl overflow-hidden group cursor-pointer border border-white/10 hover:border-violet-500/50 transition">
                    <img src="/td_banner.avif" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-center items-start"><span className="bg-violet-600 text-white text-[10px] font-black px-2 py-1 rounded uppercase mb-2">Conference</span><h2 className="text-3xl font-black italic uppercase mb-2">International Leadership Summit</h2><p className="text-gray-300 mb-4 max-w-sm">Register now for the premier leadership event of 2025.</p><button className="bg-white text-black px-6 py-2 rounded-full font-bold text-xs uppercase hover:bg-gray-200 transition">Register Now</button></div>
                </Link>
            </div>
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