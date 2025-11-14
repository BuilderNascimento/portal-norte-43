/**
 * Funções para buscar cidades do Supabase
 */

import { supabase } from './client';
import type { City } from './types';

/**
 * Busca todas as cidades
 */
export async function getAllCities(): Promise<City[]> {
  try {
    const { data, error } = await supabase
      .from('cities')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('[Supabase] Erro ao buscar cidades:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('[Supabase] Erro ao buscar cidades:', error);
    return [];
  }
}

/**
 * Busca uma cidade pelo slug
 */
export async function getCityBySlug(slug: string): Promise<City | null> {
  try {
    const { data, error } = await supabase
      .from('cities')
      .select('*')
      .eq('slug', slug.toLowerCase())
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      console.error('[Supabase] Erro ao buscar cidade:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('[Supabase] Erro ao buscar cidade:', error);
    return null;
  }
}

