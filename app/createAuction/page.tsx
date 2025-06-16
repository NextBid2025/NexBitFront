"use client";
import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

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
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
      <Paper elevation={3} sx={{ padding: 4, width: 500 }}>
        <Typography variant="h4" gutterBottom>
          Crear Subasta
        </Typography>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
            />
            <TextField
              name="incrementoMinimo"
              label="Incremento Mínimo"
              type="number"
              fullWidth
              value={form.incrementoMinimo}
              onChange={handleChange}
              required
            />
            <TextField
              name="reservaPrecio"
              label="Precio de Reserva"
              type="number"
              fullWidth
              value={form.reservaPrecio}
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
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Crear Subasta
            </Button>
          </div>
        </form>
        {message && (
          <Typography color={message.includes("éxito") ? "primary" : "error"} sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
