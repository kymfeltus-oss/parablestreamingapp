import os

print("🚀 Building AI Sermon Studio & Fixing Navigation...")

# 1. NEW AI SERMON STUDIO PAGE (Teleprompter + AI Compare)
sermon_prep_code = """import Navbar from "@/components/Navbar";
import { Mic, FileText, Play, Wand2, ArrowLeft, CheckCircle2, SplitSquareHorizontal } from "lucide-react";
import Link from "next/link";

export default function SermonPrepPage() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white font-sans pb-20">
      <Navbar />
      
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-8">
        <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition text-sm font-bold uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-8">AI Sermon Studio</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* LEFT: TELEPROMPTER / EDITOR */}
            <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-6 flex flex-col h-[600px]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <FileText className="w-5 h-5 text-violet-400" /> Sermon Editor
                    </h2>
                    <button className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                        <Play className="w-4 h-4" /> Start Teleprompter
                    </button>
                </div>
                <textarea 
                    className="flex-1 bg-[#0e0e0e] border border-white/10 rounded-xl p-4 text-lg leading-relaxed text-gray-300 focus:outline-none focus:border-violet-500 resize-none"
                    placeholder="Paste your sermon notes or outline here..."
                    defaultValue="Topic: Faith in the Fire\n\n1. The Heat is Necessary\n- Gold is refined in fire.\n- Pressure creates diamonds.\n\n2. Who is in the Fire with You?\n- Shadrach, Meshach, and Abednego didn't burn.\n- The fourth man is always there.\n\n3. Coming Out Without the Smell of Smoke\n- Your testimony will outlast your trial."
                ></textarea>
            </div>

            {/* RIGHT: AI ANALYSIS & COMPARISON */}
            <div className="space-y-6">
                
                {/* AI Feature 1: Post-Sermon Comparison */}
                <div className="bg-gradient-to-br from-blue-900/20 to-black border border-blue-500/30 rounded-3xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20"><Wand2 className="w-24 h-24 text-blue-500" /></div>
                    <h3 className="text-2xl font-bold mb-2 text-blue-400">AI Accuracy Check</h3>
                    <p className="text-gray-400 text-sm mb-6">
                        Upload your live recording. AI will compare what you <em>said</em> vs. what you <em>wrote</em> to help you refine your delivery.
                    </p>
                    
                    <div className="bg-black/40 border border-white/10 rounded-xl p-4 mb-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400"><CheckCircle2 className="w-4 h-4" /></div>
                            <span className="text-sm font-bold">Last Week's Score: 92% Match</span>
                        </div>
                        <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                            <div className="bg-green-500 h-full w-[92%]"></div>
                        </div>
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl uppercase text-xs tracking-wide flex items-center justify-center gap-2">
                        <Mic className="w-4 h-4" /> Upload Audio for Analysis
                    </button>
                </div>

                {/* AI Feature 2: Smart Suggestions */}
                <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <SplitSquareHorizontal className="w-5 h-5 text-orange-400" /> Auto-Scripting
                    </h3>
                    <p className="text-xs text-gray-400 mb-4">
                        Stuck on a point? Let AI suggest a scripture or illustration.
                    </p>
                    <div className="space-y-2">
                        <button className="w-full bg-[#222] hover:bg-[#333] text-left px-4 py-3 rounded-lg text-sm text-gray-300 border border-white/5">
                            ✨ Suggest a closing prayer
                        </button>
                        <button className="w-full bg-[#222] hover:bg-[#333] text-left px-4 py-3 rounded-lg text-sm text-gray-300 border border-white/5">
                            📖 Find scriptures on "Resilience"
                        </button>
                    </div>
                </div>

            </div>
        </div>
      </main>
    </div>
  );
}
"""

