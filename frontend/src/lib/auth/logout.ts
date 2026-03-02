"use client";

import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    // si tu stockes aussi l'user dans un context / store, tu le reset ici
    router.push("/login");
  };

  return { logout };
}
