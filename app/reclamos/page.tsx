"use client";
import React, { useState, useEffect } from "react";

type Reclamo = {
  id: string;
  usuarioId: string;
  subastaId: string;
  motivo: string;
  descripcion: string;
  evidenciaUrl?: string;
  estado?: string;
  resolucion?: string;
};

const tabButton = (active: boolean): React.CSSProperties => ({
  background: active ? "#0A2463" : "#f7f9fa",
  color: active ? "#fff" : "#0A2463",
  border: "none",
  borderBottom: active ? "3px solid #3ddc97" : "2px solid #ccc",
  padding: "14px 36px",
  fontWeight: "bold",
  fontSize: 18,
  cursor: "pointer",
  borderRadius: "12px 12px 0 0",
  marginRight: 8,
  transition: "background 0.2s, color 0.2s",
  boxShadow: active ? "0 2px 8px #3ddc9722" : undefined,
});

const containerStyle: React.CSSProperties = {
  maxWidth: 800,
  margin: "40px auto",
  background: "#fff",
  borderRadius: 18,
  boxShadow: "0 4px 24px rgba(10,36,99,0.13)",
  padding: 40,
  minHeight: 500,
};

const sectionTitle: React.CSSProperties = {
  color: "#0A2463",
  fontWeight: "bold",
  fontSize: "1.5rem",
  marginBottom: 18,
  letterSpacing: "1px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  margin: "6px 0 16px 0",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "16px",
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  minHeight: 70,
  resize: "vertical" as const,
};

const labelStyle: React.CSSProperties = {
  color: "#0A2463",
  fontWeight: "bold",
  marginTop: "10px",
  display: "block",
};

const buttonStyle: React.CSSProperties = {
  background: "#0A2463",
  color: "#fff",
  padding: "12px 0",
  border: "none",
  borderRadius: "8px",
  fontSize: "17px",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "10px",
  width: "100%",
  transition: "background 0.2s",
};

const tableStyle: React.CSSProperties = {
  width: "100%",
  marginTop: 18,
  borderCollapse: "collapse" as const,
  background: "#f7f9fa",
  borderRadius: 10,
  overflow: "hidden",
  boxShadow: "0 2px 8px #0A246322",
};

const thStyle: React.CSSProperties = {
  background: "#e0e7ff",
  color: "#0A2463",
  fontWeight: "bold",
  padding: "12px 8px",
  fontSize: 16,
  borderBottom: "2px solid #3ddc97",
};

const tdStyle: React.CSSProperties = {
  padding: "10px 8px",
  textAlign: "center" as const,
  fontSize: 15,
  borderBottom: "1px solid #e0e7ff",
};

const estadoStyle = (estado: string): React.CSSProperties => ({
  color: estado === "Resuelto" ? "#3ddc97" : "#1976d2",
  fontWeight: "bold",
});

