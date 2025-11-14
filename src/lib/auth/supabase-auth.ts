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
  const { data, error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error('Usuário não encontrado');
  }

  // Buscar dados do autor
  const author = await getAuthorByAuthUserId(data.user.id);
  
  return {
    user: data.user,
    author,
    session: data.session,
  };
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
 * Registra novo usuário (apenas admins)
 */
export async function registerUser(data: RegisterData) {
  // Criar usuário no Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true, // Auto-confirmar email
    user_metadata: {
      name: data.name,
      role: data.role || 'collaborator',
    },
  });

  if (authError) {
    throw new Error(authError.message);
  }

  if (!authData.user) {
    throw new Error('Erro ao criar usuário');
  }

  // O trigger handle_new_user() criará o autor automaticamente
  // Aguardar um pouco e buscar o autor criado
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const author = await getAuthorByAuthUserId(authData.user.id);
  
  return {
    user: authData.user,
    author,
  };
}

/**
 * Obtém usuário atual
 */
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    return null;
  }

  const author = await getAuthorByAuthUserId(user.id);
  
  return {
    user,
    author,
  };
}

/**
 * Busca autor por auth_user_id
 */
export async function getAuthorByAuthUserId(authUserId: string): Promise<Author | null> {
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

