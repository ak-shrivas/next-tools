// app/admin/protected.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Protected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("admin") === "true";

  useEffect(() => {
    if (!isLoggedIn) router.replace("/admin/login");
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  return <>{children}</>;
}
