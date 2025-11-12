/**
 * Sistema de cache em memória para feeds RSS
 * Evita buscar os mesmos feeds múltiplas vezes em um curto período
 */

interface CacheEntry {
  data: any[];
  timestamp: number;
  expiresAt: number;
}

// Cache em memória (Mapa: URL do feed -> CacheEntry)
const cache = new Map<string, CacheEntry>();

// Tempo de cache: 5 minutos (300000ms)
const CACHE_TTL = 5 * 60 * 1000;

/**
 * Obtém dados do cache se ainda válidos
 */
export function getCachedFeed(url: string): any[] | null {
  const entry = cache.get(url);
  
  if (!entry) {
    return null;
  }
  
  // Verifica se o cache expirou
  if (Date.now() > entry.expiresAt) {
    cache.delete(url);
    return null;
  }
  
  return entry.data;
}

/**
 * Armazena dados no cache
 */
export function setCachedFeed(url: string, data: any[]): void {
  const now = Date.now();
  cache.set(url, {
    data,
    timestamp: now,
    expiresAt: now + CACHE_TTL,
  });
}

/**
 * Limpa o cache (útil para testes ou quando necessário)
 */
export function clearCache(): void {
  cache.clear();
}

/**
 * Remove entradas expiradas do cache (limpeza automática)
 */
export function cleanExpiredCache(): void {
  const now = Date.now();
  for (const [url, entry] of cache.entries()) {
    if (now > entry.expiresAt) {
      cache.delete(url);
    }
  }
}

// Limpa cache expirado automaticamente na próxima busca
// (evita usar setInterval em ambiente server-side do Next.js)

