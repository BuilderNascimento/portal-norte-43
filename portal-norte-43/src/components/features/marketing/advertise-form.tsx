'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

const advertiseSchema = z.object({
  name: z.string().min(2, "Informe seu nome completo."),
  company: z.string().min(2, "Informe o nome da empresa."),
  email: z.string().email("Informe um e-mail válido."),
  city: z.string().min(2, "Informe a cidade."),
  message: z.string().min(10, "Descreva o interesse em patrocínio."),
});

export type AdvertiseFormData = z.infer<typeof advertiseSchema>;

export function AdvertiseForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AdvertiseFormData>({
    resolver: zodResolver(advertiseSchema),
  });

  const [status, setStatus] = useState<"idle" | "success">("idle");

  const onSubmit = async (data: AdvertiseFormData) => {
    setStatus("idle");
    await new Promise(resolve => setTimeout(resolve, 800));
    console.info("Lead comercial (mock)", data);
    setStatus("success");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-semibold text-slate-700">
            Nome
          </label>
          <input
            id="name"
            {...register("name")}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none"
            placeholder="Seu nome completo"
          />
          {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="company" className="text-sm font-semibold text-slate-700">
            Empresa
          </label>
          <input
            id="company"
            {...register("company")}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none"
            placeholder="Nome da empresa"
          />
          {errors.company && <p className="text-xs text-red-600">{errors.company.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold text-slate-700">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none"
            placeholder="contato@empresa.com"
          />
          {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="city" className="text-sm font-semibold text-slate-700">
            Cidade
          </label>
          <input
            id="city"
            {...register("city")}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none"
            placeholder="Maringá - PR"
          />
          {errors.city && <p className="text-xs text-red-600">{errors.city.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-semibold text-slate-700">
          Objetivo da campanha
        </label>
        <textarea
          id="message"
          {...register("message")}
          rows={5}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none"
          placeholder="Conte como o Portal Norte 43 pode ajudar a impulsionar seu negócio."
        />
        {errors.message && <p className="text-xs text-red-600">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Enviando..." : "Solicitar contato comercial"}
      </button>

      {status === "success" && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Mensagem enviada! Nossa equipe retornará em breve com propostas personalizadas.
        </div>
      )}
    </form>
  );
}

