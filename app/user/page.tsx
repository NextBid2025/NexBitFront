"use client";
import React, { useState } from "react";
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

const tabStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "24px",
};

const tabButtonStyle = (active: boolean): React.CSSProperties => ({
  background: active ? "#0A2463" : "#f7f9fa",
  color: active ? "#fff" : "#0A2463",
  border: "none",
  borderBottom: active ? "2px solid #0A2463" : "2px solid #ccc",
  padding: "12px 32px",
  fontSize: "1rem",
  fontWeight: "bold",
  cursor: "pointer",
  outline: "none",
  borderRadius: active ? "8px 8px 0 0" : "8px 8px 0 0",
  marginRight: "4px",
});

const formContainerStyle: React.CSSProperties = {
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

const keycloakConfig = {
  url: "http://localhost:8080/auth",
  realm: "master",
  clientId: "Usersclient",
};

const keycloak = new Keycloak(keycloakConfig);

const RegisterForm: React.FC = () => {
  const [form, setForm] = useState({
    usuario: "",
    name: "",
    lastName: "",
    email: "",
    roleId: "",
    address: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (
      !form.usuario ||
      !form.name ||
      !form.lastName ||
      !form.email ||
      !form.roleId ||
      !form.address ||
      !form.phone ||
      !form.password
    ) {
      setMessage("Por favor, completa todos los campos.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5103/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      let data = {};
      try {
        data = await res.json();
      } catch (err) {
        // Si la respuesta no es JSON, deja data vacío
      }
      if (res.ok) {
        setMessage("Registro exitoso. Por favor revisa tu correo para confirmar tu cuenta.");
        setForm({
          usuario: "",
          name: "",
          lastName: "",
          email: "",
          roleId: "",
          address: "",
          phone: "",
          password: "",
        });

        // Aquí podrías redirigir automáticamente al usuario a la pantalla de confirmación si lo deseas:
        // window.location.href = "/confirm-account";
      } else {
        setMessage((data as any).message || "Error al registrar usuario.");
      }
    } catch {
      setMessage("No se pudo conectar con el servidor.");
    }
    setLoading(false);
  };

  return (
    <div style={formContainerStyle}>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle} htmlFor="usuario">Usuario</label>
        <input style={inputStyle} name="usuario" id="usuario" value={form.usuario} onChange={handleChange} required />

        <label style={labelStyle} htmlFor="name">Nombre</label>
        <input style={inputStyle} name="name" id="name" value={form.name} onChange={handleChange} required />

        <label style={labelStyle} htmlFor="lastName">Apellido</label>
        <input style={inputStyle} name="lastName" id="lastName" value={form.lastName} onChange={handleChange} required />

        <label style={labelStyle} htmlFor="email">Correo</label>
        <input style={inputStyle} name="email" id="email" type="email" value={form.email} onChange={handleChange} required />

        <label style={labelStyle} htmlFor="roleId">Rol</label>
        <input style={inputStyle} name="roleId" id="roleId" value={form.roleId} onChange={handleChange} required />

        <label style={labelStyle} htmlFor="address">Dirección</label>
        <input style={inputStyle} name="address" id="address" value={form.address} onChange={handleChange} required />

        <label style={labelStyle} htmlFor="phone">Teléfono</label>
        <input style={inputStyle} name="phone" id="phone" value={form.phone} onChange={handleChange} required />

        <label style={labelStyle} htmlFor="password">Contraseña</label>
        <input style={inputStyle} name="password" id="password" type="password" value={form.password} onChange={handleChange} required />

        <button style={buttonStyle} type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
        {message && <div style={messageStyle}>{message}</div>}
      </form>
    </div>
  );
}

export default function UserPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [authenticating, setAuthenticating] = useState(false);

  const handleKeycloakLogin = () => {
    setAuthenticating(true);
    keycloak
      .init({ onLoad: "login-required", checkLoginIframe: false })
      .then(authenticated => {
        if (authenticated) {
          const email = keycloak.tokenParsed?.email;
          console.log("Correo del usuario:", email);
          localStorage.setItem("token", keycloak.token || "");
          window.location.href = "/"; // Redirige al inicio o dashboard
        } else {
          keycloak.login();
        }
      })
      .catch(err => {
        setAuthenticating(false);
        console.error("Error en Keycloak init:", err);
        alert("Error en autenticación Keycloak: " + (err?.message || JSON.stringify(err)));
      });
  };

  return (
    <div>
      <header style={headerStyle}>Bienvenido</header>
      <div style={tabStyle}>
        <button
          style={tabButtonStyle(tab === "login")}
          onClick={handleKeycloakLogin}
          disabled={authenticating}
        >
          Iniciar Sesión
        </button>
        <button
          style={tabButtonStyle(tab === "register")}
          onClick={() => setTab("register")}
        >
          Registrar Usuario
        </button>
      </div>
      {authenticating && (
        <div style={{ textAlign: "center", margin: "32px 0" }}>
          Redirigiendo a Keycloak para autenticación...
        </div>
      )}
      {tab === "register" && <RegisterForm />}
    </div>
  );
}
