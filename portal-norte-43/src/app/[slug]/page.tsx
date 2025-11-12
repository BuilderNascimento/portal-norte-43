import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AdSlot } from "@/components/features/news/ad-slot";
import { NewsCard } from "@/components/features/news/news-card";
import { getAdsByPosition } from "@/lib/mock-data";
import { getNewsBySlug, getRelatedNews } from "@/lib/news-aggregator";
import { formatDateTimeBR } from "@/lib/utils/date";
import { normalizeImageUrl } from "@/lib/utils/og-image";

// ISR: Revalida a cada 2 minutos
export const revalidate = 120;

interface NewsArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Função para gerar metadados dinâmicos (Open Graph, Twitter Cards)
export async function generateMetadata({ params }: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);

  if (!news) {
    return {
      title: "Notícia não encontrada | Portal Norte 43",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://portalnorte43.com.br";
  const articleUrl = `${siteUrl}/${slug}`;
  
  // Normaliza a URL da imagem para garantir que seja absoluta e acessível
  const imageUrl = normalizeImageUrl(news.image, siteUrl);

  return {
    title: `${news.title} | Portal Norte 43`,
    description: news.summary,
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: news.title,
      description: news.summary,
      url: articleUrl,
      siteName: "Portal Norte 43",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: news.title,
          type: 'image/jpeg',
        },
      ],
      locale: "pt_BR",
      type: "article",
      publishedTime: news.publishedAt,
      authors: [news.source],
      section: news.category,
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description: news.summary,
      images: [imageUrl],
    },
    alternates: {
      canonical: articleUrl,
    },
    // Meta tags adicionais para garantir compatibilidade total (Telegram, WhatsApp, etc)
    other: {
      'og:image:secure_url': imageUrl,
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': news.title,
      'article:published_time': news.publishedAt,
      'article:author': news.source,
      'article:section': news.category,
      'twitter:image:src': imageUrl,
    },
  };
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);

  if (!news) {
    notFound();
  }

  const sidebarAds = getAdsByPosition("sidebar");
  const relatedNews = await getRelatedNews(slug, news.category, news.city, 3);

  // Se não tiver conteúdo completo, usa o resumo
  const content = news.content || news.summary;

  // URL do site para compartilhamento
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://portalnorte43.com.br";
  const articleUrl = `${siteUrl}/${slug}`;

  // Normaliza a URL da imagem para garantir que seja absoluta e acessível
  const imageUrl = normalizeImageUrl(news.image, siteUrl);

  return (
    <>
      {/* Schema.org JSON-LD para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: news.title,
            description: news.summary,
            image: imageUrl,
            datePublished: news.publishedAt,
            dateModified: news.publishedAt,
            author: {
              '@type': 'Organization',
              name: news.source,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Portal Norte 43',
              logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/logo.png`,
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': articleUrl,
            },
            articleSection: news.category,
          }),
        }}
      />

      <div className="mx-auto w-full max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-4 sm:mb-6 text-xs sm:text-sm text-slate-600 overflow-x-auto">
        <Link href="/" className="hover:text-red-600 transition-colors">
          Início
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/?category=${news.category}`} className="hover:text-red-600 transition-colors">
          {news.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900 font-medium">{news.title}</span>
      </nav>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Artigo Principal */}
        <article className="space-y-4 sm:space-y-6 min-w-0">
          {/* Cabeçalho */}
          <header className="space-y-3 sm:space-y-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-600">
              <span className="inline-flex items-center rounded-full bg-red-600 px-2 py-1 text-xs font-bold uppercase tracking-wide text-white sm:px-3">
                {news.category}
              </span>
              <span className="break-words">{formatDateTimeBR(news.publishedAt)}</span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="font-semibold text-slate-700">{news.city}</span>
            </div>

            <h1 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl md:text-4xl lg:text-5xl">
              {news.title}
            </h1>

            {/* Subtítulo */}
            <h2 className="text-lg font-medium leading-relaxed text-slate-600 sm:text-xl">
              {news.summary}
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
              <span>Fonte: <strong>{news.source}</strong></span>
              <span className="text-slate-300">•</span>
              <span>Por: <strong>Redação Portal Norte 43</strong></span>
            </div>
          </header>

          {/* Imagem Principal */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-200">
            <Image
              src={news.image}
              alt={news.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          </div>

          {/* Conteúdo */}
          <div className="prose prose-slate max-w-none">
            <div className="text-lg leading-relaxed text-slate-700 whitespace-pre-line text-justify">
              {content}
            </div>
          </div>

          {/* Leia Também */}
          {relatedNews.length > 0 && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="mb-4 text-lg font-bold text-slate-900">Leia também</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedNews.map(item => (
                  <NewsCard key={item.id} news={item} variant="compact" />
                ))}
              </div>
            </div>
          )}

          {/* Compartilhar */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
            <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold uppercase tracking-wide text-slate-700">
              Compartilhar
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs sm:text-sm font-medium text-white transition hover:bg-blue-700"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(news.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-sky-500 px-3 py-2 text-xs sm:text-sm font-medium text-white transition hover:bg-sky-600"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                Twitter
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${news.title} - ${articleUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-xs sm:text-sm font-medium text-white transition hover:bg-green-700"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </a>
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(news.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-blue-500 px-3 py-2 text-xs sm:text-sm font-medium text-white transition hover:bg-blue-600"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                Telegram
              </a>
            </div>
          </div>

          {/* Voltar para notícias */}
          <div className="pt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
            >
              ← Voltar para notícias
            </Link>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col gap-6">
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-red-600" />
              <h2 className="text-lg font-bold text-slate-900">Publicidade</h2>
            </div>
            <div className="space-y-4">
              {sidebarAds.map(ad => (
                <AdSlot key={ad.id} ad={ad} label="Patrocinado" />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
    </>
  );
}

