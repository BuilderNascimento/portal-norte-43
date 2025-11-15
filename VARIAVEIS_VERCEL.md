# 🔧 Variáveis de Ambiente no Vercel

## ✅ Variáveis Necessárias (MANTER)

Estas variáveis são **ESSENCIAIS** e devem estar configuradas:

1. ✅ **NEXT_PUBLIC_SUPABASE_URL** - URL do seu projeto Supabase
2. ✅ **NEXT_PUBLIC_SUPABASE_ANON_KEY** - Chave anon do Supabase
3. ✅ **SUPABASE_SERVICE_ROLE_KEY** - Chave service_role (para n8n)
4. ✅ **AUTOMATION_API_KEY** - Chave para endpoint do n8n

## ⚠️ Variáveis Opcionais (Podem ser removidas se não usar)

Estas variáveis são opcionais e podem ser removidas se não estiver usando:

- ❓ **NEXT_PUBLIC_GA_ID** - Google Analytics (opcional)
- ❓ **OPENWEATHER_API_KEY** - API do tempo (opcional)
- ❓ **NEXT_PUBLIC_APP_URL** - URL do app (pode ser removida, Next.js detecta automaticamente)
- ❓ **NODE_ENV** - Ambiente Node (geralmente definido automaticamente)
- ❓ **SESSION_SECRET** - Secreto de sessão (pode não ser necessário com Supabase Auth)
- ❓ **ADMIN_API_KEY** - Chave admin antiga (pode ser removida se não usar)
- ❓ **AUTH_SECRET** - Secreto de autenticação (pode não ser necessário com Supabase Auth)

## 🎯 Recomendação

**MANTER apenas:**
- ✅ NEXT_PUBLIC_SUPABASE_URL
- ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY
- ✅ SUPABASE_SERVICE_ROLE_KEY
- ✅ AUTOMATION_API_KEY

**PODE REMOVER (se não usar):**
- NEXT_PUBLIC_GA_ID (se não usar Google Analytics)
- OPENWEATHER_API_KEY (se não usar API do tempo)
- SESSION_SECRET (não necessário com Supabase Auth)
- ADMIN_API_KEY (substituído por Supabase Auth)
- AUTH_SECRET (não necessário com Supabase Auth)

**NODE_ENV e NEXT_PUBLIC_APP_URL** podem ficar, não causam problemas.

---

## ⚠️ IMPORTANTE

As variáveis **NÃO** estão causando o problema de login. O problema é que:

1. O usuário precisa existir no `auth.users` do Supabase
2. O `auth_user_id` precisa estar conectado na tabela `authors`
3. O email precisa estar confirmado

**Execute o SQL `SOLUCAO_DEFINITIVA_LOGIN.sql` para corrigir!**

