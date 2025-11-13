import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AdminLoginForm, type LoginState } from "@/components/features/admin/login-form";
import { authenticateUser, loginSchema } from "@/lib/mock-data";

const initialState: LoginState = { status: "idle" };

async function loginAction(_: LoginState, formData: FormData): Promise<LoginState> {
  "use server";

  const email = formData.get("email");
  const password = formData.get("password");

  const parsed = loginSchema.safeParse({
    email,
    password,
  });

  if (!parsed.success) {
    return { status: "error", message: "Informe credenciais válidas." };
  }

  const user = await authenticateUser(parsed.data.email, parsed.data.password);

  if (!user || user.role !== "admin") {
    return { status: "error", message: "Credenciais inválidas ou usuário sem permissão." };
  }

  const cookieStore = await cookies();
  cookieStore.set("pn43_admin", "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60,
  });

  redirect("/admin");
}

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
      <div className="space-y-3 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Área restrita
        </span>
        <h1 className="text-3xl font-bold text-slate-900">Acesso ao painel Portal Norte 43</h1>
        <p className="text-sm text-slate-600">
          Informe suas credenciais corporativas. Para acesso automático via n8n, utilize as APIs com o header <code>x-admin-key</code>.
        </p>
      </div>
      <AdminLoginForm action={loginAction} initialState={initialState} />
      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
        Dica mock: admin <code>ana.souza@portaln43.com</code> / senha <code>admin123</code>
      </div>
    </div>
  );
}

