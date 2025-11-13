# 🚀 Guia Rápido - Bot de Automação

## ⚡ Setup Rápido (5 minutos)

### 1. Instalar dependências

```bash
cd bot
pip install -r requirements.txt
```

### 2. Configurar API Keys

Crie o arquivo `.env`:

```bash
cp env.example .env
nano .env  # ou use seu editor favorito
```

**Preencha:**
- `ANTHROPIC_API_KEY` - https://console.anthropic.com/
- `OPENAI_API_KEY` - https://platform.openai.com/

### 3. Testar

```bash
python3 news_automation_bot.py
```

### 4. Automatizar (VPS)

**Cron (a cada 2 horas):**
```bash
crontab -e
# Adicione:
0 */2 * * * cd /caminho/para/portal-norte-43/bot && /usr/bin/python3 news_automation_bot.py >> logs/cron.log 2>&1
```

## ✅ Pronto!

O bot vai:
- ✅ Buscar notícias de sites GOV
- ✅ Reescrever com Claude AI
- ✅ Gerar imagens com DALL-E 3
- ✅ Categorizar automaticamente
- ✅ Publicar no site

## 📊 Verificar

- **Logs**: `tail -f bot/news_bot.log`
- **Status**: https://portalnorte43.com.br/api/automation/status
- **Site**: As notícias aparecem automaticamente na homepage

## 💰 Custos

- ~$0.05 por notícia
- ~$18/mês (2 notícias a cada 2h)

---

**Dúvidas?** Veja `README.md` completo.

