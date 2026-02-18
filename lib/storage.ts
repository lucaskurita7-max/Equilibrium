export type Role = "admin" | "nutri" | "academia" | "demo";

export type Session = {
  email: string;
  role: Role;
  tenantId: string;
};

export type Patient = {
  id: string;
  name: string;
  tenantId: string;
  createdAt: string;
  notes?: string;
};

const KEY_SESSION = "eq_session";
const KEY_PATIENTS = "patients";

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(KEY_SESSION);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export function setSession(session: Session) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY_SESSION, JSON.stringify(session));
}

export function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY_SESSION);
}

export function getPatients(): Patient[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(KEY_PATIENTS);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Patient[];
  } catch {
    return [];
  }
}

export function savePatients(patients: Patient[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY_PATIENTS, JSON.stringify(patients));
}

export function getVisiblePatients(session: Session | null): Patient[] {
  const all = getPatients();
  if (!session) return [];
  if (session.role === "admin") return all;
  return all.filter((p) => p.tenantId === session.tenantId);
}

export function addPatient(name: string, tenantId: string) {
  const all = getPatients();
  const p: Patient = {
    id: crypto.randomUUID(),
    name: name.trim(),
    tenantId,
    createdAt: new Date().toISOString(),
  };
  savePatients([p, ...all]);
  return p;
}

export function getPatientById(id: string): Patient | null {
  const all = getPatients();
  return all.find((p) => p.id === id) ?? null;
}

export function updatePatient(id: string, patch: Partial<Patient>) {
  const all = getPatients();
  const next = all.map((p) => (p.id === id ? { ...p, ...patch } : p));
  savePatients(next);
}