export default function ReclamosPage() {
  const [tab, setTab] = useState<"crear" | "mis" | "todos">("crear");
  const [misReclamos, setMisReclamos] = useState<Reclamo[]>([]);
  const [todosReclamos, setTodosReclamos] = useState<Reclamo[]>([]);
  const [loading, setLoading] = useState(false);

  // Formulario de nuevo reclamo
  const [form, setForm] = useState({
    usuarioId: "",
    subastaId: "",
    motivo: "",
    descripcion: "",
    evidencia: null as File | null, // Cambia evidenciaUrl por evidencia tipo File
  });
  const [mensaje, setMensaje] = useState("");

  // Consultar reclamos del usuario o todos
  useEffect(() => {
    if (tab === "mis") {
      setLoading(true);
      fetch("http://localhost:5300/api/reclamos/user")
        .then(res => res.json())
        .then(data => setMisReclamos(data))
        .finally(() => setLoading(false));
    }
    if (tab === "todos") {
      setLoading(true);
      fetch("http://localhost:5300/api/reclamos/all")
        .then(res => res.json())
        .then(data => setTodosReclamos(data))
        .finally(() => setLoading(false));
    }
  }, [tab]);

  // Crear nuevo reclamo
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje("");
    if (!form.usuarioId || !form.subastaId || !form.motivo || !form.descripcion) {
      setMensaje("Completa todos los campos obligatorios.");
      return;
    }
    setLoading(true);
    const body = new FormData();
    body.append("usuarioId", form.usuarioId);
    body.append("subastaId", form.subastaId);
    body.append("motivo", form.motivo);
    body.append("descripcion", form.descripcion);
    if (form.evidencia) body.append("evidencia", form.evidencia);

    const res = await fetch("http://localhost:5300/api/reclamos/create", {
      method: "POST",
      body,
    });
    if (res.ok) {
      setMensaje("Reclamo enviado correctamente.");
      setForm({ usuarioId: "", subastaId: "", motivo: "", descripcion: "", evidencia: null });
    } else {
      setMensaje("Error al enviar el reclamo.");
    }
    setLoading(false);
  };

  return (
    <div style={containerStyle}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
        <button style={tabButton(tab === "crear")} onClick={() => setTab("crear")}>Crear Reclamo</button>
        <button style={tabButton(tab === "mis")} onClick={() => setTab("mis")}>Mis Reclamos</button>
        <button style={tabButton(tab === "todos")} onClick={() => setTab("todos")}>Todos los Reclamos</button>
      </div>

      {/* Crear Reclamo */}
      {tab === "crear" && (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={sectionTitle}>Nuevo Reclamo</div>
          <label style={labelStyle}>
            Usuario ID*:
            <input style={inputStyle} value={form.usuarioId} onChange={e => setForm(f => ({ ...f, usuarioId: e.target.value }))} required />
          </label>
          <label style={labelStyle}>
            Subasta ID*:
            <input style={inputStyle} value={form.subastaId} onChange={e => setForm(f => ({ ...f, subastaId: e.target.value }))} required />
          </label>
          <label style={labelStyle}>
            Motivo*:
            <input style={inputStyle} value={form.motivo} onChange={e => setForm(f => ({ ...f, motivo: e.target.value }))} required />
          </label>
          <label style={labelStyle}>
            Descripción*:
            <textarea style={textareaStyle} value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} required />
          </label>
          <label style={labelStyle}>
            Evidencia (opcional):
            <input
              style={inputStyle}
              type="file"
              accept="image/*,application/pdf"
              onChange={e => setForm(f => ({ ...f, evidencia: e.target.files?.[0] || null }))}
            />
          </label>
          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Enviando..." : "Enviar Reclamo"}
          </button>
          {mensaje && <div style={{ color: mensaje.includes("correctamente") ? "#3ddc97" : "#d32f2f", fontWeight: "bold", marginTop: 10 }}>{mensaje}</div>}
        </form>
      )}

      {/* Consultar mis reclamos */}
      {tab === "mis" && (
        <div>
          <div style={sectionTitle}>Mis Reclamos</div>
          {loading ? (
            <div>Cargando...</div>
          ) : (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Usuario</th>
                  <th style={thStyle}>Subasta</th>
                  <th style={thStyle}>Motivo</th>
                  <th style={thStyle}>Descripción</th>
                  <th style={thStyle}>Evidencia</th>
                  <th style={thStyle}>Estado</th>
                  <th style={thStyle}>Resolución</th>
                </tr>
              </thead>
              <tbody>
                {misReclamos.map(r => (
                  <tr key={r.id}>
                    <td style={tdStyle}>{r.usuarioId}</td>
                    <td style={tdStyle}>{r.subastaId}</td>
                    <td style={tdStyle}>{r.motivo}</td>
                    <td style={tdStyle}>{r.descripcion}</td>
                    <td style={tdStyle}>{r.evidenciaUrl ? <a href={r.evidenciaUrl} target="_blank" rel="noopener noreferrer">Ver</a> : "-"}</td>
                    <td style={{ ...tdStyle, ...estadoStyle(r.estado || "") }}>{r.estado || "-"}</td>
                    <td style={tdStyle}>{r.resolucion || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Consultar todos los reclamos */}
      {tab === "todos" && (
        <div>
          <div style={sectionTitle}>Todos los Reclamos</div>
          {loading ? (
            <div>Cargando...</div>
          ) : (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Usuario</th>
                  <th style={thStyle}>Subasta</th>
                  <th style={thStyle}>Motivo</th>
                  <th style={thStyle}>Descripción</th>
                  <th style={thStyle}>Evidencia</th>
                  <th style={thStyle}>Estado</th>
                  <th style={thStyle}>Resolución</th>
                </tr>
              </thead>
              <tbody>
                {todosReclamos.map(r => (
                  <tr key={r.id}>
                    <td style={tdStyle}>{r.usuarioId}</td>
                    <td style={tdStyle}>{r.subastaId}</td>
                    <td style={tdStyle}>{r.motivo}</td>
                    <td style={tdStyle}>{r.descripcion}</td>
                    <td style={tdStyle}>{r.evidenciaUrl ? <a href={r.evidenciaUrl} target="_blank" rel="noopener noreferrer">Ver</a> : "-"}</td>
                    <td style={{ ...tdStyle, ...estadoStyle(r.estado || "") }}>{r.estado || "-"}</td>
                    <td style={tdStyle}>{r.resolucion || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
