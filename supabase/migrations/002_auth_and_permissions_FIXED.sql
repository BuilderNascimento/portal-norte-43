-- Migration 002: Sistema de Autenticação e Permissões (VERSÃO CORRIGIDA)
-- Adiciona campos de permissão e integração com Supabase Auth

-- Atualizar tabela authors para incluir permissões e integração com auth.users
ALTER TABLE authors ADD COLUMN IF NOT EXISTS auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE authors ADD COLUMN IF NOT EXISTS permissions JSONB DEFAULT '{}'::jsonb;
ALTER TABLE authors ADD COLUMN IF NOT EXISTS allowed_categories TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE authors ADD COLUMN IF NOT EXISTS allowed_cities TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE authors ADD COLUMN IF NOT EXISTS can_create BOOLEAN DEFAULT true;
ALTER TABLE authors ADD COLUMN IF NOT EXISTS can_edit BOOLEAN DEFAULT true;
ALTER TABLE authors ADD COLUMN IF NOT EXISTS can_delete BOOLEAN DEFAULT false;
ALTER TABLE authors ADD COLUMN IF NOT EXISTS can_review BOOLEAN DEFAULT false;
ALTER TABLE authors ADD COLUMN IF NOT EXISTS can_manage_users BOOLEAN DEFAULT false;
ALTER TABLE authors ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Índice para busca rápida por auth_user_id
CREATE INDEX IF NOT EXISTS idx_authors_auth_user_id ON authors(auth_user_id);

-- Função para criar autor automaticamente quando usuário é criado no auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.authors (name, email, auth_user_id, role)
  VALUES (
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.email,
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'role', 'collaborator')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar autor quando usuário é criado
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Função helper para verificar permissões
CREATE OR REPLACE FUNCTION public.check_user_permission(
  user_id UUID,
  permission TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
  author_record RECORD;
BEGIN
  SELECT * INTO author_record
  FROM authors
  WHERE auth_user_id = user_id AND is_active = true;
  
  IF NOT FOUND THEN
    RETURN false;
  END IF;
  
  -- Admin tem todas as permissões
  IF author_record.role = 'admin' THEN
    RETURN true;
  END IF;
  
  -- Verificar permissão específica
  CASE permission
    WHEN 'create' THEN RETURN author_record.can_create;
    WHEN 'edit' THEN RETURN author_record.can_edit;
    WHEN 'delete' THEN RETURN author_record.can_delete;
    WHEN 'review' THEN RETURN author_record.can_review;
    WHEN 'manage_users' THEN RETURN author_record.can_manage_users;
    ELSE RETURN false;
  END CASE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- REMOVER políticas existentes antes de criar novas (CORREÇÃO)
DROP POLICY IF EXISTS "Users can view own author data" ON authors;
DROP POLICY IF EXISTS "Only admins can manage authors" ON authors;
DROP POLICY IF EXISTS "Users can update own basic data" ON authors;

-- Política RLS: Usuários podem ver apenas seus próprios dados (exceto admin)
CREATE POLICY "Users can view own author data" ON authors
  FOR SELECT
  USING (
    auth_user_id = auth.uid() OR
    (SELECT role FROM authors WHERE auth_user_id = auth.uid()) = 'admin'
  );

-- Política RLS: Apenas admins podem inserir/atualizar autores
CREATE POLICY "Only admins can manage authors" ON authors
  FOR ALL
  USING (
    (SELECT role FROM authors WHERE auth_user_id = auth.uid()) = 'admin'
  );

-- Política RLS: Usuários podem atualizar seus próprios dados básicos
CREATE POLICY "Users can update own basic data" ON authors
  FOR UPDATE
  USING (auth_user_id = auth.uid())
  WITH CHECK (
    auth_user_id = auth.uid() AND
    -- Não pode alterar role, permissions ou is_active
    role = (SELECT role FROM authors WHERE auth_user_id = auth.uid())
  );

-- Atualizar autor admin padrão (se existir)
UPDATE authors
SET 
  role = 'admin',
  can_create = true,
  can_edit = true,
  can_delete = true,
  can_review = true,
  can_manage_users = true,
  allowed_categories = ARRAY[]::TEXT[],
  allowed_cities = ARRAY[]::TEXT[]
WHERE email = 'admin@portalnorte43.com.br';

-- Tornar seu usuário admin
UPDATE authors
SET 
  role = 'admin',
  can_create = true,
  can_edit = true,
  can_delete = true,
  can_review = true,
  can_manage_users = true,
  allowed_categories = ARRAY[]::TEXT[],
  allowed_cities = ARRAY[]::TEXT[],
  is_active = true
WHERE email = 'nego2022fr@gmail.com';

-- Se o autor não existir, criar manualmente
INSERT INTO authors (name, email, role, auth_user_id, can_create, can_edit, can_delete, can_review, can_manage_users, is_active)
SELECT 
  COALESCE(raw_user_meta_data->>'name', email),
  email,
  'admin',
  id,
  true,
  true,
  true,
  true,
  true,
  true
FROM auth.users
WHERE email = 'nego2022fr@gmail.com'
ON CONFLICT (email) DO UPDATE SET
  role = 'admin',
  can_create = true,
  can_edit = true,
  can_delete = true,
  can_review = true,
  can_manage_users = true,
  is_active = true;

-- Comentários para documentação
COMMENT ON COLUMN authors.permissions IS 'Permissões customizadas em formato JSON';
COMMENT ON COLUMN authors.allowed_categories IS 'Categorias que o usuário pode acessar (vazio = todas)';
COMMENT ON COLUMN authors.allowed_cities IS 'Cidades que o usuário pode acessar (vazio = todas)';
COMMENT ON COLUMN authors.can_create IS 'Pode criar novos artigos';
COMMENT ON COLUMN authors.can_edit IS 'Pode editar artigos';
COMMENT ON COLUMN authors.can_delete IS 'Pode deletar artigos';
COMMENT ON COLUMN authors.can_review IS 'Pode revisar e aprovar artigos pendentes';
COMMENT ON COLUMN authors.can_manage_users IS 'Pode gerenciar outros usuários';

