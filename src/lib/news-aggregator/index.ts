import type { NewsItem } from '@/lib/mock-data';
import { getPublishedNews } from '@/lib/mock-data';
import { fetchAllRSSFeeds } from '@/lib/rss-feeds';
import { loadAutomatedNews } from '@/lib/automation/news-storage';

/**
 * Combina notícias mockadas com notícias dos feeds RSS e notícias automatizadas
 */
export async function getAggregatedNews(filters?: { city?: string; category?: string }) {
  try {
    // Busca notícias mockadas, RSS e automatizadas em paralelo
    const [mockNews, rssNews, automatedNews] = await Promise.all([
      getPublishedNews(filters),
      fetchAllRSSFeeds(30), // 30 itens RSS
      loadAutomatedNews(), // Notícias já processadas e armazenadas
    ]);

    console.log(`[NewsAggregator] Mock: ${mockNews.length}, RSS: ${rssNews.length}, Automated: ${automatedNews.length}`);
    
    // LOG DETALHADO DAS PRIMEIRAS NOTÍCIAS MOCK
    if (mockNews.length > 0) {
      console.log(`[NewsAggregator] Primeiras 3 notícias MOCK:`);
      mockNews.slice(0, 3).forEach((n, i) => {
        console.log(`  ${i + 1}. "${n.title}" - ${n.category} - ${n.city} - ${n.publishedAt}`);
      });
    }

    // Calcula a data de 10 dias atrás (timezone de São Paulo - UTC-3)
    const now = new Date();
    const tenDaysAgo = new Date(now);
    tenDaysAgo.setDate(now.getDate() - 10);
    tenDaysAgo.setHours(0, 0, 0, 0); // Início do dia

    // Combina todas as fontes e filtra notícias com menos de 10 dias
    // Remove duplicatas baseado no slug
    // IMPORTANTE: Prioriza mockNews sobre outras fontes para evitar duplicatas
    const allNewsMap = new Map<string, NewsItem>();
    
    // Primeiro adiciona mockNews (prioridade)
    mockNews.forEach(news => {
      const newsDate = new Date(news.publishedAt);
      const isRecent = newsDate >= tenDaysAgo;
      if (isRecent) {
        // FORÇA adicionar mesmo se já existir (mockNews tem prioridade)
        allNewsMap.set(news.slug, news);
        console.log(`[NewsAggregator] ✅ Mock adicionada: ${news.title.substring(0, 50)}... (${news.slug})`);
      } else {
        console.log(`[NewsAggregator] ❌ Mock filtrada (muito antiga): ${news.title.substring(0, 50)}... - ${news.publishedAt} (limite: ${tenDaysAgo.toISOString()})`);
      }
    });
    
    // Depois adiciona RSS (se não for duplicata)
    rssNews.forEach(news => {
      const newsDate = new Date(news.publishedAt);
      const isRecent = newsDate >= tenDaysAgo;
      const isDuplicate = allNewsMap.has(news.slug);
      
      if (isRecent && !isDuplicate) {
        allNewsMap.set(news.slug, news);
        console.log(`[NewsAggregator] RSS adicionada: ${news.title} (${news.slug})`);
      } else if (!isRecent) {
        console.log(`[NewsAggregator] RSS filtrada (muito antiga): ${news.title} - ${news.publishedAt}`);
      } else if (isDuplicate) {
        console.log(`[NewsAggregator] RSS duplicada ignorada: ${news.title} (slug: ${news.slug})`);
      }
    });
    
    // Por último adiciona automatedNews (se não for duplicata)
    automatedNews.forEach(news => {
      const newsDate = new Date(news.publishedAt);
      const isRecent = newsDate >= tenDaysAgo;
      const isDuplicate = allNewsMap.has(news.slug);
      
      if (isRecent && !isDuplicate) {
        allNewsMap.set(news.slug, news);
        console.log(`[NewsAggregator] Automated adicionada: ${news.title} (${news.slug})`);
      } else if (!isRecent) {
        console.log(`[NewsAggregator] Automated filtrada (muito antiga): ${news.title} - ${news.publishedAt}`);
      } else if (isDuplicate) {
        console.log(`[NewsAggregator] Automated duplicada ignorada: ${news.title} (slug: ${news.slug})`);
      }
    });
    
    console.log(`[NewsAggregator] Total após filtros: ${allNewsMap.size} notícias`);

    const allNews: NewsItem[] = Array.from(allNewsMap.values()).sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
    
    // LOG FINAL - PRIMEIRAS 5 NOTÍCIAS APÓS ORDENAÇÃO
    console.log(`[NewsAggregator] 📊 Primeiras 5 notícias após ordenação:`);
    allNews.slice(0, 5).forEach((n, i) => {
      console.log(`  ${i + 1}. "${n.title.substring(0, 60)}..." - ${n.category} - ${n.publishedAt}`);
    });

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
 * Busca uma notícia pelo slug (mockadas + RSS + automatizadas)
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

    // Busca nas notícias automatizadas
    const { loadAutomatedNews } = await import('@/lib/automation/news-storage');
    const automatedNews = await loadAutomatedNews();
    const automatedItem = automatedNews.find(news => news.slug === slug);
    
    if (automatedItem) {
      return automatedItem;
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
