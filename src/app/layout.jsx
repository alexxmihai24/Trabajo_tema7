import '@/app/globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Sistema de Autenticación - Trabajo Tema 7',
    description: 'Sistema de autenticación con Next.js, NextAuth y Prisma',
}

export default async function RootLayout({ children }) {
    return (
        <html lang="es">
            <body className={`bg-slate-100 ${inter.className}`} >
                <Header />
                <main className="md:px-10">
                    {children}
                </main>
            </body>
        </html>
    )
}
