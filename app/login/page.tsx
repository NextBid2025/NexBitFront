"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Keycloak from "keycloak-js";

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

const forgotStyle: React.CSSProperties = {
  display: "block",
  marginTop: "16px",
  textAlign: "center",
  color: "#0A2463",
  textDecoration: "underline",
  cursor: "pointer",
};

const keycloakConfig = {
  url: "http://localhost:8080/auth",
  realm: "master",
  clientId: "Usersclient",
};

const keycloak = new Keycloak(keycloakConfig);

// Función para hacer peticiones autenticadas con Keycloak
export async function fetchWithKeycloak(url: string, options: RequestInit = {}) {
  if (!keycloak.token) {
    throw new Error("No autenticado con Keycloak");
  }
  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${keycloak.token}`,
    "Content-Type": "application/json",
  };
  return fetch(url, { ...options, headers });
}

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    keycloak
      .init({ onLoad: "login-required", checkLoginIframe: false })
      .then(authenticated => {
        if (authenticated) {
          // Accede al correo desde el token
          const email = keycloak.tokenParsed?.email;
          console.log("Correo del usuario:", email);
          // Puedes guardar el token si lo necesitas
          localStorage.setItem("token", keycloak.token || "");
          router.push("/"); // Redirige al inicio o dashboard
        } else {
          keycloak.login();
        }
      })
      .catch(err => {
        // Mostrar el error real en consola
        console.error("Error en Keycloak init:", err);
        alert("Error en autenticación Keycloak: " + (err?.message || JSON.stringify(err)));
      });
  }, [router]);

  return (
    <div>
      <header style={headerStyle}>Iniciar Sesión</header>
      <div style={formStyle}>
        <div style={{ textAlign: "center", margin: "32px 0" }}>
          Redirigiendo a Keycloak para autenticación...
        </div>
      </div>
    </div>
  );
}
