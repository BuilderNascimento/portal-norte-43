import { AdvertiseForm } from "@/components/features/marketing/advertise-form";

export default function AdvertisePage() {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
      <section className="space-y-6">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-300">
            Planos comerciais
          </span>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Invista em mídia regional com dados e automação
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-200 md:text-base">
            Alcance leitores hipersegmentados com relatórios de desempenho, posicionamentos premium e integração com campanhas digitais.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Presença garantida</h2>
            <p className="mt-2 text-sm text-slate-600">
              Posicionamentos em header, sidebar e infeed com atualização dinâmica via n8n e controle total do anunciante.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Performance mensurada</h2>
            <p className="mt-2 text-sm text-slate-600">
              Relatórios mensais com impressões, cliques e leads gerados, além de recomendações de otimização.
            </p>
          </article>
        </div>
      </section>

      <aside className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
        <h2 className="text-xl font-semibold text-slate-900">Agende uma conversa</h2>
        <p className="mt-2 text-sm text-slate-600">
          Informe seus dados e objetivos. Em até 24h um consultor retorna com um plano de mídia ideal para sua campanha.
        </p>
        <AdvertiseForm />
      </aside>
    </div>
  );
}

