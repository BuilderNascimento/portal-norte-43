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
    publishedAt: '2025-11-12T10:00:00-03:00',
    source: 'Portal Norte 43',
    image: '/images/news/descarga-eletrica-andira nova.png',
    content: `Um homem de aproximadamente 52 anos ficou gravemente ferido após sofrer uma descarga elétrica de cerca de 11 mil volts na manhã de segunda-feira (11), em Andirá, no Norte Pioneiro do Paraná.

De acordo com informações apuradas, o acidente ocorreu nas margens da BR-369, quilômetro 39, próximo ao aterro sanitário da cidade. A vítima realizava um trabalho em altura quando, após o choque, caiu de uma escada de cerca de seis metros.

Equipes do SAMU e da Defesa Civil foram acionadas para o atendimento. O homem apresentava queimaduras de alta intensidade e traumatismo na cabeça, além de outras lesões.

Ele foi encaminhado inicialmente ao Pronto-Socorro de Andirá e, posteriormente, transferido pelo SAMU para a cidade de Bandeirantes, onde permanece em observação e deve passar por exames complementares.`,
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
    content: `O Instituto Nacional de Meteorologia (Inmet) emitiu aviso de tempestade para Maringá e mais 360 cidades do Paraná. O alerta prevê rajadas de vento de até 100 km/h, chuva intensa e possibilidade de granizo.

A Defesa Civil orienta moradores a redobrarem cuidados, evitar áreas de risco, não se abrigar debaixo de árvores e manter-se informado sobre as condições climáticas.`,
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
    content: `Mesmo após decisão judicial que determinava a inclusão do projeto na pauta, o presidente da Câmara de Marialva, Rafael Poly, manteve o PLC 11/2025 fora da votação durante a sessão desta segunda-feira.

A sessão terminou com protestos da comunidade presente no plenário, que exigia a votação do projeto conforme determinado pela Justiça.`,
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
    content: `Um motociclista de 25 anos ficou ferido após ser fechado por outro veículo na Avenida Colombo, em Maringá. O acidente ocorreu no cruzamento com a Rua Arlindo Planas.

A vítima sofreu escoriações e foi encaminhada ao Hospital Universitário de Maringá para atendimento. O trânsito ficou parcialmente interditado durante o atendimento.`,
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
    content: `O veículo de Luiz Gustavo Mazurquini, empresário desaparecido, foi encontrado no bairro Zona 7 de Maringá. Câmeras de segurança registraram um homem abandonando o carro e saindo a pé do local.

A Polícia Civil está investigando o caso e analisando as imagens para identificar o indivíduo que abandonou o veículo.`,
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
    content: `Guilherme Rodrigues da Silva Neto, de 22 anos, foi sepultado nesta segunda-feira (10) no Cemitério Municipal de Maringá, sob forte comoção de familiares e amigos.

O jovem perdeu a vida em um acidente de trânsito na Avenida Colombo no último sábado. A cerimônia reuniu dezenas de pessoas que prestaram a última homenagem.`,
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
    content: `Uma mulher ficou ferida em uma colisão entre dois carros na Avenida Tuiuti, em Maringá. O acidente envolveu um veículo de aplicativo e um Fiat Uno no cruzamento com a Rua 28 de Junho.

A vítima foi encaminhada consciente ao hospital para avaliação médica. O trânsito ficou parcialmente interditado durante o atendimento.`,
  },
  {
    id: 7,
    slug: 'detentos-ajudam-rio-bonito-iguacu',
    title: 'Detentos ajudam na reconstrução de Rio Bonito do Iguaçu após tornado',
    summary:
      'Mão de obra carcerária está sendo utilizada para reconstruir a cidade paranaense atingida por um tornado na última sexta-feira.',
    city: 'Rio Bonito do Iguaçu',
    category: 'Geral',
    status: 'approved',
    publishedAt: '2025-11-10T12:00:00-03:00',
    source: 'Plantão Maringá',
    image: '/images/news/tornado-rio-bonito.svg',
    content: `Detentos estão ajudando na reconstrução de Rio Bonito do Iguaçu, cidade paranaense atingida por um tornado na última sexta-feira. A mão de obra carcerária está sendo utilizada para auxiliar nas obras de reconstrução.

A iniciativa faz parte de um programa de ressocialização e ajuda a acelerar a recuperação da cidade.`,
  },
  {
    id: 8,
    slug: 'morador-maringa-preso-agressao',
    title: 'Morador de Maringá é preso após vídeo de agressão a adolescente',
    summary:
      'Polícia Civil de Mandaguari cumpriu mandado de prisão preventiva contra D.H.S., de 23 anos, por agressão a menina de 17 anos.',
    city: 'Maringá',
    category: 'Policial',
    status: 'approved',
    publishedAt: '2025-11-11T16:00:00-03:00',
    source: 'Plantão Maringá',
    image: '/images/news/agressao-mandaguari.svg',
    content: `A Polícia Civil de Mandaguari cumpriu mandado de prisão preventiva contra D.H.S., de 23 anos, morador de Maringá, por agressão a uma adolescente de 17 anos.

O caso ganhou repercussão após um vídeo da agressão circular nas redes sociais. O acusado foi preso e está à disposição da Justiça.`,
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
