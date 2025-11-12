import { NextResponse } from "next/server";

import { adminKeySchema, getPendingNews, verifyAdminKey } from "@/lib/mock-data";

function unauthorizedResponse() {
  return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
}

export async function GET(request: Request) {
  const adminKey = request.headers.get("x-admin-key");

  const parsed = adminKeySchema.safeParse({
    adminKey: adminKey ?? "",
  });

  if (!parsed.success || !verifyAdminKey(parsed.data.adminKey)) {
    return unauthorizedResponse();
  }

  const pendingNews = await getPendingNews();

  return NextResponse.json(
    {
      count: pendingNews.length,
      items: pendingNews,
    },
    {
      headers: {
        "Cache-Control": "private, no-store",
      },
    },
  );
}

