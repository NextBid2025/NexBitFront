import React, { useState } from "react";

type ResolverReclamoProps = {
  reclamoId: string;
  usuarioId: string;
  onResolved?: () => void;
};

export default function ResolverReclamoPage({ reclamoId = "", usuarioId = "", onResolved }: ResolverReclamoProps) {
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
        if (onResolved) onResolved();
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
