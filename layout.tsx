import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Equilibrium — Pro Start',
  description: 'Sistema inteligente de nutrição e performance (demo).',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
