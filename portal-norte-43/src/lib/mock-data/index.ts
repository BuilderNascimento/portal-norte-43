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
  content?: string; // Conteúdo completo do artigo
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'collaborator';
  password: string;
}

export type AdPlacement = 'header' | 'sidebar' | 'infeed' | 'top';

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
    id: 102,
    slug: 'inmet-alerta-temporal-norte-pioneiro-andira-regiao-zona-risco-12-11-2025',
    title: 'INMET emite alerta de temporal para o Norte Pioneiro; Andirá e região estão na zona de risco',
    summary:
      'Alerta válido até quinta-feira (14) prevê chuvas intensas de até 100mm/dia, ventos de até 100 km/h, possibilidade de granizo e risco de alagamentos. Defesa Civil reforça orientações de segurança para 280+ cidades do Paraná.',
    city: 'Andirá',
    category: 'Geral',
    status: 'approved',
    publishedAt: '2025-11-12T18:00:00-03:00',
    source: 'INMET / Defesa Civil',
    image: '/images/news/chuva.png',
    content: `O Instituto Nacional de Meteorologia (INMET) emitiu um alerta de temporal válido para Andirá, Londrina, Norte Pioneiro e mais de 280 cidades do Paraná.

O aviso é válido da meia-noite desta quarta-feira (13) até 23h59 de quinta-feira (14) e indica risco de tempestades fortes em diversas regiões do estado.

Entre os principais fenômenos previstos estão:

• Chuvas intensas entre 30 e 60 mm/h, podendo chegar a 100 mm/dia;
• Ventos fortes de até 100 km/h;
• Possibilidade de granizo;
• Risco de alagamentos, quedas de árvores e danos em redes elétricas.

O cenário é causado pela formação de um sistema de baixa pressão entre Argentina e Paraguai, somado ao avanço de uma frente fria pelo oceano, deixando o clima ainda mais instável.

A Defesa Civil reforça as orientações de segurança:

• Evite se abrigar debaixo de árvores;
• Não estacione veículos perto de postes ou placas;
• Durante as tempestades, evite usar aparelhos elétricos ligados na tomada;
• Fique atento aos comunicados oficiais e boletins de atualização.

Telefones de emergência:

• Defesa Civil: 199
• Corpo de Bombeiros: 193

Atenção redobrada nas próximas horas. Cuidado e prevenção salvam vidas — compartilhe esta informação com familiares e vizinhos.`,
  },
  {
    id: 101,
    slug: 'motociclista-gravemente-ferido-colisao-onibus-br369-andira-12-11-2025',
    title: 'Motociclista fica gravemente ferido após colisão com ônibus na BR-369, em Andirá',
    summary:
      'Vítima de 38 anos se envolveu em acidente com ônibus da Viação Garcia na madrugada desta terça-feira. Impacto foi na lateral do veículo, resultando em traumatismo. Vítima foi levada ao Hospital Municipal e deverá ser transferida para unidade de referência.',
    city: 'Andirá',
    category: 'Trânsito',
    status: 'approved',
    publishedAt: '2025-11-12T14:30:00-03:00',
    source: 'Portal Norte 43',
    image: '/images/news/garcia.png',
    content: `Um motociclista de aproximadamente 38 anos ficou gravemente ferido após se envolver em um acidente com um ônibus da Viação Garcia na madrugada desta terça-feira (12), em Andirá, no Norte Pioneiro do Paraná.

De acordo com informações locais, a batida ocorreu na BR-369, nas proximidades da sede da Defesa Civil da cidade. O impacto foi na lateral do ônibus, resultando em traumatismo no condutor da moto.

Equipes do SAMU e da Defesa Civil foram acionadas e prestaram os primeiros atendimentos no local. A vítima foi levada ao Hospital Municipal de Andirá e, devido à gravidade dos ferimentos, deverá ser transferida para outra unidade de referência da região.

As causas do acidente ainda estão sendo apuradas.`,
  },
  {
    id: 100,
    slug: 'homem-sofre-descarga-eletrica-11-mil-volts-andira-11-11-2025',
    title: 'Homem sofre descarga elétrica de 11 mil volts e cai de escada em Andirá',
    summary:
      'Vítima de 52 anos ficou gravemente ferida após choque elétrico na BR-369. Equipes do SAMU e Defesa Civil atenderam no local. Homem foi transferido para Bandeirantes com queimaduras de alta intensidade e traumatismo craniano.',
    city: 'Andirá',
    category: 'Geral',
    status: 'approved',
    publishedAt: '2025-11-12T10:00:00-03:00',
    source: 'Portal Norte 43',
    image: '/images/news/descarga-eletrica-andira-nova.png',
    content: `Um homem de aproximadamente 52 anos ficou gravemente ferido após sofrer uma descarga elétrica de cerca de 11 mil volts na manhã de segunda-feira (11), em Andirá, no Norte Pioneiro do Paraná.

De acordo com informações apuradas, o acidente ocorreu nas margens da BR-369, quilômetro 39, próximo ao aterro sanitário da cidade. A vítima realizava um trabalho em altura quando, após o choque, caiu de uma escada de cerca de seis metros.

Equipes do SAMU e da Defesa Civil foram acionadas para o atendimento. O homem apresentava queimaduras de alta intensidade e traumatismo na cabeça, além de outras lesões.

Ele foi encaminhado inicialmente ao Pronto-Socorro de Andirá e, posteriormente, transferido pelo SAMU para a cidade de Bandeirantes, onde permanece em observação e deve passar por exames complementares.`,
  },
];

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'Ana Souza',
    email: 'ana.souza@portaln43.com',
    role: 'admin',
    password: 'admin123',
  },
  {
    id: 2,
    name: 'Bruno Lima',
    email: 'bruno.lima@portaln43.com',
    role: 'collaborator',
    password: 'colab123',
  },
];

export const mockAds: AdBanner[] = [
  {
    id: 1,
    image: '/images/ads/clinica-popular.svg',
    link: 'https://www.clinicapopular.com.br',
    position: 'header',
    label: 'Clínica Popular',
  },
  {
    id: 2,
    image: '/images/ads/supermercado-norte.svg',
    link: 'https://www.supermercadonorte.com.br',
    position: 'sidebar',
    label: 'Supermercado Norte',
  },
  {
    id: 3,
    image: '/images/ads/radio-n43.svg',
    link: 'https://www.radion43.com.br',
    position: 'infeed',
    label: 'Rádio Portal Norte 43',
  },
  {
    id: 4,
    image: '/images/ads/clinica-popular.svg',
    link: 'https://www.clinicapopular.com.br',
    position: 'top',
    label: 'Banner Topo',
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

/**
 * Busca uma notícia pelo slug
 */
export async function getNewsBySlug(slug: string) {
  await simulateDelay();
  return mockNews.find(news => news.slug === slug) || null;
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
