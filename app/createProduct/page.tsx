"use client";
import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

export default function CreateProduct() {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precioBase: "",
    codigoMoneda: "",
    categoria: "",
    imagenUrl: "",
    subastadorId: "",
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
      const res = await fetch("http://localhost:5600/api/products/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          descripcion: form.descripcion,
          precioBase: parseFloat(form.precioBase),
          codigoMoneda: form.codigoMoneda,
          categoria: form.categoria,
          imagenUrl: form.imagenUrl,
          subastadorId: form.subastadorId,
        }),
      });
      if (res.ok) {
        setMessage("¡Producto creado con éxito!");
        setForm({
          nombre: "",
          descripcion: "",
          precioBase: "",
          codigoMoneda: "",
          categoria: "",
          imagenUrl: "",
          subastadorId: "",
        });
      } else {
        setMessage("Error al crear el producto.");
      }
    } catch {
      setMessage("No se pudo conectar al microservicio de productos.");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
      <Paper elevation={3} sx={{ padding: 4, width: 500 }}>
        <Typography variant="h4" gutterBottom>
          Crear Producto
        </Typography>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <TextField
              name="nombre"
              label="Nombre"
              fullWidth
              value={form.nombre.toString}
              onChange={handleChange}
              required
            />
            <TextField
              name="descripcion"
              label="Descripción"
              fullWidth
              multiline
              minRows={2}
              value={form.descripcion.toString}
              onChange={handleChange}
              required
            />
            <TextField
              name="precioBase"
              label="Precio Base"
              type="number"
              fullWidth
              value={form.precioBase.toString}
              onChange={handleChange}
              required
            />
            <TextField
              name="codigoMoneda"
              label="Código Moneda"
              fullWidth
              value={form.codigoMoneda.toString}
              onChange={handleChange}
              required
            />
            <TextField
              name="categoria"
              label="Categoría"
              fullWidth
              value={form.categoria.toString}
              onChange={handleChange}
              required
            />
            <TextField
              name="imagenUrl"
              label="URL de Imagen"
              fullWidth
              value={form.imagenUrl.toString}
              onChange={handleChange}
              required
            />
            <TextField
              name="subastadorId"
              label="Subastador ID"
              fullWidth
              value={form.subastadorId.toString}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Crear Producto
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
