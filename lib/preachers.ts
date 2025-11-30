export type StreamCategory = "Live" | "Teaching" | "Conference" | "Youth" | "Worship" | "Real Talk" | "Music";

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
