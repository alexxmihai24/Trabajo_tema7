'use client'
import { useActionState } from 'react'
import { updateUser } from '@/lib/actions'

export default function UpdateUserForm({ user }) {
    const [state, action, pending] = useActionState(updateUser, null)

    return (
        <form action={action} className="space-y-4">
            {/* Campo oculto con el ID */}
            <input type="hidden" name="id" value={user.id} />

            <div>
                <label className="block text-sm font-medium mb-2">Nombre Completo</label>
                <input
                    type="text"
                    name="nombre"
                    defaultValue={user.name}
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
                    defaultValue={user.email}
                    placeholder="tu@email.com"
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            {/* Mensajes de estado */}
            {state?.error && (
                <p className="text-red-500 text-sm bg-red-50 p-3 rounded">
                    ❌ {state.error}
                </p>
            )}

            {state?.success && (
                <p className="text-green-500 text-sm bg-green-50 p-3 rounded">
                    ✅ {state.success}
                </p>
            )}

            <button
                type="submit"
                disabled={pending}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
                {pending ? 'Guardando cambios...' : 'Guardar Cambios'}
            </button>
        </form>
    )
}
