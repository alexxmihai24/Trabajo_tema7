import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getUsers } from '@/lib/data'
import UsersTable from '@/components/users-table'

export default async function AdminPage() {
    const session = await auth()

    // Proteger ruta - solo ADMIN puede acceder
    if (!session || session.user.role !== 'ADMIN') {
        redirect('/dashboard')
    }

    // Obtener lista completa de usuarios
    const users = await getUsers()

    return (
        <div className="max-w-6xl mx-auto mt-10 p-8">
            <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>

            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Gestión de Usuarios</h2>
                    <span className="text-sm bg-blue-100 px-3 py-1 rounded">
                        Total: {users.length} usuarios
                    </span>
                </div>

                <UsersTable users={users} />
            </div>

            {/* Información de advertencia */}
            <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="font-semibold text-yellow-800">⚠️ Panel de Administración</p>
                <p className="text-sm text-yellow-700 mt-1">
                    Tienes control total sobre todos los usuarios. Usa estos permisos con responsabilidad.
                </p>
            </div>
        </div>
    )
}
