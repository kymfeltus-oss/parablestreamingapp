import os

# We are rewriting the database to use YOUR local hero.jpg and specific relevant URLs
content = """export type StreamCategory = "Live" | "Teaching" | "Conference" | "Youth" | "Worship";

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
    avatarUrl: "https://images.pexels.com/photos/8468471/pexels-photo-8468471.jpeg?auto=compress&cs=tinysrgb&w=400", // Man in suit
    bannerUrl: "/hero.jpg", // <--- UPDATED: Uses your new Hero Image
    tags: ["Leadership", "Breakthrough", "Faith"],
    shortTagline: "Transformational preaching for global leaders.",
    bio: "Bishop J.D. Rivers mentors leaders, innovators, and pastors across the world with a message of strategy, structure, and Spirit-led execution.",
    liveStream: {
      id: "jd-live-1",
      title: "Live: The Mantle of Digital Influence",
      category: "Live",
      isLive: true,
      viewers: 12400,
      thumbnailUrl: "/hero.jpg", // <--- UPDATED: Uses your new Hero Image
    },
    featuredStreams: [
      {
        id: "jd-conf-1",
        title: "Global Faith Tech Summit (Replay)",
        category: "Conference",
        isLive: false,
        viewers: 19732,
        thumbnailUrl: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1200", // Crowd shot
      },
      {
        id: "jd-teach-1",
        title: "Systems, Structure & The Supernatural",
        category: "Teaching",
        isLive: false,
        viewers: 9312,
        thumbnailUrl: "https://images.pexels.com/photos/1181395/pexels-photo-1181395.jpeg?auto=compress&cs=tinysrgb&w=1200", // Coding/Tech vibe
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
    slug: "michael-todd-style",
    name: "Pastor M. Cole",
    ministry: "Transformation Flow",
    avatarUrl: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400",
    bannerUrl: "https://images.pexels.com/photos/1181400/pexels-photo-1181400.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["Relationships", "Purpose", "Young Adults"],
    shortTagline: "Modern, creative, relationship-focused teaching.",
    bio: "Pastor M. Cole reaches millions of young adults with vulnerable preaching, creative illustration, and real-life transformation stories.",
    liveStream: {
      id: "mc-live-1",
      title: "Live: Relationship Goals in the Digital Age",
      category: "Live",
      isLive: true,
      viewers: 7812,
      thumbnailUrl: "https://images.pexels.com/photos/1181400/pexels-photo-1181400.jpeg?auto=compress&cs=tinysrgb&w=1200", // Modern office/studio vibe
    },
    featuredStreams: [],
    monetization: ["Merch drops", "Digital devotionals"],
  },
  {
    slug: "sarah-jakes-style",
    name: "Pastor S. Hart",
    ministry: "Eve & Esther Collective",
    avatarUrl: "https://images.pexels.com/photos/1181681/pexels-photo-1181681.jpeg?auto=compress&cs=tinysrgb&w=400",
    bannerUrl: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1200",
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
        thumbnailUrl: "https://images.pexels.com/photos/1181562/pexels-photo-1181562.jpeg?auto=compress&cs=tinysrgb&w=1200", // Women in audience
      },
    ],
    monetization: ["Women’s mentorship circles", "Journals"],
  },
];

export function getCreatorBySlug(slug: string): Creator | undefined {
  return creators.find((c) => c.slug === slug);
}
"""

with open("lib/preachers.ts", "w", encoding="utf-8") as f:
    f.write(content)

print("✅ FIXED: lib/preachers.ts updated with relevant images.")