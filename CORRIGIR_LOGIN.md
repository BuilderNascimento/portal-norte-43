# 🔧 Corrigir Problema de Login

## 🔍 Diagnóstico

O autor existe na tabela `authors` com todas as permissões, mas o login não funciona. Isso significa que:

1. O usuário pode não existir na tabela `auth.users` (Supabase Auth)
2. Ou o `auth_user_id` não está conectado corretamente

## ✅ Solução

Execute este SQL no Supabase para verificar e corrigir:

```sql
-- 1. Verificar se o usuário existe no auth.users
SELECT id, email, email_confirmed_at, created_at
FROM auth.users
WHERE email = 'nego2022fr@gmail.com';
```

**Se NÃO retornar nenhum resultado**, você precisa criar o usuário no Supabase Auth primeiro:

### Opção A: Criar via Interface (Recomendado)

1. No Supabase, vá em **Authentication** → **Users**
2. Clique em **"Add user"** → **"Create new user"**
3. Preencha:
   - **Email**: `nego2022fr@gmail.com`
   - **Password**: (defina uma senha)
   - **Auto Confirm User**: ✅ **MARQUE ESTA OPÇÃO**
4. Clique em **"Create user"**

### Opção B: Criar via SQL

Execute este SQL (substitua 'SuaSenha123!' pela senha que você quer):

```sql
-- Criar usuário no auth.users
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'nego2022fr@gmail.com',
  crypt('SuaSenha123!', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Antonio","role":"admin"}',
  false
);
```

## 🔗 Conectar auth_user_id

Depois de criar o usuário no auth.users, execute este SQL para conectar:

```sql
-- Conectar auth_user_id ao autor existente
UPDATE authors
SET 
  auth_user_id = (
    SELECT id FROM auth.users WHERE email = 'nego2022fr@gmail.com'
  )
WHERE email = 'nego2022fr@gmail.com';
```

## ✅ Verificar Tudo

Execute este SQL para verificar se está tudo conectado:

```sql
-- Verificar conexão completa
SELECT 
  u.id as auth_user_id,
  u.email as auth_email,
  u.email_confirmed_at,
  a.id as author_id,
  a.email as author_email,
  a.role,
  a.auth_user_id,
  a.is_active
FROM auth.users u
LEFT JOIN authors a ON a.auth_user_id = u.id
WHERE u.email = 'nego2022fr@gmail.com';
```

**Deve mostrar:**
- ✅ `auth_user_id` não nulo
- ✅ `email_confirmed_at` não nulo
- ✅ `auth_user_id` na tabela authors igual ao `id` do auth.users
- ✅ `role = 'admin'`
- ✅ `is_active = true`

## 🚀 Depois de Corrigir

1. Acesse: https://portalnorte43.com.br/admin/login
2. Faça login com:
   - **Email**: `nego2022fr@gmail.com`
   - **Senha**: A senha que você definiu
3. ✅ Deve funcionar!