# 2. NEW EVENT DETAILS PAGE (For Featured Ads)
event_page_code = """import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Calendar, MapPin, Ticket, ArrowLeft, PlayCircle } from "lucide-react";

export default function EventPage({ params }: { params: { id: string } }) {
  // Mock Data Logic
  const isKirk = params.id === "kirk-tour";
  const title = isKirk ? "The Reunion Tour: Kirk Franklin Live" : "International Leadership Summit 2025";
  const image = isKirk ? "/kirk_banner.jpg" : "/td_banner.avif";
  
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white font-sans pb-20">
      <Navbar />
      
      <div className="relative h-[50vh]">
        <img src={image} className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 max-w-7xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-4 text-xs font-bold uppercase tracking-wider">
                <ArrowLeft className="w-4 h-4" /> Back
            </Link>
            <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">{title}</h1>
            <div className="flex flex-wrap gap-6 text-sm font-bold text-gray-300">
                <div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-violet-500" /> OCT 12 - NOV 15</div>
                <div className="flex items-center gap-2"><MapPin className="w-5 h-5 text-violet-500" /> NATIONWIDE TOUR</div>
            </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-center justify-between shadow-2xl">
            <div>
                <h2 className="text-2xl font-bold mb-2">Secure Your Spot</h2>
                <p className="text-gray-400">Tickets are selling fast. VIP packages include Meet & Greet.</p>
            </div>
            <div className="flex gap-4">
                <button className="bg-white text-black px-8 py-3 rounded-full font-extrabold uppercase tracking-wide hover:bg-gray-200 transition">
                    Buy Tickets
                </button>
                <button className="bg-transparent border border-white/30 text-white px-6 py-3 rounded-full font-bold uppercase tracking-wide hover:bg-white/10 transition">
                    View Trailer
                </button>
            </div>
        </div>
      </main>
    </div>
  );
}
"""

