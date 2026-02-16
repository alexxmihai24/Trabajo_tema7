import Link from 'next/link'
import { auth } from '@/auth'
import { cerrarSesion } from '@/lib/acciones'

export default async function Encabezado() {
    const sesion = await auth()

    return (
        <header className="bg-white shadow">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo e inicio */}
                    <div className="flex">
                        <Link href="/" className="flex items-center text-xl font-bold">
                            Sistema Auth
                        </Link>
                    </div>

                    {/* Menú de navegación */}
                    <div className="flex items-center gap-4">
                        {sesion ? (
                            <>
                                <span className="text-sm">Hola, {sesion.user.name}</span>

                                {/* Enlace Admin solo para administradores */}
                                {sesion.user.role === 'ADMIN' && (
                                    <Link href="/admin" className="text-sm hover:text-blue-600">
                                        Administración
                                    </Link>
                                )}

                                <Link href="/panel" className="text-sm hover:text-blue-600">
                                    Mi Panel
                                </Link>

                                <form action={cerrarSesion}>
                                    <button className="text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                                        Cerrar Sesión
                                    </button>
                                </form>
                            </>
                        ) : (
                            <Link
                                href="/auth/iniciar-sesion"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Iniciar Sesión
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    )
}
