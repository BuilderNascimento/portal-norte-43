# 🧪 Testar Bot Localmente

## Passo a Passo

### 1. Iniciar o servidor Next.js localmente

Abra um terminal e execute:

```bash
cd "C:\Users\Antonio Nascimento\Desktop\jornalismo\portal-norte-43"
npm run dev
```

O site vai rodar em: `http://localhost:3000`

### 2. Configurar o bot para usar localhost

Edite o arquivo `.env` na pasta `bot/`:

```env
# Mude de:
API_URL=https://portalnorte43.com.br

# Para:
API_URL=http://localhost:3000
```

### 3. Executar o bot

Em outro terminal:

```bash
cd "C:\Users\Antonio Nascimento\Desktop\jornalismo\portal-norte-43\bot"
python news_automation_bot.py
```

### 4. Verificar

- Acesse: http://localhost:3000
- As notícias devem aparecer na homepage

---

**Depois de testar localmente, faça o deploy no Vercel para produção!**

