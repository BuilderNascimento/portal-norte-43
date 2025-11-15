-- 🎯 SOLUÇÃO FINAL PARA O PROBLEMA DE LOGIN
-- Execute este SQL no Supabase SQL Editor (NESTA ORDEM)

-- ============================================
-- PASSO 1: CORRIGIR POLÍTICAS RLS
-- ============================================

-- Remover TODAS as políticas antigas
DROP POLICY IF EXISTS "Users can view own author data" ON authors;
DROP POLICY IF EXISTS "Only admins can manage authors" ON authors;
DROP POLICY IF EXISTS "Users can update own basic data" ON authors;
DROP POLICY IF EXISTS "Anyone can view authors for authentication" ON authors;

-- Criar política PERMISSIVA para leitura (necessária para login)
-- Durante o login, o código precisa ler a tabela authors para verificar permissões
CREATE POLICY "Allow read for authentication"
ON authors
FOR SELECT
USING (true);  -- Permite leitura para todos (necessário para login funcionar)

-- Política para admins gerenciarem autores
CREATE POLICY "Only admins can manage authors"
ON authors
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM authors a
    WHERE a.auth_user_id = auth.uid()
    AND a.role = 'admin'
    AND a.is_active = true
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM authors a
    WHERE a.auth_user_id = auth.uid()
    AND a.role = 'admin'
    AND a.is_active = true
  )
);

-- ============================================
-- PASSO 2: GARANTIR QUE O USUÁRIO EXISTE E ESTÁ CONFIGURADO
-- ============================================

-- Confirmar email do usuário
UPDATE auth.users
SET 
  email_confirmed_at = COALESCE(email_confirmed_at, NOW()),
  updated_at = NOW()
WHERE email = 'nego2022fr@gmail.com';

-- Garantir que existe autor e está conectado corretamente
INSERT INTO authors (
  name,
  email,
  role,
  auth_user_id,
  is_active,
  can_create,
  can_edit,
  can_delete,
  can_review,
  can_manage_users,
  allowed_categories,
  allowed_cities
)
SELECT 
  COALESCE((SELECT name FROM authors WHERE email = 'nego2022fr@gmail.com'), 'Administrador'),
  'nego2022fr@gmail.com',
  'admin',
  u.id,
  true,
  true,
  true,
  true,
  true,
  true,
  ARRAY[]::TEXT[],
  ARRAY[]::TEXT[]
FROM auth.users u
WHERE u.email = 'nego2022fr@gmail.com'
  AND NOT EXISTS (
    SELECT 1 FROM authors a WHERE a.email = 'nego2022fr@gmail.com'
  )
ON CONFLICT (email) DO UPDATE
SET
  auth_user_id = (SELECT id FROM auth.users WHERE email = 'nego2022fr@gmail.com'),
  role = 'admin',
  is_active = true,
  can_create = true,
  can_edit = true,
  can_delete = true,
  can_review = true,
  can_manage_users = true,
  updated_at = NOW();

-- Conectar auth_user_id se ainda não estiver conectado
UPDATE authors
SET 
  auth_user_id = (SELECT id FROM auth.users WHERE email = 'nego2022fr@gmail.com'),
  is_active = true,
  role = 'admin',
  can_create = true,
  can_edit = true,
  can_delete = true,
  can_review = true,
  can_manage_users = true,
  updated_at = NOW()
WHERE email = 'nego2022fr@gmail.com'
  AND (auth_user_id IS NULL OR auth_user_id != (SELECT id FROM auth.users WHERE email = 'nego2022fr@gmail.com'));

-- ============================================
-- PASSO 3: VERIFICAÇÃO FINAL
-- ============================================

SELECT 
  '✅ VERIFICAÇÃO FINAL' as status,
  u.id as auth_user_id,
  u.email as auth_email,
  u.email_confirmed_at IS NOT NULL as email_confirmado,
  a.id as author_id,
  a.email as author_email,
  a.auth_user_id,
  a.auth_user_id = u.id as ids_conectados,
  a.is_active,
  a.role,
  a.can_create,
  a.can_edit,
  a.can_delete,
  a.can_review,
  a.can_manage_users
FROM auth.users u
LEFT JOIN authors a ON a.auth_user_id = u.id
WHERE u.email = 'nego2022fr@gmail.com';

-- Verificar políticas RLS
SELECT 
  policyname,
  cmd,
  CASE 
    WHEN qual LIKE '%true%' THEN '✅ Permissiva'
    ELSE '⚠️ Restritiva'
  END as tipo
FROM pg_policies
WHERE tablename = 'authors'
ORDER BY policyname;

