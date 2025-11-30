import os

print("🎹 Adding 'The Shed' and C-Dub Products...")

# 1. UPDATE ARTIST DATABASE (With C-Dub & Shed categories)
artists_data = """export interface Album {
  title: string;
  coverUrl: string;
  year: string;
  type: "Album" | "Single" | "EP" | "Product";
}

export interface MerchItem {
  name: string;
  price: number;
  imageUrl: string;
}

export interface Concert {
  city: string;
  date: string;
  venue: string;
  isSoldOut: boolean;
}

export interface Artist {
  slug: string;
  name: string;
  genre: string;
  avatarUrl: string;
  bannerUrl: string;
  bio: string;
  latestRelease: Album;
  albums: Album[];
  merch: MerchItem[];
  tourSchedule: Concert[];
  isLive: boolean;
  liveStreamTitle?: string;
  viewers?: number;
}

export const artists: Artist[] = [
  {
    slug: "kirk-franklin",
    name: "Kirk Franklin",
    genre: "Gospel Legend",
    avatarUrl: "/kirk_real.jpg", // <--- USER WILL PROVIDE REAL PIC
    bannerUrl: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1600",
    bio: "The G.O.A.T of Urban Gospel.",
    isLive: false,
    latestRelease: {
      title: "Father's Day",
      coverUrl: "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=800",
      year: "2023",
      type: "Album",
    },
    albums: [],
    merch: [],
    tourSchedule: [],
  },
  {
    slug: "c-dub",
    name: "Carlton Whitfield (C-Dub)",
    genre: "Musician Tools",
    avatarUrl: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=800", // Keyboard/Producer vibe
    bannerUrl: "https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg?auto=compress&cs=tinysrgb&w=1600", // Studio
    bio: "The creator of Whoop Triggers and the ultimate tools for church musicians.",
    isLive: true,
    liveStreamTitle: "Live Shed: Advanced Organ Techniques",
    viewers: 1200,
    latestRelease: {
      title: "Whoop Triggers Vol. 4",
      coverUrl: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=800",
      year: "2024",
      type: "Product",
    },
    albums: [],
    merch: [
        { name: "Whoop Triggers Pro App", price: 49.99, imageUrl: "" },
        { name: "Churchy Loops Pack", price: 29.99, imageUrl: "" }
    ],
    tourSchedule: [],
  },
  {
    slug: "kingdom-choir",
    name: "Voices of Zion",
    genre: "Choir",
    avatarUrl: "https://images.pexels.com/photos/7127453/pexels-photo-7127453.jpeg?auto=compress&cs=tinysrgb&w=800",
    bannerUrl: "https://images.pexels.com/photos/7658249/pexels-photo-7658249.jpeg?auto=compress&cs=tinysrgb&w=1600",
    bio: "Contemporary Gospel Choir.",
    isLive: false,
    latestRelease: { title: "Worthy", coverUrl: "", year: "2024", type: "Single" },
    albums: [],
    merch: [],
    tourSchedule: [],
  }
];

export function getArtistBySlug(slug: string) {
  return artists.find((a) => a.slug === slug);
}
"""

# 2. UPDATE PREACHERS DATABASE (Pointing to real images)
preachers_code = """export type StreamCategory = "Live" | "Teaching" | "Conference" | "Youth" | "Worship" | "Real Talk" | "Music";

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
  socialStats?: { followers: string; subscribers: string; instagram: string };
  liveStream?: Stream;
  featuredStreams: Stream[];
  monetization: string[];
}

export const creators: Creator[] = [
  {
    slug: "td-jakes",
    name: "Bishop T.D. Jakes",
    ministry: "The Potter's House",
    avatarUrl: "/td_real.jpg", // <--- USER WILL PROVIDE REAL PIC
    bannerUrl: "/td_real.jpg", // Using same for demo, user can swap
    tags: ["Leadership", "Vision", "Empowerment"],
    shortTagline: "Transforming lives through the Word.",
    bio: "Bishop T.D. Jakes is a charismatic leader, visionary, provocative thinker, and entrepreneur.",
    socialStats: { followers: "6.5M", subscribers: "2.1M", instagram: "@bishopjakes" },
    liveStream: {
      id: "tdj-live-1",
      title: "Live: Pursuing Your Purpose",
      category: "Teaching",
      isLive: true,
      viewers: 45200,
      thumbnailUrl: "/td_real.jpg",
    },
    featuredStreams: [],
    monetization: ["Books", "Conferences"],
  }
];

export function getCreatorBySlug(slug: string): Creator | undefined {
  return creators.find((c) => c.slug === slug);
}
"""

