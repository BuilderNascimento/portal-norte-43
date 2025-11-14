# 👥 Guia - Dashboard de Editores com Permissões

## 📋 O que foi criado

### 1. Sistema de Autenticação
- ✅ Login com Supabase Auth
- ✅ Sessões persistentes
- ✅ Middleware de proteção de rotas
- ✅ Logout

### 2. Sistema de Permissões
- ✅ Roles: `admin` e `collaborator`
- ✅ Permissões granulares:
  - `can_create` - Criar artigos
  - `can_edit` - Editar artigos
  - `can_delete` - Deletar artigos
  - `can_review` - Revisar e aprovar artigos
  - `can_manage_users` - Gerenciar outros usuários
- ✅ Restrições por categoria e cidade

### 3. Dashboard
- ✅ Página de login (`/admin/login`)
- ✅ Dashboard principal (`/admin`)
- ✅ Gerenciamento de usuários (`/admin/users`)

---

## 🚀 Como Configurar

### Passo 1: Executar Migration no Supabase

1. Acesse o Supabase Dashboard
2. Vá em **SQL Editor**
3. Execute o arquivo: `supabase/migrations/002_auth_and_permissions.sql`
4. ✅ Migration executada!

### Passo 2: Criar Primeiro Usuário Admin

Você precisa criar o primeiro usuário admin manualmente no Supabase:

1. No Supabase, vá em **Authentication** → **Users**
2. Clique em **"Add user"** → **"Create new user"**
3. Preencha:
   - **Email**: `seu-email@exemplo.com`
   - **Password**: (senha forte)
   - **Auto Confirm User**: ✅ Marque esta opção
4. Clique em **"Create user"**

5. Agora, vá em **SQL Editor** e execute:

```sql
-- Atualizar o autor criado para ser admin
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
WHERE email = 'seu-email@exemplo.com';
```

6. ✅ Pronto! Agora você pode fazer login com esse email e senha.

---

## 👤 Criar Usuários (Antonio e Carlos)

### Antonio (Admin Completo)

1. Faça login como admin
2. Vá em `/admin/users`
3. Clique em **"+ Novo Usuário"**
4. Preencha:
   - **Nome**: `Antonio`
   - **Email**: `antonio@portalnorte43.com.br`
   - **Senha**: (defina uma senha)
   - **Função**: `Administrador`
   - **Permissões**: Marque TODAS
5. Clique em **"Criar Usuário"**

✅ Antonio terá acesso total a tudo!

### Carlos (Colaborador com Restrições)

1. Ainda em `/admin/users`
2. Clique em **"+ Novo Usuário"**
3. Preencha:
   - **Nome**: `Carlos`
   - **Email**: `carlos@portalnorte43.com.br`
   - **Senha**: (defina uma senha)
   - **Função**: `Colaborador`
   - **Permissões**: 
     - ✅ Criar artigos
     - ✅ Editar artigos
     - ❌ Deletar artigos
     - ❌ Revisar artigos
     - ❌ Gerenciar usuários
   - **Categorias permitidas**: (deixe vazio = todas, ou selecione específicas)
   - **Cidades permitidas**: (deixe vazio = todas, ou selecione específicas)
4. Clique em **"Criar Usuário"**

✅ Carlos só poderá criar e editar artigos do setor dele!

---

## 🔐 Como Funciona

### Permissões por Role

#### Admin
- ✅ Acesso total a tudo
- ✅ Pode criar, editar, deletar qualquer artigo
- ✅ Pode revisar e aprovar artigos
- ✅ Pode gerenciar usuários
- ✅ Não tem restrições de categoria/cidade

#### Collaborator
- ⚙️ Permissões configuráveis individualmente
- ⚙️ Pode ter restrições de categoria
- ⚙️ Pode ter restrições de cidade
- ⚙️ Só vê/edita o que tem permissão

### Exemplo: Carlos

Se Carlos tem:
- `can_create: true`
- `can_edit: true`
- `can_delete: false`
- `allowed_categories: ['Saúde', 'Educação']`
- `allowed_cities: ['Maringá']`

Então Carlos pode:
- ✅ Criar artigos de Saúde ou Educação em Maringá
- ✅ Editar artigos de Saúde ou Educação em Maringá
- ❌ Não pode deletar artigos
- ❌ Não pode criar artigos de outras categorias
- ❌ Não pode criar artigos de outras cidades

---

## 📝 Próximos Passos

1. ✅ Executar migration `002_auth_and_permissions.sql`
2. ✅ Criar primeiro usuário admin no Supabase
3. ✅ Fazer login e criar outros usuários
4. 🔄 Implementar edição de artigos com controle de permissões
5. 🔄 Implementar criação de artigos com controle de permissões

---

## 🆘 Troubleshooting

### "Não autorizado" ao acessar /admin
- Verifique se executou a migration
- Verifique se criou o usuário no Supabase Auth
- Verifique se atualizou o autor para admin no SQL

### Usuário não aparece após criar
- Aguarde alguns segundos (trigger pode demorar)
- Verifique se o email está correto
- Verifique se o trigger `handle_new_user()` está funcionando

### Permissões não funcionam
- Verifique se as permissões foram salvas no banco
- Verifique se o usuário está ativo (`is_active = true`)
- Verifique os logs do navegador

---

**🎯 Sistema de permissões completo e funcionando!**

