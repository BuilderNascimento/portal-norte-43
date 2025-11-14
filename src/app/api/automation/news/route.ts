/**
 * API Endpoint para n8n inserir notícias no Supabase
 * Autenticação via API Key
 */

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { z } from 'zod';

// Schema de validação para notícia do n8n
const newsSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(10).max(200),
  summary: z.string().min(50).max(500),
  content: z.string().min(200),
  category: z.string().min(1), // Nome ou slug da categoria
  city: z.string().min(1), // Nome ou slug da cidade
  source: z.string().min(1),
  image_url: z.string().url(),
  published_at: z.string().datetime().optional(),
  status: z.enum(['draft', 'pending', 'approved']).default('approved'),
});

// API Key para autenticação (configurar no n8n)
const API_KEY = process.env.AUTOMATION_API_KEY || 'portal-norte-43-n8n-2025';

function unauthorizedResponse() {
  return NextResponse.json(
    { error: 'Não autorizado. API Key inválida.' },
    { status: 401 }
  );
}

export async function POST(request: Request) {
  try {
    console.log('[AutomationAPI] Recebida requisição POST para inserir notícia');

    // Verifica autenticação
    const authHeader = request.headers.get('authorization');
    const providedKey = authHeader?.replace('Bearer ', '') ||
      new URL(request.url).searchParams.get('key');

    if (providedKey !== API_KEY) {
      console.log('[AutomationAPI] Erro: API Key inválida');
      return unauthorizedResponse();
    }

    if (!supabaseAdmin) {
      console.error('[AutomationAPI] Erro: Supabase admin não configurado');
      return NextResponse.json(
        { error: 'Supabase não configurado corretamente' },
        { status: 500 }
      );
    }

    // Parse e valida dados
    const body = await request.json();
    const validation = newsSchema.safeParse(body);

    if (!validation.success) {
      console.error('[AutomationAPI] Erro de validação:', validation.error);
      return NextResponse.json(
        {
          error: 'Dados inválidos',
          details: validation.error.errors,
        },
        { status: 400 }
      );
    }

    const newsData = validation.data;

    // Buscar IDs de categoria e cidade
    let categoryId: string | null = null;
    let cityId: string | null = null;

    // Buscar categoria (por slug ou nome)
    const { data: category } = await supabaseAdmin
      .from('categories')
      .select('id')
      .or(`slug.eq.${newsData.category.toLowerCase()},name.ilike.%${newsData.category}%`)
      .limit(1)
      .single();

    if (category) {
      categoryId = category.id;
    } else {
      console.warn(`[AutomationAPI] Categoria não encontrada: ${newsData.category}`);
    }

    // Buscar cidade (por slug ou nome)
    const { data: city } = await supabaseAdmin
      .from('cities')
      .select('id')
      .or(`slug.eq.${newsData.city.toLowerCase()},name.ilike.%${newsData.city}%`)
      .limit(1)
      .single();

    if (city) {
      cityId = city.id;
    } else {
      console.warn(`[AutomationAPI] Cidade não encontrada: ${newsData.city}`);
    }

    // Verificar se artigo já existe (por slug)
    const { data: existing } = await supabaseAdmin
      .from('articles')
      .select('id, slug')
      .eq('slug', newsData.slug)
      .single();

    if (existing) {
      console.log(`[AutomationAPI] Artigo já existe: ${newsData.slug}`);
      return NextResponse.json(
        {
          success: false,
          message: 'Artigo já existe',
          article_id: existing.id,
        },
        { status: 409 }
      );
    }

    // Inserir artigo
    const { data: article, error } = await supabaseAdmin
      .from('articles')
      .insert({
        slug: newsData.slug,
        title: newsData.title,
        summary: newsData.summary,
        content: newsData.content,
        category_id: categoryId,
        city_id: cityId,
        source: newsData.source,
        image_url: newsData.image_url,
        status: newsData.status,
        published_at: newsData.published_at || new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('[AutomationAPI] Erro ao inserir artigo:', error);
      return NextResponse.json(
        {
          success: false,
          error: error.message || 'Erro ao inserir artigo no Supabase',
        },
        { status: 500 }
      );
    }

    console.log(`[AutomationAPI] ✅ Artigo inserido com sucesso: ${article.id} - ${newsData.title}`);

    return NextResponse.json(
      {
        success: true,
        message: 'Artigo inserido com sucesso',
        article: {
          id: article.id,
          slug: article.slug,
          title: article.title,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('[AutomationAPI] Erro ao processar requisição:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erro interno do servidor',
      },
      { status: 500 }
    );
  }
}

// GET: Retorna informações sobre o endpoint
export async function GET() {
  return NextResponse.json({
    endpoint: '/api/automation/news',
    method: 'POST',
    description: 'Endpoint para n8n inserir notícias no Supabase',
    authentication: 'Bearer token ou query parameter ?key=',
    requiredFields: [
      'slug', 'title', 'summary', 'content', 'category', 'city',
      'source', 'image_url'
    ],
    optionalFields: ['published_at', 'status'],
  });
}

