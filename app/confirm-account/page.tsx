"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

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

const messageStyle: React.CSSProperties = {
  maxWidth: "400px",
  margin: "0 auto",
  background: "#f7f9fa",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(10,36,99,0.08)",
  padding: "32px 24px",
  color: "#0A2463",
  fontWeight: "bold",
  textAlign: "center",
};

export default function ConfirmAccountPage() {
  const [message, setMessage] = useState("Confirmando cuenta...");
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams?.get("token");
    if (token) {
      fetch(`http://localhost:5103/api/users/confirm?token=${token}`)
        .then(async (res) => {
          if (res.ok) {
            setMessage("¡Cuenta confirmada exitosamente! Ya puedes iniciar sesión.");
          } else {
            const data = await res.json().catch(() => ({}));
            setMessage(data.message || "Error del servidor al confirmar la cuenta.");
          }
        })
        .catch(() => setMessage("No se pudo conectar con el servidor. Intenta más tarde."));
    } else {
      setMessage("Token de confirmación no válido.");
    }
  }, [searchParams]);

  return (
    <div>
      <header style={headerStyle}>Confirmación de Cuenta</header>
      <div style={{ textAlign: "center", margin: "0 0 24px 0" }}>
        <img
          src="/nextbid-logo.png"
          alt="Nextbid Logo"
          style={{ width: "120px", height: "120px", objectFit: "contain" }}
        />
      </div>
      <div style={messageStyle}>{message}</div>
    </div>
  );
}