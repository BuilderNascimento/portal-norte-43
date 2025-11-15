-- Script completo para corrigir login
-- Execute este SQL no Supabase

-- 1. Verificar se usuário existe no auth.users
SELECT 
  '=== VERIFICAÇÃO 1: Usuário no auth.users ===' as info;
  
SELECT 
  id,
  email,
  email_confirmed_at,
  created_at
FROM auth.users
WHERE email = 'nego2022fr@gmail.com';

-- 2. Verificar autor na tabela authors
SELECT 
  '=== VERIFICAÇÃO 2: Autor na tabela authors ===' as info;
  
SELECT 
  id,
  email,
  role,
  auth_user_id,
  can_create,
  can_edit,
  can_delete,
  can_review,
  can_manage_users,
  is_active
FROM authors
WHERE email = 'nego2022fr@gmail.com';

-- 3. Verificar conexão entre auth.users e authors
SELECT 
  '=== VERIFICAÇÃO 3: Conexão entre auth.users e authors ===' as info;
  
SELECT 
  u.id as auth_user_id,
  u.email as auth_email,
  u.email_confirmed_at,
  a.id as author_id,
  a.email as author_email,
  a.role,
  a.auth_user_id as author_auth_user_id,
  a.is_active,
  CASE 
    WHEN u.id IS NULL THEN '❌ Usuário NÃO existe no auth.users'
    WHEN a.id IS NULL THEN '❌ Autor NÃO existe na tabela authors'
    WHEN a.auth_user_id IS NULL THEN '❌ auth_user_id NÃO está conectado'
    WHEN a.auth_user_id != u.id THEN '❌ auth_user_id está ERRADO'
    WHEN u.email_confirmed_at IS NULL THEN '❌ Email NÃO confirmado'
    WHEN a.is_active = false THEN '❌ Autor está INATIVO'
    WHEN a.role != 'admin' THEN '❌ Role não é admin'
    ELSE '✅ TUDO OK!'
  END as status
FROM auth.users u
FULL OUTER JOIN authors a ON a.email = u.email
WHERE u.email = 'nego2022fr@gmail.com' OR a.email = 'nego2022fr@gmail.com';

-- 4. CORREÇÃO: Se usuário não existe, criar (SUBSTITUA 'SuaSenha123!' pela senha desejada)
-- Descomente e execute apenas se o usuário não existir no auth.users
/*
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'nego2022fr@gmail.com',
  crypt('SuaSenha123!', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Antonio","role":"admin"}',
  false
);
*/

-- 5. CORREÇÃO: Conectar auth_user_id
UPDATE authors
SET 
  auth_user_id = (
    SELECT id FROM auth.users WHERE email = 'nego2022fr@gmail.com'
  )
WHERE email = 'nego2022fr@gmail.com'
  AND auth_user_id IS NULL;

-- 6. CORREÇÃO: Garantir que email está confirmado
UPDATE auth.users
SET 
  email_confirmed_at = COALESCE(email_confirmed_at, NOW())
WHERE email = 'nego2022fr@gmail.com'
  AND email_confirmed_at IS NULL;

-- 7. CORREÇÃO: Garantir que autor está como admin e ativo
UPDATE authors
SET 
  role = 'admin',
  can_create = true,
  can_edit = true,
  can_delete = true,
  can_review = true,
  can_manage_users = true,
  is_active = true,
  allowed_categories = ARRAY[]::TEXT[],
  allowed_cities = ARRAY[]::TEXT[]
WHERE email = 'nego2022fr@gmail.com';

-- 8. VERIFICAÇÃO FINAL
SELECT 
  '=== VERIFICAÇÃO FINAL: Tudo conectado? ===' as info;
  
SELECT 
  u.email as auth_email,
  u.email_confirmed_at,
  a.email as author_email,
  a.role,
  a.auth_user_id = u.id as ids_conectados,
  a.is_active,
  CASE 
    WHEN u.id IS NULL THEN '❌ PROBLEMA: Usuário não existe no auth.users'
    WHEN a.id IS NULL THEN '❌ PROBLEMA: Autor não existe'
    WHEN a.auth_user_id IS NULL THEN '❌ PROBLEMA: auth_user_id não conectado'
    WHEN a.auth_user_id != u.id THEN '❌ PROBLEMA: auth_user_id errado'
    WHEN u.email_confirmed_at IS NULL THEN '❌ PROBLEMA: Email não confirmado'
    WHEN a.is_active = false THEN '❌ PROBLEMA: Autor inativo'
    WHEN a.role != 'admin' THEN '❌ PROBLEMA: Não é admin'
    ELSE '✅ TUDO CORRETO! Pode fazer login!'
  END as status_final
FROM auth.users u
LEFT JOIN authors a ON a.auth_user_id = u.id
WHERE u.email = 'nego2022fr@gmail.com';

