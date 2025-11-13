# 🤖 Bot de Automação de Notícias - Portal Norte 43

Bot Python que automatiza a publicação de notícias:
- ✅ Busca notícias de feeds RSS (sites GOV)
- ✅ Reescreve com Claude AI (evita plágio)
- ✅ Gera imagens com DALL-E 3
- ✅ Categoriza automaticamente
- ✅ Publica no site automaticamente

## 📋 Requisitos

- Python 3.9 ou superior
- Conta na Anthropic (Claude AI) - https://console.anthropic.com/
- Conta na OpenAI (DALL-E 3) - https://platform.openai.com/
- Acesso ao VPS/servidor onde o bot rodará

## 🚀 Instalação

### 1. Instalar dependências

```bash
cd bot
pip install -r requirements.txt
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na pasta `bot/`:

```bash
# Copie o exemplo
cp env.example .env

# Edite com suas credenciais
nano .env
```

**Variáveis obrigatórias:**

```env
# API do site
API_URL=https://portalnorte43.com.br
API_KEY=portal-norte-43-auto-2025

# Claude AI (Anthropic)
ANTHROPIC_API_KEY=sk-ant-api03-...

# OpenAI (para imagens)
OPENAI_API_KEY=sk-...
```

**Como obter as API Keys:**

1. **Anthropic (Claude)**: 
   - Acesse: https://console.anthropic.com/
   - Crie uma conta
   - Vá em "API Keys" → "Create Key"
   - Copie a chave (começa com `sk-ant-api03-`)

2. **OpenAI (DALL-E)**:
   - Acesse: https://platform.openai.com/
   - Vá em "API Keys" → "Create new secret key"
   - Copie a chave (começa com `sk-`)

### 3. Testar o bot

```bash
python news_automation_bot.py
```

## ⚙️ Configuração no VPS

### Opção 1: Cron Job (Recomendado)

Configure para rodar a cada 2 horas:

```bash
# Edite o crontab
crontab -e

# Adicione esta linha (roda a cada 2 horas)
0 */2 * * * cd /caminho/para/portal-norte-43/bot && /usr/bin/python3 news_automation_bot.py >> logs/cron.log 2>&1
```

### Opção 2: Systemd Service

Crie `/etc/systemd/system/news-bot.service`:

```ini
[Unit]
Description=Portal Norte 43 - News Automation Bot
After=network.target

[Service]
Type=simple
User=seu-usuario
WorkingDirectory=/caminho/para/portal-norte-43/bot
Environment="PATH=/usr/bin:/usr/local/bin"
ExecStart=/usr/bin/python3 news_automation_bot.py
Restart=on-failure
RestartSec=60

[Install]
WantedBy=multi-user.target
```

Ative o serviço:

```bash
sudo systemctl daemon-reload
sudo systemctl enable news-bot
sudo systemctl start news-bot

# Ver logs
sudo journalctl -u news-bot -f
```

### Opção 3: Screen/Tmux (Temporário)

```bash
# Com screen
screen -S news-bot
cd /caminho/para/portal-norte-43/bot
python3 news_automation_bot.py

# Desconecte: Ctrl+A, depois D
# Reconecte: screen -r news-bot

# Com tmux
tmux new -s news-bot
cd /caminho/para/portal-norte-43/bot
python3 news_automation_bot.py

# Desconecte: Ctrl+B, depois D
# Reconecte: tmux attach -t news-bot
```

## 📊 Monitoramento

### Ver logs

```bash
# Logs do bot
tail -f bot/news_bot.log

# Logs do cron (se usar cron)
tail -f logs/cron.log
```

### Verificar status

Acesse: `https://portalnorte43.com.br/api/automation/status`

### Ver notícias publicadas

As notícias aparecem automaticamente na homepage do site.

## 🔧 Configurações Avançadas

### Alterar número de notícias por execução

Edite `config.py` ou defina no `.env`:

```env
MAX_NEWS_PER_RUN=2  # 1-2 notícias por execução
```

### Adicionar novos feeds RSS

Edite `config.py` e adicione ao array `RSS_FEEDS`:

```python
{
    'name': 'Nome do Feed',
    'url': 'https://exemplo.com/rss.xml',
    'category': 'Categoria'
}
```

### Alterar modelo do Claude

No `.env`:

```env
CLAUDE_MODEL=claude-3-5-sonnet-20241022  # Padrão
# ou
CLAUDE_MODEL=claude-3-opus-20240229  # Mais caro, melhor qualidade
```

## 💰 Custos Estimados

Por notícia processada:
- **Claude AI (reescrita + categorização)**: ~$0.01
- **DALL-E 3 (imagem)**: ~$0.04
- **Total**: ~$0.05 por notícia

Com 2 notícias a cada 2 horas:
- **Por dia**: 24 notícias × $0.05 = **$1.20/dia**
- **Por mês**: ~**$36/mês**

## 🐛 Troubleshooting

### Erro: "ANTHROPIC_API_KEY não configurada"

- Verifique se o arquivo `.env` existe
- Confirme que a variável está correta
- Reinicie o bot após alterar `.env`

### Erro: "OPENAI_API_KEY não configurada"

- Mesmo processo acima
- A imagem usará placeholder se não houver chave

### Notícias não aparecem no site

1. Verifique os logs: `tail -f bot/news_bot.log`
2. Confirme que a API_KEY está correta
3. Teste o endpoint manualmente:
   ```bash
   curl -X GET https://portalnorte43.com.br/api/automation/publish-news
   ```

### Imagens não são geradas

- Verifique se tem créditos na OpenAI
- Confirme que a API key está ativa
- Verifique permissões da pasta `public/images/news/`

## 📝 Estrutura de Arquivos

```
bot/
├── news_automation_bot.py    # Bot principal
├── ai_rewriter.py            # Módulo de reescrita (Claude)
├── image_generator.py        # Módulo de geração de imagens (DALL-E)
├── category_classifier.py    # Módulo de categorização (Claude)
├── config.py                 # Configurações
├── requirements.txt          # Dependências Python
├── .env                      # Variáveis de ambiente (criar você)
├── .env.example              # Exemplo de configuração
├── processed_slugs.json     # Slugs já processados (gerado automaticamente)
└── news_bot.log              # Logs do bot (gerado automaticamente)
```

## 🔒 Segurança

- ⚠️ **NUNCA** commite o arquivo `.env` no Git
- ⚠️ Mantenha suas API keys seguras
- ⚠️ Use permissões restritas no arquivo `.env`:
  ```bash
  chmod 600 bot/.env
  ```

## 📞 Suporte

Em caso de problemas:
1. Verifique os logs
2. Confirme que todas as dependências estão instaladas
3. Teste as API keys manualmente
4. Verifique a conexão com o servidor

---

**Última atualização**: 13/11/2025

