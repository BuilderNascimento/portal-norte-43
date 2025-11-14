# 📡 Status dos Feeds RSS

## ✅ Feeds Funcionando (2)

1. **Agência Brasil**
   - URL: `https://agenciabrasil.ebc.com.br/rss.xml`
   - Status: ✅ Funcionando
   - Itens: ~10 por feed
   - Categoria: Nacional

2. **Gov.br Notícias**
   - URL: `https://www.gov.br/pt-br/noticias/@@rss.xml`
   - Status: ✅ Funcionando
   - Itens: ~28 por feed
   - Categoria: Governo

## ❌ Feeds com Problemas (8)

Os seguintes feeds estão retornando XML malformado e foram **removidos temporariamente**:

1. Gov.br - Educação
2. Gov.br - Saúde
3. Gov.br - Infraestrutura
4. Gov.br - Cidades
5. INMET - Alertas
6. Defesa Civil Nacional
7. ANP - Agência Nacional do Petróleo
8. ANTT - Transportes Terrestres

**Erro**: `not well-formed (invalid token)` - XML malformado

## 💡 Solução

Com apenas 2 feeds funcionando, o bot ainda consegue:
- Buscar notícias da Agência Brasil (10 itens)
- Buscar notícias do Gov.br (28 itens)
- Total: ~38 notícias disponíveis

Isso é **suficiente** para o bot processar 2 notícias a cada 2 horas.

## 🔄 Como Adicionar Novos Feeds

Quando encontrar feeds RSS que funcionem, adicione em `bot/config.py`:

```python
{
    'name': 'Nome do Feed',
    'url': 'https://url-do-feed.rss',
    'category': 'Categoria'
}
```

Depois teste com: `python bot/test_feeds.py`

---

**Status**: ✅ Bot configurado com feeds funcionando!

