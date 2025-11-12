import { NextResponse } from "next/server";

import { newsFilterSchema } from "@/lib/mock-data";
import { getAggregatedNews } from "@/lib/news-aggregator";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const filters = newsFilterSchema.safeParse({
    city: url.searchParams.get("city") || undefined,
    category: url.searchParams.get("category") || undefined,
  });

  if (!filters.success) {
    return NextResponse.json(
      { error: "Parâmetros inválidos." },
      { status: 400 },
    );
  }

  const data = await getAggregatedNews(filters.data);

  return NextResponse.json(
    {
      count: data.length,
      items: data,
      updatedAt: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=120", // Cache de 2 minutos
      },
    },
  );
}

