import { NextResponse } from "next/server";
import { z } from "zod";
import { getPendingArticles } from "@/lib/supabase/articles";

const adminKeySchema = z.object({
  adminKey: z.string().min(8),
});

// TODO: Implementar verificação real de admin key
function verifyAdminKey(key: string | null | undefined): boolean {
  const validKey = process.env.ADMIN_KEY || 'admin-portal-norte-43-2025';
  return key === validKey;
}

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

  const pendingNews = await getPendingArticles();

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

