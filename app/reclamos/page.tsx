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

const styles = {
  container: {
    maxWidth: 900,
    margin: "50px auto",
    padding: "40px",
    fontFamily: "'Segoe UI', sans-serif",
    color: "#333",
  },
  header: {
    textAlign: "center" as const,
    marginBottom: "40px",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: 700,
    color: "#0A2463",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#555",
  },
  tabs: {
    display: "flex",
    justifyContent: "center",
    borderBottom: "1px solid #ddd",
    marginBottom: "40px",
  },
  tabButton: (active: boolean): React.CSSProperties => ({
    padding: "15px 30px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    border: "none",
    background: "transparent",
    color: active ? "#0A2463" : "#666",
    borderBottom: active ? "3px solid #0A2463" : "3px solid transparent",
    transition: "color 0.3s, border-color 0.3s",
  }),
  formContainer: {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
  },
  formGroup: {
    marginBottom: "25px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: 600,
    color: "#444",
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    transition: "border-color 0.3s, box-shadow 0.3s",
  },
  textarea: {
    minHeight: "120px",
    resize: "vertical" as const,
  },
  button: {
    width: "100%",
    padding: "15px",
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#fff",
    background: "linear-gradient(90deg, #0A2463, #3D5A80)",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    marginTop: "20px",
  },
  th: {
    background: "#f8f9fa",
    padding: "15px",
    textAlign: "left" as const,
    fontWeight: 600,
    color: "#0A2463",
    borderBottom: "2px solid #ddd",
  },
  td: {
    padding: "15px",
    borderBottom: "1px solid #eee",
  },
  estadoBadge: (estado: string): React.CSSProperties => ({
    padding: "5px 12px",
    borderRadius: "15px",
    fontWeight: 600,
    fontSize: "0.85rem",
    color: "#fff",
    background: estado === "Resuelto" ? "#28a745" : (estado === "Pendiente" ? "#ffc107" : "#6c757d"),
  }),
  mensaje: {
    padding: "15px",
    marginTop: "20px",
    borderRadius: "8px",
    fontWeight: 500,
    textAlign: "center" as const,
  },
};

export default function ReclamosPage() {
  const [tab, setTab] = useState<"crear" | "mis">("crear");
  const [misReclamos, setMisReclamos] = useState<Reclamo[]>([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });

  const [form, setForm] = useState({
    usuarioId: "",
    subastaId: "",
    motivo: "",
    descripcion: "",
    evidencia: null as File | null,
  });

  let userId = "";
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        userId = JSON.parse(atob(token.split(".")[1])).sub;
      } catch (e) { console.error("Token inválido"); }
  }

  // Al montar o cambiar a la pestaña "mis", obtener los reclamos (sin filtrar por usuario)
  useEffect(() => {
    if (tab === "mis") {
      setLoading(true);
      fetch("http://localhost:5300/api/reclamos/all", {
        credentials: "include",
      })
        .then(res => {
          if (!res.ok) throw new Error("Error de servidor");
          return res.json();
        })
        .then((data: Reclamo[]) => {
          setMisReclamos(data); // Mostrar todos los reclamos
        })
        .catch(() => setMensaje({ texto: "Error de conexión. Inténtalo de nuevo.", tipo: "error" }))
        .finally(() => setLoading(false));
    }
  }, [tab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje({ texto: "", tipo: "" });

    const formData = new FormData();
    formData.append("usuarioId", form.usuarioId);
    formData.append("subastaId", form.subastaId);
    formData.append("motivo", form.motivo);
    formData.append("descripcion", form.descripcion);
    if (form.evidencia) {
      formData.append("evidencia", form.evidencia);
    }

    try {
      const response = await fetch("http://localhost:5300/api/reclamos/create", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        setMensaje({ texto: "Reclamo enviado con éxito.", tipo: "exito" });
        setForm({ usuarioId: "", subastaId: "", motivo: "", descripcion: "", evidencia: null });
      } else {
        const errorData = await response.json();
        setMensaje({ texto: errorData.message || "Error al enviar el reclamo.", tipo: "error" });
      }
    } catch (error) {
      setMensaje({ texto: "Error de conexión. Inténtalo de nuevo.", tipo: "error" });
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Centro de Reclamos</h1>
        <p style={styles.subtitle}>Gestiona tus reclamos de subastas de forma rápida y sencilla.</p>
      </div>

      <div style={styles.tabs}>
        <button style={styles.tabButton(tab === "crear")} onClick={() => setTab("crear")}>Nuevo Reclamo</button>
        <button style={styles.tabButton(tab === "mis")} onClick={() => setTab("mis")}>Mis Reclamos</button>
      </div>

      {tab === "crear" && (
        <div style={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="usuarioId">ID de Usuario</label>
              <input id="usuarioId" style={styles.input} value={form.usuarioId} onChange={e => setForm(f => ({ ...f, usuarioId: e.target.value }))} required />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="subastaId">ID de la Subasta</label>
              <input id="subastaId" style={styles.input} value={form.subastaId} onChange={e => setForm(f => ({ ...f, subastaId: e.target.value }))} required />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="motivo">Motivo del Reclamo</label>
              <input id="motivo" style={styles.input} value={form.motivo} onChange={e => setForm(f => ({ ...f, motivo: e.target.value }))} required />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="descripcion">Descripción Detallada</label>
              <textarea id="descripcion" style={{...styles.input, ...styles.textarea}} value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} required />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="evidencia">Adjuntar Evidencia (Opcional)</label>
              <input id="evidencia" style={styles.input} type="file" onChange={e => setForm(f => ({ ...f, evidencia: e.target.files?.[0] || null }))} />
            </div>
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Enviando..." : "Enviar Reclamo"}
            </button>
          </form>
        </div>
      )}

      {tab === "mis" && (
        <div>
          {loading ? <p>Cargando reclamos...</p> : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Usuario ID</th>
                  <th style={styles.th}>Subasta ID</th>
                  <th style={styles.th}>Motivo</th>
                  <th style={styles.th}>Estado</th>
                  <th style={styles.th}>Evidencia</th>
                </tr>
              </thead>
              <tbody>
                {misReclamos.map(r => (
                  <tr key={r.id}>
                    <td style={styles.td}>{r.usuarioId}</td>
                    <td style={styles.td}>{r.subastaId}</td>
                    <td style={styles.td}>{r.motivo}</td>
                    <td style={styles.td}><span style={styles.estadoBadge(r.estado || "Desconocido")}>{r.estado || "N/A"}</span></td>
                    <td style={styles.td}>{r.evidenciaUrl ? <a href={r.evidenciaUrl} target="_blank" rel="noopener noreferrer">Ver</a> : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {mensaje.texto && (
        <div style={{...styles.mensaje, background: mensaje.tipo === 'exito' ? '#e8f5e9' : '#ffebee', color: mensaje.tipo === 'exito' ? '#2e7d32' : '#c62828'}}>
          {mensaje.texto}
        </div>
      )}
    </div>
  );
}
}
