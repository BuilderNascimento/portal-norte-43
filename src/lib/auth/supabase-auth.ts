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
      console.error('[Auth] Email do usuário:', data.user.email);
      console.error('[Auth] Verifique se existe um registro na tabela authors com:');
      console.error('[Auth]   - auth_user_id =', data.user.id);
      console.error('[Auth]   - OU email =', data.user.email);
      throw new Error('Autor não encontrado ou sem permissão. Verifique se o usuário está configurado corretamente no banco de dados.');
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
    // Primeiro, tentar buscar por auth_user_id
    let { data, error } = await supabase
      .from('authors')
      .select('*')
      .eq('auth_user_id', authUserId)
      .single();

    // Se não encontrar por auth_user_id, tentar buscar por email do usuário
    if (error && error.code === 'PGRST116') {
      console.warn('[Auth] Autor não encontrado por auth_user_id, tentando buscar por email...');
      
      // Buscar email do usuário no auth.users
      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user?.email) {
        const { data: authorData, error: authorError } = await supabase
          .from('authors')
          .select('*')
          .eq('email', userData.user.email)
          .single();
        
        if (!authorError && authorData) {
          // Se encontrou por email, atualizar auth_user_id
          console.log('[Auth] Autor encontrado por email, atualizando auth_user_id...');
          await supabase
            .from('authors')
            .update({ auth_user_id: authUserId, is_active: true })
            .eq('id', authorData.id);
          
          data = { ...authorData, auth_user_id: authUserId, is_active: true };
          error = null;
        }
      }
    }

    if (error) {
      if (error.code === 'PGRST116') {
        // Não encontrado
        console.error('[Auth] Autor não encontrado para auth_user_id:', authUserId);
        console.error('[Auth] Erro completo:', error);
        return null;
      }
      console.error('[Auth] Erro ao buscar autor:', error);
      return null;
    }

    if (!data) {
      console.error('[Auth] Dados do autor não retornados');
      return null;
    }

    // Verificar se está ativo
    if (data.is_active === false) {
      console.error('[Auth] Autor está inativo');
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
