import { auth, signOut } from "@/src/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import {
    LayoutDashboard,
    Users,
    BookOpen,
    GraduationCap,
    ShieldCheck,
    LogOut,
} from "lucide-react";

export default async function DashboardLayout({ children }) {
    const session = await auth();
    if (!session) redirect("/auth/login");

    const isAdmin = session.user?.role === "ADMIN";

    const navLinks = [
        { href: "/dashboard", label: "Inicio", icon: LayoutDashboard },
        { href: "/dashboard/grupos", label: "Grupos", icon: Users },
        { href: "/dashboard/estudiantes", label: "Estudiantes", icon: GraduationCap },
        { href: "/dashboard/asignaturas", label: "Asignaturas", icon: BookOpen },
        ...(isAdmin ? [{ href: "/admin", label: "Gestión Usuarios", icon: ShieldCheck }] : []),
    ];

    return (
        <div className="flex min-h-screen bg-muted/40 font-sans">
            {/* Sidebar */}
            <aside className="w-64 shrink-0 bg-background border-r flex flex-col">
                {/* Logo / User */}
                <div className="p-5 border-b space-y-1">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                            {session.user?.name?.[0]?.toUpperCase() || "U"}
                        </div>
                        <div className="min-w-0">
                            <p className="font-semibold text-sm truncate">{session.user?.name}</p>
                            <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${isAdmin ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"}`}>
                                {session.user?.role}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Nav links */}
                <nav className="flex-1 p-3 space-y-1">
                    {navLinks.map(({ href, label, icon: Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                            <Icon className="h-4 w-4 shrink-0" />
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* Logout */}
                <div className="p-3 border-t">
                    <form action={async () => {
                        "use server";
                        await signOut({ redirectTo: "/" });
                    }}>
                        <Button type="submit" variant="ghost" size="sm" className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10">
                            <LogOut className="h-4 w-4" />
                            Cerrar Sesión
                        </Button>
                    </form>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0">
                <main className="flex-1 p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
