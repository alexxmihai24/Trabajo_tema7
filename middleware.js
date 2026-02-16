export { auth as middleware } from "@/auth"

// Rutas protegidas que requieren autenticación
export const config = {
    matcher: [
        "/panel/:path*",      // Panel de usuario
        "/admin/:path*",      // Panel de administración
    ]
}
