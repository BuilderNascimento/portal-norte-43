# 📰 Como Adicionar Notícias ao Portal Norte 43

Este documento explica como você pode adicionar novas notícias ao portal de forma segura e legal.

## ✅ Fontes Permitidas

### 1. **Notícias do Governo (Sem necessidade de autorização)**
- ✅ Agência Brasil (EBC)
- ✅ Portal Gov.br
- ✅ MEC (Ministério da Educação)
- ✅ INMET (Instituto Nacional de Meteorologia)
- ✅ Defesa Civil
- ✅ Outros portais governamentais

**Requisito**: Apenas citar a fonte corretamente.

### 2. **Notícias Próprias**
- ✅ Notícias que você apura e escreve
- ✅ Notícias de colaboradores locais
- ✅ Notícias enviadas pelo formulário do site

**Requisito**: Fonte deve ser "Portal Norte 43" ou o nome do colaborador.

## ❌ Fontes NÃO Permitidas

- ❌ Plantão Maringá (não autoriza republicação)
- ❌ Outros portais regionais sem autorização
- ❌ Sites comerciais sem permissão
- ❌ Conteúdo protegido por direitos autorais

## 📋 Informações Necessárias para Adicionar uma Notícia

Para adicionar uma notícia, você precisa fornecer:

### 1. **Informações Básicas**
- **Título** (até 150 caracteres)
- **Resumo** (até 200 caracteres) - aparece nos cards
- **Cidade** (ex: Andirá, Bandeirantes, Cambará)
- **Categoria** (Política, Trânsito, Policial, Economia, Esportes, Geral)
- **Data e hora** (formato: YYYY-MM-DDTHH:mm:ss-03:00)
- **Fonte** (ex: "Portal Norte 43", "INMET", "Agência Brasil")

### 2. **Conteúdo**
- **Texto completo** da notícia (pode ter múltiplos parágrafos)
- Use quebras de linha para separar parágrafos

### 3. **Imagem**
- **Arquivo de imagem** (PNG, JPG ou SVG)
- **Nome do arquivo** (sem espaços, use hífens)
- Coloque na pasta: `public/images/news/`

### 4. **Slug** (gerado automaticamente)
- URL amigável baseada no título
- Exemplo: `inmet-alerta-temporal-norte-pioneiro-andira-regiao-zona-risco-12-11-2025`

## 📝 Formato de Exemplo

```typescript
{
  id: 103, // Próximo número sequencial
  slug: 'titulo-da-noticia-com-hifens-data',
  title: 'Título da Notícia (até 150 caracteres)',
  summary: 'Resumo curto que aparece nos cards (até 200 caracteres)',
  city: 'Andirá',
  category: 'Trânsito', // ou Política, Policial, Economia, Esportes, Geral
  status: 'approved',
  publishedAt: '2025-11-13T10:00:00-03:00', // Data/hora no fuso de Brasília
  source: 'Portal Norte 43', // ou nome da fonte governamental
  image: '/images/news/nome-do-arquivo.png',
  content: `Primeiro parágrafo da notícia.

Segundo parágrafo com mais detalhes.

Terceiro parágrafo com informações adicionais.`,
}
```

## 🔄 Processo de Adição

### Opção 1: Você me fornece os dados
Envie:
1. Título
2. Resumo
3. Texto completo
4. Cidade
5. Categoria
6. Data/hora
7. Fonte
8. Imagem (ou me diga o nome se já estiver na pasta)

Eu adiciono no código e faço o commit.

### Opção 2: Futuro - Integração com n8n
Quando configurarmos o n8n, você poderá:
- Enviar notícias via formulário do site
- Receber notificações no WhatsApp/Email
- Aprovar/rejeitar via dashboard
- Publicar automaticamente

## 📍 Onde as Notícias Ficam Armazenadas

**Arquivo**: `src/lib/mock-data/index.ts`

**Estrutura**:
- Array `mockNews` contém todas as notícias
- Ordenadas por data (mais recentes primeiro)
- IDs sequenciais (100, 101, 102, 103...)

## 🖼️ Sobre as Imagens

### Requisitos:
- **Formato**: PNG, JPG ou SVG
- **Tamanho recomendado**: 1200x630px (para redes sociais)
- **Nome do arquivo**: Sem espaços, use hífens
  - ✅ `chuva.png`
  - ✅ `descarga-eletrica-andira-nova.png`
  - ❌ `chuva 2.png` (com espaço)

### Localização:
```
public/images/news/
  ├── chuva.png
  ├── garcia.png
  ├── descarga-eletrica-andira-nova.png
  └── [sua-imagem].png
```

## ⚠️ Importante

1. **Sempre cite a fonte** corretamente
2. **Use apenas fontes permitidas** (governo ou próprias)
3. **Verifique direitos autorais** antes de republicar
4. **Mantenha o conteúdo atualizado** - remova notícias muito antigas se necessário

## 📞 Dúvidas?

Se tiver dúvidas sobre:
- Se uma fonte é permitida
- Como formatar uma notícia
- Onde colocar a imagem
- Qual categoria usar

Me envie uma mensagem e eu ajudo!

---

**Última atualização**: 13/11/2025

