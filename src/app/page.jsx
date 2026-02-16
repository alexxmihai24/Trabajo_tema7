import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { cn } from "@/src/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

export default function Home() {
    return (
        <main className="flex h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
            <div className="space-y-6 text-center">
                <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md", font.className)}>
                    🔐 Auth
                </h1>
                <p className="text-white text-lg">
                    Un servicio de autenticación simple
                </p>
                <div>
                    <Link href="/auth/login">
                        <Button variant="secondary" size="lg">
                            Iniciar Sesión
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
