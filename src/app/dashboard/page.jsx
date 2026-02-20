import { auth } from "@/src/auth";
import { db } from "@/src/lib/prisma";
import { UserInfo } from "@/src/components/dashboard/user-info";
import { AdminPanel } from "@/src/components/dashboard/admin-panel";
import { Users, GraduationCap, BookOpen, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
    const session = await auth();
    const isAdmin = session?.user?.role === "ADMIN";

    const [grupos, estudiantes, asignaturas, users] = await Promise.all([
        db.grupo.count(),
        db.estudiante.count(),
        db.asignatura.count(),
        isAdmin ? db.user.findMany({ orderBy: { name: "asc" } }) : Promise.resolve([]),
    ]);

    const stats = [
        { label: "Grupos", value: grupos, icon: Users, href: "/dashboard/grupos", color: "text-blue-600 bg-blue-100" },
        { label: "Estudiantes", value: estudiantes, icon: GraduationCap, href: "/dashboard/estudiantes", color: "text-purple-600 bg-purple-100" },
        { label: "Asignaturas", value: asignaturas, icon: BookOpen, href: "/dashboard/asignaturas", color: "text-green-600 bg-green-100" },
        ...(isAdmin ? [{ label: "Usuarios", value: users.length, icon: ShieldCheck, href: "/admin", color: "text-amber-600 bg-amber-100" }] : []),
    ];

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-2xl font-bold tracking-tight">Hola, {session?.user?.name} 👋</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Bienvenido a tu panel {isAdmin ? "de administrador" : "de usuario"}.
                </p>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map(({ label, value, icon: Icon, href, color }) => (
                    <Link key={label} href={href} className="rounded-xl border bg-card p-5 space-y-3 hover:shadow-md transition-shadow">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
                            <Icon className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{value}</p>
                            <p className="text-sm text-muted-foreground">{label}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Two columns: user info + admin panel or welcome */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <UserInfo user={session?.user} />
                </div>
                <div className="lg:col-span-2">
                    {isAdmin ? (
                        <AdminPanel users={users} />
                    ) : (
                        <div className="rounded-xl border bg-card p-8 text-center space-y-3 h-full flex flex-col items-center justify-center">
                            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary text-3xl">📚</div>
                            <h3 className="text-lg font-semibold">Explora el centro</h3>
                            <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                                Usa el menú lateral para ver grupos, estudiantes y asignaturas.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
