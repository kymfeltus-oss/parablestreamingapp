import os
import urllib.request

# 1. SETUP FOLDERS
if not os.path.exists("public"):
    os.makedirs("public")

# 2. DOWNLOAD REAL IMAGES (Directly from high-quality sources)
print("⬇️ Downloading images...")

# Hero Image (Preacher + Crowd)
hero_url = "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1600"
urllib.request.urlretrieve(hero_url, "public/hero.jpg")

# Profile Avatar (Cool modern pastor style)
avatar_url = "https://images.pexels.com/photos/1181681/pexels-photo-1181681.jpeg?auto=compress&cs=tinysrgb&w=800"
urllib.request.urlretrieve(avatar_url, "public/pastor_mike.jpg")

print("✅ Images downloaded to 'public/' folder.")

# 3. UPDATE DATABASE WITH REAL INFLUENCER PROFILE
preachers_code = """export type StreamCategory = "Live" | "Teaching" | "Conference" | "Youth" | "Worship" | "Real Talk";

export interface Stream {
  id: string;
  title: string;
  category: StreamCategory;
  isLive: boolean;
  viewers: number;
  thumbnailUrl: string;
  scheduledFor?: string;
}

export interface Creator {
  slug: string;
  name: string;
  ministry: string;
  avatarUrl: string;
  bannerUrl: string;
  tags: string[];
  shortTagline: string;
  bio: string;
  socialStats: { followers: string; subscribers: string; instagram: string };
  liveStream?: Stream;
  featuredStreams: Stream[];
  monetization: string[];
}

export const creators: Creator[] = [
  {
    slug: "pastor-mike-real",
    name: "Pastor Mike Jr.",
    ministry: "Transformation Church Global",
    avatarUrl: "/pastor_mike.jpg",
    bannerUrl: "/hero.jpg",
    tags: ["#RelationshipGoals", "#Hype", "#RealTalk"],
    shortTagline: "Faith that moves at the speed of culture.",
    bio: "Pastor Mike is bridging the gap between faith and culture. Known for his viral series 'Relationship Goals' and 'Crazy Faith', he leads a movement of millennials and Gen Z believers.",
    socialStats: {
      followers: "2.4M",
      subscribers: "1.8M",
      instagram: "@pastormike"
    },
    liveStream: {
      id: "mike-live-1",
      title: "Cuffed to Calling: Finding Purpose in Pain",
      category: "Real Talk",
      isLive: true,
      viewers: 24500,
      thumbnailUrl: "/hero.jpg",
    },
    featuredStreams: [
      {
        id: "series-1",
        title: "Relationship Goals Reloaded",
        category: "Teaching",
        isLive: false,
        viewers: 890000,
        thumbnailUrl: "https://images.pexels.com/photos/3321538/pexels-photo-3321538.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
      {
        id: "conf-2024",
        title: "Crazy Faith Conference 2024",
        category: "Conference",
        isLive: false,
        viewers: 120000,
        thumbnailUrl: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1200",
      }
    ],
    monetization: [
      "Exclusive Mentorship",
      "Signed Book Copies",
      "Crazy Faith Merch",
    ],
  },
  // Keeping Bishop Rivers as secondary
  {
    slug: "bishop-rivers",
    name: "Bishop J.D. Rivers",
    ministry: "Potter's Flow",
    avatarUrl: "https://images.pexels.com/photos/8468471/pexels-photo-8468471.jpeg?auto=compress&cs=tinysrgb&w=400",
    bannerUrl: "https://images.pexels.com/photos/5560789/pexels-photo-5560789.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["Leadership", "Strategy"],
    shortTagline: "Strategies for high-level living.",
    bio: "Bishop Rivers mentors CEOs and leaders.",
    socialStats: { followers: "1.1M", subscribers: "500k", instagram: "@bishoprivers" },
    featuredStreams: [],
    monetization: ["Mastermind Groups"]
  }
];

export function getCreatorBySlug(slug: string): Creator | undefined {
  return creators.find((c) => c.slug === slug);
}
"""

with open("lib/preachers.ts", "w", encoding="utf-8") as f:
    f.write(preachers_code)
print("✅ Database updated with Real Influencer Profile.")

