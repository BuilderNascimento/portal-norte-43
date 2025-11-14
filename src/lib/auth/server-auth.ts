/**
 * Funções de autenticação para uso no servidor (Server Components)
 */

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Author } from './types';

/**
 * Obtém usuário atual no servidor
 */
export async function getServerUser() {
  const cookieStore = await cookies();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    return null;
  }

  const author = await getAuthorByAuthUserId(supabase, user.id);
  
  return {
    user,
    author,
  };
}

/**
 * Busca autor por auth_user_id (server-side)
 */
async function getAuthorByAuthUserId(supabase: any, authUserId: string): Promise<Author | null> {
  const { data, error } = await supabase
    .from('authors')
    .select('*')
    .eq('auth_user_id', authUserId)
    .eq('is_active', true)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    name: data.name,
    email: data.email,
    role: data.role,
    auth_user_id: data.auth_user_id,
    permissions: {
      can_create: data.can_create ?? true,
      can_edit: data.can_edit ?? true,
      can_delete: data.can_delete ?? false,
      can_review: data.can_review ?? false,
      can_manage_users: data.can_manage_users ?? false,
      allowed_categories: data.allowed_categories || [],
      allowed_cities: data.allowed_cities || [],
    },
    allowed_categories: data.allowed_categories || [],
    allowed_cities: data.allowed_cities || [],
    is_active: data.is_active ?? true,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
}

