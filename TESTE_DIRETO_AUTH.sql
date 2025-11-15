-- 🔍 TESTE DIRETO - VERIFICAR SE O PROBLEMA É NO BANCO
-- Execute este SQL no Supabase SQL Editor

-- 1. Verificar se o usuário pode fazer login no Supabase Auth
SELECT 
  id,
  email,
  email_confirmed_at IS NOT NULL as email_confirmado,
  encrypted_password IS NOT NULL as tem_senha,
  created_at
FROM auth.users
WHERE email = 'nego2022fr@gmail.com';

-- 2. Verificar se o autor existe e está ativo
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

-- 3. Verificar se auth_user_id está conectado
SELECT 
  u.id as auth_id,
  u.email as auth_email,
  a.id as author_id,
  a.email as author_email,
  a.auth_user_id,
  a.auth_user_id = u.id as conectado,
  a.is_active,
  a.role
FROM auth.users u
LEFT JOIN authors a ON a.auth_user_id = u.id OR a.email = u.email
WHERE u.email = 'nego2022fr@gmail.com';

-- 4. TESTE: Tentar buscar autor como o código faz
-- Simular a query que o código faz
SELECT *
FROM authors
WHERE email = 'nego2022fr@gmail.com'
  AND is_active = true;

-- 5. Verificar se RLS está bloqueando
-- Esta query deve retornar o autor mesmo sem estar logado
SELECT 
  'Teste RLS' as teste,
  COUNT(*) as total_autores_encontrados
FROM authors
WHERE email = 'nego2022fr@gmail.com';

