import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080/auth",
  realm: "master",        // el nombnre del dominio realme 
  clientId: "", // Id del cliennte en keycloak
});

export default keycloak;
