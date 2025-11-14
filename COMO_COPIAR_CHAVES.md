# 🔑 Como Copiar suas Chaves de API para o GitHub

## 📍 Onde estão suas chaves?

Suas chaves estão no arquivo: `bot/.env`

## 📋 Passo a Passo Rápido:

### 1️⃣ Abra o arquivo `.env`

No seu computador, abra:
```
C:\Users\Antonio Nascimento\Desktop\jornalismo\portal-norte-43\bot\.env
```

### 2️⃣ Encontre as chaves

Você verá algo como:
```
ANTHROPIC_API_KEY=sk-ant-api03-...
OPENAI_API_KEY=sk-proj-...
```

### 3️⃣ Copie para o GitHub

1. **Acesse**: https://github.com/BuilderNascimento/portal-norte-43/settings/secrets/actions

2. **Adicione Secret 1**:
   - Clique em "New repository secret"
   - **Name**: `ANTHROPIC_API_KEY`
   - **Secret**: Copie o valor após `ANTHROPIC_API_KEY=` do arquivo .env
   - Clique em "Add secret"

3. **Adicione Secret 2**:
   - Clique em "New repository secret" novamente
   - **Name**: `OPENAI_API_KEY`
   - **Secret**: Copie o valor após `OPENAI_API_KEY=` do arquivo .env
   - Clique em "Add secret"

## ✅ Pronto!

Após isso, o bot começará a funcionar automaticamente!

## 🧪 Testar

1. Vá em: https://github.com/BuilderNascimento/portal-norte-43/actions
2. Clique em "🤖 Bot Automatizado de Notícias"
3. Clique em "Run workflow"
4. Aguarde alguns minutos

---

**💡 Dica**: As chaves são seguras no GitHub - elas ficam criptografadas e só o bot pode usar!

