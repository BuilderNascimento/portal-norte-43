# 🏗️ Nova Arquitetura - Portal Norte 43

## ✅ Migração Completa para Supabase + n8n

### 📊 Estrutura Implementada

#### 1. **Banco de Dados (Supabase)**
- ✅ Schema completo em `supabase/migrations/001_initial_schema.sql`
- ✅ Tabelas: `articles`, `categories`, `cities`, `authors`, `ads`
- ✅ Relacionamentos e índices configurados
- ✅ Row Level Security (RLS) implementado

#### 2. **Cliente Supabase**
- ✅ `src/lib/supabase/client.ts` - Cliente público e admin
- ✅ `src/lib/supabase/types.ts` - Tipos TypeScript
- ✅ Funções de acesso em módulos separados

#### 3. **Integração no Portal**
- ✅ `news-aggregator` usa Supabase
- ✅ Páginas atualizadas para Supabase
- ✅ Admin atualizado para Supabase
- ✅ API `/api/news` atualizada

#### 4. **Endpoint para n8n**
- ✅ `/api/automation/news` - POST para inserir notícias
- ✅ Autenticação via API Key
- ✅ Validação completa de dados
- ✅ Busca automática de categoria/cidade

## 🔧 Configuração Necessária

### Variáveis de Ambiente

No Vercel, adicione:
```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
AUTOMATION_API_KEY=portal-norte-43-n8n-2025
```

### Executar Migration

1. Acesse Supabase Dashboard
2. Vá em **SQL Editor**
3. Cole o conteúdo de `supabase/migrations/001_initial_schema.sql`
4. Execute

## 🔌 Integração n8n

### Endpoint
```
POST https://portalnorte43.com.br/api/automation/news
Authorization: Bearer portal-norte-43-n8n-2025
```

### Payload
```json
{
  "slug": "titulo-noticia-2025-11-14",
  "title": "Título",
  "summary": "Resumo...",
  "content": "Conteúdo...",
  "category": "Saúde",
  "city": "Brasil",
  "source": "Agência Brasil",
  "image_url": "https://...",
  "published_at": "2025-11-14T10:00:00-03:00",
  "status": "approved"
```

## 🗑️ Código Antigo (Pode Remover Depois)

- `bot/` - Bot Python (substituído por n8n)
- `src/lib/automation/news-storage.ts` - Substituído por Supabase
- `src/app/api/automation/publish-news/route.ts` - Substituído por `/api/automation/news`
- `data/automated-news.json` - Não é mais necessário

## ✨ Benefícios

1. ✅ **Sem Git para conteúdo** - Mudanças em tempo real
2. ✅ **Escalável** - Supabase gerencia performance
3. ✅ **Seguro** - RLS protege dados
4. ✅ **Flexível** - Fácil adicionar campos
5. ✅ **n8n nativo** - Integração direta

---

**🎯 Arquitetura pronta! Configure o Supabase e comece a usar!**

