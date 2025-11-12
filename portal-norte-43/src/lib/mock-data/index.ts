import { z } from 'zod';

export type NewsStatus = 'draft' | 'pending' | 'approved';

export interface NewsItem {
  id: number;
  slug: string;
  title: string;
  summary: string;
  city: string;
  category: string;
  status: NewsStatus;
  publishedAt: string;
  source: string;
  image: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'collaborator';
  password: string;
}

export type AdPlacement = 'header' | 'sidebar' | 'infeed';

export interface AdBanner {
  id: number;
  image: string;
  link: string;
  position: AdPlacement;
  label: string;
}

const NEWS_STATUSES: NewsStatus[] = ['draft', 'pending', 'approved'];

export const mockNews: NewsItem[] = [
  {
    id: 100,
    slug: 'homem-sofre-descarga-eletrica-11-mil-volts-andira-11-11-2025',
    title: 'Homem sofre descarga elétrica de 11 mil volts e cai de escada em Andirá',
    summary:
      'Vítima de 52 anos ficou gravemente ferida após choque elétrico na BR-369. Equipes do SAMU e Defesa Civil atenderam no local. Homem foi transferido para Bandeirantes com queimaduras de alta intensidade e traumatismo craniano.',
    city: 'Andirá',
    category: 'Geral',
    status: 'approved',
    publishedAt: '2025-11-11T14:30:00-03:00',
    source: 'Portal Norte 43',
    image: '/images/news/descarga-eletrica-andira.png',
  },
  {
    id: 1,
    slug: 'maringa-alerta-tempestade-11-11-2025',
    title: 'Maringá entra em alerta de tempestade com rajadas de até 100 km/h',
    summary:
      'O Inmet emitiu aviso de tempestade para Maringá e mais 360 cidades do Paraná. Defesa Civil orienta moradores a redobrarem cuidados.',
    city: 'Maringá',
    category: 'Geral',
    status: 'approved',
    publishedAt: '2025-11-11T09:00:00-03:00',
    source: 'Plantão Maringá',
    image: '/images/news/tempestade-maringa.svg',
  },
  {
    id: 2,
    slug: 'presidente-camara-marialva-descumpre-liminar',
    title: 'Presidente da Câmara de Marialva ignora liminar e retira projeto da pauta',
    summary:
      'Mesmo após decisão judicial, Rafael Poly manteve o PLC 11/2025 fora da votação. Sessão terminou com protestos da comunidade.',
    city: 'Marialva',
    category: 'Política',
    status: 'approved',
    publishedAt: '2025-11-11T11:30:00-03:00',
    source: 'Plantão Maringá',
    image: '/images/news/marialva-camara.svg',
  },
  {
    id: 3,
    slug: 'motociclista-fechado-avenida-colombo',
    title: 'Motociclista fica ferido após ser fechado na Avenida Colombo',
    summary:
      'Jovem de 25 anos sofreu escoriações e foi encaminhado ao HU de Maringá depois de colisão envolvendo duas motos no cruzamento com a Rua Arlindo Planas.',
    city: 'Maringá',
    category: 'Trânsito',
    status: 'approved',
    publishedAt: '2025-11-11T08:15:00-03:00',
    source: 'Plantão Maringá',
    image: '/images/news/acidente-colombo.svg',
  },
  {
    id: 4,
    slug: 'luxo-abandonado-empresario-desaparecido',
    title: 'Câmeras registram homem abandonando carro de empresário desaparecido',
    summary:
      'Veículo de Luiz Gustavo Mazurquini foi encontrado no bairro Zona 7. Polícia investiga imagens que mostram homem deixando o carro e saindo a pé.',
    city: 'Maringá',
    category: 'Policial',
    status: 'pending',
    publishedAt: '2025-11-11T10:40:00-03:00',
    source: 'Plantão Maringá',
    image: '/images/news/carro-abandonado.svg',
  },
  {
    id: 5,
    slug: 'jovem-sepultado-comocao-maringa',
    title: 'Comunidade se despede de jovem morto em acidente na Avenida Colombo',
    summary:
      'Guilherme Rodrigues da Silva Neto, 22 anos, foi sepultado sob forte comoção no Cemitério Municipal de Maringá.',
    city: 'Maringá',
    category: 'Cidade',
    status: 'approved',
    publishedAt: '2025-11-10T17:45:00-03:00',
    source: 'Plantão Maringá',
    image: '/images/news/velorio-maringa.svg',
  },
  {
    id: 6,
    slug: 'colisao-avenida-tuiuti',
    title: 'Mulher fica ferida em colisão entre dois carros na Avenida Tuiuti',
    summary:
      'Acidente envolveu veículo de aplicativo e Fiat Uno no cruzamento com a Rua 28 de Junho. Vítima foi encaminhada consciente ao hospital.',
    city: 'Maringá',
    category: 'Trânsito',
    status: 'pending',
    publishedAt: '2025-11-10T14:20:00-03:00',
    source: 'Plantão Maringá',
    image: '/images/news/colisao-tuiuti.svg',
  },
  {
    id: 7,
    slug: 'detentos-ajudam-rio-bonito-iguacu',
    title: 'Detentos ajudam na reconstrução de Rio Bonito do Iguaçu após tornado',
    summary:
      'Força-tarefa com apenados auxilia na limpeza e reconstrução da cidade devastada por tornado na última sexta-feira.',
    city: 'Rio Bonito do Iguaçu',
    category: 'Geral',
    status: 'approved',
    publishedAt: '2025-11-10T09:10:00-03:00',
    source: 'Plantão Maringá',
    image: '/images/news/tornado-rio-bonito.svg',
  },
  {
    id: 8,
    slug: 'colaborador-envia-video-agressao',
    title: 'Investigação sobre agressão a adolescente em Mandaguari avança',
    summary:
      'Polícia Civil cumpriu mandado de prisão preventiva contra suspeito flagrado pisando na cabeça de uma jovem de 17 anos.',
    city: 'Mandaguari',
    category: 'Policial',
    status: 'pending',
    publishedAt: '2025-11-11T07:50:00-03:00',
    source: 'Correspondente N43',
    image: '/images/news/agressao-mandaguari.svg',
  },
];

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'Ana Paula Souza',
    email: 'ana.souza@portaln43.com',
    role: 'admin',
    password: 'admin123',
  },
  {
    id: 2,
    name: 'Bruno Almeida',
    email: 'bruno.almeida@portaln43.com',
    role: 'collaborator',
    password: 'colaborador123',
  },
];

