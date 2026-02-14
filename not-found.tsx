import Link from 'next/link'
import { Card, Button } from '@/components/Ui'

export default function NotFound() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-xl">
        <Card title="Página não encontrada">
          <div className="text-sm text-white/70">Volte para o início.</div>
          <div className="mt-4"><Link href="/"><Button>Home</Button></Link></div>
        </Card>
      </div>
    </main>
  )
}
