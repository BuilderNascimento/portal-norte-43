import { NextResponse } from "next/server";

import { fetchAllRSSFeeds } from "@/lib/rss-feeds";

export async function GET() {
  try {
    const news = await fetchAllRSSFeeds(20);

    return NextResponse.json(
      {
        count: news.length,
        items: news,
        updatedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300", // Cache de 5 minutos
        },
      },
    );
  } catch (error) {
    console.error("Erro ao buscar feeds RSS:", error);
    return NextResponse.json(
      { error: "Erro ao buscar notícias dos feeds RSS." },
      { status: 500 },
    );
  }
}

