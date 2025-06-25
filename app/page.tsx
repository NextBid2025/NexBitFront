"use client";
import React from "react";
import Link from "next/link";

export default function Home() {
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
               <Link href="/user" style={{ color: "#fff", textDecoration: "none", fontSize: 18 }}>Registrar Usuario</Link>
      </nav>
      <div style={{
        minHeight: "calc(100vh - 64px)",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{
          maxWidth: 500,
          margin: "2rem auto",
          background: "#fff",
          padding: 40,
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(10,36,99,0.10)",
          textAlign: "center"
        }}>
          <div style={{
            fontSize: 60,
            color: "#0A2463",
            marginBottom: 16
          }}>
            <span role="img" aria-label="gavel">🔨</span>
          </div>
          <h1 style={{ color: "#0A2463", marginBottom: 8 }}>NexBit Subastas</h1>
          <h3 style={{ color: "#1976d2", marginTop: 0, marginBottom: 24, fontWeight: 400 }}>
            ¡Tu plataforma para subastas en tiempo real!
          </h3>
          <p style={{ color: "#333", marginBottom: 32 }}>
            Descubre productos únicos, participa en subastas, crea tus propios lotes y vive la emoción de ganar.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Link href="/products" style={{
              background: "#0A2463",
              color: "#fff",
              padding: "14px 0",
              borderRadius: 8,
              fontWeight: "bold",
              fontSize: 18,
              textDecoration: "none",
              transition: "background 0.2s"
            }}>Ver Productos</Link>
            <Link href="/createProduct" style={{
              background: "#1976d2",
              color: "#fff",
              padding: "14px 0",
              borderRadius: 8,
              fontWeight: "bold",
              fontSize: 18,
              textDecoration: "none",
              transition: "background 0.2s"
            }}>Crear Producto</Link>
            <Link href="/createAuction" style={{
              background: "#3ddc97",
              color: "#fff",
              padding: "14px 0",
              borderRadius: 8,
              fontWeight: "bold",
              fontSize: 18,
              textDecoration: "none",
              transition: "background 0.2s"
            }}>Crear Subasta</Link>
            <Link href="/createBid" style={{
              background: "#ff9800",
              color: "#fff",
              padding: "14px 0",
              borderRadius: 8,
              fontWeight: "bold",
              fontSize: 18,
              textDecoration: "none",
              transition: "background 0.2s"
            }}>Realizar Puja</Link>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: 80 }}>
        <h1>¡Bienvenido a NextBid!</h1>
        <p>Has iniciado sesión correctamente.</p>
      </div>
    </>
  );
}

