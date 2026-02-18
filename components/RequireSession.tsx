"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/storage";

export function RequireSession({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const s = getSession();
    if (!s) router.replace("/login");
  }, [router]);

  return <>{children}</>;
}
