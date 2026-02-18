"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { RequireSession } from "@/components/RequireSession";
import { Button } from "@/components/Button";
import { Card, CardBody, CardHeader } from "@/components/Card";
import { getPatientById, getSession, getVisiblePatients, updatePatient, type Patient } from "@/lib/storage";
import { useEffect, useMemo, useState } from "react";

export default function PatientDetailPage() {
  return (
    <RequireSession>
      <Detail />
    </RequireSession>
  );
}

function Detail() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const session = useMemo(() => getSession(), []);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!id) return;
    const p = getPatientById(id);
    if (!p) return;
    // tenant guard (admin sees all)
    const visible = getVisiblePatients(session).some((x) => x.id === id);
    if (!visible) return;
    setPatient(p);
    setNotes(p.notes ?? "");
  }, [id, session]);

  if (!patient) {
    return (
      <main className="min-h-screen px-4 py-10">
        <div className="mx-auto w-full max-w-2xl space-y-4">
          <div className="text-xl font-semibold">Paciente não encontrado</div>
          <Link href="/app"><Button>Voltar</Button></Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto w-full max-w-2xl space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-2xl font-semibold">{patient.name}</div>
            <div className="mt-1 text-xs text-white/50">
              id <span className="font-mono">{patient.id}</span> • tenant <span className="font-mono">{patient.tenantId}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/app/patients"><Button variant="ghost">Lista</Button></Link>
            <Link href="/app"><Button variant="ghost">Dashboard</Button></Link>
          </div>
        </div>

        <Card>
          <CardHeader title="Notas rápidas" subtitle="(placeholder) — aqui entra o fluxo de dieta/PDF depois." />
          <CardBody className="space-y-3">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
              className="w-full rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20"
              placeholder="Anotações do paciente..."
            />
            <Button
              onClick={() => {
                updatePatient(patient.id, { notes });
                setPatient({ ...patient, notes });
              }}
            >
              Salvar
            </Button>
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
