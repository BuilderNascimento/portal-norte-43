'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser, logout } from '@/lib/auth/supabase-auth';
import type { Author } from '@/lib/auth/types';

export default function UsersManagementPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<{ author: Author | null } | null>(null);
  const [users, setUsers] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'collaborator' as 'admin' | 'collaborator',
    can_create: true,
    can_edit: true,
    can_delete: false,
    can_review: false,
    can_manage_users: false,
    allowed_categories: [] as string[],
    allowed_cities: [] as string[],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const user = await getCurrentUser();
      if (!user?.author || user.author.role !== 'admin' || !user.author.permissions.can_manage_users) {
        router.push('/admin');
        return;
      }
      setCurrentUser(user);

      const response = await fetch('/api/admin/users');
      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        alert('Usuário criado com sucesso!');
        setShowForm(false);
        setFormData({
          email: '',
          password: '',
          name: '',
          role: 'collaborator',
          can_create: true,
          can_edit: true,
          can_delete: false,
          can_review: false,
          can_manage_users: false,
          allowed_categories: [],
          allowed_cities: [],
        });
        loadData();
      } else {
        alert('Erro: ' + data.error);
      }
    } catch (error) {
      alert('Erro ao criar usuário');
    }
  };

  if (loading) {
    return <div className="p-8">Carregando...</div>;
  }

  if (!currentUser?.author) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Gerenciar Usuários</h1>
          <p className="mt-2 text-slate-600">Crie e gerencie contas de editores</p>
        </div>
        <div className="flex gap-4">
          <Link
            href="/admin"
            className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
          >
            ← Voltar
          </Link>
          <button
            onClick={() => {
              logout();
              router.push('/admin/login');
            }}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Sair
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Usuários</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            {showForm ? 'Cancelar' : '+ Novo Usuário'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nome</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={8}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Função</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'collaborator' })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                >
                  <option value="collaborator">Colaborador</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-slate-900">Permissões</h3>
              <div className="grid gap-2 md:grid-cols-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.can_create}
                    onChange={(e) => setFormData({ ...formData, can_create: e.target.checked })}
                  />
                  <span className="text-sm">Criar artigos</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.can_edit}
                    onChange={(e) => setFormData({ ...formData, can_edit: e.target.checked })}
                  />
                  <span className="text-sm">Editar artigos</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.can_delete}
                    onChange={(e) => setFormData({ ...formData, can_delete: e.target.checked })}
                  />
                  <span className="text-sm">Deletar artigos</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.can_review}
                    onChange={(e) => setFormData({ ...formData, can_review: e.target.checked })}
                  />
                  <span className="text-sm">Revisar artigos</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.can_manage_users}
                    onChange={(e) => setFormData({ ...formData, can_manage_users: e.target.checked })}
                  />
                  <span className="text-sm">Gerenciar usuários</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="rounded-lg bg-red-600 px-6 py-2 text-white hover:bg-red-700"
            >
              Criar Usuário
            </button>
          </form>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Nome</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Função</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Permissões</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-3 text-sm text-slate-900">{user.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{user.email}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      user.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {user.role === 'admin' ? 'Admin' : 'Colaborador'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">
                    {user.permissions.can_create && 'Criar '}
                    {user.permissions.can_edit && 'Editar '}
                    {user.permissions.can_delete && 'Deletar '}
                    {user.permissions.can_review && 'Revisar '}
                    {user.permissions.can_manage_users && 'Gerenciar '}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`rounded-full px-2 py-1 text-xs ${
                      user.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {user.is_active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

