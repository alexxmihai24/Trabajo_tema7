import RegisterForm from '@/components/auth/register-form'
import LoginForm from '@/components/auth/login-form'
import OauthForm from '@/components/auth/oauth-form'
import { auth } from '@/auth'
import { redirect } from 'next/navigation';
import { CirclePlus, Play, Globe } from 'lucide-react'

// Mensajes de error en español
const errors = new Map();
errors.set('OAuthSignin', "Error al construir una URL de autorización.");
errors.set('OAuthCallback', "Error al manejar la respuesta del proveedor OAuth.");
errors.set('OAuthCreateAccount', "No se pudo crear un usuario con el proveedor OAuth.");
errors.set('EmailCreateAccount', "No se pudo crear un usuario con el proveedor de email.");
errors.set('Callback', "Error en la ruta del controlador de devolución de llamada.");
errors.set('OAuthAccountNotLinked', "Este email ya está registrado con otro proveedor.");
errors.set('EmailSignin', "Comprueba tu dirección de correo electrónico.");
errors.set('CredentialsSignin', "Error al iniciar sesión. Verifica tus credenciales.");
errors.set('SessionRequired', "Debes iniciar sesión para acceder.");
errors.set('Default', "No se puede iniciar sesión.");

async function LoginPage({ searchParams }) {
    const { error, callbackUrl } = await searchParams
    globalThis.callbackUrl = callbackUrl

    const session = await auth()

    // Si ya hay sesión, redirigir al dashboard
    if (session) redirect('/dashboard')

    return (
        <div className="relative mt-8 mx-auto flex flex-col gap-2 w-[375px]">
            {/* Selector de pestañas usando peer de Tailwind */}

            {/* Pestaña: Registro */}
            <input
                id="signup"
                type="radio"
                name="sign"
                className="hidden peer/register"
            />
            <label
                htmlFor="signup"
                title="Crear cuenta nueva"
                className='absolute right-0 text-slate-300 peer-checked/register:text-black cursor-pointer'>
                <CirclePlus />
            </label>

            {/* Pestaña: Iniciar Sesión */}
            <input
                id="signin"
                title="Iniciar sesión"
                type="radio"
                name="sign"
                className="hidden peer/login"
                defaultChecked={true}
            />
            <label
                htmlFor="signin"
                title="Iniciar sesión con credenciales"
                className='absolute right-10 text-slate-300 peer-checked/login:text-black cursor-pointer'>
                <Play />
            </label>

            {/* Pestaña: OAuth */}
            <input
                id="oauth"
                title="Redes sociales"
                type="radio"
                name="sign"
                className="hidden peer/oauth"
            />
            <label
                htmlFor="oauth"
                title="Iniciar sesión con redes sociales"
                className='absolute right-20 text-slate-300 peer-checked/oauth:text-black cursor-pointer'>
                <Globe />
            </label>

            {/* Contenido de las pestañas */}
            <RegisterForm className="hidden peer-checked/register:block w-full bg-[snow] mt-10 border-2 border-slate-400 rounded-md mx-auto p-8" />
            <LoginForm className="hidden peer-checked/login:block w-full bg-[snow] mt-10 border-2 border-slate-400 rounded-md mx-auto p-8" />
            <OauthForm className="hidden peer-checked/oauth:block w-full bg-[snow] mt-10 border-2 border-slate-400 rounded-md mx-auto p-8" />

            {/* Mostrar error si existe */}
            {error && <p className='text-red-400 mt-4 text-center'>{errors.get(error)}</p>}
        </div>
    )
}

export default LoginPage
