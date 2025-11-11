# PRD - Portal Norte 43

## Visão Geral
O Portal Norte 43 é um site de notícias automatizado que cobre os principais acontecimentos do Norte Pioneiro do Paraná. O objetivo é oferecer informação atualizada, confiável e acessível tanto para o público local quanto para empresas que desejam anunciar seus serviços na região.

## Objetivos
- Objetivo principal: Disponibilizar uma plataforma automatizada de notícias regionais com atualização contínua.
- Objetivos secundários:
  - Atrair comerciantes e anunciantes locais com oportunidades claras de patrocínio.
  - Facilitar a colaboração de correspondentes de campo para envio e revisão de matérias.
  - Integrar automações (n8n/Supabase) para distribuição e publicação eficiente de conteúdos.

## Público-Alvo
- Leitores locais interessados em notícias regionais das cidades de Andirá, Cambará, Bandeirantes, Cornélio Procópio e arredores.
- Comerciantes e anunciantes que buscam visibilidade regional.
- Colaboradores e correspondentes que desejam enviar notícias de campo.

## Funcionalidades Core
- Feed de notícias em tempo real com integração a n8n/Supabase.
- Painel administrativo leve (`/admin`) para revisar, aprovar e editar matérias enviadas.
- Página “Anuncie Conosco” com planos e formulário de contato para comerciantes locais.
- Busca e categorias com filtros por cidade e tema (Polícia, Trânsito, Economia, Esportes, etc.).
- Integração com redes sociais para compartilhamento rápido e automações de publicação.

## Requisitos Técnicos
- Framework: Next.js 15.x com App Router
- UI: Shadcn/ui + Tailwind CSS
- Linguagem: TypeScript
- Autenticação: Login restrito para administradores e colaboradores
- Dados: Mock data inicialmente (sem banco de dados)
- Deploy: A definir (ex.: Vercel)

## Requisitos de Segurança (OWASP Top 10)
1. **Broken Access Control**: Implementar RBAC e validação de permissões
2. **Cryptographic Failures**: HTTPS obrigatório, dados sensíveis criptografados
3. **Injection**: Validação e sanitização de inputs, prepared statements
4. **Insecure Design**: Threat modeling, princípio do menor privilégio
5. **Security Misconfiguration**: Headers de segurança, CORS configurado
6. **Vulnerable Components**: Auditoria regular de dependências
7. **Authentication Failures**: Rate limiting, senhas fortes, 2FA
8. **Data Integrity Failures**: Validação de serialização, CSRF tokens
9. **Security Logging**: Logs de segurança, monitoramento
10. **SSRF**: Validação de URLs, whitelist de domínios

## Métricas de Sucesso
- Performance: LCP < 2.5s, FID < 100ms
- Segurança: 0 vulnerabilidades críticas
- UX: Taxa de conclusão > 80%

