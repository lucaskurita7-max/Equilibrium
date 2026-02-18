import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto w-full max-w-md space-y-4">
        <div className="text-2xl font-semibold">Página não encontrada</div>
        <Link href="/login" className="underline text-white/80">Ir para login</Link>
      </div>
    </main>
  );
}
