"use client";
import React, { useState } from "react";
import Link from "next/link";

const mainBg = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #e0e7ff 0%, #f5f7fa 100%)",
  display: "flex" as const,
  flexDirection: "column" as const,
  justifyContent: "center" as const,
  alignItems: "center" as const,
};

const cardStyle = {
  maxWidth: 520,
  margin: "3rem auto",
  background: "#fff",
  padding: 48,
  borderRadius: 24,
  boxShadow: "0 8px 32px rgba(10,36,99,0.13)",
  textAlign: "center" as const,
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
};

const logoStyle = {
  width: 300, // antes 120
  height: 300, // antes 120
  marginBottom: 24,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const titleStyle = {
  color: "#0A2463",
  fontWeight: "bold",
  fontSize: "2.5rem",
  marginBottom: 12,
  letterSpacing: "2px",
};

const sloganStyle = {
  color: "#1976d2",
  fontSize: "1.5rem",
  fontWeight: 500,
  margin: "10px 0 18px 0",
  letterSpacing: "1px",
};

const descriptionStyle = {
  color: "#333",
  fontSize: "1.15rem",
  marginBottom: 32,
  lineHeight: 1.7,
  textAlign: "center" as const,
};

const actionStyle = {
  display: "flex",
  gap: 16,
  justifyContent: "center",
  marginTop: 24,
};

const buttonStyle = {
  background: "#0A2463",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "14px 32px",
  fontWeight: "bold",
  fontSize: 18,
  cursor: "pointer",
  textDecoration: "none" as const,
  transition: "background 0.2s",
};

export default function Home() {
  return (
    <div style={mainBg}>
      <div style={cardStyle}>
        <div style={logoStyle}>
          <img
            src="/nextbid-logo.png"
            alt="NextBid Logo"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
        <div style={sloganStyle}>
          ¡Vive la emoción de ganar en tiempo real!
        </div>
        <div style={descriptionStyle}>
          Descubre productos únicos, participa en subastas dinámicas y crea tus propios lotes.<br /><br />
          NexBit es el lugar donde la innovación y la emoción de las subastas se encuentran.<br />
          <span style={{ color: "#0A2463", fontWeight: "bold" }}>
            ¡Bienvenido a la nueva era de las subastas online!
          </span>
        </div>
        <div style={actionStyle}>
          <Link href="/login" style={buttonStyle}>Iniciar Sesión</Link>
          <Link href="/registrer" style={{ ...buttonStyle, background: "#1976d2" }}>Registrarse</Link>
        </div>
      </div>
      <footer style={{ color: "#0A2463", marginTop: 40, fontSize: 16, opacity: 0.7 }}>
        © {new Date().getFullYear()} NexBit | Plataforma de subastas en tiempo real
      </footer>
    </div>
  );
}
