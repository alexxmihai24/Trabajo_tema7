'use client'
import { eliminarUsuario, actualizarRolUsuario } from '@/lib/acciones'

export default function TablaUsuarios({ usuarios }) {

    // Función para manejar eliminación de usuario
    const manejarEliminar = async (id, nombre) => {
        if (confirm(`¿Estás seguro de eliminar al usuario "${nombre}"?`)) {
            await eliminarUsuario(id)
        }
    }

    // Función para cambiar el rol de un usuario
    const manejarCambioRol = async (id, nuevoRol) => {
        await actualizarRolUsuario(id, nuevoRol)
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nombre
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Correo Electrónico
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Rol
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estado
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    {usuario.name}
                                </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                    {usuario.email}
                                </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                                <select
                                    value={usuario.role}
                                    onChange={(e) => manejarCambioRol(usuario.id, e.target.value)}
                                    className="border rounded px-2 py-1 text-sm"
                                >
                                    <option value="USER">Usuario</option>
                                    <option value="ADMIN">Administrador</option>
                                </select>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${usuario.active
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}>
                                    {usuario.active ? 'Activo' : 'Inactivo'}
                                </span>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <button
                                    onClick={() => manejarEliminar(usuario.id, usuario.name)}
                                    className="text-red-600 hover:text-red-900 font-medium"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {usuarios.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No hay usuarios registrados
                </div>
            )}
        </div>
    )
}
