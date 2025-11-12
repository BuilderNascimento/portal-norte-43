import Link from "next/link";

import type { NewsItem } from "@/lib/mock-data";

interface AdminReviewTableProps {
  items: NewsItem[];
}

export function AdminReviewTable({ items }: AdminReviewTableProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50 px-6 py-10 text-center text-emerald-700">
        Nenhuma matéria pendente. Bom trabalho!
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <th scope="col" className="px-4 py-3">Título</th>
            <th scope="col" className="hidden px-4 py-3 md:table-cell">Cidade</th>
            <th scope="col" className="hidden px-4 py-3 md:table-cell">Categoria</th>
            <th scope="col" className="hidden px-4 py-3 lg:table-cell">Enviado em</th>
            <th scope="col" className="px-4 py-3 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
          {items.map(item => (
            <tr key={item.id} className="hover:bg-slate-50/80">
              <td className="max-w-[280px] px-4 py-4 font-medium text-slate-900">
                <p className="line-clamp-2">{item.title}</p>
                <span className="mt-1 block text-xs uppercase text-slate-400">
                  #{item.slug}
                </span>
              </td>
              <td className="hidden px-4 py-4 md:table-cell">{item.city}</td>
              <td className="hidden px-4 py-4 md:table-cell">{item.category}</td>
              <td className="hidden px-4 py-4 text-xs text-slate-500 lg:table-cell">
                {new Date(item.publishedAt).toLocaleString("pt-BR")}
              </td>
              <td className="px-4 py-4">
                <div className="flex flex-col items-end gap-2 sm:flex-row sm:gap-3 sm:justify-end">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-emerald-700"
                  >
                    Aprovar
                  </button>
                  <Link
                    href={`/admin/articles/${item.slug}`}
                    className="inline-flex items-center rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:border-slate-900 hover:text-slate-900"
                  >
                    Editar
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

