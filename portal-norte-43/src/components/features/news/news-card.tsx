import Image from "next/image";
import Link from "next/link";

import type { NewsItem } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { formatDateShortBR, formatDateOnlyBR } from "@/lib/utils/date";

interface NewsCardProps {
  news: NewsItem;
  className?: string;
  withBorder?: boolean;
  variant?: "default" | "compact";
}

export function NewsCard({ news, className, withBorder = true, variant = "default" }: NewsCardProps) {
  if (variant === "compact") {
    return (
      <Link href={`/${news.slug}`} className="group block">
        <article
          className={cn(
            "flex gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-red-200 hover:shadow-md",
            className,
          )}
        >
          <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-slate-200">
            <Image
              src={news.image}
              alt={news.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="112px"
            />
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-red-600">
              {news.category}
            </span>
            <h3 className="line-clamp-2 text-sm font-bold leading-snug text-slate-900 group-hover:text-red-600 transition-colors">
              {news.title}
            </h3>
            <span className="mt-auto text-xs text-slate-500">
              {formatDateShortBR(news.publishedAt)} • {news.city}
            </span>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/${news.slug}`} className="group block">
      <article
        className={cn(
          "flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-lg",
          withBorder && "border border-slate-200",
          className,
        )}
      >
        <div className="relative aspect-video w-full bg-slate-200">
          <Image
            src={news.image}
            alt={news.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
            {news.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span>{formatDateOnlyBR(news.publishedAt)}</span>
            <span className="text-slate-300">•</span>
            <span className="font-semibold text-slate-700">{news.city}</span>
          </div>
          <h3 className="text-lg font-bold leading-snug text-slate-900 group-hover:text-red-600 transition-colors">
            {news.title}
          </h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">{news.summary}</p>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-5 py-3 text-xs">
          <span className="font-medium text-slate-600">{news.source}</span>
          <span className="text-slate-400">Ler mais →</span>
        </div>
      </article>
    </Link>
  );
}

