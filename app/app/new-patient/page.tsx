"use client";

import { RequireSession } from "@/components/RequireSession";
import { Button } from "@/components/Button";
import { Card, CardBody, CardHeader } from "@/components/Card";
import { addPatient, getSession } from "@/lib/storage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function NewPatientPage() {
  return (
    <RequireSession>
      <NewPatient />
    </RequireSession>
  );
}

function NewPatient() {
  const router = useRouter();
  const [name, setName] = useState("");

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto w-full max-w-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold">Novo paciente</div>
          <Link href="/app"><Button variant="ghost">Voltar</Button></Link>
        </div>

        <Card>
          <CardHeader title="Cadastro rápido" subtitle="Salva no localStorage e aplica tenantId da sessão." />
          <CardBody className="space-y-3">
            <label className="block">
              <div className="mb-1 text-sm text-white/70">Nome</div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Pamela Martins"
                className="w-full rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20"
              />
            </label>

            <Button
              className="w-full"
              onClick={() => {
                const s = getSession();
                if (!s) return;
                if (!name.trim()) return;
                const p = addPatient(name, s.role === "admin" ? "admin" : s.tenantId);
                router.push(`/app/patients/${p.id}`);
              }}
            >
              Criar paciente
            </Button>

            <div className="text-xs text-white/50">
              Nota: se estiver logado como <span className="font-mono">admin</span>, novos pacientes recebem tenant{" "}
              <span className="font-mono">admin</span> por padrão.
            </div>
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
