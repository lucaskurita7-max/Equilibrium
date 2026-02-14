import Link from 'next/link'
import { BrandMark } from '@/components/BrandMark'
import { Card, Button } from '@/components/Ui'

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="flex items-center justify-between gap-4">
          <BrandMark />
          <div className="flex gap-2">
            <Link href="/login"><Button>Entrar</Button></Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">Equilibrium Pro Start</h1>
            <p className="text-white/75 leading-relaxed">
              Demo profissional para você testar fluxo de atendimento: cadastro de paciente, metas metabólicas,
              cardápio base e exportação por impressão (PDF). Feito para ser apresentado a profissionais sem precisar explicar tecnologia.
            </p>
            <div className="flex flex-wrap gap-2">
              <Link href="/login"><Button>Começar agora</Button></Link>
              <a className="no-print" href="#como" ><Button variant="ghost">Como testar (72h)</Button></a>
            </div>

            <div className="text-xs text-white/60">
              Observação: esta versão é uma demo com dados seedados em navegador (localStorage), ideal para apresentar e testar UX.
              No produto final, entraremos com banco real, autenticação robusta e white-label.
            </div>
          </div>

          <Card title="Acesso demo (clique 1)">
            <div className="grid gap-3 text-sm text-white/80">
              <div className="rounded-xl border border-stroke2 bg-panel2 p-3">
                <div className="font-bold">Admin</div>
                <div className="text-white/70">admin@equilibrium.com</div>
                <div className="text-white/60">(sem senha nesta demo)</div>
              </div>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  { t: 'Nutri Demo', e: 'nutri@equilibrium.com' },
                  { t: 'Academia Demo', e: 'academia@equilibrium.com' },
                  { t: 'Demo', e: 'demo@equilibrium.com' },
                ].map((x) => (
                  <div key={x.e} className="rounded-xl border border-stroke2 bg-panel2 p-3">
                    <div className="font-bold">{x.t}</div>
                    <div className="text-white/70 text-xs">{x.e}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <Card title="Como testar em 72h" className="print-card" >
          <div id="como" className="grid gap-3 text-sm text-white/80">
            <div><b>Dia 1:</b> entrar com Nutri Demo → abrir pacientes → exportar 1 plano → criar 1 paciente novo.</div>
            <div><b>Dia 2:</b> simular consultório: criar 5 pacientes seguidos, sem travar.</div>
            <div><b>Dia 3:</b> abrir no celular, testar login e exportação por impressão (gera PDF no iPhone/Android).</div>
          </div>
        </Card>

        <div className="text-center text-xs text-white/50">© {new Date().getFullYear()} Equilibrium</div>
      </div>
    </main>
  )
}
