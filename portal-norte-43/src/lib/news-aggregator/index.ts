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
      fetchAllRSSFeeds(15), // Limita RSS a 15 itens
    ]);

    // Combina e ordena por data (mais recentes primeiro)
    const allNews: NewsItem[] = [...mockNews, ...rssNews].sort(
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
  const mockCategories = ['Política', 'Trânsito', 'Policial', 'Economia', 'Esportes', 'Geral', 'Cidade'];
  const rssCategories = ['Nacional', 'Governo', 'Educação'];
  
  return Array.from(new Set([...mockCategories, ...rssCategories])).sort();
}

