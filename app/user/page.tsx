import React from "react";
import RegisterForm from "./RegisterForm";

const headerStyle: React.CSSProperties = {
  background: "#0A2463",
  color: "#fff",
  padding: "24px 0",
  textAlign: "center",
  borderRadius: "8px",
  marginBottom: "32px",
  fontSize: "2rem",
  fontWeight: "bold",
  letterSpacing: "1px",
};

const UserRegisterPage = () => (
  <div>
    <header style={headerStyle}>Registrar Usuario</header>
    <RegisterForm />
  </div>
);

export default UserRegisterPage;
