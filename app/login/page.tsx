"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Keycloak from "keycloak-js";

// Estilos (puedes moverlos a un archivo CSS modules si prefieres)
const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif"
  },
  header: {
    background: "#0A2463",
    color: "#fff",
    padding: "24px 0",
    textAlign: "center",
    borderRadius: "8px",
    marginBottom: "32px",
    fontSize: "2rem",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
  loadingContainer: {
    textAlign: "center" as const,
    margin: "50px 0",
    fontSize: "18px",
    color: "#0A2463"
  },
  errorContainer: {
    background: "#FFEBEE",
    padding: "20px",
    borderRadius: "8px",
    margin: "20px 0",
    color: "#B71C1C",
    textAlign: "center" as const
  },
  retryButton: {
    backgroundColor: "#0A2463",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px"
  }
};

// Configuración de Keycloak (ajusta estos valores)
const keycloakConfig = {
  url: "http://localhost:8080", // Asegúrate de incluir /auth al final
  realm: "UsersSubasta2025",
  clientId: "Usersclient",
};

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Crea la instancia de Keycloak dentro del useEffect para evitar inicializaciones múltiples
    const keycloak = new Keycloak(keycloakConfig);

    const initializeKeycloak = async () => {
      try {
        const authenticated = await keycloak.init({
          onLoad: "login-required",
          checkLoginIframe: false,
          pkceMethod: "S256",
          flow: "standard",
          redirectUri: "http://localhost:3000/home", // Redirige a /home después de login
        });

        if (authenticated) {
          sessionStorage.setItem("kc_token", keycloak.token || "");
          sessionStorage.setItem("kc_refreshToken", keycloak.refreshToken || "");
          // Aquí rediriges al usuario al home real
          router.push("/home");
        } else {
          keycloak.login({ redirectUri: "http://localhost:3000/home" });
        }
      } catch (err: any) {
        console.error("Error en Keycloak initialization:", err);
        setError("Error de autenticación: " + (err?.message || "Verifica la configuración de Keycloak y la URL."));
      } finally {
        setLoading(false);
      }
    };

    initializeKeycloak();
  }, [router]);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    const keycloak = new Keycloak(keycloakConfig);
    keycloak.login({ redirectUri: "http://localhost:3000/" }); // Intenta nuevamente
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <p>Redirigiendo al servicio de autenticación...</p>
          <p>Por favor espere.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorContainer}>
          <h2>Error de Autenticación</h2>
          <p>{error}</p>
          <p>Verifica que:</p>
          <ul style={{ textAlign: "left", margin: "10px auto", maxWidth: "500px" }}>
            <li>El servidor Keycloak esté corriendo en <b>http://localhost:8080/auth</b></li>
            <li>El realm "<b>master</b>" exista</li>
            <li>El client "<b>Usersclient</b>" esté configurado correctamente</li>
            <li>La URL de redirección sea <b>http://localhost:3000/</b> y esté en "Valid Redirect URIs"</li>
          </ul>
        </div>
      </div>
    );
  }

  return null;
}

// Función para hacer fetch autenticado (exportable)
export async function authFetch(url: string, options: RequestInit = {}) {
  // Crea una nueva instancia de Keycloak
  const keycloak = new Keycloak(keycloakConfig);

  // Inicializa Keycloak y verifica autenticación
  const authenticated = await keycloak.init({
    onLoad: "check-sso",
    checkLoginIframe: false,
    pkceMethod: "S256",
    flow: "standard",
    silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
  });

  if (!authenticated || !keycloak.token) {
    throw new Error("Usuario no autenticado");
  }

  // Actualiza el token si está cerca de expirar
  try {
    const refreshed = await keycloak.updateToken(30); // 30 segundos de margen
    if (refreshed) {
      console.log("Token actualizado");
    }
  } catch (err) {
    console.error("Error al actualizar token:", err);
    throw new Error("Error de autenticación");
  }

  const headers = new Headers(options.headers || {});
  headers.set("Authorization", `Bearer ${keycloak.token}`);
  headers.set("Content-Type", "application/json");

  return fetch(url, {
    ...options,
    headers
  });
}