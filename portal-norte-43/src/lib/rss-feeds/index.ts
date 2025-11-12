import Parser from 'rss-parser';
import type { NewsItem } from '@/lib/mock-data';

const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'Portal Norte 43 RSS Reader',
  },
});

export interface RSSFeedSource {
  name: string;
  url: string;
  category: string;
}

export const RSS_FEEDS: RSSFeedSource[] = [
  {
    name: 'Agência Brasil',
    url: 'https://agenciabrasil.ebc.com.br/rss.xml',
    category: 'Nacional',
  },
  {
    name: 'Agência Brasil - Últimas',
    url: 'https://agenciabrasil.ebc.com.br/ultimas-noticias/rss',
    category: 'Nacional',
  },
  {
    name: 'Gov.br Notícias',
    url: 'https://www.gov.br/pt-br/noticias/@@rss.xml',
    category: 'Governo',
  },
];

/**
 * Extrai texto limpo de HTML
 */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

/**
 * Extrai imagem do conteúdo HTML ou retorna placeholder
 */
function extractImage(content: string | undefined, enclosure?: any): string {
  if (enclosure?.url && enclosure?.type?.startsWith('image/')) {
    return enclosure.url;
  }

  if (content) {
    const imgMatch = content.match(/<img[^>]+src="([^"]+)"/i);
    if (imgMatch && imgMatch[1]) {
      return imgMatch[1];
    }
  }

  // Placeholder baseado na categoria
  return '/images/news/tempestade-maringa.svg';
}

/**
 * Gera slug único a partir do título e data
 */
function generateSlug(title: string, pubDate?: string): string {
  const dateStr = pubDate ? new Date(pubDate).toISOString().split('T')[0] : Date.now().toString();
  return `${title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')}-${dateStr}`;
}

/**
 * Busca e processa um feed RSS
 */
export async function fetchRSSFeed(feedSource: RSSFeedSource): Promise<NewsItem[]> {
  try {
    const feed = await parser.parseURL(feedSource.url);
    
    if (!feed.items || feed.items.length === 0) {
      return [];
    }

    return feed.items
      .slice(0, 10) // Limita a 10 itens por feed
      .map((item, index) => {
        const title = item.title || 'Sem título';
        const content = item.contentSnippet || item.content || item.description || '';
        const summary = stripHtml(content).substring(0, 200) || 'Sem descrição disponível.';
        
        return {
          id: Date.now() + index + Math.random(), // ID único
          slug: generateSlug(title, item.pubDate),
          title: title.substring(0, 150), // Limita tamanho do título
          summary: summary.length > 200 ? summary.substring(0, 197) + '...' : summary,
          city: 'Brasil', // Notícias nacionais
          category: feedSource.category,
          status: 'approved' as const,
          publishedAt: item.pubDate 
            ? new Date(item.pubDate).toISOString()
            : new Date().toISOString(),
          source: feedSource.name,
          image: extractImage(item.content || item.description, item.enclosure),
        };
      });
  } catch (error: any) {
    // Log mais detalhado do erro
    const errorMessage = error?.message || 'Erro desconhecido';
    const statusCode = error?.statusCode || 'N/A';
    console.error(`Erro ao buscar feed ${feedSource.name} (${feedSource.url}):`, {
      message: errorMessage,
      statusCode,
    });
    return [];
  }
}

/**
 * Busca notícias de todos os feeds RSS configurados
 */
export async function fetchAllRSSFeeds(limit: number = 20): Promise<NewsItem[]> {
  try {
    const allFeeds = await Promise.all(
      RSS_FEEDS.map(feed => fetchRSSFeed(feed))
    );

    // Combina todos os feeds e ordena por data
    const allNews = allFeeds
      .flat()
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit);

    return allNews;
  } catch (error) {
    console.error('Erro ao buscar feeds RSS:', error);
    return [];
  }
}

