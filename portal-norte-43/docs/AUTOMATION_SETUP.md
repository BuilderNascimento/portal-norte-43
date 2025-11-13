# Sistema de Automação de Notícias

Sistema temporário para automatizar a publicação de notícias dos feeds RSS enquanto a integração com n8n não está pronta.

## Como Funciona

1. **Processamento de Feeds**: O endpoint `/api/automation/process-feeds` busca notícias de todos os feeds RSS configurados
2. **Armazenamento**: As notícias são salvas em `data/automated-news.json`
3. **Integração**: As notícias automatizadas são automaticamente incluídas na homepage junto com as mockadas e RSS

## Configuração

### 1. Variável de Ambiente (Opcional mas Recomendado)

Adicione no `.env.local` ou nas variáveis de ambiente do Vercel:

```env
AUTOMATION_API_KEY=seu-token-secreto-aqui
```

### 2. Execução Manual

Para processar feeds manualmente, faça uma requisição POST:

```bash
# Com API key
curl -X POST "https://portalnorte43.com.br/api/automation/process-feeds?key=seu-token" \
  -H "Authorization: Bearer seu-token"

# Ou sem API key (se não configurado)
curl -X POST "https://portalnorte43.com.br/api/automation/process-feeds"
```

### 3. Automação com Vercel Cron Jobs

O arquivo `vercel.json` já está configurado para rodar a cada 30 minutos.

**Importante**: Atualize o `vercel.json` com sua API key antes de fazer deploy:

```json
{
  "crons": [
    {
      "path": "/api/automation/process-feeds?key=SUA_API_KEY_AQUI",
      "schedule": "*/30 * * * *"
    }
  ]
}
```

### 4. Automação com GitHub Actions (Alternativa)

Crie `.github/workflows/process-news.yml`:

```yaml
name: Process News Feeds

on:
  schedule:
    - cron: '*/30 * * * *' # A cada 30 minutos
  workflow_dispatch: # Permite execução manual

jobs:
  process:
    runs-on: ubuntu-latest
    steps:
      - name: Process RSS Feeds
        run: |
          curl -X POST "https://portalnorte43.com.br/api/automation/process-feeds?key=${{ secrets.AUTOMATION_API_KEY }}"
```

## Endpoints Disponíveis

### POST `/api/automation/process-feeds`
Processa todos os feeds RSS e armazena notícias novas.

**Query Parameters:**
- `key` (opcional): API key para autenticação

**Response:**
```json
{
  "success": true,
  "message": "Processamento concluído com sucesso",
  "added": 5,
  "total": 45,
  "processedFeeds": 13,
  "duration": 2341,
  "lastUpdate": "2025-11-12T23:00:00.000Z"
}
```

### GET `/api/automation/process-feeds`
Retorna estatísticas do armazenamento.

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalNews": 45,
    "lastUpdate": "2025-11-12T23:00:00.000Z",
    "processedFeeds": 13
  }
}
```

### GET `/api/automation/status`
Retorna status geral da automação.

## Limitações Temporárias

- Armazenamento em arquivo JSON (será substituído por Supabase quando n8n estiver pronto)
- Máximo de 200 notícias armazenadas (mais antigas são removidas automaticamente)
- Cache de 5 minutos para feeds RSS (já implementado)

## Próximos Passos

Quando o n8n estiver pronto:
1. Substituir `news-storage.ts` por integração com Supabase
2. Configurar webhooks do n8n para processar feeds
3. Remover este sistema temporário

## Monitoramento

Para verificar se está funcionando:
1. Acesse `/api/automation/status` para ver estatísticas
2. Verifique o arquivo `data/automated-news.json` (localmente)
3. Veja os logs no Vercel Dashboard