# 3. UPDATE MUSIC PAGE (Adding "The Shed" Section)
music_page_code = """import Link from "next/link";
import { artists } from "@/lib/artists";
import Navbar from "@/components/Navbar";
import { Flame, Mic2, Music2, Play, Headphones, Speaker, Download } from "lucide-react";

export default function MusicPage() {
  const cDub = artists.find(a => a.slug === "c-dub");
  const shedArtists = [cDub, artists[0]]; // Mock list

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white font-sans pb-20">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* HERO: THE SHED (Musicians Area) */}
        <div className="relative mb-12 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-gray-900 to-black">
            <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=1600')] opacity-20 bg-cover bg-center"></div>
            <div className="relative p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-xl">
                    <div className="flex items-center gap-2 mb-2 text-orange-500 font-bold tracking-widest uppercase text-xs">
                        <Headphones className="w-4 h-4" /> The Shed
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black italic uppercase leading-none mb-4">
                        Master Your Craft
                    </h1>
                    <p className="text-gray-400 mb-6">
                        Join live shed sessions, download stems, and get the latest tools from legends like Carlton Whitfield.
                    </p>
                    <button className="bg-orange-500 hover:bg-orange-600 text-black font-extrabold px-8 py-3 rounded-full uppercase tracking-wide transition">
                        Enter The Shed
                    </button>
                </div>
                
                {/* FEATURED PRODUCT: C-DUB */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm max-w-sm w-full transform hover:scale-105 transition duration-300 cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                        <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded">FEATURED TOOL</span>
                        <Download className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="h-32 bg-gray-800 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                        <span className="text-4xl">🎹</span> 
                        {/* Placeholder for App Screenshot */}
                    </div>
                    <h3 className="text-xl font-bold mb-1">Whoop Triggers & Loops</h3>
                    <p className="text-sm text-gray-400 mb-4">By Carlton Whitfield. The #1 tool for church musicians to back up the preacher.</p>
                    <div className="flex justify-between items-center border-t border-white/10 pt-4">
                        <span className="font-bold text-lg">$49.99</span>
                        <span className="text-blue-400 text-xs font-bold uppercase hover:underline">Get It Now</span>
                    </div>
                </div>
            </div>
        </div>

        {/* LIVE SHED SESSIONS */}
        <div className="mb-10">
            <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-6 flex items-center gap-2">
                <Speaker className="w-6 h-6 text-red-500" /> Live Shed Sessions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="group cursor-pointer">
                    <div className="relative aspect-video bg-[#1f1f1f] rounded-xl overflow-hidden mb-3 border border-transparent group-hover:border-red-500/50 transition">
                        <img src="https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=800" className="w-full h-full object-cover opacity-80" />
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">LIVE</div>
                        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded">1.2k Musicians Locked In</div>
                    </div>
                    <h3 className="font-bold text-white group-hover:text-red-400 transition">Organ Shed: Tritones & Substitutions</h3>
                    <p className="text-xs text-gray-500">Carlton Whitfield (C-Dub)</p>
                </div>
                
                <div className="group cursor-pointer">
                    <div className="relative aspect-video bg-[#1f1f1f] rounded-xl overflow-hidden mb-3">
                        <img src="https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=800" className="w-full h-full object-cover opacity-80" />
                        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded">Replay</div>
                    </div>
                    <h3 className="font-bold text-white group-hover:text-blue-400 transition">Drum Cam: Pocket & Fills</h3>
                    <p className="text-xs text-gray-500">Kingdom Sound Drummers</p>
                </div>
            </div>
        </div>

        {/* REST OF MUSIC */}
        <div>
            <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-6 flex items-center gap-2">
                <Music2 className="w-6 h-6 text-violet-500" /> Trending Artists
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {artists.map((artist) => (
                    <Link key={artist.slug} href={`/artist/${artist.slug}`} className="group relative block">
                        <div className="relative aspect-square overflow-hidden rounded-2xl mb-3 border border-white/5 group-hover:border-violet-500 transition">
                            <img 
                                src={artist.avatarUrl} 
                                alt={artist.name}
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-110" 
                            />
                        </div>
                        <h3 className="font-bold text-lg leading-none group-hover:text-violet-400 transition">{artist.name}</h3>
                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wide mt-1">{artist.genre}</p>
                    </Link>
                ))}
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

write_file("lib/artists.ts", artists_data)
write_file("lib/preachers.ts", preachers_code)
write_file("app/music/page.tsx", music_page_code)