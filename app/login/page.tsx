"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { Card, CardBody, CardHeader } from "@/components/Card";
import { setSession, type Session } from "@/lib/storage";

const OPTIONS: { label: string; session: Session }[] = [
  { label: "Entrar como Admin", session: { email: "admin@equilibrium", role: "admin", tenantId: "admin" } },
  { label: "Entrar como Nutri (demo)", session: { email: "nutri@demo", role: "nutri", tenantId: "nutri" } },
  { label: "Entrar como Academia (demo)", session: { email: "academia@demo", role: "academia", tenantId: "academia" } },
  { label: "Entrar como Demo", session: { email: "demo@demo", role: "demo", tenantId: "demo" } },
];

export default function LoginPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-6">
          <div className="text-3xl font-semibold">Equilibrium</div>
          <div className="mt-1 text-sm text-white/60">Login V1 (modo B) — sem senha.</div>
        </div>

        <Card>
          <CardHeader title="Escolha um perfil" subtitle="A sessão é salva no localStorage (eq_session)." />
          <CardBody className="space-y-3">
            {OPTIONS.map((o) => (
              <Button
                key={o.label}
                className="w-full"
                variant="secondary"
                onClick={() => {
                  setSession(o.session);
                  router.push("/app");
                }}
              >
                {o.label}
              </Button>
            ))}

            <div className="pt-2 text-xs text-white/50">
              Dica: para “deslogar”, apague <span className="font-mono">eq_session</span> no localStorage.
            </div>
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
