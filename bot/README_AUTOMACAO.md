# 🤖 Bot Automatizado de Notícias - Configuração

## ✅ Status: Configurado e Pronto

O bot está configurado para rodar **automaticamente a cada 2 horas** via GitHub Actions.

## 📋 Configuração Necessária no GitHub

### 1. Configurar Secrets no GitHub

Acesse: https://github.com/BuilderNascimento/portal-norte-43/settings/secrets/actions

Adicione as seguintes secrets:

1. **ANTHROPIC_API_KEY**
   - Valor: Sua chave da API Anthropic (Claude)
   - Exemplo: `sk-ant-api03-...`

2. **OPENAI_API_KEY**
   - Valor: Sua chave da API OpenAI (DALL-E)
   - Exemplo: `sk-proj-...`

3. **API_KEY** (opcional)
   - Valor: `portal-norte-43-auto-2025`
   - Já está como padrão no código

4. **API_URL** (opcional)
   - Valor: `https://portalnorte43.com.br`
   - Já está como padrão no código

### 2. Como Adicionar Secrets

1. Vá em: **Settings** → **Secrets and variables** → **Actions**
2. Clique em **New repository secret**
3. Adicione cada secret acima

## ⏰ Agendamento

O bot roda automaticamente:
- **A cada 2 horas** (00:00, 02:00, 04:00, 06:00, 08:00, 10:00, 12:00, 14:00, 16:00, 18:00, 20:00, 22:00)
- **2 notícias por execução**

## 🔍 Verificar Execuções

1. Acesse: https://github.com/BuilderNascimento/portal-norte-43/actions
2. Veja o workflow "🤖 Bot Automatizado de Notícias"
3. Clique em uma execução para ver os logs

## 🚀 Execução Manual

Você pode executar manualmente:
1. Vá em: https://github.com/BuilderNascimento/portal-norte-43/actions
2. Selecione "🤖 Bot Automatizado de Notícias"
3. Clique em **Run workflow**

## 📊 Monitoramento

- Logs disponíveis no GitHub Actions
- Notícias publicadas em: https://portalnorte43.com.br
- Arquivo de notícias: `data/automated-news.json`

## ✅ Tudo Pronto!

Após configurar as secrets, o bot começará a rodar automaticamente a cada 2 horas!

