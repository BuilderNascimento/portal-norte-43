# Configuração do Domínio portalnorte43.com.br

Este guia explica como configurar o domínio `portalnorte43.com.br` na Vercel.

## Pré-requisitos

- ✅ Domínio `portalnorte43.com.br` comprado
- ✅ Projeto já deployado na Vercel
- ✅ Acesso ao painel de controle do domínio (registro.br ou similar)

## Passo 1: Configurar Domínio na Vercel

1. Acesse o [Dashboard da Vercel](https://vercel.com/dashboard)
2. Selecione o projeto `portal-norte-43`
3. Vá em **Settings** → **Domains**
4. Clique em **Add Domain**
5. Digite: `portalnorte43.com.br`
6. Clique em **Add**

## Passo 2: Configurar DNS no Registro.br

A Vercel fornecerá instruções de DNS. Você precisará configurar os seguintes registros:

### Opção A: Usando Registros A (Recomendado)

No painel do Registro.br, vá em **DNS** e adicione:

```
Tipo: A
Nome: @
Valor: 76.76.21.21
TTL: 3600
```

Para o subdomínio `www`:

```
Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
TTL: 3600
```

### Opção B: Usando CNAME (Alternativa)

Se preferir usar apenas CNAME:

```
Tipo: CNAME
Nome: @
Valor: cname.vercel-dns.com
TTL: 3600
```

**Nota:** Nem todos os registradores permitem CNAME na raiz (@). Se o seu não permitir, use a Opção A.

## Passo 3: Atualizar Variáveis de Ambiente

1. Na Vercel, vá em **Settings** → **Environment Variables**
2. Atualize ou adicione:
   - `NEXT_PUBLIC_APP_URL`: `https://portalnorte43.com.br`
3. Clique em **Save**
4. Faça um novo deploy para aplicar as mudanças

## Passo 4: Verificar Configuração

Após configurar o DNS, aguarde a propagação (pode levar de alguns minutos a 48 horas):

1. Verifique o status na Vercel (Settings → Domains)
2. Teste o acesso em: `https://portalnorte43.com.br`
3. Verifique se o SSL/HTTPS está ativo (a Vercel configura automaticamente)

## Passo 5: Redirecionamento (Opcional)

Se quiser redirecionar `www.portalnorte43.com.br` para `portalnorte43.com.br`:

1. Na Vercel, adicione também o domínio `www.portalnorte43.com.br`
2. Configure o redirecionamento em Settings → Domains

## Troubleshooting

### DNS não está propagando
- Aguarde até 48 horas para propagação completa
- Use ferramentas como [whatsmydns.net](https://www.whatsmydns.net) para verificar

### Erro de SSL
- A Vercel configura SSL automaticamente
- Aguarde alguns minutos após a propagação do DNS

### Domínio não aparece na Vercel
- Verifique se os registros DNS estão corretos
- Confirme que o domínio está apontando para os IPs da Vercel

## Comandos Úteis

Para verificar o DNS localmente:

```bash
# Verificar registros A
nslookup portalnorte43.com.br

# Verificar registros CNAME
nslookup www.portalnorte43.com.br
```

## Próximos Passos

Após configurar o domínio:

1. ✅ Atualizar variáveis de ambiente na Vercel
2. ✅ Fazer novo deploy
3. ✅ Testar acesso ao domínio
4. ✅ Verificar SSL/HTTPS
5. ✅ Atualizar links internos se necessário

