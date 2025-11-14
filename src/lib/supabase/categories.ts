/**
 * Funções para buscar categorias do Supabase
 */

import { supabase } from './client';
import type { Category } from './types';

/**
 * Busca todas as categorias
 */
export async function getAllCategories(): Promise<Category[]> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('[Supabase] Erro ao buscar categorias:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('[Supabase] Erro ao buscar categorias:', error);
    return [];
  }
}

/**
 * Busca uma categoria pelo slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug.toLowerCase())
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      console.error('[Supabase] Erro ao buscar categoria:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('[Supabase] Erro ao buscar categoria:', error);
    return null;
  }
}

