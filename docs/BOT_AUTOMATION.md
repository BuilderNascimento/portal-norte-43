# 🤖 Bot de Automação de Notícias - Documentação Completa

## Visão Geral

O bot de automação processa notícias de feeds RSS governamentais, reescreve com IA para evitar plágio, gera imagens relacionadas e publica automaticamente no site.

## Fluxo de Funcionamento

```
1. BUSCAR FEEDS RSS
   ↓
2. FILTRAR NOTÍCIAS NOVAS (evita duplicatas)
   ↓
3. REESCREVER COM CLAUDE AI
   ↓
4. CATEGORIZAR AUTOMATICAMENTE
   ↓
5. GERAR IMAGEM COM DALL-E 3
   ↓
6. SALVAR IMAGEM NO SERVIDOR
   ↓
7. PUBLICAR NO SITE VIA API
```

## Arquitetura

### Componentes

1. **news_automation_bot.py**: Bot principal que orquestra todo o processo
2. **ai_rewriter.py**: Módulo que usa Claude AI para reescrever notícias
3. **image_generator.py**: Módulo que usa DALL-E 3 para gerar imagens
4. **category_classifier.py**: Módulo que usa Claude AI para categorizar
5. **config.py**: Configurações centralizadas

### Endpoints API

- `POST /api/automation/publish-news`: Recebe notícias processadas pelo bot
- `GET /api/automation/status`: Status da automação

## Configuração

### Variáveis de Ambiente

```env
# API do site
API_URL=https://portalnorte43.com.br
API_KEY=portal-norte-43-auto-2025

# Claude AI
ANTHROPIC_API_KEY=sk-ant-api03-...
CLAUDE_MODEL=claude-3-5-sonnet-20241022

# OpenAI (imagens)
OPENAI_API_KEY=sk-...

# Configurações
MAX_NEWS_PER_RUN=2
```

## Execução

### Manual

```bash
cd bot
python3 news_automation_bot.py
```

### Automática (Cron)

```bash
# A cada 2 horas
0 */2 * * * cd /caminho/bot && python3 news_automation_bot.py >> logs/cron.log 2>&1
```

## Monitoramento

### Logs

- `bot/news_bot.log`: Logs do bot
- `logs/cron.log`: Logs do cron (se usar)

### Status

Acesse: `https://portalnorte43.com.br/api/automation/status`

## Custos

- **Por notícia**: ~$0.05
- **Por dia** (12 notícias): ~$0.60
- **Por mês**: ~$18

## Troubleshooting

Ver seção de troubleshooting no `bot/README.md`

