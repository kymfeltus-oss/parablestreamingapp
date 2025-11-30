import os

print("🔗 Linking Code to Your Real Images...")

# 1. UPDATE PREACHER DATABASE (Using your .png files)
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
    avatarUrl: "/td_avatar.png",   // <--- YOUR REAL PICTURE
    bannerUrl: "/td_banner.png",   // <--- YOUR REAL PICTURE
    tags: ["Leadership", "Vision", "Empowerment"],
    shortTagline: "Transforming lives through the Word.",
    bio: "Bishop T.D. Jakes is a visionary leader and entrepreneur serving as senior pastor of The Potter's House.",
    socialStats: { followers: "6.5M", subscribers: "2.1M", instagram: "@bishopjakes" },
    liveStream: {
      id: "tdj-live-1",
      title: "Live: The Mantle of Digital Influence",
      category: "Teaching",
      isLive: true,
      viewers: 45200,
      thumbnailUrl: "/td_banner.png",
    },
    featuredStreams: [],
    monetization: ["Books", "Conferences", "Leadership Training"],
  }
];

export function getCreatorBySlug(slug: string): Creator | undefined {
  return creators.find((c) => c.slug === slug);
}
"""

# 2. UPDATE ARTIST DATABASE (Using your .png files)
artists_code = """export interface Album {
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
    avatarUrl: "/kirk_avatar.png", // <--- YOUR REAL PICTURE
    bannerUrl: "/kirk_banner.png", // <--- YOUR REAL PICTURE
    bio: "Revolutionizing Gospel Music for decades.",
    isLive: false,
    latestRelease: {
      title: "Father's Day",
      coverUrl: "/kirk_banner.png",
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
    avatarUrl: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=800",
    bannerUrl: "https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg?auto=compress&cs=tinysrgb&w=1600",
    bio: "Creator of Whoop Triggerz and pro tools for church musicians.",
    isLive: true,
    liveStreamTitle: "The Shed: Advanced Chords",
    viewers: 1500,
    latestRelease: {
      title: "Whoop Triggerz Platinum",
      coverUrl: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=800",
      year: "2024",
      type: "Product",
    },
    albums: [],
    merch: [
        { name: "Whoop Triggerz App", price: 49.99, imageUrl: "" },
        { name: "Preacher Chords Vol 1", price: 29.99, imageUrl: "" }
    ],
    tourSchedule: [],
  }
];

export function getArtistBySlug(slug: string) {
  return artists.find((a) => a.slug === slug);
}
"""

def write_file(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Updated: {path}")

write_file("lib/preachers.ts", preachers_code)
write_file("lib/artists.ts", artists_code)