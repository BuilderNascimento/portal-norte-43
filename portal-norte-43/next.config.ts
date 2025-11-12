import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Otimizações para produção
  compress: true,
  poweredByHeader: false,
  
  // Configurações de imagens
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.ebc.com.br',
      },
      {
        protocol: 'https',
        hostname: '**.gov.br',
      },
      {
        protocol: 'https',
        hostname: '**.mec.gov.br',
      },
      {
        protocol: 'https',
        hostname: 'portalnorte43.com.br',
      },
      {
        protocol: 'https',
        hostname: 'www.portalnorte43.com.br',
      },
      {
        protocol: 'https',
        hostname: '**.inmet.gov.br',
      },
    ],
    // Permite imagens não otimizadas para OG (necessário para alguns casos)
    unoptimized: false,
  },

  // Headers de segurança (complementam o middleware)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
        ],
      },
    ];
  },
};

export default nextConfig;
