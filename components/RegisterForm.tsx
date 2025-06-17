import React, { useState } from "react";

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
          // roleId puede ser fijo o configurable según tu lógica
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
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
      <input name="lastName" placeholder="Apellido" value={form.lastName} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Correo" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
      <input name="phone" placeholder="Teléfono" value={form.phone} onChange={handleChange} />
      <input name="address" placeholder="Dirección" value={form.address} onChange={handleChange} />
      <button type="submit" disabled={loading}>{loading ? "Registrando..." : "Registrarse"}</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default RegisterForm;
