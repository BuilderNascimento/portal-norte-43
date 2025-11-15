'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '@/lib/auth/supabase-auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login({ email, password });
      console.log('[Login] Login bem-sucedido:', result);
      
      // Aguardar um pouco para garantir que a sessão está salva
      await new Promise(resolve => setTimeout(resolve, 500));
      
      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      console.error('[Login] Erro no login:', err);
      const errorMessage = err.message || 'Erro ao fazer login';
      setError(errorMessage);
      
      // Mensagens mais amigáveis
      if (errorMessage.includes('Invalid login credentials') || errorMessage.includes('Invalid')) {
        setError('Email ou senha incorretos. Verifique suas credenciais.');
      } else if (errorMessage.includes('not found') || errorMessage.includes('não encontrado')) {
        setError('Usuário não encontrado. Verifique se o email está correto.');
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-slate-900">Portal Norte 43</h1>
            <p className="mt-2 text-sm text-slate-600">Painel Editorial</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-slate-600 hover:text-slate-900 transition"
            >
              ← Voltar para o site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
