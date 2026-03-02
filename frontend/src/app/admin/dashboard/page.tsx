"use client";

import { useLogout } from "@/lib/auth/logout";

export default function AdminDashboardPage() {
  const { logout } = useLogout();

  return (
    <main>
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Admin Dashboard</h1>
        <button onClick={logout}>Se déconnecter</button>
      </header>
      <p>Gestion des véhicules, réservations, etc.</p>
    </main>
  );
}
