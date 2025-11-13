'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const quickSubmitSchema = z.object({
  name: z.string().min(2, 'Informe seu nome'),
  city: z.string().min(2, 'Informe a cidade'),
  text: z.string().min(20, 'Descreva a notícia (mínimo 20 caracteres)'),
});

type QuickSubmitFormData = z.infer<typeof quickSubmitSchema>;

export function QuickSubmitForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuickSubmitFormData>({
    resolver: zodResolver(quickSubmitSchema),
  });

  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const onSubmit = async (data: QuickSubmitFormData) => {
    setStatus('idle');
    await new Promise(resolve => setTimeout(resolve, 800));
    console.info('Notícia enviada (mock)', data);
    setStatus('success');
    reset();
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="quick-name" className="text-xs font-semibold text-slate-700">
            Seu nome
          </label>
          <input
            id="quick-name"
            {...register('name')}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-red-600 focus:outline-none"
            placeholder="João Silva"
          />
          {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div className="space-y-1.5">
          <label htmlFor="quick-city" className="text-xs font-semibold text-slate-700">
            Cidade
          </label>
          <input
            id="quick-city"
            {...register('city')}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-red-600 focus:outline-none"
            placeholder="Andirá - PR"
          />
          {errors.city && <p className="text-xs text-red-600">{errors.city.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="quick-text" className="text-xs font-semibold text-slate-700">
          Notícia
        </label>
        <textarea
          id="quick-text"
          {...register('text')}
          rows={4}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-red-600 focus:outline-none"
          placeholder="Descreva o que aconteceu, quando, onde e outras informações relevantes..."
        />
        {errors.text && <p className="text-xs text-red-600">{errors.text.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-red-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Enviando...' : '📸 Enviar notícia'}
      </button>

      {status === 'success' && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
          ✓ Notícia enviada! Nossa equipe revisará e publicará em breve.
        </div>
      )}

      <p className="text-xs text-slate-500">
        📸 Envie flagrantes, fotos e informações — participe do Portal Norte 43!
      </p>
    </form>
  );
}

