'use client';

import { useFormState } from "react-dom";

export type LoginState =
  | { status: "idle"; message?: string }
  | { status: "error"; message: string };

interface AdminLoginFormProps {
  action: (state: LoginState, formData: FormData) => Promise<LoginState>;
  initialState: LoginState;
}

export function AdminLoginForm({ action, initialState }: AdminLoginFormProps) {
  const [state, formAction] = useFormState(action, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-semibold text-slate-700">
          E-mail corporativo
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none"
          placeholder="ana.souza@portaln43.com"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-semibold text-slate-700">
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none"
          placeholder="••••••••"
        />
      </div>

      {state.status === "error" && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </div>
      )}

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        Entrar no painel
      </button>
    </form>
  );
}

