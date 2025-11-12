'use client';

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

import type { AdBanner, NewsItem } from "@/lib/mock-data";
import { FiltersBar } from "./filters-bar";
import { NewsList } from "./news-list";

interface NewsFeedProps {
  news: NewsItem[];
  cities: string[];
  categories: string[];
  infeedAds?: AdBanner[];
}

export function NewsFeed({ news, cities, categories, infeedAds = [] }: NewsFeedProps) {
  const [selectedCity, setSelectedCity] = useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  const handleFilterChange = useCallback(
    (filters: { city?: string; category?: string }) => {
      setSelectedCity(filters.city);
      setSelectedCategory(filters.category);
    },
    [],
  );

  const filteredNews = useMemo(() => {
    return news.filter(item => {
      const cityMatch = selectedCity ? item.city === selectedCity : true;
      const categoryMatch = selectedCategory ? item.category === selectedCategory : true;
      return cityMatch && categoryMatch;
    });
  }, [news, selectedCategory, selectedCity]);

  return (
    <div className="flex flex-col gap-6">
      <FiltersBar
        cities={cities}
        categories={categories}
        onFilterChange={handleFilterChange}
      />

      <NewsList items={filteredNews} />

      {infeedAds.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {infeedAds.map(ad => (
            <a
              key={ad.id}
              href={ad.link}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center shadow-sm transition hover:border-slate-400 hover:shadow-md"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Patrocinado
              </span>
              <div className="relative mt-4 h-32 w-full">
                <Image
                  src={ad.image}
                  alt={ad.label}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

