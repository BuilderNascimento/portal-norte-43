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
    id: 107,
    slug: 'ministerio-agricultura-alerta-azeites-oliva-fraudados-improprios-consumo-12-11-2025',
    title: 'Ministério da Agricultura alerta para azeites de oliva fraudados e impróprios para consumo',
    summary:
      'Mapa emitiu alerta de risco sobre azeites de oliva adulterados comercializados no país. Fiscalizações detectaram mistura com outros óleos vegetais. Marcas foram desclassificadas e recolhimento imediato foi determinado.',
    city: 'Brasil',
    category: 'Agricultura e Consumo',
    status: 'approved',
    publishedAt: '2025-11-12T23:00:00-03:00',
    source: 'Ministério da Agricultura e Pecuária (Mapa)',
    image: '/images/news/lista12capa.png',
    content: `O Ministério da Agricultura e Pecuária (Mapa) emitiu um alerta de risco ao consumidor sobre azeites de oliva adulterados e impróprios para o consumo humano que estão sendo comercializados em diferentes regiões do país.

As fiscalizações foram conduzidas pelo Departamento de Inspeção de Produtos de Origem Vegetal, da Secretaria de Defesa Agropecuária, e tiveram como foco identificar fraudes e garantir a segurança alimentar.

De acordo com o Mapa, as amostras analisadas pelos Laboratórios Federais de Defesa Agropecuária (LFDA) detectaram a mistura de azeite com outros óleos vegetais, o que caracteriza fraude e descumprimento da legislação brasileira.

Como resultado, as marcas foram desclassificadas e o recolhimento imediato dos produtos foi determinado.

📋 Confira a lista de marcas desclassificadas:

![Lista de marcas de azeite desclassificadas](/images/news/listanova12.png)

O Ministério reforça que a venda desses produtos é uma infração grave e que os estabelecimentos que mantiverem os itens à venda poderão ser responsabilizados.

Aos consumidores, a recomendação é interromper imediatamente o uso dos azeites citados e solicitar substituição junto ao fornecedor, conforme previsto no Código de Defesa do Consumidor.

Denúncias podem ser registradas de forma online pelo canal oficial Fala.BR.

O Mapa alerta ainda para que o consumidor verifique atentamente os rótulos, uma vez que produtos fraudulentos podem utilizar nomes semelhantes a marcas conhecidas de azeite de oliva.`,
  },
  {
    id: 106,
    slug: 'prf-apreende-carga-produtos-paraguai-destino-belo-horizonte-br262-12-11-2025',
    title: 'PRF apreende carga de produtos do Paraguai com destino a Belo Horizonte na BR-262',
    summary:
      'Polícia Rodoviária Federal apreendeu mercadorias de origem paraguaia transportadas de forma irregular na BR-262, em Juatuba (MG). Carga incluía receptores de TV, isqueiros, chaveiros e eletrônicos sem nota fiscal. Motorista responderá por descaminho.',
    city: 'Juatuba',
    category: 'Combate ao Crime',
    status: 'approved',
    publishedAt: '2025-11-12T10:30:00-03:00',
    source: 'Polícia Rodoviária Federal (PRF)',
    image: '/images/news/prf12.jpeg',
    content: `A Polícia Rodoviária Federal (PRF) apreendeu, na manhã desta quarta-feira (12), diversas mercadorias de origem paraguaia transportadas de forma irregular na BR-262, em Juatuba (MG).

A abordagem ocorreu por volta das 7h10, quando uma equipe da PRF realizava ronda e identificou um veículo com a lanterna traseira quebrada. Ao realizar a fiscalização, os agentes encontraram vários volumes cobertos por um pano preto no interior do carro.

O condutor declarou que transportava receptores de sinal de TV, isqueiros, chaveiros e eletrônicos, todos sem nota fiscal e sem o devido desembaraço aduaneiro. Segundo ele, a carga seria entregue a um homem em Belo Horizonte (MG), que seria o destinatário final dos produtos.

O veículo foi recolhido e lacrado no pátio da PRF, onde permanecerá à disposição da Receita Federal para contagem e verificação da carga.

O motorista foi liberado no local, mas deverá responder pelo crime de descaminho, previsto no artigo 334 do Código Penal.`,
  },
  {
    id: 105,
    slug: 'pmpr-flagra-desmatamento-loteamento-irregular-alto-padrao-area-preservacao-curitiba-12-11-2025',
    title: 'PMPR flagra desmatamento e loteamento irregular de alto padrão em área de preservação em Curitiba',
    summary:
      'Operação do 13º Batalhão da PM em parceria com a Prefeitura de Curitiba flagrou máquina realizando desmatamento e aterro em área de mata preservada no bairro Ganchinho. Três pessoas foram conduzidas e multas somam R$ 1,5 milhão.',
    city: 'Curitiba',
    category: 'Meio Ambiente',
    status: 'approved',
    publishedAt: '2025-11-12T22:00:00-03:00',
    source: 'Centro de Comunicação Social da Polícia Militar do Paraná (PMPR)',
    image: '/images/news/escavadeirapmpr2.png',
    content: `A Polícia Militar do Paraná (PMPR), por meio do 13º Batalhão da PM, em parceria com a Prefeitura de Curitiba, realizou nesta quarta-feira (12) uma operação para combater loteamentos irregulares no bairro Ganchinho, região sul da capital.

Durante a fiscalização, as equipes flagraram uma máquina realizando desmatamento e aterro em uma área de mata preservada pertencente à região de proteção do Rio Iguaçu, integrante da Reserva Hídrica de Curitiba.

![Operação da PMPR flagra desmatamento em área de preservação](/images/news/escavadeirapmpr1.png)

De acordo com o tenente Everton Taborda, do 13º BPM, a ação resultou na apreensão do maquinário e na condução de três pessoas à Polícia Civil do Paraná — dois proprietários e o operador. Foram emitidos autos de infração no valor de R$ 500 mil para cada um dos envolvidos, somando R$ 1,5 milhão em multas.

O tenente destacou que o local vem sendo ocupado por proprietários de imóveis de alto padrão, que adquirem terrenos para construir chácaras de lazer em áreas de manancial.

"Não são moradias simples. São imóveis de alto padrão, e os compradores estão desmatando áreas de manancial, aterrando cursos d'água e degradando o meio ambiente", afirmou Taborda.

Na véspera da operação, uma equipe da PM já havia flagrado um caminhão despejando entulhos de forma irregular na mesma região.

A corporação informou que novas fiscalizações serão realizadas para conter as ocupações ilegais.

A supressão vegetal e o parcelamento irregular do solo são crimes ambientais previstos em lei.

A PMPR reforça que denúncias podem ser feitas de forma anônima pelo Disque-Denúncia 181 ou, em caso de flagrante, pelo telefone 190.`,
  },
  {
    id: 104,
    slug: 'barqueata-reune-mais-200-embarcacoes-belem-justica-climatica-social-12-11-2025',
    title: 'Barqueata reúne mais de 200 embarcações em Belém por justiça climática e social',
    summary:
      'Evento na Baía do Guajará contou com participação de povos indígenas, quilombolas, pescadores e agricultores. Ação faz parte da Cúpula dos Povos paralela à COP30 e marcou o fim da Caravana da Resposta.',
    city: 'Belém',
    category: 'COP30',
    status: 'approved',
    publishedAt: '2025-11-12T21:00:00-03:00',
    source: 'Agência Brasil / EBC',
    image: '/images/news/barqueta.png',
    content: `Uma barqueata com a participação de povos indígenas, quilombolas, pescadores e agricultores percorreu a Baía do Guajará, em Belém (PA), na manhã desta quarta (12), com o objetivo de reforçar demandas por justiça climática e social. O evento, parte da Cúpula dos Povos paralela à COP30, contou com mais de 200 embarcações e cerca de 5 mil pessoas, segundo os organizadores.

O percurso também marcou o fim da "Caravana da Resposta", que saiu de Sinop (MT) no dia 8 de novembro. No trajeto, os participantes visitaram o chamado "corredor da soja" e denunciaram os impactos do agronegócio, das hidrovias e de grandes obras de infraestrutura sobre os territórios tradicionais.

Durante o ato, representantes dos povos tradicionais pontuaram a importância da soberania sobre terra, água e cultura. "A resposta somos nós", afirmou o líder indígena Bepmoroi Metuktire, membro da articulação do Instituto Raoni.

Além disso, pescadores artesanais relataram a mudança de hábitos por causa das secas, da invasão de madeireiros e da perda de espécies de peixes. Comunidades agrícolas e mulheres ressaltaram o avanço da monocultura e os efeitos na alimentação e no modo de vida.`,
  },
  {
    id: 103,
    slug: 'brasil-eua-avancam-negociacoes-tarifas-comerciais-chanceler-mauro-vieira-12-11-2025',
    title: 'Brasil e EUA avançam em negociações sobre tarifas comerciais, diz chanceler Mauro Vieira',
    summary:
      'Ministro das Relações Exteriores se reuniu com senador Marco Rubio em Washington para discutir redução de barreiras comerciais. Foco em setores estratégicos como agropecuária e manufaturados.',
    city: 'Brasil',
    category: 'Geral',
    status: 'approved',
    publishedAt: '2025-11-12T20:00:00-03:00',
    source: 'Agência Brasil / EBC',
    image: '/images/news/brasilEUA.png',
    content: `O ministro das Relações Exteriores do Brasil, Mauro Vieira, se reuniu nesta terça-feira (11) com o senador norte-americano Marco Rubio para discutir avanços nas negociações sobre tarifas e barreiras comerciais entre os dois países.

Segundo o Itamaraty, o encontro aconteceu em Washington (EUA) e teve como foco o fortalecimento das relações econômicas bilaterais e o acesso de produtos brasileiros ao mercado norte-americano.

Vieira destacou que o governo brasileiro busca reduzir entraves tarifários em setores estratégicos, especialmente agropecuária e manufaturados, que são pilares das exportações nacionais.

"Estamos trabalhando para que o comércio entre Brasil e Estados Unidos seja mais equilibrado, com condições justas para ambos os lados", afirmou o chanceler.

Rubio, por sua vez, ressaltou o papel do Brasil como parceiro relevante na região e defendeu maior integração econômica no continente.

As tratativas fazem parte de uma série de encontros diplomáticos que antecedem a Cúpula das Américas, prevista para o início de 2026.`,
  },
  {
    id: 101,
    slug: 'motociclista-gravemente-ferido-colisao-onibus-br369-andira-12-11-2025',
    title: 'Motociclista de Andirá é transferido em estado grave para Londrina após colisão com ônibus na BR-369',
    summary:
      'Vítima de 38 anos foi transferida para o Hospital Universitário de Londrina (HU) na manhã desta quarta-feira. Acidente ocorreu na madrugada de terça-feira na BR-369. Homem segue sob cuidados intensivos.',
    city: 'Andirá',
    category: 'Trânsito',
    status: 'approved',
    publishedAt: '2025-11-12T19:00:00-03:00',
    source: 'Informações locais e equipes de resgate',
    image: '/images/news/garcia.png',
    content: `O motociclista de aproximadamente 38 anos, que havia ficado gravemente ferido em um acidente envolvendo um ônibus da Viação Garcia na madrugada desta terça-feira (12), em Andirá, precisou ser transferido na manhã de hoje para o Hospital Universitário de Londrina (HU).

De acordo com informações locais, a colisão ocorreu na BR-369, nas proximidades da sede da Defesa Civil da cidade. O impacto foi na lateral do ônibus, causando traumatismo e múltiplas lesões no condutor da moto.

Equipes do SAMU e da Defesa Civil prestaram os primeiros atendimentos ainda durante a madrugada. Inicialmente, a vítima foi encaminhada ao Hospital Municipal de Andirá, mas, devido à gravidade do quadro, foi transferida por uma unidade avançada do SAMU para Londrina.

O homem segue sob cuidados intensivos e o estado de saúde é considerado grave.

As causas do acidente ainda estão sendo apuradas pelas autoridades competentes.`,
  },
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
  // Notícias automatizadas (adicionadas pelo bot)
  {
    id: 1763022864788.8801,
    slug: 'nao-se-engane-01-desmentimos-fakes-sobre-vacinas-e-ameaca-a-cristaos-2023-08-28',
    title: 'Desvendando Boatos: A Verdade por Trás das Narrativas Enganosas',
    summary: "A EBC lança o quadro 'Não Se Engane' para combater a desinformação. Neste episódio, são desmistificadas duas notícias falsas: sobre a vacinação da Pfizer e uma suposta perseguição a cristãos na Índia.",
    city: 'Brasil',
    category: 'Saúde',
    status: 'approved',
    publishedAt: '2025-11-14T10:00:00-03:00',
    source: 'Agência Brasil (Reescrito por IA)',
    image: '/images/news/desvendando-boatos-a-verdade-por-trás-das-narrativ-20251113-093424.png',
    content: "A EBC, em sua missão de fornecer informações precisas e confiáveis, apresenta o quadro 'Não Se Engane', um esforço para desvendar a verdade por trás de narrativas enganosas que circulam na internet. Neste primeiro episódio, o jornalista Edgard Matsuki, da Agência Brasil, aborda duas informações falsas que têm ganhado tração nas redes sociais. A primeira diz respeito a um suposto alerta da Anvisa sobre a vacina da Pfizer contra a COVID-19. No entanto, a agência não emitiu nenhuma nota sobre esse assunto. A segunda informação falsa trata de uma suposta execução em massa de cristãos na Índia. Essa corrente, que circula desde pelo menos 2010, utiliza um vídeo gravado na Síria para espalhar essa alegação infundada. Através da checagem de fatos e da apresentação de informações precisas, o 'Não Se Engane' busca combater a desinformação e garantir que o público tenha acesso a conteúdo confiável. Os espectadores podem participar enviando sugestões de temas a serem verificados pelas redes sociais da EBC ou pelo e-mail naoseengane@ebc.com.br. O quadro 'Não Se Engane' vai ao ar todas as sextas-feiras no telejornal Repórter Brasil, da TV Brasil, e será publicado toda segunda-feira na Radioagência Nacional, reafirmando o compromisso da EBC com a transparência e a disseminação de informações verídicas.",
  },
  {
    id: 1763021575287.346,
    slug: 'congresso-aprova-r-71-bi-para-o-novo-bolsa-familia-2023-04-26',
    title: 'Legisladores Aprovam Injeção de R$ 71 Bilhões no Novo Programa Bolsa Família',
    summary: 'O Congresso Nacional aprovou a destinação de R$ 71 bilhões para o pagamento do novo Bolsa Família. Também foi aprovado um reajuste de 9% para os servidores públicos federais, o primeiro desde 2016.',
    city: 'Brasil',
    category: 'Economia',
    status: 'approved',
    publishedAt: '2025-11-14T09:00:00-03:00',
    source: 'Agência Brasil (Reescrito por IA)',
    image: '/images/news/legisladores-aprovam-injeção-de-r-71-bilhões-no-no-20251113-091255.png',
    content: 'O Congresso Nacional deu luz verde a uma proposta do governo federal que destina R$ 71 bilhões para o novo programa Bolsa Família. A medida vem do saldo do extinto Auxílio Brasil e será repassada ao Ministério do Desenvolvimento e Assistência Social.\n\nSegundo a deputada Dandara, do PT de Minas Gerais, o novo Bolsa Família contará com mecanismos de controle e acompanhamento pela sociedade. O programa prevê um pagamento mínimo de R$ 600 por beneficiário, podendo ter um acréscimo de R$ 150 por filho de até 6 anos.\n\nNa mesma sessão, parlamentares também aprovaram uma outra proposta do Executivo que concede um reajuste de 9% aos servidores públicos federais a partir de maio deste ano. Esse é o primeiro acordo de reajuste com os funcionários do governo desde 2016 e terá um impacto de mais de R$ 11 bilhões nas contas do governo.\n\nOs dois projetos aprovados pelo Congresso agora seguem para a sanção do presidente Luiz Inácio Lula da Silva.',
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
    image: '/images/news/ANUNCIE AQUI.png',
    link: '/anuncie-conosco',
    position: 'top',
    label: 'Anuncie Conosco',
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
