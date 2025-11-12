import Image from "next/image";
import Link from "next/link";

import { AdSlot } from "@/components/features/news/ad-slot";
import { NewsCard } from "@/components/features/news/news-card";
import { NewsFeed } from "@/components/features/news/news-feed";
import {
  getAdsByPosition,
  getAvailableCategories,
  getAvailableCities,
  getPublishedNews,
} from "@/lib/mock-data";

export default async function Home() {
  const [news, cities, categories] = await Promise.all([
    getPublishedNews(),
    Promise.resolve(getAvailableCities()),
    Promise.resolve(getAvailableCategories()),
  ]);

  const featuredNews = news.slice(0, 1);
  const secondaryNews = news.slice(1, 4);
  const remainingNews = news.slice(4);

  const sidebarAds = getAdsByPosition("sidebar");
  const infeedAds = getAdsByPosition("infeed");

  return (
    <div className="space-y-8">
      {/* Featured Section - Destaque Principal */}
      {featuredNews.length > 0 && (
        <section className="grid gap-6 lg:grid-cols-3">
          {/* Notícia Principal */}
          <div className="lg:col-span-2">
            {featuredNews.map(item => (
              <Link key={item.id} href={`/${item.slug}`} className="group block">
                <article className="relative overflow-hidden rounded-xl bg-white shadow-lg transition-shadow hover:shadow-xl">
                  <div className="relative aspect-video w-full bg-slate-200">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      priority
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                      {item.category}
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <span className="text-xs font-medium text-white/90">
                        {new Date(item.publishedAt).toLocaleDateString("pt-BR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })} • {item.city}
                      </span>
                      <h1 className="mt-2 text-2xl font-bold leading-tight md:text-3xl lg:text-4xl">
                        {item.title}
                      </h1>
                      <p className="mt-3 line-clamp-2 text-sm text-white/90 md:text-base">
                        {item.summary}
                      </p>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Notícias Secundárias */}
          <div className="flex flex-col gap-4">
            {secondaryNews.map(item => (
              <Link key={item.id} href={`/${item.slug}`} className="group">
                <article className="flex gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-lg bg-slate-200">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="128px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <span className="text-xs font-semibold uppercase tracking-wide text-red-600">
                      {item.category}
                    </span>
                    <h3 className="line-clamp-2 text-sm font-bold leading-snug text-slate-900 group-hover:text-red-600 transition-colors">
                      {item.title}
                    </h3>
                    <span className="mt-auto text-xs text-slate-500">
                      {new Date(item.publishedAt).toLocaleDateString("pt-BR", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="flex flex-col gap-8">
          <div className="flex items-center justify-between border-b-2 border-red-600 pb-3">
            <h2 className="text-2xl font-bold text-slate-900">Últimas Notícias</h2>
            <span className="text-sm font-medium text-slate-600">{remainingNews.length} matérias</span>
          </div>

          <NewsFeed news={remainingNews} cities={cities} categories={categories} infeedAds={infeedAds} />
        </section>

        <aside className="flex flex-col gap-6">
          {/* Publicidade */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
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

          {/* CTA Colaboração */}
          <div className="rounded-xl border-2 border-red-100 bg-gradient-to-br from-red-50 to-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Envie sua notícia</h2>
            <p className="mt-2 text-sm text-slate-600">
              Correspondentes e colaboradores podem registrar ocorrências diretamente no painel.
            </p>
            <Link
              href="/admin/login"
              className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-red-700 hover:shadow-lg"
            >
              Acessar painel
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
