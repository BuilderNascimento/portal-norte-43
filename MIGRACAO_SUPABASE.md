# 🚀 Migração para Supabase - Portal Norte 43

## ✅ O que foi feito

### 1. Estrutura do Banco de Dados
- ✅ Schema SQL criado em `supabase/migrations/001_initial_schema.sql`
- ✅ Tabelas: `articles`, `categories`, `cities`, `authors`, `ads`
- ✅ Relacionamentos configurados
- ✅ RLS (Row Level Security) implementado
- ✅ Índices para performance

### 2. Cliente Supabase
- ✅ Cliente configurado em `src/lib/supabase/client.ts`
- ✅ Tipos TypeScript em `src/lib/supabase/types.ts`
- ✅ Cliente público (anon key) para leitura
- ✅ Cliente admin (service_role) para escrita (n8n)

### 3. Funções de Acesso
- ✅ `src/lib/supabase/articles.ts` - Buscar artigos
- ✅ `src/lib/supabase/categories.ts` - Buscar categorias
- ✅ `src/lib/supabase/cities.ts` - Buscar cidades
- ✅ `src/lib/supabase/ads.ts` - Buscar anúncios

### 4. Integração no Portal
- ✅ `news-aggregator` atualizado para usar Supabase
- ✅ Página inicial (`page.tsx`) atualizada
- ✅ Página de artigo (`[slug]/page.tsx`) atualizada
- ✅ API `/api/news` atualizada
- ✅ Admin atualizado para usar Supabase

### 5. Endpoint para n8n
- ✅ `/api/automation/news` criado
- ✅ Autenticação via API Key
- ✅ Validação de dados com Zod
- ✅ Busca automática de categoria e cidade
- ✅ Prevenção de duplicatas

## 📋 Próximos Passos

### 1. Configurar Supabase
1. Criar projeto no Supabase
2. Executar migration `001_initial_schema.sql`
3. Configurar variáveis de ambiente

### 2. Variáveis de Ambiente Necessárias
```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
AUTOMATION_API_KEY=portal-norte-43-n8n-2025
```

### 3. Testar
- ✅ Portal deve buscar notícias do Supabase
- ✅ Admin deve mostrar artigos pendentes
- ✅ API `/api/automation/news` deve aceitar requisições do n8n

## 🗑️ Código Antigo a Remover (Depois de testar)

### Arquivos para remover:
- `src/lib/automation/news-storage.ts` (substituído por Supabase)
- `src/app/api/automation/publish-news/route.ts` (substituído por `/api/automation/news`)
- `src/app/api/automation/status/route.ts` (se não for mais necessário)
- `src/app/api/automation/process-feeds/route.ts` (se não for mais necessário)
- `data/automated-news.json` (não é mais necessário)
- `bot/` (toda a pasta do bot Python - será substituído por n8n)

### Manter temporariamente:
- `src/lib/mock-data/index.ts` - Pode ser usado como fallback durante migração
- `src/lib/rss-feeds/` - Pode ser útil para n8n

## 🔌 Integração n8n

### Endpoint para n8n:
```
POST https://portalnorte43.com.br/api/automation/news
Authorization: Bearer portal-norte-43-n8n-2025
Content-Type: application/json
```

### Payload:
```json
{
  "slug": "titulo-da-noticia-2025-11-14",
  "title": "Título da Notícia",
  "summary": "Resumo...",
  "content": "Conteúdo completo...",
  "category": "Saúde",
  "city": "Brasil",
  "source": "Agência Brasil",
  "image_url": "https://exemplo.com/imagem.jpg",
  "published_at": "2025-11-14T10:00:00-03:00",
  "status": "approved"
}
```

## ✨ Benefícios da Nova Arquitetura

1. ✅ **Sem dependência de Git** - Conteúdo não precisa de commits
2. ✅ **Tempo real** - Mudanças aparecem imediatamente
3. ✅ **Escalável** - Supabase gerencia performance
4. ✅ **Seguro** - RLS protege dados
5. ✅ **Flexível** - Fácil adicionar novos campos
6. ✅ **n8n nativo** - Integração direta sem hacks

---

**🎯 Arquitetura pronta! Agora é só configurar o Supabase e começar a usar!**

