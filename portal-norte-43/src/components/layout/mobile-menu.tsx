'use client';

import Link from 'next/link';
import { useState } from 'react';

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

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 md:hidden"
        aria-label="Menu"
        aria-expanded={isOpen}
      >
        <svg
          className={`h-6 w-6 transition-transform ${isOpen ? 'rotate-90' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-xl md:hidden">
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 p-4">
                <span className="text-lg font-bold text-slate-900">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100"
                  aria-label="Fechar menu"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                  {NAV_LINKS.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block rounded-lg px-4 py-3 text-base font-medium text-slate-700 transition hover:bg-red-50 hover:text-red-600"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="mt-6 border-t border-slate-200 pt-6">
                  <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Categorias
                  </p>
                  <div className="space-y-1">
                    {CATEGORIES.map(cat => (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        onClick={() => setIsOpen(false)}
                        className="block rounded-lg px-4 py-2 text-sm text-slate-600 transition hover:bg-red-50 hover:text-red-600"
                      >
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>

              {/* Footer */}
              <div className="border-t border-slate-200 p-4">
                <Link
                  href="/admin/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full rounded-lg bg-red-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Área Admin
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

