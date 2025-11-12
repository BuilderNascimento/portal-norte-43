'use client';

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { newsFilterSchema } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

type FilterPayload = z.infer<typeof newsFilterSchema>;

interface FiltersBarProps {
  cities: string[];
  categories: string[];
  defaultValues?: FilterPayload;
  className?: string;
  onFilterChange: (filters: FilterPayload) => void;
}

export function FiltersBar({
  cities,
  categories,
  defaultValues,
  className,
  onFilterChange,
}: FiltersBarProps) {
  const { register, control, reset } = useForm<FilterPayload>({
    resolver: zodResolver(newsFilterSchema),
    defaultValues: {
      city: defaultValues?.city ?? "",
      category: defaultValues?.category ?? "",
    },
  });

  const { city: watchedCity, category: watchedCategory } = useWatch({
    control,
  });

  useEffect(() => {
    onFilterChange({
      city: watchedCity || undefined,
      category: watchedCategory || undefined,
    });
  }, [watchedCity, watchedCategory, onFilterChange]);

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm",
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="city" className="text-xs font-semibold uppercase text-slate-500">
          Cidade
        </label>
        <select
          id="city"
          {...register("city")}
          className="min-w-[160px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-900 focus:outline-none"
        >
          <option value="">Todas</option>
          {cities.map(city => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xs font-semibold uppercase text-slate-500">
          Categoria
        </label>
        <select
          id="category"
          {...register("category")}
          className="min-w-[160px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-900 focus:outline-none"
        >
          <option value="">Todas</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={() => reset()}
        className="ml-auto inline-flex items-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-900 hover:text-slate-900"
      >
        Limpar filtros
      </button>
    </div>
  );
}

