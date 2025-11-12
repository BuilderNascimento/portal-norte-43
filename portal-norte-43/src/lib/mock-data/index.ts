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
