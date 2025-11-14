/**
 * Tipos para sistema de autenticação e permissões
 */

export type UserRole = 'admin' | 'collaborator';

export interface UserPermissions {
  can_create: boolean;
  can_edit: boolean;
  can_delete: boolean;
  can_review: boolean;
  can_manage_users: boolean;
  allowed_categories?: string[];
  allowed_cities?: string[];
}

export interface Author {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  auth_user_id: string | null;
  permissions: UserPermissions;
  allowed_categories: string[];
  allowed_cities: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthUser {
  id: string;
  email: string;
  author: Author | null;
}

