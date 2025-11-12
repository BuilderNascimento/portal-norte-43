# 🌤️ Configuração da API de Clima

Este guia explica como configurar a integração com APIs de clima para exibir temperatura e condições climáticas em tempo real no Portal Norte 43.

## 📋 Opções de APIs Disponíveis

### 1. OpenWeatherMap (Recomendado) ✅

**Vantagens:**
- Plano gratuito: 1.000 chamadas/dia
- Fácil de configurar
- Dados precisos
- Suporte a português

**Como obter a API Key:**

1. Acesse: https://openweathermap.org/api
2. Clique em "Sign Up" (criar conta)
3. Preencha o formulário
4. Confirme o email
5. Acesse: https://home.openweathermap.org/api_keys
6. Copie sua API Key

**Limite gratuito:**
- 60 chamadas/minuto
- 1.000 chamadas/dia
- Dados atuais + previsão 5 dias

### 2. WeatherAPI (Alternativa)

**Vantagens:**
- Plano gratuito: 1 milhão de chamadas/mês
- Mais generoso no plano gratuito
- Dados detalhados

**Como obter a API Key:**

1. Acesse: https://www.weatherapi.com/
2. Clique em "Sign Up"
3. Preencha o formulário
4. Confirme o email
5. Acesse: https://www.weatherapi.com/my/
6. Copie sua API Key

**Limite gratuito:**
- 1 milhão de chamadas/mês
- Dados atuais + previsão 3 dias

## ⚙️ Configuração

### Passo 1: Obter API Key

Escolha uma das APIs acima e obtenha sua chave.

### Passo 2: Adicionar Variável de Ambiente

#### Opção A: OpenWeatherMap

Adicione no `.env.local` (local) ou nas variáveis de ambiente do Vercel:

```bash
OPENWEATHER_API_KEY=sua_chave_aqui
```

#### Opção B: WeatherAPI

```bash
WEATHERAPI_KEY=sua_chave_aqui
```

### Passo 3: Configurar no Vercel

1. Acesse seu projeto no Vercel
2. Vá em **Settings** → **Environment Variables**
3. Adicione a variável:
   - **Name**: `OPENWEATHER_API_KEY` (ou `WEATHERAPI_KEY`)
   - **Value**: Sua chave da API
   - **Environment**: Production, Preview, Development
4. Clique em **Save**
5. Faça um novo deploy

### Passo 4: Testar

Após o deploy, o widget de clima no topo do site deve mostrar dados reais.

## 🔧 Como Funciona

### Cache

- **Cache no servidor**: 10 minutos (Next.js ISR)
- **Cache no cliente**: 10 minutos (localStorage)
- Isso reduz chamadas à API e melhora performance

### Fallback

Se a API não estiver disponível ou retornar erro:
- O sistema usa dados mockados automaticamente
- O site continua funcionando normalmente
- Não há impacto na experiência do usuário

### Coordenadas

O sistema busca dados para **Andirá, PR**:
- Latitude: -23.0525
- Longitude: -50.2264

Para mudar a cidade, edite `src/lib/weather/index.ts`.

## 📊 Monitoramento

### Verificar Uso da API

**OpenWeatherMap:**
- Acesse: https://home.openweathermap.org/usage
- Veja quantas chamadas foram feitas hoje

**WeatherAPI:**
- Acesse: https://www.weatherapi.com/my/
- Veja estatísticas de uso

### Otimizações

O sistema já está otimizado:
- ✅ Cache de 10 minutos
- ✅ Fallback automático
- ✅ Tratamento de erros
- ✅ Limite de chamadas respeitado

## 🐛 Troubleshooting

### Widget não mostra dados reais

1. Verifique se a variável de ambiente está configurada
2. Verifique se a API Key está correta
3. Verifique os logs do Vercel para erros
4. Teste a API diretamente:
   ```
   https://api.openweathermap.org/data/2.5/weather?lat=-23.0525&lon=-50.2264&appid=SUA_CHAVE&units=metric&lang=pt_br
   ```

### Erro 401 (Unauthorized)

- API Key inválida ou expirada
- Verifique se copiou a chave corretamente
- Gere uma nova chave se necessário

### Erro 429 (Too Many Requests)

- Limite de chamadas excedido
- Aguarde ou faça upgrade do plano
- O cache ajuda a reduzir chamadas

### Dados não atualizam

- O cache é de 10 minutos
- Aguarde ou limpe o cache do navegador
- Verifique se o deploy foi feito corretamente

## 💡 Dicas

1. **Use OpenWeatherMap** se quiser simplicidade
2. **Use WeatherAPI** se precisar de mais chamadas
3. **Monitore o uso** para não exceder limites
4. **Cache é seu amigo** - reduz custos e melhora performance

## 🔄 Alternar entre APIs

O código suporta ambas as APIs. Para alternar:

1. Configure a variável de ambiente da API desejada
2. O sistema detecta automaticamente qual usar
3. Se ambas estiverem configuradas, OpenWeatherMap tem prioridade

## 📞 Suporte

- **OpenWeatherMap**: https://openweathermap.org/faq
- **WeatherAPI**: https://www.weatherapi.com/support/

---

**Última atualização**: 13/11/2025

**Status**: ✅ Integração pronta - apenas configure a API Key

