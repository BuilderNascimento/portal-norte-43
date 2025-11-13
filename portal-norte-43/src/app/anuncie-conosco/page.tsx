import { AdvertiseForm } from "@/components/features/marketing/advertise-form";

export const metadata = {
  title: 'Anuncie Conosco | Portal Norte 43',
  description: 'Fale com milhares de leitores do Norte Pioneiro. Entre em contato e receba uma proposta personalizada.',
};

export default function AdvertisePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Header */}
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
          Anuncie no Portal Norte 43
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-600">
          Fale com milhares de leitores do Norte Pioneiro. Entre em contato e receba uma proposta personalizada para seu negócio.
        </p>
        <div className="mx-auto h-1 w-20 rounded-full bg-red-600" />
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
        {/* Conteúdo Principal */}
        <section className="space-y-6">
          {/* Benefícios */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-slate-900">Por que anunciar conosco?</h2>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-3">
                <span className="text-red-600">✓</span>
                <span>Alcance leitores de Andirá, Bandeirantes, Cambará e toda a região</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600">✓</span>
                <span>Visibilidade garantida em posições estratégicas do site</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600">✓</span>
                <span>Propostas personalizadas conforme seu orçamento e necessidade</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600">✓</span>
                <span>Suporte dedicado e relatórios de performance</span>
              </li>
            </ul>
          </div>

          {/* Opções de Publicidade */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold text-slate-900">Opções de Publicidade</h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <h3 className="mb-2 font-semibold text-slate-900">Banner Lateral</h3>
                <p className="text-sm text-slate-600">
                  Posicionamento estratégico na sidebar direita do site, visível em todas as páginas.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <h3 className="mb-2 font-semibold text-slate-900">Banner Topo</h3>
                <p className="text-sm text-slate-600">
                  Destaque no topo da página principal (728x90px), primeira coisa que o leitor vê.
                </p>
              </div>
              <div className="rounded-lg border-2 border-yellow-300 bg-yellow-50 p-4">
                <h3 className="mb-2 font-semibold text-slate-900">Destaque Principal</h3>
                <p className="text-sm text-slate-600">
                  Máxima visibilidade com posicionamento premium na manchete principal e sidebar.
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm text-slate-600">
              <strong>Entre em contato</strong> através do formulário ao lado e nossa equipe apresentará uma proposta personalizada com valores e condições especiais para o seu negócio.
            </p>
          </div>
        </section>

        {/* Formulário */}
        <aside className="lg:sticky lg:top-24">
          <div className="rounded-xl border-2 border-red-100 bg-gradient-to-br from-red-50 to-white p-6 shadow-lg">
            <h2 className="mb-2 text-xl font-bold text-slate-900">Entre em contato</h2>
            <p className="mb-6 text-sm text-slate-600">
              Preencha o formulário e nossa equipe entrará em contato em até 24h para apresentar uma proposta personalizada com valores e condições especiais.
            </p>
            <AdvertiseForm />
          </div>
        </aside>
      </div>
    </div>
  );
}

