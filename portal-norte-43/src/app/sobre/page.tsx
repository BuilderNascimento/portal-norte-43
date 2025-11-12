import Link from 'next/link';

export const metadata = {
  title: 'Sobre | Portal Norte 43',
  description: 'Conheça o Portal Norte 43, um veículo independente voltado a informar com rapidez e responsabilidade os moradores do Norte Pioneiro do Paraná.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
          Sobre o Portal Norte 43
        </h1>
        <div className="h-1 w-20 rounded-full bg-red-600" />
      </div>

      {/* Conteúdo Principal */}
      <div className="space-y-6 text-lg leading-relaxed text-slate-700">
        <p>
          O <strong>Portal Norte 43</strong> é um veículo independente voltado a informar com rapidez e responsabilidade os moradores do <strong>Norte Pioneiro do Paraná</strong>.
        </p>

        <p>
          Nosso compromisso é com a <strong>verdade</strong>, o <strong>jornalismo local</strong> e a <strong>valorização das comunidades regionais</strong>.
        </p>

        <p>
          Através de tecnologia e automação, buscamos oferecer informação atualizada, confiável e acessível tanto para o público local quanto para empresas que desejam anunciar seus serviços na região.
        </p>
      </div>

      {/* Missão e Valores */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-bold text-slate-900">Nossa Missão</h2>
          <p className="text-slate-600">
            Informar com agilidade e precisão, conectando comunidades, anunciantes e colaboradores locais através de um portal moderno e acessível.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-bold text-slate-900">Nossos Valores</h2>
          <ul className="space-y-2 text-slate-600">
            <li>• Transparência e ética jornalística</li>
            <li>• Compromisso com a verdade</li>
            <li>• Valorização do jornalismo local</li>
            <li>• Acessibilidade e inclusão</li>
          </ul>
        </div>
      </div>

      {/* Equipe */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">Nossa Equipe</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">Antonio</h3>
            <p className="text-slate-600">Fundador e Editor</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">Diego</h3>
            <p className="text-slate-600">Fundador e Editor</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-xl border-2 border-red-100 bg-gradient-to-br from-red-50 to-white p-6 text-center">
        <h2 className="mb-3 text-xl font-bold text-slate-900">Quer fazer parte?</h2>
        <p className="mb-4 text-slate-600">
          Seja um colaborador ou anunciante. Entre em contato conosco!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/anuncie-conosco"
            className="inline-flex items-center rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-red-700 hover:shadow-lg"
          >
            Anuncie Conosco
          </Link>
          <Link
            href="/admin/login"
            className="inline-flex items-center rounded-lg border-2 border-red-600 px-6 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            Enviar Notícia
          </Link>
        </div>
      </div>
    </div>
  );
}

