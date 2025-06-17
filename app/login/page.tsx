"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const headerStyle: React.CSSProperties = {
  background: "#0A2463",
  color: "#fff",
  padding: "24px 0",
  textAlign: "center",
  borderRadius: "8px",
  marginBottom: "32px",
  fontSize: "2rem",
  fontWeight: "bold",
  letterSpacing: "1px",
};

const formStyle: React.CSSProperties = {
  maxWidth: "400px",
  margin: "0 auto",
  background: "#f7f9fa",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(10,36,99,0.08)",
  padding: "32px 24px",
};

const labelStyle: React.CSSProperties = {
  color: "#0A2463",
  fontWeight: "bold",
  marginTop: "10px",
  display: "block",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  margin: "8px 0",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "16px",
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#0A2463",
  color: "#fff",
  padding: "12px",
  border: "none",
  borderRadius: "4px",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "12px",
  width: "100%",
};

const messageStyle: React.CSSProperties = {
  marginTop: "16px",
  color: "#0A2463",
  fontWeight: "bold",
  textAlign: "center",
};

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("http://localhost:5103/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        setMessage("Inicio de sesión exitoso.");
        router.push("/"); // Redirige al inicio o dashboard
      } else {
        setMessage(data.message || "Credenciales incorrectas o cuenta no activada.");
      }
    } catch {
      setMessage("Error de conexión con el servidor.");
    }
    setLoading(false);
  };

  return (
    <div>
      <header style={headerStyle}>Iniciar Sesión</header>
      <div style={formStyle}>
        <form onSubmit={handleSubmit}>
          <label style={labelStyle} htmlFor="email">Correo</label>
          <input
            style={inputStyle}
            name="email"
            id="email"
            type="email"
            placeholder="Correo"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label style={labelStyle} htmlFor="password">Contraseña</label>
          <input
            style={inputStyle}
            name="password"
            id="password"
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button style={buttonStyle} type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Iniciar Sesión"}
          </button>
          {message && <div style={messageStyle}>{message}</div>}
        </form>
      </div>
    </div>
  );
}
