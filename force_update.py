import os

files = {
    # 1. UPDATE NAVBAR (Force add "Dashboard" link)
    "components/Navbar.tsx": """ "use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "MY DASHBOARD" }, // <--- New Link
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

        <nav className="hidden items-center gap-6 text-sm text-gray-300 sm:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition hover:text-white ${
                  active ? "text-violet-400 font-bold border-b-2 border-violet-500 pb-0.5" : ""
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
             <Link href="/dashboard" className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold hover:bg-gray-200 transition">
                Go to Dashboard
             </Link>
        </div>
      </div>
    </header>
  );
}""",

    # 2. UPDATE HOME PAGE (Add a big button to find the Dashboard)
    "app/page.tsx": """import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { creators } from "@/lib/preachers";
import Link from "next/link";

export default function Home() {
  const featuredCreator = creators[0];

  return (
    <main className="min-h-screen pb-10 bg-black text-white">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">

        {/* NEW BANNER TO SHOW THE UPDATE */}
        <div className="mb-8 p-4 bg-gradient-to-r from-violet-900/50 to-blue-900/50 border border-violet-500/30 rounded-2xl flex items-center justify-between">
            <div>
                <h2 className="font-bold text-lg">✨ New Feature: User Dashboard</h2>
                <p className="text-sm text-gray-300">Track your favorite ministries and view your purchased content.</p>
            </div>
            <Link href="/dashboard" className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-2 rounded-full font-bold text-sm transition shadow-lg shadow-violet-500/20">
                Open Dashboard
            </Link>
        </div>

        <HeroSection creator={featuredCreator} />

        <h2 className="text-xl font-bold mb-4 mt-8">Trending Ministries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {creators.map(c => (
                <Link href={`/creator/${c.slug}`} key={c.slug} className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition group">
                    <div className="flex items-center gap-4">
                        <img src={c.avatarUrl} className="w-16 h-16 rounded-full object-cover group-hover:scale-110 transition"/>
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
}"""
}

for filepath, content in files.items():
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Updated: {filepath}")