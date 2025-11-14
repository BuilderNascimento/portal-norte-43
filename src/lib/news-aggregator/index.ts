/**
 * Agregador de notícias - Agora usando Supabase como fonte principal
 * Substitui completamente a leitura de arquivos locais
 */

import type { NewsItem } from '@/lib/supabase/types';
import { getPublishedArticles, getArticleBySlug, getRelatedArticles } from '@/lib/supabase/articles';
import { getAllCategories } from '@/lib/supabase/categories';
import { getAllCities } from '@/lib/supabase/cities';

/**
 * Busca notícias agregadas do Supabase
 */
export async function getAggregatedNews(filters?: { city?: string; category?: string }) {
  try {
    console.log('[NewsAggregator] Buscando notícias do Supabase...');

    const news = await getPublishedArticles({
      city: filters?.city,
      category: filters?.category,
      limit: 100, // Limite de 100 notícias
    });

    console.log(`[NewsAggregator] ✅ ${news.length} notícias encontradas no Supabase`);

    // Filtrar notícias com mais de 10 dias (opcional, pode ser removido)
    const now = new Date();
    const tenDaysAgo = new Date(now);
    tenDaysAgo.setDate(now.getDate() - 10);
    tenDaysAgo.setHours(0, 0, 0, 0);

    const recentNews = news.filter(newsItem => {
      const newsDate = new Date(newsItem.publishedAt);
      return newsDate >= tenDaysAgo;
    });

    console.log(`[NewsAggregator] ${recentNews.length} notícias recentes (últimos 10 dias)`);

    return recentNews;
  } catch (error) {
    console.error('[NewsAggregator] Erro ao buscar notícias:', error);
    return [];
  }
}

/**
 * Obtém cidades disponíveis do Supabase
 */
export async function getAggregatedCities(): Promise<string[]> {
  try {
    const cities = await getAllCities();
    return cities.map(city => city.name).sort();
  } catch (error) {
    console.error('[NewsAggregator] Erro ao buscar cidades:', error);
    return ['Brasil']; // Fallback
  }
}

/**
 * Obtém categorias disponíveis do Supabase
 */
export async function getAggregatedCategories(): Promise<string[]> {
  try {
    const categories = await getAllCategories();
    return categories.map(cat => cat.name).sort();
  } catch (error) {
    console.error('[NewsAggregator] Erro ao buscar categorias:', error);
    return ['Geral']; // Fallback
  }
}

/**
 * Busca uma notícia pelo slug
 */
export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  try {
    return await getArticleBySlug(slug);
  } catch (error) {
    console.error('[NewsAggregator] Erro ao buscar notícia por slug:', error);
    return null;
  }
}

/**
 * Busca notícias relacionadas
 */
export async function getRelatedNews(
  currentSlug: string,
  category?: string,
  city?: string,
  limit: number = 3
): Promise<NewsItem[]> {
  try {
    // Buscar artigo atual para obter IDs
    const currentArticle = await getArticleBySlug(currentSlug);
    if (!currentArticle) {
      return [];
    }

    // Buscar artigo completo do Supabase para obter IDs
    const { supabase } = await import('@/lib/supabase/client');
    const { data: articleData } = await supabase
      .from('articles')
      .select('category_id, city_id')
      .eq('slug', currentSlug)
      .single();

    if (!articleData) {
      return [];
    }

    const categoryId = (articleData as any).category_id;
    const cityId = (articleData as any).city_id;

    return await getRelatedArticles(
      currentSlug,
      categoryId || undefined,
      cityId || undefined,
      limit
    );
  } catch (error) {
    console.error('[NewsAggregator] Erro ao buscar notícias relacionadas:', error);
    return [];
  }
}
