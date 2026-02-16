import Link from 'next/link'

export default function Home() {
    return (
        <div className="max-w-4xl mx-auto mt-10 p-8">
            <h1 className="text-4xl font-bold mb-6">Sistema de Autenticación</h1>

            <p className="text-lg mb-6">
                Aplicación de ejemplo con Next.js 16, NextAuth 5, Prisma y PostgreSQL
            </p>

            <div className="grid md:grid-cols-2 gap-4">
                <Link
                    href="/auth/login"
                    className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded text-center"
                >
                    Iniciar Sesión
                </Link>
                <Link
                    href="/dashboard"
                    className="bg-green-500 hover:bg-green-600 text-white p-4 rounded text-center"
                >
                    Mi Panel
                </Link>
            </div>

            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Características:</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>✅ OAuth: Google, GitHub, Discord</li>
                    <li>✅ Credenciales: Email y contraseña</li>
                    <li>✅ Roles: USUARIO y ADMINISTRADOR</li>
                    <li>✅ Panel personal de usuario</li>
                    <li>✅ Panel de administración</li>
                    <li>✅ Gestión completa de usuarios (CRUD)</li>
                </ul>
            </div>

            <div className="mt-10 bg-blue-50 p-6 rounded">
                <h3 className="text-xl font-bold mb-3">Tecnologías utilizadas:</h3>
                <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div>• Next.js 16</div>
                    <div>• NextAuth 5</div>
                    <div>• Prisma ORM</div>
                    <div>• PostgreSQL (Neon.tech)</div>
                    <div>• Tailwind CSS 4</div>
                    <div>• Lucide React Icons</div>
                </div>
            </div>
        </div>
    )
}
