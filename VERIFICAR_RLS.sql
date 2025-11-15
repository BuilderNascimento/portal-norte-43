-- 🔍 VERIFICAR POLÍTICAS RLS (Row Level Security)
-- Execute este SQL no Supabase SQL Editor

-- Ver todas as políticas da tabela authors
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'authors'
ORDER BY policyname;

-- Verificar se RLS está habilitado
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public' 
  AND tablename = 'authors';

-- Testar se o usuário atual pode ler a tabela authors
-- (Execute isso enquanto estiver logado como o usuário)
SELECT 
  auth.uid() as current_user_id,
  (SELECT email FROM auth.users WHERE id = auth.uid()) as current_user_email;

-- Verificar se há algum autor com o email
SELECT 
  id,
  name,
  email,
  auth_user_id,
  role,
  is_active
FROM authors
WHERE email = 'nego2022fr@gmail.com';

