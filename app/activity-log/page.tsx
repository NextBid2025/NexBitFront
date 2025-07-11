// URL para acceder a esta página: http://localhost:3000/activity-log

"use client";
import React, { useState, useEffect } from "react";

type Activity = {
  fecha: string;
  tipo: string;
  descripcion: string;
};

const styles = {
  container: {
    maxWidth: 700,
    margin: "40px auto",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 12px rgba(10,36,99,0.08)",
    padding: "32px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    color: "#0A2463",
    textAlign: "center" as const,
    marginBottom: 24,
    fontSize: "2rem",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
  filterRow: {
    display: "flex",
    justifyContent: "center",
    gap: "32px",
    marginBottom: "20px",
    flexWrap: "wrap" as const,
  },
  label: {
    color: "#0A2463",
    fontWeight: 500,
    fontSize: "1rem",
  },
  input: {
    border: "1px solid #B3B3B3",
    borderRadius: "4px",
    padding: "6px 10px",
    fontSize: "1rem",
    marginLeft: "8px",
    outline: "none",
    transition: "border 0.2s",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    marginTop: "10px",
    background: "#f9f9f9",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 1px 4px rgba(10,36,99,0.06)",
  },
  th: {
    background: "#0A2463",
    color: "#fff",
    padding: "12px 8px",
    fontWeight: 700,
    fontSize: "1rem",
    borderBottom: "2px solid #e0e0e0",
  },
  td: {
    padding: "10px 8px",
    color: "#222",
    fontSize: "1rem",
    borderBottom: "1px solid #e0e0e0",
    background: "#fff",
  },
  noData: {
    color: "#B71C1C",
    textAlign: "center" as const,
    marginTop: "24px",
    fontWeight: 500,
  }
};

export default function ActivityLogPage() {
  const [actividades, setActividades] = useState<Activity[]>([]);
  const [filtro, setFiltro] = useState("");
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    // Simulación de fetch de actividades (reemplazar por fetch real)
    setActividades([
      { fecha: "2024-06-01", tipo: "login", descripcion: "Inicio de sesión exitoso" },
      { fecha: "2024-06-02", tipo: "update_profile", descripcion: "Actualización de perfil" },
      { fecha: "2024-06-03", tipo: "change_password", descripcion: "Cambio de contraseña" },
    ]);
  }, []);

  const actividadesFiltradas = actividades.filter(a =>
    (!filtro || a.tipo.includes(filtro)) &&
    (!fecha || a.fecha === fecha)
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Historial de Actividad</h2>
      <div style={styles.filterRow}>
        <label style={styles.label}>
          Tipo:
          <input
            style={styles.input}
            value={filtro}
            onChange={e => setFiltro(e.target.value)}
            placeholder="login, update_profile..."
          />
        </label>
        <label style={styles.label}>
          Fecha:
          <input
            style={styles.input}
            type="date"
            value={fecha}
            onChange={e => setFecha(e.target.value)}
          />
        </label>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Fecha</th>
            <th style={styles.th}>Tipo</th>
            <th style={styles.th}>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {actividadesFiltradas.map((a, i) => (
            <tr key={i}>
              <td style={styles.td}>{a.fecha}</td>
              <td style={styles.td}>{a.tipo}</td>
              <td style={styles.td}>{a.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {actividadesFiltradas.length === 0 && (
        <p style={styles.noData}>No hay actividades para los filtros seleccionados.</p>
      )}
    </div>
  );
}
