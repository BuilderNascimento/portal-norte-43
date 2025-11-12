# Como Configurar Google Analytics para Monitorar Acessos Diários

## Passo 1: Criar Conta no Google Analytics

1. Acesse: https://analytics.google.com/
2. Faça login com sua conta Google
3. Clique em "Começar a medir" ou "Criar conta"
4. Preencha os dados:
   - **Nome da conta**: Portal Norte 43
   - **Nome da propriedade**: Portal Norte 43
   - **Fuso horário**: (GMT-03:00) Brasília
   - **Moeda**: Real brasileiro (R$)

## Passo 2: Obter o ID de Medição (GA4)

1. Após criar a propriedade, você verá uma tela de "Configuração de fluxo de dados"
2. Selecione "Web"
3. Configure:
   - **URL do site**: https://portalnorte43.com.br
   - **Nome do fluxo**: Portal Norte 43 Web
4. Clique em "Criar fluxo"
5. Você receberá um **ID de Medição** (formato: `G-XXXXXXXXXX`)

## Passo 3: Adicionar ao Projeto

1. Copie o ID de Medição (exemplo: `G-ABC123XYZ`)
2. No Vercel, vá em **Settings** → **Environment Variables**
3. Adicione uma nova variável:
   - **Name**: `NEXT_PUBLIC_GA_ID`
   - **Value**: `G-ABC123XYZ` (seu ID real)
   - **Environment**: Production, Preview, Development
4. Clique em **Save**
5. Faça um novo deploy (ou aguarde o próximo deploy automático)

## Passo 4: Verificar Instalação

1. Acesse seu site: https://portalnorte43.com.br
2. Navegue por algumas páginas
3. No Google Analytics, vá em **Relatórios** → **Tempo real**
4. Você deve ver visitantes aparecendo em tempo real (pode levar alguns minutos)

## Como Ver Acessos Diários

### Relatório Padrão (Visão Geral)
1. No Google Analytics, vá em **Relatórios** → **Visão geral**
2. Você verá:
   - **Usuários**: Total de visitantes únicos
   - **Sessões**: Total de visitas
   - **Visualizações de página**: Total de páginas visualizadas
   - **Taxa de rejeição**: % de visitantes que saíram sem interagir

### Relatório Diário Detalhado
1. No menu lateral, vá em **Relatórios** → **Engajamento** → **Páginas e telas**
2. Use o filtro de data no canto superior direito
3. Selecione o período desejado (hoje, últimos 7 dias, etc.)

### Personalizar Relatório
1. Clique em **Personalizar relatório** (ícone de lápis)
2. Adicione métricas como:
   - Usuários por dia
   - Sessões por dia
   - Páginas mais visitadas
   - Origem do tráfego

## Métricas Importantes

- **Usuários**: Visitantes únicos (pessoas diferentes)
- **Sessões**: Visitas totais (uma pessoa pode ter várias sessões)
- **Visualizações de página**: Total de páginas visualizadas
- **Duração média da sessão**: Tempo que as pessoas ficam no site
- **Taxa de rejeição**: % de visitantes que saem sem interagir (ideal: < 50%)

## Dicas

1. **Aguarde 24-48h** para dados completos aparecerem
2. Use o **modo de tempo real** para ver visitantes no momento
3. Configure **Metas** para rastrear ações importantes (ex: cliques em "Anuncie Conosco")
4. Use **Filtros** para ver dados de cidades específicas ou origens de tráfego

## Alternativas (se não quiser usar Google Analytics)

### 1. Vercel Analytics (se estiver no plano Pro)
- Já integrado com Vercel
- Dados de performance e analytics

### 2. Plausible Analytics
- Focado em privacidade
- Pago (mas barato)
- Mais simples que GA

### 3. Umami
- Open source
- Self-hosted
- Gratuito

## Suporte

Se tiver dúvidas sobre o Google Analytics, consulte:
- Documentação oficial: https://support.google.com/analytics
- Central de ajuda: https://support.google.com/analytics/answer/1008015

