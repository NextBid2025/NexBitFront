import React, { useEffect, useState } from "react";

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

const tableStyles = {
  container: {
    maxWidth: 900,
    margin: "40px auto",
    padding: 24,
    fontFamily: "'Segoe UI', sans-serif",
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
  },
  title: {
    textAlign: "center" as const,
    marginBottom: 24,
    color: "#0A2463",
    fontWeight: 700,
    fontSize: "2rem",
    letterSpacing: 1,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    marginTop: 10,
    background: "#f8f9fa",
    borderRadius: 8,
    overflow: "hidden",
  },
  th: {
    background: "linear-gradient(90deg, #0A2463, #3D5A80)",
    color: "#fff",
    padding: 14,
    fontWeight: 600,
    fontSize: 16,
    borderBottom: "2px solid #ddd",
    letterSpacing: 0.5,
  },
  td: {
    padding: 13,
    borderBottom: "1px solid #eee",
    fontSize: 15,
    color: "#333",
    background: "#fff",
  },
  estadoBadge: (estado: string) => ({
    padding: "5px 14px",
    borderRadius: "15px",
    fontWeight: 600,
    fontSize: "0.95rem",
    color: "#fff",
    background:
      estado === "Resuelto"
        ? "#28a745"
        : estado === "Pendiente"
        ? "#ffc107"
        : "#6c757d",
    border: estado === "Pendiente" ? "1px solid #ffc107" : "none",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  }),
  evidenciaSi: {
    color: "#fff",
    background: "linear-gradient(90deg, #0A2463, #3D5A80)",
    padding: "4px 12px",
    borderRadius: 8,
    fontWeight: 600,
    fontSize: 14,
    textDecoration: "none",
    display: "inline-block",
  },
  evidenciaNo: {
    color: "#fff",
    background: "#b0b0b0",
    padding: "4px 12px",
    borderRadius: 8,
    fontWeight: 600,
    fontSize: 14,
    display: "inline-block",
  },
  mensaje: {
    color: "#c62828",
    marginBottom: 16,
    background: "#ffeaea",
    borderRadius: 8,
    padding: 12,
    textAlign: "center" as const,
    fontWeight: 500,
  },
  sinDatos: {
    textAlign: "center" as const,
    color: "#888",
    marginTop: 24,
    fontSize: 17,
  },
  cargando: {
    textAlign: "center" as const,
    color: "#0A2463",
    fontWeight: 600,
    marginTop: 24,
    fontSize: 17,
  },
};

export default function AllReclamosPage() {
  const [reclamos, setReclamos] = useState<Reclamo[]>([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    setLoading(true);
    setMensaje(""); // Limpia mensaje anterior
    fetch("http://localhost:5300/api/reclamos/all", {
      // Si tu backend no requiere autenticación, puedes quitar credentials
      // credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text || "Error de servidor");
          });
        }
        return res.json();
      })
      .then((data: Reclamo[]) => {
        setReclamos(data);
        setMensaje(""); // Limpia mensaje si todo va bien
      })
      .catch((err) => {
        setMensaje("Error al cargar los reclamos: " + (err?.message || ""));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={tableStyles.container}>
      <h2 style={tableStyles.title}>Todos los Reclamos</h2>
      {loading && <p style={tableStyles.cargando}>Cargando reclamos...</p>}
      {mensaje && <div style={tableStyles.mensaje}>{mensaje}</div>}
      {!loading && reclamos.length === 0 && (
        <div style={tableStyles.sinDatos}>No hay reclamos para mostrar.</div>
      )}
      {!loading && reclamos.length > 0 && (
        <table style={tableStyles.table}>
          <thead>
            <tr>
              <th style={tableStyles.th}>ID</th>
              <th style={tableStyles.th}>Usuario</th>
              <th style={tableStyles.th}>Subasta</th>
              <th style={tableStyles.th}>Motivo</th>
              <th style={tableStyles.th}>Estado</th>
              <th style={tableStyles.th}>Evidencia</th>
            </tr>
          </thead>
          <tbody>
            {reclamos.map((r, idx) => {
              // Si algún campo es un objeto con .value, extrae el valor
              const safe = (val: any) =>
                val && typeof val === "object" && "value" in val ? val.value : val;

              let key = typeof safe(r.id) === "string" && safe(r.id) ? `${safe(r.id)}-${idx}` : `reclamo-${idx}`;
              return (
                <tr key={key}>
                  <td style={tableStyles.td}>{safe(r.id)}</td>
                  <td style={tableStyles.td}>{safe(r.usuarioId)}</td>
                  <td style={tableStyles.td}>{safe(r.subastaId)}</td>
                  <td style={tableStyles.td}>{safe(r.motivo)}</td>
                  <td style={tableStyles.td}>
                    <span style={tableStyles.estadoBadge(safe(r.estado))}>
                      {safe(r.estado) || "N/A"}
                    </span>
                  </td>
                  <td style={tableStyles.td}>
                    {r.evidenciaUrl
                      ? <span style={tableStyles.evidenciaSi}>Sí</span>
                      : <span style={tableStyles.evidenciaNo}>No</span>
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
