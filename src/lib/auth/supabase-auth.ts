/**
 * Funções de autenticação usando Supabase Auth
 */

import { supabase } from '@/lib/supabase/client';
import type { Author, UserPermissions } from './types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role?: 'admin' | 'collaborator';
}

/**
 * Faz login do usuário
 */
export async function login(credentials: LoginCredentials) {
  try {
    console.log('[Auth] Tentando fazer login com:', credentials.email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      console.error('[Auth] Erro no login:', error);
      throw new Error(error.message);
    }

    if (!data.user) {
      console.error('[Auth] Usuário não retornado');
      throw new Error('Usuário não encontrado');
    }

    console.log('[Auth] Login bem-sucedido, user ID:', data.user.id);

    // Buscar dados do autor
    const author = await getAuthorByAuthUserId(data.user.id);
    
    if (!author) {
      console.error('[Auth] Autor não encontrado para user ID:', data.user.id);
      throw new Error('Autor não encontrado. Verifique se o usuário está configurado corretamente.');
    }

    if (!author.is_active) {
      console.error('[Auth] Autor está inativo');
      throw new Error('Sua conta está inativa. Entre em contato com o administrador.');
    }

    console.log('[Auth] Autor encontrado:', author.email, 'Role:', author.role);
    
    return {
      user: data.user,
      author,
      session: data.session,
    };
  } catch (error: any) {
    console.error('[Auth] Erro completo no login:', error);
    throw error;
  }
}

/**
 * Faz logout do usuário
 */
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

/**
 * Registra novo usuário (apenas admins via API)
 * Nota: Esta função deve ser chamada do servidor usando supabaseAdmin
 */
export async function registerUser(data: RegisterData) {
  // Esta função será implementada no endpoint da API
  // pois precisa usar service_role para criar usuários
  throw new Error('Use o endpoint /api/admin/users para criar usuários');
}

/**
 * Obtém usuário atual
 */
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('[Auth] Erro ao obter usuário:', error);
      return null;
    }
    
    if (!user) {
      return null;
    }

    const author = await getAuthorByAuthUserId(user.id);
    
    return {
      user,
      author,
    };
  } catch (error) {
    console.error('[Auth] Erro ao obter usuário atual:', error);
    return null;
  }
}

/**
 * Busca autor por auth_user_id
 */
export async function getAuthorByAuthUserId(authUserId: string): Promise<Author | null> {
  try {
    const { data, error } = await supabase
      .from('authors')
      .select('*')
      .eq('auth_user_id', authUserId)
      .eq('is_active', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Não encontrado
        console.warn('[Auth] Autor não encontrado para auth_user_id:', authUserId);
        return null;
      }
      console.error('[Auth] Erro ao buscar autor:', error);
      return null;
    }

    if (!data) {
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
  } catch (error) {
    console.error('[Auth] Erro ao buscar autor:', error);
    return null;
  }
}

/**
 * Verifica se usuário tem permissão
 */
export function hasPermission(
  author: Author | null,
  permission: keyof UserPermissions
): boolean {
  if (!author || !author.is_active) {
    return false;
  }

  // Admin tem todas as permissões
  if (author.role === 'admin') {
    return true;
  }

  return author.permissions[permission] ?? false;
}

/**
 * Verifica se usuário pode acessar categoria
 */
export function canAccessCategory(author: Author | null, category: string): boolean {
  if (!author || !author.is_active) {
    return false;
  }

  // Admin pode acessar tudo
  if (author.role === 'admin') {
    return true;
  }

  // Se não há restrições, pode acessar
  if (!author.allowed_categories || author.allowed_categories.length === 0) {
    return true;
  }

  // Verificar se categoria está na lista permitida
  return author.allowed_categories.includes(category);
}

/**
 * Verifica se usuário pode acessar cidade
 */
export function canAccessCity(author: Author | null, city: string): boolean {
  if (!author || !author.is_active) {
    return false;
  }

  // Admin pode acessar tudo
  if (author.role === 'admin') {
    return true;
  }

  // Se não há restrições, pode acessar
  if (!author.allowed_cities || author.allowed_cities.length === 0) {
    return true;
  }

  // Verificar se cidade está na lista permitida
  return author.allowed_cities.includes(city);
}
