import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Equilibrium",
  description: "Sistema de Nutrição e Performance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-zinc-950 text-zinc-50">
        {children}
      </body>
    </html>
  );
}
