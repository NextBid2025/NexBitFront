"use client";
import React, { useState } from "react";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  margin: "8px 0",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "16px",
};

const labelStyle: React.CSSProperties = {
  color: "#0A2463",
  fontWeight: "bold",
  marginTop: "10px",
  display: "block",
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#0A2463",
  color: "#fff",
  padding: "12px",
  border: "none",
  borderRadius: "4px",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "12px",
  width: "100%",
};

const formContainerStyle: React.CSSProperties = {
  maxWidth: "400px",
  margin: "0 auto",
  background: "#f7f9fa",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(10,36,99,0.08)",
  padding: "32px 24px",
};

const messageStyle: React.CSSProperties = {
  marginTop: "16px",
  color: "#0A2463",
  fontWeight: "bold",
  textAlign: "center",
};

const RegisterForm = () => {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Validación simple
    if (!form.name || !form.lastName || !form.email || !form.password) {
      setMessage("Por favor, completa todos los campos obligatorios.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5103/api/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
          phone: form.phone,
          address: form.address,
          roleId: "65b2d8e7c9f0a1b2c3d4e5f8",
        }),
      });
      if (res.ok) {
        setMessage("Registro exitoso. Por favor revisa tu correo para confirmar tu cuenta.");
        setForm({ name: "", lastName: "", email: "", password: "", phone: "", address: "" });
      } else {
        const data = await res.json();
        setMessage(data.message || "Error al registrar usuario.");
      }
    } catch (err) {
      setMessage("Error de conexión con el servidor.");
    }
    setLoading(false);
  };

  return (
    <div style={formContainerStyle}>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle} htmlFor="name">Nombre</label>
        <input style={inputStyle} name="name" id="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />

        <label style={labelStyle} htmlFor="lastName">Apellido</label>
        <input style={inputStyle} name="lastName" id="lastName" placeholder="Apellido" value={form.lastName} onChange={handleChange} required />

        <label style={labelStyle} htmlFor="email">Correo</label>
        <input style={inputStyle} name="email" id="email" type="email" placeholder="Correo" value={form.email} onChange={handleChange} required />

        <label style={labelStyle} htmlFor="password">Contraseña</label>
        <input style={inputStyle} name="password" id="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />

        <label style={labelStyle} htmlFor="phone">Teléfono</label>
        <input style={inputStyle} name="phone" id="phone" placeholder="Teléfono" value={form.phone} onChange={handleChange} />

        <label style={labelStyle} htmlFor="address">Dirección</label>
        <input style={inputStyle} name="address" id="address" placeholder="Dirección" value={form.address} onChange={handleChange} />

        <button style={buttonStyle} type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
        {message && <div style={messageStyle}>{message}</div>}
      </form>
    </div>
  );
};

export default RegisterForm;