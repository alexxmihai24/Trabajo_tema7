import Link from 'next/link'
import { auth } from '@/auth'
import { logout } from '@/lib/actions'

export default async function Header() {
    const session = await auth()

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
                        {session ? (
                            <>
                                <span className="text-sm">Hola, {session.user.name}</span>

                                {/* Enlace Admin solo para administradores */}
                                {session.user.role === 'ADMIN' && (
                                    <Link href="/admin" className="text-sm hover:text-blue-600">
                                        Administración
                                    </Link>
                                )}

                                <Link href="/dashboard" className="text-sm hover:text-blue-600">
                                    Mi Panel
                                </Link>

                                <form action={logout}>
                                    <button className="text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                                        Cerrar Sesión
                                    </button>
                                </form>
                            </>
                        ) : (
                            <Link
                                href="/auth/login"
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
