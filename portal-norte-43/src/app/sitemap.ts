import { MetadataRoute } from 'next';

import { getAggregatedNews } from '@/lib/news-aggregator';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://portal-norte-43.vercel.app';

  // Busca todas as notícias
  const news = await getAggregatedNews();

  // Páginas estáticas
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
    {
      url: `${baseUrl}/anuncie-conosco`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Páginas de notícias
  const newsPages: MetadataRoute.Sitemap = news.map(item => ({
    url: `${baseUrl}/${item.slug}`,
    lastModified: new Date(item.publishedAt),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...newsPages];
}

