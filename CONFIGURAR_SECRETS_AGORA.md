# 🔐 CONFIGURAR SECRETS NO GITHUB - PASSO A PASSO

## ⚠️ URGENTE: Configure agora para o bot funcionar!

Os erros que você está recebendo são porque as secrets não estão configuradas.

## 📋 Passo a Passo Completo:

### 1️⃣ Acesse as Secrets do GitHub

👉 **Clique aqui**: https://github.com/BuilderNascimento/portal-norte-43/settings/secrets/actions

Ou siga manualmente:
- Vá em: https://github.com/BuilderNascimento/portal-norte-43
- Clique em **Settings** (no topo do repositório)
- No menu lateral esquerdo, clique em **Secrets and variables** → **Actions**

### 2️⃣ Adicionar Secret 1: ANTHROPIC_API_KEY

1. Clique no botão **"New repository secret"** (canto superior direito)
2. Preencha:
   - **Name**: `ANTHROPIC_API_KEY`
   - **Secret**: Cole sua chave da API Anthropic (Claude)
     - Você já tem essa chave configurada localmente
3. Clique em **"Add secret"**

### 3️⃣ Adicionar Secret 2: OPENAI_API_KEY

1. Clique novamente em **"New repository secret"**
2. Preencha:
   - **Name**: `OPENAI_API_KEY`
   - **Secret**: Cole sua chave da API OpenAI (DALL-E)
     - Você já tem essa chave configurada localmente
3. Clique em **"Add secret"**

### 4️⃣ Verificar

Você deve ver na lista:
- ✅ `ANTHROPIC_API_KEY`
- ✅ `OPENAI_API_KEY`

## ✅ Pronto!

Após configurar, o bot começará a funcionar automaticamente!

## 🧪 Testar Agora

Para testar imediatamente:

1. Vá em: https://github.com/BuilderNascimento/portal-norte-43/actions
2. Clique em **"🤖 Bot Automatizado de Notícias"**
3. Clique em **"Run workflow"** (botão no canto superior direito)
4. Clique em **"Run workflow"** novamente
5. Aguarde alguns minutos e veja os logs

## 📊 Verificar se Funcionou

Após executar:
- ✅ Os logs devem mostrar "✅ Notícias publicadas"
- ✅ As notícias aparecerão em: https://portalnorte43.com.br
- ✅ Não haverá mais erros nos emails

---

**💡 Dica**: Se você não tiver as chaves de API, você precisa:
- **Anthropic**: https://console.anthropic.com/ → Criar API Key
- **OpenAI**: https://platform.openai.com/api-keys → Criar API Key

