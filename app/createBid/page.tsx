"use client";
import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import Link from "next/link";

// --- Componente de notificaciones de subasta ---
const SubastaComponent = () => {
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5201/subastaHub") // Cambia el puerto si es necesario
      .withAutomaticReconnect()
      .build();

    connection.start()
      .then(() => console.log("Conectado a SignalR"))
      .catch(err => console.error("Error de conexión:", err));

    connection.on("NuevaPuja", (data) => {
      setMensaje(`Nueva puja: Usuario ${data.userId} ofertó $${data.monto}`);
    });

    return () => {
      connection.stop();
    };
  }, []);

  return (
    <div style={{ marginTop: 32 }}>
      <Typography variant="h6" sx={{ color: "#0A2463" }}>Notificaciones de Subasta</Typography>
      <Typography>{mensaje}</Typography>
    </div>
  );
};
// --- Fin componente notificaciones ---

export default function CreateBid() {
  const [form, setForm] = useState({
    subastaId: "",
    userId: "",
    monto: "",
    fechaPuja: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5201/api/puja/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subastaId: form.subastaId,
          userId: form.userId,
          monto: parseFloat(form.monto),
          fechaPuja: new Date(form.fechaPuja).toISOString(),
        }),
      });
      if (res.ok) {
        setMessage("¡Puja realizada con éxito!");
        setForm({
          subastaId: "",
          userId: "",
          monto: "",
          fechaPuja: "",
        });
      } else {
        setMessage("Error al realizar la puja.");
      }
    } catch {
      setMessage("No se pudo conectar al microservicio de pujas.");
    }
  };

  return (
    <>
      <nav style={{
        background: "#0A2463",
        padding: "1rem",
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
      }}>
        <Link href="/" style={{ color: "#fff", fontWeight: "bold", textDecoration: "none", fontSize: 20 }}>Inicio</Link>
        <Link href="/products" style={{ color: "#fff", textDecoration: "none", fontSize: 18 }}>Ver Productos</Link>
        <Link href="/createProduct" style={{ color: "#fff", textDecoration: "none", fontSize: 18 }}>Crear Producto</Link>
        <Link href="/createAuction" style={{ color: "#fff", textDecoration: "none", fontSize: 18 }}>Crear Subasta</Link>
        <Link href="/createBid" style={{ color: "#fff", textDecoration: "none", fontSize: 18 }}>Realizar Puja</Link>
      </nav>
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Paper
          elevation={4}
          sx={{
            maxWidth: 500,
            width: "100%",
            margin: "2rem auto",
            background: "#fff",
            padding: 4,
            borderRadius: 4,
            boxShadow: "0 4px 24px rgba(10,36,99,0.10)",
            textAlign: "center"
          }}
        >
          <Typography variant="h4" sx={{ color: "#0A2463", fontWeight: "bold", mb: 2 }}>
            Realizar Puja
          </Typography>
          <Typography sx={{ color: "#1976d2", mb: 3 }}>
            Ingresa los datos para realizar una puja en la subasta.
          </Typography>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <TextField
                name="subastaId"
                label="ID de Subasta"
                fullWidth
                value={form.subastaId}
                onChange={handleChange}
                required
              />
              <TextField
                name="userId"
                label="ID de Usuario"
                fullWidth
                value={form.userId}
                onChange={handleChange}
                required
              />
              <TextField
                name="monto"
                label="Monto"
                type="number"
                fullWidth
                value={form.monto}
                onChange={handleChange}
                required
                inputProps={{ min: 0 }}
              />
              <TextField
                name="fechaPuja"
                label="Fecha de Puja"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={form.fechaPuja}
                onChange={handleChange}
                required
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  background: "#0A2463",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 18,
                  padding: "12px 0",
                  borderRadius: 2,
                  mt: 2,
                  transition: "background 0.2s",
                  "&:hover": { background: "#1976d2" }
                }}
                fullWidth
              >
                Realizar Puja
              </Button>
            </div>
          </form>
          {message && (
            <Typography sx={{ mt: 3, color: message.includes("éxito") ? "#3ddc97" : "#d32f2f", fontWeight: "bold" }}>
              {message}
            </Typography>
          )}
          {/* Notificaciones en tiempo real */}
          <SubastaComponent />
        </Paper>
      </Box>
    </>
  );
}