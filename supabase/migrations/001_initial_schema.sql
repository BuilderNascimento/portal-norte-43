-- Schema inicial do Portal Norte 43
-- Banco de dados: Supabase (PostgreSQL)

-- Tabela de categorias
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT DEFAULT '#ef4444',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de cidades
CREATE TABLE IF NOT EXISTS cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  state TEXT DEFAULT 'PR',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de autores/usuários
CREATE TABLE IF NOT EXISTS authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'collaborator' CHECK (role IN ('admin', 'collaborator')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela principal de artigos/notícias
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT,
  
  -- Relacionamentos
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  city_id UUID REFERENCES cities(id) ON DELETE SET NULL,
  author_id UUID REFERENCES authors(id) ON DELETE SET NULL,
  
  -- Metadados
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'approved')),
  source TEXT,
  image_url TEXT,
  
  -- Datas
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Índices para performance
  CONSTRAINT articles_slug_unique UNIQUE (slug)
);

-- Índices para queries rápidas
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_category_id ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_city_id ON articles(city_id);
CREATE INDEX IF NOT EXISTS idx_articles_author_id ON articles(author_id);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);

-- Tabela de anúncios
CREATE TABLE IF NOT EXISTS ads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  link TEXT NOT NULL,
  position TEXT NOT NULL CHECK (position IN ('header', 'sidebar', 'infeed', 'top')),
  label TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_authors_updated_at BEFORE UPDATE ON authors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ads_updated_at BEFORE UPDATE ON ads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Inserir categorias padrão
INSERT INTO categories (name, slug, description, color) VALUES
  ('Política', 'politica', 'Notícias sobre política local e nacional', '#dc2626'),
  ('Trânsito', 'transito', 'Acidentes e informações de trânsito', '#ea580c'),
  ('Policial', 'policial', 'Notícias policiais e segurança', '#991b1b'),
  ('Economia', 'economia', 'Notícias econômicas e financeiras', '#16a34a'),
  ('Esportes', 'esportes', 'Notícias esportivas', '#2563eb'),
  ('Geral', 'geral', 'Notícias gerais', '#7c3aed'),
  ('Saúde', 'saude', 'Notícias sobre saúde', '#0891b2'),
  ('Educação', 'educacao', 'Notícias sobre educação', '#c026d3'),
  ('Meio Ambiente', 'meio-ambiente', 'Notícias ambientais', '#059669'),
  ('Agricultura e Consumo', 'agricultura-consumo', 'Notícias sobre agricultura e consumo', '#d97706')
ON CONFLICT (slug) DO NOTHING;

-- Inserir cidades padrão
INSERT INTO cities (name, slug, state) VALUES
  ('Maringá', 'maringa', 'PR'),
  ('Marialva', 'marialva', 'PR'),
  ('Mandaguari', 'mandaguari', 'PR'),
  ('Andirá', 'andira', 'PR'),
  ('Cambará', 'cambara', 'PR'),
  ('Bandeirantes', 'bandeirantes', 'PR'),
  ('Brasil', 'brasil', 'BR')
ON CONFLICT (slug) DO NOTHING;

-- Inserir autor padrão (admin)
INSERT INTO authors (name, email, role) VALUES
  ('Administrador', 'admin@portalnorte43.com.br', 'admin')
ON CONFLICT (email) DO NOTHING;

-- RLS (Row Level Security) - Políticas de acesso
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ads ENABLE ROW LEVEL SECURITY;

-- Políticas: Todos podem ler categorias e cidades
CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Cities are viewable by everyone" ON cities
  FOR SELECT USING (true);

-- Políticas: Todos podem ler artigos aprovados
CREATE POLICY "Approved articles are viewable by everyone" ON articles
  FOR SELECT USING (status = 'approved');

-- Políticas: Todos podem ler anúncios ativos
CREATE POLICY "Active ads are viewable by everyone" ON ads
  FOR SELECT USING (is_active = true);

-- Políticas: Apenas autenticados podem inserir/atualizar (para n8n e admin)
-- Nota: n8n usará service_role key que bypassa RLS
-- Admin usará autenticação JWT

