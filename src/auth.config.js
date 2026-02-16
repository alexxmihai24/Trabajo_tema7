import Google from "@auth/core/providers/google"
import GitHub from '@auth/core/providers/github'
import Discord from '@auth/core/providers/discord'
import Credentials from "@auth/core/providers/credentials"
import { obtenerUsuarioPorEmail } from "@/lib/data"

export default {
    providers: [
        Google,
        GitHub,
        Discord,
        Credentials({
            async authorize(credenciales) {
                const usuario = await obtenerUsuarioPorEmail(credenciales.email)
                return usuario
            },
        }),
    ]
}
