"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Tous les champs sont obligatoires");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Une erreur est survenue");
        setLoading(false);
        return;
      }

      const data = await response.json();

      // Stocker le token si tu veux
      localStorage.setItem("token", data.token);

      // redirection selon le rôle 
      if (data.user.role === "ADMIN") { 
        router.push("/admin/dashboard"); } 
      else {
        router.push("/dashboard"); }



    } catch (err) {
      setError("Impossible de contacter le serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <img src="/images/logo.png" alt="Logo" className={styles.logo} />

        <h1 className={styles.title}>Connexion</h1>

        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className={styles.input}
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className={styles.error}>{error}</p>}

          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className={styles.register}>
          Pas encore de compte ? <a href="/register">Inscrivez-vous</a>
        </p>
      </div>
    </div>
  );
}
