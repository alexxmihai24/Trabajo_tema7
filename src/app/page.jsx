import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { cn } from "@/src/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "600", "800"],
});

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden bg-slate-950 font-sans">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-600/30 blur-[100px]" />
                <div className="absolute top-[30%] -right-[10%] w-[40%] h-[60%] rounded-full bg-blue-600/20 blur-[100px]" />
                <div className="absolute -bottom-[10%] left-[20%] w-[60%] h-[40%] rounded-full bg-indigo-600/20 blur-[100px]" />
            </div>

            <div className="relative z-10 space-y-8 text-center px-4 max-w-3xl glass p-12 rounded-3xl border-slate-800">
                <div className="space-y-4">
                    <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-4">
                        Sistema de Autenticación Seguro
                    </div>
                    <h1 className={cn("text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 drop-shadow-sm tracking-tight", font.className)}>
                        NextAuth App
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
                        Una solución robusta y moderna para la gestión de usuarios, roles y acceso seguro.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                    <Link href="/auth/login" className="w-full sm:w-auto">
                        <Button variant="default" size="lg" className="w-full sm:w-auto bg-white text-slate-950 hover:bg-slate-200 font-semibold h-12 px-8 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:scale-105">
                            Iniciar Sesión
                        </Button>
                    </Link>
                    <Link href="/auth/register" className="w-full sm:w-auto">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white h-12 px-8 rounded-xl bg-slate-950/50 backdrop-blur-sm transition-all hover:scale-105">
                            Crear Cuenta
                        </Button>
                    </Link>
                </div>

                <div className="pt-8 flex justify-center gap-6 text-slate-500 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span>Prisma ORM</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span>PostgreSQL</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                        <span>Next.js 14</span>
                    </div>
                </div>
            </div>
        </main>
    );
}
