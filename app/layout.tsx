import "./globals.css";

export const metadata = {
  title: "Equilibrium",
  description: "Sistema de Nutrição e Performance",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
