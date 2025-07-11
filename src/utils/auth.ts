export function logout() {
    // Elimina el token de autenticación
    localStorage.removeItem('token');
    // Si usas cookies, también deberías eliminarlas aquí
}
