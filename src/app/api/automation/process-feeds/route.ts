/**
 * API Route para processar feeds RSS e armazenar notícias
 * Pode ser chamada manualmente ou via cron job
 */

import { NextResponse } from 'next/server';
import { fetchAllRSSFeeds } from '@/lib/rss-feeds';
import { addAutomatedNews, getStorageStats } from '@/lib/automation/news-storage';
import { RSS_FEEDS } from '@/lib/rss-feeds';

// Proteção básica: requer API key (pode ser configurada via env)
const API_KEY = process.env.AUTOMATION_API_KEY || 'portal-norte-43-auto-2025';

export async function POST(request: Request) {
  try {
    // Verifica API key (opcional, mas recomendado)
    const authHeader = request.headers.get('authorization');
    const providedKey = authHeader?.replace('Bearer ', '') || 
                       new URL(request.url).searchParams.get('key');

    if (providedKey !== API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('🔄 Iniciando processamento de feeds RSS...');
    const startTime = Date.now();

    // Busca notícias de todos os feeds RSS
    const rssNews = await fetchAllRSSFeeds(50); // Limita a 50 itens

    if (rssNews.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'Nenhuma notícia nova encontrada',
        added: 0,
        total: 0,
        duration: Date.now() - startTime,
      });
    }

    // Adiciona ao armazenamento
    const addedCount = await addAutomatedNews(rssNews);

    // Obtém estatísticas
    const stats = await getStorageStats();

    const duration = Date.now() - startTime;

    console.log(`✅ Processamento concluído: ${addedCount} notícias adicionadas em ${duration}ms`);

    return NextResponse.json({
      success: true,
      message: `Processamento concluído com sucesso`,
      added: addedCount,
      total: stats.totalNews,
      processedFeeds: RSS_FEEDS.length,
      duration,
      lastUpdate: stats.lastUpdate,
    });
  } catch (error: any) {
    console.error('❌ Erro ao processar feeds:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erro ao processar feeds RSS',
      },
      { status: 500 }
    );
  }
}

/**
 * GET: Retorna estatísticas do armazenamento
 */
export async function GET(request: Request) {
  try {
    const stats = await getStorageStats();

    return NextResponse.json({
      success: true,
      stats,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erro ao obter estatísticas',
      },
      { status: 500 }
    );
  }
}

