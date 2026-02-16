'use client'
import { useActionState } from 'react'
import { registrarUsuario } from '@/lib/acciones'

export default function FormularioRegistro({ className }) {
    const [estado, accion, pendiente] = useActionState(registrarUsuario, null)

    return (
        <form action={accion} className={className}>
            <h2 className="text-2xl font-bold mb-4">Crear Cuenta</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Nombre Completo</label>
                <input
                    type="text"
                    name="nombre"
                    defaultValue={estado?.campos?.nombre}
                    placeholder="Juan Pérez"
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Correo Electrónico</label>
                <input
                    type="email"
                    name="email"
                    defaultValue={estado?.campos?.email}
                    placeholder="tu@email.com"
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Contraseña</label>
                <input
                    type="password"
                    name="contraseña"
                    placeholder="••••••••"
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            {estado?.error && (
                <p className="text-red-500 text-sm mb-4">{estado.error}</p>
            )}

            {estado?.success && (
                <p className="text-green-500 text-sm mb-4">{estado.success}</p>
            )}

            <button
                type="submit"
                disabled={pendiente}
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:bg-gray-400"
            >
                {pendiente ? 'Registrando...' : 'Crear Cuenta'}
            </button>
        </form>
    )
}
