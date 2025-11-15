-- ============================================
-- CORREÇÃO COMPLETA DO LOGIN
-- Execute este SQL DEPOIS do diagnóstico
-- ============================================

-- PASSO 1: Se o usuário NÃO existe no auth.users, você precisa criá-lo via interface
-- Vá em: Authentication → Users → Add user → Create new user
-- Email: nego2022fr@gmail.com
-- Password: (defina uma senha)
-- Auto Confirm User: ✅ MARQUE

-- PASSO 2: Conectar auth_user_id (execute este SQL)
UPDATE authors
SET 
  auth_user_id = (
    SELECT id FROM auth.users WHERE email = 'nego2022fr@gmail.com'
  )
WHERE email = 'nego2022fr@gmail.com'
  AND (
    auth_user_id IS NULL 
    OR auth_user_id != (SELECT id FROM auth.users WHERE email = 'nego2022fr@gmail.com')
  );

-- PASSO 3: Confirmar email (se não estiver confirmado)
UPDATE auth.users
SET 
  email_confirmed_at = COALESCE(email_confirmed_at, NOW())
WHERE email = 'nego2022fr@gmail.com'
  AND email_confirmed_at IS NULL;

-- PASSO 4: Garantir que autor está como admin e ativo
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

-- PASSO 5: Verificação final
SELECT 
  '=== VERIFICAÇÃO FINAL ===' as etapa,
  u.email as auth_email,
  u.email_confirmed_at IS NOT NULL as email_confirmado,
  a.email as author_email,
  a.role = 'admin' as eh_admin,
  a.auth_user_id = u.id as ids_conectados,
  a.is_active as autor_ativo,
  CASE 
    WHEN u.id IS NULL THEN '❌ ERRO: Usuário não existe no auth.users - CRIE VIA INTERFACE!'
    WHEN a.id IS NULL THEN '❌ ERRO: Autor não existe'
    WHEN a.auth_user_id IS NULL THEN '❌ ERRO: auth_user_id não conectado'
    WHEN a.auth_user_id != u.id THEN '❌ ERRO: auth_user_id errado'
    WHEN u.email_confirmed_at IS NULL THEN '❌ ERRO: Email não confirmado'
    WHEN a.is_active = false THEN '❌ ERRO: Autor inativo'
    WHEN a.role != 'admin' THEN '❌ ERRO: Não é admin'
    ELSE '✅ TUDO CORRETO! Pode fazer login!'
  END as resultado
FROM auth.users u
LEFT JOIN authors a ON a.auth_user_id = u.id
WHERE u.email = 'nego2022fr@gmail.com';

