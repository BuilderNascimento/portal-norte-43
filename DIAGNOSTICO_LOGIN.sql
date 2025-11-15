-- ============================================
-- DIAGNÓSTICO COMPLETO DO LOGIN
-- Execute este SQL no Supabase para ver o que está acontecendo
-- ============================================

-- 1. Verificar se usuário existe no auth.users
SELECT '=== 1. Usuário no auth.users ===' as etapa;
SELECT 
  id,
  email,
  email_confirmed_at,
  created_at,
  CASE 
    WHEN id IS NULL THEN '❌ USUÁRIO NÃO EXISTE'
    WHEN email_confirmed_at IS NULL THEN '⚠️ Email não confirmado'
    ELSE '✅ Usuário existe e email confirmado'
  END as status
FROM auth.users
WHERE email = 'nego2022fr@gmail.com';

-- 2. Verificar autor na tabela authors
SELECT '=== 2. Autor na tabela authors ===' as etapa;
SELECT 
  id,
  email,
  role,
  auth_user_id,
  is_active,
  CASE 
    WHEN id IS NULL THEN '❌ AUTOR NÃO EXISTE'
    WHEN auth_user_id IS NULL THEN '⚠️ auth_user_id não conectado'
    WHEN is_active = false THEN '⚠️ Autor está inativo'
    WHEN role != 'admin' THEN '⚠️ Não é admin'
    ELSE '✅ Autor OK'
  END as status
FROM authors
WHERE email = 'nego2022fr@gmail.com';

-- 3. Verificar conexão entre as duas tabelas
SELECT '=== 3. Conexão entre auth.users e authors ===' as etapa;
SELECT 
  u.id as auth_id,
  u.email as auth_email,
  u.email_confirmed_at,
  a.id as author_id,
  a.email as author_email,
  a.auth_user_id,
  a.role,
  a.is_active,
  CASE 
    WHEN u.id IS NULL THEN '❌ PROBLEMA: Usuário não existe no auth.users'
    WHEN a.id IS NULL THEN '❌ PROBLEMA: Autor não existe'
    WHEN a.auth_user_id IS NULL THEN '❌ PROBLEMA: auth_user_id é NULL'
    WHEN a.auth_user_id != u.id THEN '❌ PROBLEMA: auth_user_id não corresponde'
    WHEN u.email_confirmed_at IS NULL THEN '❌ PROBLEMA: Email não confirmado'
    WHEN a.is_active = false THEN '❌ PROBLEMA: Autor inativo'
    WHEN a.role != 'admin' THEN '❌ PROBLEMA: Não é admin'
    ELSE '✅ TUDO CONECTADO CORRETAMENTE!'
  END as diagnostico
FROM auth.users u
FULL OUTER JOIN authors a ON a.email = u.email
WHERE u.email = 'nego2022fr@gmail.com' OR a.email = 'nego2022fr@gmail.com';

