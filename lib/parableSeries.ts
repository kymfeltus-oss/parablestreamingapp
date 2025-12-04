import { readMicrodramas } from "./microdramas";

// Define the Episode type
export type Episode = {
  id: string;
  videoId?: string;
  title: string;
  seriesTitle?: string;
  episodeNumber: number;
  description?: string;
  scriptureRef?: string;
  thumbnail?: string;
  tags?: string[];
  createdAt?: string;
};

export function getSeriesList() {
  const eps: Episode[] = readMicrodramas();
  const seriesMap: Record<string, Episode[]> = {};

  eps.forEach((ep: Episode) => {
    if (!ep.seriesTitle) return;

    const slug = ep.seriesTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    if (!seriesMap[slug]) {
      seriesMap[slug] = [];
    }
    seriesMap[slug].push(ep);
  });

  return seriesMap;
}

export function getSeries(slug: string) {
  const eps: Episode[] = readMicrodramas();

  const filtered: Episode[] = eps.filter((ep: Episode) => {
    const key = ep.seriesTitle?.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return key === slug;
  });

  if (filtered.length === 0) return null;

  return {
    slug,
    title: filtered[0].seriesTitle || "",
    episodes: filtered.sort(
      (a: Episode, b: Episode) =>
        (a.episodeNumber || 0) - (b.episodeNumber || 0)
    ),
  };
}
