/**
 * Funções para buscar e manipular artigos do Supabase
 */

import { supabase } from './client';
import type { Article, NewsItem } from './types';

/**
 * Converte Article do Supabase para NewsItem (formato antigo)
 */
function articleToNewsItem(article: Article, categoryName: string, cityName: string): NewsItem {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    summary: article.summary,
    content: article.content || undefined,
    city: cityName,
    category: categoryName,
    status: article.status,
    publishedAt: article.published_at || article.created_at,
    source: article.source || 'Portal Norte 43',
    image: article.image_url || '/images/og-default.jpg',
  };
}

/**
 * Busca artigos aprovados com filtros opcionais
 */
export async function getPublishedArticles(filters?: {
  city?: string;
  category?: string;
  limit?: number;
}): Promise<NewsItem[]> {
  try {
    let query = supabase
      .from('articles')
      .select(`
        *,
        categories:category_id (name, slug),
        cities:city_id (name, slug)
      `)
      .eq('status', 'approved')
      .order('published_at', { ascending: false })
      .not('published_at', 'is', null) as any;

    // Aplicar filtros
    if (filters?.city) {
      // Buscar por slug da cidade
      const { data: city } = await supabase
        .from('cities')
        .select('id')
        .eq('slug', filters.city.toLowerCase())
        .single();

      if (city) {
        query = query.eq('city_id', city.id);
      } else {
        return []; // Cidade não encontrada
      }
    }

    if (filters?.category) {
      // Buscar por slug da categoria
      const { data: category } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', filters.category.toLowerCase())
        .single();

      if (category) {
        query = query.eq('category_id', category.id);
      } else {
        return []; // Categoria não encontrada
      }
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    } else {
      // Limite padrão de 100 artigos
      query = query.limit(100);
    }

    const { data, error } = await query;

    if (error) {
      console.error('[Supabase] Erro ao buscar artigos:', error);
      return [];
    }

    if (!data) {
      return [];
    }

    // Converter para formato NewsItem
    return (data || []).map((item: any) => {
      const categoryName = (item.categories as any)?.name || 'Geral';
      const cityName = (item.cities as any)?.name || 'Brasil';
      return articleToNewsItem(item as Article, categoryName, cityName);
    });
  } catch (error) {
    console.error('[Supabase] Erro ao buscar artigos:', error);
    return [];
  }
}

/**
 * Busca um artigo pelo slug
 */
export async function getArticleBySlug(slug: string): Promise<NewsItem | null> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select(`
        *,
        categories:category_id (name, slug),
        cities:city_id (name, slug)
      `)
      .eq('slug', slug)
      .eq('status', 'approved')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Não encontrado
        return null;
      }
      console.error('[Supabase] Erro ao buscar artigo:', error);
      return null;
    }

    if (!data) {
      return null;
    }

    const categoryName = ((data as any).categories as any)?.name || 'Geral';
    const cityName = ((data as any).cities as any)?.name || 'Brasil';
    return articleToNewsItem(data as Article, categoryName, cityName);
  } catch (error) {
    console.error('[Supabase] Erro ao buscar artigo:', error);
    return null;
  }
}

/**
 * Busca artigos relacionados (mesma categoria ou cidade)
 */
export async function getRelatedArticles(
  currentSlug: string,
  categoryId?: string,
  cityId?: string,
  limit: number = 3
): Promise<NewsItem[]> {
  try {
    let query = supabase
      .from('articles')
      .select(`
        *,
        categories:category_id (name, slug),
        cities:city_id (name, slug)
      `)
      .eq('status', 'approved')
      .neq('slug', currentSlug)
      .not('published_at', 'is', null)
      .order('published_at', { ascending: false })
      .limit(limit);

    // Filtrar por categoria ou cidade
    if (categoryId) {
      query = query.eq('category_id', categoryId);
    } else if (cityId) {
      query = query.eq('city_id', cityId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('[Supabase] Erro ao buscar artigos relacionados:', error);
      return [];
    }

    if (!data) {
      return [];
    }

    return (data || []).map((item: any) => {
      const categoryName = (item.categories as any)?.name || 'Geral';
      const cityName = (item.cities as any)?.name || 'Brasil';
      return articleToNewsItem(item as Article, categoryName, cityName);
    });
  } catch (error) {
    console.error('[Supabase] Erro ao buscar artigos relacionados:', error);
    return [];
  }
}

/**
 * Busca artigos pendentes (para admin)
 */
export async function getPendingArticles(): Promise<NewsItem[]> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select(`
        *,
        categories:category_id (name, slug),
        cities:city_id (name, slug)
      `)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Supabase] Erro ao buscar artigos pendentes:', error);
      return [];
    }

    if (!data) {
      return [];
    }

    return (data || []).map((item: any) => {
      const categoryName = (item.categories as any)?.name || 'Geral';
      const cityName = (item.cities as any)?.name || 'Brasil';
      return articleToNewsItem(item as Article, categoryName, cityName);
    });
  } catch (error) {
    console.error('[Supabase] Erro ao buscar artigos pendentes:', error);
    return [];
  }
}

