# 🔄 Como Limpar Cache de Compartilhamento (Sem Conta)

## 📱 Facebook/WhatsApp (Facebook Debugger)

### Passo a Passo:

1. **Acesse o Facebook Debugger** (não precisa de login):
   - URL: https://developers.facebook.com/tools/debug/

2. **Cole a URL da notícia**:
   - Exemplo: `https://portalnorte43.com.br/inmet-alerta-temporal-norte-pioneiro-andira-regiao-zona-risco-12-11-2025`
   - Cole no campo "Enter URL to scrape"

3. **Clique em "Debug"** ou "Scrape Again":
   - Isso força o Facebook a buscar novamente as informações da página
   - Limpa o cache antigo

4. **Aguarde alguns minutos** (2-5 minutos):
   - O Facebook precisa processar a atualização

5. **Teste compartilhar novamente**:
   - Compartilhe o link no WhatsApp ou Facebook
   - A imagem deve aparecer agora

### ⚠️ Importante:
- **Não precisa de login** - o Facebook Debugger é público
- **Funciona para WhatsApp também** - WhatsApp usa o mesmo sistema do Facebook
- **Pode demorar alguns minutos** para atualizar

---

## 🐦 Twitter/X

### Passo a Passo:

1. **Acesse o Twitter Card Validator**:
   - URL: https://cards-dev.twitter.com/validator
   - **Não precisa de login** para validar

2. **Cole a URL da notícia**

3. **Clique em "Preview card"**

4. **Se necessário, clique em "Request new card"** para limpar cache

---

## 💼 LinkedIn

### Passo a Passo:

1. **Acesse o LinkedIn Post Inspector**:
   - URL: https://www.linkedin.com/post-inspector/
   - **Precisa de login no LinkedIn** (mas não precisa ser conta do site)

2. **Cole a URL da notícia**

3. **Clique em "Inspect"**

---

## 📱 WhatsApp (Método Alternativo)

Se o Facebook Debugger não funcionar, tente:

1. **Adicione um parâmetro único à URL**:
   - Exemplo: `https://portalnorte43.com.br/noticia?t=1234567890`
   - Isso força o WhatsApp a buscar novamente

2. **Ou use uma URL encurtada diferente**:
   - Crie um novo link encurtado (bit.ly, etc.)
   - O WhatsApp vai buscar como se fosse novo

---

## 🔍 Verificar se Está Funcionando

### 1. Ver Meta Tags no Código-Fonte

1. Acesse a página da notícia no navegador
2. Clique com botão direito → "Ver código-fonte" (ou Ctrl+U)
3. Procure por `og:image`
4. Verifique se a URL está correta e absoluta

### 2. Testar URL da Imagem Diretamente

1. Copie a URL do `og:image` (ex: `https://portalnorte43.com.br/images/news/chuva.png`)
2. Cole no navegador
3. A imagem deve carregar diretamente

**Se não carregar**: A imagem não está acessível publicamente.

### 3. Usar Ferramenta Online

- **Open Graph Checker**: https://www.opengraph.xyz/
- **Meta Tags Checker**: https://metatags.io/
- **Social Share Preview**: https://socialsharepreview.com/

Essas ferramentas mostram como o link aparece quando compartilhado.

---

## 🚨 Problemas Comuns

### Problema: "Ainda não aparece a imagem"

**Soluções**:
1. Aguarde mais tempo (pode levar até 10 minutos)
2. Tente limpar o cache novamente
3. Verifique se a imagem existe e está acessível
4. Verifique se a URL no `og:image` está correta

### Problema: "Facebook Debugger mostra erro"

**Possíveis causas**:
- URL incorreta
- Site não está acessível publicamente
- Meta tags malformadas

**Solução**: Verifique o código-fonte da página.

### Problema: "Imagem aparece no Debugger mas não no WhatsApp"

**Solução**: 
- Aguarde alguns minutos (cache do WhatsApp pode demorar mais)
- Tente compartilhar em uma conversa diferente
- Use uma URL com parâmetro único (`?v=2`)

---

## ✅ Checklist Rápido

Antes de testar, verifique:

- [ ] A imagem existe em `/public/images/news/`
- [ ] A URL no código-fonte é absoluta (`https://portalnorte43.com.br/...`)
- [ ] A imagem carrega quando acessada diretamente
- [ ] O cache foi limpo no Facebook Debugger
- [ ] Aguardou alguns minutos após limpar o cache

---

## 📞 Se Nada Funcionar

1. **Verifique os logs do servidor** para erros
2. **Teste com uma imagem externa** (ex: Unsplash) para isolar o problema
3. **Verifique o console do navegador** para erros
4. **Use o Network tab** do DevTools para ver se a imagem está sendo carregada

---

**Última atualização**: 12/11/2025

