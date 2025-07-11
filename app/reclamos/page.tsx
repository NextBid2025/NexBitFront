"use client";
import React, { useState } from "react";
import AllReclamosPage from "./allreclamo";
import CrearReclamo from "./crearReclamo";

// Menú principal reutilizable
function ReclamosMenu({ tab, setTab }: { tab: string; setTab: (t: any) => void }) {
  return (
    <nav style={{
      display: "flex",
      gap: 16,
      justifyContent: "center",
      marginBottom: 32,
      background: "#f8f9fa",
      borderRadius: 10,
      padding: "12px 0",
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
    }}>
      <button
        style={{
          padding: "12px 32px",
          fontWeight: 600,
          border: "none",
          borderBottom: tab === "ver" ? "3px solid #0A2463" : "3px solid transparent",
          background: "none",
          color: tab === "ver" ? "#0A2463" : "#555",
          cursor: "pointer",
          fontSize: 18,
          transition: "color 0.2s, border-bottom 0.2s"
        }}
        onClick={() => setTab("ver")}
      >
        Ver Reclamos
      </button>
      <button
        style={{
          padding: "12px 32px",
          fontWeight: 600,
          border: "none",
          borderBottom: tab === "crear" ? "3px solid #0A2463" : "3px solid transparent",
          background: "none",
          color: tab === "crear" ? "#0A2463" : "#555",
          cursor: "pointer",
          fontSize: 18,
          transition: "color 0.2s, border-bottom 0.2s"
        }}
        onClick={() => setTab("crear")}
      >
        Crear Reclamo
      </button>
      <button
        style={{
          padding: "12px 32px",
          fontWeight: 600,
          border: "none",
          borderBottom: tab === "resolver" ? "3px solid #0A2463" : "3px solid transparent",
          background: "none",
          color: tab === "resolver" ? "#0A2463" : "#555",
          cursor: "pointer",
          fontSize: 18,
          transition: "color 0.2s, border-bottom 0.2s"
        }}
        onClick={() => setTab("resolver")}
      >
        Resolver Reclamo
      </button>
    </nav>
  );
}

// Componente para resolver reclamo
function ResolverReclamoPage() {
  const [reclamoId, setReclamoId] = useState("");
  const [usuarioId, setUsuarioId] = useState("");
  const [resolucion, setResolucion] = useState("");
  const [estadoFinal, setEstadoFinal] = useState("Resuelto");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResolver = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje("");
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5300/api/reclamos/${reclamoId}/resolver`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reclamoId,
          resolucion,
          estadoFinal,
          usuarioId,
        }),
      });
      if (response.ok) {
        setMensaje("Reclamo resuelto correctamente.");
        setResolucion("");
        setEstadoFinal("Resuelto");
      } else {
        const data = await response.json();
        setMensaje(data.message || "Error al resolver el reclamo.");
      }
    } catch {
      setMensaje("Error de conexión.");
    }
    setLoading(false);
  };

  return (
    <div style={{
      maxWidth: 500,
      margin: "40px auto",
      padding: 24,
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
      fontFamily: "'Segoe UI', sans-serif"
    }}>
      <h2 style={{ textAlign: "center", color: "#0A2463", marginBottom: 24 }}>Resolver Reclamo</h2>
      <form onSubmit={handleResolver}>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 600 }}>ID del Reclamo</label>
          <input
            style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc", fontSize: 16, marginTop: 6 }}
            value={reclamoId}
            onChange={e => setReclamoId(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 600 }}>ID del Usuario</label>
          <input
            style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc", fontSize: 16, marginTop: 6 }}
            value={usuarioId}
            onChange={e => setUsuarioId(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 600 }}>Resolución</label>
          <textarea
            style={{ width: "100%", minHeight: 80, padding: 10, borderRadius: 6, border: "1px solid #ccc", fontSize: 16, marginTop: 6 }}
            value={resolucion}
            onChange={e => setResolucion(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 600 }}>Estado final</label>
          <select
            style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc", fontSize: 16, marginTop: 6 }}
            value={estadoFinal}
            onChange={e => setEstadoFinal(e.target.value)}
          >
            <option value="Resuelto">Resuelto</option>
            <option value="Rechazado">Rechazado</option>
          </select>
        </div>
        <button
          type="submit"
          style={{
            padding: "12px 32px",
            fontWeight: 600,
            borderRadius: 6,
            border: "none",
            background: "#0A2463",
            color: "#fff",
            cursor: "pointer",
            fontSize: 16,
            marginRight: 12
          }}
          disabled={loading}
        >
          {loading ? "Resolviendo..." : "Resolver"}
        </button>
      </form>
      {mensaje && (
        <div style={{
          marginTop: 18,
          color: mensaje.includes("correctamente") ? "#28a745" : "#c62828",
          background: mensaje.includes("correctamente") ? "#e8f5e9" : "#ffeaea",
          borderRadius: 8,
          padding: 12,
          textAlign: "center",
          fontWeight: 500
        }}>
          {mensaje}
        </div>
      )}
    </div>
  );
}

export default function ReclamosHome() {
  const [tab, setTab] = useState<"ver" | "crear" | "resolver">("ver");

  return (
    <div style={{
      maxWidth: 900,
      margin: "40px auto",
      padding: 24,
      fontFamily: "'Segoe UI', sans-serif",
      background: "#f4f8fb",
      borderRadius: 16,
      boxShadow: "0 8px 30px rgba(0,0,0,0.07)"
    }}>
      <header style={{
        marginBottom: 32,
        textAlign: "center" as const,
        padding: "18px 0 0 0"
      }}>
        <h1 style={{
          color: "#0A2463",
          fontWeight: 700,
          fontSize: "2.5rem",
          marginBottom: 6,
          letterSpacing: 1
        }}>
          Gestión de Reclamos
        </h1>
        <p style={{
          color: "#3D5A80",
          fontSize: 18,
          margin: 0,
          fontWeight: 500
        }}>
          Administra, crea y resuelve reclamos de subastas fácilmente.
        </p>
      </header>
      <ReclamosMenu tab={tab} setTab={setTab} />
      {tab === "ver" && <AllReclamosPage />}
      {tab === "crear" && <CrearReclamo />}
      {tab === "resolver" && <ResolverReclamoPage />}
    </div>
  );
}