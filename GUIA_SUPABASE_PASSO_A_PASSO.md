# 🗄️ Guia Passo a Passo - Configuração Supabase

## 📋 Passo 1: Criar Conta e Projeto no Supabase

### 1.1. Acessar Supabase
1. Abra seu navegador e acesse: **https://supabase.com**
2. Clique em **"Start your project"** ou **"Sign In"** (se já tiver conta)
3. Faça login com GitHub, Google ou crie uma conta com email

### 1.2. Criar Novo Projeto
1. No dashboard, clique em **"New Project"** (botão verde no canto superior direito)
2. Preencha os dados:
   - **Name**: `portal-norte-43` (ou o nome que preferir)
   - **Database Password**: ⚠️ **ANOTE ESTA SENHA!** Você vai precisar dela depois
     - Use uma senha forte (mínimo 8 caracteres, com letras, números e símbolos)
     - Exemplo: `PortalNorte43@2025!`
   - **Region**: Escolha **"South America (São Paulo)"** (mais próximo do Brasil)
   - **Pricing Plan**: Escolha **"Free"** (suficiente para começar)
3. Clique em **"Create new project"**
4. ⏳ Aguarde 2-3 minutos enquanto o projeto é criado

---

## 📋 Passo 2: Executar Migration (Criar Tabelas)

### 2.1. Abrir SQL Editor
1. No menu lateral esquerdo, clique em **"SQL Editor"** (ícone de código `</>`)
2. Clique no botão **"New query"** (canto superior direito)

### 2.2. Copiar e Colar o Schema
1. Abra o arquivo `supabase/migrations/001_initial_schema.sql` no seu projeto
2. **Selecione TODO o conteúdo** do arquivo (Ctrl+A)
3. **Copie** (Ctrl+C)
4. **Cole** no editor SQL do Supabase (Ctrl+V)

### 2.3. Executar a Migration
1. Clique no botão **"Run"** (ou pressione Ctrl+Enter)
2. Aguarde alguns segundos
3. Você deve ver a mensagem: **"Success. No rows returned"** ou similar
4. ✅ **Pronto!** As tabelas foram criadas

### 2.4. Verificar se Funcionou
1. No menu lateral, clique em **"Table Editor"**
2. Você deve ver 5 tabelas:
   - ✅ `articles`
   - ✅ `categories`
   - ✅ `cities`
   - ✅ `authors`
   - ✅ `ads`
3. Clique em `categories` - deve ter 10 categorias já inseridas
4. Clique em `cities` - deve ter 7 cidades já inseridas

---

## 📋 Passo 3: Obter as Chaves de API

### 3.1. Acessar Configurações de API
1. No menu lateral, clique em **"Settings"** (ícone de engrenagem ⚙️)
2. Clique em **"API"** no submenu

### 3.2. Copiar as Chaves
Você verá 3 seções importantes:

#### 🔑 **Project URL**
- Copie o valor (exemplo: `https://abcdefghijklmnop.supabase.co`)
- Esta é a `NEXT_PUBLIC_SUPABASE_URL`

#### 🔑 **anon public** key
- Na seção **"Project API keys"**
- Copie a chave **"anon public"** (a primeira, não a service_role)
- Esta é a `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ⚠️ Esta chave pode ser exposta no frontend (é segura)

#### 🔑 **service_role** key
- Na mesma seção **"Project API keys"**
- Copie a chave **"service_role"** (a segunda)
- Esta é a `SUPABASE_SERVICE_ROLE_KEY`
- ⚠️ **NUNCA exponha esta chave no frontend!** Ela bypassa todas as regras de segurança

### 3.3. Anotar as Chaves
Crie um arquivo temporário (ou anote em um lugar seguro) com:
```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📋 Passo 4: Configurar no Vercel

### 4.1. Acessar Vercel Dashboard
1. Acesse: **https://vercel.com**
2. Faça login
3. Selecione o projeto **"portal-norte-43"**

### 4.2. Adicionar Variáveis de Ambiente
1. Clique em **"Settings"** (no menu superior)
2. Clique em **"Environment Variables"** (no menu lateral)
3. Adicione cada variável:

#### Variável 1:
- **Name**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: Cole a URL que você copiou (ex: `https://abcdefghijklmnop.supabase.co`)
- **Environment**: Marque todas as opções (Production, Preview, Development)
- Clique em **"Save"**

#### Variável 2:
- **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: Cole a chave "anon public" que você copiou
- **Environment**: Marque todas as opções
- Clique em **"Save"**

#### Variável 3:
- **Name**: `SUPABASE_SERVICE_ROLE_KEY`
- **Value**: Cole a chave "service_role" que você copiou
- **Environment**: Marque todas as opções
- Clique em **"Save"**

#### Variável 4 (Opcional - para n8n):
- **Name**: `AUTOMATION_API_KEY`
- **Value**: `portal-norte-43-n8n-2025` (ou qualquer chave que você quiser)
- **Environment**: Marque todas as opções
- Clique em **"Save"**

