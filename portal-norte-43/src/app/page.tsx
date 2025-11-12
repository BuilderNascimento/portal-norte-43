import Image from "next/image";
import Link from "next/link";

import { AdSlot } from "@/components/features/news/ad-slot";
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

// ISR: Revalida a cada 2 minutos (120 segundos)
export const revalidate = 120;

export default async function Home() {
  const [news, cities, categories] = await Promise.all([
    getAggregatedNews(),
    Promise.resolve(getAggregatedCities()),
    Promise.resolve(getAggregatedCategories()),
  ]);

  const featuredNews = news.slice(0, 1);
  const secondaryNews = news.slice(1, 4);
  const remainingNews = news.slice(4);

  const sidebarAds = getAdsByPosition("sidebar");
  const infeedAds = getAdsByPosition("infeed");
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
      {/* Banner Topo */}
      {topAds.length > 0 && (
        <div className="mx-auto max-w-5xl">
          {topAds.map(ad => (
            <a
              key={ad.id}
              href={ad.link}
              target="_blank"
              rel="noreferrer"
              className="block rounded-xl border border-dashed border-slate-300 bg-white p-2 shadow-sm transition hover:shadow-md"
            >
              <div className="relative h-24 w-full overflow-hidden rounded-lg bg-slate-100 sm:h-32">
                <Image
                  src={ad.image}
                  alt={ad.label}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 728px"
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
                <article className="relative overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-2xl">
                  <div className="relative aspect-[16/9] w-full bg-slate-200">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      priority
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-red-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
                      {item.category}
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                      <span className="text-sm font-medium text-white/90">
                        {formatDateOnlyBR(item.publishedAt)} • {item.city}
                      </span>
                      <h1 className="mt-3 text-2xl font-black leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
                        {item.title}
                      </h1>
                      <p className="mt-4 line-clamp-2 text-base text-white/95 sm:text-lg">
                        {item.summary}
                      </p>
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
              <span className="text-sm font-semibold text-slate-600">{remainingNews.length} matérias</span>
            </div>
            <NewsFeed news={remainingNews} cities={cities} categories={categories} infeedAds={infeedAds} />
          </div>
        </section>

        <aside className="hidden lg:flex flex-col gap-6">
          {/* Publicidade */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-red-600" />
              <h2 className="text-lg font-bold text-slate-900">Publicidade</h2>
            </div>
            <p className="mb-4 text-sm text-slate-600">
              Alcance leitores de Andirá, Bandeirantes, Cambará e toda a região.
            </p>
            <div className="space-y-4">
              {sidebarAds.map(ad => (
                <AdSlot key={ad.id} ad={ad} label="Patrocinado" />
              ))}
            </div>
          </div>

          {/* Contatos de Emergência */}
          <div className="rounded-xl border-2 border-red-600 bg-gradient-to-br from-red-50 to-white p-4 sm:p-6 shadow-sm dark:border-red-700 dark:from-red-950/30 dark:to-slate-900">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-red-600" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">📞 Emergências</h2>
            </div>
            <p className="mb-4 text-xs text-slate-600 dark:text-slate-400">
              Números importantes para situações de emergência.
            </p>
            <EmergencyContacts variant="vertical" />
          </div>

          {/* Boletim Diário */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-red-600" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Boletim Diário</h2>
            </div>
            <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
              Receba um resumo diário das principais notícias do Norte Pioneiro.
            </p>
            <NewsletterForm />
          </div>

          {/* CTA Colaboração */}
          <div id="enviar-noticia" className="rounded-xl border-2 border-red-100 bg-gradient-to-br from-red-50 to-white p-4 sm:p-6 shadow-sm dark:border-red-900/30 dark:from-red-950/20 dark:to-slate-900">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">📸 Envie sua notícia</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
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
