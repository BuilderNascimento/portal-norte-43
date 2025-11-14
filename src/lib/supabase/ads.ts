/**
 * Funções para buscar anúncios do Supabase
 */

import { supabase } from './client';
import type { Ad } from './types';

// Tipo compatível com o formato antigo
export interface AdBanner {
  id: string;
  image: string;
  link: string;
  position: 'header' | 'sidebar' | 'infeed' | 'top';
  label: string;
}

/**
 * Converte Ad do Supabase para AdBanner (formato antigo)
 */
function adToAdBanner(ad: Ad): AdBanner {
  return {
    id: ad.id,
    image: ad.image_url,
    link: ad.link,
    position: ad.position,
    label: ad.label,
  };
}

/**
 * Busca anúncios por posição
 */
export async function getAdsByPosition(position: 'header' | 'sidebar' | 'infeed' | 'top'): Promise<AdBanner[]> {
  try {
    const { data, error } = await supabase
      .from('ads')
      .select('*')
      .eq('position', position)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Supabase] Erro ao buscar anúncios:', error);
      return [];
    }

    return (data || []).map(adToAdBanner);
  } catch (error) {
    console.error('[Supabase] Erro ao buscar anúncios:', error);
    return [];
  }
}

/**
 * Busca todos os anúncios ativos
 */
export async function getAllActiveAds(): Promise<Ad[]> {
  try {
    const { data, error } = await supabase
      .from('ads')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Supabase] Erro ao buscar anúncios:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('[Supabase] Erro ao buscar anúncios:', error);
    return [];
  }
}