export const mockAds: AdBanner[] = [
  {
    id: 1,
    image: '/images/ads/supermercado-norte.svg',
    link: 'https://anunciante1.com',
    position: 'header',
    label: 'Supermercado Norte',
  },
  {
    id: 2,
    image: '/images/ads/clinica-popular.svg',
    link: 'https://anunciante2.com',
    position: 'sidebar',
    label: 'Clínica Popular Mais Saúde',
  },
  {
    id: 3,
    image: '/images/ads/radio-n43.svg',
    link: 'https://anunciante3.com',
    position: 'infeed',
    label: 'Rádio Portal Norte 43',
  },
];

export const newsFilterSchema = z.object({
  city: z.string().optional(),
  category: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const adminKeySchema = z.object({
  adminKey: z.string().min(8),
});

export const simulateDelay = (ms: number = 400) =>
  new Promise(resolve => setTimeout(resolve, ms));

export async function getPublishedNews(filters?: z.infer<typeof newsFilterSchema>) {
  const safeFilters = newsFilterSchema.parse(filters ?? {});
  await simulateDelay();
  return mockNews.filter(news => {
    if (news.status !== 'approved') {
      return false;
    }

    const matchesCity = safeFilters.city ? news.city === safeFilters.city : true;
    const matchesCategory = safeFilters.category ? news.category === safeFilters.category : true;

    return matchesCity && matchesCategory;
  });
}

export async function getPendingNews() {
  await simulateDelay();
  return mockNews.filter(news => news.status === 'pending');
}

export async function authenticateUser(email: string, password: string) {
  const validation = loginSchema.safeParse({ email, password });
  if (!validation.success) {
    return null;
  }

  const user = mockUsers.find(
    mockUser => mockUser.email === validation.data.email && mockUser.password === validation.data.password,
  );

  return user ?? null;
}

export function getAvailableCities() {
  return Array.from(new Set(mockNews.map(news => news.city))).sort();
}

export function getAvailableCategories() {
  return Array.from(new Set(mockNews.map(news => news.category))).sort();
}

export function getAdsByPosition(position: AdPlacement) {
  return mockAds.filter(ad => ad.position === position);
}

export function isValidNewsStatus(status: string): status is NewsStatus {
  return NEWS_STATUSES.includes(status as NewsStatus);
}

export function verifyAdminKey(value: string | null | undefined) {
  if (!value) {
    return false;
  }
  const expectedKey = process.env.ADMIN_API_KEY ?? 'mock-admin-key';
  return value === expectedKey;
}

