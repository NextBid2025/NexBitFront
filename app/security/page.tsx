"use client";
import React, { useState } from "react";

const styles = {
  container: {
    maxWidth: 500,
    margin: "40px auto",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 12px rgba(10,36,99,0.08)",
    padding: "32px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    color: "#0A2463",
    textAlign: "center" as const,
    marginBottom: 24,
    fontSize: "2rem",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
  label: {
    color: "#0A2463",
    fontWeight: 500,
    fontSize: "1rem",
    display: "block",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    border: "1px solid #B3B3B3",
    borderRadius: "4px",
    padding: "8px 12px",
    fontSize: "1rem",
    width: "100%",
    marginBottom: 4,
    outline: "none",
    transition: "border 0.2s",
  },
  button: {
    background: "#0A2463",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "12px 24px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: 24,
    width: "100%",
    letterSpacing: "1px",
    transition: "background 0.2s",
  },
  error: {
    color: "#B71C1C",
    textAlign: "center" as const,
    marginTop: 18,
    fontWeight: 500,
  },
  mensaje: {
    color: "green",
    textAlign: "center" as const,
    marginTop: 18,
    fontWeight: 500,
  }
};

export default function SecurityPage() {
  const [actual, setActual] = useState("");
  const [nueva, setNueva] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMensaje("");
    if (nueva !== confirmar) {
      setError("Las contraseñas nuevas no coinciden.");
      return;
    }
    if (nueva.length < 8) {
      setError("La nueva contraseña debe tener al menos 8 caracteres.");
      return;
    }
    setLoading(true);
    // Aquí deberías llamar a la API real para cambiar la contraseña
    setTimeout(() => {
      setMensaje("Contraseña cambiada exitosamente. Revisa tu correo para la notificación.");
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Cambiar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <label style={styles.label}>Contraseña Actual:
          <input
            style={styles.input}
            type="password"
            value={actual}
            onChange={e => setActual(e.target.value)}
            required
          />
        </label>
        <label style={styles.label}>Nueva Contraseña:
          <input
            style={styles.input}
            type="password"
            value={nueva}
            onChange={e => setNueva(e.target.value)}
            required
          />
        </label>
        <label style={styles.label}>Confirmar Nueva Contraseña:
          <input
            style={styles.input}
            type="password"
            value={confirmar}
            onChange={e => setConfirmar(e.target.value)}
            required
          />
        </label>
        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? "Cambiando..." : "Cambiar Contraseña"}
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      {mensaje && <p style={styles.mensaje}>{mensaje}</p>}
    </div>
  );
}
