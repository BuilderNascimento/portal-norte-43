# 🧪 Como Testar Open Graph - Passo a Passo

## ✅ Teste Rápido (5 minutos)

### 1. Verificar Meta Tags no Código-Fonte

1. Acesse uma página de notícia: `https://portalnorte43.com.br/[slug-da-noticia]`
2. Pressione **Ctrl+U** (ou Cmd+U no Mac) para ver o código-fonte
3. Procure por `og:image` (Ctrl+F)
4. Você deve ver algo como:
   ```html
   <meta property="og:image" content="https://portalnorte43.com.br/images/news/chuva.png" />
   ```

**Se não aparecer**: O problema está na geração dos metadados.

**Se aparecer**: Continue para o próximo passo.

### 2. Testar URL da Imagem

1. Copie a URL do `og:image` (ex: `https://portalnorte43.com.br/images/news/chuva.png`)
2. Cole no navegador e pressione Enter
3. **A imagem deve carregar diretamente**

**Se não carregar**: A imagem não está acessível publicamente.

**Se carregar**: Continue para o próximo passo.

### 3. Limpar Cache do Facebook/WhatsApp

1. Acesse: https://developers.facebook.com/tools/debug/ (não precisa de login)
2. Cole a URL da notícia completa
3. Clique em **"Debug"** ou **"Scrape Again"**
4. Aguarde 2-5 minutos
5. Teste compartilhar novamente

---

## 🔍 Verificação Detalhada

### Verificar Todas as Meta Tags

No código-fonte, você deve ver:

```html
<!-- Open Graph -->
<meta property="og:type" content="article" />
<meta property="og:title" content="Título da Notícia" />
<meta property="og:description" content="Resumo da notícia..." />
<meta property="og:url" content="https://portalnorte43.com.br/slug" />
<meta property="og:image" content="https://portalnorte43.com.br/images/news/..." />
<meta property="og:image:secure_url" content="https://portalnorte43.com.br/images/news/..." />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name" content="Portal Norte 43" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Título da Notícia" />
<meta name="twitter:description" content="Resumo..." />
<meta name="twitter:image" content="https://portalnorte43.com.br/images/news/..." />
```

---

## 🚨 Problemas Comuns e Soluções

### Problema: Imagem não aparece no preview

**Causas possíveis**:
1. Cache do Facebook/WhatsApp (mais comum)
2. Imagem não acessível publicamente
3. URL da imagem incorreta
4. Formato de imagem não suportado

**Soluções**:
1. Limpe o cache no Facebook Debugger
2. Verifique se a imagem carrega diretamente no navegador
3. Verifique se a URL no `og:image` está correta
4. Use formatos: JPG, PNG, WebP (evite SVG)

### Problema: Apenas título e link aparecem

**Causa**: Meta tags não estão sendo renderizadas ou imagem não está acessível.

**Solução**:
1. Verifique o código-fonte (Ctrl+U)
2. Procure por `og:image`
3. Se não aparecer, há problema na geração dos metadados
4. Se aparecer, teste a URL da imagem diretamente

---

## 📱 Testar em Diferentes Plataformas

### WhatsApp
- Compartilhe o link em uma conversa
- O preview deve aparecer automaticamente
- Se não aparecer, limpe o cache no Facebook Debugger

### Telegram
- Compartilhe o link em uma conversa
- O preview deve aparecer automaticamente
- Telegram usa Open Graph padrão

### Facebook
- Cole o link em um post
- O preview deve aparecer automaticamente
- Use o Facebook Debugger para limpar cache

### Twitter/X
- Cole o link em um tweet
- O preview deve aparecer automaticamente
- Use o Twitter Card Validator para testar

---

## ✅ Checklist Final

Antes de reportar problema, verifique:

- [ ] Meta tags aparecem no código-fonte (Ctrl+U)
- [ ] URL da imagem é absoluta (começa com `https://`)
- [ ] Imagem carrega quando acessada diretamente
- [ ] Cache foi limpo no Facebook Debugger
- [ ] Aguardou alguns minutos após limpar cache
- [ ] Testou em diferentes plataformas (WhatsApp, Telegram, Facebook)

---

## 🔗 Ferramentas Úteis

- **Facebook Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **Open Graph Checker**: https://www.opengraph.xyz/
- **Meta Tags Checker**: https://metatags.io/

---

**Última atualização**: 12/11/2025

