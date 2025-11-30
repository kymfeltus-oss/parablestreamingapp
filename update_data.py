import os
import urllib.request

print("⬇️ Downloading T.D. Jakes & Kirk Franklin Images...")

if not os.path.exists("public"):
    os.makedirs("public")

def download_image(url, filename):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response, open(filename, 'wb') as out_file:
            out_file.write(response.read())
        print(f"✅ Downloaded: {filename}")
    except Exception as e:
        print(f"❌ Failed: {filename} - {e}")

# High-Quality Images
download_image("https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg?auto=compress&cs=tinysrgb&w=400", "public/td_jakes_avatar.jpg")
download_image("https://images.pexels.com/photos/8468471/pexels-photo-8468471.jpeg?auto=compress&cs=tinysrgb&w=1200", "public/td_jakes_banner.jpg")
download_image("https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1200", "public/td_jakes_church.jpg")
download_image("https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400", "public/kirk_franklin_avatar.jpg")
download_image("https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1200", "public/kirk_franklin_banner.jpg")

print("\n📝 Updating Preacher Data...")

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
    avatarUrl: "/td_jakes_avatar.jpg",
    bannerUrl: "/td_jakes_banner.jpg",
    tags: ["Leadership", "Vision", "Empowerment"],
    shortTagline: "Transforming lives through the Word.",
    bio: "Bishop T.D. Jakes is a charismatic leader, visionary, provocative thinker, and entrepreneur who serves as senior pastor of The Potter's House.",
    socialStats: { followers: "6.5M", subscribers: "2.1M", instagram: "@bishopjakes" },
    liveStream: {
      id: "tdj-live-1",
      title: "Live: Pursuing Your Purpose",
      category: "Teaching",
      isLive: true,
      viewers: 45200,
      thumbnailUrl: "/td_jakes_banner.jpg",
    },
    featuredStreams: [
      {
        id: "tdj-church-1",
        title: "Sunday Service at The Potter's House",
        category: "Worship",
        isLive: false,
        viewers: 125000,
        thumbnailUrl: "/td_jakes_church.jpg",
      },
    ],
    monetization: ["Books", "Conferences", "Leadership Training"],
  },
  {
    slug: "kirk-franklin",
    name: "Kirk Franklin",
    ministry: "Fo Yo Soul Recordings",
    avatarUrl: "/kirk_franklin_avatar.jpg",
    bannerUrl: "/kirk_franklin_banner.jpg",
    tags: ["Gospel", "Music", "Inspiration"],
    shortTagline: "Revolutionizing Gospel Music.",
    bio: "Kirk Franklin is an American choir director, gospel musician, singer, songwriter, and author known for leading urban contemporary gospel choirs.",
    socialStats: { followers: "3.2M", subscribers: "1.5M", instagram: "@kirkfranklin" },
    liveStream: {
      id: "kf-live-1",
      title: "Live: Creating a New Sound",
      category: "Music",
      isLive: true,
      viewers: 28500,
      thumbnailUrl: "/kirk_franklin_banner.jpg",
    },
    featuredStreams: [],
    monetization: ["Music", "Merch", "Tour Tickets"],
  },
];

export function getCreatorBySlug(slug: string): Creator | undefined {
  return creators.find((c) => c.slug === slug);
}
"""

with open("lib/preachers.ts", "w", encoding="utf-8") as f:
    f.write(preachers_code)
print("✅ Updated: lib/preachers.ts")