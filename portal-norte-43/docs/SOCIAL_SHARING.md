# 📱 Compartilhamento Social - Open Graph e Twitter Cards

## O que foi implementado

O Portal Norte 43 agora possui metadados completos para compartilhamento social, permitindo que links compartilhados apareçam com preview rico (imagem, título, descrição) no WhatsApp, Facebook, Twitter e outras redes sociais.

## Metadados configurados

### Open Graph (Facebook, WhatsApp, LinkedIn)
- `og:title` - Título da notícia
- `og:description` - Resumo da notícia
- `og:image` - Imagem da notícia (1200x630px recomendado)
- `og:url` - URL completa do artigo
- `og:type` - `article` (para artigos)
- `og:site_name` - "Portal Norte 43"
- `og:locale` - `pt_BR`
- `article:published_time` - Data de publicação
- `article:author` - Fonte da notícia
- `article:section` - Categoria

### Twitter Cards
- `twitter:card` - `summary_large_image`
- `twitter:title` - Título da notícia
- `twitter:description` - Resumo da notícia
- `twitter:image` - Imagem da notícia

## Como funciona

1. **Metadados dinâmicos**: Cada página de artigo (`/[slug]`) gera metadados específicos baseados no conteúdo da notícia
2. **URLs absolutas**: As imagens são convertidas para URLs absolutas automaticamente
3. **Fallback**: Se não encontrar a notícia, retorna metadados padrão

## Como testar

### 1. Teste com ferramentas online

**Facebook Debugger:**
- Acesse: https://developers.facebook.com/tools/debug/
- Cole a URL do artigo
- Clique em "Debugar"
- Veja o preview como aparecerá no Facebook/WhatsApp

**Twitter Card Validator:**
- Acesse: https://cards-dev.twitter.com/validator
- Cole a URL do artigo
- Veja o preview como aparecerá no Twitter

**LinkedIn Post Inspector:**
- Acesse: https://www.linkedin.com/post-inspector/
- Cole a URL do artigo
- Veja o preview como aparecerá no LinkedIn

### 2. Teste real

1. **WhatsApp:**
   - Abra uma conversa no WhatsApp
   - Cole o link do artigo
   - Aguarde alguns segundos
   - O preview deve aparecer automaticamente

2. **Facebook:**
   - Compartilhe o link em uma publicação
   - O preview deve aparecer automaticamente

3. **Twitter:**
   - Compartilhe o link em um tweet
   - O preview deve aparecer automaticamente

## Requisitos das imagens

Para melhor resultado, as imagens devem:
- **Tamanho recomendado**: 1200x630 pixels (proporção 1.91:1)
- **Formato**: JPG ou PNG
- **Tamanho máximo**: 8MB
- **URL absoluta**: A imagem deve estar acessível via URL completa

## Troubleshooting

### Preview não aparece

1. **Cache das redes sociais:**
   - Facebook/WhatsApp cacheiam metadados
   - Use o Facebook Debugger para forçar atualização
   - Clique em "Buscar Novas Informações"

2. **URL da imagem:**
   - Verifique se a imagem está acessível publicamente
   - A URL deve ser absoluta (começar com `http://` ou `https://`)
   - Teste a URL da imagem diretamente no navegador

3. **Metadados não gerados:**
   - Verifique se a notícia existe
   - Verifique os logs do servidor
   - Teste a URL diretamente no navegador e veja o código-fonte

### Imagem não aparece

1. **Tamanho da imagem:**
   - Imagens muito pequenas podem não aparecer
   - Recomendado: mínimo 600x315 pixels

2. **Formato não suportado:**
   - Use JPG ou PNG
   - Evite SVG (algumas redes não suportam)

3. **CORS:**
   - A imagem deve permitir acesso cross-origin
   - Verifique se não há bloqueios de CORS

## Variáveis de ambiente

Certifique-se de que `NEXT_PUBLIC_APP_URL` está configurado corretamente:

```env
NEXT_PUBLIC_APP_URL=https://seu-dominio.com
```

Ou no Vercel:
- Settings → Environment Variables
- Adicione: `NEXT_PUBLIC_APP_URL` com a URL do seu site

## Exemplo de metadados gerados

```html
<meta property="og:title" content="Homem sofre descarga elétrica de 11 mil volts e cai de escada em Andirá" />
<meta property="og:description" content="Vítima de 52 anos ficou gravemente ferida..." />
<meta property="og:image" content="https://portal-norte-43.vercel.app/images/news/descarga-eletrica-andira nova.png" />
<meta property="og:url" content="https://portal-norte-43.vercel.app/homem-sofre-descarga-eletrica-11-mil-volts-andira-11-11-2025" />
<meta property="og:type" content="article" />
```

## Próximos passos

- [ ] Adicionar metadados para a homepage
- [ ] Implementar Schema.org JSON-LD para SEO
- [ ] Adicionar metadados para categorias
- [ ] Otimizar tamanho das imagens automaticamente

---

**Última atualização**: 12/11/2025

