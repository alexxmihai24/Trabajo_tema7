import { auth } from "@/src/auth";
import { redirect } from "next/navigation";
import { db } from "@/src/lib/prisma";
import { Button } from "@/src/components/ui/button";
import { AdminPanel } from "@/src/components/dashboard/admin-panel";
import { signOutAction } from "@/src/actions/auth-actions";

export const metadata = {
    title: "Panel de Administración",
};

export default async function AdminPage() {
    const session = await auth();

    // Doble protección: redirigir si no es ADMIN
    if (!session || session.user?.role !== "ADMIN") {
        redirect("/dashboard");
    }

    const users = await db.user.findMany({ orderBy: { name: "asc" } });

    return (
        <div className="flex flex-col min-h-screen bg-muted/40 font-sans">
            <nav className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🔐</span>
                            <span className="font-bold text-lg tracking-tight">Admin Panel</span>
                            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                                {session.user?.role}
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <a href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                ← Dashboard
                            </a>
                            <form action={signOutAction}>
                                <Button type="submit" variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                    Cerrar Sesión
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
                <header>
                    <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
                    <p className="text-muted-foreground mt-1">
                        Administra todos los usuarios del sistema.
                    </p>
                </header>

                <AdminPanel users={users} />
            </main>
        </div>
    );
}
