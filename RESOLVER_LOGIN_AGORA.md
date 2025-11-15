# 🔧 RESOLVER LOGIN AGORA - Passo a Passo

## ✅ Variáveis de Ambiente (Estão Corretas!)

As variáveis no Vercel estão **CORRETAS**:
- ✅ NEXT_PUBLIC_SUPABASE_URL
- ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY  
- ✅ SUPABASE_SERVICE_ROLE_KEY
- ✅ AUTOMATION_API_KEY

**As variáveis NÃO estão causando o problema!**

---

## 🔍 O Problema Real

O erro "Credenciais inválidas" acontece porque:
1. O usuário não existe no `auth.users` do Supabase, OU
2. A senha está errada, OU
3. O `auth_user_id` não está conectado na tabela `authors`

---

## ✅ SOLUÇÃO DEFINITIVA

### Passo 1: Criar Usuário no Supabase Auth

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **Authentication** → **Users**
4. Clique em **"Add user"** → **"Create new user"**
5. Preencha:
   - **Email**: `nego2022fr@gmail.com`
   - **Password**: `SuaSenha123!` (defina uma senha e **ANOTE ELA!**)
   - **Auto Confirm User**: ✅ **MARQUE ESTA OPÇÃO** (muito importante!)
6. Clique em **"Create user"**

### Passo 2: Executar SQL de Correção

No Supabase SQL Editor, execute este SQL:

```sql
-- Conectar auth_user_id
UPDATE authors
SET 
  auth_user_id = (
    SELECT id FROM auth.users WHERE email = 'nego2022fr@gmail.com'
  )
WHERE email = 'nego2022fr@gmail.com';

-- Garantir que email está confirmado
UPDATE auth.users
SET 
  email_confirmed_at = COALESCE(email_confirmed_at, NOW())
WHERE email = 'nego2022fr@gmail.com';

-- Garantir que autor está como admin
UPDATE authors
SET 
  role = 'admin',
  can_create = true,
  can_edit = true,
  can_delete = true,
  can_review = true,
  can_manage_users = true,
  is_active = true
WHERE email = 'nego2022fr@gmail.com';

-- Verificação final
SELECT 
  u.email as auth_email,
  u.email_confirmed_at IS NOT NULL as email_confirmado,
  a.email as author_email,
  a.role,
  a.auth_user_id = u.id as ids_conectados,
  a.is_active,
  CASE 
    WHEN u.id IS NULL THEN '❌ Usuário não existe'
    WHEN a.auth_user_id IS NULL THEN '❌ auth_user_id não conectado'
    WHEN a.auth_user_id != u.id THEN '❌ auth_user_id errado'
    WHEN u.email_confirmed_at IS NULL THEN '❌ Email não confirmado'
    ELSE '✅ TUDO OK!'
  END as status
FROM auth.users u
LEFT JOIN authors a ON a.auth_user_id = u.id
WHERE u.email = 'nego2022fr@gmail.com';
```

### Passo 3: Aguardar Deploy

1. O código já foi enviado para o GitHub
2. O Vercel deve fazer deploy automaticamente (2-3 minutos)
3. Ou faça deploy manual no Vercel Dashboard

### Passo 4: Testar Login

1. Acesse: https://portalnorte43.com.br/admin/login
2. Faça login com:
   - **Email**: `nego2022fr@gmail.com`
   - **Senha**: A senha que você definiu no Passo 1

---

## 🆘 Se Ainda Não Funcionar

Execute este SQL para ver o que está errado:

```sql
-- Diagnóstico completo
SELECT 
  'auth.users' as tabela,
  COUNT(*) as total
FROM auth.users
WHERE email = 'nego2022fr@gmail.com'

UNION ALL

SELECT 
  'authors' as tabela,
  COUNT(*) as total
FROM authors
WHERE email = 'nego2022fr@gmail.com'

UNION ALL

SELECT 
  'conexão' as tabela,
  COUNT(*) as total
FROM auth.users u
INNER JOIN authors a ON a.auth_user_id = u.id
WHERE u.email = 'nego2022fr@gmail.com';
```

**Me mostre o resultado deste SQL e eu te ajudo a corrigir!**

---

## 📝 Variáveis que Podem ser Removidas (Opcional)

Se quiser limpar, pode remover estas (não causam problema, mas não são necessárias):
- NEXT_PUBLIC_GA_ID (se não usar Google Analytics)
- OPENWEATHER_API_KEY (se não usar API do tempo)
- SESSION_SECRET (não necessário com Supabase Auth)
- ADMIN_API_KEY (substituído por Supabase Auth)
- AUTH_SECRET (não necessário com Supabase Auth)

**Mas isso NÃO vai resolver o login!** O problema é no Supabase, não nas variáveis.

---

**🎯 Execute os passos acima e me diga o resultado!**

