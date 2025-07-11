"use client";
import React, { useState, useEffect } from "react";

const styles = {
  container: {
    maxWidth: 600,
    margin: "40px auto",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(10,36,99,0.1)",
    padding: "40px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  profileHeader: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    marginBottom: "32px",
  },
  profilePicContainer: {
    position: "relative" as const,
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  profilePic: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  },
  title: {
    color: "#0A2463",
    textAlign: "center" as const,
    marginBottom: 32,
    fontSize: "2.2rem",
    fontWeight: "bold",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0 24px",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    color: "#0A2463",
    fontWeight: 600,
    fontSize: "0.9rem",
    display: "block",
    marginBottom: 8,
  },
  input: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "12px 16px",
    fontSize: "1rem",
    width: "100%",
    outline: "none",
    transition: "border 0.2s, box-shadow 0.2s",
  },
  button: {
    background: "linear-gradient(90deg, #0A2463, #3D5A80)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "14px 28px",
    fontSize: "1.1rem",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: 24,
    width: "100%",
    letterSpacing: "1px",
    transition: "transform 0.2s, box-shadow 0.2s",
    gridColumn: "1 / -1",
  },
  mensaje: {
    color: "green",
    textAlign: "center" as const,
    marginTop: 18,
    fontWeight: 500,
  },
  mensajeError: {
    color: "red",
    textAlign: "center" as const,
    marginTop: 18,
    fontWeight: 500,
  }
};

export default function ProfilePage() {
  // Simulación de datos iniciales (reemplazar por fetch real)
  const [profile, setProfile] = useState({ username: "", name: "", lastName: "", email: "", phone: "", address: "", roleId: "" });
  const [mensaje, setMensaje] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  // Obtener el userId desde el token JWT almacenado
  let userId = "";
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        userId = payload.sub; // Este es el id de Keycloak
      } catch (e) {
        // Si el token no es válido, userId queda vacío
      }
    }
  }

  useEffect(() => {
    if (userId) {
      const fetchProfile = async () => {
        try {
          const response = await fetch(`http://localhost:5103/api/users/update/${userId}`);
          if (response.ok) {
            const data = await response.json();
            setProfile({
              username: data.username || "",
              name: data.name || "",
              lastName: data.lastName || "",
              email: data.email || "",
              phone: data.phone || "",
              address: data.address || "",
              roleId: data.roleId || ""
            });
          } else {
            console.error("Error al cargar el perfil del usuario.");
          }
        } catch (error) {
          console.error("Error al conectar con el servidor:", error);
        }
      };
      fetchProfile();
    }
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");
    setIsError(false);

    const body = {
      Usuario: profile.username,
      name: profile.name,
      lastName: profile.lastName,
      email: profile.email,
      roleId: profile.roleId,
      address: profile.address,
      phone: profile.phone,
    };

    try {
      const response = await fetch(`http://localhost:5103/api/users/keycloak/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
      });
      if (response.ok) {
        setMensaje("Perfil actualizado correctamente.");
      } else {
        const errorData = await response.json().catch(() => ({ message: "No se pudo obtener detalle del error." }));
        const errorMessage = errorData.message || `Error del servidor (código: ${response.status})`;
        setMensaje(errorMessage);
        setIsError(true);
      }
    } catch (error) {
      setMensaje("Error de conexión. No se pudo actualizar el perfil.");
      setIsError(true);
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Mi Perfil</h2>
      
      <div style={styles.profileHeader}>
        <div style={styles.profilePicContainer}>
          <img src="/IconoPerfil.png" alt="" style={styles.profilePic} />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Usuario:</label>
            <input style={styles.input} name="username" value={profile.username} onChange={handleChange} required />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email:</label>
            <input style={styles.input} name="email" type="email" value={profile.email} onChange={handleChange} required />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nombre:</label>
            <input style={styles.input} name="name" value={profile.name} onChange={handleChange} required />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Apellido:</label>
            <input style={styles.input} name="lastName" value={profile.lastName} onChange={handleChange} required />
          </div>
          <div style={{ ...styles.formGroup, gridColumn: "1 / -1" }}>
            <label style={styles.label}>Teléfono:</label>
            <input style={styles.input} name="phone" value={profile.phone} onChange={handleChange} required />
          </div>
          <div style={{ ...styles.formGroup, gridColumn: "1 / -1" }}>
            <label style={styles.label}>Dirección:</label>
            <input style={styles.input} name="address" value={profile.address} onChange={handleChange} required />
          </div>
          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </form>
      {mensaje && <p style={isError ? styles.mensajeError : styles.mensaje}>{mensaje}</p>}
    </div>
  );
}
