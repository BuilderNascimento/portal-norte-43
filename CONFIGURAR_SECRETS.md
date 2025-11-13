# 🔐 Configurar Secrets no GitHub - URGENTE

## ⚠️ IMPORTANTE: Configure as Secrets ANTES de sair!

O bot precisa das seguintes secrets configuradas no GitHub para funcionar:

## 📝 Passo a Passo

### 1. Acesse as Secrets
👉 https://github.com/BuilderNascimento/portal-norte-43/settings/secrets/actions

### 2. Adicione as Secrets

Clique em **"New repository secret"** e adicione:

#### Secret 1: `ANTHROPIC_API_KEY`
- **Name**: `ANTHROPIC_API_KEY`
- **Value**: (Use a chave da API Anthropic que você já tem configurada)

#### Secret 2: `OPENAI_API_KEY`
- **Name**: `OPENAI_API_KEY`
- **Value**: (Use a chave da API OpenAI que você já tem configurada)

### 3. Verificar

Após adicionar, você deve ver 2 secrets na lista:
- ✅ ANTHROPIC_API_KEY
- ✅ OPENAI_API_KEY

## ✅ Pronto!

Após configurar, o bot começará a rodar automaticamente a cada 2 horas.

## 🔍 Verificar se está funcionando

1. Vá em: https://github.com/BuilderNascimento/portal-norte-43/actions
2. Você verá o workflow "🤖 Bot Automatizado de Notícias"
3. A primeira execução será na próxima hora par (00:00, 02:00, 04:00, etc.)

## 🚀 Executar Manualmente (Teste)

Para testar imediatamente:
1. Vá em: https://github.com/BuilderNascimento/portal-norte-43/actions
2. Clique em "🤖 Bot Automatizado de Notícias"
3. Clique em **"Run workflow"** → **"Run workflow"**

---

**⚠️ SEM AS SECRETS, O BOT NÃO FUNCIONARÁ!**

