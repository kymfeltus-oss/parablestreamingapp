export interface Event {
  id: string;      // clean readable slug
  title: string;
  artist: string;
  date: string;
  venue: string;
  city: string;
  imageUrl: string;
  description: string;
  ticketsUrl: string;
}

export const events: Event[] = [
  {
    id: "kingdom-praise-live-tour",
    title: "Kingdom Praise Live Tour",
    artist: "Kirk Franklin",
    date: "Dec 15, 2025",
    venue: "American Airlines Center",
    city: "Dallas, TX",
    imageUrl: "/events/kingdom_praise_banner.jpg",
    description:
      "Join Kirk Franklin for an unforgettable night of praise, gospel energy, and celebration on the Kingdom Praise Live Tour.",
    ticketsUrl: "https://example.com/tickets/kirk-franklin",
  },
  {
    id: "worship-night-in-the-city",
    title: "Worship Night in the City",
    artist: "Lauren Daigle",
    date: "Jan 10, 2026",
    venue: "State Farm Arena",
    city: "Atlanta, GA",
    imageUrl: "/events/worship_night_banner.jpg",
    description:
      "An intimate worship night with Lauren Daigle featuring her most powerful songs, acoustic moments, and spontaneous worship.",
    ticketsUrl: "https://example.com/tickets/lauren-daigle",
  },
];
