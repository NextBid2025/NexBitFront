"use client"
import React, { useEffect, useState } from "react"
import { Box, Typography, Paper } from "@mui/material"
import Link from "next/link"

interface Product {
  nombre: string | { value: string }
  descripcion: string | { value: string }
  precioBase: number | { value: number }
  codigoMoneda: string | { value: string }
  categoria: string | { value: string }
  imagenUrl: string
  subastadorId: string | { value: string }
}

function getValue(field: any) {
  return typeof field === "object" && field !== null && "value" in field
    ? field.value
    : field
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:5600/api/products/available")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <>
      <nav
        style={{
          background: "#0A2463",
          padding: "1rem",
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        <Link
          href="/"
          style={{
            color: "#fff",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Inicio
        </Link>
        <Link
          href="/products"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          Ver Productos
        </Link>
        <Link
          href="/createProduct"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          Crear Producto
        </Link>
        <Link
          href="/createAuction"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          Crear Subasta
        </Link>
      </nav>
      <Box
        sx={{
          padding: 4,
          background: "#f5f5f5",
          minHeight: "100vh",
          borderTop: "4px solid #1976d2",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Productos Disponibles
        </Typography>
        {loading ? (
          <Typography>Cargando...</Typography>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
            {products.map((product, idx) => (
              <Paper
                key={idx}
                sx={{
                  width: 300,
                  padding: 2,
                  margin: "0 auto",
                  border: "2px solid #0A2463",
                  borderRadius: 8,
                  boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)",
                }}
              >
                <img
                  src={getValue(product.imagenUrl)}
                  alt={getValue(product.nombre)}
                  style={{
                    width: "55%",
                    height: 180,
                    objectFit: "cover",
                    borderRadius: 8,
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{ mt: 1, textAlign: "center", fontWeight: "bold" }}
                >
                  {getValue(product.nombre)}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "center" }}
                >
                  {getValue(product.descripcion)}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ mt: 1, textAlign: "center" }}
                >
                  {getValue(product.precioBase)}{" "}
                  {getValue(product.codigoMoneda)}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: "block",
                    textAlign: "center",
                    fontStyle: "italic",
                  }}
                >
                  Categoría: {getValue(product.categoria)}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: "block",
                    textAlign: "center",
                    fontStyle: "italic",
                  }}
                >
                  Subastador:{" "}
                  {typeof product.subastadorId === "object" &&
                  product.subastadorId !== null
                    ? product.subastadorId.value
                    : product.subastadorId}
                </Typography>
              </Paper>
            ))}
          </div>
        )}
      </Box>
    </>
  )
}

