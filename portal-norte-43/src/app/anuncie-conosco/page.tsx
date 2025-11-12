import { AdvertiseForm } from "@/components/features/marketing/advertise-form";

export const metadata = {
  title: 'Anuncie Conosco | Portal Norte 43',
  description: 'Fale com milhares de leitores do Norte Pioneiro. Planos acessíveis para divulgar seu comércio local.',
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
          Fale com milhares de leitores do Norte Pioneiro. Planos acessíveis para divulgar seu comércio local.
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
                <span>Planos acessíveis para pequenos e médios comerciantes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600">✓</span>
                <span>Suporte dedicado e relatórios de performance</span>
              </li>
            </ul>
          </div>

          {/* Tabela de Planos */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold text-slate-900">Nossos Planos</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Plano</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Posição</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">Investimento</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-4 text-sm font-medium text-slate-900">Banner Lateral</td>
                    <td className="px-4 py-4 text-sm text-slate-600">Sidebar (lateral direita)</td>
                    <td className="px-4 py-4 text-right text-sm font-bold text-red-600">R$ 50/mês</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-4 text-sm font-medium text-slate-900">Banner Topo</td>
                    <td className="px-4 py-4 text-sm text-slate-600">Topo da página (728x90)</td>
                    <td className="px-4 py-4 text-right text-sm font-bold text-red-600">R$ 100/mês</td>
                  </tr>
                  <tr className="bg-yellow-50 hover:bg-yellow-100">
                    <td className="px-4 py-4 text-sm font-medium text-slate-900">Destaque Principal</td>
                    <td className="px-4 py-4 text-sm text-slate-600">Manchete principal + sidebar</td>
                    <td className="px-4 py-4 text-right text-sm font-bold text-red-600">R$ 200/mês</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              * Valores podem variar conforme período e posicionamento. Entre em contato para planos personalizados.
            </p>
          </div>
        </section>

        {/* Formulário */}
        <aside className="lg:sticky lg:top-24">
          <div className="rounded-xl border-2 border-red-100 bg-gradient-to-br from-red-50 to-white p-6 shadow-lg">
            <h2 className="mb-2 text-xl font-bold text-slate-900">Entre em contato</h2>
            <p className="mb-6 text-sm text-slate-600">
              Preencha o formulário e nossa equipe retornará em até 24h com uma proposta personalizada.
            </p>
            <AdvertiseForm />
          </div>
        </aside>
      </div>
    </div>
  );
}