### 4.3. Fazer Redeploy
1. Após adicionar todas as variáveis, vá em **"Deployments"**
2. Clique nos **3 pontinhos** (⋯) do último deployment
3. Clique em **"Redeploy"**
4. Aguarde o deploy terminar

---

## 📋 Passo 5: Testar Localmente (Opcional)

### 5.1. Criar Arquivo .env.local
1. Na raiz do projeto, crie o arquivo `.env.local`
2. Adicione as variáveis (use as mesmas do Vercel):

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key-aqui
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-aqui
AUTOMATION_API_KEY=portal-norte-43-n8n-2025
```

### 5.2. Testar
1. Execute: `npm run dev`
2. Acesse: `http://localhost:3000`
3. O portal deve carregar (mesmo que não tenha notícias ainda)

---

## 📋 Passo 6: Inserir Primeira Notícia (Teste)

### 6.1. Via Supabase Dashboard
1. No Supabase, vá em **"Table Editor"**
2. Clique na tabela **"articles"**
3. Clique em **"Insert row"** (botão no canto superior direito)
4. Preencha:
   - **slug**: `teste-primeira-noticia`
   - **title**: `Primeira Notícia de Teste`
   - **summary**: `Esta é uma notícia de teste para verificar se tudo está funcionando.`
   - **content**: `Conteúdo completo da notícia de teste...`
   - **status**: Selecione `approved` (no dropdown)
   - **category_id**: Clique e selecione uma categoria (ex: "Geral")
   - **city_id**: Clique e selecione uma cidade (ex: "Brasil")
   - **source**: `Portal Norte 43`
   - **image_url**: `https://via.placeholder.com/1200x630`
   - **published_at**: Clique no calendário e escolha a data de hoje
5. Clique em **"Save"**

### 6.2. Verificar no Portal
1. Acesse seu site: `https://portalnorte43.com.br`
2. A notícia de teste deve aparecer na página inicial! ✅

---

## 📋 Passo 7: Testar Endpoint para n8n

### 7.1. Via cURL (Terminal)
```bash
curl -X POST https://portalnorte43.com.br/api/automation/news \
  -H "Authorization: Bearer portal-norte-43-n8n-2025" \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "teste-api-n8n-2025-11-14",
    "title": "Teste de API para n8n",
    "summary": "Esta é uma notícia de teste inserida via API",
    "content": "Conteúdo completo da notícia de teste via API...",
    "category": "Geral",
    "city": "Brasil",
    "source": "Teste API",
    "image_url": "https://via.placeholder.com/1200x630",
    "status": "approved"
  }'
```

### 7.2. Via Postman ou Insomnia
1. Método: **POST**
2. URL: `https://portalnorte43.com.br/api/automation/news`
3. Headers:
   - `Authorization`: `Bearer portal-norte-43-n8n-2025`
   - `Content-Type`: `application/json`
4. Body (JSON):
```json
{
  "slug": "teste-api-n8n-2025-11-14",
  "title": "Teste de API para n8n",
  "summary": "Esta é uma notícia de teste inserida via API",
  "content": "Conteúdo completo da notícia de teste via API...",
  "category": "Geral",
  "city": "Brasil",
  "source": "Teste API",
  "image_url": "https://via.placeholder.com/1200x630",
  "status": "approved"
}
```

### 7.3. Resposta Esperada
```json
{
  "success": true,
  "message": "Artigo inserido com sucesso",
  "article": {
    "id": "uuid-aqui",
    "slug": "teste-api-n8n-2025-11-14",
    "title": "Teste de API para n8n"
  }
}
```

---

## ✅ Checklist Final

- [ ] Projeto criado no Supabase
- [ ] Migration executada com sucesso
- [ ] 5 tabelas criadas (articles, categories, cities, authors, ads)
- [ ] Categorias e cidades inseridas automaticamente
- [ ] Chaves de API copiadas
- [ ] Variáveis de ambiente configuradas no Vercel
- [ ] Redeploy feito no Vercel
- [ ] Primeira notícia inserida manualmente (teste)
- [ ] Notícia aparece no portal
- [ ] Endpoint `/api/automation/news` testado e funcionando

---

## 🆘 Problemas Comuns

### ❌ "Error: Invalid API key"
- Verifique se copiou a chave correta (anon public, não service_role)
- Verifique se não há espaços extras nas variáveis

### ❌ "Error: relation does not exist"
- A migration não foi executada corretamente
- Execute novamente o SQL em `001_initial_schema.sql`

### ❌ "Error: new row violates row-level security policy"
- Isso é normal se tentar inserir via cliente público
- Use o endpoint `/api/automation/news` que usa service_role

### ❌ Notícias não aparecem no portal
- Verifique se o status é `approved`
- Verifique se `published_at` está preenchido
- Verifique os logs do Vercel para erros

---

## 🎯 Próximos Passos

1. ✅ Supabase configurado
2. ✅ Portal funcionando
3. 🔄 Configurar n8n para usar o endpoint `/api/automation/news`
4. 🔄 Criar workflow no n8n para coletar notícias e inserir automaticamente

---

**🎉 Parabéns! Seu Supabase está configurado e funcionando!**

