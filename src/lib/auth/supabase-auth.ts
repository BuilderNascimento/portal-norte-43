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
    console.log('[Auth] ========== INÍCIO DO LOGIN ==========');
    console.log('[Auth] Email:', credentials.email);
    console.log('[Auth] Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...');
    console.log('[Auth] Supabase Key configurado:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    
    // PASSO 1: Tentar fazer login no Supabase Auth
    console.log('[Auth] PASSO 1: Tentando autenticar no Supabase Auth...');
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      console.error('[Auth] ❌ ERRO no Supabase Auth:', error);
      console.error('[Auth] Código do erro:', error.code);
      console.error('[Auth] Mensagem:', error.message);
      console.error('[Auth] Status:', error.status);
      throw new Error(error.message || 'Erro ao fazer login');
    }

    if (!data.user) {
      console.error('[Auth] ❌ Usuário não retornado pelo Supabase Auth');
      throw new Error('Usuário não encontrado');
    }

    console.log('[Auth] ✅ Login no Supabase Auth bem-sucedido!');
    console.log('[Auth] User ID:', data.user.id);
    console.log('[Auth] Email:', data.user.email);
    console.log('[Auth] Email confirmado:', !!data.user.email_confirmed_at);

    // PASSO 2: Buscar dados do autor
    console.log('[Auth] PASSO 2: Buscando autor na tabela authors...');
    console.log('[Auth] Buscando por auth_user_id:', data.user.id);
    
    const author = await getAuthorByAuthUserId(data.user.id);
    
    if (!author) {
      console.error('[Auth] ❌ Autor não encontrado!');
      console.error('[Auth] Tentando buscar por email como fallback...');
      
      // FALLBACK: Tentar buscar por email
      const { data: authorByEmail, error: emailError } = await supabase
        .from('authors')
        .select('*')
        .eq('email', data.user.email)
        .single();
      
      if (emailError) {
        console.error('[Auth] ❌ Erro ao buscar por email:', emailError);
      } else if (authorByEmail) {
        console.log('[Auth] ✅ Autor encontrado por email!');
        console.log('[Auth] Autor encontrado:', authorByEmail);
        console.log('[Auth] auth_user_id atual:', authorByEmail.auth_user_id);
        console.log('[Auth] is_active:', authorByEmail.is_active);
        
        // Tentar atualizar auth_user_id
        console.log('[Auth] Tentando atualizar auth_user_id...');
        const { error: updateError } = await supabase
          .from('authors')
          .update({ auth_user_id: data.user.id, is_active: true })
          .eq('id', authorByEmail.id);
        
        if (updateError) {
          console.error('[Auth] ❌ Erro ao atualizar auth_user_id:', updateError);
        } else {
          console.log('[Auth] ✅ auth_user_id atualizado! Tentando buscar novamente...');
          const authorRetry = await getAuthorByAuthUserId(data.user.id);
          if (authorRetry) {
            console.log('[Auth] ✅ Autor encontrado após atualização!');
            return {
              user: data.user,
              author: authorRetry,
              session: data.session,
            };
          }
        }
      }
      
      console.error('[Auth] ❌ FALHA TOTAL: Autor não encontrado nem por auth_user_id nem por email');
      console.error('[Auth] User ID:', data.user.id);
      console.error('[Auth] Email:', data.user.email);
      throw new Error('Credenciais inválidas ou usuário sem permissão.');
    }

    console.log('[Auth] ✅ Autor encontrado!');
    console.log('[Auth] Autor ID:', author.id);
    console.log('[Auth] Autor email:', author.email);
    console.log('[Auth] Autor role:', author.role);
    console.log('[Auth] Autor is_active:', author.is_active);

    if (!author.is_active) {
      console.error('[Auth] ❌ Autor está inativo');
      throw new Error('Sua conta está inativa. Entre em contato com o administrador.');
    }

    console.log('[Auth] ========== LOGIN BEM-SUCEDIDO ==========');
    
    return {
      user: data.user,
      author,
      session: data.session,
    };
  } catch (error: any) {
    console.error('[Auth] ========== ERRO NO LOGIN ==========');
    console.error('[Auth] Erro completo:', error);
    console.error('[Auth] Tipo do erro:', error?.constructor?.name);
    console.error('[Auth] Stack:', error?.stack);
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
    console.log('[Auth] getAuthorByAuthUserId - Buscando autor para auth_user_id:', authUserId);
    
    // Primeiro, tentar buscar por auth_user_id
    let { data, error } = await supabase
      .from('authors')
      .select('*')
      .eq('auth_user_id', authUserId)
      .single();

    console.log('[Auth] Query por auth_user_id - data:', data ? 'encontrado' : 'não encontrado');
    console.log('[Auth] Query por auth_user_id - error:', error);

    // Se não encontrar por auth_user_id, tentar buscar por email do usuário
    if (error && error.code === 'PGRST116') {
      console.warn('[Auth] Autor não encontrado por auth_user_id, tentando buscar por email...');
      
      // Buscar email do usuário no auth.users
      const { data: userData, error: userError } = await supabase.auth.getUser();
      console.log('[Auth] getUser - userData:', userData?.user?.email);
      console.log('[Auth] getUser - userError:', userError);
      
      if (userData?.user?.email) {
        const { data: authorData, error: authorError } = await supabase
          .from('authors')
          .select('*')
          .eq('email', userData.user.email)
          .single();
        
        console.log('[Auth] Query por email - authorData:', authorData ? 'encontrado' : 'não encontrado');
        console.log('[Auth] Query por email - authorError:', authorError);
        
        if (!authorError && authorData) {
          // Se encontrou por email, atualizar auth_user_id
          console.log('[Auth] Autor encontrado por email, atualizando auth_user_id...');
          const { error: updateError } = await supabase
            .from('authors')
            .update({ auth_user_id: authUserId, is_active: true })
            .eq('id', authorData.id);
          
          console.log('[Auth] Update auth_user_id - error:', updateError);
          
          if (!updateError) {
            data = { ...authorData, auth_user_id: authUserId, is_active: true };
            error = null;
          }
        }
      }
    }

    if (error) {
      if (error.code === 'PGRST116') {
        // Não encontrado
        console.error('[Auth] ❌ Autor não encontrado para auth_user_id:', authUserId);
        console.error('[Auth] ❌ Erro completo:', error);
        return null;
      }
      console.error('[Auth] ❌ Erro ao buscar autor:', error);
      console.error('[Auth] ❌ Código do erro:', error.code);
      console.error('[Auth] ❌ Mensagem do erro:', error.message);
      return null;
    }

    if (!data) {
      console.error('[Auth] ❌ Dados do autor não retornados');
      return null;
    }

    console.log('[Auth] ✅ Autor encontrado! ID:', data.id, 'Email:', data.email, 'is_active:', data.is_active);

    // Verificar se está ativo
    if (data.is_active === false) {
      console.error('[Auth] ❌ Autor está inativo');
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
