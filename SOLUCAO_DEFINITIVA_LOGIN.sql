-- ============================================
-- SOLUÇÃO DEFINITIVA PARA LOGIN
-- Execute este SQL COMPLETO no Supabase
-- ============================================

-- PASSO 1: Verificar se usuário existe no auth.users
SELECT '=== PASSO 1: Verificando usuário no auth.users ===' as etapa;
SELECT 
  id,
  email,
  email_confirmed_at,
  created_at
FROM auth.users
WHERE email = 'nego2022fr@gmail.com';

-- PASSO 2: Se o resultado acima estiver VAZIO, você precisa criar o usuário via interface:
-- Vá em: Authentication → Users → Add user → Create new user
-- Email: nego2022fr@gmail.com
-- Password: (defina uma senha - ANOTE ELA!)
-- Auto Confirm User: ✅ MARQUE ESTA OPÇÃO
-- Depois volte aqui e continue

-- PASSO 3: Conectar auth_user_id (execute mesmo se já estiver conectado)
UPDATE authors
SET 
  auth_user_id = (
    SELECT id FROM auth.users WHERE email = 'nego2022fr@gmail.com'
  )
WHERE email = 'nego2022fr@gmail.com';

-- PASSO 4: Garantir que email está confirmado
UPDATE auth.users
SET 
  email_confirmed_at = COALESCE(email_confirmed_at, NOW())
WHERE email = 'nego2022fr@gmail.com';

-- PASSO 5: Garantir que autor está como admin e ativo
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

-- PASSO 6: Verificação final completa
SELECT '=== VERIFICAÇÃO FINAL ===' as etapa;
SELECT 
  u.id as auth_user_id,
  u.email as auth_email,
  u.email_confirmed_at IS NOT NULL as email_confirmado,
  a.id as author_id,
  a.email as author_email,
  a.role,
  a.auth_user_id = u.id as ids_conectados,
  a.is_active as autor_ativo,
  a.can_create,
  a.can_edit,
  a.can_delete,
  a.can_review,
  a.can_manage_users,
  CASE 
    WHEN u.id IS NULL THEN '❌ ERRO CRÍTICO: Usuário não existe no auth.users - CRIE AGORA!'
    WHEN a.id IS NULL THEN '❌ ERRO: Autor não existe'
    WHEN a.auth_user_id IS NULL THEN '❌ ERRO: auth_user_id não conectado'
    WHEN a.auth_user_id != u.id THEN '❌ ERRO: auth_user_id errado'
    WHEN u.email_confirmed_at IS NULL THEN '❌ ERRO: Email não confirmado'
    WHEN a.is_active = false THEN '❌ ERRO: Autor inativo'
    WHEN a.role != 'admin' THEN '❌ ERRO: Não é admin'
    ELSE '✅ TUDO CORRETO! Pode fazer login!'
  END as status_final
FROM auth.users u
LEFT JOIN authors a ON a.auth_user_id = u.id
WHERE u.email = 'nego2022fr@gmail.com';

