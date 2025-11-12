import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portal Norte 43",
  description:
    "Notícias automatizadas do Norte Pioneiro com foco em anunciantes e leitores locais.",
  openGraph: {
    title: "Portal Norte 43",
    description: "Notícias automatizadas do Norte Pioneiro do Paraná",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portal Norte 43",
    description: "Notícias automatizadas do Norte Pioneiro do Paraná",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-white antialiased`}>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1 bg-slate-50">
            <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
