import Link from 'next/link';

import { cn } from '@/lib/utils';
import { NewsTicker } from '@/components/features/news/news-ticker';
import { ThemeToggle } from '@/components/features/ui/theme-toggle';
import { WeatherWidget } from '@/components/features/weather/weather-widget';
import { MobileMenu } from '@/components/layout/mobile-menu';
import { getAggregatedNews } from '@/lib/news-aggregator';

const NAV_LINKS = [
  { href: '/', label: 'Notícias' },
  { href: '/anuncie-conosco', label: 'Anuncie Conosco' },
  { href: '/sobre', label: 'Sobre' },
];

const CATEGORIES = [
  { href: '/?category=Política', label: 'Política' },
  { href: '/?category=Trânsito', label: 'Trânsito' },
  { href: '/?category=Policial', label: 'Policial' },
  { href: '/?category=Economia', label: 'Economia' },
  { href: '/?category=Esportes', label: 'Esportes' },
];

export async function SiteHeaderWithTicker() {
  // Busca as 5 notícias mais recentes para o ticker
  const allNews = await getAggregatedNews();
  const tickerNews = allNews.slice(0, 5);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-red-600 bg-white shadow-sm">
      {/* News Ticker */}
      {tickerNews.length > 0 && <NewsTicker news={tickerNews} />}

      {/* Top bar */}
      <div className="border-b border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-3 py-2 text-xs sm:px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <span className="font-medium text-slate-600 dark:text-slate-400">Norte Pioneiro do Paraná</span>
            <span className="hidden text-slate-400 sm:inline">•</span>
            <span className="hidden text-slate-500 sm:inline dark:text-slate-500">
              Última atualização: {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' })}
            </span>
            <span className="hidden text-slate-400 sm:inline">•</span>
            <WeatherWidget />
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between py-3 sm:py-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-red-600 to-red-700 text-white shadow-lg transition-transform group-hover:scale-105">
              <span className="text-xl font-bold">PN</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-tight text-slate-900 dark:text-slate-100">
                Portal Norte <span className="text-red-600">43</span>
              </span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Notícias do Norte Pioneiro
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <nav aria-label="Navegação principal" className="hidden items-center gap-8 text-sm font-semibold md:flex">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-slate-700 dark:text-slate-300 transition-colors hover:text-red-600"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <MobileMenu />
          </div>
        </div>

        {/* Categories bar */}
        <div className="border-t border-slate-100">
          <nav aria-label="Categorias" className="flex items-center gap-1 overflow-x-auto py-2 sm:py-3 px-3 sm:px-0 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.href}
                href={cat.href}
                  className="whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600"
              >
                {cat.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

