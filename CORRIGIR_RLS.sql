-- 🔧 CORRIGIR POLÍTICAS RLS PARA PERMITIR LEITURA
-- Execute este SQL no Supabase SQL Editor

-- Remover políticas antigas que podem estar bloqueando
DROP POLICY IF EXISTS "Users can view own author data" ON authors;
DROP POLICY IF EXISTS "Only admins can manage authors" ON authors;
DROP POLICY IF EXISTS "Users can update own basic data" ON authors;

-- Política 1: Todos podem ler autores (necessário para o login funcionar)
-- O código precisa ler a tabela authors para verificar se o usuário tem permissão
CREATE POLICY "Anyone can view authors for authentication"
ON authors
FOR SELECT
USING (true);

-- Política 2: Apenas admins podem inserir/atualizar/deletar
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
);

-- Política 3: Usuários podem atualizar seus próprios dados básicos (não role/permissions)
CREATE POLICY "Users can update own basic data"
ON authors
FOR UPDATE
USING (auth_user_id = auth.uid())
WITH CHECK (
  auth_user_id = auth.uid()
  AND role = (SELECT role FROM authors WHERE auth_user_id = auth.uid())
  AND is_active = (SELECT is_active FROM authors WHERE auth_user_id = auth.uid())
);

-- Verificar se as políticas foram criadas
SELECT 
  policyname,
  cmd,
  qual
FROM pg_policies
WHERE tablename = 'authors'
ORDER BY policyname;

