import os

print("💰 Integrating Final Monetization & E-commerce Strategy...")

# 1. UPDATE HOME PAGE (Adding Platform Revenue & Branding Tools)
home_page_code = """import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { creators } from "@/lib/preachers";
import Link from "next/link";
import { Activity, Users, DollarSign, Music, Mic2, Headphones, Layers, BookOpen, Video, Star, ArrowUpRight, Play, MoreHorizontal, Zap, Camera, Shield, PiggyBank } from "lucide-react";

export default function Home() {
  const featuredCreator = creators[0]; 

  return (
    <main className="min-h-screen pb-10 bg-black text-white font-sans">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* DASHBOARD HEADER (Platform-Side Tools) */}
        <div className="mb-10 bg-[#111] border border-white/10 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                
                {/* User Info (Joshua) */}
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 border-2 border-white/20 flex items-center justify-center text-xl font-bold">J</div>
                        <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-black"></div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Welcome back, Joshua</h1>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span className="bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Pastor</span>
                            <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Influencer</span>
                            <span>• Kingdom Impact Center</span>
                        </div>
                    </div>
                </div>
                
                {/* REVENUE SNAPSHOT (Platform-Side Monetization Mock) */}
                <div className="flex gap-4 bg-[#0a0a0a] p-4 rounded-xl border border-white/5">
                    <div className="text-center px-3 border-r border-white/10">
                        <div className="text-xl font-bold text-green-400 flex items-center gap-1"><DollarSign className="w-4 h-4" /> 75%</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest">Creator Share</div>
                    </div>
                    <div className="text-center px-3">
                        <div className="text-xl font-bold text-white">4.2k</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest">Active Subs</div>
                    </div>
                </div>
            </div>

            {/* CREATOR TOOLS (NOW INCLUDES BRANDING SUITE) */}
            <div className="mt-6 pt-6 border-t border-white/5">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Creator Tools</h3>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    
                    <Link href="/stream" className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition shrink-0 shadow-lg shadow-red-900/20">
                        <Activity className="w-4 h-4" /> Go Live
                    </Link>

                    <Link href="/tools/sermon-prep" className="flex items-center gap-2 bg-[#222] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#333] transition border border-white/10 shrink-0">
                        <BookOpen className="w-4 h-4 text-violet-400" /> Sermon Notes
                    </Link>
                    
                    {/* NEW: AI BRANDING SUITE */}
                    <Link href="/tools/branding" className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-500 text-black px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition shrink-0 shadow-lg shadow-yellow-900/20">
                        <Camera className="w-4 h-4" /> AI Branding Suite
                    </Link>

                    {/* NEW: DONOR MANAGEMENT/CRM */}
                    <Link href="/tools/crm" className="flex items-center gap-2 bg-[#222] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#333] transition border border-white/10 shrink-0">
                        <PiggyBank className="w-4 h-4 text-pink-400" /> Donor Management
                    </Link>

                    <Link href="/music/shed/start" className="flex items-center gap-2 bg-[#222] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#333] transition border border-white/10 shrink-0">
                        <Headphones className="w-4 h-4 text-orange-400" /> Schedule Shed
                    </Link>
                </div>
            </div>
        </div>

        {/* Existing Content */}
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

# 2. UPDATE CREATOR PROFILE PAGE (The E-commerce & Subscription Hub)
creator_page_code = """import { getCreatorBySlug } from "@/lib/preachers";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Users, DollarSign, Star, BookOpen, Clock, Heart, Lock, CheckCircle2, ArrowUpRight, ShoppingBag, Layers, Activity, Zap } from "lucide-react";

