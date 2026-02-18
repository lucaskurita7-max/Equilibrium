"use client";

import Link from "next/link";
import { RequireSession } from "@/components/RequireSession";
import { Button } from "@/components/Button";
import { Card, CardBody, CardHeader } from "@/components/Card";
import { getSession, getVisiblePatients, type Patient } from "@/lib/storage";
import { useEffect, useMemo, useState } from "react";

export default function AppHome() {
  return (
    <RequireSession>
      <Dashboard />
    </RequireSession>
  );
}

function Dashboard() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const session = useMemo(() => getSession(), []);

  useEffect(() => {
    setPatients(getVisiblePatients(getSession()));
  }, []);

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-2xl font-semibold">Dashboard</div>
            <div className="mt-1 text-sm text-white/60">
              {session ? (
                <>
                  Logado como <span className="font-mono">{session.email}</span> • role{" "}
                  <span className="font-mono">{session.role}</span> • tenant{" "}
                  <span className="font-mono">{session.tenantId}</span>
                </>
              ) : null}
            </div>
          </div>
          <Link href="/app/new-patient">
            <Button>Novo paciente</Button>
          </Link>
        </div>

        <Card>
          <CardHeader title="Pacientes" subtitle="Admin vê todos. Outros perfis veem apenas o próprio tenantId." />
          <CardBody>
            {patients.length === 0 ? (
              <div className="text-sm text-white/60">
                Nenhum paciente ainda. Clique em <span className="font-semibold">Novo paciente</span>.
              </div>
            ) : (
              <ul className="space-y-2">
                {patients.map((p) => (
                  <li key={p.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-white/50">
                        id <span className="font-mono">{p.id}</span> • tenant <span className="font-mono">{p.tenantId}</span>
                      </div>
                    </div>
                    <Link href={`/app/patients/${p.id}`}>
                      <Button variant="secondary">Abrir</Button>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardBody>
        </Card>

        <div className="flex gap-3">
          <Link href="/app/patients">
            <Button variant="ghost">Ver lista</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
