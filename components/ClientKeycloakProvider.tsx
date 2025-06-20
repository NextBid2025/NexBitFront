"use client";
import React from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "../lib/keycloak";

export default function ClientKeycloakProvider({ children }: { children: React.ReactNode }) {
  return <ReactKeycloakProvider authClient={keycloak}>{children}</ReactKeycloakProvider>;
}
