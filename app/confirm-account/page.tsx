"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

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
  const router = useRouter();

  useEffect(() => {
    const token = searchParams?.get("token");
    if (token) {
      fetch(`http://localhost:5103/api/users/confirm?token=${token}`)
        .then(async (res) => {
          if (res.ok) {
            setMessage("¡Cuenta confirmada exitosamente! Ya puedes iniciar sesión.");
            // Opcional: redirigir después de unos segundos
            // setTimeout(() => router.push("/login"), 3000);
          } else {
            const data = await res.json();
            setMessage(data.message || "No se pudo confirmar la cuenta.");
          }
        })
        .catch(() => setMessage("Error de conexión con el servidor."));
    } else {
      setMessage("Token de confirmación no válido.");
    }
  }, [searchParams, router]);

  return (
    <div>
      <header style={headerStyle}>Confirmación de Cuenta</header>
      <div style={messageStyle}>{message}</div>
    </div>
  );
}
