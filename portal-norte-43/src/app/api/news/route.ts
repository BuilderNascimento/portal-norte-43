import { NextResponse } from "next/server";

import { getPublishedNews, newsFilterSchema } from "@/lib/mock-data";

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

  const data = await getPublishedNews(filters.data);

  return NextResponse.json(
    {
      count: data.length,
      items: data,
      updatedAt: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60",
      },
    },
  );
}

