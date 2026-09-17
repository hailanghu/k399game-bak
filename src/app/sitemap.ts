import type { MetadataRoute } from "next";
import { getAllGames } from "@/lib/db";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const BASE_URL = "https://k399game.com";
const LOCALES = ["en", "zh"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const games = await getAllGames();

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/en`, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/zh`, changeFrequency: "daily", priority: 1 },
  ];

  const gameUrls: MetadataRoute.Sitemap = games.flatMap((game) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}/games/${game.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  );

  return [...staticUrls, ...gameUrls];
}
