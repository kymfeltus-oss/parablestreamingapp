import os

# Define the project structure and file contents
project_files = {
    "package.json": """{
  "name": "nexus-faith-platform",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.1.0",
    "react": "^18",
    "react-dom": "^18",
    "lucide-react": "^0.330.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "typescript": "^5"
  }
}""",

    "tsconfig.json": """{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}""",

    "tailwind.config.ts": """import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;""",

    "app/globals.css": """@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 255, 255, 255;
  --background-start-rgb: 0, 0, 0;
  --background-end-rgb: 0, 0, 0;
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}""",

    "app/layout.tsx": """import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexusFaith | Future Ministry",
  description: "The next generation streaming platform for ministry and worship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}""",

    "lib/preachers.ts": """export type StreamCategory = "Live" | "Teaching" | "Conference" | "Youth" | "Worship";

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
  liveStream?: Stream;
  featuredStreams: Stream[];
  monetization: string[];
}

export const creators: Creator[] = [
  {
    slug: "td-jakes-style",
    name: "Bishop J.D. Rivers",
    ministry: "Potter's Flow Global",
    avatarUrl:
      "https://images.pexels.com/photos/8468471/pexels-photo-8468471.jpeg?auto=compress&cs=tinysrgb&w=400",
    bannerUrl:
      "https://images.pexels.com/photos/5560789/pexels-photo-5560789.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["Leadership", "Breakthrough", "Faith"],
    shortTagline: "Transformational preaching for global leaders.",
    bio: "Bishop J.D. Rivers mentors leaders, innovators, and pastors across the world with a message of strategy, structure, and Spirit-led execution.",
    liveStream: {
      id: "jd-live-1",
      title: "Live: The Mantle of Digital Influence",
      category: "Live",
      isLive: true,
      viewers: 4821,
      thumbnailUrl:
        "https://images.pexels.com/photos/167404/pexels-photo-167404.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    featuredStreams: [
      {
        id: "jd-conf-1",
        title: "Global Faith Tech Summit (Replay)",
        category: "Conference",
        isLive: false,
        viewers: 19732,
        thumbnailUrl:
          "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
      {
        id: "jd-teach-1",
        title: "Systems, Structure & The Supernatural",
        category: "Teaching",
        isLive: false,
        viewers: 9312,
        thumbnailUrl:
          "https://images.pexels.com/photos/1181395/pexels-photo-1181395.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
    ],
    monetization: [
      "Partner subscription tiers",
      "Conference replays",
      "Leadership intensives",
      "Digital workbooks",
    ],
  },
  {
    slug: "sarah-jakes-style",
    name: "Pastor S. Hart",
    ministry: "Eve & Esther Collective",
    avatarUrl:
      "https://images.pexels.com/photos/1181681/pexels-photo-1181681.jpeg?auto=compress&cs=tinysrgb&w=400",
    bannerUrl:
      "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["Women", "Healing", "Identity"],
    shortTagline: "Voice of healing, identity, and inner restoration.",
    bio: "Pastor S. Hart leads women into healing and wholeness.",
    featuredStreams: [
      {
        id: "sh-conf-1",
        title: "Woman Emerge Conference",
        category: "Conference",
        isLive: false,
        viewers: 34102,
        thumbnailUrl:
          "https://images.pexels.com/photos/1181562/pexels-photo-1181562.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
      {
        id: "sh-teach-1",
        title: "The Ministry of Becoming",
        category: "Teaching",
        isLive: false,
        viewers: 14523,
        thumbnailUrl:
          "https://images.pexels.com/photos/1181555/pexels-photo-1181555.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
    ],
    monetization: [
      "Women’s mentorship circles",
      "Journals & workbooks",
      "Virtual retreats",
    ],
  },
];

export function getCreatorBySlug(slug: string): Creator | undefined {
  return creators.find((c) => c.slug === slug);
}""",

    "lib/artists.ts": """export interface Album {
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
    slug: "kingdom-sound",
    name: "Kingdom Sound Collective",
    genre: "Worship / CCM",
    avatarUrl: "https://images.pexels.com/photos/167438/pexels-photo-167438.jpeg?auto=compress&cs=tinysrgb&w=800",
    bannerUrl: "https://images.pexels.com/photos/154147/pexels-photo-154147.jpeg?auto=compress&cs=tinysrgb&w=1600",
    bio: "A collective of worshippers redefining the sound of Sunday morning with raw, unfiltered praise.",
    isLive: true,
    liveStreamTitle: "Friday Night Encounter - Live from Atlanta",
    viewers: 12400,
    latestRelease: {
      title: "Heaven Come Down (Live)",
      coverUrl: "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=800",
      year: "2024",
      type: "Album",
    },
    albums: [
      { title: "The Overflow", coverUrl: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800", year: "2023", type: "Album" },
      { title: "Holy Ground", coverUrl: "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=800", year: "2022", type: "EP" },
    ],
    merch: [
      { name: "'Worthy' Hoodie", price: 65, imageUrl: "https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=800" },
      { name: "Tour T-Shirt", price: 35, imageUrl: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=800" },
    ],
    tourSchedule: [
      { city: "Dallas, TX", date: "Nov 12", venue: "The Factory", isSoldOut: false },
      { city: "Atlanta, GA", date: "Nov 14", venue: "State Farm Arena", isSoldOut: true },
      { city: "Charlotte, NC", date: "Nov 16", venue: "Spectrum Center", isSoldOut: false },
    ],
  },
  {
    slug: "marcus-hill",
    name: "Marcus Hill",
    genre: "Gospel Hip-Hop",
    avatarUrl: "https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=800",
    bannerUrl: "https://images.pexels.com/photos/2330137/pexels-photo-2330137.jpeg?auto=compress&cs=tinysrgb&w=1600",
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
];

export function getArtistBySlug(slug: string) {
  return artists.find((a) => a.slug === slug);
}""",

    "components/Navbar.tsx": """ "use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/music", label: "Music" },
  { href: "/discover", label: "Discover" },
  { href: "/partners", label: "Partners" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur-xl text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500 text-xs font-bold text-white">
            NF
          </span>
          <span className="text-sm font-semibold tracking-wide text-white sm:text-base">
            NexusFaith
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-gray-300 sm:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition hover:text-white ${
                  active ? "text-white font-medium" : ""
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
            <button className="rounded-full bg-violet-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-violet-500">
                Sign In
            </button>
        </div>
      </div>
    </header>
  );
}""",

    "components/HeroSection.tsx": """import Link from "next/link";
import { Creator } from "@/lib/preachers";

interface HeroSectionProps {
  creator: Creator;
}

export default function HeroSection({ creator }: HeroSectionProps) {
  const live = creator.liveStream;

  return (
    <section className="relative mb-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-900 via-slate-900 to-black">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url(${creator.bannerUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(6px)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/80 to-transparent" />

      <div className="relative flex flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:gap-10 sm:px-10 sm:py-10">
        <div className="flex-1">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-violet-100 ring-1 ring-white/10">
            <span className="inline-flex h-2 w-2 rounded-full bg-red-500" />
            {live ? "Live Global Broadcast" : "Signature Series"}
          </div>

          <h1 className="mb-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
            {live ? live.title : creator.shortTagline}
          </h1>
          <p className="mb-4 max-w-xl text-sm text-gray-200 sm:text-base">
            {creator.bio}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {live && (
              <Link
                href={`/watch/${live.id}`}
                className="inline-flex items-center gap-2 rounded-full bg-red-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-red-500/40 hover:bg-red-400"
              >
                ▶ Watch Live
              </Link>
            )}
            <Link
              href={`/creator/${creator.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-4 py-2 text-xs font-medium text-gray-100 hover:border-white hover:bg-white/10 sm:text-sm"
            >
              View Creator Hub
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}""",

    "app/page.tsx": """import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { creators } from "@/lib/preachers";
import Link from "next/link";

export default function Home() {
  const featuredCreator = creators[0];

  return (
    <main className="min-h-screen pb-10">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        <HeroSection creator={featuredCreator} />
        
        <h2 className="text-xl font-bold mb-4 mt-8">Trending Ministries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {creators.map(c => (
                <Link href={`/creator/${c.slug}`} key={c.slug} className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition">
                    <div className="flex items-center gap-4">
                        <img src={c.avatarUrl} className="w-16 h-16 rounded-full object-cover"/>
                        <div>
                            <h3 className="font-bold">{c.name}</h3>
                            <p className="text-sm text-gray-400">{c.ministry}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
      </div>
    </main>
  );
}""",

    "app/music/page.tsx": """import Link from "next/link";
import { artists } from "@/lib/artists";
import Navbar from "@/components/Navbar";

export default function MusicPage() {
  const liveArtist = artists.find((a) => a.isLive);

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        {/* Featured Live Artist Hero */}
        {liveArtist && (
            <div className="relative mb-12 overflow-hidden rounded-3xl border border-white/10 bg-gray-900">
            <div
                className="absolute inset-0 opacity-60"
                style={{
                backgroundImage: `url(${liveArtist.bannerUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            <div className="relative flex flex-col items-start justify-end px-8 py-12 h-[50vh]">
                <div className="inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white mb-4 animate-pulse">
                ● LIVE CONCERT
                </div>
                <h1 className="text-4xl font-bold md:text-6xl mb-2">{liveArtist.name}</h1>
                <p className="text-xl text-gray-200 mb-6">{liveArtist.liveStreamTitle}</p>
                <div className="flex gap-4">
                <Link 
                    href={`/artist/${liveArtist.slug}`}
                    className="rounded-full bg-white text-black px-8 py-3 font-bold hover:bg-gray-200 transition"
                >
                    Join Stream
                </Link>
                </div>
            </div>
            </div>
        )}

        {/* Artist Grid */}
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Trending Christian Artists</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {artists.map((artist) => (
                    <Link key={artist.slug} href={`/artist/${artist.slug}`} className="group relative block">
                        <div className="relative aspect-square overflow-hidden rounded-2xl mb-3">
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
                        </div>
                        <h3 className="font-bold text-lg group-hover:text-violet-400 transition">{artist.name}</h3>
                        <p className="text-sm text-gray-400">{artist.genre}</p>
                    </Link>
                ))}
            </div>
        </div>

        {/* New Releases Section */}
        <div>
            <h2 className="text-2xl font-bold mb-6">Fresh Drops</h2>
            <div className="flex gap-6 overflow-x-auto pb-4">
                {artists.map((artist) => (
                    <div key={artist.latestRelease.title} className="min-w-[160px] w-[160px]">
                        <img 
                            src={artist.latestRelease.coverUrl} 
                            className="w-full aspect-square rounded-lg mb-3 object-cover shadow-lg shadow-black/50" 
                        />
                        <p className="font-medium truncate">{artist.latestRelease.title}</p>
                        <p className="text-xs text-gray-400">{artist.name}</p>
                    </div>
                ))}
            </div>
        </div>

      </main>
    </div>
  );
}""",

    "app/artist/[slug]/page.tsx": """import { getArtistBySlug } from "@/lib/artists";
import Navbar from "@/components/Navbar";

export default function ArtistProfile({ params }: { params: { slug: string } }) {
  const artist = getArtistBySlug(params.slug);

  if (!artist) return <div className="text-white p-10">Artist not found</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      
      {/* Artist Hero Banner */}
      <div className="relative h-80 w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${artist.bannerUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/60 to-[#0a0a0a]" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 flex items-end gap-6 max-w-7xl mx-auto">
             <img 
                src={artist.avatarUrl} 
                className="w-32 h-32 rounded-full border-4 border-[#0a0a0a] shadow-2xl"
             />
             <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-4xl font-bold">{artist.name}</h1>
                    {artist.isLive && <span className="text-red-500 font-bold tracking-widest text-xs border border-red-500 px-2 py-0.5 rounded">LIVE NOW</span>}
                </div>
                <p className="text-gray-300">{artist.genre} • {artist.bio}</p>
             </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT COLUMN: Music & Content */}
        <div className="lg:col-span-2 space-y-10">
            
            {/* Latest Release */}
            <section>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    🎵 Latest Release
                </h2>
                <div className="flex gap-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition cursor-pointer">
                    <img src={artist.latestRelease.coverUrl} className="w-24 h-24 rounded-lg object-cover" />
                    <div className="flex flex-col justify-center">
                        <h3 className="text-2xl font-bold">{artist.latestRelease.title}</h3>
                        <p className="text-gray-400">{artist.latestRelease.type} • {artist.latestRelease.year}</p>
                        <div className="flex gap-2 mt-2">
                            <button className="bg-violet-600 text-white text-xs px-3 py-1 rounded-full">▶ Play Preview</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tour Dates */}
            <section>
                <h2 className="text-xl font-bold mb-4">🎤 Upcoming Worship Nights</h2>
                <div className="space-y-2">
                    {artist.tourSchedule.map((tour, i) => (
                        <div key={i} className="flex items-center justify-between bg-white/5 p-4 rounded-lg border border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="bg-white/10 px-3 py-1 rounded text-center min-w-[60px]">
                                    <div className="text-xs text-gray-400 uppercase">Nov</div>
                                    <div className="text-lg font-bold">{tour.date.split(' ')[1]}</div>
                                </div>
                                <div>
                                    <div className="font-bold">{tour.city}</div>
                                    <div className="text-sm text-gray-400">{tour.venue}</div>
                                </div>
                            </div>
                            {tour.isSoldOut ? (
                                <span className="text-gray-500 text-sm font-bold px-4">SOLD OUT</span>
                            ) : (
                                <button className="border border-violet-500 text-violet-400 hover:bg-violet-500 hover:text-white px-4 py-1.5 rounded-full text-sm font-medium transition">
                                    Get Tickets
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>

        {/* RIGHT COLUMN: Monetization & Merch */}
        <div className="space-y-8">
            
            {/* Fan Subscriptions */}
            <div className="bg-gradient-to-br from-violet-900/50 to-black border border-violet-500/30 p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-2">Become a Backstage Partner</h3>
                <p className="text-sm text-gray-300 mb-4">Get early access to tickets, exclusive acoustic sets, and monthly Q&As.</p>
                <button className="w-full py-2.5 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition">
                    Join for $4.99/mo
                </button>
            </div>

            {/* Merch Store */}
            <div>
                <h3 className="text-lg font-bold mb-4">Official Merch</h3>
                <div className="grid grid-cols-2 gap-4">
                    {artist.merch.map((item, i) => (
                        <div key={i} className="group">
                            <div className="aspect-square bg-white/5 rounded-lg mb-2 overflow-hidden">
                                <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition" />
                            </div>
                            <div className="text-sm font-medium">{item.name}</div>
                            <div className="text-xs text-gray-400">${item.price}</div>
                        </div>
                    ))}
                </div>
            </div>

        </div>

      </div>
    </div>
  );
}""",

    "app/creator/[slug]/page.tsx": """import { getCreatorBySlug } from "@/lib/preachers";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

export default function CreatorPage({ params }: { params: { slug: string } }) {
  const creator = getCreatorBySlug(params.slug);
  if (!creator) return <div className="p-10 text-white">Creator not found</div>;

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <HeroSection creator={creator} />
        
        <h2 className="text-white text-2xl font-bold mb-4">Recent Teachings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {creator.featuredStreams.map(s => (
                <div key={s.id} className="group cursor-pointer">
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-2">
                        <img src={s.thumbnailUrl} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                            {s.category}
                        </div>
                    </div>
                    <h3 className="text-white font-bold">{s.title}</h3>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}""",
    
    "app/watch/[id]/page.tsx": """import Navbar from "@/components/Navbar";

export default function WatchPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex h-screen flex-col bg-black text-white">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Video Player Area */}
        <div className="flex-1 bg-gray-900 flex items-center justify-center relative">
          <div className="text-center p-10">
            <h2 className="text-2xl font-bold mb-2">Live Stream Simulator</h2>
            <p className="text-gray-400">Video Player ID: {params.id}</p>
            <div className="mt-8 aspect-video bg-black rounded-xl border border-white/10 w-full max-w-4xl mx-auto flex items-center justify-center">
                <span className="animate-pulse text-red-500 font-bold">● LIVE FEED</span>
            </div>
          </div>
        </div>

        {/* Right: Interactive Sanctuary */}
        <div className="w-80 border-l border-white/10 bg-gray-950 flex flex-col hidden lg:flex">
          <div className="p-4 border-b border-white/10 font-bold">Virtual Sanctuary</div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            <div className="text-xs text-gray-500 text-center">Chat started</div>
            <div className="text-sm"><span className="text-violet-400 font-bold">User1:</span> Hallelujah!</div>
            <div className="text-sm"><span className="text-blue-400 font-bold">Sarah:</span> Watching from Texas!</div>
            <div className="text-sm"><span className="text-green-400 font-bold">Mike:</span> What chapter is this?</div>
          </div>
          <div className="p-4 bg-gray-900 border-t border-white/10">
             <input type="text" placeholder="Send a message..." className="w-full bg-black border border-white/20 rounded-full px-4 py-2 text-sm text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}"""

}

def create_project():
    print("🚀 Starting NexusFaith Project Builder...")
    
    for filepath, content in project_files.items():
        # Handle directory creation
        directory = os.path.dirname(filepath)
        if directory and not os.path.exists(directory):
            os.makedirs(directory)
            
        # Write file
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"✅ Created: {filepath}")
        
    print("\n🎉 Project generated successfully!")
    print("👉 To run the app:")
    print("   1. npm install")
    print("   2. npm run dev")

if __name__ == "__main__":
    create_project()