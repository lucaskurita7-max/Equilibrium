export type Role = 'admin' | 'nutri' | 'academia' | 'demo'

export type User = {
  id: string
  name: string
  email: string
  role: Role
}

export type Patient = {
  id: string
  userId: string
  nome: string
  sexo: 'M'|'F'
  idade: number
  pesoKg: number
  alturaM: number
  objetivo: 'Emagrecimento'|'Recomposicao'|'Hipertrofia'|'Performance'
  createdAt: string
}

export type Metabolic = {
  patientId: string
  tdee: number
  alvoKcal: number
  p: number
  c: number
  g: number
}

export type Diet = {
  patientId: string
  meals: { name: string; items: { food: string; qty: string; kcal: number; p: number; c: number; g: number }[] }[]
}

const KEY = 'eq_prostart_v1'

type Db = {
  users: User[]
  patients: Patient[]
  metabolic: Metabolic[]
  diets: Diet[]
  session?: { token: string; userId: string }
}

function uid(prefix='id') {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`
}

export function loadDb(): Db {
  if (typeof window === 'undefined') return { users: [], patients: [], metabolic: [], diets: [] }
  const raw = localStorage.getItem(KEY)
  if (!raw) {
    const seed = seedDb()
    localStorage.setItem(KEY, JSON.stringify(seed))
    return seed
  }
  try {
    return JSON.parse(raw)
  } catch {
    const seed = seedDb()
    localStorage.setItem(KEY, JSON.stringify(seed))
    return seed
  }
}

export function saveDb(db: Db) {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEY, JSON.stringify(db))
}

export function seedDb(): Db {
  const users: User[] = [
    { id: 'u_admin', name: 'Admin', email: 'admin@equilibrium.com', role: 'admin' },
    { id: 'u_nutri', name: 'Nutri Demo', email: 'nutri@equilibrium.com', role: 'nutri' },
    { id: 'u_acad', name: 'Academia Demo', email: 'academia@equilibrium.com', role: 'academia' },
    { id: 'u_demo', name: 'Demo', email: 'demo@equilibrium.com', role: 'demo' },
  ]

  const makePatient = (userId: string, nome: string, sexo: 'M'|'F', idade: number, pesoKg: number, alturaM: number, objetivo: Patient['objetivo']): Patient => ({
    id: uid('p'), userId, nome, sexo, idade, pesoKg, alturaM, objetivo, createdAt: new Date().toISOString(),
  })

  const patients: Patient[] = [
    makePatient('u_nutri', 'Paciente 01 (emag)', 'F', 31, 59, 1.60, 'Emagrecimento'),
    makePatient('u_nutri', 'Paciente 02 (recomp)', 'M', 28, 82, 1.78, 'Recomposicao'),
    makePatient('u_acad', 'Aluno 01 (hiper)', 'M', 22, 65, 1.66, 'Hipertrofia'),
    makePatient('u_acad', 'Aluno 02 (perf)', 'F', 19, 60, 1.70, 'Performance'),
    makePatient('u_demo', 'Paciente 03 (perf)', 'F', 15, 78, 1.66, 'Performance'),
    makePatient('u_demo', 'Paciente 04 (emag)', 'M', 32, 77, 1.82, 'Emagrecimento'),
    makePatient('u_admin', 'Paciente 05 (recomp)', 'F', 35, 68, 1.63, 'Recomposicao'),
    makePatient('u_admin', 'Paciente 06 (hiper)', 'M', 26, 74, 1.75, 'Hipertrofia'),
    makePatient('u_admin', 'Paciente 07 (perf)', 'M', 30, 70, 1.74, 'Performance'),
    makePatient('u_admin', 'Paciente 08 (emag)', 'F', 42, 72, 1.58, 'Emagrecimento'),
  ]

  const metabolic: Metabolic[] = patients.map((p) => {
    const bmr = p.sexo === 'M'
      ? (10*p.pesoKg + 6.25*(p.alturaM*100) - 5*p.idade + 5)
      : (10*p.pesoKg + 6.25*(p.alturaM*100) - 5*p.idade - 161)
    const tdee = Math.round(bmr * 1.6)
    const alvo = Math.round(tdee + (p.objetivo === 'Hipertrofia' ? 250 : p.objetivo === 'Emagrecimento' ? -400 : p.objetivo === 'Recomposicao' ? -250 : 0))
    const pG = Math.round(p.pesoKg * 1.8)
    const gG = Math.round(p.pesoKg * 0.8)
    const kcalPG = pG*4
    const kcalGG = gG*9
    const cG = Math.max(0, Math.round((alvo - kcalPG - kcalGG)/4))
    return { patientId: p.id, tdee, alvoKcal: alvo, p: pG, c: cG, g: gG }
  })

  const diets: Diet[] = patients.map((p) => {
    const m = metabolic.find(x => x.patientId === p.id)!
    const split = [0.25, 0.30, 0.20, 0.25]
    const mealNames = ['Café / 1ª refeição', 'Almoço', 'Pré-treino', 'Jantar']
    const baseFoods = [
      { food: 'Arroz cozido', qty: '150 g', kcal: 195, p: 4, c: 42, g: 0.5 },
      { food: 'Feijão', qty: '1 concha', kcal: 120, p: 8, c: 20, g: 1 },
      { food: 'Frango grelhado', qty: '150 g', kcal: 248, p: 46, c: 0, g: 5 },
      { food: 'Salada + azeite', qty: 'à vontade', kcal: 120, p: 2, c: 8, g: 10 },
      { food: 'Iogurte natural', qty: '170 g', kcal: 110, p: 8, c: 12, g: 3 },
      { food: 'Banana', qty: '1 un', kcal: 90, p: 1, c: 23, g: 0.3 },
      { food: 'Aveia', qty: '30 g', kcal: 114, p: 4, c: 19, g: 2 },
    ]

    const meals = mealNames.map((name, idx) => {
      const kcalTarget = Math.round(m.alvoKcal * split[idx])
      // usar 2-3 itens para simular
      const items = idx === 0 ? [baseFoods[4], baseFoods[5], baseFoods[6]]
        : idx === 1 ? [baseFoods[0], baseFoods[1], baseFoods[2], baseFoods[3]]
        : idx === 2 ? [baseFoods[5], baseFoods[4]]
        : [baseFoods[0], baseFoods[2], baseFoods[3]]

      // Ajuste leve para ficar “bonito”
      const sum = items.reduce((a, it) => a + it.kcal, 0)
      const factor = kcalTarget / Math.max(1, sum)
      const scaled = items.map(it => ({
        ...it,
        kcal: Math.round(it.kcal * factor),
        p: Math.round(it.p * factor),
        c: Math.round(it.c * factor),
        g: Math.round(it.g * factor),
      }))
      return { name, items: scaled }
    })

    return { patientId: p.id, meals }
  })

  return { users, patients, metabolic, diets }
}

export function login(email: string): { ok: boolean; message?: string } {
  const db = loadDb()
  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase())
  if (!user) return { ok: false, message: 'Email não encontrado (use um dos emails demo).' }
  db.session = { token: uid('t'), userId: user.id }
  saveDb(db)
  return { ok: true }
}

export function logout() {
  const db = loadDb()
  delete db.session
  saveDb(db)
}

export function currentUser(): User | null {
  const db = loadDb()
  const userId = db.session?.userId
  if (!userId) return null
  return db.users.find(u => u.id === userId) ?? null
}

export function listPatients(): Patient[] {
  const db = loadDb()
  const u = currentUser()
  if (!u) return []
  return db.patients.filter(p => u.role === 'admin' ? true : p.userId === u.id)
}

export function getPatient(id: string): { patient: Patient; metabolic: Metabolic; diet: Diet } | null {
  const db = loadDb()
  const u = currentUser()
  const patient = db.patients.find(p => p.id === id)
  if (!patient || !u) return null
  if (u.role !== 'admin' && patient.userId !== u.id) return null
  const metabolic = db.metabolic.find(m => m.patientId === id)!
  const diet = db.diets.find(d => d.patientId === id)!
  return { patient, metabolic, diet }
}

export function createPatient(input: Omit<Patient, 'id'|'createdAt'|'userId'>) {
  const db = loadDb()
  const u = currentUser()
  if (!u) throw new Error('not_logged')
  const patient: Patient = { ...input, id: uid('p'), userId: u.id, createdAt: new Date().toISOString() }
  db.patients.unshift(patient)

  // gerar plano simples
  const bmr = patient.sexo === 'M'
    ? (10*patient.pesoKg + 6.25*(patient.alturaM*100) - 5*patient.idade + 5)
    : (10*patient.pesoKg + 6.25*(patient.alturaM*100) - 5*patient.idade - 161)
  const tdee = Math.round(bmr * 1.6)
  const alvo = Math.round(tdee + (patient.objetivo === 'Hipertrofia' ? 250 : patient.objetivo === 'Emagrecimento' ? -400 : patient.objetivo === 'Recomposicao' ? -250 : 0))
  const pG = Math.round(patient.pesoKg * 1.8)
  const gG = Math.round(patient.pesoKg * 0.8)
  const cG = Math.max(0, Math.round((alvo - pG*4 - gG*9)/4))
  db.metabolic.push({ patientId: patient.id, tdee, alvoKcal: alvo, p: pG, c: cG, g: gG })

  db.diets.push({
    patientId: patient.id,
    meals: [
      { name: 'Café / 1ª refeição', items: [{ food: 'Iogurte natural', qty: '170 g', kcal: 110, p: 8, c: 12, g: 3 }] },
      { name: 'Almoço', items: [{ food: 'Arroz + feijão + frango', qty: 'porções', kcal: 520, p: 45, c: 65, g: 10 }] },
      { name: 'Pré-treino', items: [{ food: 'Banana + whey', qty: '1 un + 1 scoop', kcal: 210, p: 24, c: 25, g: 2 }] },
      { name: 'Jantar', items: [{ food: 'Proteína magra + legumes', qty: 'porções', kcal: 420, p: 40, c: 30, g: 14 }] },
    ]
  })

  saveDb(db)
  return patient.id
}
