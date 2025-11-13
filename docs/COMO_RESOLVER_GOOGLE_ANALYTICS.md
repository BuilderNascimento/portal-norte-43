# Como Resolver: "A recolha de dados não está ativa"

## ✅ Passo 1: Verificar se a variável de ambiente está configurada no Vercel

1. Acesse: https://vercel.com
2. Faça login e selecione o projeto **portal-norte-43**
3. Vá em **Settings** (Configurações) → **Environment Variables** (Variáveis de Ambiente)
4. Procure por `NEXT_PUBLIC_GA_ID`
5. Se **NÃO existir**, adicione:
   - **Key**: `NEXT_PUBLIC_GA_ID`
   - **Value**: `G-NEBFPK44Y4`
   - **Environment**: Marque todas (Production, Preview, Development)
   - Clique em **Save**

## ✅ Passo 2: Fazer um novo deploy

Após adicionar a variável de ambiente:

1. No Vercel, vá em **Deployments**
2. Clique nos **3 pontinhos** (⋯) do último deploy
3. Selecione **Redeploy**
4. Ou faça um commit/push para acionar deploy automático

**Importante**: Variáveis de ambiente só são aplicadas em novos deploys!

## ✅ Passo 3: Verificar se o código está no site

Após o deploy, acesse: https://portalnorte43.com.br

1. Abra o **Console do navegador** (F12 → Console)
2. Digite: `window.dataLayer`
3. Se aparecer um array `[]`, o Google Analytics está carregando
4. Verifique também na aba **Network** se há requisições para `googletagmanager.com`

## ✅ Passo 4: Testar no Google Analytics

1. Acesse: https://analytics.google.com
2. Vá em **Relatórios** → **Tempo real**
3. Abra o site em outra aba: https://portalnorte43.com.br
4. Navegue por algumas páginas
5. Volte ao Google Analytics - você deve ver "1 usuário ativo"

**Nota**: Pode levar 5-10 minutos para aparecer dados no tempo real.

## 🔍 Verificação Manual (Alternativa)

Se ainda não funcionar após 48 horas, você pode verificar manualmente:

1. Acesse o site: https://portalnorte43.com.br
2. Abra o **Código-fonte** (Ctrl+U ou botão direito → Ver código-fonte)
3. Procure por `G-NEBFPK44Y4` (use Ctrl+F)
4. Se encontrar, o código está sendo carregado
5. Se não encontrar, a variável de ambiente não está configurada corretamente

## ⚠️ Problemas Comuns

### Problema 1: Variável não encontrada
**Solução**: Verifique se o nome está exatamente como `NEXT_PUBLIC_GA_ID` (case-sensitive)

### Problema 2: Deploy não foi feito
**Solução**: Variáveis de ambiente só funcionam após um novo deploy. Faça um redeploy.

### Problema 3: ID incorreto
**Solução**: Verifique se o ID está correto: `G-NEBFPK44Y4` (sem espaços)

### Problema 4: Bloqueador de anúncios
**Solução**: Desative bloqueadores de anúncios (uBlock, AdBlock) temporariamente para testar

## 📞 Próximos Passos

Após seguir todos os passos:
1. Aguarde 24-48 horas para dados completos
2. Verifique em **Relatórios** → **Visão geral** para ver estatísticas diárias
3. Use **Tempo real** para ver visitantes no momento

## ✅ Checklist Final

- [ ] Variável `NEXT_PUBLIC_GA_ID` adicionada no Vercel
- [ ] Valor da variável: `G-NEBFPK44Y4`
- [ ] Deploy feito após adicionar a variável
- [ ] Site acessado e navegado
- [ ] Aguardado 5-10 minutos
- [ ] Verificado no Google Analytics → Tempo real

Se todos os itens estiverem marcados e ainda não funcionar, pode ser necessário aguardar até 48 horas para o Google Analytics detectar o código.

