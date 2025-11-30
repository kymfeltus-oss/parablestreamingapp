// data/creators.ts
// Central creator profile data used throughout the app.

export type CreatorProfile = {
  id: string;
  name: string;
  handle: string;
  role: string;
  avatar: string;
  isLive?: boolean;
  viewers?: string;
  tag?: string;
};

export const creatorProfiles: CreatorProfile[] = [
  {
    id: "mike-todd",
    name: "Pastor Mike Todd",
    handle: "@miketodd",
    role: "Lead Pastor • Transformation Church",
    avatar: "/images/creators/mike-todd.jpg",
    isLive: true,
    viewers: "12.4k watching",
    tag: "Trending Now",
  },
  {
    id: "td-jakes",
    name: "Bishop T.D. Jakes",
    handle: "@bishopjakes",
    role: "Senior Pastor • The Potter's House",
    avatar: "/images/creators/td-jakes.jpg",
    isLive: false,
    viewers: "8.1k rewatching",
    tag: "Featured",
  },
  {
    id: "kirk-franklin",
    name: "Kirk Franklin",
    handle: "@kirkfranklin",
    role: "Gospel Artist • Producer",
    avatar: "/images/creators/kirk-franklin.jpg",
    isLive: false,
    viewers: "5.6k listening",
    tag: "Gospel Music",
  },
];
