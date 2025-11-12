import type { NewsItem } from '@/lib/mock-data';
import { getPublishedNews } from '@/lib/mock-data';
import { fetchAllRSSFeeds } from '@/lib/rss-feeds';

/**
 * Combina notícias mockadas com notícias dos feeds RSS
 */
export async function getAggregatedNews(filters?: { city?: string; category?: string }) {
  try {
    // Busca notícias mockadas e RSS em paralelo
    const [mockNews, rssNews] = await Promise.all([
      getPublishedNews(filters),
      fetchAllRSSFeeds(30), // Aumentado para 30 itens RSS (mais feeds = mais notícias)
    ]);

    // Calcula a data de 10 dias atrás (timezone de São Paulo - UTC-3)
    const now = new Date();
    const tenDaysAgo = new Date(now);
    tenDaysAgo.setDate(now.getDate() - 10);
    tenDaysAgo.setHours(0, 0, 0, 0); // Início do dia

    // Combina e filtra notícias com menos de 10 dias
    const allNews: NewsItem[] = [...mockNews, ...rssNews]
      .filter(news => {
        const newsDate = new Date(news.publishedAt);
        return newsDate >= tenDaysAgo;
      })
      .sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );

    // Aplica filtros se necessário
    let filteredNews = allNews;
    if (filters?.city) {
      filteredNews = filteredNews.filter(news => news.city === filters.city);
    }
    if (filters?.category) {
      filteredNews = filteredNews.filter(news => news.category === filters.category);
    }

    return filteredNews;
  } catch (error) {
    console.error('Erro ao agregar notícias:', error);
    // Em caso de erro, retorna apenas as mockadas
    return getPublishedNews(filters);
  }
}

/**
 * Obtém cidades disponíveis (mockadas + RSS)
 */
export function getAggregatedCities() {
  const mockCities = ['Maringá', 'Marialva', 'Mandaguari', 'Andirá', 'Cambará', 'Bandeirantes'];
  const rssCity = 'Brasil';
  
  return Array.from(new Set([...mockCities, rssCity])).sort();
}

/**
 * Obtém categorias disponíveis (mockadas + RSS)
 */
export function getAggregatedCategories() {
  const mockCategories = ['Política', 'Trânsito', 'Policial', 'Economia', 'Esportes', 'Geral', 'Cidade', 'COP30', 'Meio Ambiente', 'Combate ao Crime', 'Agricultura e Consumo'];
  const rssCategories = ['Nacional', 'Governo', 'Educação', 'Saúde', 'Infraestrutura', 'Cidades', 'Trânsito'];
  
  return Array.from(new Set([...mockCategories, ...rssCategories])).sort();
}

/**
 * Busca uma notícia pelo slug (mockadas + RSS)
 * Otimizado: usa cache de RSS e limita busca
 */
export async function getNewsBySlug(slug: string) {
  try {
    // Busca primeiro nas mockadas
    const { getNewsBySlug: getMockNewsBySlug } = await import('@/lib/mock-data');
    const mockNews = await getMockNewsBySlug(slug);
    
    if (mockNews) {
      return mockNews;
    }

    // Se não encontrou, busca nos feeds RSS (com cache, então é rápido)
    // Limita a 50 itens ao invés de 100 para melhor performance
    const { fetchAllRSSFeeds } = await import('@/lib/rss-feeds');
    const rssNews = await fetchAllRSSFeeds(50);
    const rssItem = rssNews.find(news => news.slug === slug);
    
    return rssItem || null;
  } catch (error) {
    console.error('Erro ao buscar notícia por slug:', error);
    return null;
  }
}

/**
 * Busca notícias relacionadas (mesma categoria ou cidade, excluindo a atual)
 * Já aplica o filtro de 10 dias através de getAggregatedNews
 */
export async function getRelatedNews(currentSlug: string, category?: string, city?: string, limit: number = 3) {
  try {
    const allNews = await getAggregatedNews();
    
    // Filtra notícias relacionadas (mesma categoria ou cidade, excluindo a atual)
    // getAggregatedNews já filtra notícias com mais de 10 dias
    const related = allNews
      .filter(news => {
        if (news.slug === currentSlug) return false;
        if (category && news.category === category) return true;
        if (city && news.city === city) return true;
        return false;
      })
      .slice(0, limit);
    
    return related;
  } catch (error) {
    console.error('Erro ao buscar notícias relacionadas:', error);
    return [];
  }
}

