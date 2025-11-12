# Portal Norte 43

Site de notícias automatizado para o Norte Pioneiro do Paraná, desenvolvido com Next.js 16, TypeScript, Tailwind CSS e Shadcn/ui.

## 🚀 Tecnologias

- **Next.js 16** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Shadcn/ui** - Componentes UI modernos
- **Zod** - Validação de dados
- **React Hook Form** - Gerenciamento de formulários

## 📋 Pré-requisitos

- Node.js 18+ 
- npm, yarn ou pnpm

## 🛠️ Instalação e Desenvolvimento

```bash
# Instalar dependências
npm install

# Executar servidor de desenvolvimento
npm run dev

# Build de produção (teste local)
npm run build

# Iniciar servidor de produção (após build)
npm start

# Verificar tipos TypeScript
npm run type-check

# Verificar código com ESLint
npm run lint
```

Acesse [http://localhost:3000](http://localhost:3000) para ver o site.

## 🌐 Deploy no Vercel

### Opção 1: Deploy via GitHub (Recomendado)

1. **Criar repositório no GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/portal-norte-43.git
   git push -u origin main
   ```

2. **Conectar ao Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com sua conta GitHub
   - Clique em "Add New Project"
   - Importe o repositório `portal-norte-43`
   - O Vercel detectará automaticamente as configurações do Next.js

3. **Configurar Variáveis de Ambiente**
   No painel do Vercel, vá em Settings → Environment Variables e adicione:
   ```
   NODE_ENV=production
   NEXT_PUBLIC_APP_URL=https://seu-projeto.vercel.app
   SESSION_SECRET=seu-secret-aleatorio-min-32-caracteres
   ADMIN_API_KEY=sua-api-key-segura-min-16-caracteres
   AUTH_SECRET=seu-auth-secret-aleatorio
   ```

4. **Deploy**
   - Clique em "Deploy"
   - Aguarde o build completar
   - Seu site estará disponível em `https://seu-projeto.vercel.app`

### Opção 2: Deploy via CLI do Vercel

```bash
# Instalar Vercel CLI globalmente
npm i -g vercel

# Fazer login
vercel login

# Deploy (primeira vez)
vercel

# Deploy de produção
vercel --prod
```

### Configurar Domínio Personalizado

1. No painel do Vercel, vá em **Settings → Domains**
2. Adicione seu domínio (ex: `portalnorte43.com.br`)
3. Siga as instruções para configurar os DNS:
   - Adicione um registro `A` apontando para o IP fornecido pelo Vercel
   - Ou adicione um registro `CNAME` apontando para `cname.vercel-dns.com`
4. Aguarde a propagação DNS (pode levar até 24h)
5. O Vercel configurará automaticamente o SSL/HTTPS

## 📁 Estrutura do Projeto

```
portal-norte-43/
├── src/
│   ├── app/              # Rotas e páginas (App Router)
│   │   ├── admin/        # Painel administrativo
│   │   ├── api/          # API Routes
│   │   └── page.tsx      # Homepage
│   ├── components/       # Componentes React
│   │   ├── features/     # Componentes de features
│   │   └── layout/       # Header, Footer
│   ├── lib/              # Utilitários e configurações
│   │   └── mock-data/    # Dados mockados
│   └── middleware.ts     # Middleware de segurança
├── public/               # Arquivos estáticos
├── docs/                 # Documentação
└── vercel.json          # Configuração do Vercel
```

## 🔐 Variáveis de Ambiente

Copie `.env.example` para `.env.local` e configure:

```bash
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
SESSION_SECRET=seu-secret-aleatorio
ADMIN_API_KEY=sua-api-key
AUTH_SECRET=seu-auth-secret
```

**⚠️ IMPORTANTE**: Nunca commite arquivos `.env.local` no Git!

## 📝 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run start` - Servidor de produção
- `npm run lint` - Verificar código com ESLint
- `npm run type-check` - Verificar tipos TypeScript

## 🎨 Features

- ✅ Feed de notícias em tempo real
- ✅ Painel administrativo com autenticação
- ✅ Filtros por cidade e categoria
- ✅ Página "Anuncie Conosco"
- ✅ API pública para integrações
- ✅ Design responsivo e moderno
- ✅ Segurança OWASP Top 10

## 📚 Documentação

- [PRD](./docs/PRD.md) - Product Requirements Document
- [Technical](./docs/TECHNICAL.md) - Documentação técnica

## 🤝 Contribuindo

1. Crie uma branch: `git checkout -b feature/nova-feature`
2. Commit suas mudanças: `git commit -m 'Adiciona nova feature'`
3. Push para a branch: `git push origin feature/nova-feature`
4. Abra um Pull Request

## 📄 Licença

Este projeto é privado e proprietário.

---

**Desenvolvido com ❤️ para o Norte Pioneiro do Paraná**
