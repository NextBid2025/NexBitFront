"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/src/utils/auth"; // Ajusta la ruta si es necesario

interface Product {
  nombre: string | { value: string };
  descripcion: string | { value: string };
  precioBase: number | { value: number };
  codigoMoneda: string | { value: string };
  categoria: string | { value: string };
  imagenUrl: string;
  subastadorId: string | { value: string };
}

function getValue(field: any) {
  return typeof field === "object" && field !== null && "value" in field
    ? field.value
    : field;
}

const headerStyle: React.CSSProperties = {
  width: "100%",
  background: "#0A2463",
  color: "#fff",
  padding: "0.8rem 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  position: "sticky",
  top: 0,
  zIndex: 10,
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const navLeft: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 32,
  marginLeft: 32,
};

const navRight: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 18,
  marginRight: 32,
};

const navLink: React.CSSProperties = {
  color: "#fff",
  textDecoration: "none",
  fontSize: 17,
  fontWeight: 500,
  transition: "color 0.2s",
};

const navTitle: React.CSSProperties = {
  fontWeight: "bold",
  fontSize: 28,
  letterSpacing: "2px",
  color: "#fff",
};

const mainBg: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #e0e7ff 0%, #c3cfe2 100%)",
  padding: "0 0 48px 0",
};

const galleryTitle: React.CSSProperties = {
  color: "#0A2463",
  fontWeight: "bold",
  fontSize: "2rem",
  margin: "48px 0 24px 0",
  textAlign: "center" as const,
  letterSpacing: "1px",
};

const galleryGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 32,
  maxWidth: 1100,
  margin: "0 auto",
  padding: "0 24px",
};

const productCard: React.CSSProperties = {
  background: "#fff",
  borderRadius: 16,
  boxShadow: "0 4px 16px rgba(10,36,99,0.10)",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  transition: "transform 0.15s",
};

const productImg: React.CSSProperties = {
  width: "50%",
  height: 240, 
  objectFit: "cover" as const,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
};

const productInfo: React.CSSProperties = {
  padding: "18px 16px 16px 16px",
  width: "100%",
  textAlign: "center" as const,
};

const productTitle: React.CSSProperties = {
  color: "#0A2463",
  fontWeight: "bold",
  fontSize: 18,
  marginBottom: 8,
};

const productPrice: React.CSSProperties = {
  color: "#1976d2",
  fontWeight: "bold",
  fontSize: 17,
  marginBottom: 4,
};

const productBid: React.CSSProperties = {
  color: "#3ddc97",
  fontWeight: 500,
  fontSize: 15,
};

const KEYCLOAK_LOGOUT_URL = "http://localhost:8080/realms/nexbit/protocol/openid-connect/logout";
const REDIRECT_URI = "http://localhost:3000/"; // Usa la URL exacta registrada

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:5600/api/products/available")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5103/api/users/logout", {
        method: "GET", // Cambia a GET si tu backend lo requiere
        credentials: "include",
      });
    } catch (e) {
      // Maneja el error si lo deseas
    }
    logout();
    window.location.href = `${KEYCLOAK_LOGOUT_URL}?redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  };

  return (
    <div style={mainBg}>
      {/* Header fijo */}
      <header style={headerStyle}>
        <div style={navLeft}>
          <span style={navTitle}>NexBit</span>
          <Link href="/" style={navLink}>
            Inicio
          </Link>
          <Link href="/products" style={navLink}>
            Productos
          </Link>
          <Link href="/createAuction" style={navLink}>
            Subastas
          </Link>
          <Link href="/createBid" style={navLink}>
            Crear Puja
          </Link>
          <Link href="/profile" style={navLink}>
            Mi perfil
          </Link>
        </div>
        <div style={navRight}>
          {/* Reemplaza Iniciar Sesión por Cerrar sesión */}
          <button
            onClick={handleLogout}
            style={{
              ...navLink,
              background: "#e63946",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "8px 22px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Cerrar sesión
          </button>
          <Link
            href="/user"
            style={{
              ...navLink,
              background: "#3ddc97",
              color: "#fff",
              borderRadius: 6,
              padding: "8px 22px",
              fontWeight: "bold",
            }}
          >
            Publicar ahora
          </Link>
        </div>
      </header>

      {/* Galería de productos/subastas */}
      <div style={galleryTitle}>Productos Destacads</div>
      {loading ? (
        <div
          style={{
            color: "#888",
            textAlign: "center",
            marginTop: 40,
          }}
        >
          Cargando productos...
        </div>
      ) : (
        <div style={galleryGrid}>
          {products.length === 0 && (
            <div
              style={{
                gridColumn: "1/-1",
                color: "#888",
                textAlign: "center",
              }}
            >
              No hay productos disponibles.
            </div>
          )}
          {products.map((product, idx) => (
            <div key={idx} style={productCard}>
              <img
                src={getValue(product.imagenUrl)}
                alt={getValue(product.nombre)}
                style={productImg}
              />
              <div style={productInfo}>
                <div style={productTitle}>{getValue(product.nombre)}</div>
                <div style={productPrice}>
                  {getValue(product.precioBase)}{" "}
                  {getValue(product.codigoMoneda)}
                </div>
                <div style={productBid}>{getValue(product.categoria)}</div>
                <div
                  style={{
                    color: "#888",
                    fontSize: 13,
                    marginTop: 6,
                  }}
                >
                  {getValue(product.descripcion)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

