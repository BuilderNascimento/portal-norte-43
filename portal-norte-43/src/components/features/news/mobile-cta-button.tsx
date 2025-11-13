'use client';

import Link from 'next/link';

export function MobileCTAButton() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white p-3 shadow-lg md:hidden">
      <Link
        href="/#enviar-noticia"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-red-700"
      >
        <span>📸</span>
        <span>Envie sua notícia</span>
      </Link>
    </div>
  );
}

