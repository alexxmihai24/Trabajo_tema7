'use client'
import { useActionState } from 'react'
import { actualizarUsuario } from '@/lib/acciones'

export default function FormularioActualizarUsuario({ usuario }) {
    const [estado, accion, pendiente] = useActionState(actualizarUsuario, null)

    return (
        <form action={accion} className="space-y-4">
            {/* Campo oculto con el ID */}
            <input type="hidden" name="id" value={usuario.id} />

            <div>
                <label className="block text-sm font-medium mb-2">Nombre Completo</label>
                <input
                    type="text"
                    name="nombre"
                    defaultValue={usuario.name}
                    placeholder="Tu nombre completo"
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Correo Electrónico</label>
                <input
                    type="email"
                    name="email"
                    defaultValue={usuario.email}
                    placeholder="tu@email.com"
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            {/* Mensajes de estado */}
            {estado?.error && (
                <p className="text-red-500 text-sm bg-red-50 p-3 rounded">
                    ❌ {estado.error}
                </p>
            )}

            {estado?.success && (
                <p className="text-green-500 text-sm bg-green-50 p-3 rounded">
                    ✅ {estado.success}
                </p>
            )}

            <button
                type="submit"
                disabled={pendiente}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
                {pendiente ? 'Guardando cambios...' : 'Guardar Cambios'}
            </button>
        </form>
    )
}
