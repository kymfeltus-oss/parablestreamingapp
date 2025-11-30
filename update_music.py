import os

# 1. UPDATE ARTIST DATA (Diverse, Gospel-focused, High Quality Images)
artists_data = """export interface Album {
  title: string;
  coverUrl: string;
  year: string;
  type: "Album" | "Single" | "EP";
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
    slug: "kingdom-choir",
    name: "Voices of Zion",
    genre: "Contemporary Gospel",
    avatarUrl: "https://images.pexels.com/photos/7127453/pexels-photo-7127453.jpeg?auto=compress&cs=tinysrgb&w=800", // Black female singer/choir vibe
    bannerUrl: "https://images.pexels.com/photos/7658249/pexels-photo-7658249.jpeg?auto=compress&cs=tinysrgb&w=1600", // Gospel choir performing
    bio: "A powerhouse choir blending traditional gospel roots with modern worship anthems.",
    isLive: true,
    liveStreamTitle: "Sunday Service: The Overflow",
    viewers: 24100,
    latestRelease: {
      title: "Let It Fall (Live)",
      coverUrl: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800",
      year: "2025",
      type: "Album",
    },
    albums: [
      { title: "Sunday Morning", coverUrl: "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=800", year: "2023", type: "Album" },
    ],
    merch: [],
    tourSchedule: [],
  },
  {
    slug: "marcus-hill",
    name: "Marcus Hill",
    genre: "CHH / Urban",
    avatarUrl: "https://images.pexels.com/photos/20353140/pexels-photo-20353140.jpeg?auto=compress&cs=tinysrgb&w=800", // Black male artist
    bannerUrl: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1600", // Concert crowd
    bio: "Bridging the gap between the streets and the sanctuary. Lyrical theology over hard-hitting beats.",
    isLive: false,
    latestRelease: {
      title: "Grace & Grind",
      coverUrl: "https://images.pexels.com/photos/2128222/pexels-photo-2128222.jpeg?auto=compress&cs=tinysrgb&w=800",
      year: "2024",
      type: "Album",
    },
    albums: [
      { title: "Testimony Season", coverUrl: "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=800", year: "2023", type: "Album" },
    ],
    merch: [
      { name: "Snapback Cap", price: 30, imageUrl: "https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=800" },
    ],
    tourSchedule: [
      { city: "Chicago, IL", date: "Dec 01", venue: "House of Blues", isSoldOut: false },
      { city: "Detroit, MI", date: "Dec 03", venue: "The Fillmore", isSoldOut: false },
    ],
  },
  {
    slug: "elena-worship",
    name: "Elena Rodriguez",
    genre: "Worship / Latin",
    avatarUrl: "https://images.pexels.com/photos/3775131/pexels-photo-3775131.jpeg?auto=compress&cs=tinysrgb&w=800", // Latina singer
    bannerUrl: "https://images.pexels.com/photos/1370545/pexels-photo-1370545.jpeg?auto=compress&cs=tinysrgb&w=1600", // Worship atmosphere
    bio: "Prophetic worship leader bringing bilingual praise to the nations.",
    isLive: true,
    liveStreamTitle: "Noche de Adoración - Live",
    viewers: 5600,
    latestRelease: {
      title: "Santo (Holy)",
      coverUrl: "https://images.pexels.com/photos/1876279/pexels-photo-1876279.jpeg?auto=compress&cs=tinysrgb&w=800",
      year: "2024",
      type: "Single",
    },
    albums: [],
    merch: [],
    tourSchedule: [],
  },
  {
    slug: "elevation-vibe",
    name: "City Collective",
    genre: "Worship Band",
    avatarUrl: "https://images.pexels.com/photos/167438/pexels-photo-167438.jpeg?auto=compress&cs=tinysrgb&w=800", // Diverse band
    bannerUrl: "https://images.pexels.com/photos/154147/pexels-photo-154147.jpeg?auto=compress&cs=tinysrgb&w=1600", // Concert lights
    bio: "A collective of worshippers redefining the sound of Sunday morning.",
    isLive: false,
    latestRelease: {
      title: "Heaven Come Down",
      coverUrl: "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=800",
      year: "2024",
      type: "Album",
    },
    albums: [],
    merch: [],
    tourSchedule: [],
  }
];

export function getArtistBySlug(slug: string) {
  return artists.find((a) => a.slug === slug);
}
"""

