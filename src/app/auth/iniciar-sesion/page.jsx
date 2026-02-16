import FormularioRegistro from '@/components/auth/formulario-registro'
import FormularioIniciarSesion from '@/components/auth/formulario-iniciar-sesion'
import FormularioOAuth from '@/components/auth/formulario-oauth'
import { auth } from '@/auth'
import { redirect } from 'next/navigation';
import { CirclePlus, Play, Globe } from 'lucide-react'

// Mensajes de error en español
const mensajesError = new Map();
mensajesError.set('OAuthSignin', "Error al construir una URL de autorización.");
mensajesError.set('OAuthCallback', "Error al manejar la respuesta del proveedor OAuth.");
mensajesError.set('OAuthCreateAccount', "No se pudo crear un usuario con el proveedor OAuth.");
mensajesError.set('EmailCreateAccount', "No se pudo crear un usuario con el proveedor de email.");
mensajesError.set('Callback', "Error en la ruta del controlador de devolución de llamada.");
mensajesError.set('OAuthAccountNotLinked', "Este email ya está registrado con otro proveedor.");
mensajesError.set('EmailSignin', "Comprueba tu dirección de correo electrónico.");
mensajesError.set('CredentialsSignin', "Error al iniciar sesión. Verifica tus credenciales.");
mensajesError.set('SessionRequired', "Debes iniciar sesión para acceder.");
mensajesError.set('Default', "No se puede iniciar sesión.");

async function PaginaIniciarSesion({ searchParams }) {
    const { error, callbackUrl } = await searchParams
    globalThis.urlRetorno = callbackUrl

    const sesion = await auth()

    // Si ya hay sesión, redirigir al panel
    if (sesion) redirect('/panel')

    return (
        <div className="relative mt-8 mx-auto flex flex-col gap-2 w-[375px]">
            {/* Selector de pestañas usando peer de Tailwind */}

            {/* Pestaña: Registro */}
            <input
                id="registro"
                type="radio"
                name="pestaña"
                className="hidden peer/registro"
            />
            <label
                htmlFor="registro"
                title="Crear cuenta nueva"
                className='absolute right-0 text-slate-300 peer-checked/registro:text-black cursor-pointer'>
                <CirclePlus />
            </label>

            {/* Pestaña: Iniciar Sesión */}
            <input
                id="iniciar-sesion"
                title="Iniciar sesión"
                type="radio"
                name="pestaña"
                className="hidden peer/iniciar"
                defaultChecked={true}
            />
            <label
                htmlFor="iniciar-sesion"
                title="Iniciar sesión con credenciales"
                className='absolute right-10 text-slate-300 peer-checked/iniciar:text-black cursor-pointer'>
                <Play />
            </label>

            {/* Pestaña: OAuth */}
            <input
                id="oauth"
                title="Redes sociales"
                type="radio"
                name="pestaña"
                className="hidden peer/oauth"
            />
            <label
                htmlFor="oauth"
                title="Iniciar sesión con redes sociales"
                className='absolute right-20 text-slate-300 peer-checked/oauth:text-black cursor-pointer'>
                <Globe />
            </label>

            {/* Contenido de las pestañas */}
            <FormularioRegistro className="hidden peer-checked/registro:block w-full bg-[snow] mt-10 border-2 border-slate-400 rounded-md mx-auto p-8" />
            <FormularioIniciarSesion className="hidden peer-checked/iniciar:block w-full bg-[snow] mt-10 border-2 border-slate-400 rounded-md mx-auto p-8" />
            <FormularioOAuth className="hidden peer-checked/oauth:block w-full bg-[snow] mt-10 border-2 border-slate-400 rounded-md mx-auto p-8" />

            {/* Mostrar error si existe */}
            {error && <p className='text-red-400 mt-4 text-center'>{mensajesError.get(error)}</p>}
        </div>
    )
}

export default PaginaIniciarSesion
