import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGameBySlug } from "@/lib/db";
import GameDetail from "@/components/GameDetail";
import { unstable_setRequestLocale } from "next-intl/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const game = await getGameBySlug(params.slug);
  if (!game) {
    return { title: "Game not found | k399game" };
  }
  const title = `${game.title} — Play Free AI ${game.category} Game | k399game`;
  const description =
    game.description ||
    `Play ${game.title}, a 100% AI-generated ${game.category} game on k399game.`;
  return {
    title,
    description,
    alternates: {
      canonical: `https://k399game.com/${params.locale}/games/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default async function GameDetailPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  unstable_setRequestLocale(locale);

  const game = await getGameBySlug(slug);
  if (!game) notFound();

  return <GameDetail game={game} locale={locale} />;
}
