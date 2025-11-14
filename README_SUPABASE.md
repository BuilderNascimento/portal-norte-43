# 🗄️ Configuração Supabase - Portal Norte 43

## 📋 Passo a Passo

### 1. Criar Projeto no Supabase

1. Acesse: https://supabase.com
2. Crie uma conta ou faça login
3. Clique em "New Project"
4. Preencha:
   - **Name**: portal-norte-43
   - **Database Password**: (anote esta senha!)
   - **Region**: Escolha a mais próxima (South America)
5. Aguarde a criação do projeto (~2 minutos)

### 2. Executar Migrations

1. No dashboard do Supabase, vá em **SQL Editor**
2. Clique em **New Query**
3. Copie o conteúdo de `supabase/migrations/001_initial_schema.sql`
4. Cole no editor e clique em **Run**
5. Verifique se todas as tabelas foram criadas (vá em **Table Editor**)

### 3. Configurar Variáveis de Ambiente

1. No dashboard do Supabase, vá em **Settings** → **API**
2. Copie:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ NUNCA exponha no cliente!)

3. No Vercel:
   - Vá em **Settings** → **Environment Variables**
   - Adicione as 3 variáveis acima

4. Localmente, crie `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
```

### 4. Testar Conexão

Após configurar, o portal deve:
- ✅ Buscar notícias do Supabase
- ✅ Buscar categorias e cidades
- ✅ Buscar anúncios

## 🔐 Segurança (RLS)

O schema já inclui Row Level Security (RLS):
- ✅ Todos podem **ler** artigos aprovados
- ✅ Todos podem **ler** categorias e cidades
- ✅ Todos podem **ler** anúncios ativos
- ✅ Apenas autenticados podem **escrever** (via service_role para n8n)

## 🔌 Integração com n8n

O endpoint `/api/automation/news` está pronto para receber notícias do n8n:

**URL**: `https://portalnorte43.com.br/api/automation/news`

**Método**: `POST`

**Headers**:
```
Authorization: Bearer portal-norte-43-n8n-2025
Content-Type: application/json
```

**Body**:
```json
{
  "slug": "titulo-da-noticia-2025-11-14",
  "title": "Título da Notícia",
  "summary": "Resumo da notícia...",
  "content": "Conteúdo completo...",
  "category": "Saúde",
  "city": "Brasil",
  "source": "Agência Brasil",
  "image_url": "https://exemplo.com/imagem.jpg",
  "published_at": "2025-11-14T10:00:00-03:00",
  "status": "approved"
}
```

## 📊 Estrutura do Banco

### Tabelas Criadas:

1. **categories** - Categorias de notícias
2. **cities** - Cidades
3. **authors** - Autores/Usuários
4. **articles** - Artigos/Notícias (principal)
5. **ads** - Anúncios

### Relacionamentos:

- `articles.category_id` → `categories.id`
- `articles.city_id` → `cities.id`
- `articles.author_id` → `authors.id`

## ✅ Próximos Passos

1. Executar migrations no Supabase
2. Configurar variáveis de ambiente
3. Testar o portal
4. Configurar n8n para usar o endpoint

---

**🎯 Tudo pronto para usar Supabase como banco principal!**

