"use client";
import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import Link from "next/link";

export default function CreateAuction() {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precioInicial: "",
    incrementoMinimo: "",
    reservaPrecio: "",
    inicioTiempo: "",
    finTiempo: "",
    estado: "",
    vendedorId: "",
    productoId: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5200/api/subastas/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          descripcion: form.descripcion,
          precioInicial: parseFloat(form.precioInicial),
          incrementoMinimo: parseFloat(form.incrementoMinimo),
          reservaPrecio: parseFloat(form.reservaPrecio),
          inicioTiempo: new Date(form.inicioTiempo).toISOString(),
          finTiempo: new Date(form.finTiempo).toISOString(),
          estado: form.estado,
          vendedorId: form.vendedorId,
          productoId: form.productoId,
        }),
      });
      if (res.ok) {
        setMessage("¡Subasta creada con éxito!");
        setForm({
          nombre: "",
          descripcion: "",
          precioInicial: "",
          incrementoMinimo: "",
          reservaPrecio: "",
          inicioTiempo: "",
          finTiempo: "",
          estado: "",
          vendedorId: "",
          productoId: "",
        });
      } else {
        setMessage("Error al crear la subasta.");
      }
    } catch {
      setMessage("No se pudo conectar al microservicio de subastas.");
    }
  };

  return (
    <>
      <nav
        style={{
          background: "#0A2463",
          padding: "1rem",
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <Link
          href="/"
          style={{
            color: "#fff",
            fontWeight: "bold",
            textDecoration: "none",
            fontSize: 20,
          }}
        >
          Inicio
        </Link>
        <Link
          href="/products"
          style={{
            color: "#fff",
            textDecoration: "none",
            fontSize: 18,
          }}
        >
          Ver Productos
        </Link>
        <Link
          href="/createProduct"
          style={{
            color: "#fff",
            textDecoration: "none",
            fontSize: 18,
          }}
        >
          Crear Producto
        </Link>
        <Link
          href="/createAuction"
          style={{
            color: "#fff",
            textDecoration: "none",
            fontSize: 18,
          }}
        >
          Crear Subasta
        </Link>
      </nav>
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          background:
            "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#0A2463",
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Crear Subasta
          </Typography>
          <Typography sx={{ color: "#1976d2", mb: 3 }}>
            Publica una nueva subasta y comienza a recibir ofertas.
          </Typography>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <TextField
                name="nombre"
                label="Nombre"
                fullWidth
                value={form.nombre}
                onChange={handleChange}
                required
              />
              <TextField
                name="descripcion"
                label="Descripción"
                fullWidth
                multiline
                minRows={2}
                value={form.descripcion}
                onChange={handleChange}
                required
              />
              <TextField
                name="precioInicial"
                label="Precio Inicial"
                type="number"
                fullWidth
                value={form.precioInicial}
                onChange={handleChange}
                required
                inputProps={{ min: 0 }}
              />
              <TextField
                name="incrementoMinimo"
                label="Incremento Mínimo"
                type="number"
                fullWidth
                value={form.incrementoMinimo}
                onChange={handleChange}
                required
                inputProps={{ min: 0 }}
              />
              <TextField
                name="reservaPrecio"
                label="Precio de Reserva"
                type="number"
                fullWidth
                value={form.reservaPrecio}
                onChange={handleChange}
                required
                inputProps={{ min: 0 }}
              />
              <TextField
                name="inicioTiempo"
                label="Inicio"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={form.inicioTiempo}
                onChange={handleChange}
                required
              />
              <TextField
                name="finTiempo"
                label="Fin"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={form.finTiempo}
                onChange={handleChange}
                required
              />
              <TextField
                name="estado"
                label="Estado"
                fullWidth
                value={form.estado}
                onChange={handleChange}
                required
              />
              <TextField
                name="vendedorId"
                label="Vendedor ID"
                fullWidth
                value={form.vendedorId}
                onChange={handleChange}
                required
              />
              <TextField
                name="productoId"
                label="Producto ID"
                fullWidth
                value={form.productoId}
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
                  "&:hover": { background: "#1976d2" },
                }}
                fullWidth
              >
                Crear Subasta
              </Button>
            </div>
          </form>
          {message && (
            <Typography
              sx={{
                mt: 3,
                color: message.includes("éxito") ? "#3ddc97" : "#d32f2f",
                fontWeight: "bold",
              }}
            >
              {message}
            </Typography>
          )}
        </Paper>
      </Box>
    </>
  );
}
