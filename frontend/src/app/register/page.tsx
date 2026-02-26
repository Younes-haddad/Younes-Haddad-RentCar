"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorMessage("");

    const payload = {
      email,
      password,
      firstName,
      lastName,
    };

    try {
      const response = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push("/login");
        return;
      }

      const errorData = await response.json();
      setErrorMessage(errorData.message || "Une erreur est survenue");

    } catch (err) {
      setErrorMessage("Impossible de contacter le serveur");
    }
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Créer un compte</h1>

      {errorMessage && (
        <p style={{ color: "red", marginBottom: 10 }}>{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Mot de passe</label>
          <input
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Prénom</label>
          <input
            type="text"
            className={styles.input}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Nom</label>
          <input
            type="text"
            className={styles.input}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <button type="submit" className={styles.button}>
          Créer mon compte
        </button>
      </form>
    </main>
  );
}
