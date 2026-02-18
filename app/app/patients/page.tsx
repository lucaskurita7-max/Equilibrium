"use client";

import Link from "next/link";
import { RequireSession } from "@/components/RequireSession";
import { Button } from "@/components/Button";
import { Card, CardBody, CardHeader } from "@/components/Card";
import { getVisiblePatients, getSession, type Patient } from "@/lib/storage";
import { useEffect, useState } from "react";

export default function PatientsPage() {
  return (
    <RequireSession>
      <Patients />
    </RequireSession>
  );
}

function Patients() {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    setPatients(getVisiblePatients(getSession()));
  }, []);

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto w-full max-w-3xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold">Pacientes</div>
          <div className="flex gap-2">
            <Link href="/app/new-patient"><Button>Novo</Button></Link>
            <Link href="/app"><Button variant="ghost">Dashboard</Button></Link>
          </div>
        </div>

        <Card>
          <CardHeader title="Lista" />
          <CardBody>
            {patients.length === 0 ? (
              <div className="text-sm text-white/60">Nenhum paciente.</div>
            ) : (
              <ul className="space-y-2">
                {patients.map((p) => (
                  <li key={p.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-white/50">tenant <span className="font-mono">{p.tenantId}</span></div>
                    </div>
                    <Link href={`/app/patients/${p.id}`}><Button variant="secondary">Abrir</Button></Link>
                  </li>
                ))}
              </ul>
            )}
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
