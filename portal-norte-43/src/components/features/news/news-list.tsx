import { memo } from "react";

import type { NewsItem } from "@/lib/mock-data";

import { NewsCard } from "./news-card";

interface NewsListProps {
  items: NewsItem[];
  emptyMessage?: string;
}

function NewsListComponent({ items, emptyMessage = "Nenhuma notícia encontrada." }: NewsListProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-slate-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {items.map(item => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>
  );
}

export const NewsList = memo(NewsListComponent);

