# 🚀 Guia de Deploy - Portal Norte 43

Este guia detalha o processo completo de deploy do Portal Norte 43 no Vercel.

## 📋 Checklist Pré-Deploy

- [ ] Build local funcionando (`npm run build`)
- [ ] Testes passando (`npm run lint` e `npm run type-check`)
- [ ] Variáveis de ambiente documentadas
- [ ] Repositório Git configurado
- [ ] Código commitado e pushado

## 🔧 Passo a Passo

### 1. Preparação Local

```bash
# Testar build localmente
npm run build

# Se houver erros, corrigir antes de fazer deploy
npm run lint
npm run type-check
```

### 2. Criar Conta no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Sign Up"
3. Escolha "Continue with GitHub" (recomendado)
4. Autorize o acesso ao GitHub

### 3. Conectar Repositório

1. No dashboard do Vercel, clique em **"Add New Project"**
2. Selecione o repositório `portal-norte-43`
3. O Vercel detectará automaticamente:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### 4. Configurar Variáveis de Ambiente

No painel do projeto, vá em **Settings → Environment Variables** e adicione:

| Variável | Valor | Ambiente |
|----------|-------|----------|
| `NODE_ENV` | `production` | Production, Preview, Development |
| `NEXT_PUBLIC_APP_URL` | `https://seu-projeto.vercel.app` | Production |
| `SESSION_SECRET` | `[gerar string aleatória de 32+ caracteres]` | Production, Preview |
| `ADMIN_API_KEY` | `[gerar string aleatória de 16+ caracteres]` | Production, Preview |
| `AUTH_SECRET` | `[gerar string aleatória de 32+ caracteres]` | Production, Preview |

**💡 Dica**: Use um gerador de strings aleatórias:
```bash
# No terminal (Linux/Mac)
openssl rand -base64 32

# Ou use um gerador online: https://randomkeygen.com/
```

### 5. Fazer Deploy

1. Clique em **"Deploy"**
2. Aguarde o build completar (2-5 minutos)
3. Seu site estará disponível em: `https://seu-projeto.vercel.app`

### 6. Configurar Domínio Personalizado

1. No painel do Vercel, vá em **Settings → Domains**
2. Clique em **"Add Domain"**
3. Digite seu domínio (ex: `portalnorte43.com.br`)
4. Escolha o método de configuração:

   **Opção A - CNAME (Recomendado)**
   - Adicione um registro CNAME no seu provedor DNS:
     ```
     Tipo: CNAME
     Nome: @ (ou www)
     Valor: cname.vercel-dns.com
     ```

   **Opção B - A Record**
   - Adicione um registro A apontando para o IP fornecido pelo Vercel

5. Aguarde a propagação DNS (pode levar até 24h)
6. O Vercel configurará automaticamente SSL/HTTPS gratuito

### 7. Atualizar Variáveis de Ambiente

Após configurar o domínio, atualize:
```
NEXT_PUBLIC_APP_URL=https://seu-dominio.com.br
```

## 🔄 Deploys Automáticos

O Vercel faz deploy automático quando você:
- Faz push para a branch `main` → Deploy de produção
- Faz push para outras branches → Deploy de preview
- Abre um Pull Request → Deploy de preview

## 📊 Monitoramento

- **Analytics**: Vercel Analytics (gratuito) para métricas básicas
- **Logs**: Acesse **Deployments → [seu deploy] → Runtime Logs**
- **Performance**: Vercel Speed Insights (gratuito)

## 🐛 Troubleshooting

### Build falha

1. Verifique os logs no Vercel
2. Teste build local: `npm run build`
3. Verifique variáveis de ambiente
4. Verifique se todas as dependências estão no `package.json`

### Erro 500 em produção

1. Verifique logs de runtime no Vercel
2. Verifique se todas as variáveis de ambiente estão configuradas
3. Verifique se o `.env.local` não está sendo commitado

### Domínio não funciona

1. Verifique configuração DNS (use ferramentas como `dig` ou `nslookup`)
2. Aguarde até 24h para propagação DNS
3. Verifique se o domínio está apontando corretamente no Vercel

## 🔐 Segurança

- ✅ HTTPS automático (Vercel)
- ✅ Headers de segurança configurados
- ✅ Variáveis sensíveis em Environment Variables
- ✅ `.env.local` no `.gitignore`

## 📈 Próximos Passos

Após deploy bem-sucedido:
1. Configure Google Analytics (opcional)
2. Configure monitoramento de erros (Sentry, opcional)
3. Configure backup de dados (quando migrar para banco real)
4. Configure CDN para assets estáticos (já incluído no Vercel)

## 🆘 Suporte

- [Documentação Vercel](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/app/building-your-application/deploying)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

---

**✅ Deploy concluído com sucesso!**