# 3. UPDATE HOME PAGE (Recent Teachings + Correct Links)
home_page_code = """import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { creators } from "@/lib/preachers";
import Link from "next/link";
import { Activity, Users, DollarSign, Music, Mic2, Headphones, Layers, BookOpen, Video, Star, ArrowUpRight, Play, MoreHorizontal } from "lucide-react";

export default function Home() {
  const featuredCreator = creators[0]; 

  return (
    <main className="min-h-screen pb-10 bg-black text-white font-sans">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* DASHBOARD HEADER */}
        <div className="mb-10 bg-[#111] border border-white/10 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
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
                <div className="flex gap-4">
                    <div className="text-center px-4 border-r border-white/10"><div className="text-2xl font-bold text-white">12.5k</div><div className="text-[10px] text-gray-500 uppercase tracking-widest">Reach</div></div>
                    <div className="text-center px-4 border-r border-white/10"><div className="text-2xl font-bold text-green-400 flex items-center gap-1"><DollarSign className="w-4 h-4" /> 2.4k</div><div className="text-[10px] text-gray-500 uppercase tracking-widest">Giving</div></div>
                    <div className="text-center px-4"><div className="text-2xl font-bold text-gray-400 flex items-center gap-1">Offline</div><div className="text-[10px] text-gray-500 uppercase tracking-widest">Status</div></div>
                </div>
            </div>

            {/* CREATOR TOOLS (FIXED LINKS) */}
            <div className="mt-6 pt-6 border-t border-white/5">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Creator Tools</h3>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    
                    {/* Go Live -> Stream Hub */}
                    <Link href="/stream" className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition shrink-0 shadow-lg shadow-red-900/20">
                        <Activity className="w-4 h-4" /> Go Live
                    </Link>

                    {/* Sermon Notes -> AI Studio */}
                    <Link href="/tools/sermon-prep" className="flex items-center gap-2 bg-[#222] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#333] transition border border-white/10 shrink-0">
                        <BookOpen className="w-4 h-4 text-violet-400" /> Sermon Notes
                    </Link>

                    {/* C-Dub -> External */}
                    <a href="https://loopsbycdubmobile.com/all-loops" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#222] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#333] transition border border-white/10 shrink-0 group">
                        <Layers className="w-4 h-4 text-blue-400" /> Access Loop Library <ArrowUpRight className="w-3 h-3 text-gray-500 group-hover:text-white" />
                    </a>

                    {/* Shed -> Music Page */}
                    <Link href="/music" className="flex items-center gap-2 bg-[#222] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#333] transition border border-white/10 shrink-0">
                        <Headphones className="w-4 h-4 text-orange-400" /> Schedule Shed
                    </Link>

                    {/* Upload Reel -> Stream Hub */}
                    <Link href="/stream" className="flex items-center gap-2 bg-[#222] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#333] transition border border-white/10 shrink-0">
                        <Video className="w-4 h-4 text-green-400" /> Upload Reel
                    </Link>

                </div>
            </div>
        </div>

        {/* --- RECENT TEACHINGS (NEW SECTION) --- */}
        <div className="mb-10">
            <div className="flex justify-between items-end mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2"><BookOpen className="w-5 h-5 text-gray-400" /> Recent Teachings</h2>
                <span className="text-xs text-gray-500 font-bold uppercase cursor-pointer hover:text-white">View All</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Teaching 1 */}
                <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5 hover:border-white/20 transition cursor-pointer group">
                    <div className="flex justify-between items-start mb-3">
                        <span className="bg-violet-900/30 text-violet-300 text-[10px] font-bold px-2 py-1 rounded">Sunday Service</span>
                        <MoreHorizontal className="w-4 h-4 text-gray-500" />
                    </div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-violet-400 transition">Walking in Authority</h3>
                    <p className="text-xs text-gray-400 mb-4">Streamed 2 days ago • 1.2k Views</p>
                    <div className="flex gap-2">
                        <button className="flex-1 bg-white/5 hover:bg-white/10 py-2 rounded text-xs font-bold text-gray-300">Analytics</button>
                        <button className="flex-1 bg-white/5 hover:bg-white/10 py-2 rounded text-xs font-bold text-gray-300">Edit</button>
                    </div>
                </div>
                {/* Teaching 2 */}
                <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5 hover:border-white/20 transition cursor-pointer group">
                    <div className="flex justify-between items-start mb-3">
                        <span className="bg-blue-900/30 text-blue-300 text-[10px] font-bold px-2 py-1 rounded">Bible Study</span>
                        <MoreHorizontal className="w-4 h-4 text-gray-500" />
                    </div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-blue-400 transition">The Power of Prayer</h3>
                    <p className="text-xs text-gray-400 mb-4">Streamed 5 days ago • 850 Views</p>
                    <div className="flex gap-2">
                        <button className="flex-1 bg-white/5 hover:bg-white/10 py-2 rounded text-xs font-bold text-gray-300">Analytics</button>
                        <button className="flex-1 bg-white/5 hover:bg-white/10 py-2 rounded text-xs font-bold text-gray-300">Edit</button>
                    </div>
                </div>
                {/* Upload New */}
                <Link href="/stream" className="border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition p-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-2"><Play className="w-5 h-5" /></div>
                    <span className="text-sm font-bold uppercase">Upload New Teaching</span>
                </Link>
            </div>
        </div>

        <HeroSection creator={featuredCreator} />
        
        {/* FEATURED ADS (FIXED LINKS) */}
        <div className="mb-8">
            <div className="flex items-center gap-2 mb-4 text-xs font-bold text-yellow-500 uppercase tracking-widest">
                <Star className="w-4 h-4" /> Featured Events
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/events/kirk-tour" className="relative aspect-[21/9] bg-gray-800 rounded-2xl overflow-hidden group cursor-pointer border border-white/10 hover:border-yellow-500/50 transition">
                    <img src="/kirk_banner.jpg" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-center items-start">
                        <span className="bg-yellow-500 text-black text-[10px] font-black px-2 py-1 rounded uppercase mb-2">Sponsored</span>
                        <h2 className="text-3xl font-black italic uppercase mb-2">The Reunion Tour</h2>
                        <p className="text-gray-300 mb-4 max-w-sm">Experience Kirk Franklin live in your city.</p>
                        <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-xs uppercase hover:bg-gray-200 transition">Get Tickets</button>
                    </div>
                </Link>
                <Link href="/events/ils-2025" className="relative aspect-[21/9] bg-gray-800 rounded-2xl overflow-hidden group cursor-pointer border border-white/10 hover:border-violet-500/50 transition">
                    <img src="/td_banner.avif" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-center items-start">
                        <span className="bg-violet-600 text-white text-[10px] font-black px-2 py-1 rounded uppercase mb-2">Conference</span>
                        <h2 className="text-3xl font-black italic uppercase mb-2">International Leadership Summit</h2>
                        <p className="text-gray-300 mb-4 max-w-sm">Register now for the premier leadership event of 2025.</p>
                        <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-xs uppercase hover:bg-gray-200 transition">Register Now</button>
                    </div>
                </Link>
            </div>
        </div>

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
    # Ensure directory exists
    directory = os.path.dirname(path)
    if directory and not os.path.exists(directory):
        os.makedirs(directory)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Updated/Created: {path}")

# EXECUTE
write_file("app/tools/sermon-prep/page.tsx", sermon_prep_code)
write_file("app/events/[id]/page.tsx", event_page_code)
write_file("app/page.tsx", home_page_code)