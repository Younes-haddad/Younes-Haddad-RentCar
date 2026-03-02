"use client";

import { useLogout } from "@/lib/auth/logout";

export default function UserDashboardPage() {
  const { logout } = useLogout();

  return (
    <main>
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>User Dashboard</h1>
        <button onClick={logout}>Se déconnecter</button>
      </header>
      <p>Bienvenue sur ton espace client.</p>
    </main>
  );
}

