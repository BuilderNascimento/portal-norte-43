# 🚀 Acesso Rápido ao Dashboard

## ⚡ Passo 1: Executar Migration no Supabase

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto `portal-norte-43`
3. Vá em **SQL Editor** (menu lateral)
4. Clique em **"New query"**
5. Abra o arquivo: `supabase/migrations/002_auth_and_permissions.sql`
6. **Copie TODO o conteúdo** e cole no editor SQL
7. Clique em **"Run"** (ou Ctrl+Enter)
8. ✅ Deve aparecer "Success"

---

## ⚡ Passo 2: Criar Seu Usuário Admin

### Opção A: Via Supabase Dashboard (Mais Fácil)

1. No Supabase, vá em **Authentication** → **Users**
2. Clique em **"Add user"** → **"Create new user"**
3. Preencha:
   - **Email**: `seu-email@exemplo.com` (use seu email real)
   - **Password**: `SuaSenhaSegura123!` (mínimo 8 caracteres)
   - **Auto Confirm User**: ✅ **MARQUE ESTA OPÇÃO**
4. Clique em **"Create user"**

### Opção B: Via SQL (Alternativa)

Se preferir, execute este SQL:

```sql
-- Criar usuário no auth
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
  is_super_admin,
  confirmation_token,
  recovery_token
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'seu-email@exemplo.com',
  crypt('SuaSenhaSegura123!', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Seu Nome","role":"admin"}',
  false,
  '',
  ''
);
```

---

## ⚡ Passo 3: Tornar o Usuário Admin

Após criar o usuário, execute este SQL:

```sql
-- Substitua 'seu-email@exemplo.com' pelo email que você usou
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
WHERE email = 'seu-email@exemplo.com';
```

**⚠️ IMPORTANTE**: Se o autor ainda não foi criado automaticamente, execute:

```sql
-- Verificar se o autor existe
SELECT * FROM authors WHERE email = 'seu-email@exemplo.com';

-- Se não existir, criar manualmente
INSERT INTO authors (name, email, role, auth_user_id, can_create, can_edit, can_delete, can_review, can_manage_users, is_active)
SELECT 
  COALESCE(raw_user_meta_data->>'name', email),
  email,
  COALESCE(raw_user_meta_data->>'role', 'admin'),
  id,
  true,
  true,
  true,
  true,
  true,
  true
FROM auth.users
WHERE email = 'seu-email@exemplo.com'
ON CONFLICT (email) DO UPDATE SET
  role = 'admin',
  can_create = true,
  can_edit = true,
  can_delete = true,
  can_review = true,
  can_manage_users = true,
  is_active = true;
```

---

## ⚡ Passo 4: Acessar o Dashboard

1. Acesse: **https://portalnorte43.com.br/admin/login**
2. Faça login com:
   - **Email**: O email que você criou
   - **Senha**: A senha que você definiu
3. ✅ Você será redirecionado para `/admin`

---

## 🆘 Se Não Funcionar

### Erro: "Invalid login credentials"
- Verifique se o email está correto
- Verifique se a senha está correta
- Verifique se o usuário foi criado no Supabase Auth

### Erro: "Não autorizado"
- Verifique se executou a migration `002_auth_and_permissions.sql`
- Verifique se executou o SQL para tornar admin
- Verifique se `is_active = true` no banco

### Usuário não aparece após criar
- Aguarde 2-3 segundos (trigger pode demorar)
- Execute o SQL manual para criar o autor (veja acima)

---

## ✅ Checklist

- [ ] Migration `002_auth_and_permissions.sql` executada
- [ ] Usuário criado no Supabase Auth
- [ ] SQL para tornar admin executado
- [ ] Autor existe na tabela `authors` com `role = 'admin'`
- [ ] Consegue fazer login em `/admin/login`

---

**🎯 Depois de fazer login, você poderá criar outros usuários em `/admin/users`!**

