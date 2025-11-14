import Image from "next/image";
import Link from "next/link";

import { MobileCTAButton } from "@/components/features/news/mobile-cta-button";
import { NewsCard } from "@/components/features/news/news-card";
import { NewsFeed } from "@/components/features/news/news-feed";
import { QuickSubmitForm } from "@/components/features/news/quick-submit-form";
import { EmergencyContacts } from "@/components/features/info/emergency-contacts";
import { NewsletterForm } from "@/components/features/newsletter/newsletter-form";
import { getAdsByPosition } from "@/lib/mock-data";
import {
  getAggregatedCategories,
  getAggregatedCities,
  getAggregatedNews,
} from "@/lib/news-aggregator";
import { formatDateOnlyBR, formatDateShortBR } from "@/lib/utils/date";

// ISR: Revalida a cada 1 minuto (60 segundos) - para garantir que novas notícias apareçam rapidamente
export const revalidate = 60;

interface HomeProps {
  searchParams: Promise<{ category?: string; city?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const filters = {
    category: params.category || undefined,
    city: params.city || undefined,
  };

  const [news, cities, categories] = await Promise.all([
    getAggregatedNews(filters),
    Promise.resolve(getAggregatedCities()),
    Promise.resolve(getAggregatedCategories()),
  ]);

  // Se há filtro ativo, mostra mensagem se não houver notícias
  const hasActiveFilter = filters.category || filters.city;
  const filteredCategoryName = filters.category || '';
  const filteredCityName = filters.city || '';

  const featuredNews = news.slice(0, 1);
  const secondaryNews = news.slice(1, 4);
  const remainingNews = news.slice(4);

  // Apenas banner do topo - removendo outros anúncios por enquanto
  const topAds = getAdsByPosition("top");

  // Organizar notícias por categoria para seções
  const newsByCategory = remainingNews.reduce((acc, news) => {
    if (!acc[news.category]) {
      acc[news.category] = [];
    }
    acc[news.category].push(news);
    return acc;
  }, {} as Record<string, typeof remainingNews>);

  const categoryOrder = ['Policial', 'Trânsito', 'Política', 'Economia', 'Esportes', 'Geral'];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Mensagem quando há filtro mas não há notícias */}
      {hasActiveFilter && news.length === 0 && (
        <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <div className="mx-auto max-w-md">
            <div className="mb-4 text-6xl">📰</div>
            <h2 className="mb-2 text-2xl font-bold text-slate-900">
              Nenhuma notícia encontrada
            </h2>
            <p className="mb-6 text-slate-600">
              {filteredCategoryName && filteredCityName
                ? `Não há notícias de "${filteredCategoryName}" em "${filteredCityName}"`
                : filteredCategoryName
                  ? `Não há notícias na categoria "${filteredCategoryName}"`
                  : filteredCityName
                    ? `Não há notícias da cidade "${filteredCityName}"`
                    : 'Não há notícias disponíveis no momento.'}
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-red-700 hover:shadow-lg"
            >
              Ver todas as notícias →
            </Link>
          </div>
        </div>
      )}

