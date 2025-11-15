# 🔐 Criar Credenciais - Passo a Passo Visual

## 📋 Passo 1: Executar Migration (Se ainda não fez)

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto `portal-norte-43`
3. Vá em **SQL Editor** (menu lateral esquerdo)
4. Clique em **"New query"** (canto superior direito)
5. Abra o arquivo: `supabase/migrations/002_auth_and_permissions.sql`
6. **Copie TODO o conteúdo** (Ctrl+A, Ctrl+C)
7. **Cole no editor SQL** (Ctrl+V)
8. Clique em **"Run"** (ou pressione Ctrl+Enter)
9. ✅ Deve aparecer "Success. No rows returned"

---

## 📋 Passo 2: Criar Usuário no Supabase Auth

### Opção A: Via Interface (Mais Fácil) ⭐

1. No Supabase Dashboard, vá em **Authentication** (menu lateral)
2. Clique na aba **"Users"**
3. Clique no botão **"Add user"** (canto superior direito)
4. Selecione **"Create new user"**
5. Preencha o formulário:
   - **Email**: `seu-email@exemplo.com` (use seu email real)
   - **Password**: `SuaSenhaSegura123!` (mínimo 8 caracteres, com letras, números e símbolos)
   - **Auto Confirm User**: ✅ **MARQUE ESTA CAIXA** (muito importante!)
6. Clique em **"Create user"**
7. ✅ Usuário criado!

### Opção B: Via SQL (Alternativa)

Se preferir, execute este SQL no **SQL Editor**:

```sql
-- Substitua 'seu-email@exemplo.com' e 'SuaSenha123!' pelos seus dados
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
  'seu-email@exemplo.com',
  crypt('SuaSenha123!', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Seu Nome","role":"admin"}',
  false
);
```

---

## 📋 Passo 3: Verificar se o Autor foi Criado

O trigger `handle_new_user()` deve criar o autor automaticamente. Verifique:

1. Vá em **Table Editor** → **authors**
2. Procure pelo seu email
3. Se aparecer, ✅ está criado!
4. Se NÃO aparecer, vá para o Passo 4

---

## 📋 Passo 4: Tornar o Usuário Admin

Execute este SQL no **SQL Editor** (substitua o email):

```sql
-- Tornar usuário admin
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

**Se o autor não existir**, execute este SQL completo:

```sql
-- Criar autor manualmente e torná-lo admin
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

## 📋 Passo 5: Verificar se Está Tudo OK

Execute este SQL para verificar:

```sql
-- Verificar usuário e autor
SELECT 
  u.email,
  u.email_confirmed_at,
  a.name,
  a.role,
  a.can_create,
  a.can_edit,
  a.can_delete,
  a.can_review,
  a.can_manage_users,
  a.is_active
FROM auth.users u
LEFT JOIN authors a ON a.auth_user_id = u.id
WHERE u.email = 'seu-email@exemplo.com';
```

**Deve mostrar:**
- ✅ `email_confirmed_at` não nulo
- ✅ `role = 'admin'`
- ✅ Todas as permissões `true`
- ✅ `is_active = true`

---

## 📋 Passo 6: Fazer Login no Dashboard

1. Acesse: **https://portalnorte43.com.br/admin/login**
2. Digite:
   - **Email**: O email que você criou
   - **Senha**: A senha que você definiu
3. Clique em **"Entrar"**
4. ✅ Você será redirecionado para `/admin`

---

## 🆘 Problemas Comuns

### ❌ "Invalid login credentials"
**Solução:**
- Verifique se o email está correto
- Verifique se a senha está correta
- Verifique se marcou "Auto Confirm User" ao criar

### ❌ "Não autorizado" após login
**Solução:**
- Execute o Passo 4 (tornar admin)
- Verifique se `is_active = true` no banco
- Execute o SQL de verificação do Passo 5

### ❌ Autor não foi criado automaticamente
**Solução:**
- Execute o SQL do Passo 4 (criar autor manualmente)
- Verifique se o trigger `handle_new_user()` existe

### ❌ Não consigo ver a tabela `authors`
**Solução:**
- Verifique se executou a migration `002_auth_and_permissions.sql`
- A tabela `authors` deve existir (foi criada na migration 001)

---

## ✅ Checklist Final

- [ ] Migration `002_auth_and_permissions.sql` executada
- [ ] Usuário criado no Supabase Auth (Authentication → Users)
- [ ] "Auto Confirm User" marcado ao criar
- [ ] Autor existe na tabela `authors`
- [ ] Autor tem `role = 'admin'`
- [ ] Todas as permissões estão `true`
- [ ] `is_active = true`
- [ ] Consegue fazer login em `/admin/login`

---

## 🎯 Depois de Fazer Login

Uma vez logado como admin, você poderá:
- ✅ Criar outros usuários em `/admin/users`
- ✅ Ver todas as notícias pendentes
- ✅ Gerenciar permissões de cada usuário

---

**🚀 Siga os passos acima e você terá acesso ao dashboard!**

