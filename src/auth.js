import NextAuth from "next-auth"
import prisma from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { obtenerUsuarioPorId } from "@/lib/data"
import authConfig from "@/auth.config"

export const opciones = {
    session: { strategy: 'jwt' },
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: '/auth/iniciar-sesion',
        signOut: '/auth/cerrar-sesion',
        error: '/auth/error'
    },
    events: {
        async linkAccount({ user }) {
            await prisma.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async session({ session, token }) {
            // Recuperar ID de usuario desde el token
            session.user.id = token?.sub;
            // Recuperar rol de usuario desde el token
            session.user.role = token?.role
            return session
        },

        async jwt({ token }) {
            if (!token.sub) return token;

            const usuario = await obtenerUsuarioPorId(token.sub)
            if (!usuario) return token;

            token.role = usuario?.role
            return token
        }
    },
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({ ...opciones, ...authConfig })
