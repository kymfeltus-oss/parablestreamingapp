import os

print("🧹 Running Housekeeping: New Library Tab, Paid Ads on Home, and Name Fix...")

# 1. UPDATE NAVBAR (Add "Library" Tab)
navbar_code = """ "use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/stream", label: "🔴 Stream" },
  { href: "/feed", label: "Feed" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/library", label: "Library" }, // <--- NEW TAB
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

# 2. CREATE NEW "LIBRARY" PAGE (My Purchases)
library_page_code = """import Navbar from "@/components/Navbar";
import Link from "next/link";
import { BookOpen, Music, Video, Download } from "lucide-react";

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white font-sans">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-8">My Library</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Leadership Course */}
            <Link href="/library/leadership" className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4 hover:border-violet-500 transition group">
                <div className="aspect-video bg-gray-800 rounded-lg mb-4 overflow-hidden relative">
                    <img src="/course_lead.jpg" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-lg"><BookOpen className="w-4 h-4 text-violet-400" /></div>
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-violet-400">Leadership Masterclass</h3>
                <p className="text-sm text-gray-400">Bishop J.D. Rivers</p>
                <div className="mt-4 h-1 bg-gray-700 rounded-full overflow-hidden"><div className="h-full w-[65%] bg-violet-500" /></div>
                <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold">65% Complete</p>
            </Link>

            {/* Conference Replay */}
            <Link href="/library/vision" className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4 hover:border-blue-500 transition group">
                <div className="aspect-video bg-gray-800 rounded-lg mb-4 overflow-hidden relative">
                    <img src="/course_conf.jpg" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-lg"><Video className="w-4 h-4 text-blue-400" /></div>
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-blue-400">2024 Vision Conference</h3>
                <p className="text-sm text-gray-400">Nexus Conference</p>
                <div className="mt-4 flex gap-2">
                    <span className="bg-blue-900/30 text-blue-300 text-[10px] px-2 py-1 rounded font-bold uppercase">Replay Available</span>
                </div>
            </Link>

            {/* Music Stems */}
            <Link href="/library/worship" className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4 hover:border-orange-500 transition group">
                <div className="aspect-video bg-gray-800 rounded-lg mb-4 overflow-hidden relative">
                    <img src="/course_music.jpg" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-lg"><Music className="w-4 h-4 text-orange-400" /></div>
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-orange-400">Worship Arts Vol. 2</h3>
                <p className="text-sm text-gray-400">C-Dub Tools</p>
                <div className="mt-4 flex gap-2">
                    <span className="bg-orange-900/30 text-orange-300 text-[10px] px-2 py-1 rounded font-bold uppercase flex items-center gap-1">
                        <Download className="w-3 h-3" /> Downloaded
                    </span>
                </div>
            </Link>

        </div>
      </main>
    </div>
  );
}
"""

# 3. UPDATE HOME PAGE (Featuring Paid Ads / Partners)
home_page_code = """import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { creators } from "@/lib/preachers";
import Link from "next/link";
import { Activity, Users, DollarSign, Music, Mic2, Headphones, Layers, BookOpen, Video, Star, Calendar } from "lucide-react";

export default function Home() {
  const featuredCreator = creators[0]; 

  return (
    <main className="min-h-screen pb-10 bg-black text-white font-sans">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* DASHBOARD HEADER (Name Fixed: Joshua) */}
        <div className="mb-10 bg-[#111] border border-white/10 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 border-2 border-white/20 flex items-center justify-center text-xl font-bold">
                            J
                        </div>
                        <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-black"></div>
                    </div>
                    <div>
                        {/* FIXED NAME HERE */}
                        <h1 className="text-2xl font-bold text-white">Welcome back, Joshua</h1>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span className="bg-white/10 text-gray-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Member</span>
                            <span>• First Baptist Global</span>
                        </div>
                    </div>
                </div>
                
                {/* Stats */}
                <div className="flex gap-4">
                    <div className="text-center px-4 border-r border-white/10">
                        <div className="text-2xl font-bold text-white">12</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest">Library</div>
                    </div>
                    <div className="text-center px-4">
                        <div className="text-2xl font-bold text-green-400 flex items-center gap-1"><DollarSign className="w-4 h-4" /> 450</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest">Given</div>
                    </div>
                </div>
            </div>
        </div>

        {/* --- FEATURED PARTNERS (PAID ADS SECTION) --- */}
        <div className="mb-8">
            <div className="flex items-center gap-2 mb-4 text-xs font-bold text-yellow-500 uppercase tracking-widest">
                <Star className="w-4 h-4" /> Featured Events
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* AD 1: Elevation Tour */}
                <div className="relative aspect-[21/9] bg-gray-800 rounded-2xl overflow-hidden group cursor-pointer border border-white/10 hover:border-yellow-500/50 transition">
                    <img src="/kirk_banner.jpg" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-center items-start">
                        <span className="bg-yellow-500 text-black text-[10px] font-black px-2 py-1 rounded uppercase mb-2">Sponsored</span>
                        <h2 className="text-3xl font-black italic uppercase mb-2">The Reunion Tour</h2>
                        <p className="text-gray-300 mb-4 max-w-sm">Experience Kirk Franklin live in your city. Get VIP tickets before they sell out.</p>
                        <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-xs uppercase hover:bg-gray-200 transition">Get Tickets</button>
                    </div>
                </div>

                {/* AD 2: Leadership Summit */}
                <div className="relative aspect-[21/9] bg-gray-800 rounded-2xl overflow-hidden group cursor-pointer border border-white/10 hover:border-violet-500/50 transition">
                    <img src="/td_banner.avif" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-center items-start">
                        <span className="bg-violet-600 text-white text-[10px] font-black px-2 py-1 rounded uppercase mb-2">Conference</span>
                        <h2 className="text-3xl font-black italic uppercase mb-2">International Leadership Summit</h2>
                        <p className="text-gray-300 mb-4 max-w-sm">Register now for the premier leadership event of 2025.</p>
                        <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-xs uppercase hover:bg-gray-200 transition">Register Now</button>
                    </div>
                </div>

            </div>
        </div>

        {/* Existing Trending Row (Moved down) */}
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

# EXECUTE
write_file("components/Navbar.tsx", navbar_code)
write_file("app/page.tsx", home_page_code)
write_file("app/library/page.tsx", library_page_code)