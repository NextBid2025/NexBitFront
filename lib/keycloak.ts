import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080/auth",
  realm: "TU_REALM",        // Cambia por el nombre de tu realm
  clientId: "TU_CLIENT_ID", // Cambia por el ID de tu cliente
});

export default keycloak;
