import Link from "next/link";
import { redirect } from "next/navigation";

import { AdminReviewTable } from "@/components/features/admin/review-table";
import { getPendingArticles } from "@/lib/supabase/articles";
import { getServerUser } from "@/lib/auth/server-auth";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const currentUser = await getServerUser();
  
  if (!currentUser?.author) {
    redirect('/admin/login');
  }

  const pendingNews = await getPendingArticles();

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-xl">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-300">
                Painel Editorial
              </span>
              <h1 className="text-3xl font-bold md:text-4xl">Revisão de matérias pendentes</h1>
              <p className="max-w-2xl text-sm text-slate-200 md:text-base">
                Aprove e publique os conteúdos enviados via automação ou por colaboradores em campo.
                Utilize o botão &quot;Editar&quot; para ajustar títulos, categorias e imagens antes da publicação.
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-300">Logado como</p>
              <p className="font-semibold">{currentUser.author.name}</p>
              <p className="text-xs text-slate-400">{currentUser.author.role === 'admin' ? 'Administrador' : 'Colaborador'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase text-slate-500">Pendentes</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{pendingNews.length}</p>
          <p className="mt-1 text-xs text-slate-500">Matérias aguardando aprovação editorial</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase text-slate-500">Fluxo Automático</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">n8n</p>
          <p className="mt-1 text-xs text-slate-500">Integrações em funcionamento</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase text-slate-500">Colaboradores</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">5</p>
          <p className="mt-1 text-xs text-slate-500">Credenciados ativos neste mês</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase text-slate-500">Anunciar</p>
          <Link
            href="/anuncie-conosco"
            className="mt-2 inline-flex items-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Ver planos
          </Link>
          <p className="mt-1 text-xs text-slate-500">Gerencie os pacotes de patrocínio</p>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Matérias pendentes</h2>
            <p className="text-sm text-slate-600">
              Faça a curadoria do conteúdo antes da publicação automática.
            </p>
          </div>
          <div className="flex gap-2">
            {currentUser.author.permissions.can_manage_users && (
              <Link
                href="/admin/users"
                className="inline-flex items-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-900 hover:text-slate-900"
              >
                Gerenciar Usuários
              </Link>
            )}
            <Link
              href="/admin/login"
              className="inline-flex items-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-900 hover:text-slate-900"
            >
              Sair
            </Link>
          </div>
        </div>
        <AdminReviewTable items={pendingNews} />
      </section>
    </div>
  );
}

