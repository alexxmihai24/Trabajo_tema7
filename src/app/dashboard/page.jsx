import { auth, signOut } from "@/src/auth";
import { Button } from "@/src/components/ui/button";
import { UserInfo } from "@/src/components/dashboard/user-info";
import { AdminPanel } from "@/src/components/dashboard/admin-panel";

const DashboardPage = async () => {
    const session = await auth();

    return (
        <div className="flex flex-col min-h-screen bg-muted/40 font-sans">
            <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                                {session?.user?.name?.[0] || "U"}
                            </div>
                            <span className="font-bold text-lg tracking-tight">Dashboard</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-sm text-muted-foreground hidden md:block">
                                {session?.user?.email}
                            </div>
                            <form action={async () => {
                                "use server";
                                await signOut({ redirectTo: "/" });
                            }}>
                                <Button type="submit" variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                    Cerrar Sesión
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
                <header className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Hola, {session?.user?.name}</h1>
                    <p className="text-muted-foreground">
                        Bienvenido a tu panel de control {session?.user?.role === "ADMIN" ? "de administrador" : "personal"}.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* User Info - Takes 1 column on large screens */}
                    <div className="lg:col-span-1 space-y-6">
                        <UserInfo user={session?.user} />
                    </div>

                    {/* Admin Panel - Takes 2 columns on large screens if admin */}
                    {session?.user?.role === "ADMIN" && (
                        <div className="lg:col-span-2 space-y-6">
                            <AdminPanel />
                        </div>
                    )}
                    {session?.user?.role !== "ADMIN" && (
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-card rounded-xl border p-8 text-center space-y-4">
                                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl">
                                    👋
                                </div>
                                <h3 className="text-lg font-semibold">¡Todo listo!</h3>
                                <p className="text-muted-foreground max-w-sm mx-auto">
                                    Tu cuenta está activa. Como usuario estándar, puedes ver y editar tu información básica en la columna de la izquierda.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default DashboardPage;
