# 🚀 Como Executar o Bot

## ⚡ Opção 1: Testar Localmente (Recomendado para começar)

### Passo 1: Iniciar o site Next.js

Abra um **novo terminal** e execute:

```bash
cd "C:\Users\Antonio Nascimento\Desktop\jornalismo\portal-norte-43"
npm run dev
```

Aguarde aparecer: `✓ Ready on http://localhost:3000`

### Passo 2: Configurar bot para localhost

Edite `bot/.env` e mude:

```env
API_URL=http://localhost:3000
```

### Passo 3: Executar o bot

Em **outro terminal**:

```bash
cd "C:\Users\Antonio Nascimento\Desktop\jornalismo\portal-norte-43\bot"
python news_automation_bot.py
```

### Passo 4: Verificar

- Acesse: http://localhost:3000
- As notícias aparecem automaticamente!

---

## 🌐 Opção 2: Deploy no Vercel (Produção)

### Passo 1: Fazer deploy do site

```bash
cd "C:\Users\Antonio Nascimento\Desktop\jornalismo\portal-norte-43"

# Se ainda não fez deploy:
vercel

# Ou se já tem deploy:
vercel --prod
```

### Passo 2: Configurar bot para produção

Edite `bot/.env`:

```env
API_URL=https://portalnorte43.com.br
```

### Passo 3: Executar bot no VPS

No seu VPS:

```bash
cd /caminho/para/portal-norte-43/bot
python3 news_automation_bot.py
```

### Passo 4: Automatizar (Cron)

```bash
crontab -e
# Adicione:
0 */2 * * * cd /caminho/para/portal-norte-43/bot && /usr/bin/python3 news_automation_bot.py >> logs/cron.log 2>&1
```

---

## ✅ Qual usar?

- **Local**: Para testar e desenvolver
- **Vercel**: Para produção (bot no VPS)

