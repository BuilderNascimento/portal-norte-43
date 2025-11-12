'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const newsletterSchema = z.object({
  email: z.string().email('Informe um e-mail válido'),
  whatsapp: z.string().optional(),
  preference: z.enum(['email', 'whatsapp', 'ambos']),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export function NewsletterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      preference: 'email',
    },
  });

  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const onSubmit = async (data: NewsletterFormData) => {
    setStatus('idle');
    await new Promise(resolve => setTimeout(resolve, 800));
    console.info('Inscrição no boletim (mock)', data);
    setStatus('success');
    reset();
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="newsletter-email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          E-mail
        </label>
        <input
          id="newsletter-email"
          type="email"
          {...register('email')}
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus:border-red-600 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          placeholder="seu@email.com"
        />
        {errors.email && <p className="text-xs text-red-600 dark:text-red-400">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="newsletter-whatsapp" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          WhatsApp (opcional)
        </label>
        <input
          id="newsletter-whatsapp"
          type="tel"
          {...register('whatsapp')}
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus:border-red-600 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          placeholder="(43) 99999-9999"
        />
        {errors.whatsapp && <p className="text-xs text-red-600 dark:text-red-400">{errors.whatsapp.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Como prefere receber?
        </label>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="email"
              {...register('preference')}
              className="h-4 w-4 text-red-600 focus:ring-red-600"
            />
            <span className="text-sm text-slate-600 dark:text-slate-400">Apenas e-mail</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="whatsapp"
              {...register('preference')}
              className="h-4 w-4 text-red-600 focus:ring-red-600"
            />
            <span className="text-sm text-slate-600 dark:text-slate-400">Apenas WhatsApp</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="ambos"
              {...register('preference')}
              className="h-4 w-4 text-red-600 focus:ring-red-600"
            />
            <span className="text-sm text-slate-600 dark:text-slate-400">E-mail e WhatsApp</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-red-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Cadastrando...' : '📧 Receber boletim diário'}
      </button>

      {status === 'success' && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
          ✓ Cadastro realizado! Você receberá o boletim diário em breve.
        </div>
      )}

      <p className="text-xs text-slate-500 dark:text-slate-400">
        Receba um resumo diário das principais notícias do Norte Pioneiro diretamente no seu e-mail ou WhatsApp.
      </p>
    </form>
  );
}