# 2. UPDATE MUSIC PAGE UI (Streamer Vibe + Gospel Categories)
music_page_code = """import Link from "next/link";
import { artists } from "@/lib/artists";
import Navbar from "@/components/Navbar";
import { Flame, Mic2, Music2, Play } from "lucide-react";

export default function MusicPage() {
  const liveArtist = artists.find((a) => a.isLive);
  const gospelArtists = artists.filter(a => a.genre.includes("Gospel") || a.genre.includes("CHH"));

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white font-sans pb-20">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* HERO SECTION - FEATURED LIVE CONCERT */}
        {liveArtist && (
            <div className="relative mb-12 overflow-hidden rounded-3xl border-2 border-transparent hover:border-violet-500/50 transition duration-500 group">
            <div
                className="absolute inset-0 opacity-80 group-hover:scale-105 transition duration-700"
                style={{
                backgroundImage: `url(${liveArtist.bannerUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            <div className="relative flex flex-col items-start justify-end px-8 py-12 h-[60vh]">
                <div className="inline-flex items-center gap-2 rounded bg-red-600 px-3 py-1 text-xs font-black uppercase tracking-wider text-white mb-4 animate-pulse shadow-lg shadow-red-600/40">
                ● Live Concert
                </div>
                <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-2">{liveArtist.name}</h1>
                <p className="text-xl text-gray-200 mb-8 font-medium">{liveArtist.liveStreamTitle}</p>
                <div className="flex gap-4">
                <Link 
                    href={`/artist/${liveArtist.slug}`}
                    className="rounded-full bg-white text-black px-8 py-3 font-extrabold uppercase tracking-wide hover:bg-gray-200 transition shadow-[0_0_20px_rgba(255,255,255,0.4)] flex items-center gap-2"
                >
                    <Play className="w-4 h-4 fill-black" />
                    Join Stream
                </Link>
                </div>
            </div>
            </div>
        )}

        {/* SECTION: GOSPEL & URBAN */}
        <div className="mb-10">
            <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-6 flex items-center gap-2">
                <Flame className="w-6 h-6 text-orange-500" /> Gospel & Urban Heat
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {gospelArtists.map((artist) => (
                    <Link key={artist.slug} href={`/artist/${artist.slug}`} className="group relative block">
                        <div className="relative aspect-square overflow-hidden rounded-2xl mb-3 border border-white/5 group-hover:border-violet-500 transition">
                            <img 
                                src={artist.avatarUrl} 
                                alt={artist.name}
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-110" 
                            />
                            {artist.isLive && (
                                <div className="absolute top-2 right-2 bg-red-600 text-[10px] font-bold px-2 py-1 rounded-sm">
                                    LIVE
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition" />
                        </div>
                        <h3 className="font-bold text-lg leading-none group-hover:text-violet-400 transition">{artist.name}</h3>
                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wide mt-1">{artist.genre}</p>
                    </Link>
                ))}
            </div>
        </div>

        {/* SECTION: WORSHIP VIBES */}
        <div className="mb-10">
            <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-6 flex items-center gap-2">
                <Mic2 className="w-6 h-6 text-violet-500" /> Global Worship
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {artists.filter(a => a.genre.includes("Worship")).map((artist) => (
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

        {/* NEW RELEASES */}
        <div>
            <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-6 flex items-center gap-2">
                <Music2 className="w-6 h-6 text-blue-500" /> Fresh Drops
            </h2>
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                {artists.map((artist) => (
                    <div key={artist.latestRelease.title} className="min-w-[160px] w-[160px] group cursor-pointer">
                        <div className="relative">
                            <img 
                                src={artist.latestRelease.coverUrl} 
                                className="w-full aspect-square rounded-lg mb-3 object-cover shadow-lg shadow-black/50 group-hover:shadow-violet-900/40 transition duration-300" 
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition rounded-lg flex items-center justify-center">
                                <Play className="w-8 h-8 fill-white opacity-0 group-hover:opacity-100 transition transform scale-50 group-hover:scale-100" />
                            </div>
                        </div>
                        <p className="font-bold truncate text-sm text-gray-200 group-hover:text-white">{artist.latestRelease.title}</p>
                        <p className="text-xs text-gray-500 uppercase font-bold">{artist.name}</p>
                    </div>
                ))}
            </div>
        </div>

      </main>
    </div>
  );
}
"""

def write_file(path, content):
    directory = os.path.dirname(path)
    if directory and not os.path.exists(directory):
        os.makedirs(directory)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ SUCCESSFULLY UPDATED: {path}")

# EXECUTE
write_file("lib/artists.ts", artists_data)
write_file("app/music/page.tsx", music_page_code)