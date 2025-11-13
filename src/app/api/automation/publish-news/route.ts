/**
 * API Route para receber e publicar notícias processadas pelo bot
 * Autenticação via API Key
 */

import { NextResponse } from 'next/server';
import { addAutomatedNews } from '@/lib/automation/news-storage';
import { z } from 'zod';

// Schema de validação para notícia processada
const publishNewsSchema = z.object({
  title: z.string().min(10).max(200),
  summary: z.string().min(50).max(500),
  content: z.string().min(200),
  category: z.string(),
  city: z.string(),
  source: z.string(),
  image: z.string(),
  slug: z.string(),
  publishedAt: z.string(),
  status: z.enum(['draft', 'pending', 'approved']),
});

// API Key (pode ser configurada via env)
const API_KEY = process.env.AUTOMATION_API_KEY || 'portal-norte-43-auto-2025';

function unauthorizedResponse() {
  return NextResponse.json(
    { error: 'Não autorizado. API Key inválida.' },
    { status: 401 }
  );
}

export async function POST(request: Request) {
  try {
    // Verifica autenticação
    const authHeader = request.headers.get('authorization');
    const providedKey = authHeader?.replace('Bearer ', '') || 
                       new URL(request.url).searchParams.get('key');

    if (providedKey !== API_KEY) {
      return unauthorizedResponse();
    }

    // Parse e valida dados
    const body = await request.json();
    const validation = publishNewsSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Dados inválidos',
          details: validation.error.errors,
        },
        { status: 400 }
      );
    }

    const newsData = validation.data;

    // Converte para formato NewsItem
    const newsItem = {
      id: Date.now() + Math.random(), // ID único temporário
      slug: newsData.slug,
      title: newsData.title,
      summary: newsData.summary,
      city: newsData.city,
      category: newsData.category,
      status: newsData.status as 'draft' | 'pending' | 'approved',
      publishedAt: newsData.publishedAt,
      source: newsData.source,
      image: newsData.image,
      content: newsData.content,
    };

    // Adiciona ao armazenamento
    const addedCount = await addAutomatedNews([newsItem]);

    if (addedCount > 0) {
      return NextResponse.json(
        {
          success: true,
          message: 'Notícia publicada com sucesso',
          news: {
            slug: newsItem.slug,
            title: newsItem.title,
            category: newsItem.category,
          },
        },
        { status: 201 }
      );
    } else {
      // Notícia já existe (duplicada)
      return NextResponse.json(
        {
          success: false,
          message: 'Notícia já existe (duplicada)',
        },
        { status: 409 }
      );
    }

  } catch (error: any) {
    console.error('Erro ao publicar notícia:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erro ao processar requisição',
      },
      { status: 500 }
    );
  }
}

// GET: Retorna informações sobre o endpoint
export async function GET() {
  return NextResponse.json({
    endpoint: '/api/automation/publish-news',
    method: 'POST',
    description: 'Endpoint para publicar notícias processadas pelo bot',
    authentication: 'Bearer token ou query parameter ?key=',
    requiredFields: [
      'title', 'summary', 'content', 'category', 'city',
      'source', 'image', 'slug', 'publishedAt', 'status'
    ],
  });
}

