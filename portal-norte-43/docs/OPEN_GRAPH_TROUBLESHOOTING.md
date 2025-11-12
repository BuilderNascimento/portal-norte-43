# 🔍 Troubleshooting Open Graph - Imagens no Compartilhamento

## Problema: Imagem não aparece ao compartilhar

Se ao compartilhar um link apenas o título e link aparecem (sem imagem), siga este guia.

## ✅ Verificações Rápidas

### 1. Verificar Meta Tags

Acesse uma página de notícia e veja o código-fonte (Ctrl+U ou Cmd+U). Procure por:

```html
<meta property="og:image" content="https://portalnorte43.com.br/images/news/..." />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

**Se não aparecer**: O problema está na geração dos metadados.

**Se aparecer mas a URL estiver errada**: Verifique se a imagem existe nesse caminho.

### 2. Testar URL da Imagem

Copie a URL da imagem do `og:image` e cole no navegador. A imagem deve carregar diretamente.

**Se não carregar**: A imagem não está acessível publicamente.

### 3. Validar com Ferramentas

Use estas ferramentas para testar:

- **Facebook Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/
- **WhatsApp**: Compartilhe o link e veja o preview

## 🔧 Soluções Comuns

### Problema 1: Imagem não é acessível publicamente

**Sintoma**: A URL da imagem retorna 404 ou erro de acesso.

**Solução**:
1. Verifique se a imagem existe em `/public/images/news/`
2. Certifique-se de que o arquivo está commitado no Git
3. Verifique se o caminho está correto (case-sensitive)

### Problema 2: URL da imagem está relativa

**Sintoma**: `og:image` mostra `/images/news/...` ao invés de `https://portalnorte43.com.br/images/news/...`

**Solução**: Já corrigido no código! A função `normalizeImageUrl` garante URLs absolutas.

### Problema 3: Cache do Facebook/WhatsApp

**Sintoma**: A imagem antiga aparece mesmo após corrigir.

**Solução** (NÃO precisa de conta no Facebook):
1. Acesse: https://developers.facebook.com/tools/debug/ (é público, sem login)
2. Cole a URL da página no campo "Enter URL to scrape"
3. Clique em "Debug" ou "Scrape Again" para limpar o cache
4. Aguarde 2-5 minutos e teste novamente

**Alternativa sem Facebook Debugger**:
- Adicione um parâmetro único à URL: `?v=1234567890`
- Isso força o WhatsApp/Facebook a buscar como se fosse novo

### Problema 4: Formato de imagem não suportado

**Sintoma**: A imagem existe mas não aparece no preview.

**Solução**:
- Use formatos: JPG, PNG, WebP
- Tamanho recomendado: 1200x630px (proporção 1.91:1)
- Tamanho máximo: 8MB
- Evite SVG para OG (use PNG/JPG)

### Problema 5: CORS ou Headers incorretos

**Sintoma**: A imagem carrega no navegador mas não no preview.

**Solução**: Verifique se o servidor permite acesso público à imagem (sem autenticação).

## 🧪 Como Testar Localmente

### 1. Verificar Meta Tags

```bash
# No terminal, acesse uma página de notícia
curl https://portalnorte43.com.br/[slug-da-noticia] | grep "og:image"
```

### 2. Testar URL da Imagem

```bash
# Teste se a imagem é acessível
curl -I https://portalnorte43.com.br/images/news/chuva.png
```

Deve retornar `200 OK` e `Content-Type: image/png` ou similar.

### 3. Validar HTML

Use o validador W3C ou ferramentas de preview:
- https://validator.w3.org/
- https://search.google.com/test/rich-results

## 📋 Checklist de Validação

Antes de reportar problema, verifique:

- [ ] A imagem existe em `/public/images/news/`
- [ ] A URL no `og:image` é absoluta (começa com `https://`)
- [ ] A imagem é acessível quando acessada diretamente
- [ ] O tamanho da imagem é adequado (1200x630px recomendado)
- [ ] O formato é suportado (JPG, PNG, WebP)
- [ ] O cache foi limpo no Facebook Debugger
- [ ] A variável `NEXT_PUBLIC_APP_URL` está configurada corretamente

## 🚀 Melhorias Implementadas

### 1. Normalização de URLs

A função `normalizeImageUrl` garante que todas as URLs sejam:
- Absolutas (com domínio completo)
- Com HTTPS
- Sem espaços (codificados como %20)
- Sem caracteres problemáticos

### 2. Meta Tags Adicionais

Adicionadas tags extras para melhor compatibilidade:
- `og:image:secure_url`
- `og:image:width`
- `og:image:height`
- `og:image:type`

### 3. Configuração de Domínio

O `next.config.ts` agora permite imagens do domínio próprio:
- `portalnorte43.com.br`
- `www.portalnorte43.com.br`

## 📞 Se Ainda Não Funcionar

1. **Verifique os logs do servidor** para erros
2. **Teste com uma imagem externa** (ex: Unsplash) para isolar o problema
3. **Verifique o console do navegador** para erros de carregamento
4. **Use o Network tab** do DevTools para ver se a imagem está sendo carregada

## 🔗 Links Úteis

- [Open Graph Protocol](https://ogp.me/)
- [Facebook Sharing Best Practices](https://developers.facebook.com/docs/sharing/webmasters)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [WhatsApp Link Previews](https://faq.whatsapp.com/general/chats/how-to-use-link-previews)

---

**Última atualização**: 12/11/2025

