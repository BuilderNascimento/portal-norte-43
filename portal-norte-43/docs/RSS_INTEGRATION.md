# 📡 Integração com Feeds RSS

## Visão Geral

O Portal Norte 43 agora integra automaticamente notícias de fontes oficiais brasileiras através de feeds RSS, combinando-as com as notícias locais mockadas.

## Fontes Configuradas

Atualmente, o sistema busca notícias de:

1. **Agência Brasil (EBC)**
   - URL: `https://agenciabrasil.ebc.com.br/rss.xml`
   - Categoria: Nacional
   - Limite: 10 notícias por feed

2. **Agência Brasil - Últimas Notícias**
   - URL: `https://agenciabrasil.ebc.com.br/ultimas-noticias/rss`
   - Categoria: Nacional
   - Limite: 10 notícias por feed

3. **Gov.br Notícias**
   - URL: `https://www.gov.br/pt-br/noticias/@@rss.xml`
   - Categoria: Governo
   - Limite: 10 notícias por feed

## Como Funciona

### 1. Busca de Feeds

O sistema busca notícias de todos os feeds RSS configurados em paralelo usando `Promise.all()` para otimizar performance.

### 2. Processamento

Cada item do feed RSS é transformado em um `NewsItem` com:
- **Título**: Limitado a 150 caracteres
- **Resumo**: Primeiros 200 caracteres do conteúdo (HTML removido)
- **Cidade**: "Brasil" (para notícias nacionais)
- **Categoria**: Definida por feed (Nacional, Governo, Educação)
- **Imagem**: Extraída do conteúdo HTML ou placeholder padrão
- **Slug**: Gerado automaticamente a partir do título e data

### 3. Agregação

As notícias dos feeds RSS são combinadas com as notícias mockadas locais e ordenadas por data (mais recentes primeiro).

### 4. Cache

- **API `/api/rss`**: Cache de 5 minutos (300 segundos)
- **API `/api/news`**: Cache de 5 minutos (300 segundos)
- **Homepage**: Revalida a cada requisição (SSR)

## Estrutura de Arquivos

```
src/
├── lib/
│   ├── rss-feeds/
│   │   └── index.ts          # Lógica de busca e parse de RSS
│   └── news-aggregator/
│       └── index.ts          # Combina notícias mockadas + RSS
├── app/
│   ├── api/
│   │   └── rss/
│   │       └── route.ts      # Endpoint para buscar apenas RSS
│   └── page.tsx              # Homepage (usa agregador)
```

## Endpoints

### GET `/api/rss`

Retorna apenas notícias dos feeds RSS (sem mockadas).

**Resposta:**
```json
{
  "count": 20,
  "items": [
    {
      "id": 1234567890,
      "slug": "titulo-da-noticia-2025-11-12",
      "title": "Título da Notícia",
      "summary": "Resumo da notícia...",
      "city": "Brasil",
      "category": "Nacional",
      "status": "approved",
      "publishedAt": "2025-11-12T10:00:00.000Z",
      "source": "Agência Brasil",
      "image": "https://..."
    }
  ],
  "updatedAt": "2025-11-12T10:05:00.000Z"
}
```

### GET `/api/news`

Retorna notícias agregadas (mockadas + RSS) com suporte a filtros.

**Query Parameters:**
- `city`: Filtrar por cidade
- `category`: Filtrar por categoria

**Exemplo:**
```
GET /api/news?category=Nacional
GET /api/news?city=Brasil
```

## Adicionar Novos Feeds

Para adicionar um novo feed RSS, edite `src/lib/rss-feeds/index.ts`:

```typescript
export const RSS_FEEDS: RSSFeedSource[] = [
  // ... feeds existentes
  {
    name: 'Nome do Feed',
    url: 'https://exemplo.com/rss',
    category: 'Categoria',
  },
];
```

## Tratamento de Erros

- Se um feed falhar (404, timeout, etc.), o sistema continua funcionando
- Apenas as notícias dos feeds que funcionaram serão exibidas
- Erros são logados no console para debug
- O site nunca quebra por causa de feeds RSS

## Testando

### 1. Teste Local

```bash
# Iniciar servidor
npm run dev

# Acessar homepage
http://localhost:3000

# Testar endpoint RSS
http://localhost:3000/api/rss

# Testar endpoint agregado
http://localhost:3000/api/news
```

### 2. Verificar Logs

Os erros de feeds aparecem no console do servidor durante o build e runtime.

### 3. Teste em Produção

Após deploy no Vercel:
- Acesse: `https://seu-projeto.vercel.app/api/rss`
- Verifique se as notícias estão aparecendo na homepage

## Limitações

1. **Rate Limiting**: Alguns feeds podem ter rate limiting
2. **CORS**: Feeds devem permitir acesso cross-origin
3. **Formato**: Apenas feeds RSS/XML são suportados
4. **Imagens**: Nem todos os feeds incluem imagens, usando placeholder quando necessário

## Próximos Passos

- [ ] Adicionar mais feeds oficiais
- [ ] Implementar cache persistente (Redis/Upstash)
- [ ] Adicionar filtro por fonte
- [ ] Melhorar extração de imagens
- [ ] Adicionar categorização automática por palavras-chave

## Troubleshooting

### Feeds retornando 404

1. Verifique se a URL do feed está correta
2. Teste a URL diretamente no navegador
3. Verifique se o feed requer autenticação
4. Alguns feeds podem ter mudado de URL

### Notícias não aparecem

1. Verifique os logs do servidor
2. Teste o endpoint `/api/rss` diretamente
3. Verifique se os feeds estão retornando dados válidos
4. Confirme que o cache não está desatualizado

### Imagens não carregam

1. Verifique se o domínio está em `next.config.ts` → `images.remotePatterns`
2. Alguns feeds podem não incluir imagens
3. O sistema usa placeholder quando não há imagem

---

**Última atualização**: 12/11/2025

