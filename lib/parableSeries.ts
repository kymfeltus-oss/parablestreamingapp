import { readMicrodramas } from "./microdramas";

export function getSeriesList() {
  const eps = readMicrodramas();
  const seriesMap: Record<string, any[]> = {};

  eps.forEach((ep: any) => {
    if (!ep.seriesTitle) return;

    const key = ep.seriesTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    if (!seriesMap[key]) {
      seriesMap[key] = [];
    }
    seriesMap[key].push(ep);
  });

  return seriesMap;
}

export function getSeries(slug: string) {
  const eps = readMicrodramas();

  const filtered = eps.filter((ep: any) => {
    const key = ep.seriesTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return key === slug;
  });

  if (filtered.length === 0) return null;

  return {
    slug,
    title: filtered[0].seriesTitle,
    episodes: filtered.sort((a, b) => a.episodeNumber - b.episodeNumber),
  };
}