      {/* Banner Topo */}
      {topAds.length > 0 && (
        <div className="mx-auto w-full max-w-5xl">
          {topAds.map(ad => (
            <a
              key={ad.id}
              href={ad.link}
              target={ad.link.startsWith('http') ? '_blank' : undefined}
              rel={ad.link.startsWith('http') ? 'noreferrer' : undefined}
              className="block w-full rounded-xl border border-dashed border-slate-300 bg-white p-0 shadow-sm transition hover:shadow-md"
            >
              <div className="relative h-auto w-full overflow-hidden rounded-lg">
                <Image
                  src={ad.image}
                  alt={ad.label}
                  width={728}
                  height={128}
                  className="h-auto w-full object-contain sm:object-cover"
                  sizes="100vw"
                  priority
                />
              </div>
            </a>
          ))}
        </div>
      )}
      {/* Featured Section - Destaque Principal */}
      {featuredNews.length > 0 && (
        <section className="grid gap-6 sm:gap-8 lg:grid-cols-3">
          {/* Notícia Principal */}
          <div className="lg:col-span-2">
            {featuredNews.map(item => (
              <Link key={item.id} href={`/${item.slug}`} className="group block">
                <article className="flex flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-2xl sm:flex-row">
                  {/* Imagem */}
                  <div className="relative h-64 w-full bg-slate-200 sm:h-auto sm:w-2/5">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      priority
                      sizes="(max-width: 640px) 100vw, 40vw"
                    />
                    <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-red-600 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-lg sm:left-4 sm:top-4 sm:px-3">
                      {item.category}
                    </span>
                  </div>
                  
                  {/* Conteúdo de Texto */}
                  <div className="flex flex-1 flex-col justify-between bg-white p-4 sm:p-6">
                    <div>
                      <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-600 sm:text-sm">
                        <span>{formatDateOnlyBR(item.publishedAt)}</span>
                        <span className="text-slate-300">•</span>
                        <span className="font-semibold text-slate-700">{item.city}</span>
                      </div>
                      <h1 className="mb-3 text-xl font-black leading-tight text-slate-900 group-hover:text-red-600 transition-colors sm:text-2xl md:text-3xl">
                        {item.title}
                      </h1>
                      <p className="line-clamp-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                        {item.summary}
                      </p>
                    </div>
                    <div className="mt-4 text-xs font-medium text-slate-500 sm:text-sm">
                      <span className="text-red-600">Ler mais →</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Notícias Secundárias */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {secondaryNews.map(item => (
              <Link key={item.id} href={`/${item.slug}`} className="group">
                <article className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-red-200 hover:shadow-lg">
                  <div className="relative h-24 w-32 sm:h-28 sm:w-36 flex-shrink-0 overflow-hidden rounded-lg bg-slate-200">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="144px"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-wide text-red-600">
                      {item.category}
                    </span>
                    <h3 className="line-clamp-3 text-sm font-bold leading-snug text-slate-900 group-hover:text-red-600 transition-colors">
                      {item.title}
                    </h3>
                    <span className="mt-auto text-xs font-medium text-slate-500">
                      {formatDateShortBR(item.publishedAt)}
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Main Content Grid */}
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="flex flex-col gap-6 sm:gap-8 min-w-0">
          {/* Seções por Categoria */}
          {categoryOrder.map(category => {
            const categoryNews = newsByCategory[category] || [];
            if (categoryNews.length === 0) return null;

            const categoryIcons: Record<string, string> = {
              'Policial': '🚓',
              'Trânsito': '🚗',
              'Política': '🏛️',
              'Economia': '💰',
              'Esportes': '⚽',
              'Geral': '📰',
            };

            return (
              <div key={category} className="space-y-6">
                <div className="flex items-center gap-3 border-b-2 border-red-600 pb-3">
                  <span className="text-3xl">{categoryIcons[category] || '📰'}</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{category}</h2>
                  <span className="ml-auto text-sm font-semibold text-slate-500">
                    {categoryNews.length} {categoryNews.length === 1 ? 'matéria' : 'matérias'}
                  </span>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {categoryNews.slice(0, 6).map(item => (
                    <NewsCard key={item.id} news={item} />
                  ))}
                </div>
                {categoryNews.length > 6 && (
                  <div className="text-center pt-2">
                    <Link
                      href={`/?category=${category}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-red-700 hover:shadow-lg"
                    >
                      Ver todas as notícias de {category} →
                    </Link>
                  </div>
                )}
              </div>
            );
          })}

          {/* Seção Últimas Notícias (todas) */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b-2 border-red-600 pb-3">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Todas as Notícias</h2>
              <span className="text-sm font-semibold text-slate-600">{news.length} matérias</span>
            </div>
            <NewsFeed news={news} cities={cities} categories={categories} />
          </div>
        </section>

        <aside className="hidden lg:flex flex-col gap-6">
          {/* Contatos de Emergência */}
          <div className="rounded-xl border-2 border-red-600 bg-gradient-to-br from-red-50 to-white p-4 sm:p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-red-600" />
              <h2 className="text-lg font-bold text-slate-900">📞 Emergências</h2>
            </div>
            <p className="mb-4 text-xs text-slate-600">
              Números importantes para situações de emergência.
            </p>
            <EmergencyContacts variant="vertical" />
          </div>

          {/* Boletim Diário */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-red-600" />
              <h2 className="text-lg font-bold text-slate-900">Boletim Diário</h2>
            </div>
            <p className="mb-4 text-sm text-slate-600">
              Receba um resumo diário das principais notícias do Norte Pioneiro.
            </p>
            <NewsletterForm />
          </div>

          {/* CTA Colaboração */}
          <div id="enviar-noticia" className="rounded-xl border-2 border-red-100 bg-gradient-to-br from-red-50 to-white p-4 sm:p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">📸 Envie sua notícia</h2>
            <p className="mt-2 text-sm text-slate-600">
              Envie flagrantes, fotos e informações — participe do Portal Norte 43!
            </p>
            <div className="mt-4">
              <QuickSubmitForm />
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile CTA Button Fixo */}
      <MobileCTAButton />
    </div>
  );
}
