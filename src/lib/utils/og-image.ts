/**
 * Utilitários para normalizar URLs de imagens para Open Graph
 */

/**
 * Normaliza a URL da imagem para garantir que seja absoluta e acessível
 */
export function normalizeImageUrl(imagePath: string, siteUrl: string): string {
  let imageUrl = imagePath;

  // Se já é uma URL absoluta (http/https), retorna como está
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    imageUrl = imageUrl;
  }
  // Se começa com //, adiciona https:
  else if (imageUrl.startsWith('//')) {
    imageUrl = `https:${imageUrl}`;
  }
  // Se começa com /, adiciona o domínio
  else if (imageUrl.startsWith('/')) {
    imageUrl = `${siteUrl}${imageUrl}`;
  }
  // Se não começa com nada, assume que é relativo e adiciona / e o domínio
  else {
    imageUrl = `${siteUrl}/${imageUrl}`;
  }

  // Remove espaços e normaliza a URL (importante para WhatsApp/Facebook)
  imageUrl = imageUrl.replace(/\s/g, '%20');
  
  // Remove caracteres problemáticos
  imageUrl = imageUrl.replace(/[<>"']/g, '');

  return imageUrl;
}

/**
 * Valida se a URL da imagem é válida para Open Graph
 */
export function isValidOGImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    // Deve ser HTTPS
    if (parsed.protocol !== 'https:') {
      return false;
    }
    // Deve ter um hostname válido
    if (!parsed.hostname || parsed.hostname.length === 0) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