# 4. UPDATE DISCOVER PAGE TO LINK CORRECTLY
discover_code = """import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { creators } from "@/lib/preachers";
import { artists } from "@/lib/artists";
import { Search, Filter, ArrowDown, Zap, Users, PlayCircle } from "lucide-react";

export default function DiscoverPage() {
  const mainCreator = creators[0]; // Pastor Mike
  
  // Combine lists for the grid
  const allStreams = [...creators, ...artists].map((item, i) => ({
    ...item,
    uniqueId: i,
    viewerCount: (Math.floor(Math.random() * 15) + 1) + "." + (Math.floor(Math.random() * 9)) + "k",
    isLive: i % 2 === 0, 
    tags: item.tags || ["#Faith"]
  }));

  const categories = ["🔥 All", "Just Chatting", "Worship Vibes", "Real Talk", "Gaming", "Deep Dives", "Beats"];

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white font-sans">
      <Navbar />
      
      <div className="flex pt-0">
        <Sidebar />

        <main className="flex-1 lg:ml-64 p-6">
            
            {/* VIBE FILTERS */}
            <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((cat, i) => (
                    <button 
                        key={cat} 
                        className={`whitespace-nowrap px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition ${
                            i === 0 ? "bg-white text-black" : "bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a] hover:text-white"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* HERO: THE REAL INFLUENCER */}
            <div className="mb-12">
                 <Link href={`/creator/${mainCreator.slug}`}>
                     <div className="aspect-video bg-[#111] rounded-xl relative overflow-hidden group cursor-pointer border-2 border-transparent hover:border-violet-500/50 transition duration-300 shadow-2xl">
                        
                        {/* HERO IMAGE */}
                        <img src={mainCreator.bannerUrl} className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition duration-700"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        
                        {/* LIVE BADGE */}
                        <div className="absolute top-6 left-6 flex items-center gap-3">
                            <span className="bg-red-600 text-white text-[10px] font-extrabold px-3 py-1 rounded uppercase tracking-wider shadow-lg animate-pulse">
                                LIVE NOW
                            </span>
                            <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded flex items-center gap-2">
                                <Users className="w-3 h-3" /> {mainCreator.liveStream?.viewers.toLocaleString()} Locked In
                            </span>
                        </div>

                        {/* CONTENT INFO */}
                        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black to-transparent">
                            <div className="flex items-end justify-between">
                                <div className="max-w-2xl">
                                    <div className="flex items-center gap-3 mb-3">
                                        <img src={mainCreator.avatarUrl} className="w-10 h-10 rounded-full border-2 border-white shadow-lg" />
                                        <h3 className="text-violet-400 font-bold text-lg">{mainCreator.name}</h3>
                                        <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] uppercase font-bold text-gray-300">Partner</span>
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-black italic tracking-tight mb-2 uppercase leading-none text-white drop-shadow-lg">
                                        {mainCreator.liveStream?.title}
                                    </h1>
                                    <p className="text-gray-300 line-clamp-2 text-sm md:text-base font-medium">
                                        {mainCreator.shortTagline} Join the chat and drop a 🔥 if you're feeling this word!
                                    </p>
                                </div>
                                <button className="hidden md:flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-8 py-4 rounded-xl font-bold uppercase text-sm tracking-wider transition shadow-[0_0_30px_rgba(124,58,237,0.5)] transform group-hover:scale-105">
                                    <PlayCircle className="w-5 h-5" /> Watch Stream
                                </button>
                            </div>
                        </div>
                     </div>
                 </Link>
            </div>

            {/* REST OF GRID */}
            <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-black uppercase italic tracking-tighter flex items-center gap-2">
                    <span className="text-orange-500">●</span> Recommended For You
                </h2>
                <div className="h-px flex-1 bg-white/10"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
                {allStreams.slice(1).map((stream) => (
                    <Link href={stream.ministry ? `/creator/${stream.slug}` : `/artist/${stream.slug}`} key={stream.uniqueId} className="group cursor-pointer">
                        <div className="relative aspect-video bg-[#111] rounded-xl overflow-hidden mb-3 ring-2 ring-transparent group-hover:ring-violet-500 transition duration-300">
                            <img 
                                src={stream.featuredStreams?.[0]?.thumbnailUrl || stream.latestRelease?.coverUrl || stream.bannerUrl} 
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            />
                            {stream.isLive && <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase">LIVE</div>}
                            <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                                <Users className="w-3 h-3 text-violet-400" />
                                {stream.viewerCount}
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <img src={stream.avatarUrl} className="w-10 h-10 rounded-full object-cover bg-[#222]" />
                            <div>
                                <h3 className="font-bold text-gray-100 text-[14px] leading-tight group-hover:text-violet-400 transition">
                                    {stream.liveStreamTitle || stream.liveStream?.title || stream.name + " Live"}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">{stream.name}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
      </div>
    </div>
  );
}
"""

with open("app/discover/page.tsx", "w", encoding="utf-8") as f:
    f.write(discover_code)
print("✅ Discover Page updated to link to Real Profile.")