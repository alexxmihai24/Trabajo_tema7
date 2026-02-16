'use client'
import { useActionState } from 'react'
import { login } from '@/lib/actions'

export default function LoginForm({ className }) {
    const [state, action, pending] = useActionState(login, null)

    return (
        <form action={action} className={className}>
            <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Correo Electrónico</label>
                <input
                    type="email"
                    name="email"
                    defaultValue={state?.fields?.email}
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

            {state?.error && (
                <p className="text-red-500 text-sm mb-4">{state.error}</p>
            )}

            {state?.success && (
                <p className="text-green-500 text-sm mb-4">{state.success}</p>
            )}

            <button
                type="submit"
                disabled={pending}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
                {pending ? 'Iniciando sesión...' : 'Entrar'}
            </button>
        </form>
    )
}
