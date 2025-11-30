export interface Artist {
  slug: string;
  name: string;
  genre: string;
  bio: string;
  avatarUrl: string;
  bannerUrl: string;
  isLive: boolean;
  latestRelease: {
    title: string;
    type: string;
    year: number;
    coverUrl: string;
  };
  tourSchedule: {
    date: string;
    city: string;
    venue: string;
    isSoldOut: boolean;
  }[];
  merch: {
    name: string;
    price: number;
    imageUrl: string;
  }[];
}

export const artists: Artist[] = [
  {
    slug: "kirk-franklin",
    name: "Kirk Franklin",
    genre: "Gospel",
    bio: "Legendary gospel artist known for high-energy choir performances and global worship impact.",

    // ✅ UPDATED WITH YOUR CORRECT FILE PATHS
    avatarUrl: "/kirk_avatar.png",
    bannerUrl: "/channels4_banner.png",
    isLive: true,

    latestRelease: {
      title: "Try Love",
      type: "Single",
      year: 2023,
      coverUrl: "/KirkFranklin_TryLove_single_cover-art.png",  // ✅ Updated
    },

    tourSchedule: [
      { date: "Nov 12", city: "Dallas, TX", venue: "AAC Arena", isSoldOut: false },
      { date: "Nov 18", city: "Houston, TX", venue: "Toyota Center", isSoldOut: true },
    ],

    merch: [
      { name: "Kingdom Tour Hoodie", price: 65, imageUrl: "/merch/kirk_hoodie.jpg" },
      { name: "KF Logo Tee", price: 30, imageUrl: "/merch/kirk_shirt.jpg" },
    ],
  },

  {
    slug: "lauren-daigle",
    name: "Lauren Daigle",
    genre: "Worship",
    bio: "Grammy-winning worship leader known for her soulful sound and powerful worship anthems.",
    avatarUrl: "/lauren-daigle.jpg",
    bannerUrl: "/lauren-daigle-banner.jpg",
    isLive: false,

    latestRelease: {
      title: "Thank God I Do",
      type: "Single",
      year: 2023,
      coverUrl: "/lauren_latest_release.jpg",
    },

    tourSchedule: [
      { date: "Nov 22", city: "Atlanta, GA", venue: "Fox Theatre", isSoldOut: false },
      { date: "Dec 3", city: "Nashville, TN", venue: "Bridgestone Arena", isSoldOut: false },
    ],

    merch: [
      { name: "LD Heart Tee", price: 28, imageUrl: "/merch/lauren_shirt.jpg" },
      { name: "Worship Candle", price: 20, imageUrl: "/merch/lauren_candle.jpg" },
    ],
  },
];