export default function CreatorPage({ params }: { params: { slug: string } }) {
  const creator = getCreatorBySlug(params.slug);
  if (!creator) return <div className="p-10 text-white">Creator not found</div>;

  // Mock Data for Monetization
  const mockTiers = [
    { name: "Sponsor", price: 9.99, perks: ["Prayer Warrior Role", "Exclusive Q&A Channel"], lock: false },
    { name: "VIP Partner", price: 24.99, perks: ["Digital Library Access", "Leadership Mastermind Group", "Sermon Notes"], lock: false },
  ];
  const mockProducts = [
    { name: "The Potters House Mug", price: 19.99, type: "Merchandise" },
    { name: "Sermon Outline E-book", price: 9.99, type: "Digital Asset" },
    { name: "Digital Collectible: Faith", price: 199.00, type: "NFT/Collect" },
  ]

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />
      
      {/* BANNER */}
      <div className="relative h-64 w-full overflow-hidden">
        <img src={creator.bannerUrl} className="absolute inset-0 bg-cover bg-center w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 flex items-end justify-between max-w-7xl mx-auto">
             <div className="flex items-end gap-4">
                 <img src={creator.avatarUrl} className="w-24 h-24 rounded-full border-4 border-black shadow-2xl object-cover" />
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
        
        {/* LEFT COLUMN: Tiers & E-commerce */}
        <div className="lg:col-span-2 space-y-12">
            
            {/* TIERED MONETIZATION */}
            <h2 className="text-3xl font-black italic uppercase mb-6 flex items-center gap-3"><Star className="w-6 h-6 text-yellow-400" /> Partner Tiers & Access</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {mockTiers.map((tier) => (
                    <div key={tier.name} className="bg-[#111] border-2 border-white/10 p-6 rounded-2xl relative shadow-xl hover:border-amber-500 transition duration-300">
                        <span className="text-xl font-black italic text-amber-400">{tier.name}</span>
                        <div className="text-4xl font-bold my-3">${tier.price} <span className="text-sm text-gray-500 font-normal">/ month</span></div>
                        <ul className="space-y-2 text-sm">
                            {tier.perks.map((perk) => (
                                <li key={perk} className="flex items-start gap-2 text-gray-300">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 shrink-0" /> {perk}
                                </li>
                            ))}
                            <li className="flex items-center gap-2 text-red-400 font-bold">
                                <Activity className="w-4 h-4" /> Priority Chat Highlight
                            </li>
                        </ul>
                        <button className="w-full mt-6 bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-full text-sm uppercase shadow-lg shadow-amber-900/30">
                            Subscribe Now
                        </button>
                    </div>
                ))}
            </div>

            {/* DIGITAL PRODUCTS & MERCH SHELF */}
            <h2 className="text-3xl font-black italic uppercase mt-12 mb-6 flex items-center gap-3"><ShoppingBag className="w-6 h-6 text-blue-400" /> Digital Storefront</h2>
            <div className="grid grid-cols-3 gap-4">
                {mockProducts.map((product) => (
                    <div key={product.name} className="group cursor-pointer">
                        <div className="aspect-[3/4] bg-gray-800 rounded-lg mb-2 overflow-hidden relative shadow-xl">
                            <img src="/course_lead.jpg" className="w-full h-full object-cover group-hover:scale-105 transition" />
                            {product.type === 'NFT/Collect' && (
                                <div className="absolute top-0 left-0 bg-violet-600 text-white text-[10px] px-2 py-1 rounded-br-lg font-bold">NFT</div>
                            )}
                        </div>
                        <div className="font-bold text-sm group-hover:text-blue-400">{product.name}</div>
                        <div className="text-xs text-green-400 font-bold">${product.price}</div>
                    </div>
                ))}
            </div>
            
        </div>

        {/* RIGHT COLUMN: Community Access & Gifting */}
        <div className="space-y-8">
            
            {/* VIRTUAL SEED & GIVING */}
            <div className="bg-[#18181b] p-6 rounded-2xl border border-white/10 text-center">
                <h3 className="text-lg font-black uppercase mb-2 flex items-center justify-center gap-2"><Zap className="w-5 h-5 text-yellow-400" /> Prophetic Seeds & Gifting</h3>
                <p className="text-gray-400 text-sm mb-4">Support the ministry with virtual tokens (Seeds) during live stream.</p>
                <div className="flex gap-3">
                    <button className="flex-1 bg-yellow-500 text-black font-bold py-3 rounded-full text-xs uppercase">Buy Seeds</button>
                    <button className="flex-1 border border-white/20 text-white font-bold py-3 rounded-full text-xs uppercase">Tithe Now</button>
                </div>
            </div>

            {/* LOCKED CHANNELS PREVIEW */}
            <div className="bg-[#18181b] p-6 rounded-2xl border border-violet-500/30">
                <h3 className="text-lg font-black uppercase mb-4 flex items-center gap-2"><Lock className="w-5 h-5 text-red-400" /> Exclusive Channels</h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4 text-red-400" />
                            <span className="text-sm">#leadership-mastermind</span>
                        </div>
                        <span className="text-xs font-bold bg-red-400/10 text-red-400 px-2 py-0.5 rounded">VIP ONLY</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4 text-red-400" />
                            <span className="text-sm">#daily-devotion</span>
                        </div>
                        <span className="text-xs font-bold bg-red-400/10 text-red-400 px-2 py-0.5 rounded">PARTNER ONLY</span>
                    </div>
                </div>
            </div>

            {/* PLATFORM MERCH COLAB */}
            <div className="bg-[#18181b] p-6 rounded-2xl border border-green-500/30 text-center">
                 <h3 className="text-lg font-black uppercase mb-2 flex items-center justify-center gap-2"><Layers className="w-5 h-5 text-green-400" /> Platform Collabs</h3>
                 <p className="text-xs text-gray-400 mb-4">Exclusive NexusFaith merch designed with {creator.name} (Revenue Share Model).</p>
                 <button className="w-full bg-green-600 hover:bg-green-500 text-black font-bold py-3 rounded-full text-xs uppercase">View Collection</button>
            </div>
        </div>

      </div>
    </div>
  );
}
"""

def write_file(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Updated: {path}")

# EXECUTE
write_file("app/page.tsx", home_page_code)
write_file("app/creator/[slug]/page.tsx", creator_page_code)