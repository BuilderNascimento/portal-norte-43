# 🤖 Como Usar o Bot - Guia Rápido

## 📍 Onde Executar o Bot?

Você tem **3 opções principais**:

---

## ✅ OPÇÃO 1: Executar no Seu Computador (Mais Simples)

### Passo a Passo:

1. **Abra o Terminal/Prompt de Comando**
   - Windows: Pressione `Win + R`, digite `cmd` e Enter
   - Mac/Linux: Abra o Terminal

2. **Navegue até a pasta do projeto**
   ```bash
   cd "C:\Users\Antonio Nascimento\Desktop\jornalismo\portal-norte-43"
   ```

3. **Execute o bot**
   ```bash
   npm run bot:process
   ```

4. **Pronto!** O bot vai processar os feeds e você verá o resultado na tela.

### ⚠️ Limitação:
- Só funciona quando seu computador está ligado
- Precisa executar manualmente toda vez

---

## ✅ OPÇÃO 2: Executar no Vercel (Recomendado - Automático)

O bot roda **automaticamente no servidor do Vercel**, sem precisar do seu computador.

### Passo a Passo:

1. **Configure a API Key no Vercel:**
   - Acesse: https://vercel.com
   - Vá no seu projeto → Settings → Environment Variables
   - Adicione:
     - **Name**: `AUTOMATION_API_KEY`
     - **Value**: `portal-norte-43-auto-2025` (ou crie um token seu)
   - Clique em "Save"

2. **Atualize o arquivo `vercel.json`:**
   - Abra o arquivo `vercel.json` no projeto
   - Substitua `YOUR_API_KEY_HERE` pela mesma API key que você configurou
   - Salve o arquivo

3. **Faça commit e push:**
   ```bash
   git add vercel.json
   git commit -m "config: atualizar API key do cron"
   git push
   ```

4. **Pronto!** O Vercel vai executar o bot automaticamente a cada 30 minutos.

### ✅ Vantagens:
- ✅ Funciona 24/7, mesmo com seu PC desligado
- ✅ Totalmente automático
- ✅ Não precisa fazer nada

---

## ✅ OPÇÃO 3: Executar no GitHub Actions (Automático)

O bot roda automaticamente no GitHub, sem precisar do seu computador.

### Passo a Passo:

1. **Configure os Secrets no GitHub:**
   - Acesse: https://github.com/seu-usuario/portal-norte-43
   - Vá em: Settings → Secrets and variables → Actions
   - Clique em "New repository secret"
   - Adicione:
     - **Name**: `AUTOMATION_API_KEY`
     - **Value**: `portal-norte-43-auto-2025` (ou crie um token seu)
   - Clique em "Add secret"

2. **Pronto!** O GitHub vai executar o bot automaticamente a cada 30 minutos.

### ✅ Vantagens:
- ✅ Funciona 24/7, mesmo com seu PC desligado
- ✅ Totalmente automático
- ✅ Grátis (GitHub Actions tem limite generoso)

---

## 🎯 Qual Opção Escolher?

| Opção | Quando Usar | Vantagens |
|-------|-------------|-----------|
| **Opção 1** (Seu PC) | Para testar agora | Simples, rápido |
| **Opção 2** (Vercel) | Para produção | Automático, já está no mesmo lugar do site |
| **Opção 3** (GitHub) | Alternativa ao Vercel | Automático, grátis |

## 🚀 Recomendação

**Use a Opção 2 (Vercel)** porque:
- ✅ Seu site já está no Vercel
- ✅ É mais simples de configurar
- ✅ Tudo fica em um lugar só

---

## 📝 Teste Rápido Agora

Para testar se está funcionando, execute no seu computador:

```bash
cd "C:\Users\Antonio Nascimento\Desktop\jornalismo\portal-norte-43"
npm run bot:process
```

Você verá algo assim:
```
🤖 Portal Norte 43 - Bot de Processamento de Notícias
============================================================
📡 Conectando em: https://portalnorte43.com.br
⏰ Iniciado em: 12/11/2025 23:30:00

📊 Verificando status atual...
   ✅ Total de notícias: 0
   📅 Última atualização: Nunca
   📰 Feeds processados: 0

🔄 Processando feeds RSS...
   ✅ Processamento concluído!
   📰 Notícias adicionadas: 15
   📊 Total de notícias: 15
   ⏱️  Tempo de processamento: 2341ms
```

---

## ❓ Dúvidas?

- **"Preciso deixar meu PC ligado?"**
  - Só se usar Opção 1. Opções 2 e 3 funcionam sozinhas.

- **"Quantas vezes por dia roda?"**
  - A cada 30 minutos (48 vezes por dia).

- **"Posso mudar a frequência?"**
  - Sim, edite o `vercel.json` ou `.github/workflows/process-news.yml`.

- **"Como vejo se está funcionando?"**
  - Acesse: https://portalnorte43.com.br/api/automation/status

