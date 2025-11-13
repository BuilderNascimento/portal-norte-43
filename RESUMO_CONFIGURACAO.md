# ✅ Bot Automatizado - Configuração Completa

## 🎯 Status: PRONTO PARA USO

O bot está **100% configurado** e pronto para rodar automaticamente!

## ⚙️ O que foi configurado:

1. ✅ **Workflow GitHub Actions** criado (`.github/workflows/automated-news-bot.yml`)
2. ✅ **Agendamento**: A cada 2 horas (00:00, 02:00, 04:00, 06:00, 08:00, 10:00, 12:00, 14:00, 16:00, 18:00, 20:00, 22:00)
3. ✅ **Quantidade**: 2 notícias por execução
4. ✅ **Processo automático**: Busca RSS → Reescreve com IA → Gera imagem → Publica no site

## 🔐 AÇÃO NECESSÁRIA: Configurar Secrets no GitHub

**IMPORTANTE**: Antes de sair, configure as secrets no GitHub:

### Passo a Passo:

1. Acesse: https://github.com/BuilderNascimento/portal-norte-43/settings/secrets/actions

2. Clique em **"New repository secret"** e adicione:

   - **Name**: `ANTHROPIC_API_KEY`
   - **Value**: (Sua chave da API Anthropic/Claude)
   
   - **Name**: `OPENAI_API_KEY`
   - **Value**: (Sua chave da API OpenAI/DALL-E)

3. Salve cada secret

## ✅ Após configurar as secrets:

- O bot começará a rodar automaticamente a cada 2 horas
- 2 notícias novas serão publicadas por execução
- Tudo será automático, sem necessidade de intervenção

## 🔍 Como verificar:

1. **Ver execuções**: https://github.com/BuilderNascimento/portal-norte-43/actions
2. **Ver notícias**: https://portalnorte43.com.br
3. **Executar manualmente**: No GitHub Actions, clique em "Run workflow"

## 📊 Monitoramento:

- Logs completos no GitHub Actions
- Notícias aparecem automaticamente no site
- Arquivo `data/automated-news.json` é atualizado automaticamente

---

**🚀 Tudo pronto! Configure as secrets e o bot começará a trabalhar automaticamente!**

