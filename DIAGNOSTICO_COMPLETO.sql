-- 🔍 DIAGNÓSTICO COMPLETO DO PROBLEMA DE LOGIN
-- Execute este SQL no Supabase SQL Editor

-- 1. Verificar se o usuário existe no auth.users
SELECT 
  id as auth_user_id,
  email,
  email_confirmed_at IS NOT NULL as email_confirmado,
  created_at
FROM auth.users
WHERE email = 'nego2022fr@gmail.com';

-- 2. Verificar se existe autor na tabela authors
SELECT 
  id,
  name,
  email,
  auth_user_id,
  role,
  is_active,
  can_create,
  can_edit,
  can_delete,
  can_review,
  can_manage_users
FROM authors
WHERE email = 'nego2022fr@gmail.com';

-- 3. Verificar se auth_user_id está conectado corretamente
SELECT 
  u.id as auth_user_id,
  u.email as auth_email,
  u.email_confirmed_at IS NOT NULL as email_confirmado,
  a.id as author_id,
  a.email as author_email,
  a.auth_user_id,
  a.auth_user_id = u.id as ids_conectados,
  a.is_active,
  a.role
FROM auth.users u
LEFT JOIN authors a ON a.email = u.email
WHERE u.email = 'nego2022fr@gmail.com';

-- 4. Verificar RLS (Row Level Security) - ver se há políticas bloqueando
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE tablename = 'authors';

