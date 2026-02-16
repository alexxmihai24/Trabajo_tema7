import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import FormularioActualizarUsuario from '@/components/formulario-actualizar-usuario'

export default async function PaginaPanel() {
    const sesion = await auth()

    // Proteger la ruta - si no hay sesión, redirigir
    if (!sesion) redirect('/auth/iniciar-sesion')

    return (
        <div className="max-w-4xl mx-auto mt-10 p-8">
            <h1 className="text-3xl font-bold mb-6">Mi Panel Personal</h1>

            {/* Tarjeta de información del usuario */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Información de tu Cuenta</h2>

                <div className="space-y-2">
                    <div className="flex gap-2">
                        <span className="font-semibold">Nombre:</span>
                        <span>{sesion.user.name}</span>
                    </div>

                    <div className="flex gap-2">
                        <span className="font-semibold">Correo:</span>
                        <span>{sesion.user.email}</span>
                    </div>

                    <div className="flex gap-2">
                        <span className="font-semibold">Rol:</span>
                        <span className="bg-blue-100 px-2 py-1 rounded text-sm">
                            {sesion.user.role === 'ADMIN' ? 'Administrador' : 'Usuario'}
                        </span>
                    </div>

                    {sesion.user.image && (
                        <div>
                            <span className="font-semibold">Foto de Perfil:</span>
                            <img
                                src={sesion.user.image}
                                alt="Foto de perfil"
                                className="w-16 h-16 rounded-full mt-2 border-2 border-gray-200"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Tarjeta para actualizar datos */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Actualizar mis Datos</h2>
                <FormularioActualizarUsuario usuario={sesion.user} />
            </div>

            {/* Información de permisos */}
            <div className="mt-6 bg-blue-50 p-4 rounded">
                <h3 className="font-semibold mb-2">Tus Permisos:</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Ver y editar tu perfil personal</li>
                    {sesion.user.role === 'ADMIN' && (
                        <>
                            <li className="text-red-600">Acceso al panel de administración</li>
                            <li className="text-red-600">Gestionar todos los usuarios</li>
                            <li className="text-red-600">Eliminar y modificar cuentas</li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    )
}
