# 🤖 Bot de Processamento de Notícias

Bot automatizado para processar feeds RSS e atualizar o site com novas notícias.

## 🚀 Como Usar

### Execução Manual

```bash
# Executa o bot uma vez
npm run bot:process

# Ou diretamente
node scripts/process-news-bot.js
```

### Configuração com Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# URL da API (padrão: https://portalnorte43.com.br)
API_URL=https://portalnorte43.com.br

# API Key para autenticação (opcional, mas recomendado)
AUTOMATION_API_KEY=seu-token-secreto-aqui
```

### Automação no Windows (Agendador de Tarefas)

1. Abra o **Agendador de Tarefas** do Windows
2. Crie uma nova tarefa
3. Configure:
   - **Nome**: Portal Norte 43 - Processar Notícias
   - **Gatilho**: Repetir a cada 30 minutos
   - **Ação**: Iniciar um programa
   - **Programa**: `node`
   - **Argumentos**: `C:\caminho\para\projeto\scripts\process-news-bot.js`
   - **Iniciar em**: `C:\caminho\para\projeto`

### Automação no Linux/Mac (Cron)

Adicione ao crontab (`crontab -e`):

```bash
# Processa feeds RSS a cada 30 minutos
*/30 * * * * cd /caminho/para/projeto && npm run bot:process >> /var/log/portal-norte-bot.log 2>&1
```

### Automação com Vercel Cron (Recomendado)

O arquivo `vercel.json` já está configurado. Basta:

1. Configure a variável de ambiente `AUTOMATION_API_KEY` no Vercel
2. Atualize o `vercel.json` com sua API key
3. Faça deploy - o Vercel executará automaticamente

### Automação com GitHub Actions

Crie `.github/workflows/process-news.yml`:

```yaml
name: Process News Bot

on:
  schedule:
    - cron: '*/30 * * * *' # A cada 30 minutos
  workflow_dispatch: # Permite execução manual

jobs:
  process:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Process News Feeds
        env:
          API_URL: https://portalnorte43.com.br
          AUTOMATION_API_KEY: ${{ secrets.AUTOMATION_API_KEY }}
        run: npm run bot:process
```

## 📊 O que o Bot Faz

1. ✅ Verifica status atual do sistema
2. 🔄 Processa todos os feeds RSS configurados
3. 💾 Armazena notícias novas no sistema
4. 📊 Mostra estatísticas do processamento

## 🔍 Verificar Resultados

Após executar o bot, verifique:

- **Status**: `https://portalnorte43.com.br/api/automation/status`
- **Estatísticas**: `https://portalnorte43.com.br/api/automation/process-feeds` (GET)
- **Homepage**: As notícias aparecerão automaticamente no site

## ⚙️ Configurações Avançadas

### Alterar Frequência

No `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/automation/process-feeds?key=SUA_KEY",
    "schedule": "*/15 * * * *"  // A cada 15 minutos
  }]
}
```

### Logs

O bot mostra logs detalhados no console. Para salvar em arquivo:

```bash
npm run bot:process >> logs/bot.log 2>&1
```

## 🐛 Troubleshooting

**Erro: "Request timeout"**
- Os feeds RSS podem estar lentos
- Aumente o timeout no script (linha 15)

**Erro: "ENOTFOUND"**
- Verifique se a URL da API está correta
- Confirme que o site está online

**Nenhuma notícia adicionada**
- Os feeds podem não ter notícias novas
- Verifique os logs para mais detalhes

## 📝 Notas

- O bot evita duplicatas automaticamente
- Mantém apenas notícias dos últimos 10 dias
- Limita a 200 notícias no armazenamento
- Usa cache de 5 minutos para feeds RSS

