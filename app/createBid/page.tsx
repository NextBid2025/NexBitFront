"use client";
import React, { useEffect, useState, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import Link from "next/link";

// --- Componente de notificaciones de subasta y pujas en tiempo real ---
const SubastaComponent = ({ subastaId }: { subastaId: string }) => {
  const [hubStatus, setHubStatus] = useState<string>("");
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5201/subastaHub", {
        transport: signalR.HttpTransportType.LongPolling
      })
      .withAutomaticReconnect()
      .build();

    connection.on("ReceiveConnectionId", (connectionId) => {
      // Unirse al grupo de la subasta justo después de recibir el ConnectionId
      if (subastaId) {
        connection.invoke("JoinSubasta", subastaId);
      }
    });

    connection.on("NuevaPuja", (data) => {
      setHubStatus("¡Nueva puja recibida!");
      console.log("Datos de la nueva puja:", data);
    });

    connection.on("PujaInvalida", (data) => {
      setHubStatus("Puja inválida: " + data.mensaje);
    });

    connection.onreconnecting(() => {
      setHubStatus("Reconectando a SignalR...");
    });

    connection.onclose(() => {
      setHubStatus("Conexión cerrada.");
    });

    connection.start()
      .then(() => {
        setHubStatus("Conectado a SignalR.");
        // Aquí NO invoques JoinSubasta, solo en ReceiveConnectionId
      })
      .catch(() => {
        setHubStatus("Fallo al conectar con SignalR.");
      });

    connectionRef.current = connection;

    return () => {
      connection.stop();
    };
  }, [subastaId]);

  return (
    <div style={{ marginTop: 32 }}>
      <Typography variant="h6" sx={{ color: "#0A2463" }}>Notificaciones de Subasta</Typography>
      {hubStatus && (
        <Typography sx={{ color: "#1976d2", fontWeight: "bold", mb: 1 }}>
          {hubStatus}
        </Typography>
      )}
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
  const [showRealtime, setShowRealtime] = useState(false);
  const [autoBid, setAutoBid] = useState(false);
  const [autoBidMax, setAutoBidMax] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    // Validación simple de usuario registrado y monto
    if (!form.userId || !form.subastaId || (!form.monto && !autoBid)) {
      setMessage("Completa todos los campos obligatorios.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5201/api/puja/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subastaId: form.subastaId,
          userId: form.userId,
          monto: autoBid ? undefined : parseFloat(form.monto),
          fechaPuja: form.fechaPuja ? new Date(form.fechaPuja).toISOString() : new Date().toISOString(),
          // autoBid y autoBidMax no se envían porque el microservicio no los acepta
        }),
      });
      if (res.ok) {
        setMessage("¡Puja realizada con éxito!");
        setShowRealtime(true);
        setForm({
          subastaId: form.subastaId,
          userId: form.userId,
          monto: "",
          fechaPuja: "",
        });
        setAutoBid(false);
        setAutoBidMax("");
      } else {
        let data;
        try {
          data = await res.json();
        } catch {
          data = {};
        }
        // Mostrar mensaje específico si viene del backend
        if (data.message === "El monto de la puja no respeta el incremento mínimo permitido.") {
          setMessage(data.message);
        } else {
          setMessage(data.message || "Error al realizar la puja.");
        }
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
            <Typography sx={{ mt: 3, color: message.includes("éxito") || message.includes("automática") ? "#3ddc97" : "#d32f2f", fontWeight: "bold" }}>
              {message}
            </Typography>
          )}
          {/* Notificaciones en tiempo real */}
          {showRealtime && <SubastaComponent subastaId={form.subastaId} />}
        </Paper>
      </Box>
      
      {/* Para comprobar WebSocket y pujas automáticas:
        1. Abre dos o más ventanas/navegadores en http://localhost:3000/createBid
        2. Realiza una puja desde una ventana. Deberías ver la notificación en tiempo real en todas las ventanas abiertas.
        3. Si el backend soporta puja automática, activa la opción (si está implementada en backend).
        4. Cuando otro usuario haga una puja mayor, el backend debe emitir el evento y la interfaz lo mostrará automáticamente.
        5. Observa que el precio current y los mensajes se actualizan sin recargar la página.

        Si ves los mensajes de "Nueva puja", "Puja inválida" o "Puja automática" en tiempo real en todas las ventanas, ¡la integración WebSocket funciona!

        Si el backend aún no soporta puja automática, solo verás las pujas manuales y sus notificaciones en tiempo real.
      */}
    </>
  );
}