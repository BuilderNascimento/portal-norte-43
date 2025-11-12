# 🌐 Configurar Domínio portalnorte43.com.br

Guia passo a passo para configurar seu domínio na Vercel.

## 📋 Passo 1: Adicionar Domínio na Vercel

1. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecione o projeto **portal-norte-43**
3. Vá em **Settings** (Configurações)
4. Clique em **Domains** (Domínios)
5. Clique em **Add Domain** (Adicionar Domínio)
6. Digite: `portalnorte43.com.br`
7. Clique em **Add** (Adicionar)

A Vercel mostrará instruções de DNS. **Anote essas informações!**

## 📋 Passo 2: Configurar DNS no Registro.br

### Opção A: Usando Registro A (Recomendado)

1. Acesse [registro.br](https://registro.br)
2. Faça login na sua conta
3. Vá em **Meus Domínios** → **portalnorte43.com.br**
4. Clique em **DNS** ou **Gerenciar DNS**
5. Adicione os seguintes registros:

#### Para o domínio principal (@):
```
Tipo: A
Nome: @
Valor: 76.76.21.21
TTL: 3600
```

#### Para o subdomínio www:
```
Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
TTL: 3600
```

**⚠️ IMPORTANTE:** A Vercel pode fornecer um IP diferente. Use o IP que aparecer nas instruções da Vercel!

### Opção B: Se a Vercel fornecer outros valores

Siga exatamente as instruções que aparecem na tela da Vercel após adicionar o domínio.

## 📋 Passo 3: Atualizar Variável de Ambiente

1. Na Vercel, vá em **Settings** → **Environment Variables**
2. Procure por `NEXT_PUBLIC_APP_URL`
3. Se existir, edite. Se não existir, clique em **Add New**
4. Configure:
   - **Key:** `NEXT_PUBLIC_APP_URL`
   - **Value:** `https://portalnorte43.com.br`
   - **Environment:** Production (e Preview se quiser)
5. Clique em **Save**

## 📋 Passo 4: Fazer Novo Deploy

Após atualizar a variável de ambiente:

1. Vá em **Deployments**
2. Clique nos três pontos (⋯) do último deploy
3. Selecione **Redeploy**
4. Ou faça um commit/push no GitHub (deploy automático)

## 📋 Passo 5: Aguardar Propagação DNS

- ⏱️ **Tempo médio:** 15 minutos a 2 horas
- ⏱️ **Tempo máximo:** 48 horas (raro)

Você pode verificar a propagação em:
- [whatsmydns.net](https://www.whatsmydns.net/#A/portalnorte43.com.br)
- [dnschecker.org](https://dnschecker.org/#A/portalnorte43.com.br)

## 📋 Passo 6: Verificar Status na Vercel

1. Vá em **Settings** → **Domains**
2. Verifique o status do domínio:
   - ✅ **Valid Configuration** = Tudo certo!
   - ⚠️ **Pending** = Aguardando propagação DNS
   - ❌ **Invalid Configuration** = Verifique os DNS novamente

## 📋 Passo 7: Testar o Site

Após a propagação:

1. Acesse: `https://portalnorte43.com.br`
2. Verifique se o SSL/HTTPS está ativo (cadeado verde)
3. Teste o compartilhamento de links (WhatsApp, Facebook)
4. Verifique se as imagens carregam corretamente

## 🔧 Troubleshooting

### DNS não está propagando
- Aguarde até 48 horas
- Verifique se os registros estão corretos no Registro.br
- Use ferramentas de verificação DNS

### Erro de SSL/HTTPS
- A Vercel configura SSL automaticamente
- Aguarde alguns minutos após a propagação do DNS
- Se persistir, verifique o status na Vercel

### Domínio não aparece na Vercel
- Verifique se digitou corretamente: `portalnorte43.com.br`
- Confirme que os registros DNS estão apontando para a Vercel
- Aguarde a propagação DNS

### Site não carrega
- Verifique se o deploy foi concluído
- Confirme que a variável `NEXT_PUBLIC_APP_URL` está configurada
- Verifique os logs na Vercel (Deployments → View Function Logs)

## ✅ Checklist Final

- [ ] Domínio adicionado na Vercel
- [ ] DNS configurado no Registro.br
- [ ] Variável `NEXT_PUBLIC_APP_URL` atualizada
- [ ] Novo deploy realizado
- [ ] Aguardado propagação DNS (15min - 2h)
- [ ] Status "Valid Configuration" na Vercel
- [ ] Site acessível em `https://portalnorte43.com.br`
- [ ] SSL/HTTPS funcionando
- [ ] Compartilhamento de links testado

## 🎉 Pronto!

Seu site estará disponível em:
- **Principal:** https://portalnorte43.com.br
- **Com www:** https://www.portalnorte43.com.br (se configurado)

---

**Dúvidas?** Verifique a [documentação oficial da Vercel](https://vercel.com/docs/concepts/projects/domains)

