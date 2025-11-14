# 🔍 Como Verificar Erros do Bot

## 📊 Ver os Logs Completos

1. **Acesse**: https://github.com/BuilderNascimento/portal-norte-43/actions

2. **Clique na execução que falhou** (a que tem o ❌ vermelho)

3. **Clique em**: "process-news" (o job)

4. **Expanda cada step** para ver os logs detalhados

## 🔍 O que procurar nos logs:

### ✅ Se funcionou:
```
✅ Bot executado com sucesso!
📰 Notícias encontradas: X
🔄 Notícias processadas: X
✅ Notícias publicadas: X
```

### ❌ Se deu erro, procure por:

1. **Erro de API Key**:
   - `ANTHROPIC_API_KEY não configurada`
   - `OPENAI_API_KEY não configurada`
   - **Solução**: Verifique se as secrets estão configuradas

2. **Erro de conexão**:
   - `ConnectionError`
   - `Timeout`
   - **Solução**: Problema temporário, tente novamente

3. **Erro ao publicar**:
   - `401 Unauthorized`
   - `403 Forbidden`
   - **Solução**: Verifique se a API_KEY está correta

4. **Nenhuma notícia nova**:
   - `Nenhuma notícia nova encontrada`
   - **Isso é NORMAL!** Não é um erro

## 🧪 Testar Novamente

Após verificar os logs:

1. Vá em: https://github.com/BuilderNascimento/portal-norte-43/actions
2. Clique em "🤖 Bot Automatizado de Notícias"
3. Clique em "Run workflow"
4. Aguarde e veja os logs

## 📝 Me Envie

Se ainda der erro, me envie:
- O erro completo dos logs
- Qual step falhou
- A mensagem de erro exata

---

**💡 Dica**: O bot agora não falha se não houver notícias novas - isso é normal!

