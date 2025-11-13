import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeaderWithTicker } from "@/components/layout/site-header-with-ticker";
import { GoogleAnalyticsComponent } from "@/components/features/analytics/google-analytics";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://portalnorte43.com.br';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Portal Norte 43",
  description:
    "Notícias automatizadas do Norte Pioneiro com foco em anunciantes e leitores locais.",
  openGraph: {
    title: "Portal Norte 43",
    description: "Notícias automatizadas do Norte Pioneiro do Paraná",
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Portal Norte 43",
    images: [
      {
        url: `${siteUrl}/images/og-default.jpg`, // Imagem padrão para homepage
        width: 1200,
        height: 630,
        alt: "Portal Norte 43",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portal Norte 43",
    description: "Notícias automatizadas do Norte Pioneiro do Paraná",
    images: [`${siteUrl}/images/og-default.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Meta tags básicas para melhor compatibilidade */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#dc2626" />
        <link rel="canonical" href={siteUrl} />
      </head>
      <body className={`${inter.className} bg-white antialiased`}>
        <div className="flex min-h-screen flex-col">
          <SiteHeaderWithTicker />
          <main className="flex-1 bg-slate-50">
            <div className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-4 sm:py-8 lg:px-6">
              {children}
            </div>
          </main>
          <SiteFooter />
        </div>
        <GoogleAnalyticsComponent />
      </body>
    </html>
  );
}
