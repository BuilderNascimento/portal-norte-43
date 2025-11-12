'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import type { NewsItem } from '@/lib/mock-data';

interface NewsTickerProps {
  news: NewsItem[];
}

export function NewsTicker({ news }: NewsTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Rotaciona as notícias a cada 5 segundos
  useEffect(() => {
    if (news.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [news.length]);

  if (news.length === 0) return null;

  const currentNews = news[currentIndex];

  return (
    <div className="flex items-center gap-3 overflow-hidden bg-red-600 dark:bg-red-700 px-4 py-2 text-white">
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
        <span className="text-xs font-bold uppercase tracking-wide">Últimas</span>
      </div>
      <Link
        href={`/${currentNews.slug}`}
        className="flex-1 truncate text-xs font-medium hover:underline transition-all"
      >
        {currentNews.title}
      </Link>
      {news.length > 1 && (
        <div className="flex items-center gap-1 flex-shrink-0 text-xs text-white/70">
          {news.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 w-1.5 rounded-full transition-all ${
                index === currentIndex ? 'bg-white' : 'bg-white/40'
              }`}
              aria-label={`Ver notícia ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

